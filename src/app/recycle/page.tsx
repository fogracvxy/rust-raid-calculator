"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { itemsRecycle } from "./data/items_recycle";
import { resources } from "./data/resources";

interface ItemRecycle {
  name: string;
  yield: Yield;
  yieldsafezone?: Yield;
  yieldradioactive?: Yield;
  image: string;
}

interface Yield {
  scrap?: number | null;
  metal?: number | null;
  highQualityMetal?: number | null;
  cloth?: number | null;
  rope?: number | null;
  other?: string;
}

type Mode = "Safezone" | "Radtown" | "Default";

const Recycle: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; amount: number }[]
  >([]);
  const [mode, setMode] = useState<Mode>("Default");
  const initialized = useRef(false);

  const incrementTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const decrementTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (!initialized.current && typeof window !== "undefined") {
      const storedSelectedItems = localStorage.getItem("selectedItems");
      const storedMode = localStorage.getItem("mode") as Mode | null;

      if (storedSelectedItems) {
        setSelectedItems(JSON.parse(storedSelectedItems));
      }

      if (
        storedMode === "Safezone" ||
        storedMode === "Radtown" ||
        storedMode === "Default"
      ) {
        setMode(storedMode);
      }

      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }, [selectedItems]);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  useEffect(() => {
    const currentIncrementTimeouts = incrementTimeouts.current;
    const currentDecrementTimeouts = decrementTimeouts.current;

    return () => {
      Object.values(currentIncrementTimeouts).forEach(clearTimeout);
      Object.values(currentDecrementTimeouts).forEach(clearTimeout);
    };
  }, []);

  const handleIncrementStart = (itemName: string) => {
    const increment = () => {
      setSelectedItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.name === itemName);
        if (existingItem) {
          return prevItems.map((item) =>
            item.name === itemName ? { ...item, amount: item.amount + 1 } : item
          );
        } else {
          return [...prevItems, { name: itemName, amount: 1 }];
        }
      });

      incrementTimeouts.current[itemName] = setTimeout(increment, 300);
    };

    increment();
  };

  const handleIncrementStop = (itemName: string) => {
    clearTimeout(incrementTimeouts.current[itemName]);
  };

  const handleDecrementStart = (itemName: string) => {
    const decrement = () => {
      setSelectedItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.name === itemName);
        if (existingItem && existingItem.amount > 0) {
          return prevItems
            .map((item) =>
              item.name === itemName
                ? { ...item, amount: item.amount - 1 }
                : item
            )
            .filter((item) => item.amount > 0);
        } else {
          return prevItems;
        }
      });

      decrementTimeouts.current[itemName] = setTimeout(decrement, 300);
    };

    decrement();
  };

  const handleDecrementStop = (itemName: string) => {
    clearTimeout(decrementTimeouts.current[itemName]);
  };

  const resetSelectedItems = () => {
    setSelectedItems([]);
    localStorage.removeItem("selectedItems");
  };

  const totalYield = useMemo(() => {
    const totals: Record<string, number> = {
      totalScrap: 0,
      totalMetal: 0,
      totalCloth: 0,
      totalHighQualityMetal: 0,
      totalRope: 0,
    };

    selectedItems.forEach((item) => {
      const selectedItem = itemsRecycle.find((i) => i.name === item.name);
      if (selectedItem) {
        const yieldType =
          mode === "Safezone"
            ? "yieldsafezone"
            : mode === "Radtown"
            ? "yieldradioactive"
            : "yield";
        const itemYield = selectedItem[yieldType] || {};

        totals.totalScrap += (itemYield.scrap || 0) * item.amount;
        totals.totalMetal += (itemYield.metal || 0) * item.amount;
        totals.totalCloth += (itemYield.cloth || 0) * item.amount;
        totals.totalHighQualityMetal +=
          (itemYield.highQualityMetal || 0) * item.amount;
        totals.totalRope += (itemYield.rope || 0) * item.amount;
      }
    });

    return totals;
  }, [selectedItems, mode]);

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recycling Calculator
      </h1>
      <div className="flex justify-center items-center mb-10">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="px-4 py-2 border rounded-md text-black"
        >
          <option value="Default">Default</option>
          <option value="Safezone">Safezone</option>
          <option value="Radtown">Radtown</option>
        </select>
        <button
          onClick={resetSelectedItems}
          className="px-2 py-2 bg-red-600 text-white rounded-md ml-4"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 text-sm lg:text-md">
        {itemsRecycle.map((item: ItemRecycle) => {
          const selectedItem = selectedItems.find((i) => i.name === item.name);
          const amount = selectedItem ? selectedItem.amount : 0;

          return (
            <div key={item.name} className="flex flex-col items-center">
              <Image src={item.image} alt={item.name} width={50} height={50} />
              <span className="text-center">{item.name}</span>
              <div className="flex items-center mt-2">
                <button
                  onMouseDown={() => handleDecrementStart(item.name)}
                  onMouseUp={() => handleDecrementStop(item.name)}
                  onMouseLeave={() => handleDecrementStop(item.name)}
                  className="bg-red-600 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4">{amount}</span>
                <button
                  onMouseDown={() => handleIncrementStart(item.name)}
                  onMouseUp={() => handleIncrementStop(item.name)}
                  onMouseLeave={() => handleIncrementStop(item.name)}
                  className="bg-green-500 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white border-t-2 border-gray-700 py-4 flex flex-col items-center">
          <h2 className="text-lg font-bold border-b-2 border-green-500 text-green-500 mb-4">
            {mode} - Recycle Summary
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-4">
            {resources.map((resource) => {
              const totalResource = totalYield[`total${resource.name}`];
              return (
                <div key={resource.name} className="relative">
                  <Image
                    src={resource.image}
                    height={50}
                    width={50}
                    alt={resource.name}
                  />
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                    {totalResource || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recycle;
