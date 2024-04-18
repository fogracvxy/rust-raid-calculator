"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ServerData {
  attributes: {
    players: number;
    name: string;
    maxPlayers: number;
    port: number;
    address: string;
    details: {
      rust_headerimage: string;
      rust_queued_players: number;
      rust_maps: {
        url: string;
        thumbnailUrl: string;
        mapUrl: string;
      };
    };
    // Add other attributes here as needed
  };
}

export default function BattleMetrics() {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
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
              address: serverAttributes.address,
              port: serverAttributes.port,
              maxPlayers: serverAttributes.maxPlayers,
              details: {
                rust_queued_players:
                  serverAttributes.details?.rust_queued_players ?? 0,
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
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!", {
          autoClose: 3000,
          hideProgressBar: true,
          position: "bottom-center",
        });
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000); // Reset copied state after 3 seconds
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
        toast.error("Failed to copy to clipboard!");
      });
  };
  const ipText = serverData
    ? `${serverData.attributes.address}:${serverData.attributes.port}`
    : "";
  return (
    <div className="flex  flex-col justify-center items-center pt-10 text-center">
      <div className="flex  flex-col  border rounded-lg p-2 items-center mt-2 md:mt-0">
        <h1 className="pb-5">Server info</h1>
        <>
          {error && <p>{error}</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && serverData && (
            <>
              <div className="relative w-40 h-40 object-cover">
                {" "}
                <Image
                  className="pb-5 w-full h-full rounded-lg object-cover"
                  src={serverData?.attributes.details?.rust_headerimage ?? ""}
                  alt="Rust server header image"
                  fill
                />
              </div>

              <p
                style={{
                  cursor: "pointer",

                  textDecoration: isCopied ? "underline" : "none",
                }}
                className={`hover:underline cursor-pointer `}
                onClick={() => handleCopyToClipboard(ipText)}
              >
                IP: {ipText}
                {isCopied && " (Copied)"}
              </p>
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
              <div>
                {" "}
                <Link
                  href={serverData?.attributes.details?.rust_maps?.url ?? ""}
                >
                  <h1 className="py-5">Current map</h1>
                  <Image
                    className="rounded-lg hover:opacity-80 transition-opacity duration-300 ease-in-out cursor-pointer"
                    src={
                      serverData?.attributes.details?.rust_maps?.thumbnailUrl ??
                      ""
                    }
                    width={217}
                    height={217}
                    alt="Rust Map Thumbnail"
                  />
                </Link>
              </div>
            </>
          )}
        </>
      </div>
      <ToastContainer />
    </div>
  );
}
