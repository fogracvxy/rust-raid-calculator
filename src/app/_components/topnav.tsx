"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchServerData, ServerData } from "../utils/fetchsServerData";

// Existing imports and setup...

export function TopNav() {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center border-b p-4 text-base md:text-xl font-semibold relative">
      <div className="flex justify-between items-center w-full max-w-6xl">
        <div className="lg:flex hidden gap-4 lg:flex-row items-center justify-start">
          <Link
            className={`link ${
              pathname === "/" ? "border-b-2 text-red-600" : ""
            } mb-2 md:mb-0 md:mr-5`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`link ${
              pathname === "/raid" ? "border-b-2 text-red-600" : ""
            } mb-2 md:mb-0 md:mr-5`}
            href="/raid"
          >
            Calculator
          </Link>
          <Link
            className={`link ${
              pathname === "/recycle" ? "border-b-2 text-red-600" : ""
            } mb-2 md:mb-0 md:mr-5`}
            href="/recycle"
          >
            Recycle
          </Link>
          <Link
            className={`link ${
              pathname === "/excavator" ? "border-b-2 text-red-600" : ""
            } mb-2 md:mb-0 md:mr-5`}
            href="/excavator"
          >
            Excavator
          </Link>
          <Link
            className={`link ${
              pathname === "/battlemetrics" ? "border-b-2 text-red-600" : ""
            } mb-2 md:mb-0 md:mr-5`}
            href="/battlemetrics"
          >
            BattleMetrics
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            className="focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className=" md:flex md:items-center md:justify-end w-full md:w-auto">
        {pathname !== "/battlemetrics" && (
          <>
            {error && <p>{error}</p>}
            {!error && isLoading && <p>Loading...</p>}
            {!error && !isLoading && serverData && (
              <p className="text-center font-mono text-sm">
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
      {isMenuOpen && (
        <div className="lg:hidden absolute top-10 left-0 right-0 z-50 bg-black p-4 shadow-md rounded-md">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={closeMenu}>
              <span
                className={`link ${
                  pathname === "/" ? "border-b-2 text-red-600" : ""
                } mb-2 md:mb-0 md:mr-5`}
              >
                {" "}
                Home
              </span>
            </Link>
            <Link href="/raid" onClick={closeMenu}>
              <span
                className={`link ${
                  pathname === "/raid" ? "border-b-2 text-red-600" : ""
                } mb-2 md:mb-0 md:mr-5`}
              >
                {" "}
                Calculator
              </span>
            </Link>
            <Link href="/recycle" onClick={closeMenu}>
              <span
                className={`link ${
                  pathname === "/recycle" ? "border-b-2 text-red-600" : ""
                } mb-2 md:mb-0 md:mr-5`}
              >
                Recycle
              </span>
            </Link>
            <Link href="/excavator" onClick={closeMenu}>
              <span
                className={`link ${
                  pathname === "/excavator" ? "border-b-2 text-red-600" : ""
                } mb-2 md:mb-0 md:mr-5`}
              >
                {" "}
                Excavator
              </span>
            </Link>
            <Link onClick={closeMenu} href="/battlemetrics">
              <span
                className={`link ${
                  pathname === "/battlemetrics" ? "border-b-2 text-red-600" : ""
                } mb-2 md:mb-0 md:mr-5`}
              >
                BattleMetrics
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
