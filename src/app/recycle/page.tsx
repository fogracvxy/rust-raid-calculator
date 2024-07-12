"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { itemsRecycle } from "./items_recycle";
import { resources } from "./resources";

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
  cloth?: number;
  rope?: number;
  other?: string;
}

type Mode = "Safezone" | "Radtown" | "Default";

const Recycle: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; amount: number }[]
  >([]);
  const [mode, setMode] = useState<Mode>("Default");
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && typeof window !== "undefined") {
      const storedSelectedItems = localStorage.getItem("selectedItems");
      const storedMode = localStorage.getItem("mode") as Mode | null;

      console.log(
        "Loading from localStorage:",
        storedSelectedItems,
        storedMode
      );

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
      console.log("Saving selectedItems to localStorage:", selectedItems);
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }, [selectedItems]);

  useEffect(() => {
    if (initialized.current) {
      console.log("Saving mode to localStorage:", mode);
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  const handleIncrement = (itemName: string) => {
    let incrementTimeout: NodeJS.Timeout;

    const increment = () => {
      setSelectedItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.name === itemName);
        if (existingItem) {
          const updatedItems = prevItems.map((item) =>
            item.name === itemName ? { ...item, amount: item.amount + 1 } : item
          );
          return updatedItems;
        } else {
          return [...prevItems, { name: itemName, amount: 1 }];
        }
      });

      incrementTimeout = setTimeout(increment, 300);
    };

    increment();

    const stopIncrement = () => {
      clearTimeout(incrementTimeout);
      window.removeEventListener("mouseup", stopIncrement);
    };

    window.addEventListener("mouseup", stopIncrement);
  };

  const handleDecrement = (itemName: string) => {
    let decrementTimeout: NodeJS.Timeout;

    const decrement = () => {
      setSelectedItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.name === itemName);
        if (existingItem && existingItem.amount > 0) {
          const updatedItems = prevItems
            .map((item) =>
              item.name === itemName
                ? { ...item, amount: item.amount - 1 }
                : item
            )
            .filter((item) => item.amount > 0);
          return updatedItems;
        } else {
          return prevItems;
        }
      });

      decrementTimeout = setTimeout(decrement, 300);
    };

    decrement();

    const stopDecrement = () => {
      clearTimeout(decrementTimeout);
      window.removeEventListener("mouseup", stopDecrement);
    };

    window.addEventListener("mouseup", stopDecrement);
  };

  const resetSelectedItems = () => {
    setSelectedItems([]);
    localStorage.removeItem("selectedItems");
  };

  const getTotalYield = () => {
    let totals: Record<string, number> = {
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
        totals.totalScrap +=
          (selectedItem[yieldType]?.scrap || 0) * item.amount;
        totals.totalMetal +=
          (selectedItem[yieldType]?.metal || 0) * item.amount;
        totals.totalCloth +=
          (selectedItem[yieldType]?.cloth || 0) * item.amount;
        totals.totalHighQualityMetal +=
          (selectedItem[yieldType]?.highQualityMetal || 0) * item.amount;
        totals.totalRope += (selectedItem[yieldType]?.rope || 0) * item.amount;
      }
    });

    return totals;
  };

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
        {itemsRecycle.map((item: ItemRecycle, index: number) => {
          const selectedItem = selectedItems.find((i) => i.name === item.name);
          const amount = selectedItem ? selectedItem.amount : 0;

          return (
            <div key={index} className="flex flex-col items-center">
              <Image src={item.image} alt={item.name} width={50} height={50} />
              <span className="text-center">{item.name}</span>
              <div className="flex items-center mt-2">
                <button
                  onMouseDown={() => handleDecrement(item.name)}
                  className="bg-red-600 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4">{amount}</span>
                <button
                  onMouseDown={() => handleIncrement(item.name)}
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
              const totalResource = getTotalYield()[`total${resource.name}`];
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
