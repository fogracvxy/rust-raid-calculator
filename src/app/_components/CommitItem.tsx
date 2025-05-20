// CommitItem.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { CommitItemProps } from "./types";
import { truncateMessage } from "../utils/stringUtils";

const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Define the component separately
const CommitItemComponent: React.FC<CommitItemProps> = ({
  commit,
  isExpanded,
  toggleExpand,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set a small delay to ensure smooth appearance
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const charLimit = 80; // Set your character limit
  const isMessageLong = commit.message.length > charLimit;

  // Determine the message to display
  const displayMessage = isExpanded
    ? commit.message
    : isMessageLong
    ? truncateMessage(commit.message, charLimit)
    : commit.message;

  // Safely parse the date
  const formattedDate = commit.created_at
    ? formatDistanceToNow(parseISO(commit.created_at), {
        addSuffix: true,
      })
    : commit.created;

  return (
    <div 
      className={`border border-gray-800 rounded-lg bg-black hover:bg-gray-900 transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0 scale-95'}`} 
      style={{ width: '100%', maxWidth: '100%' }}
    >
      <div className="p-4 flex flex-col" style={{ height: '180px', width: '100%' }}>
        {/* Header */}
        <div className="flex items-center mb-2 w-full">
          {isValidUrl(commit.user.avatar) ? (
            <div className="w-8 h-8 flex-shrink-0">
              <Image
                src={commit.user.avatar as string}
                alt={`${commit.user.name}'s avatar`}
                width={32}
                height={32}
                className="rounded-full"
                placeholder="blur"
                blurDataURL="/images/placeholders/user.png"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm flex-shrink-0">
              {commit.user.name.charAt(0)}
            </div>
          )}
          <div className="ml-2 overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{commit.user.name}</p>
            <p className="text-gray-400 text-xs truncate">{formattedDate}</p>
          </div>
        </div>
        
        {/* Repo/Branch info - now at the top */}
        <div className="text-gray-400 text-xs truncate mb-2 w-full">
          <strong>Repo:</strong> {commit.repo} | <strong>Branch:</strong> {commit.branch}
        </div>
        
        {/* Message container - with scrolling */}
        <div className="flex-grow overflow-hidden w-full">
          <div 
            className="text-white font-bold text-sm overflow-auto pr-1"
            style={{ 
              height: '80px',
              width: '100%',
              scrollbarWidth: 'thin',
              scrollbarColor: '#4a5568 #1a202c',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap'
            }}
          >
            {displayMessage}
          </div>
        </div>
          
        {/* Footer with likes/dislikes */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800 w-full">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center text-green-400">
              <FaThumbsUp className="h-3 w-3 mr-1" />
              <span className="font-medium text-xs">{commit.likes ?? 0}</span>
            </div>
            <div className="flex items-center text-red-500">
              <FaThumbsDown className="h-3 w-3 mr-1" />
              <span className="font-medium text-xs">{commit.dislikes ?? 0}</span>
            </div>
          </div>
          
          {/* View More button */}
          {isMessageLong && (
            <button
              onClick={toggleExpand}
              className="text-blue-500 hover:text-blue-300 text-xs focus:outline-none flex-shrink-0"
            >
              {isExpanded ? "Show Less" : "View More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Set the displayName property
CommitItemComponent.displayName = "CommitItem";

// Wrap the component with React.memo
const CommitItem = React.memo(CommitItemComponent);

export default CommitItem;
