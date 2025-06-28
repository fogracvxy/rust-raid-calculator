import type { Item } from "../../types/item.types";

export type ResourceItemCategory = "resource";
export type ResourceItemShortname =
  | "sulfur"
  | "fat.animal"
  | "charcoal"
  | "cloth"
  | "metal.fragments"
  | "metal.refined"
  | "lowgradefuel"
  | "explosives"
  | "gunpowder"
  | "wood"
  | "stones"
  | "scrap"
  | "cctv.camera";

export const resourceItems: {
  [K in ResourceItemShortname]: Item<K> & { category: ResourceItemCategory };
} = {
  sulfur: {
    shortname: "sulfur",
    name: "Sulfur",
    category: "resource",
    image: "/images/resources/sulfur.png",
  },
  "fat.animal": {
    shortname: "fat.animal",
    name: "Animal Fat",
    category: "resource",
    image: "/images/resources/fat.animal.png",
  },
  charcoal: {
    shortname: "charcoal",
    name: "Charcoal",
    category: "resource",
    image: "/images/resources/charcoal.png",
  },
  cloth: {
    shortname: "cloth",
    name: "Cloth",
    category: "resource",
    image: "/images/resources/cloth.png",
  },
  "metal.fragments": {
    shortname: "metal.fragments",
    name: "Metal Fragments",
    category: "resource",
    image: "/images/resources/metal.fragments.png",
  },
  "metal.refined": {
    shortname: "metal.refined",
    name: "High Quality Metal",
    category: "resource",
    image: "/images/resources/metal.refined.png",
  },
  lowgradefuel: {
    shortname: "lowgradefuel",
    name: "Low Grade Fuel",
    category: "resource",
    image: "/images/resources/lowgradefuel.png",
    crafting: {
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
    category: "resource",
    image: "/images/resources/explosives.png",
    crafting: {
      workbenchLevel: 3,
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
    category: "resource",
    image: "/images/resources/gunpowder.png",
    crafting: {
      workbenchLevel: 1,
      yield: 10,
      ingredients: [
        { shortname: "charcoal", amount: 30 },
        { shortname: "sulfur", amount: 20 },
      ],
    },
  },
  wood: {
    shortname: "wood",
    name: "Wood",
    category: "resource",
    image: "/images/resources/wood.png",
  },
  stones: {
    shortname: "stones",
    name: "Stones",
    category: "resource",
    image: "/images/resources/stones.png",
  },
  scrap: {
    shortname: "scrap",
    name: "Scrap",
    category: "resource",
    image: "/images/resources/scrap.png",
  },
  "cctv.camera": {
    shortname: "cctv.camera",
    name: "CCTV Camera",
    category: "resource",
    image: "/images/resources/cctv.camera.png",
  },
};
