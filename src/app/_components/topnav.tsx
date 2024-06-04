"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchServerData, ServerData } from "../utils/fetchsServerData";

export function TopNav() {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchServerData();
      setServerData(data);
      setLoading(false);
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 2 minutes (120000 milliseconds)
    const intervalId = setInterval(() => {
      fetchData();
    }, 120000); // 2 minutes in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
          className={`link ${
            pathname === "/recycle" ? "border-b-2" : ""
          } mb-2 md:mb-0 md:mr-5`}
          href="/recycle"
        >
          Recycle
        </Link>
        <Link
          className={`link ${
            pathname === "/excavator" ? "border-b-2" : ""
          } mb-2 md:mb-0 md:mr-5`}
          href="/excavator"
        >
          Excavator
        </Link>
        <Link className="link mb-2 md:mb-0" href="/battlemetrics">
          BattleMetrics
        </Link>
      </div>
      <div className="flex flex-col items-center md:items-end mt-2 md:mt-0">
        {pathname !== "/battlemetrics" && (
          <>
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
                    ({serverData.attributes.details?.rust_queued_players}{" "}
                    queued)
                  </span>
                )}
                <span> on {serverData.attributes.name}</span>
              </p>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
