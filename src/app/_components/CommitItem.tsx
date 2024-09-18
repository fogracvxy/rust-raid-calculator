// CommitItem.tsx

import React from "react";
import Image from "next/image";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

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

interface CommitItemProps {
  commit: Commit;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const CommitItem: React.FC<CommitItemProps> = ({
  commit,
  isExpanded,
  toggleExpand,
}) => {
  const charLimit = 80; // Set your character limit
  const isMessageLong = commit.message.length > charLimit;

  // Function to truncate the message without cutting off words
  const truncateMessage = (message: string, limit: number) => {
    if (message.length <= limit) return message;
    const truncated = message.slice(0, limit);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex === -1) return truncated + "...";
    return truncated.slice(0, lastSpaceIndex) + "...";
  };

  // Determine the message to display
  const displayMessage = isExpanded
    ? commit.message
    : isMessageLong
    ? truncateMessage(commit.message, charLimit)
    : commit.message;

  return (
    <div className="border border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-xl transition-shadow w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-2">
        {commit.user.avatar ? (
          <Image
            src={commit.user.avatar}
            alt={`${commit.user.name}'s avatar`}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl">
            {commit.user.name.charAt(0)}
          </div>
        )}
        <div className="ml-4">
          <p className="text-lg sm:text-xl font-semibold">{commit.user.name}</p>
          <p className="text-gray-400 text-sm sm:text-base">
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
        <div className="text-lg sm:text-xl font-bold mb-2">
          {displayMessage}
        </div>
        <p className="text-gray-400 text-sm sm:text-base">
          <strong>Repo:</strong> {commit.repo} | <strong>Branch:</strong>{" "}
          {commit.branch}
        </p>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-green-400">
            <FaThumbsUp className="h-5 w-5 mr-1" />
            <span className="font-medium">{commit.likes ?? 0}</span>
          </div>
          <div className="flex items-center text-red-500">
            <FaThumbsDown className="h-5 w-5 mr-1" />
            <span className="font-medium">{commit.dislikes ?? 0}</span>
          </div>
        </div>
        {/* Conditionally render "View More" button */}
        {isMessageLong && (
          <button
            onClick={toggleExpand}
            className="text-blue-500 hover:text-blue-300 text-sm sm:text-base focus:outline-none"
          >
            {isExpanded ? "Show Less" : "View More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommitItem;
