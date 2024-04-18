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

  return (
    <div>
      <h1>Destruction UI</h1>
      <h2>Add Item</h2>
      <div className="flex flex-row">
        {items.map((item) => (
          <div key={item.name}>
            <img src={item.image} alt={item.name} />
            <button onClick={() => handleAddItem(item)}>Add {item.name}</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Collection</h2>
        {collection.map((c) => (
          <div key={`${c.item.name}-${c.quantity}`}>
            <p>
              {c.item.name} x {c.quantity}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2>Required Resources</h2>
        <p>C4: {calculateResources().c4}</p>
        <p>Bullets: {calculateResources().bullets}</p>
        <p>Rockets: {calculateResources().rockets}</p>
        <p>Satchel: {calculateResources().satchel}</p>
      </div>
    </div>
  );
};

export default DestructionUI;
