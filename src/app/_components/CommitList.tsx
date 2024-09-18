// CommitList.tsx

"use client";

import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CommitItem from "./CommitItem"; // Import the updated component

interface Commit {
  id: number;
  repo: string;
  branch: string;
  changeset: string;
  created: string;
  created_at: string; // Absolute timestamp
  message: string;
  user: {
    name: string;
    avatar: string;
  };
  likes?: number | null;
  dislikes?: number | null;
}

export default function CommitList() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedCommitIds, setExpandedCommitIds] = useState<{
    [key: number]: boolean;
  }>({});

  const commitsPerPage = 3;

  useEffect(() => {
    fetch("/api/commits", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch commits");
        }
        return res.json();
      })
      .then((data) => setCommits(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error)
    return <div className="text-red-500 font-bold">Error: {error}</div>;
  if (commits.length === 0)
    return <div className="text-gray-500">Loading...</div>;

  // Calculate pagination
  const indexOfLastCommit = currentPage * commitsPerPage;
  const indexOfFirstCommit = indexOfLastCommit - commitsPerPage;
  const currentCommits = commits.slice(indexOfFirstCommit, indexOfLastCommit);
  const totalPages = Math.ceil(commits.length / commitsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Toggle expanded state for a specific commit
  const toggleExpand = (commitId: number) => {
    setExpandedCommitIds((prevState) => ({
      ...prevState,
      [commitId]: !prevState[commitId],
    }));
  };

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
              isExpanded={!!expandedCommitIds[commit.id]}
              toggleExpand={() => toggleExpand(commit.id)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:text-gray-300"
            }`}
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
            className={`${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:text-gray-300"
            }`}
          >
            <MdChevronRight className="h-8 w-8 text-red-800" />
          </button>
        </div>
      </div>
    </div>
  );
}
