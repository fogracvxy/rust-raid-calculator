"use client";
import React, { useEffect, useState } from "react";
import { items } from "./items";
import Image from "next/image";

interface Item {
  name: string;
  image: string;
  destructionOptions: {
    c4: number;
    bullets: number;
    rockets: number;
    satchel: number;
  };
  category: string;
}

const DestructionUI = () => {
  const [collection, setCollection] = useState<
    { item: Item; quantity: number }[]
  >(() => {
    if (typeof window !== "undefined") {
      const storedCollection = localStorage.getItem("collection");
      return storedCollection ? JSON.parse(storedCollection) : [];
    }
    return [];
  });

  const [selectedMethod, setSelectedMethod] = useState<
    keyof Item["destructionOptions"]
  >(() => {
    if (typeof window !== "undefined") {
      const storedMethod = localStorage.getItem("selectedMethod");
      return (storedMethod as keyof Item["destructionOptions"]) || "c4";
    }
    return "c4"; // Default value if localStorage is not available
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedCategory = localStorage.getItem("activeCategory");
      return storedCategory || null;
    }
    return null; // Default value if localStorage is not available
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("collection", JSON.stringify(collection));
    }
  }, [collection]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedMethod", selectedMethod);
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeCategory", activeCategory || "");
    }
  }, [activeCategory]);

  const handleAddItem = (item: Item) => {
    const existingItem = collection.find((c) => c.item.name === item.name);

    if (existingItem) {
      const updatedCollection = collection.map((c) =>
        c.item.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
      );
      setCollection(updatedCollection);
    } else {
      setCollection([...collection, { item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (item: Item) => {
    const existingItem = collection.find((c) => c.item.name === item.name);

    if (existingItem) {
      if (existingItem.quantity === 1) {
        const updatedCollection = collection.filter(
          (c) => c.item.name !== item.name
        );
        setCollection(updatedCollection);
      } else {
        const updatedCollection = collection.map((c) =>
          c.item.name === item.name ? { ...c, quantity: c.quantity - 1 } : c
        );
        setCollection(updatedCollection);
      }
    }
  };

  const handleResetAll = () => {
    setCollection([]);
    setSelectedMethod("c4");
    setActiveCategory(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("collection");
      localStorage.removeItem("selectedMethod");
      localStorage.removeItem("activeCategory");
    }
  };

  const renderItemsByCategory = (category: string) => {
    const filteredItems = items.filter((item) => item.category === category);

    return filteredItems.map((item) => {
      const collectionItem = collection.find((c) => c.item.name === item.name);
      const quantity = collectionItem ? collectionItem.quantity : 0;

      return (
        <div key={item.name} className="bg-black rounded-lg shadow-md p-2">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-contain mx-auto mb-2"
          />
          <p className="text-sm font-semibold text-center">{item.name}</p>
          <div className="flex justify-center items-center mt-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-sm mr-2"
              onClick={() => handleRemoveItem(item)}
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-sm ml-2"
              onClick={() => handleAddItem(item)}
            >
              +
            </button>
          </div>
        </div>
      );
    });
  };
  const calculateResources = () => {
    let c4 = 0;
    let bullets = 0;
    let rockets = 0;
    let satchel = 0;

    collection.forEach((c) => {
      c4 += c.item.destructionOptions.c4 * c.quantity;
      bullets += c.item.destructionOptions.bullets * c.quantity;
      rockets += c.item.destructionOptions.rockets * c.quantity;
      satchel += c.item.destructionOptions.satchel * c.quantity;
    });

    return { c4, bullets, rockets, satchel };
  };
  const calculateTotalSulfur = (
    selectedMethod: keyof Item["destructionOptions"]
  ) => {
    let totalSulfur = 0;
    console.log(selectedMethod);
    collection.forEach((colItem) => {
      const itemName = colItem.item.name;
      const quantity = colItem.quantity;

      // Find the corresponding item in the items array
      const item = items.find((item) => item.name === itemName);

      if (item) {
        // Get the quantity of the selected raid method (e.g., c4, rockets, satchel, bullets)
        const methodQuantity = item.destructionOptions[selectedMethod];

        // Get the sulfur cost per unit for the selected raid method
        const sulfurCost = getSulfurCost(selectedMethod);

        // Calculate the total sulfur cost for this item
        const itemSulfurCost = methodQuantity * quantity * sulfurCost;

        // Add to the total sulfur cost
        totalSulfur += itemSulfurCost;
      }
    });

    return totalSulfur;
  };

  // Function to handle changing the selected method
  const handleSelectMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(event.target.value as keyof Item["destructionOptions"]);
  };

  const getSulfurCost = (method: keyof Item["destructionOptions"]) => {
    // Define the sulfur cost per unit for each raid method
    switch (method) {
      case "c4":
        return 2200; // Sulfur cost per C4
      case "rockets":
        return 1400; // Sulfur cost per rocket
      case "satchel":
        return 480; // Sulfur cost per satchel charge
      case "bullets":
        return 25; // Sulfur cost per bullet
      default:
        return 0;
    }
  };

  return (
    <div className="p-4 py-8">
      <div>
        <label className="mr-2" htmlFor="methodSelect">
          Select Raid Method:
        </label>
        <select
          id="methodSelect"
          className="text-black"
          value={selectedMethod}
          onChange={handleSelectMethod}
        >
          <option value="c4">C4</option>
          <option value="rockets">Rockets</option>
          <option value="satchel">Satchel</option>
          <option value="bullets">Bullets</option>
        </select>
      </div>
      <div className="flex justify-center my-8 space-x-4">
        <button
          className={`text-sm font-semibold px-2 py-1 rounded ${
            activeCategory === "Walls"
              ? "bg-gray-500 border text-white"
              : "text-white border"
          }`}
          onClick={() => setActiveCategory("Walls")}
        >
          Walls
        </button>
        <button
          className={`text-sm font-semibold px-2 py-1 rounded ${
            activeCategory === "Doors"
              ? "bg-gray-500 border text-white"
              : "text-white border"
          }`}
          onClick={() => setActiveCategory("Doors")}
        >
          Doors
        </button>
        <button
          className={`text-sm font-semibold px-2 py-1 rounded ${
            activeCategory === "Defenses"
              ? "bg-gray-500 border text-white"
              : "text-white border"
          }`}
          onClick={() => setActiveCategory("Defenses")}
        >
          Defenses
        </button>
        <button
          className={`text-sm font-semibold px-2 py-1 rounded ${
            activeCategory === "Furniture"
              ? "bg-gray-500 border text-white"
              : "text-white border"
          }`}
          onClick={() => setActiveCategory("Furniture")}
        >
          Furniture
        </button>
        {/* Add more category buttons as needed */}
      </div>
      <div className="flex justify-center">
        {!activeCategory ? (
          <div>
            <p className="text-red-600 text-lg ">Choose category to begin!</p>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-10 gap-4 justify-center items-center">
        {activeCategory && renderItemsByCategory(activeCategory)}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Collection</h2>
        {collection.map((c) => (
          <div key={`${c.item.name}`} className="flex items-center mb-2">
            <p className="flex-1">
              {c.item.name} x {c.quantity}
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-sm"
              onClick={() => handleRemoveItem(c.item)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Required Resources</h2>
        <div className="flex">
          <div className="flex flex-col mr-4">
            <div className="flex items-center mb-2">
              <Image
                src="/images/explosive.timed.png"
                height={40}
                width={40}
                alt="Timed Explosive Charge"
              />
              <p className="ml-4">{calculateResources().c4}</p>
            </div>
            <div className="flex items-center mb-2">
              <Image
                src="/images/ammo.rifle.explosive.png"
                height={40}
                width={40}
                alt="Explosive Ammo"
              />
              <p className="ml-4">{calculateResources().bullets}</p>
            </div>
            <div className="flex items-center mb-2">
              <Image
                src="/images/ammo.rocket.basic.png"
                height={40}
                width={40}
                alt="Rocket"
              />
              <p className="ml-4">{calculateResources().rockets}</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/images/explosive.satchel.png"
                height={40}
                width={40}
                alt="Satchel Charge"
              />
              <p className="ml-4">{calculateResources().satchel}</p>
            </div>
          </div>

          {/* Add more columns here if needed */}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-2">
              Total Sulfur Cost ({selectedMethod})
            </h2>
            <div className="flex items-center  mb-2 ">
              <Image
                src="/images/sulfur.png"
                height={40}
                width={40}
                alt="Sulfur"
              />
              <p className="ml-5 mt-2">
                {calculateTotalSulfur(selectedMethod)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-20 flex justify-center lg:flex lg:justify-start ">
        {" "}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleResetAll}
        >
          Reset All and Clear Storage
        </button>
      </div>
    </div>
  );
};

export default DestructionUI;
