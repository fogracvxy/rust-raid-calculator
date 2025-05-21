// CommitItem.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { CommitItemProps } from "./types";
import { truncateMessage } from "../utils/stringUtils";
import { motion } from "framer-motion";

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
  const [isHovered, setIsHovered] = useState(false);
  
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

  // Use the original created time from the API directly
  // This preserves the Facepunch format like "14 Minutes Ago"
  const formattedDate = commit.created || '';
    
  // Label styles based on repo/branch
  const getRepoColor = () => {
    const repoName = commit.repo.toLowerCase();
    if (repoName.includes('frontend')) return 'bg-blue-900/50 text-blue-400 border-blue-900/50';
    if (repoName.includes('backend')) return 'bg-green-900/50 text-green-400 border-green-900/50';
    if (repoName.includes('api')) return 'bg-purple-900/50 text-purple-400 border-purple-900/50';
    return 'bg-gray-800/50 text-gray-400 border-gray-800/50';
  };

  // Use the original name from Facepunch
  const displayName = commit.user.name;

  return (
    <motion.div 
      className={`rounded-lg transition-all duration-300 h-full ${isLoaded ? 'opacity-100' : 'opacity-0 scale-95'}`}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`relative h-full overflow-hidden backdrop-blur-sm border rounded-lg transition-all duration-300 ${
        isHovered 
          ? 'border-red-900/50 bg-gradient-to-b from-gray-900/90 to-black shadow-lg shadow-red-900/5' 
          : 'border-gray-800 bg-gray-900/30'
      }`}>
        {/* Subtle animated light effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-red-900/0 via-red-800/0 to-red-700/0 transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}></div>
        
        <div className="p-4 flex flex-col h-full">
          {/* Header with user info and time */}
          <div className="flex items-center mb-2.5">
            <div className="relative">
              {isValidUrl(commit.user.avatar) ? (
                <div className="relative w-9 h-9 flex-shrink-0 rounded-full overflow-hidden border border-gray-800 shadow-inner">
                  <Image
                    src={commit.user.avatar as string}
                    alt={`${displayName}'s avatar`}
                    fill
                    sizes="36px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/images/placeholders/user.png"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-sm font-medium flex-shrink-0 border border-gray-800 shadow-inner">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Online status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            
            <div className="ml-2.5 overflow-hidden flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {displayName}
              </p>
              <p className="text-gray-400 text-xs flex items-center">
                <svg className="h-3 w-3 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formattedDate}
              </p>
            </div>
          </div>
          
          {/* Repo/Branch info - as badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <div className={`text-xs px-1.5 py-0.5 rounded border text-center ${getRepoColor()}`}>
              {commit.repo}
            </div>
            <div className="text-xs px-1.5 py-0.5 rounded bg-gray-800/70 border border-gray-700/50 text-gray-300">
              {commit.branch}
            </div>
            <div className="text-xs px-1.5 py-0.5 rounded bg-red-900/30 border border-red-900/30 text-red-400">
              {commit.changeset.substring(0, 7)}
            </div>
          </div>
          
          {/* Message container with improved styling */}
          <div className="flex-grow bg-black/20 rounded-md border border-gray-800/50 p-2.5 mb-3 overflow-hidden relative">
            {/* Overlay gradient fade for text overflow */}
            {!isExpanded && isMessageLong && (
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>
            )}
            
            <div 
              className={`text-gray-200 text-sm overflow-auto pr-1 ${isExpanded ? 'max-h-full' : 'max-h-[85px]'}`}
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: '#4a5568 #1a202c',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.4'
              }}
            >
              {displayMessage}
            </div>
          </div>
          
          {/* Footer with likes/dislikes and expand button */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 bg-gray-800/50 hover:bg-gray-800 rounded-full px-2 py-1 transition-colors">
                <FaThumbsUp className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium text-gray-300">{commit.likes ?? 0}</span>
              </button>
              <button className="flex items-center space-x-1 bg-gray-800/50 hover:bg-gray-800 rounded-full px-2 py-1 transition-colors">
                <FaThumbsDown className="h-3 w-3 text-red-500" />
                <span className="text-xs font-medium text-gray-300">{commit.dislikes ?? 0}</span>
              </button>
            </div>
            
            {/* View More button */}
            {isMessageLong && (
              <button
                onClick={toggleExpand}
                className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
                  isExpanded 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-red-900/30 text-red-400 hover:bg-red-800/50'
                }`}
              >
                {isExpanded ? "Show Less" : "View More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Set the displayName property
CommitItemComponent.displayName = "CommitItem";

// Wrap the component with React.memo
const CommitItem = React.memo(CommitItemComponent);

export default CommitItem;
