// CommitList.tsx

"use client";

import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import classNames from "classnames";
import CommitItem from "./CommitItem";
import { Commit } from "./types";

export default function CommitList() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedCommitIds, setExpandedCommitIds] = useState<Set<number>>(
    new Set()
  );

  const commitsPerPage = 3;

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await fetch("/api/commits", { cache: "no-store" });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch commits");
        }
        const data = await res.json();
        setCommits(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(commits.length / commitsPerPage);

  // Ensure currentPage is within valid range
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const indexOfLastCommit = currentPage * commitsPerPage;
  const indexOfFirstCommit = indexOfLastCommit - commitsPerPage;
  const currentCommits = commits.slice(indexOfFirstCommit, indexOfLastCommit);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Toggle expanded state for a specific commit
  const toggleExpand = (commitId: number) => {
    setExpandedCommitIds((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(commitId)) {
        newSet.delete(commitId);
      } else {
        newSet.add(commitId);
      }
      return newSet;
    });
  };

  // Conditional rendering based on loading, error, and data state
  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 font-bold">
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 text-blue-500"
        >
          Retry
        </button>
      </div>
    );
  }
  if (commits.length === 0) {
    return <div className="text-gray-500">No commits available.</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Latest Rust Reboot Commits
        </h1>
        <div className="space-y-4 sm:space-y-6">
          {currentCommits.map((commit) => (
            <CommitItem
              key={commit.id}
              commit={commit}
              isExpanded={expandedCommitIds.has(commit.id)}
              toggleExpand={() => toggleExpand(commit.id)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className={classNames({
              "text-gray-500 cursor-not-allowed": currentPage === 1,
              "text-white hover:text-gray-300": currentPage !== 1,
            })}
          >
            <MdChevronLeft className="h-8 w-8 text-red-800" />
          </button>
          <span className="text-lg font-medium">
            Page <span className="text-green-500">{currentPage}</span> of{" "}
            <span className="text-red-500">{totalPages}</span>
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
            className={classNames({
              "text-gray-500 cursor-not-allowed": currentPage === totalPages,
              "text-white hover:text-gray-300": currentPage !== totalPages,
            })}
          >
            <MdChevronRight className="h-8 w-8 text-red-800" />
          </button>
        </div>
      </div>
    </div>
  );
}
