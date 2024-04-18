"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
interface ServerData {
  attributes: {
    players: number;
    name: string;
    maxPlayers: number;
    details: {
      rust_queued_players: number;
    };
    // Add other attributes here as needed
  };
}
export function TopNav() {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = () => {
    fetch("https://api.battlemetrics.com/servers/4729828")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch server data");
        }
        return res.json();
      })
      .then((responseData) => {
        console.log(responseData);
        const serverAttributes = responseData?.data?.attributes;
        if (serverAttributes) {
          setServerData({
            attributes: {
              players: serverAttributes.players,
              name: serverAttributes.name,
              maxPlayers: serverAttributes.maxPlayers,
              details: {
                rust_queued_players:
                  serverAttributes.details?.rust_queued_players ?? 0,
              },
            },
          });
          setLoading(false);
        } else {
          throw new Error("Invalid server data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching server data:", error);
        setError("Failed to fetch server data");
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 2 minutes (120000 milliseconds)
    const intervalId = setInterval(() => {
      fetchData();
    }, 120000); // 2 minutes in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Only run on component mount
  console.log(serverData?.attributes.details);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center border-b p-4 text-base md:text-xl font-semibold">
      <div className="flex flex-row gap-4 md:flex-row max-w-6xl font-mono items-center justify-center md:justify-start">
        <Link
          className={`link ${
            pathname === "/" ? "border-b-2" : ""
          } mb-2 md:mb-0 md:mr-5`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`link ${
            pathname === "/raid" ? "border-b-2" : ""
          } mb-2 md:mb-0 md:mr-5`}
          href="/raid"
        >
          Calculator
        </Link>
        <Link
          className="link mb-2 md:mb-0"
          href="https://www.battlemetrics.com/servers/rust/4729828"
        >
          BattleMetrics
        </Link>
      </div>
      <div className="flex flex-col items-center md:items-end mt-2 md:mt-0">
        {error && <p>{error}</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && serverData && (
          <p className="text-center font-mono text-sm md:text-right">
            <span>
              {serverData.attributes.players} /{" "}
              {serverData.attributes.maxPlayers} Players Online
            </span>
            {serverData.attributes.details?.rust_queued_players === 0 ? (
              <span className="ml-1">(0 queued)</span>
            ) : (
              <span className="ml-1">
                {serverData.attributes.details?.rust_queued_players} queued
              </span>
            )}
            <span> Players on {serverData.attributes.name}</span>
          </p>
        )}
      </div>
    </nav>
  );
}
