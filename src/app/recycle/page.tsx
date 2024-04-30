"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { itemsRecycle } from "./items_recyle";
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

const Recycle: React.FC = () => {
  const getInitialState = () => {
    if (typeof window !== "undefined") {
      const storedSelectedItems = localStorage.getItem("selectedItems");
      const storedMode = localStorage.getItem("mode");
      return {
        selectedItems: storedSelectedItems
          ? JSON.parse(storedSelectedItems)
          : [],
        mode: (storedMode as "Safezone" | "Radtown" | "Default") || "Default",
      };
    }
    return {
      selectedItems: [],
      mode: "Default",
    };
  };

  const { selectedItems: initialSelectedItems, mode: initialMode } =
    getInitialState();

  const [selectedItems, setSelectedItems] =
    useState<{ name: string; amount: number }[]>(initialSelectedItems);
  const [mode, setMode] = useState<"Safezone" | "Radtown" | "Default">(
    initialMode
  );

  useEffect(() => {
    localStorage.setItem(
      "selectedItems",
      JSON.stringify(
        selectedItems.map(({ name, amount }) => ({ name, amount }))
      )
    );
    localStorage.setItem("mode", mode);
  }, [selectedItems, mode]);

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

      incrementTimeout = setTimeout(increment, 300); // Repeat increment after 300ms
    };

    increment(); // Start first increment

    // Listen for mouseup to stop incrementing
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

      decrementTimeout = setTimeout(decrement, 300); // Repeat decrement after 300ms
    };

    decrement(); // Start first decrement

    // Listen for mouseup to stop decrementing
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recycling Calculator
      </h1>
      <div className="flex justify-center items-center mb-4">
        <select
          value={mode}
          onChange={(e) =>
            setMode(e.target.value as "Safezone" | "Radtown" | "Default")
          }
          className="px-4 py-2 border rounded-md text-black"
        >
          <option value="Default">Default Values WIP</option>
          <option value="Safezone">Safezone</option>
          <option value="Radtown">Radtown</option>
        </select>
        <button
          onClick={resetSelectedItems}
          className="px-4 py-2 bg-red-500 text-white rounded-md ml-4"
        >
          Reset Selected Items
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
                  className="bg-gray-500 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4">{amount}</span>
                <button
                  onMouseDown={() => handleIncrement(item.name)}
                  className="bg-gray-500 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Selected Items (Yield)</h2>
        <div className="flex flex-wrap">
          {resources.map((resource) => {
            const totalResource = getTotalYield()[`total${resource.name}`];
            return (
              <div
                key={resource.name}
                className="flex items-center mr-4 mb-4 relative"
              >
                <div className="relative">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recycle;
