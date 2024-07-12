"use client";
import React, { useEffect, useRef, useState } from "react";
import { items } from "./items";
import CategoryButtons from "./components/CategoryButtons";
import ItemGrid from "./components/ItemGrid";

import ResetButton from "./components/ResetButton";
import { Item, CollectionItem, SortedSulfurCost } from "./types";
import CollectionDrawer from "./components/CollectionDrawer";

const DestructionUI = () => {
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [selectedMethod, setSelectedMethod] =
    useState<keyof Item["destructionOptions"]>("c4");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      {" "}
      {/* Reduced bottom margin */}
      <CategoryButtons
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {!activeCategory && (
        <div className="text-center my-8">
          <p className="text-red-600 text-lg">Choose a category to begin!</p>
        </div>
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
        calculateCost={calculateCost}
        resources={resources}
        sortedOptions={sortedOptions}
        handleResetAll={handleResetAll}
      />
    </div>
  );
};

export default DestructionUI;
