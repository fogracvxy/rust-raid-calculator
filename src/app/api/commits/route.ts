// src/app/api/commits/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as cheerio from "cheerio";
import { formatISO } from "date-fns";
import pLimit from "p-limit";
import * as chrono from "chrono-node";
import { Element } from "domhandler";
// Constants
const BASE_URL = "https://commits.facepunch.com";
const USER_AGENT = process.env.USER_AGENT || "YourAppName/1.0";
const MAX_PAGES = parseInt(process.env.MAX_PAGES || "10", 10);
const CONCURRENCY_LIMIT = parseInt(process.env.CONCURRENCY_LIMIT || "5", 10);
const HEADERS = {
  "User-Agent": USER_AGENT,
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

// Type Definitions
interface Commit {
  id: number;
  repo: string;
  branch: string;
  changeset: string;
  created: string; // Relative time (e.g., "14 Minutes Ago")
  created_at: string; // Calculated absolute timestamp in ISO format
  message: string;
  user: {
    name: string;
    avatar: string;
  };
  likes: number | null;
  dislikes: number | null;
}

// Next.js Configurations
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET handler for fetching the latest commits.
 * @param request - The incoming Next.js request object.
 * @returns A JSON response containing the commits or an error message.
 */
export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(
      request.nextUrl.searchParams.get("limit") || "90",
      10
    );
    const commits = await fetchLatestCommits(limit);
    const response = NextResponse.json(commits);

    // Add Cache-Control headers to prevent caching
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    logError("Error fetching commits", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Fetches the latest commits up to the specified limit.
 * @param limit - The maximum number of commits to fetch.
 * @returns An array of Commit objects.
 */
async function fetchLatestCommits(limit: number): Promise<Commit[]> {
  const commits: Commit[] = [];
  const commitPromises: Promise<void>[] = [];
  const limitConcurrentRequests = pLimit(CONCURRENCY_LIMIT);

  let page = 1;
  let hasMorePages = true;

  while (commits.length < limit && hasMorePages && page <= MAX_PAGES) {
    const url =
      page === 1
        ? `${BASE_URL}/r/rust_reboot`
        : `${BASE_URL}/r/rust_reboot?p=${page}`;

    try {
      const response = await fetch(url, { headers: HEADERS });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch commits from page ${page}: ${response.statusText}`
        );
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const commitElements = $(".commit.columns");

      if (commitElements.length === 0) {
        hasMorePages = false;
        break;
      }

      commitElements.each((index, commitElement) => {
        if (commits.length >= limit) return false;
        const $commit = $(commitElement);

        // Extract data safely
        const changesetLink = $commit.find(".changeset a").attr("href") || "";
        const idMatch = changesetLink.match(/\/(\d+)/);
        const id = idMatch ? parseInt(idMatch[1], 10) : null;

        if (!id) {
          console.warn("Commit ID not found");
          return; // Skip this commit
        }

        const repo = getText($commit, ".repository .repo a");
        const branch = getText($commit, ".repository .branch a");
        const changeset = getText($commit, ".changeset a");
        const createdRelative = getText($commit, ".time");
        const createdAt = calculateAbsoluteTime(createdRelative);
        const message = getText($commit, ".commits-message");
        const userName = getText($commit, ".author a:first-child");

        let userAvatar = $commit.find(".author .avatar img").attr("src") || "";
        if (!userAvatar) {
          userAvatar =
            $commit.find(".column.is-1 .avatar img").attr("src") || "";
        }

        // Check if the commit is hidden
        const isHidden = message.includes("█") || message.trim() === "";
        const commitMessage = isHidden ? "Hidden Commit Message" : message;

        const commit: Commit = {
          id,
          repo,
          branch,
          changeset,
          created: createdRelative,
          created_at: createdAt,
          message: commitMessage,
          user: {
            name: userName,
            avatar: userAvatar,
          },
          likes: null,
          dislikes: null,
        };

        commits.push(commit);

        // Fetch likes and dislikes with concurrency limit
        const likesPromise = limitConcurrentRequests(async () => {
          const { likes, dislikes } = await fetchLikesDislikes(commit.id);
          commit.likes = likes;
          commit.dislikes = dislikes;
        });

        commitPromises.push(likesPromise);
      });

      page += 1;
    } catch (error) {
      logError(`Error processing page ${page}`, error);
      break;
    }
  }

  // Wait for all likes/dislikes to be fetched
  await Promise.all(commitPromises);
  return commits.slice(0, limit);
}

/**
 * Extracts text content from a Cheerio element using the provided selector.
 * @param element - The Cheerio element to search within.
 * @param selector - The selector string to find the desired element.
 * @returns The trimmed text content or an empty string if not found.
 */
function getText(element: cheerio.Cheerio<Element>, selector: string): string {
  return element.find(selector).text().trim();
}
/**
 * Calculates the absolute time from a relative time string.
 * @param relativeTime - The relative time string (e.g., "2 hours ago").
 * @returns The ISO-formatted absolute time string.
 */
function calculateAbsoluteTime(relativeTime: string): string {
  const parsedDate = chrono.parseDate(relativeTime, new Date());
  return parsedDate ? formatISO(parsedDate) : formatISO(new Date());
}

/**
 * Fetches the likes and dislikes for a specific commit.
 * @param commitId - The ID of the commit.
 * @returns An object containing the number of likes and dislikes.
 */
async function fetchLikesDislikes(
  commitId: number
): Promise<{ likes: number | null; dislikes: number | null }> {
  try {
    const response = await fetch(`${BASE_URL}/${commitId}`, {
      headers: HEADERS,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch commit page: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Selectors for likes and dislikes
    const likesText = $('.likes .like-button[like-type="0"]').text().trim();
    const dislikesText = $('.likes .like-button[like-type="1"]').text().trim();

    // Extract numbers from the text (e.g., "thumb_up 3")
    const likesMatch = likesText.match(/(\d+)/);
    const dislikesMatch = dislikesText.match(/(\d+)/);

    const likes = likesMatch ? parseInt(likesMatch[1], 10) : 0;
    const dislikes = dislikesMatch ? parseInt(dislikesMatch[1], 10) : 0;

    return { likes, dislikes };
  } catch (error) {
    logError(`Error fetching likes for commit ${commitId}`, error);
    return { likes: null, dislikes: null };
  }
}

/**
 * Logs error messages with a consistent format.
 * @param message - The custom error message.
 * @param error - The error object.
 */
function logError(message: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`${message}: ${error.message}`, error);
  } else {
    console.error(`${message}: ${String(error)}`);
  }
}
