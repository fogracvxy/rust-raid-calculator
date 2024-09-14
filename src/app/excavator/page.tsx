"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  excavatorData,
  quarryData,
  excavatorTimePerFuelInSeconds,
} from "./excavator_data"; // Import both data sets and time per fuel

export default function YieldCalculator() {
  interface Item {
    name: string;
    amount: number;
    image: string;
    time?: string;
  }

  const [dieselFuel, setDieselFuel] = useState(1);
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState("Excavator");
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const decrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [timePerFuelInSeconds, setTimePerFuelInSeconds] = useState(0);

  // Update time per fuel when selected operation changes
  useEffect(() => {
    if (selectedOperation === "Excavator") {
      setTimePerFuelInSeconds(excavatorTimePerFuelInSeconds);
    } else {
      const quarry = quarryData.find(
        (quarry) => quarry.type === selectedOperation
      );
      setTimePerFuelInSeconds(quarry?.timePerFuelInSeconds || 0);
    }
  }, [selectedOperation]);

  // Update total time whenever diesel fuel or time per fuel changes
  useEffect(() => {
    setTotalTimeInSeconds(dieselFuel * timePerFuelInSeconds);
  }, [dieselFuel, timePerFuelInSeconds]);

  const handleIncrement = () => {
    const increment = () => {
      setDieselFuel((prev) => prev + 1);
      incrementTimeoutRef.current = setTimeout(increment, 300); // Repeat increment after 300ms
    };

    increment();

    const stopIncrement = () => {
      if (incrementTimeoutRef.current) {
        clearTimeout(incrementTimeoutRef.current);
      }
      window.removeEventListener("mouseup", stopIncrement);
    };

    window.addEventListener("mouseup", stopIncrement);
  };

  const handleDecrement = () => {
    const decrement = () => {
      setDieselFuel((prev) => Math.max(1, prev - 1));
      decrementTimeoutRef.current = setTimeout(decrement, 300); // Repeat decrement after 300ms
    };

    decrement();

    const stopDecrement = () => {
      if (decrementTimeoutRef.current) {
        clearTimeout(decrementTimeoutRef.current);
      }
      window.removeEventListener("mouseup", stopDecrement);
    };

    window.addEventListener("mouseup", stopDecrement);
  };

  const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOperation(e.target.value);
    // setDieselFuel(1); // Do not reset diesel fuel count
  };

  const getCurrentData = () => {
    if (selectedOperation === "Excavator") {
      return excavatorData;
    } else {
      return (
        quarryData.find((quarry) => quarry.type === selectedOperation)?.yield ||
        []
      );
    }
  };

  const getFuelImage = () => {
    if (selectedOperation === "Excavator") {
      return excavatorData.find((item) => item.name === "Diesel Fuel")?.image;
    } else {
      return quarryData.find((quarry) => quarry.type === selectedOperation)
        ?.fuel;
    }
  };

  const DisplayTime = () => {
    const totalSeconds = totalTimeInSeconds;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let timeString = "";
    if (hours > 0) {
      timeString += `${hours} hour${hours > 1 ? "s" : ""}`;
      if (minutes > 0 || seconds > 0) {
        timeString += `, `;
      }
    }
    if (minutes > 0) {
      timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
      if (seconds > 0) {
        timeString += `, `;
      }
    }
    if (seconds > 0) {
      timeString += `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
    if (timeString === "") {
      timeString = "0 seconds";
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

  const currentData = getCurrentData();
  const fuelImage = getFuelImage();

  return (
    <div className="flex flex-col justify-center items-center pt-10 text-center">
      <div className="text-3xl font-bold mb-6 text-center">
        Yield Calculator
      </div>

      {/* Operation Type Selector */}
      <select
        className="mb-6 px-4 py-2 border rounded-lg text-black"
        value={selectedOperation}
        onChange={handleOperationChange}
      >
        <option value="Excavator">Excavator</option>
        <option value="HQM Quarry">HQM Quarry</option>
        <option value="Sulfur Quarry">Sulfur Quarry</option>
        <option value="Stone Quarry">Stone Quarry</option>
      </select>

      {/* Diesel Fuel Icon */}
      {fuelImage && (
        <div className="flex flex-col pb-5">
          <div className="pl-4">
            <Image src={fuelImage} height={60} width={60} alt="Diesel Fuel" />
          </div>
          <div>Diesel Fuel</div>
        </div>
      )}

      {/* Diesel Fuel Count */}
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

      {/* Yield Table */}
      <div className="w-full max-w-2xl">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border border-gray-300">Item</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentData
              .filter((item) => item.name !== "Diesel Fuel")
              .map((item: Item, index: number) => (
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
              ))}
          </tbody>
        </table>
        <DisplayTime />
      </div>
    </div>
  );
}
