"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import axios from "axios";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const router = useRouter();
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const updateCountdown = useCallback(() => {
    let nextThursday = getNextFirstThursday();

    let now = new Date();
    let difference = nextThursday.getTime() - now.getTime();

    // Calculate the remaining time
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setCountDownTime({ days, hours, minutes, seconds });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  const getNextFirstThursday = (): Date => {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), 1);

    // Find the first Thursday of the current month
    while (date.getDay() !== 4) {
      date.setDate(date.getDate() + 1);
    }

    // If today's date is past the first Thursday or it is the first Thursday but past 20:00
    if (now.getDate() === date.getDate() && now.getHours() < 20) {
      date = now;
    } else {
      if (
        now > date ||
        (now.getDate() === date.getDate() && now.getHours() >= 20)
      ) {
        date.setMonth(date.getMonth() + 1);
        date.setDate(1);
        while (date.getDay() !== 4) {
          date.setDate(date.getDate() + 1);
        }
      }
    }

    date.setHours(20, 0, 0, 0);
    // Set the target time to 8 PM
    return date;
  };

  const handleEnterCalculator = () => {
    router.push("/raid"); // Navigate to '/raid' route
  };

  const isCountdownZero =
    countDownTime.days === 0 &&
    countDownTime.hours === 0 &&
    countDownTime.minutes === 0 &&
    countDownTime.seconds === 0;

  return (
    <main className="flex flex-col items-center justify-between p-4 pb-32 bg-black text-white">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between font-mono text-lg">
        {/* Content Section */}
        <div className="w-full lg:w-2/3 lg:order-1 pr-8">
          <h1 className="ml-4 text-4xl font-bold text-red-600">
            Rust TOOLS by MSpudicDesign
          </h1>
          <p className="ml-4 mt-4 text-lg">
            Enhance your Rust experience with our suite of powerful tools
            designed to give you the edge you need. Whether you're planning your
            next raid, optimizing your recycling strategy, or checking out
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
      {isCountdownZero ? (
        <div className="mb-12">
          <Hourglass
            visible={true}
            height="40"
            width="40"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["rgb(220 38 38)", "rgb(239 68 68)"]}
          />
        </div>
      ) : (
        <>
          {/* Countdown Section */}
          <div className="border-b-4 mb-8 text-2xl">NEXT FORCE WIPE</div>
          <div className="flex items-start justify-center mb-12 w-full gap-6">
            <div className="timer w-16">
              <div className="bg-red-600 py-4 px-2 rounded-lg overflow-hidden shadow-lg shadow-red-800/50">
                <h3 className="countdown-element days font-Cormorant font-mono text-2xl text-white text-center">
                  {countDownTime.days}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-medium text-white mt-1 text-center w-full">
                days
              </p>
            </div>
            <div className="timer w-16">
              <div className="bg-red-600 py-4 px-2 rounded-lg overflow-hidden shadow-lg shadow-red-800/50">
                <h3 className="countdown-element hours font-Cormorant font-mono text-2xl text-white text-center">
                  {countDownTime.hours}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-white mt-1 text-center w-full">
                hours
              </p>
            </div>

            <div className="timer w-16">
              <div className="bg-red-600 py-4 px-2 rounded-lg overflow-hidden shadow-lg shadow-red-800/50">
                <h3 className="countdown-element minutes font-Cormorant font-mono text-2xl text-white text-center">
                  {countDownTime.minutes}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-white mt-1 text-center w-full">
                minutes
              </p>
            </div>

            <div className="timer w-16">
              <div className="bg-red-600 py-4 px-2 rounded-lg overflow-hidden shadow-lg shadow-red-800/50">
                <h3 className="countdown-element seconds font-Cormorant font-mono text-2xl text-white text-center">
                  {countDownTime.seconds}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-white mt-1 text-center w-full">
                seconds
              </p>
            </div>
          </div>
        </>
      )}

      {/* Grid Section */}
      <div className="w-full max-w-6xl mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-red-800 p-6 rounded-lg shadow-lg shadow-red-800/50 text-center transition-transform transform hover:-translate-y-1 hover:scale-105">
          <h2 className="text-xl font-bold">Rust Raid Calculator</h2>
          <p className="mt-2">
            Plan your raids efficiently with our detailed calculator. Know
            exactly what you need.
          </p>
        </div>
        <div className="bg-red-800 p-6 rounded-lg shadow-lg shadow-red-800/50 text-center transition-transform transform hover:-translate-y-1 hover:scale-105">
          <h2 className="text-xl font-bold">Excavator Yield per Diesel Fuel</h2>
          <p className="mt-2">
            Calculate the yield from the excavator per diesel fuel to optimize
            your resources.
          </p>
        </div>
        <div className="bg-red-800 p-6 rounded-lg shadow-lg shadow-red-800/50 text-center transition-transform transform hover:-translate-y-1 hover:scale-105">
          <h2 className="text-xl font-bold">Recycle Calculator</h2>
          <p className="mt-2">
            Maximize your recycling efficiency with our easy-to-use calculator.
          </p>
        </div>
        <div className="bg-red-800 p-6 rounded-lg shadow-lg shadow-red-800/50 text-center transition-transform transform hover:-translate-y-1 hover:scale-105">
          <h2 className="text-xl font-bold">Server Statistics</h2>
          <p className="mt-2">
            Get the latest metrics and statistics of your favorite Rust servers.
          </p>
        </div>
      </div>
    </main>
  );
}
