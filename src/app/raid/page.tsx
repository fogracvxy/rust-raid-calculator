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
  bestOption?: {
    c4: number;
    bullets: number;
    rockets: number;
    satchel: number;
  };
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
          <Image
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-contain mx-auto mb-2"
            height={100}
            width={100}
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
  const calculateSulfurCost = (method: keyof Item["destructionOptions"]) => {
    let totalSulfur = 0;

    collection.forEach((c) => {
      const item = items.find((item) => item.name === c.item.name);

      if (item) {
        const methodQuantity = item.destructionOptions[method];
        const sulfurCost = getSulfurCost(method);
        totalSulfur += methodQuantity * c.quantity * sulfurCost;
      }
    });

    return totalSulfur;
  };
  const resources = [
    { name: "C4", image: "/images/c4.png", quantity: calculateResources().c4 },
    {
      name: "Bullets",
      image: "/images/bullets.png",
      quantity: calculateResources().bullets,
    },
    {
      name: "Rockets",
      image: "/images/rockets.png",
      quantity: calculateResources().rockets,
    },
    {
      name: "Satchel",
      image: "/images/satchel.png",
      quantity: calculateResources().satchel,
    },
    // Add more resources here if needed
  ];

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
  const sulfurCosts = {
    c4: calculateSulfurCost("c4"),
    rockets: calculateSulfurCost("rockets"),
    satchel: calculateSulfurCost("satchel"),
    bullets: calculateSulfurCost("bullets"),
  };
  const calculateCost = (option: string, quantity: number) => {
    const sulfurCost = getSulfurCost(
      option as keyof Item["destructionOptions"]
    );
    return sulfurCost * quantity;
  };
  const sortedOptions = Object.entries(sulfurCosts).sort(
    ([, costA], [, costB]) => costA - costB
  );
  return (
    <div className="p-4 py-8">
      <div className="flex justify-center flex-wrap gap-4 my-8">
        <button
          className={`text-sm font-semibold px-3 py-1 rounded ${
            activeCategory === "Walls"
              ? "bg-gray-500 text-white"
              : "text-white border border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("Walls")}
        >
          Walls
        </button>
        <button
          className={`text-sm font-semibold px-3 py-1 rounded ${
            activeCategory === "Doors"
              ? "bg-gray-500 text-white"
              : "text-white border border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("Doors")}
        >
          Doors
        </button>
        <button
          className={`text-sm font-semibold px-3 py-1 rounded ${
            activeCategory === "Defenses"
              ? "bg-gray-500 text-white"
              : "text-white border border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("Defenses")}
        >
          Defenses
        </button>
        <button
          className={`text-sm font-semibold px-3 py-1 rounded ${
            activeCategory === "Furniture"
              ? "bg-gray-500 text-white"
              : "text-white border border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("Furniture")}
        >
          Furniture
        </button>
        <button
          className={`text-sm font-semibold px-3 py-1 rounded ${
            activeCategory === "External Walls"
              ? "bg-gray-500 text-white"
              : "text-white border border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => setActiveCategory("External Walls")}
        >
          External Walls
        </button>
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
      <div className="mt-8 ml-10">
        <h2 className="text-xl font-bold mb-2">Collection</h2>
        {collection.map((c) => (
          <div key={`${c.item.name}`} className="mb-6">
            <div className="flex items-center mb-2">
              <p className="flex-1">
                {c.item.name} x {c.quantity}
              </p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-sm mr-6"
                onClick={() => handleRemoveItem(c.item)}
              >
                Remove
              </button>
            </div>
            {c.item.bestOption && (
              <div className="mt-2 ml-10">
                <h2 className="text-md font-bold mb-2">Best Option (x1) </h2>
                <div className="flex flex-wrap">
                  {Object.entries(c.item.bestOption).map(([option, value]) => (
                    <div
                      key={option}
                      className="flex items-center mr-4 mb-4 relative"
                    >
                      {/* Resource Image with Quantity */}
                      {value > 0 && (
                        <div className="relative">
                          <Image
                            src={`/images/${option}.png`}
                            height={35}
                            width={35}
                            alt={option}
                          />
                          <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                            {value}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 ml-10">
        <h2 className="text-xl font-bold mb-2">Best Options Calculated</h2>
        <div className="flex flex-wrap">
          {/* Render calculated best options */}
          {["rockets", "c4", "bullets", "satchel"]
            .filter(
              (option) =>
                collection.reduce(
                  (total, c) =>
                    total +
                    (c.item.bestOption?.[
                      option as keyof typeof c.item.bestOption
                    ] || 0) *
                      c.quantity,
                  0
                ) > 0
            )
            .map((option) => (
              <div
                key={option}
                className="flex items-center mr-4 mb-4 relative"
              >
                <div className="relative">
                  <Image
                    src={`/images/${option}.png`}
                    height={50}
                    width={50}
                    alt={option}
                  />
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                    {collection.reduce(
                      (total, c) =>
                        total +
                        (c.item.bestOption?.[
                          option as keyof typeof c.item.bestOption
                        ] || 0) *
                          c.quantity,
                      0
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="p-4 py-8 ml-6">
        <h2 className="text-xl font-bold mb-4">Best Option Sulfur Cost</h2>
        <div className="flex">
          {["c4", "rockets", "bullets", "satchel"]
            .filter((option) => {
              const totalCost = collection.reduce((total, c) => {
                const optionValue =
                  c.item.bestOption?.[
                    option as keyof typeof c.item.bestOption
                  ] || 0;
                return total + calculateCost(option, optionValue * c.quantity);
              }, 0);
              return totalCost > 0;
            })
            .map((option) => {
              const totalCost = collection.reduce((total, c) => {
                const optionValue =
                  c.item.bestOption?.[
                    option as keyof typeof c.item.bestOption
                  ] || 0;
                return total + calculateCost(option, optionValue * c.quantity);
              }, 0);
              return (
                <div key={option} className="flex items-center mr-4">
                  <div style={{ position: "relative" }}>
                    <Image
                      src={`/images/${option}.png`}
                      height={50}
                      width={50}
                      alt={option.toUpperCase()}
                    />
                    <div
                      className="overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#DDD71B",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      <p className="opacity-100">{totalCost}</p>
                      <div className="flex flex-col w-20 h-20 absolute top-0 left-0">
                        <Image
                          src="/images/sulfur.png"
                          height={15}
                          width={15}
                          alt="Sulfur"
                          className="brightness-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-8 ml-10 ">
        <h2 className="text-xl font-bold mb-2">
          Required Resources (choose one){" "}
        </h2>
        <div className="flex flex-wrap">
          {resources.map((resource) => (
            <div
              key={resource.name}
              className="flex items-center mr-4 mb-4 relative"
            >
              {/* Resource Image with Quantity */}
              <div className="relative">
                <Image
                  src={resource.image}
                  height={50}
                  width={50}
                  alt={resource.name}
                />
                <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                  {resource.quantity}
                </div>
              </div>
              {/* End Resource Image with Quantity */}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 py-8 ml-6">
        <h2 className="text-xl font-bold mb-4">
          Sulfur Costs Sorted (Lowest to Highest)
        </h2>
        <div className="flex">
          {sortedOptions.map(([method, cost]) => (
            <div key={method} className="flex items-center mr-4">
              {/* Sulfur Image with Dim Overlay */}
              <div style={{ position: "relative" }}>
                <Image
                  src={`/images/${method}.png`}
                  height={50}
                  width={50}
                  alt={method.toUpperCase()}
                />
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#DDD71B",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  <p className="opacity-100">{cost}</p>

                  <div className="flex flex-col w-20 h-20 absolute top-0 left-0">
                    {" "}
                    <Image
                      src="/images/sulfur.png"
                      height={15}
                      width={15}
                      alt="Sulfur"
                      className="brightness-100"
                    />
                  </div>
                </div>
              </div>
              {/* End Sulfur Image with Dim Overlay */}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-10 flex justify-center lg:flex lg:justify-start lg:ml-10 ">
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
