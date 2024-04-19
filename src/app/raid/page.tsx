"use client";
import React, { useEffect, useState } from "react";

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

const items: Item[] = [
  {
    name: "Armored Wall",
    image: "/images/wall4.png",
    destructionOptions: {
      c4: 4,
      bullets: 799,
      rockets: 15,
      satchel: 46,
    },
    category: "Walls",
  },
  {
    name: "Metal Wall",
    image: "/images/wall3.png",
    destructionOptions: {
      c4: 4,
      bullets: 400,
      rockets: 8,
      satchel: 23,
    },
    category: "Walls",
  },
  {
    name: "Stone Wall",
    image: "/images/wall2.png",
    destructionOptions: {
      c4: 2,
      bullets: 185,
      rockets: 4,
      satchel: 10,
    },
    category: "Walls",
  },
  {
    name: "Wooden Wall",
    image: "/images/wall1.png",
    destructionOptions: {
      c4: 1,
      bullets: 49,
      rockets: 2,
      satchel: 3,
    },
    category: "Walls",
  },
  {
    name: "Sheet Metal Door",
    image: "/images/door.hinged.metal.png",
    destructionOptions: {
      c4: 1,
      bullets: 63,
      rockets: 2,
      satchel: 4,
    },
    category: "Doors",
  },
  {
    name: "Armored Door",
    image: "/images/door.hinged.toptier.png",
    destructionOptions: {
      c4: 3,
      bullets: 250,
      rockets: 5,
      satchel: 15,
    },
    category: "Doors",
  },
  {
    name: "Wooden Door",
    image: "/images/door.hinged.wood.png",
    destructionOptions: {
      c4: 1,
      bullets: 19,
      rockets: 1,
      satchel: 2,
    },
    category: "Doors",
  },
  {
    name: "Garage Door",
    image: "/images/wall.frame.garagedoor.png",
    destructionOptions: {
      c4: 2,
      bullets: 150,
      rockets: 3,
      satchel: 9,
    },
    category: "Doors",
  },
  {
    name: "Ladder Hatch",
    image: "/images/floor.ladder.hatch.png",
    destructionOptions: {
      c4: 1,
      bullets: 63,
      rockets: 2,
      satchel: 4,
    },
    category: "Doors",
  },
  {
    name: "Metal Shop Front",
    image: "/images/wall.frame.shopfront.metal.png",
    destructionOptions: {
      c4: 3,
      bullets: 300,
      rockets: 6,
      satchel: 18,
    },
    category: "Doors",
  },
  {
    name: "External Wooden Wall",
    image: "/images/wall.external.high.png",
    destructionOptions: {
      c4: 2,
      bullets: 98,
      rockets: 3,
      satchel: 6,
    },
    category: "External Walls",
  },
  {
    name: "External Stone Wall",
    image: "/images/wall.external.high.stone.png",
    destructionOptions: {
      c4: 2,
      bullets: 185,
      rockets: 4,
      satchel: 10,
    },
    category: "External Walls",
  },
  {
    name: "Auto Turret",
    image: "/images/autoturret.png",
    destructionOptions: {
      c4: 1,
      bullets: 112,
      rockets: 4,
      satchel: 2,
    },
    category: "Defenses",
  },
  {
    name: "Shotgun Trap",
    image: "/images/guntrap.png",
    destructionOptions: {
      c4: 1,
      bullets: 34,
      rockets: 2,
      satchel: 1,
    },
    category: "Defenses",
  },
  {
    name: "Flame Turret",
    image: "/images/flameturret.png",
    destructionOptions: {
      c4: 1,
      bullets: 34,
      rockets: 2,
      satchel: 1,
    },
    category: "Defenses",
  },
  {
    name: "SAM Site",
    image: "/images/samsite.png",
    destructionOptions: {
      c4: 1,
      bullets: 200,
      rockets: 4,
      satchel: 2,
    },
    category: "Defenses",
  },
  {
    name: "Workbench lvl 1",
    image: "/images/workbench1.png",
    destructionOptions: {
      c4: 1,
      bullets: 56,
      rockets: 2,
      satchel: 1,
    },
    category: "Furniture",
  },
  {
    name: "Workbench lvl 2",
    image: "/images/workbench2.png",
    destructionOptions: {
      c4: 1,
      bullets: 173,
      rockets: 4,
      satchel: 7,
    },
    category: "Furniture",
  },
  {
    name: "Workbench lvl 3",
    image: "/images/workbench3.png",
    destructionOptions: {
      c4: 2,
      bullets: 259,
      rockets: 6,
      satchel: 10,
    },
    category: "Furniture",
  },
  {
    name: "Vending Machine",
    image: "/images/vending.machine.png",
    destructionOptions: {
      c4: 3,
      bullets: 499,
      rockets: 10,
      satchel: 15,
    },
    category: "Furniture",
  },

  // Add more items here...
];

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
        <p>C4: {calculateResources().c4}</p>
        <p>Bullets: {calculateResources().bullets}</p>
        <p>Rockets: {calculateResources().rockets}</p>
        <p>Satchel: {calculateResources().satchel}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Total Sulfur Cost</h2>
        <p>
          Total Sulfur Cost ({selectedMethod}):{" "}
          {calculateTotalSulfur(selectedMethod)}
        </p>
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
