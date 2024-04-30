"use client";
import React, { useState } from "react";
import { itemsRecycle } from "./items_recyle";
import Image from "next/image";
import { resources } from "./resources";

interface ItemRecycle {
  name: string;
  yield: {
    scrap: number | null;
    metal: number | null;
    highQualityMetal: number | null;
    cloth?: number;
    rope?: number;
  };
  image: string;
}

const Recycle: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; amount: number }[]
  >([]);
  const [mode, setMode] = useState<"Safezone" | "Radtown" | "Default">(
    "Default"
  );

  const handleIncrement = (itemName: string) => {
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
  };

  const handleDecrement = (itemName: string) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === itemName);
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.name === itemName && item.amount > 0
            ? { ...item, amount: item.amount - 1 }
            : item
        );
        return updatedItems.filter((item) => item.amount > 0);
      } else {
        return prevItems;
      }
    });
  };

  const resetSelectedItems = () => {
    setSelectedItems([]);
  };

  const getTotalYield = () => {
    let totals: Record<string, number> = {
      totalScrap: 0,
      totalMetal: 0,
      totalCloth: 0,
      totalHighQualityMetal: 0,
    };

    selectedItems.forEach((item) => {
      const selectedItem = itemsRecycle.find((i) => i.name === item.name);
      if (selectedItem) {
        totals.totalScrap += (selectedItem.yield.scrap || 0) * item.amount;
        totals.totalMetal += (selectedItem.yield.metal || 0) * item.amount;
        totals.totalCloth += (selectedItem.yield.cloth || 0) * item.amount;
        totals.totalHighQualityMetal +=
          (selectedItem.yield.highQualityMetal || 0) * item.amount;
      }
    });

    return totals;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recycling Calculator
      </h1>
      <div className="flex justify-center mb-4">
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
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm lg:text-md">
        {itemsRecycle.map((item: ItemRecycle, index: number) => {
          const selectedItem = selectedItems.find((i) => i.name === item.name);
          const amount = selectedItem ? selectedItem.amount : 0;

          return (
            <div key={index} className="flex flex-col items-center">
              <Image src={item.image} alt={item.name} width={80} height={80} />
              <span className="text-center">{item.name}</span>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDecrement(item.name)}
                  className="bg-gray-500 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4">{amount}</span>
                <button
                  onClick={() => handleIncrement(item.name)}
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
        <h2 className="text-xl font-bold mb-4">Selected Items (Yield) </h2>
        {/* <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.amount}
            </li>
          ))}
        </ul> */}
        <button
          onClick={resetSelectedItems}
          className="px-4 py-2 bg-red-500 text-white rounded-md mb-4"
        >
          Reset Selected Items
        </button>
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
