// src/app/commits/CommitList.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Commit {
  id: number;
  repo: string;
  branch: string;
  changeset: string;
  created: string;
  created_at: string; // Assuming you have the absolute timestamp
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
  const commitsPerPage = 3;

  useEffect(() => {
    fetch("/api/commits")
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Failed to fetch commits");
          });
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

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Latest Rust Reboot Commits
        </h1>
        <div className="space-y-6">
          {currentCommits.map((commit) => (
            <div
              key={commit.id}
              className="border border-white rounded-lg p-6 hover:shadow-xl transition-shadow h-72 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <Image
                  src={commit.user.avatar}
                  alt={`${commit.user.name}'s avatar`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <p className="text-xl font-semibold">{commit.user.name}</p>
                  <p className="text-gray-400">
                    {commit.created_at
                      ? formatDistanceToNow(parseISO(commit.created_at), {
                          addSuffix: true,
                        })
                      : commit.created}
                  </p>
                </div>
              </div>
              {/* Body */}
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2 line-clamp-3">
                  {commit.message}
                </h2>
                <p className="text-gray-400 mb-4">
                  <strong>Repo:</strong> {commit.repo} |{" "}
                  <strong>Branch:</strong> {commit.branch}
                </p>
              </div>
              {/* Footer */}
              {commit.likes !== null && (
                <div className="flex items-center space-x-6 mt-auto">
                  <div className="flex items-center text-green-400">
                    <FaThumbsUp className="h-6 w-6 mr-1" />
                    <span className="font-medium">{commit.likes}</span>
                  </div>
                  <div className="flex items-center text-red-500">
                    <FaThumbsDown className="h-6 w-6 mr-1" />
                    <span className="font-medium">{commit.dislikes}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-2">
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
            Page <span className="text-green-500"> {currentPage}</span> of{" "}
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
