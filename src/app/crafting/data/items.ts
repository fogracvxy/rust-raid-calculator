import type { ItemShortname, Item } from "../types/item";

export const items: {
  [K in ItemShortname]: Item<K>;
} = {
  sulfur: {
    shortname: "sulfur",
    name: "Sulfur",
    image: "/images/sulfur.png",
  },
  "fat.animal": {
    shortname: "fat.animal",
    name: "Animal Fat",
    image: "/images/fat.animal.png",
  },
  charcoal: {
    shortname: "charcoal",
    name: "Charcoal",
    image: "/images/charcoal.png",
  },
  cloth: {
    shortname: "cloth",
    name: "Cloth",
    image: "/images/resources/cloth.png",
  },
  "metal.fragments": {
    shortname: "metal.fragments",
    name: "Metal Fragments",
    image: "/images/resources/metal.fragments.png",
  },
  "metal.refined": {
    shortname: "metal.refined",
    name: "High Quality Metal",
    image: "/images/resources/metal.refined.png",
  },
  techparts: {
    shortname: "techparts",
    name: "Tech Parts",
    image: "/images/components/techparts.png",
  },

  lowgradefuel: {
    shortname: "lowgradefuel",
    name: "Low Grade Fuel",
    image: "/images/resources/lowgradefuel.png",
    crafting: {
      time: 5,
      yield: 4,
      ingredients: [
        { shortname: "fat.animal", amount: 3 },
        { shortname: "cloth", amount: 1 },
      ],
    },
  },
  explosives: {
    shortname: "explosives",
    name: "Explosives",
    image: "/images/resources/explosives.png",
    crafting: {
      workbenchLevel: 3,
      time: 5,
      yield: 1,
      ingredients: [
        { shortname: "sulfur", amount: 10 },
        { shortname: "lowgradefuel", amount: 3 },
        { shortname: "gunpowder", amount: 50 },
        { shortname: "metal.fragments", amount: 10 },
      ],
    },
  },
  gunpowder: {
    shortname: "gunpowder",
    name: "Gunpowder",
    image: "/images/gunpowder.png",
    crafting: {
      workbenchLevel: 1,
      time: 2,
      yield: 10,
      ingredients: [
        { shortname: "charcoal", amount: 30 },
        { shortname: "sulfur", amount: 20 },
      ],
    },
  },

  "ammo.rifle.explosive": {
    shortname: "ammo.rifle.explosive",
    name: "Explosive 5.56 Rifle Ammo",
    image: "/images/bullet.png",
    crafting: {
      workbenchLevel: 3,
      time: 3,
      yield: 2,
      ingredients: [
        { shortname: "sulfur", amount: 10 },
        { shortname: "gunpowder", amount: 20 },
        { shortname: "metal.fragments", amount: 10 },
      ],
    },
  },
  "explosive.timed": {
    shortname: "explosive.timed",
    name: "Timed Explosive Charge (C4)",
    image: "/images/c4.png",
    crafting: {
      workbenchLevel: 3,
      time: 30,
      yield: 1,
      ingredients: [
        { shortname: "cloth", amount: 5 },
        { shortname: "explosives", amount: 20 },
        { shortname: "techparts", amount: 2 },
      ],
    },
  },
};
