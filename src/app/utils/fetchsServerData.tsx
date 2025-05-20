export interface ServerData {
  attributes: {
    players: number;
    name: string;
    maxPlayers: number;
    port: number;
    address: string;
    ip: string;
    details: {
      rust_headerimage: string;
      rust_queued_players: number;
      rust_url: string;
      rust_maps?: {
        url?: string;
        thumbnailUrl?: string;
        mapUrl?: string;
      };
    };
  };
}

// Featured server IDs - these are displayed by default
export const serverIds = [
  "32281678",
  "3332713",
  "9565288",
];

// Create API URLs from server IDs
const serverUrls = serverIds.map(id => `https://api.battlemetrics.com/servers/${id}`);

export const fetchServerData = async (): Promise<ServerData[] | null> => {
  try {
    const promises = serverUrls.map(async (url, index) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      const responseData = await response.json();
      const serverAttributes = responseData?.data?.attributes;
      const serverId = serverIds[index]; // Get the corresponding server ID

      if (serverAttributes) {
        // Fix for map thumbnail URLs - ensure we capture it properly
        const rustMaps = serverAttributes.details?.rust_maps || {};
        
        // Create a default thumbnail URL based on server ID
        const defaultMapThumbnail = `/images/default-map-${serverId}.jpg`;
        
        const serverData: ServerData = {
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
        return serverData;
      } else {
        throw new Error("Invalid server data format");
      }
    });

    const serversData = await Promise.all(promises);
    return serversData;
  } catch (error) {
    console.error("Error fetching server data:", error);
    return null;
  }
};
