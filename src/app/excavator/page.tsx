"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  excavatorData,
  quarryData,
  excavatorTimePerFuelInSeconds,
} from "./excavator_data";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isEditing, setIsEditing] = useState(false);
  const [tempAmount, setTempAmount] = useState("");
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const decrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Focus input field when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleIncrement = () => {
    const increment = () => {
      setDieselFuel((prev) => prev + 1);
      incrementTimeoutRef.current = setTimeout(increment, 300);
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
      decrementTimeoutRef.current = setTimeout(decrement, 300);
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

  const handleDirectInput = (value: string) => {
    setTempAmount(value);
  };

  const handleBlur = () => {
    const numValue = parseInt(tempAmount);
    if (!isNaN(numValue) && numValue >= 1) {
      setDieselFuel(numValue);
    }
    setIsEditing(false);
    setTempAmount("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTempAmount("");
    }
  };

  const handleOperationChange = (operation: string) => {
    setSelectedOperation(operation);
  };

  const getCurrentData = () => {
    if (selectedOperation === "Excavator") {
      // Create a modified copy of excavator data to handle supply drops
      return excavatorData.map(item => {
        if (item.name === "Airdrop") {
          // Calculate airdrop amount: 1 per 5 diesel fuel
          const supplyDrops = Math.floor(dieselFuel / 5);
          return {
            ...item,
            amount: supplyDrops > 0 ? 1 : 0, // Base amount is 1 if any drops are available
            total: supplyDrops // Store the total for display
          };
        }
        return item;
      });
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

  const formatTime = (totalSeconds: number) => {
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

    return timeString;
  };

  const currentData = getCurrentData();
  const fuelImage = getFuelImage();
  const formattedTime = formatTime(totalTimeInSeconds);
  
  // Operation types for the selector
  const operationTypes = [
    {
      id: "Excavator",
      name: "Excavator",
      icon: "/images/diesel_barrel.png"
    },
    {
      id: "HQM Quarry",
      name: "HQM Quarry",
      icon: "/images/resources/hqore.png"
    },
    {
      id: "Sulfur Quarry",
      name: "Sulfur Quarry",
      icon: "/images/sulfur.ore.png"
    },
    {
      id: "Stone Quarry",
      name: "Stone Quarry",
      icon: "/images/resources/stones.png"
    }
  ];

  // Add this utility function for consistent number formatting
  const formatNumber = (num: number): string => {
    // Use a simple approach that works consistently on both server and client
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black py-6 px-6 rounded-lg border border-gray-800 shadow-2xl mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-white">
            Resource Yield Calculator
          </h1>
          <p className="text-gray-400 text-center text-sm mb-2">
            Calculate resource yields from excavators and quarries based on fuel input
          </p>
        </div>

        {/* Operation Type Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4 text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            Select Operation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {operationTypes.map((operation) => (
              <div
                key={operation.id}
                className={`flex flex-col items-center px-3 py-4 rounded-lg cursor-pointer transition-all relative ${
                  selectedOperation === operation.id
                    ? "bg-gradient-to-br from-red-900/40 to-red-950/60 border border-red-800 shadow-lg"
                    : "bg-gray-900/60 border border-gray-800 hover:border-gray-700"
                }`}
                onClick={() => handleOperationChange(operation.id)}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-12 h-12 mb-2">
                    <Image
                      src={operation.icon}
                      alt={operation.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className={`text-sm font-medium ${
                    selectedOperation === operation.id ? "text-red-400" : "text-gray-300"
                  }`}>
                    {operation.name}
                  </span>
                </motion.div>
                
                {selectedOperation === operation.id && (
                  <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Input Section */}
        <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-5 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              {fuelImage && (
                <div className="relative w-16 h-16 mr-4">
                  <Image
                    src={fuelImage}
                    alt="Diesel Fuel"
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-medium text-white">Diesel Fuel</h3>
                <p className="text-sm text-gray-400">
                  Each barrel runs for {formatTime(timePerFuelInSeconds)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
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
                onTouchStart={handleDecrement}
                onTouchEnd={() => {
                  if (decrementTimeoutRef.current)
                    clearTimeout(decrementTimeoutRef.current);
                }}
                disabled={dieselFuel === 1}
                className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 w-10 h-10 flex items-center justify-center text-white rounded-l transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="number"
                  min="1"
                  value={tempAmount}
                  onChange={(e) => handleDirectInput(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="h-10 w-20 bg-gray-800 text-center text-white text-lg border-y border-black/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              ) : (
                <div 
                  className="h-10 w-20 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-white text-lg font-medium border-y border-black/40 shadow-inner cursor-pointer"
                  onClick={() => {
                    setIsEditing(true);
                    setTempAmount(dieselFuel.toString());
                  }}
                >
                  {dieselFuel}
                </div>
              )}
              
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
                onTouchStart={handleIncrement}
                onTouchEnd={() => {
                  if (incrementTimeoutRef.current)
                    clearTimeout(incrementTimeoutRef.current);
                }}
                className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 w-10 h-10 flex items-center justify-center text-white rounded-r transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Time Display */}
        <motion.div 
          className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg p-5 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Total Run Time</h3>
                <p className="text-xs text-gray-400">For {dieselFuel} barrel{dieselFuel > 1 ? 's' : ''} of diesel</p>
              </div>
            </div>
            <div className="text-xl font-bold text-red-500">{formattedTime}</div>
          </div>
        </motion.div>

        {/* Yield Results Section */}
        <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="text-xl font-medium text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resource Yield
            </h2>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {currentData
                  .filter((item) => item.name !== "Diesel Fuel")
                  .map((item: Item & { total?: number }, index: number) => {
                    // Skip airdrops that aren't yielded
                    if (item.name === "Airdrop" && dieselFuel < 5) return null;
                    
                    // Calculate the display amount
                    const displayAmount = item.name === "Airdrop" 
                      ? Math.floor(dieselFuel / 5) // Number of supply drops (1 per 5 diesel)
                      : item.amount * dieselFuel;

                    return (
                      <motion.div
                        key={item.name}
                        className={`bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all shadow-md ${
                          item.name === "Airdrop" ? "border-amber-800" : ""
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center">
                          <div className={`relative w-12 h-12 rounded-lg ${
                            item.name === "Airdrop" ? "bg-amber-900/30" : "bg-black/50"
                          } flex items-center justify-center mr-3 overflow-hidden`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="object-contain drop-shadow-lg"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-medium text-white truncate">{item.name}</h3>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-gray-400 text-sm">
                                {item.name === "Airdrop" 
                                  ? "1 per 5 diesel" 
                                  : `${formatNumber(item.amount)} per barrel`}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col items-end">
                            <div className={`text-2xl font-bold ${
                              item.name === "Airdrop" ? "text-amber-500" : "text-green-500"
                            }`}>
                              {formatNumber(displayAmount)}
                            </div>
                            <div className="text-xs text-gray-400">total yield</div>
                          </div>
                        </div>
                        {item.name === "Airdrop" && (
                          <div className="mt-2 pt-2 border-t border-gray-800">
                            <div className="text-xs text-amber-400 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Excavator calls in one supply drop for every 5 barrels of diesel fuel
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  }).filter(Boolean)}
              </AnimatePresence>
            </div>
            
            {/* Show hint about supply drops if using Excavator but not enough diesel */}
            {selectedOperation === "Excavator" && dieselFuel < 5 && (
              <motion.div 
                className="mt-4 p-3 bg-gray-900/50 border border-amber-900/50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Add at least 5 diesel fuel to receive supply drops ({5 - dieselFuel} more needed)</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
