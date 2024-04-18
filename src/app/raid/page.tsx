"use client";
import React, { useState } from "react";

interface Item {
  name: string;
  image: string;
  destructionOptions: {
    c4: number;
    bullets: number;
    rockets: number;
    satchel: number;
  };
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
  },

  // Add more items here...
];

const DestructionUI = () => {
  const [collection, setCollection] = useState<
    { item: Item; quantity: number }[]
  >([]);
  const [selectedMethod, setSelectedMethod] =
    useState<keyof Item["destructionOptions"]>("c4");

  const handleAddItem = (item: Item) => {
    const existingItem = collection.find((c) => c.item === item);
    if (existingItem) {
      setCollection(
        collection.map((c) =>
          c.item === item ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCollection([...collection, { item, quantity: 1 }]);
    }
  };
  const handleRemoveItem = (item: Item) => {
    const existingItem = collection.find((c) => c.item === item);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        // If only one item, remove it from collection
        setCollection(collection.filter((c) => c.item !== item));
      } else {
        // Decrease quantity if more than one
        setCollection(
          collection.map((c) =>
            c.item === item ? { ...c, quantity: c.quantity - 1 } : c
          )
        );
      }
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
    <div className="p-4">
      <div>
        <label htmlFor="methodSelect">Select Raid Method:</label>
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
      <div className="grid grid-cols-4 font-mono sm:grid-cols-6 lg:grid-cols-10 gap-4">
        {items.map((item) => (
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
              <span className="font-semibold">
                {collection.find((c) => c.item === item)?.quantity || 0}
              </span>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-sm ml-2"
                onClick={() => handleAddItem(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default DestructionUI;
