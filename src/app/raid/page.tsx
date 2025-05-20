"use client";
import React, { useEffect, useRef, useState } from "react";
import { items } from "./items";
import CategoryButtons from "./components/CategoryButtons";
import ItemGrid from "./components/ItemGrid";
import ResetButton from "./components/ResetButton";
import { Item, CollectionItem, SortedSulfurCost } from "./types";
import CollectionDrawer from "./components/CollectionDrawer";
import { motion } from "framer-motion";

const DestructionUI = () => {
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [selectedMethod, setSelectedMethod] =
    useState<keyof Item["destructionOptions"]>("c4");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && typeof window !== "undefined") {
      const storedCollection = localStorage.getItem("collection");
      const storedMethod = localStorage.getItem("selectedMethod") as
        | keyof Item["destructionOptions"]
        | null;
      const storedCategory = localStorage.getItem("activeCategory");

      if (storedCollection) {
        setCollection(JSON.parse(storedCollection));
      }

      if (storedMethod) {
        setSelectedMethod(storedMethod);
      }

      if (storedCategory) {
        setActiveCategory(storedCategory);
      }

      initialized.current = true;
      // Add a small delay to simulate loading and avoid UI flashing
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem("collection", JSON.stringify(collection));
    }
  }, [collection]);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem("selectedMethod", selectedMethod);
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (initialized.current) {
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
  ];

  const getSulfurCost = (method: keyof Item["destructionOptions"]) => {
    switch (method) {
      case "c4":
        return 2200;
      case "rockets":
        return 1400;
      case "satchel":
        return 480;
      case "bullets":
        return 25;
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

  const calculateCost = (option: string, quantity: number): number => {
    const sulfurCost = getSulfurCost(
      option as keyof Item["destructionOptions"]
    );
    return sulfurCost * quantity;
  };

  const sortedOptions: SortedSulfurCost[] = Object.entries(sulfurCosts)
    .map(([item, cost]) => ({ item, quantity: cost }))
    .sort((a, b) => a.quantity - b.quantity);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading Raid Calculator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 mb-16">
        <header className="mb-10 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-2 text-red-600 tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Rust Raid Calculator
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select items to calculate the most efficient raiding strategy
          </motion.p>
        </header>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CategoryButtons
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </motion.div>
        
        {!activeCategory && (
          <motion.div 
            className="text-center my-12 py-16 border border-gray-800 rounded-lg bg-gray-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto text-red-600 mb-4 opacity-70" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-red-600 text-lg font-medium mb-2">Choose a category to begin!</p>
            <p className="text-gray-500 max-w-md mx-auto">Select a structure category above to view available items for your raid calculations</p>
          </motion.div>
        )}
        
        <ItemGrid
          category={activeCategory}
          items={items}
          collection={collection}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        />
        
        <CollectionDrawer
          collection={collection}
          handleRemoveItem={handleRemoveItem}
          handleAddItem={handleAddItem}
          calculateCost={calculateCost}
          resources={resources}
          sortedOptions={sortedOptions}
          handleResetAll={handleResetAll}
        />
      </div>
    </div>
  );
};

export default DestructionUI;
