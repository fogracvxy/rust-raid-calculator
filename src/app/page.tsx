"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleEnterCalculator = () => {
    router.push("/raid"); // Navigate to '/raid' route
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 lg:p-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between font-mono text-lg">
        {/* Content Section */}
        <div className="w-full lg:w-2/3 lg:order-1 pr-8">
          <h1 className="ml-4 text-4xl font-bold text-red-600">
            Rust TOOLS by MSpudicDesign
          </h1>
          <p className="ml-4 mt-4 text-lg">
            Enhance your Rust experience with our suite of powerful tools
            designed to give you the edge you need. Whether you&apos;re planning
            your next raid, optimizing your recycling strategy, or checking out
            server metrics, Rust TOOLS has got you covered.
          </p>
          <div className="pt-8 ml-4 lg:pt-15">
            <button
              onClick={handleEnterCalculator}
              className="border border-red-600 text-sm font-mono rounded-lg p-2 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out"
            >
              Enter Calculator
            </button>
          </div>
        </div>

        {/* Logo Section */}
        <div className="w-full lg:w-1/3 lg:order-2 mb-8 lg:mb-0">
          <Image
            src="/images/mockup_raid.png"
            alt="Rust RAID Calculator"
            width={800}
            height={600}
            className="mx-auto lg:mx-0"
          />
        </div>
      </div>
    </main>
  );
}
