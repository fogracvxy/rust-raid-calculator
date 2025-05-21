// CommitList.tsx

"use client";

import React, { useEffect, useState, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CommitItem from "./CommitItem";
import { Commit } from "./types";
import { motion, AnimatePresence } from "framer-motion";

export default function CommitList() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedCommitIds, setExpandedCommitIds] = useState<Set<number>>(new Set());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCommits, setVisibleCommits] = useState<Commit[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds
  const CACHE_KEY = 'homePageCommits';
  const MAX_RETRIES = 3;
  const TIMEOUT_DURATION = 30000; // 30 seconds
  
  // Load more visible commits on larger screens
  useEffect(() => {
    const updateVisibleCommits = () => {
      if (commits.length === 0) return;
      
      // Determine how many commits to show based on screen size
      let numVisible = 2; // Default for mobile
      if (window.innerWidth >= 1024) numVisible = 4;
      else if (window.innerWidth >= 768) numVisible = 3;
      
      setVisibleCommits(commits.slice(0, numVisible));
    };
    
    updateVisibleCommits();
    window.addEventListener('resize', updateVisibleCommits);
    
    return () => window.removeEventListener('resize', updateVisibleCommits);
  }, [commits]);

  // Client-side caching function with retry mechanism
  const fetchCommitsWithCache = async (forceRefresh = false, retry = 0) => {
    try {
      setLoading(true);
      setError(null);
      const now = Date.now();
      
      // First check if we have cached data in localStorage
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
      
      // If we have recent cached data and we're not forcing a refresh, use it
      if (!forceRefresh && cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < CACHE_EXPIRY) {
        console.log("HomePage: Using cached commits data");
        const data = JSON.parse(cachedData);
        setCommits(data);
        
        // Initial visible commits set based on screen size
        const numVisible = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;
        setVisibleCommits(data.slice(0, numVisible));
        
        setLastFetched(parseInt(cachedTimestamp));
        setLoading(false);
        setRetryCount(0);
        return;
      }
      
      // Otherwise, fetch fresh data
      console.log(`HomePage: Fetching fresh commits data (attempt ${retry + 1}/${MAX_RETRIES + 1})`);
      const res = await fetch("/api/commits?limit=150", { 
        cache: "no-store",
        signal: AbortSignal.timeout(TIMEOUT_DURATION)  
      });
      
      if (!res.ok) {
        try {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch commits");
        } catch (parseError) {
          throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
        }
      }
      
      const data = await res.json();
      
      // Validate data
      if (!data || data.length === 0) {
        throw new Error("Received empty data from API");
      }
      
      // Debug: Log sample commits
      if (data.length > 0) {
        console.log("HomePage - Sample commit data:", {
          name: data[0].user.name,
          time: data[0].created,
          id: data[0].id
        });
      }
      
      // Cache the data in localStorage
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());
      
      // Use the data directly without modifying formats
      // to preserve the exact Facepunch display style
      setCommits(data);
      
      // Initial visible commits set
      const numVisible = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;
      setVisibleCommits(data.slice(0, numVisible));
      
      setLastFetched(now);
      setLoading(false);
      setRetryCount(0);
    } catch (error: unknown) {
      console.error("HomePage: Error fetching commits:", error);
      
      // Check if it's a timeout error
      const err = error as any; // Type assertion to access properties
      const isTimeout = (err.name === 'TimeoutError' || 
                        err.name === 'AbortError' || 
                        (typeof err.message === 'string' && err.message.includes('timeout')));
      
      // Try to retry if it's a timeout and we haven't exceeded max retries
      if (isTimeout && retry < MAX_RETRIES) {
        console.log(`HomePage: Request timed out. Retrying (${retry + 1}/${MAX_RETRIES})...`);
        setError(`Loading commits... Retrying (${retry + 1}/${MAX_RETRIES})`);
        
        // Set a small delay before retrying (increasing with each retry)
        const retryDelay = (retry + 1) * 2000; // 2s, 4s, 6s
        setTimeout(() => {
          fetchCommitsWithCache(forceRefresh, retry + 1);
        }, retryDelay);
        
        return; // Exit this try/catch block, we'll retry
      }
      
      // Format a user-friendly error message
      let errorMessage = "Failed to load commit updates";
      if (isTimeout) {
        errorMessage = "The request timed out. The server might be busy. Please try again later.";
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
      setRetryCount(retry);
      
      // Try to use cached data even if it's expired as a fallback
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        console.log("HomePage: Using expired cached data as fallback");
        const data = JSON.parse(cachedData);
        setCommits(data);
        
        // Initial visible commits set
        const numVisible = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;
        setVisibleCommits(data.slice(0, numVisible));
      }
    } finally {
      if (retryCount >= MAX_RETRIES) {
        setLoading(false);
      }
    }
  };

  // Fetch commits on mount and set up refresh interval
  useEffect(() => {
    fetchCommitsWithCache();
    
    // Set up a refresh interval that respects cache
    const interval = setInterval(() => {
      // Only refresh if cache is expired
      if (lastFetched && (Date.now() - lastFetched > CACHE_EXPIRY)) {
        console.log("HomePage: Refreshing commits data");
        fetchCommitsWithCache();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [lastFetched]);
  
  useEffect(() => {
    // Check scroll ability whenever visible commits change
    if (scrollContainerRef.current && commits.length > 0) {
      const container = scrollContainerRef.current;
      setCanScrollRight(container.scrollWidth > container.clientWidth);
    }
  }, [visibleCommits, commits]);
  
  // Function to check if scroll buttons should be displayed
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // Threshold
    }
  };
  
  // Add scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, []);
  
  const scrollPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.commit-card')?.clientWidth ?? 0;
      scrollContainerRef.current.scrollBy({ left: -cardWidth - 16, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (activeIndex < commits.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.commit-card')?.clientWidth ?? 0;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
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

  // Manual refresh function
  const handleRefresh = () => {
    fetchCommitsWithCache(true, 0);
  };

  // Show loading state with skeleton UI
  if (loading) {
    return (
      <div className="pt-2">
        <div className="flex space-x-4 overflow-hidden pb-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] h-[180px] bg-gray-900/40 rounded-lg animate-pulse">
              <div className="p-4 h-full flex flex-col">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                  <div className="ml-2 space-y-1">
                    <div className="h-2 w-24 bg-gray-800 rounded"></div>
                    <div className="h-2 w-16 bg-gray-800 rounded"></div>
                  </div>
                </div>
                <div className="mt-2 h-2 w-full bg-gray-800 rounded"></div>
                <div className="mt-2 space-y-2 flex-grow">
                  <div className="h-2 w-full bg-gray-800 rounded"></div>
                  <div className="h-2 w-3/4 bg-gray-800 rounded"></div>
                  <div className="h-2 w-1/2 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Error state with retry button
  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-900/20 backdrop-blur-sm rounded-lg border border-red-800">
        <div className="text-center">
          <div className="text-red-500 font-bold mb-2">{error}</div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (commits.length === 0) {
    return (
      <div className="text-center p-6 border border-gray-800 rounded-lg bg-gray-900/30">
        <svg className="w-12 h-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-gray-400">No commits available yet.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Heading with badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-white">Latest Updates</h3>
          <div className="ml-3 bg-red-900/30 px-2 py-0.5 rounded-full border border-red-800/30 text-red-400 text-xs font-medium">
            {commits.length} commits
          </div>
          {lastFetched && (
            <div className="ml-2 text-xs text-gray-500 hidden sm:block">
              Last updated: {new Date(lastFetched).toLocaleTimeString()}
            </div>
          )}
        </div>
        
        {/* Navigation arrows for larger screens */}
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-1.5 rounded-full border text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-colors focus:outline-none"
            aria-label="Refresh commits"
          >
            <svg 
              className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            className={`p-1.5 rounded-full border ${
              canScrollLeft 
                ? 'text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600' 
                : 'text-gray-700 border-gray-800 cursor-not-allowed'
            } transition-colors focus:outline-none`}
            aria-label="Previous commit"
          >
            <MdChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollRight}
            className={`p-1.5 rounded-full border ${
              canScrollRight 
                ? 'text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600' 
                : 'text-gray-700 border-gray-800 cursor-not-allowed'
            } transition-colors focus:outline-none`}
            aria-label="Next commit"
          >
            <MdChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Scroll shadows for better visual indication */}
      <div className="relative">
        <div className={`absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent ${canScrollLeft ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent ${canScrollRight ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
       
        {/* Modern scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide pb-4 pt-1 -mx-1 px-1 snap-x"
          style={{ scrollBehavior: 'smooth' }}
          onScroll={checkScrollability}
        >
          <AnimatePresence>
            {commits.map((commit, index) => (
              <motion.div
                key={commit.id}
                className="flex-shrink-0 w-[300px] sm:w-[320px] mr-4 last:mr-0 snap-start commit-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CommitItem
                  commit={commit}
                  isExpanded={expandedCommitIds.has(commit.id)}
                  toggleExpand={() => toggleExpand(commit.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Mobile pagination dots */}
      <div className="flex justify-center mt-4 space-x-1.5 sm:hidden">
        {commits.slice(0, Math.min(5, commits.length)).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? 'bg-red-600 w-4' : 'bg-gray-700'
            }`}
            onClick={() => {
              if (scrollContainerRef.current) {
                const cardWidth = scrollContainerRef.current.querySelector('.commit-card')?.clientWidth ?? 0;
                scrollContainerRef.current.scrollTo({ 
                  left: index * (cardWidth + 16),
                  behavior: 'smooth'
                });
                setActiveIndex(index);
              }
            }}
            aria-label={`Go to commit ${index + 1}`}
          />
        ))}
        {commits.length > 5 && (
          <div className="text-gray-600 pl-1 text-xs flex items-center">+{commits.length - 5}</div>
        )}
      </div>
      
      {/* View all button */}
      {commits.length > 4 && (
        <div className="text-center mt-5">
          <a 
            href="/commits" 
            className="inline-flex items-center px-4 py-2 rounded-md bg-red-900/30 text-red-400 border border-red-900/30 hover:bg-red-800/40 transition-colors text-sm font-medium group"
          >
            <span>View all updates</span>
            <svg 
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
