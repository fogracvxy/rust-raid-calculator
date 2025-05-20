"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchServerData, ServerData } from "../utils/fetchsServerData";
import { 
  CustomServerData, 
  addServerByUrl, 
  removeCustomServer, 
  mergeServers, 
  getCustomServerCount,
  extractServerIdFromUrl,
  setFavoriteServerId,
  getFavoriteServerId,
  clearFavoriteServerId,
  isServerFavorite
} from "../utils/localStorageServers";
import { motion, AnimatePresence } from "framer-motion";
import RustMapPlaceholder from "../components/RustMapPlaceholder";
import { serverIds } from "../utils/fetchsServerData";

export default function BattleMetrics() {
  const [serversData, setServersData] = useState<(ServerData | CustomServerData)[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedServerIndex, setCopiedServerIndex] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showAddServerForm, setShowAddServerForm] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [isAddingServer, setIsAddingServer] = useState(false);
  const [serverAddError, setServerAddError] = useState<string | null>(null);
  const [customServerCount, setCustomServerCount] = useState(0);
  const [mapImageErrors, setMapImageErrors] = useState<{[key: number]: boolean}>({});
  const [favoriteServers, setFavoriteServers] = useState<{[key: string]: boolean}>({});
  
  // Form references
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const maxPlayersRef = useRef<HTMLInputElement>(null);
  const headerImageRef = useRef<HTMLInputElement>(null);
  const mapUrlRef = useRef<HTMLInputElement>(null);
  const mapThumbnailRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async (isInitialLoad = false) => {
    try {
      if (!isInitialLoad) setIsRefreshing(true);
      const apiData = await fetchServerData();
      if (apiData) {
        // Add serverId to featured servers using their index in the serverIds array
        const apiDataWithIds = apiData.map((server, index) => {
          // Featured servers don't have serverId by default, so we add it
          // The serverIds are defined in fetchServerData.tsx
          return {
            ...server,
            serverId: serverIds[index] // Using serverIds defined in fetchServerData
          };
        });
        
        // Merge API servers with custom servers
        const allServers = mergeServers(apiDataWithIds);
        setServersData(allServers);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError("Failed to fetch server data");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData(true);
    
    const intervalId = setInterval(() => fetchData(), 120000); // 2 minutes
    
    return () => clearInterval(intervalId);
  }, [fetchData]);

  useEffect(() => {
    // Update custom server count
    setCustomServerCount(getCustomServerCount());
  }, [serversData]);

  // Load favorite status on initial render
  useEffect(() => {
    // Check if servers have ids and update favorite status
    if (serversData) {
      const favorites: {[key: string]: boolean} = {};
      serversData.forEach(server => {
        const serverId = 'serverId' in server ? server.serverId : null;
        if (serverId) {
          favorites[serverId] = isServerFavorite(serverId);
        }
      });
      setFavoriteServers(favorites);
    }
  }, [serversData]);

  const handleCopyToClipboard = (text: string, index: number) => {
    if (!serversData || !serversData[index]) {
      toast.error("Server data is not available");
      return;
    }
    
    navigator.clipboard
      .writeText("connect " + text)
      .then(() => {
        toast.success(
          <div className="flex items-center">
            <span>Connection command copied for </span>
            <span className="font-bold text-red-500 ml-1">
              {serversData[index].attributes.name}
            </span>
          </div>,
          {
            autoClose: 3000,
            hideProgressBar: false,
            position: "bottom-center",
            icon: "🎮" as any,
          }
        );
        setCopiedServerIndex(index);
        
        // Reset the copied visual indication after a delay
        setTimeout(() => {
          setCopiedServerIndex(null);
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
        toast.error(          <div className="flex items-center">            <svg className="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />            </svg>            <span>Failed to copy to clipboard</span>          </div>        );
      });
  };

  const formatTimeSince = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    return `${Math.floor(seconds / 3600)} hours ago`;
  };

  // Determine if a server is high pop (>80% full)
  const getServerStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 80) return "high";
    if (percentage >= 40) return "medium";
    return "low";
  };

  // Handler for adding servers via URL
  const handleAddServerByUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!urlInput.trim()) {
      setServerAddError("Please enter a valid BattleMetrics URL");
      return;
    }
    
    try {
      setIsAddingServer(true);
      setServerAddError(null);
      
      const result = await addServerByUrl(urlInput.trim());
      
      if (result.success && result.server) {
        setServersData(prev => prev ? [...prev, result.server!] : [result.server!]);
        setUrlInput("");
        setShowAddServerForm(false);
        toast.success(result.message);
      } else {
        setServerAddError(result.message);
      }
    } catch (error) {
      setServerAddError("An unexpected error occurred. Please try again.");
      console.error("Error adding server:", error);
    } finally {
      setIsAddingServer(false);
    }
  };
  
  const handleRemoveCustomServer = (serverId: string, serverName: string) => {
    if (window.confirm(`Are you sure you want to remove ${serverName}?`)) {
      removeCustomServer(serverId);
      setServersData(prev => prev ? prev.filter(server => 
        !('serverId' in server) || server.serverId !== serverId
      ) : null);
      toast.info(
        <div className="flex items-center">
          <svg className="h-4 w-4 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Removed server: <span className="font-bold text-blue-300">{serverName}</span>
          </span>
        </div>
      );
    }
  };

  // Function to handle image loading errors
  const handleMapImageError = (index: number) => {
    setMapImageErrors(prev => ({...prev, [index]: true}));
  };

  // Handle toggling favorite status for a server
  const handleToggleFavorite = (serverId: string, serverName: string) => {
    // Toggle favorite status
    const isFavorite = isServerFavorite(serverId);
    const currentFavoriteId = getFavoriteServerId();
    
    if (isFavorite) {
      // Remove current favorite
      clearFavoriteServerId();
      // Dispatch custom event to notify the nav component
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('favorite-server-changed', { 
          detail: { action: 'removed', serverId: null }
        }));
      }
      toast.info(
        <div className="flex items-center">
          <svg className="h-4 w-4 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span>
            Removed <span className="font-bold text-yellow-300">{serverName}</span> from favorites
          </span>
        </div>
      );
      
      // Update local state only for this server
      setFavoriteServers(prev => ({
        ...prev,
        [serverId]: false
      }));
    } else {
      // If there's already a different server favorited, update its state too
      if (currentFavoriteId && currentFavoriteId !== serverId) {
        // Update UI state for the previous favorite
        setFavoriteServers(prev => ({
          ...prev,
          [currentFavoriteId]: false,
          [serverId]: true
        }));
      } else {
        // Just update the new favorite
        setFavoriteServers(prev => ({
          ...prev,
          [serverId]: true
        }));
      }
      
      // Set the new favorite
      setFavoriteServerId(serverId);
      
      // Dispatch custom event to notify the nav component
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('favorite-server-changed', { 
          detail: { 
            action: 'switched', 
            serverId,
            previousServerId: currentFavoriteId
          }
        }));
      }
      
      toast.success(
        <div className="flex items-center">
          <span>Set </span>
          <span className="font-bold text-red-500 mx-1">
            {serverName}
          </span>
          <span> as favorite server</span>
        </div>
      );
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with improved design */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 px-6 rounded-lg border border-gray-800 shadow-2xl mb-8">
          <div className="flex items-center justify-center mb-2">
            <svg 
              className="h-6 w-6 text-red-500 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
            <h1 className="text-3xl font-bold text-center text-white">
              Rust Server Status
            </h1>
          </div>
          <p className="text-gray-400 text-center text-sm mb-5">
            Live tracking of server information, player counts, and maps
          </p>
          
          {/* Refresh controls with improved design */}
          <div className="flex justify-center mt-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fetchData()}
                disabled={isRefreshing}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center space-x-2 disabled:opacity-50 transition-colors shadow-md"
              >
                <svg
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh Now'}</span>
              </button>
              
              <button
                onClick={() => setShowAddServerForm(prev => !prev)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition-colors shadow-md disabled:opacity-50"
                disabled={customServerCount >= 3 && !showAddServerForm}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={showAddServerForm ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                  />
                </svg>
                <span>
                  {showAddServerForm ? 'Cancel' : customServerCount >= 3 ? 'Server Limit (3/3)' : 'Add Server'}
                </span>
              </button>
              
              {lastUpdated && (
                <div className="text-xs py-1 px-3 bg-gray-800/50 rounded-full text-gray-400 border border-gray-700/50">
                  Last updated: {formatTimeSince(lastUpdated)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Server Form - Simplified for BattleMetrics URL */}
        <AnimatePresence>
          {showAddServerForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-2 text-white">Add Server</h2>
              <p className="text-gray-400 text-sm mb-4">
                Enter a BattleMetrics server URL to add it to your tracked servers.
                <span className="block mt-1">
                  Example: <code className="bg-gray-800 px-1 rounded">https://www.battlemetrics.com/servers/rust/9565288</code>
                </span>
              </p>
              
              <form onSubmit={handleAddServerByUrl} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="server-url" className="block text-sm font-medium text-gray-400 mb-1">
                      BattleMetrics URL*
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="server-url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-grow bg-gray-800 border border-gray-700 text-white rounded-l px-3 py-2"
                        placeholder="https://www.battlemetrics.com/servers/rust/..."
                        required
                      />
                      <button
                        type="submit"
                        disabled={isAddingServer || !urlInput.trim()}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-r px-4 py-2 disabled:opacity-50"
                      >
                        {isAddingServer ? (
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                    
                    {serverAddError && (
                      <p className="text-red-400 text-sm mt-1">
                        {serverAddError}
                      </p>
                    )}
                    
                    <p className="text-gray-500 text-xs mt-2">
                      You can add up to 3 custom servers. Currently using {customServerCount}/3.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-6 flex items-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
              <button
                onClick={() => fetchData()}
                className="ml-auto text-xs underline"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-16 h-16 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Loading server information...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Server cards grid - Add improved container styling */}
        {!isLoading && serversData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {serversData.map((serverData, index) => {
                const ipText = serverData.attributes.address || `${serverData.attributes.ip}:${serverData.attributes.port}`;
                const playerStatus = getServerStatus(serverData.attributes.players, serverData.attributes.maxPlayers);
                const isCopied = copiedServerIndex === index;
                const isCustom = 'isCustom' in serverData && serverData.isCustom;
                const serverId = 'serverId' in serverData ? serverData.serverId : serverIds[index]; // Fallback to serverIds
                const hasMapError = mapImageErrors[index];
                const isFavorite = serverId ? favoriteServers[serverId] : false;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }} // Reduced delay for faster loading
                    className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:border-gray-700"
                  >
                    {/* Server header with image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={serverData?.attributes.details?.rust_headerimage || "/images/rust-default-header.jpg"}
                        alt={`${serverData.attributes.name} header image`}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // If the image fails to load, set it to a local fallback
                          (e.target as HTMLImageElement).src = '/images/rust-default-header.jpg';
                        }}
                      />
                      
                      {/* Gradient overlay with improved contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Server type badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`text-xs px-2 py-1 rounded-sm ${
                          isCustom 
                            ? "bg-blue-900/90 text-blue-200" 
                            : "bg-red-600/90 text-white"
                        }`}>
                          {isCustom ? "Custom" : "Featured"}
                        </span>
                      </div>
                      
                      {/* Favorite button - ensure it shows for all servers */}
                      {serverId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(serverId, serverData.attributes.name);
                          }}
                          className={`absolute top-3 ${isCustom ? 'right-10' : 'right-3'} z-10 p-1.5 rounded-full shadow-md transition-colors ${
                            favoriteServers[serverId]
                              ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                              : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700/80 hover:text-gray-300'
                          }`}
                          title={favoriteServers[serverId] ? "Remove from favorites" : "Set as favorite server"}
                        >
                          <svg className="h-3.5 w-3.5" fill={favoriteServers[serverId] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Custom server remove button */}
                      {isCustom && serverId && (
                        <button
                          onClick={() => handleRemoveCustomServer(serverId, serverData.attributes.name)}
                          className="absolute top-3 right-3 z-10 bg-red-800/90 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow-md"
                          title="Remove custom server"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Server status indicator */}
                      {!isCustom && (
                        <div className="absolute top-3 right-10 flex items-center bg-black/70 rounded-full px-2 py-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            playerStatus === "high" ? "bg-red-500 animate-pulse" : 
                            playerStatus === "medium" ? "bg-yellow-500" : 
                            "bg-green-500"
                          }`}></div>
                          <span className="text-xs text-white">
                            {playerStatus === "high" ? "High Pop" : 
                             playerStatus === "medium" ? "Medium" : 
                             "Low Pop"}
                          </span>
                        </div>
                      )}
                      
                      {/* Server name at bottom of image for better visibility */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black to-transparent">
                        <Link 
                          href={serverData?.attributes.details.rust_url || "#"} 
                          target="_blank"
                          className="block w-full hover:text-red-400 transition-colors group/name"
                          title={serverData.attributes.name}
                        >
                          <h2 className="text-xl font-bold text-white line-clamp-2 min-h-[3.5rem] group-hover/name:text-red-400">
                            {serverData.attributes.name}
                          </h2>
                          <div className="invisible absolute -top-10 left-0 right-0 bg-black/90 p-2 rounded text-sm text-white opacity-0 group-hover/name:opacity-100 group-hover/name:visible transition-opacity z-20 mx-4 text-center shadow-lg">
                            {serverData.attributes.name}
                          </div>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Player count - Simplified and centered */}
                    <div className="px-4 pt-3 pb-4">
                      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-1">
                        <div 
                          className={`h-2.5 rounded-full ${
                            playerStatus === "high" ? "bg-red-600" : 
                            playerStatus === "medium" ? "bg-yellow-600" : 
                            "bg-green-600"
                          }`}
                          style={{ width: `${(serverData.attributes.players / serverData.attributes.maxPlayers) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {serverData.attributes.players} / {serverData.attributes.maxPlayers} Players
                        </span>
                        {serverData.attributes.details?.rust_queued_players > 0 && (
                          <span className="text-yellow-500">
                            +{serverData.attributes.details.rust_queued_players} in queue
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Connect options - Simplified */}
                    <div 
                      className={`px-4 py-3 border-t border-gray-800 ${isCopied ? 'bg-green-900/20' : 'hover:bg-gray-800/30'} cursor-pointer transition-colors`}
                      onClick={() => handleCopyToClipboard(ipText, index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <code className="text-sm text-gray-300">{ipText}</code>
                        </div>
                        <div className="flex items-center">
                          {isCopied ? (
                            <span className="text-green-400 text-xs">Copied!</span>
                          ) : (
                            <span className="text-gray-500 text-xs">Click to copy</span>
                          )}
                          <svg 
                            className={`h-4 w-4 ml-1 ${isCopied ? 'text-green-400' : 'text-gray-500'}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d={isCopied 
                                ? "M5 13l4 4L19 7" 
                                : "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              } 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Map section with enhanced design */}
                    <div className="px-4 py-3 border-t border-gray-800">
                      <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                        <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Current Map
                      </h3>
                      
                      <div className="relative">
                        {/* Display error state for problematic server IDs or when image fails to load */}
                        {(serverId === '9565288' || hasMapError) ? (
                          <div className="rounded-md overflow-hidden border border-gray-800 group hover:border-gray-700 transition-all">
                            <RustMapPlaceholder 
                              serverId={serverId || undefined} 
                              serverName={serverData.attributes.name} 
                            />
                            
                            {/* Still make the map URL clickable */}
                            {serverData?.attributes.details?.rust_maps?.url && (
                              <Link
                                href={serverData.attributes.details.rust_maps.url}
                                target="_blank"
                                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <span className="text-white bg-red-800 hover:bg-red-700 px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center">
                                  <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  View Map Details
                                </span>
                              </Link>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={serverData?.attributes.details?.rust_maps?.url || "#"}
                            target="_blank"
                            className="block relative rounded-md overflow-hidden border border-gray-800 hover:border-gray-700 transition-all group"
                          >
                            <div className="relative h-36 overflow-hidden">
                              <Image
                                src={serverData?.attributes.details?.rust_maps?.thumbnailUrl || "/images/placeholder-map.jpg"}
                                fill
                                alt="Rust Map"
                                className="object-cover transition-transform group-hover:scale-105 duration-500"
                                onError={() => handleMapImageError(index)}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white bg-red-800 hover:bg-red-700 px-3 py-1.5 rounded text-xs font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform flex items-center">
                                  <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  View Map
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
        
        {/* Empty state - when we have no servers */}
        {!isLoading && !error && (!serversData || serversData.length === 0) && (
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 text-center">
            <svg className="h-16 w-16 mx-auto text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-300 mb-2">No Servers Found</h3>
            <p className="text-gray-500 mb-4">We couldn&apos;t find any servers to display.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => fetchData()}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
              >
                Refresh Servers
              </button>
              <button
                onClick={() => setShowAddServerForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Custom Server
              </button>
            </div>
          </div>
        )}
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
        limit={3}
        toastClassName="bg-gray-800 text-gray-100 border border-gray-700 rounded-md shadow-xl"
        bodyClassName="text-sm font-medium"
      />
    </motion.div>
  );
}
