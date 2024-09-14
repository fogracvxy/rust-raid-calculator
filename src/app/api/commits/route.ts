// src/app/api/commits/route.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as cheerio from "cheerio";
import { sub, formatISO } from "date-fns";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function GET(request: NextRequest) {
  try {
    const commits = await fetchLatestCommits(90); // Fetch the latest 50 commits
    const response = NextResponse.json(commits);

    // Add Cache-Control header to prevent caching
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (error: any) {
    console.error("Error fetching commits:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function fetchLatestCommits(limit: number): Promise<Commit[]> {
  const now = new Date();
  const commits: Commit[] = [];
  const commitPromises: Promise<void>[] = [];

  let page = 1;
  let hasMorePages = true;

  while (commits.length < limit && hasMorePages) {
    const url =
      page === 1
        ? "https://commits.facepunch.com/r/rust_reboot"
        : `https://commits.facepunch.com/r/rust_reboot?p=${page}`;

    // console.log(`Fetching page ${page}: ${url}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch commits from page ${page}: ${response.statusText}`
      );
    }

    const html = await response.text();
    // console.log(`Fetched HTML content length: ${html.length}`);

    const $ = cheerio.load(html);

    // Selector for commit elements
    const commitElements = $("div.commit.columns");
    // console.log(
    //   `Found ${commitElements.length} commit elements on page ${page}.`
    // );

    if (commitElements.length === 0) {
      // No more commits available
      hasMorePages = false;
      break;
    }

    commitElements.each((index, element) => {
      if (commits.length >= limit) return false;

      const el = $(element);

      // Extract data from the element

      // Commit ID from changeset link
      const changesetLink = el.find(".changeset a").attr("href");
      const idMatch = changesetLink ? changesetLink.match(/\/(\d+)/) : null;
      const id = idMatch ? parseInt(idMatch[1], 10) : 0;

      // Repository and branch
      const repo = el.find(".repository .repo a").text().trim();
      const branch = el.find(".repository .branch a").text().trim();
      if (repo !== "rust_reboot") {
        return; // Skip this commit if it's not from 'rust_reboot'
      }

      // Changeset
      const changeset = el.find(".changeset a").text().trim();

      // Created time (relative)
      const createdRelative = el.find(".time").text().trim();

      // Calculate absolute timestamp
      const createdAt = calculateAbsoluteTime(createdRelative, now);

      // Message
      const message = el.find(".commits-message").text().trim();

      // User name
      const userName = el.find(".author a").first().text().trim();

      // User avatar
      let userAvatar = el.find(".author .avatar img").attr("src") || "";
      if (!userAvatar) {
        userAvatar = el.find(".column.is-1 .avatar img").attr("src") || "";
      }

      // Check if the commit is hidden
      const isHidden = message.includes("█") || message.trim() === "";

      if (!isHidden) {
        // Initialize commit object without likes and dislikes
        const commit: Commit = {
          id,
          repo,
          branch,
          changeset,
          created: createdRelative,
          created_at: createdAt,
          message,
          user: {
            name: userName,
            avatar: userAvatar,
          },
          likes: null,
          dislikes: null,
        };

        commits.push(commit);

        // Fetch likes and dislikes for this commit
        const likesPromise = fetchLikesDislikes(id).then(
          ({ likes, dislikes }) => {
            commit.likes = likes;
            commit.dislikes = dislikes;
          }
        );

        commitPromises.push(likesPromise);
      }
    });

    page += 1;
  }

  // Wait for all likes/dislikes to be fetched
  await Promise.all(commitPromises);

  return commits.slice(0, limit);
}

function calculateAbsoluteTime(relativeTime: string, now: Date): string {
  const time = relativeTime.toLowerCase();

  let date: Date | null = null;

  if (time.includes("minute")) {
    const minutes = parseInt(time.match(/(\d+)/)?.[0] || "0", 10);
    date = sub(now, { minutes });
  } else if (time.includes("hour")) {
    const hours = parseInt(time.match(/(\d+)/)?.[0] || "0", 10);
    date = sub(now, { hours });
  } else if (time.includes("today")) {
    date = now;
  } else if (time.includes("yesterday")) {
    date = sub(now, { days: 1 });
  } else if (time.includes("day")) {
    const days = parseInt(time.match(/(\d+)/)?.[0] || "0", 10);
    date = sub(now, { days });
  } else if (time.includes("month")) {
    const months = parseInt(time.match(/(\d+)/)?.[0] || "0", 10);
    date = sub(now, { months });
  } else if (time.includes("year")) {
    const years = parseInt(time.match(/(\d+)/)?.[0] || "0", 10);
    date = sub(now, { years });
  } else {
    // If unable to parse, return empty string
    return "";
  }

  return formatISO(date);
}

async function fetchLikesDislikes(
  commitId: number
): Promise<{ likes: number | null; dislikes: number | null }> {
  try {
    // console.log(`Fetching likes and dislikes for commit ${commitId}`);
    const response = await fetch(`https://commits.facepunch.com/${commitId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
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
    console.error(`Error fetching likes for commit ${commitId}:`, error);
    return { likes: null, dislikes: null };
  }
}
