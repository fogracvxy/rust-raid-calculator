import { ServerData } from './fetchsServerData';

export interface CustomServerData extends ServerData {
  isCustom: boolean;
  serverId: string; // Store the BattleMetrics server ID
}

const LOCAL_STORAGE_KEY = 'rust-custom-servers';
const FAVORITE_SERVER_KEY = 'rust-favorite-server';
const MAX_CUSTOM_SERVERS = 3; // Maximum number of custom servers allowed

// Extract server ID from BattleMetrics URL
export const extractServerIdFromUrl = (url: string): string | null => {
  try {
    // Handle URLs like https://www.battlemetrics.com/servers/rust/9565288
    const regex = /battlemetrics\.com\/servers\/rust\/(\d+)/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting server ID from URL:', error);
    return null;
  }
};

// Fetch server data directly from BattleMetrics API using ID
export const fetchServerById = async (serverId: string): Promise<ServerData | null> => {
  try {
    const apiUrl = `https://api.battlemetrics.com/servers/${serverId}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch server data: ${response.status}`);
    }
    
    const responseData = await response.json();
    const serverAttributes = responseData?.data?.attributes;
    
    if (serverAttributes) {
      // Create a default map thumbnail URL based on server ID for servers that don't provide one
      // or for cases where the provided one doesn't work
      const defaultMapThumbnail = `/images/default-map-${serverId}.jpg`;
      
      // Fix for possible missing map data
      const rustMaps = serverAttributes.details?.rust_maps || {};
      
      return {
        attributes: {
          players: serverAttributes.players,
          name: serverAttributes.name,
          address: serverAttributes.address,
          ip: serverAttributes.ip,
          port: serverAttributes.port,
          maxPlayers: serverAttributes.maxPlayers,
          details: {
            rust_queued_players:
              serverAttributes.details?.rust_queued_players ?? 0,
            rust_url: serverAttributes.details?.rust_url ?? "",
            rust_headerimage:
              serverAttributes.details?.rust_headerimage ?? "",
            rust_maps: {
              url: rustMaps.url ?? "",
              thumbnailUrl: rustMaps.thumbnailUrl ?? defaultMapThumbnail,
              mapUrl: rustMaps.mapUrl ?? "",
            },
          },
        },
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching server by ID:', error);
    return null;
  }
};

// Get custom servers from local storage
export const getCustomServers = (): CustomServerData[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const serversJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    return serversJson ? JSON.parse(serversJson) : [];
  } catch (error) {
    console.error('Error getting custom servers from localStorage:', error);
    return [];
  }
};

// Save custom servers to local storage
export const saveCustomServers = (servers: CustomServerData[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(servers));
  } catch (error) {
    console.error('Error saving custom servers to localStorage:', error);
  }
};

// Check if server with ID already exists in custom servers
export const serverExists = (serverId: string): boolean => {
  const servers = getCustomServers();
  return servers.some(server => server.serverId === serverId);
};

// Add server by BattleMetrics URL
export const addServerByUrl = async (url: string): Promise<{ success: boolean; message: string; server?: CustomServerData }> => {
  const serverId = extractServerIdFromUrl(url);
  if (!serverId) {
    return { success: false, message: "Invalid BattleMetrics URL. Please use a URL like https://www.battlemetrics.com/servers/rust/9565288" };
  }
  
  // Check if server already exists
  if (serverExists(serverId)) {
    return { success: false, message: "This server is already in your list" };
  }
  
  // Check if user has reached the maximum number of custom servers
  const existingServers = getCustomServers();
  if (existingServers.length >= MAX_CUSTOM_SERVERS) {
    return { success: false, message: `You can only add up to ${MAX_CUSTOM_SERVERS} custom servers. Please remove one first.` };
  }
  
  try {
    // Fetch server data from API
    const serverData = await fetchServerById(serverId);
    if (!serverData) {
      return { success: false, message: "Failed to fetch server data. The server may not exist or is unavailable." };
    }
    
    // Validate and sanitize the server data to prevent errors
    const sanitizedServerData = {
      ...serverData,
      attributes: {
        ...serverData.attributes,
        details: {
          ...serverData.attributes.details,
          rust_headerimage: serverData.attributes.details.rust_headerimage || "/images/rust-default-header.jpg",
          rust_maps: {
            url: serverData.attributes.details.rust_maps?.url || "",
            thumbnailUrl: serverData.attributes.details.rust_maps?.thumbnailUrl || "/images/placeholder-map.jpg",
            mapUrl: serverData.attributes.details.rust_maps?.mapUrl || "",
          }
        }
      }
    };
    
    // Create custom server object
    const customServer: CustomServerData = {
      ...sanitizedServerData,
      isCustom: true,
      serverId: serverId
    };
    
    // Save to localStorage
    const updatedServers = [...existingServers, customServer];
    saveCustomServers(updatedServers);
    
    return { success: true, message: "Server added successfully", server: customServer };
  } catch (error) {
    console.error("Error adding server:", error);
    return { success: false, message: "An error occurred while adding the server. Please try again." };
  }
};

// Add a new custom server (legacy method)
export const addCustomServer = (
  name: string, 
  address: string, 
  maxPlayers: number, 
  headerImage?: string,
  mapUrl?: string, 
  mapThumbnail?: string
): CustomServerData | null => {
  // Check if user has reached the maximum number of custom servers
  const existingServers = getCustomServers();
  if (existingServers.length >= MAX_CUSTOM_SERVERS) {
    return null;
  }

  const [ip, portStr] = address.includes(':') ? address.split(':') : [address, '28015'];
  const port = parseInt(portStr, 10);
  
  const newServer: CustomServerData = {
    attributes: {
      name,
      address,
      ip,
      port,
      players: 0, // Default value, can't know real value without API
      maxPlayers,
      details: {
        rust_headerimage: headerImage || "/images/rust-default-header.jpg",
        rust_queued_players: 0,
        rust_url: "",
        rust_maps: {
          url: mapUrl || "",
          thumbnailUrl: mapThumbnail || "/images/default-map.jpg",
          mapUrl: mapUrl || "",
        },
      },
    },
    isCustom: true,
    serverId: `manual-${Date.now()}` // Generate a unique ID for manually added servers
  };
  
  const servers = [...existingServers, newServer];
  saveCustomServers(servers);
  
  return newServer;
};

// Remove a custom server
export const removeCustomServer = (serverId: string): void => {
  const servers = getCustomServers();
  const filteredServers = servers.filter(server => server.serverId !== serverId);
  saveCustomServers(filteredServers);
};

// Get count of custom servers
export const getCustomServerCount = (): number => {
  return getCustomServers().length;
};

// Merge API servers with custom servers
export const mergeServers = (apiServers: ServerData[]): (ServerData | CustomServerData)[] => {
  const customServers = getCustomServers();
  return [...apiServers, ...customServers];
};

// Get favorite server ID from localStorage
export const getFavoriteServerId = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(FAVORITE_SERVER_KEY);
  } catch (error) {
    console.error('Error getting favorite server from localStorage:', error);
    return null;
  }
};

// Set favorite server ID in localStorage
export const setFavoriteServerId = (serverId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FAVORITE_SERVER_KEY, serverId);
  } catch (error) {
    console.error('Error saving favorite server to localStorage:', error);
  }
};

// Clear favorite server from localStorage
export const clearFavoriteServerId = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(FAVORITE_SERVER_KEY);
  } catch (error) {
    console.error('Error removing favorite server from localStorage:', error);
  }
};

// Check if server is the favorite
export const isServerFavorite = (serverId: string): boolean => {
  return getFavoriteServerId() === serverId;
}; 