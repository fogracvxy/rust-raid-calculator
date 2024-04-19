export interface ServerData {
  attributes: {
    players: number;
    name: string;
    maxPlayers: number;
    port: number;
    address: string;
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

export const fetchServerData = async (): Promise<ServerData | null> => {
  try {
    const response = await fetch(
      "https://api.battlemetrics.com/servers/4729828"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch server data");
    }
    const responseData = await response.json();
    const serverAttributes = responseData?.data?.attributes;
    if (serverAttributes) {
      const serverData: ServerData = {
        attributes: {
          players: serverAttributes.players,
          name: serverAttributes.name,
          address: serverAttributes.address,
          port: serverAttributes.port,
          maxPlayers: serverAttributes.maxPlayers,
          details: {
            rust_queued_players:
              serverAttributes.details?.rust_queued_players ?? 0,
            rust_url: serverAttributes.details?.rust_url ?? "",
            rust_headerimage: serverAttributes.details?.rust_headerimage ?? "",
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
  } catch (error) {
    console.error("Error fetching server data:", error);
    return null;
  }
};
