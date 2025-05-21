"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaCalendarAlt, FaCode, FaExternalLinkAlt, FaSearch, FaFilter } from "react-icons/fa";
import { Commit } from "../_components/types";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

// Modern loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="relative w-20 h-20">
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-2 border-transparent border-t-red-600 animate-spin"></div>
      <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-2 border-transparent border-r-red-600 animate-spin animation-delay-150"></div>
      <div className="absolute top-4 left-4 right-4 bottom-4 rounded-full border-2 border-transparent border-b-red-600 animate-spin animation-delay-300"></div>
      <div className="absolute inset-0 flex items-center justify-center text-red-600 text-xs font-mono">RUST</div>
    </div>
  </div>
);

export default function CommitsPage() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [filteredCommits, setFilteredCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [expandedCommits, setExpandedCommits] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<string>("newest");
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [retryCount, setRetryCount] = useState<number>(0);
  
  const perPage = 15;
  const observerTarget = useRef<HTMLDivElement>(null);
  const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds
  const REFRESH_COOLDOWN = 5 * 60; // 5 minutes in seconds
  const MAX_RETRIES = 3;
  const TIMEOUT_DURATION = 30000; // 30 seconds
  
  // Update cooldown timer
  useEffect(() => {
    if (!lastFetched) return;
    
    const updateCooldown = () => {
      const now = Date.now();
      const elapsed = (now - lastFetched) / 1000; // convert to seconds
      const remaining = REFRESH_COOLDOWN - elapsed;
      
      if (remaining <= 0) {
        setCooldownRemaining(0);
        return;
      }
      
      setCooldownRemaining(Math.ceil(remaining));
    };
    
    // Initial update
    updateCooldown();
    
    // Set interval to update every second
    const interval = setInterval(updateCooldown, 1000);
    
    return () => clearInterval(interval);
  }, [lastFetched]);
  
  // Format seconds to MM:SS
  const formatCooldown = (seconds: number): string => {
    if (seconds <= 0) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Client-side caching function
  const fetchWithCache = async (forceRefresh = false, retry = 0) => {
    try {
      setLoading(true);
      setError(null);
      const now = Date.now();
      
      // Check if we have cached data in localStorage
      const cachedData = localStorage.getItem('cachedCommits');
      const cachedTimestamp = localStorage.getItem('cachedCommitsTimestamp');
      
      // If we have recent cached data and we're not forcing a refresh, use the cache
      if (!forceRefresh && cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < CACHE_EXPIRY) {
        console.log("Using cached commits data");
        const data = JSON.parse(cachedData);
        setCommits(data);
        setFilteredCommits(data);
        setLastFetched(parseInt(cachedTimestamp));
        setLoading(false);
        setRetryCount(0);
        return;
      }

      // Otherwise, fetch fresh data
      console.log(`Fetching fresh commits data (attempt ${retry + 1}/${MAX_RETRIES + 1})`);
      const res = await fetch("/api/commits?limit=150", { 
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_DURATION)  
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Failed to parse error response" }));
        throw new Error(errorData.message || `Error fetching commits: ${res.statusText}`);
      }
      
      const data = await res.json();
      
      if (data && data.length > 0) {
        // Cache the data in localStorage
        localStorage.setItem('cachedCommits', JSON.stringify(data));
        localStorage.setItem('cachedCommitsTimestamp', now.toString());
        
        // Log for debug
        console.log("Sample commit time format:", data[0].created);
        console.log("Sample author name:", data[0].user.name);
        
        setCommits(data);
        setFilteredCommits(data);
        setLastFetched(now);
        setCooldownRemaining(REFRESH_COOLDOWN);
        setRetryCount(0);
      } else {
        throw new Error("Received empty data from API");
      }
    } catch (error: unknown) {
      console.error("Failed to fetch commits:", error);
      
      // Check if it's a timeout error
      const err = error as any; // Type assertion to access properties
      const isTimeout = (err.name === 'TimeoutError' || 
                        err.name === 'AbortError' || 
                        (typeof err.message === 'string' && err.message.includes('timeout')));
      
      // Try to retry if it's a timeout and we haven't exceeded max retries
      if (isTimeout && retry < MAX_RETRIES) {
        console.log(`Request timed out. Retrying (${retry + 1}/${MAX_RETRIES})...`);
        setError(`Request timed out. Retrying (${retry + 1}/${MAX_RETRIES})...`);
        
        // Set a small delay before retrying (increasing with each retry)
        const retryDelay = (retry + 1) * 2000; // 2s, 4s, 6s
        setTimeout(() => {
          fetchWithCache(forceRefresh, retry + 1);
        }, retryDelay);
        
        return; // Exit this try/catch block, we'll retry
      }
      
      // Format a user-friendly error message
      let errorMessage = "Failed to load commits";
      if (isTimeout) {
        errorMessage = "The request timed out. The server might be busy. Please try again later.";
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
      setRetryCount(retry);
      
      // Try to use cached data even if it's expired
      const cachedData = localStorage.getItem('cachedCommits');
      if (cachedData) {
        console.log("Using expired cached data as fallback");
        const data = JSON.parse(cachedData);
        setCommits(data);
        setFilteredCommits(data);
      }
    } finally {
      if (retryCount >= MAX_RETRIES) {
        setLoading(false);
      }
    }
  };

  // Fetch commits on mount
  useEffect(() => {
    fetchWithCache();
    
    // Set up a refresh interval that respects cache
    const interval = setInterval(() => {
      if (lastFetched && (Date.now() - lastFetched > CACHE_EXPIRY)) {
        console.log("Refreshing commits data");
        fetchWithCache();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [lastFetched]);
  
  // Filter and sort commits
  useEffect(() => {
    let result = [...commits];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(commit => 
        commit.message.toLowerCase().includes(term) || 
        commit.user.name.toLowerCase().includes(term) ||
        commit.repo.toLowerCase().includes(term) ||
        commit.branch.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (filter !== "all") {
      result = result.filter(commit => {
        if (filter === "rust_reboot") return commit.repo === "rust_reboot";
        if (filter === "main") return commit.branch === "main";
        return true;
      });
    }
    
    // Apply sorting - simplified to rely on original order or its reverse
    if (sortBy === "oldest") {
      // Simply reverse the array for oldest first
      result.reverse();
    } else if (sortBy === "likes") {
      // Only sort if we're sorting by likes
      result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    // For "newest" we don't sort as the data is already in newest-first order
    
    setFilteredCommits(result);
  }, [commits, searchTerm, filter, sortBy]);
  
  // Intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && page * perPage < filteredCommits.length) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );
    
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    return () => observer.disconnect();
  }, [filteredCommits.length, page]);
  
  const displayedCommits = filteredCommits.slice(0, page * perPage);
  
  // Toggle commit expansion
  const toggleCommitExpand = (id: number) => {
    setExpandedCommits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  
  // Clean username (remove @ and special chars)
  const cleanUsername = (name: string) => {
    return name.replace(/[@]/g, '').trim();
  };
  
  // Format date for display - prioritize using the exact original relative time from Facepunch
  const formatDate = (dateString: string, relativeTime: string) => {
    // Directly use the original format from Facepunch API (e.g. "14 Minutes Ago")
    if (relativeTime && relativeTime.trim() !== '') {
      return relativeTime;
    }
    
    // Fallback to calculated time
    try {
      const date = new Date(dateString);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  // Render loading state
  if (loading) return <LoadingSpinner />;
  
  // Render error state
  if (error && !loading && commits.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-900/20 text-red-400 p-6 rounded-lg border border-red-800">
            <h2 className="text-xl font-bold mb-2">Error Loading Commits</h2>
            <p className="mb-4">{error}</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => fetchWithCache(true)}
                className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header with title and stats */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 flex items-center mb-2">
                <FaCode className="mr-3 text-red-500" />
                Rust Commit History
              </h1>
              <p className="text-gray-400 text-sm">
                Tracking {commits.length} updates from the Facepunch development team
                {lastFetched && (
                  <span className="ml-2 text-xs text-gray-500">
                    Last updated: {new Date(lastFetched).toLocaleTimeString()}
                  </span>
                )}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <button
                onClick={() => fetchWithCache(true)}
                className={`group flex items-center h-9 px-3 py-1.5 rounded-md relative transition-all duration-200 ${
                  cooldownRemaining > 0 && !loading 
                    ? 'bg-gray-800/30 text-gray-500 border border-gray-700/30' 
                    : 'bg-gray-800/50 hover:bg-gray-700/70 text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600'
                }`}
                disabled={loading || cooldownRemaining > 0}
                title={cooldownRemaining > 0 ? `Available in ${formatCooldown(cooldownRemaining)}` : "Refresh commits data"}
              >
                <svg 
                  className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-red-500' : cooldownRemaining > 0 ? 'text-gray-600' : 'text-gray-400 group-hover:text-red-400'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="ml-1.5 text-sm font-medium">
                  {loading ? 'Refreshing...' : 'Refresh'}
                </span>
                {cooldownRemaining > 0 && !loading && (
                  <span className="ml-1.5 text-xs opacity-80 font-mono tracking-tight">
                    {formatCooldown(cooldownRemaining)}
                  </span>
                )}
                {cooldownRemaining > 0 && !loading && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-700 overflow-hidden rounded-full">
                    <div 
                      className="h-full bg-red-600/40 transition-all duration-200" 
                      style={{ 
                        width: `${100 - (cooldownRemaining / REFRESH_COOLDOWN * 100)}%`,
                      }}
                    />
                  </div>
                )}
              </button>
              
              <Link 
                href="/"
                className="flex items-center px-4 py-2 rounded-md bg-red-900/20 hover:bg-red-800/40 transition-colors border border-red-900/30 text-red-400"
              >
                <span>Back to Calculator</span>
              </Link>
              <a 
                href="https://commits.facepunch.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-3 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <FaExternalLinkAlt className="mr-1" />
                <span className="text-sm">View on Facepunch</span>
              </a>
            </div>
          </div>
          
          {/* Filters and search */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full md:w-auto flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search commits, authors, repos..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full bg-black border border-gray-800 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 text-sm text-gray-200"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="flex items-center bg-black rounded-md border border-gray-800 overflow-hidden">
                  <div className="px-3 py-2 bg-gray-900 text-gray-400 text-sm flex items-center">
                    <FaFilter className="mr-2" />
                    <span>Repo</span>
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => { setFilter(e.target.value); setPage(1); }}
                    className="bg-black text-white px-3 py-2 border-0 focus:outline-none text-sm"
                  >
                    <option value="all">All Repos</option>
                    <option value="rust_reboot">rust_reboot</option>
                    <option value="main">main branch</option>
                  </select>
                </div>
                
                <div className="flex items-center bg-black rounded-md border border-gray-800 overflow-hidden">
                  <div className="px-3 py-2 bg-gray-900 text-gray-400 text-sm flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    <span>Sort</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                    className="bg-black text-white px-3 py-2 border-0 focus:outline-none text-sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="likes">Most Likes</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-400 flex items-center">
              <span>Showing {displayedCommits.length} of {filteredCommits.length} commits</span>
              {searchTerm && <span className="ml-2">matching &quot;{searchTerm}&quot;</span>}
            </div>
          </div>
        </header>
        
        {/* Results */}
        {filteredCommits.length === 0 ? (
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-medium text-gray-400 mb-2">No commits found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {displayedCommits.map((commit, index) => (
                <motion.div 
                  key={commit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="bg-gray-900/20 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors group"
                >
                  <div className="p-4 md:p-5">
                    {/* Header with author info */}
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        {commit.user.avatar ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-800">
                            <Image 
                              src={commit.user.avatar}
                              alt={commit.user.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-red-900 to-red-700 text-white font-medium">
                            {cleanUsername(commit.user.name).charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      </div>
                      
                      <div className="ml-3">
                        <div className="font-medium text-white">{cleanUsername(commit.user.name)}</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-500" />
                          {/* Directly use the created time from the API to match Facepunch format */}
                          {commit.created || formatDate(commit.created_at, '')}
                        </div>
                      </div>
                      
                      <div className="ml-auto flex items-center">
                        <div className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400 mr-2">
                          #{commit.changeset.substring(0, 7)}
                        </div>
                        <div className="hidden md:block text-xs px-2 py-1 rounded bg-red-900/30 text-red-400 border border-red-900/30">
                          {commit.repo}/{commit.branch}
                        </div>
                      </div>
                    </div>
                    
                    {/* Commit message */}
                    <div className={`bg-black/40 rounded-md p-3 border border-gray-800/50 mb-3 relative ${expandedCommits.has(commit.id) ? '' : 'max-h-24 overflow-hidden'}`}>
                      {!expandedCommits.has(commit.id) && commit.message.length > 150 && (
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                      )}
                      
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {commit.message}
                      </p>
                    </div>
                    
                    {/* Footer with actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="bg-gray-800/50 hover:bg-gray-800 text-xs px-2 py-1 rounded flex items-center text-gray-300">
                          <span className="text-green-500 mr-1">👍</span> {commit.likes || 0}
                        </button>
                        <button className="bg-gray-800/50 hover:bg-gray-800 text-xs px-2 py-1 rounded flex items-center text-gray-300">
                          <span className="text-red-500 mr-1">👎</span> {commit.dislikes || 0}
                        </button>
                      </div>
                      
                      {commit.message.length > 150 && (
                        <button 
                          onClick={() => toggleCommitExpand(commit.id)}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-red-900/30 text-red-400 hover:bg-red-800/40 transition-colors"
                        >
                          {expandedCommits.has(commit.id) ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Load more trigger */}
            {filteredCommits.length > displayedCommits.length && (
              <div 
                ref={observerTarget}
                className="py-8 flex justify-center"
              >
                <div className="w-8 h-8 border-t-2 border-red-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )}
        
        {/* Footer */}
        <footer className="mt-16 py-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>Data sourced from Facepunch commits. Not affiliated with Facepunch Studios.</p>
          <p className="mt-2">
            <a 
              href="https://commits.facepunch.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              View Original Commit Feed
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
} 