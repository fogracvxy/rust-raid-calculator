"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { excavatorData } from "./excavator_data";

export default function Excavator() {
  interface ItemExcavator {
    name: string;
    amount: number;
    image: string;
    time?: number;
  }

  const [dieselFuel, setDieselFuel] = useState(1);
  const [time, setTime] = useState(2);
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const decrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIncrement = () => {
    const increment = () => {
      setDieselFuel((prev) => prev + 1);
      setTime((prev) => prev + 2);
      incrementTimeoutRef.current = setTimeout(increment, 300); // Repeat increment after 300ms
    };

    increment(); // Start first increment

    // Listen for mouseup to stop incrementing
    const stopIncrement = () => {
      if (incrementTimeoutRef.current) {
        clearTimeout(incrementTimeoutRef.current);
      }
      window.removeEventListener("mouseup", stopIncrement);
    };

    window.addEventListener("mouseup", stopIncrement);
  };
  const DisplayTime = () => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    let timeString = "";
    if (hours > 0) {
      timeString += `${hours} hour${hours > 1 ? "s" : ""}`;
      if (minutes > 0) {
        timeString += ` and ${minutes} minute${minutes > 1 ? "s" : ""}`;
      }
    } else {
      timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    return (
      <div className="flex justify-center m-5 items-center border border-5 p-4 rounded-lg shadow-md">
        <span className="text-lg font-semibold text-gray-200">Time:</span>
        <span className="ml-2 text-lg font-bold text-red-600">
          {timeString}
        </span>
      </div>
    );
  };
  const handleDecrement = () => {
    const decrement = () => {
      setDieselFuel((prev) => Math.max(1, prev - 1));
      setTime((prev) => Math.max(2, prev - 2));
      decrementTimeoutRef.current = setTimeout(decrement, 300); // Repeat decrement after 300ms
    };

    decrement(); // Start first decrement

    // Listen for mouseup to stop decrementing
    const stopDecrement = () => {
      if (decrementTimeoutRef.current) {
        clearTimeout(decrementTimeoutRef.current);
      }
      window.removeEventListener("mouseup", stopDecrement);
    };

    window.addEventListener("mouseup", stopDecrement);
  };

  const dieselFuelItem = excavatorData.find(
    (item) => item.name === "Diesel Fuel"
  );

  if (!dieselFuelItem) {
    return <div>Error: Diesel Fuel data not found.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-10 text-center">
      <div className="text-3xl font-bold mb-6 text-center">
        Excavator Yield Calculator
      </div>
      <div className="flex flex-col pb-5">
        <div className="pl-4">
          <Image
            src={dieselFuelItem.image}
            height={60}
            width={60}
            alt={dieselFuelItem.name}
          />
        </div>
        <div>Diesel Fuel</div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <button
          onMouseDown={handleDecrement}
          onMouseUp={() => {
            if (decrementTimeoutRef.current)
              clearTimeout(decrementTimeoutRef.current);
          }}
          onMouseLeave={() => {
            if (decrementTimeoutRef.current)
              clearTimeout(decrementTimeoutRef.current);
          }}
          disabled={dieselFuel === 1}
          className="bg-red-600 px-4 py-2 text-white rounded-l disabled:opacity-50"
        >
          -
        </button>
        <span className="mx-4 text-lg">{dieselFuel}</span>
        <button
          onMouseDown={handleIncrement}
          onMouseUp={() => {
            if (incrementTimeoutRef.current)
              clearTimeout(incrementTimeoutRef.current);
          }}
          onMouseLeave={() => {
            if (incrementTimeoutRef.current)
              clearTimeout(incrementTimeoutRef.current);
          }}
          className="bg-green-500 px-4 py-2 text-white rounded-r"
        >
          +
        </button>
      </div>
      <div className="w-full max-w-2xl">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border border-gray-300">Item</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {excavatorData.map((item: ItemExcavator, index: number) =>
              item.name === "Diesel Fuel" ? null : (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300 flex items-center">
                    <Image
                      src={item.image}
                      height={50}
                      width={50}
                      alt={item.name}
                      className="mr-2"
                    />
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border text-green-500 border-gray-300">
                    {item.amount * dieselFuel}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <DisplayTime />
      </div>
    </div>
  );
}
