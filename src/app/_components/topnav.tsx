"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { fetchServerData, ServerData } from "../utils/fetchsServerData";
import { motion, AnimatePresence } from "framer-motion";
import { getFavoriteServerId, clearFavoriteServerId } from "../utils/localStorageServers";
import { fetchServerById } from "../utils/localStorageServers";

export function TopNav() {
  const [serversData, setServersData] = useState<ServerData[] | null>(null);
  const [favoriteServer, setFavoriteServer] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const [showServerPopover, setShowServerPopover] = useState(false);
  const [showFavoritePopover, setShowFavoritePopover] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const serverPopoverRef = useRef<HTMLDivElement>(null);
  const favoritePopoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      if (serverPopoverRef.current && 
          !serverPopoverRef.current.contains(event.target as Node) && 
          showServerPopover) {
        setShowServerPopover(false);
      }
      
      if (favoritePopoverRef.current && 
          !favoritePopoverRef.current.contains(event.target as Node) && 
          showFavoritePopover) {
        setShowFavoritePopover(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, showServerPopover, showFavoritePopover]);

  // Fetch server data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchServerData();
        setServersData(data);

        // Reset currentServerIndex if data length changes
        setCurrentServerIndex((prevIndex) =>
          data && prevIndex >= data.length ? 0 : prevIndex
        );
      } catch (error) {
        setError("Failed to fetch server data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 2 minutes

    return () => clearInterval(intervalId);
  }, []);

  // Fetch favorite server data
  useEffect(() => {
    const fetchFavoriteServer = async () => {
      const favoriteServerId = getFavoriteServerId();
      if (favoriteServerId) {
        try {
          const server = await fetchServerById(favoriteServerId);
          setFavoriteServer(server);
        } catch (error) {
          console.error("Error fetching favorite server:", error);
        }
      } else {
        setFavoriteServer(null);
      }
    };

    fetchFavoriteServer();
    
    // Set up interval to refresh favorite server data
    const intervalId = setInterval(fetchFavoriteServer, 120000); // 2 minutes
    
    // Create event listener for updates to favorite server
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rust-favorite-server') {
        fetchFavoriteServer();
      }
    };
    
    // Listen for custom events from the BattleMetrics page
    const handleFavoriteChange = async (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.action === 'added' || customEvent.detail.action === 'switched') {
        // Directly fetch the newly favorited server
        try {
          const server = await fetchServerById(customEvent.detail.serverId);
          setFavoriteServer(server);
        } catch (error) {
          console.error("Error fetching favorite server:", error);
        }
      } else if (customEvent.detail.action === 'removed') {
        setFavoriteServer(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favorite-server-changed', handleFavoriteChange);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorite-server-changed', handleFavoriteChange);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowServerPopover(false);
    setShowFavoritePopover(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle click to cycle through servers
  const handleServerInfoClick = () => {
    if (!serversData) return;
    setCurrentServerIndex((prevIndex) => (prevIndex + 1) % serversData.length);
  };

  // Get the current server data
  const currentServerData =
    serversData && serversData.length > 0
      ? serversData[currentServerIndex]
      : null;

  // Navigation items for cleaner code
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/raid", label: "Calculator" },
    { path: "/crafting", label: "Crafting" },
    { path: "/recycle", label: "Recycle" },
    { path: "/excavator", label: "Diesel Calculator" },
    { path: "/decay", label: "Decay" },
    { path: "/battlemetrics", label: "BattleMetrics" },
  ];

  // Calculate player percentage for visual indicator
  const playerPercentage = currentServerData 
    ? (currentServerData.attributes.players / currentServerData.attributes.maxPlayers) * 100
    : 0;
    
  const favoritePlayerPercentage = favoriteServer 
    ? (favoriteServer.attributes.players / favoriteServer.attributes.maxPlayers) * 100
    : 0;

  const getPlayerStatusColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-600";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleClearFavorite = () => {
    clearFavoriteServerId();
    setFavoriteServer(null);
    setShowFavoritePopover(false);
  };

  const copyFavoriteServerConnect = () => {
    if (favoriteServer) {
      const address = favoriteServer.attributes.address || 
        `${favoriteServer.attributes.ip}:${favoriteServer.attributes.port}`;
      navigator.clipboard.writeText(`connect ${address}`);
      setShowFavoritePopover(false);
    }
  };

  // Close favorite popover without removing favorite
  const handleCloseFavoritePopover = () => {
    setShowFavoritePopover(false);
  };

  return (
    <nav 
      ref={navRef}
      className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm shadow-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Area with Favorite Server */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              
              <span className="text-xl font-bold text-white mr-3">
                <span className="text-red-600">Rust</span> Tools
              </span>
            </Link>
            
            {/* Favorite Server Indicator */}
       
       
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${pathname === item.path 
                    ? "text-red-500" 
                    : "text-gray-200 hover:text-red-400"
                  }`}
              >
                {item.label}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>
          
          {/* Favorite Server Display - Replaces Server Status */}
          <div className="hidden md:flex items-center ml-4">
            {favoriteServer ? (
              <div 
                className="relative cursor-pointer flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-gray-900 transition-colors"
                onClick={() => setShowFavoritePopover(!showFavoritePopover)}
              >
                <svg className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <div className={`w-2 h-2 rounded-full ${getPlayerStatusColor(favoritePlayerPercentage)}`}></div>
                <span className="text-xs font-medium text-gray-300 truncate max-w-[120px]">
                  {favoriteServer.attributes.name}
                </span>
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d={showFavoritePopover ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </div>
            ) : (
              <Link
                href="/battlemetrics"
                className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-400 rounded-md hover:bg-gray-900 transition-colors"
              >
                <svg className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>Set Favorite</span>
              </Link>
            )}
            
            {/* Favorite Server Popover - Position Right */}
            <AnimatePresence>
              {showFavoritePopover && favoriteServer && (
                <motion.div
                  ref={favoritePopoverRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-16 w-64 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50"
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-500 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-sm font-medium text-white">Server Info</span>
                      </div>
                      <button 
                        onClick={handleCloseFavoritePopover}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                        title="Close"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-sm text-white mb-1 truncate">
                      {favoriteServer.attributes.name}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>Rust Server</span>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getPlayerStatusColor(favoritePlayerPercentage)} mr-1.5`}></div>
                        <span>
                          {favoriteServer.attributes.players}/{favoriteServer.attributes.maxPlayers}
                        </span>
                        {favoriteServer.attributes.details?.rust_queued_players > 0 && (
                          <span className="ml-1 text-yellow-500">
                            (+{favoriteServer.attributes.details.rust_queued_players})
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Player bar */}
                    <div className="h-1.5 w-full bg-gray-800 rounded-full mb-3">
                      <div 
                        className={`h-1.5 rounded-full ${getPlayerStatusColor(favoritePlayerPercentage)}`}
                        style={{ width: `${favoritePlayerPercentage}%` }}
                      ></div>
                    </div>
                    
                    {/* Connection info */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <code className="bg-black/50 px-2 py-1 rounded text-gray-400 truncate max-w-[160px]">
                        {favoriteServer.attributes.address || `${favoriteServer.attributes.ip}:${favoriteServer.attributes.port}`}
                      </code>
                      <button
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
                        onClick={copyFavoriteServerConnect}
                      >
                        Copy
                      </button>
                    </div>
                    
                    {/* Menu options */}
                    <div className="flex space-x-2">
                      <Link 
                        href="/battlemetrics"
                        className="text-xs text-center flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-sm py-2 transition-colors"
                        onClick={() => setShowFavoritePopover(false)}
                      >
                        View All
                      </Link>
                      <button
                        onClick={handleClearFavorite}
                        className="text-xs text-center flex-1 bg-gray-800 hover:bg-red-900/30 text-gray-300 hover:text-red-300 rounded-sm py-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            {favoriteServer ? (
              <div 
                className="mr-3 flex items-center space-x-1"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMenuOpen) {
                    // If menu is open, don't toggle it closed
                    e.preventDefault();
                  } else {
                    toggleMenu();
                  }
                }}
              >
                <svg className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <div className={`w-2 h-2 rounded-full ${getPlayerStatusColor(favoritePlayerPercentage)}`}></div>
              </div>
            ) : (
              <Link 
                href="/battlemetrics" 
                className="mr-3 flex items-center space-x-1"
              >
                <svg className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </Link>
            )}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden relative z-40"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm shadow-lg border-t border-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200
                    ${pathname === item.path 
                      ? "bg-gray-800 text-red-500 border-l-4 border-red-600 pl-2" 
                      : "text-gray-200 hover:bg-gray-800 hover:text-red-400"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Favorite server info in mobile menu */}
              {favoriteServer ? (
                <div className="px-3 py-3 mt-4 space-y-3 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-yellow-500 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-sm font-medium text-white">Server Info</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getPlayerStatusColor(favoritePlayerPercentage)} mr-1.5`}></div>
                      <span className="text-xs text-gray-200">
                        {favoriteServer.attributes.players}/{favoriteServer.attributes.maxPlayers}
                      </span>
                    </div>
                  </div>
                  
                  <div className="truncate text-sm text-gray-300">
                    {favoriteServer.attributes.name}
                  </div>
                  
                  {favoriteServer.attributes.details?.rust_queued_players > 0 && (
                    <div className="text-xs text-yellow-500">
                      {favoriteServer.attributes.details.rust_queued_players} players in queue
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <code className="text-xs bg-black/50 px-2 py-1 rounded text-gray-400 truncate max-w-[180px]">
                      {favoriteServer.attributes.address || `${favoriteServer.attributes.ip}:${favoriteServer.attributes.port}`}
                    </code>
                    <button
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
                      onClick={() => {
                        const text = `connect ${favoriteServer.attributes.address || `${favoriteServer.attributes.ip}:${favoriteServer.attributes.port}`}`;
                        navigator.clipboard.writeText(text);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  
                  <button
                    onClick={handleClearFavorite}
                    className="mt-2 text-xs text-center block w-full bg-gray-800 hover:bg-red-900/30 text-gray-300 hover:text-red-300 rounded-sm py-2 transition-colors"
                  >
                    Remove Favorite
                  </button>
                </div>
              ) : (
                <Link
                  href="/battlemetrics"
                  className="block px-3 py-3 mt-4 space-y-3 border-t border-gray-800 text-gray-300 hover:text-red-400"
                >
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>Set Favorite</span>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
