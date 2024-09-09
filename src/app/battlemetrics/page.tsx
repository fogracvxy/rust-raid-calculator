"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchServerData, ServerData } from "../utils/fetchsServerData";

export default function BattleMetrics() {
  const [serversData, setServersData] = useState<ServerData[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedServerIndex, setCopiedServerIndex] = useState<number | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchServerData();
        if (data) {
          setServersData(data);
        } else {
          setError("Failed to fetch server data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 120000); // 2 minutes

    return () => clearInterval(intervalId);
  }, []);

  const handleCopyToClipboard = (text: string, index: number) => {
    if (!serversData || !serversData[index]) {
      console.error("Server data is not available or invalid index");
      return;
    }
    navigator.clipboard
      .writeText("connect " + text)
      .then(() => {
        toast.success(
          <>
            Copied to clipboard for{" "}
            <span style={{ color: "red" }}>
              {serversData[index].attributes.name}
            </span>
          </>,
          {
            autoClose: 3000,
            hideProgressBar: true,
            position: "bottom-center",
          }
        );
        setCopiedServerIndex(index);
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
        toast.error("Failed to copy to clipboard!");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10 text-center">
      <h1 className="border-b-2 mb-5">Server info</h1>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && serversData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serversData.map((serverData, index) => {
            const ipText =
              serverData.attributes.address !== null &&
              serverData.attributes.address !== undefined
                ? `${serverData.attributes.address}:${serverData.attributes.port}`
                : `${serverData.attributes.ip}:${serverData.attributes.port}`;

            return (
              <div
                key={index}
                className={`flex flex-col border rounded-lg p-2 items-center mt-2 md:mt-0 cursor-pointer`}
              >
                <Link href={serverData?.attributes.details.rust_url}>
                  <p className="text-center py-2 font-mono text-md md:text-right text-red-600 hover:text-gray-500">
                    {serverData.attributes.name}
                  </p>
                </Link>
                <div className="relative w-40 h-40 object-cover">
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
                    textDecoration:
                      copiedServerIndex === index ? "underline" : "none",
                  }}
                  className="hover:underline cursor-pointer"
                  onClick={() => handleCopyToClipboard(ipText, index)}
                >
                  IP: {ipText}
                </p>
                <p
                  className={`${
                    copiedServerIndex === index ? "text-red-600" : ""
                  }`}
                >
                  {copiedServerIndex === index
                    ? " (Copied)"
                    : "(Click to copy IP)"}
                </p>
                <p>
                  {serverData.attributes?.players} /{" "}
                  {serverData.attributes?.maxPlayers} Players Online
                </p>
                <p>
                  {serverData.attributes.details?.rust_queued_players === 0 ? (
                    <span className="ml-1">(0 queued)</span>
                  ) : (
                    <span className="ml-1">
                      ({serverData.attributes.details?.rust_queued_players}{" "}
                      queued)
                    </span>
                  )}
                </p>
                <div className="py-5">
                  <h1 className="border-b-2">Current map</h1>
                </div>
                <div>
                  <Link
                    href={serverData?.attributes.details?.rust_maps?.url ?? ""}
                  >
                    <Image
                      className="rounded-lg hover:opacity-80 transition-opacity duration-300 ease-in-out cursor-pointer"
                      src={
                        serverData?.attributes.details?.rust_maps
                          ?.thumbnailUrl ?? ""
                      }
                      width={217}
                      height={217}
                      alt="Rust Map Thumbnail"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
