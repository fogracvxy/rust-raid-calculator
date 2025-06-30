import type { Item } from "../../types/item.types";

export type TrapItemCategory = "trap";
export type TrapItemShortname =
  | "flameturret"
  | "guntrap"
  | "samsite"
  | "spikes.floor"
  | "tincan.alarm"
  | "trap.bear"
  | "trap.landmine";

export const trapItems: {
  [K in TrapItemShortname]: Item<K> & { category: TrapItemCategory };
} = {
  flameturret: {
    shortname: "flameturret",
    name: "Flame Turret",
    category: "trap",
    image: "/images/trap/flameturret.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "propanetank",
          amount: 2,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  guntrap: {
    shortname: "guntrap",
    name: "Shotgun Trap",
    category: "trap",
    image: "/images/trap/guntrap.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 500,
        },
        {
          shortname: "metal.fragments",
          amount: 250,
        },
        {
          shortname: "gears",
          amount: 2,
        },
        {
          shortname: "rope",
          amount: 2,
        },
      ],
    },
  },
  samsite: {
    name: "SAM Site",
    shortname: "samsite",
    category: "trap",
    image: "/images/trap/samsite.png",
  },
  "spikes.floor": {
    shortname: "spikes.floor",
    name: "Wooden Floor Spikes",
    category: "trap",
    image: "/images/trap/spikes.floor.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
      ],
    },
  },
  "tincan.alarm": {
    shortname: "tincan.alarm",
    name: "Tin Can Alarm",
    category: "trap",
    image: "/images/trap/tincan.alarm.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "rope",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 30,
        },
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
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  "trap.landmine": {
    shortname: "trap.landmine",
    name: "Homemade Landmine",
    category: "trap",
    image: "/images/trap/trap.landmine.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
      ],
    },
  },
};
