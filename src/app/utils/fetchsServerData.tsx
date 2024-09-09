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
      rust_maps: {
        url: string;
        thumbnailUrl: string;
        mapUrl: string;
      };
    };
  };
}

const serverUrls = [
  "https://api.battlemetrics.com/servers/4233468",
  "https://api.battlemetrics.com/servers/3332713",
  "https://api.battlemetrics.com/servers/9565288",
];

export const fetchServerData = async (): Promise<ServerData[] | null> => {
  try {
    const promises = serverUrls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      const responseData = await response.json();
      const serverAttributes = responseData?.data?.attributes;

      if (serverAttributes) {
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
                url: serverAttributes.details?.rust_maps?.url ?? "",
                thumbnailUrl:
                  serverAttributes.details?.rust_maps?.thumbnailUrl ?? "",
                mapUrl: serverAttributes.details?.rust_maps?.mapUrl ?? "",
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
