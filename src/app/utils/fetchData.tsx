// fetch server data from battlemetrics API

interface ServerData {
  players: number;
  name: string;
  maxPlayers: number;
  details: {
    rust_queued_players: number;
  };
}

const fetchData = async (): Promise<ServerData> => {
  try {
    const response = await fetch(
      "https://api.battlemetrics.com/servers/4729828"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch server data");
    }

    const responseData = await response.json();
    const serverAttributes = responseData?.data?.attributes;

    if (!serverAttributes) {
      throw new Error("Invalid server data format");
    }

    const formattedData: ServerData = {
      players: serverAttributes.players,
      name: serverAttributes.name,
      maxPlayers: serverAttributes.maxPlayers,
      details: {
        rust_queued_players: serverAttributes.details?.rust_queued_players ?? 0,
      },
    };

    return formattedData;
  } catch (error) {
    console.error("Error fetching server data:", error);
    throw new Error("Failed to fetch server data");
  }
};

export default fetchData;
