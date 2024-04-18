"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleEnterCalculator = () => {
    router.push("/raid"); // Navigate to '/raid' route
  };
  return (
    <main className="flex flex-col items-center justify-between p-4 lg:p-24">
      <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-between font-mono text-lg">
        {/* Content Section */}
        <div className="w-full lg:w-2/3 lg:order-1 pr-8">
          <h1 className="ml-4 text-4xl font-bold">
            Rust RAID Calculator by MSpudicDesign
          </h1>
          <p className="ml-4 mt-4">
            This calculator helps you plan your raids in Rust by calculating the
            number of explosives required based on the number of wall types.
          </p>
          <div className="pt-8 ml-4 lg:pt-15">
            <button
              onClick={handleEnterCalculator}
              className="border text-sm font-mono rounded-lg p-2 hover:text-black hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
              Enter Calculator
            </button>
          </div>
        </div>

        {/* Logo Section */}
        <div className="w-full lg:w-1/3 lg:order-2 mb-8 lg:mb-0">
          <Image
            src="https://logos-world.net/wp-content/uploads/2021/02/Rust-Emblem.png"
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
