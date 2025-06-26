import type { Item } from "../../types/item.types";

export type TrapItemCategory = "trap";
export type TrapItemShortname =
  | "spikes.floor"
  | "tincan.alarm"
  | "trap.bear"
  | "guntrap"
  | "trap.landmine"
  | "flameturret";

export const trapItems: {
  [K in TrapItemShortname]: Item<K> & { category: TrapItemCategory };
} = {
  "spikes.floor": {
    shortname: "spikes.floor",
    name: "Wooden Floor Spikes",
    category: "trap",
    image: "/images/trap/spikes.floor.png",
    crafting: {
      yield: 1,
      ingredients: [{ shortname: "wood", amount: 150 }],
    },
  },
  "tincan.alarm": {
    shortname: "tincan.alarm",
    name: "Tin Can Alarm",
    category: "trap",
    image: "/images/trap/tincan.alarm.png",
    crafting: {
      yield: 1,
      workbenchLevel: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 30 },
        { shortname: "rope", amount: 1 },
        { shortname: "wood", amount: 100 },
      ],
    },
  },
  "trap.bear": {
    shortname: "trap.bear",
    name: "Snap Trap",
    keywords: ["bear"],
    category: "trap",
    image: "/images/trap/trap.bear.png",
    crafting: {
      yield: 1,
      workbenchLevel: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 50 },
        { shortname: "gears", amount: 1 },
      ],
    },
  },
  guntrap: {
    shortname: "guntrap",
    name: "Shotgun Trap",
    category: "trap",
    image: "/images/trap/guntrap.png",
    crafting: {
      yield: 1,
      workbenchLevel: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 250 },
        { shortname: "gears", amount: 2 },
        { shortname: "wood", amount: 500 },
        { shortname: "rope", amount: 2 },
      ],
    },
  },
  "trap.landmine": {
    shortname: "trap.landmine",
    name: "Homemade Landmine",
    category: "trap",
    image: "/images/trap/trap.landmine.png",
    crafting: {
      yield: 1,
      workbenchLevel: 2,
      ingredients: [
        { shortname: "metal.fragments", amount: 50 },
        { shortname: "gunpowder", amount: 30 },
      ],
    },
  },
  flameturret: {
    shortname: "flameturret",
    name: "Flame Turret",
    category: "trap",
    image: "/images/trap/flameturret.png",
    crafting: {
      yield: 1,
      workbenchLevel: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 200 },
        { shortname: "gears", amount: 1 },
        { shortname: "propanetank", amount: 1 },
      ],
    },
  },
};
