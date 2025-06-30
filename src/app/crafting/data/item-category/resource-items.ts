import type { Item } from "../../types/item.types";

export type ResourceItemCategory = "resource";
export type ResourceItemShortname =
  | "battery.small"
  | "bone.fragments"
  | "can.beans.empty"
  | "can.tuna.empty"
  | "cctv.camera"
  | "charcoal"
  | "cloth"
  | "coal"
  | "crude.oil"
  | "diesel_barrel"
  | "explosives"
  | "fat.animal"
  | "fertilizer"
  | "gunpowder"
  | "horsedung"
  | "hq.metal.ore"
  | "leather"
  | "lowgradefuel"
  | "metal.fragments"
  | "metal.ore"
  | "metal.refined"
  | "nucleus"
  | "paper"
  | "plantfiber"
  | "researchpaper"
  | "scrap"
  | "skull.human"
  | "skull.wolf"
  | "stones"
  | "sulfur"
  | "sulfur.ore"
  | "targeting.computer"
  | "water"
  | "water.radioactive"
  | "water.salt"
  | "wood";

export const resourceItems: {
  [K in ResourceItemShortname]: Item<K> & { category: ResourceItemCategory };
} = {
  "battery.small": {
    name: "Battery - Small",
    shortname: "battery.small",
    category: "resource",
    image: "/images/resources/battery.small.png",
  },
  "bone.fragments": {
    shortname: "bone.fragments",
    name: "Bone Fragments",
    category: "resource",
    image: "/images/resources/bone.fragments.png",
  },
  "can.beans.empty": {
    name: "Empty Can Of Beans",
    shortname: "can.beans.empty",
    category: "resource",
    image: "/images/resources/can.beans.empty.png",
  },
  "can.tuna.empty": {
    name: "Empty Tuna Can",
    shortname: "can.tuna.empty",
    category: "resource",
    image: "/images/resources/can.tuna.empty.png",
  },
  "cctv.camera": {
    shortname: "cctv.camera",
    name: "CCTV Camera",
    category: "resource",
    image: "/images/resources/cctv.camera.png",
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
  coal: {
    name: "Coal :(",
    shortname: "coal",
    category: "resource",
    image: "/images/resources/coal.png",
  },
  "crude.oil": {
    name: "Crude Oil",
    shortname: "crude.oil",
    category: "resource",
    image: "/images/resources/crude.oil.png",
  },
  diesel_barrel: {
    name: "Diesel Fuel",
    shortname: "diesel_barrel",
    category: "resource",
    image: "/images/resources/diesel_barrel.png",
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
        {
          shortname: "gunpowder",
          amount: 50,
        },
        {
          shortname: "lowgradefuel",
          amount: 3,
        },
        {
          shortname: "sulfur",
          amount: 10,
        },
        {
          shortname: "metal.fragments",
          amount: 10,
        },
      ],
    },
  },
  "fat.animal": {
    shortname: "fat.animal",
    name: "Animal Fat",
    category: "resource",
    image: "/images/resources/fat.animal.png",
  },
  fertilizer: {
    name: "Fertilizer",
    shortname: "fertilizer",
    category: "resource",
    image: "/images/resources/fertilizer.png",
  },
  gunpowder: {
    shortname: "gunpowder",
    name: "Gun Powder",
    category: "resource",
    image: "/images/resources/gunpowder.png",
    crafting: {
      workbenchLevel: 1,
      yield: 10,
      ingredients: [
        {
          shortname: "charcoal",
          amount: 30,
        },
        {
          shortname: "sulfur",
          amount: 20,
        },
      ],
    },
  },
  horsedung: {
    name: "Horse Dung",
    shortname: "horsedung",
    category: "resource",
    image: "/images/resources/horsedung.png",
  },
  "hq.metal.ore": {
    name: "High Quality Metal Ore",
    shortname: "hq.metal.ore",
    category: "resource",
    image: "/images/resources/hq.metal.ore.png",
  },
  leather: {
    name: "Leather",
    shortname: "leather",
    category: "resource",
    image: "/images/resources/leather.png",
  },
  lowgradefuel: {
    shortname: "lowgradefuel",
    name: "Low Grade Fuel",
    category: "resource",
    image: "/images/resources/lowgradefuel.png",
    crafting: {
      yield: 4,
      ingredients: [
        {
          shortname: "fat.animal",
          amount: 3,
        },
        {
          shortname: "cloth",
          amount: 1,
        },
      ],
    },
  },
  "metal.fragments": {
    shortname: "metal.fragments",
    name: "Metal Fragments",
    category: "resource",
    image: "/images/resources/metal.fragments.png",
  },
  "metal.ore": {
    name: "Metal Ore",
    shortname: "metal.ore",
    category: "resource",
    image: "/images/resources/metal.ore.png",
  },
  "metal.refined": {
    shortname: "metal.refined",
    name: "High Quality Metal",
    category: "resource",
    image: "/images/resources/metal.refined.png",
  },
  nucleus: {
    shortname: "nucleus",
    name: "Beehive Nucleus",
    category: "resource",
    image: "/images/resources/nucleus.png",
  },
  paper: {
    name: "Paper",
    shortname: "paper",
    category: "resource",
    image: "/images/resources/paper.png",
  },
  plantfiber: {
    name: "Plant Fiber",
    shortname: "plantfiber",
    category: "resource",
    image: "/images/resources/plantfiber.png",
  },
  researchpaper: {
    name: "Research Paper",
    shortname: "researchpaper",
    category: "resource",
    image: "/images/resources/researchpaper.png",
  },
  scrap: {
    shortname: "scrap",
    name: "Scrap",
    category: "resource",
    image: "/images/resources/scrap.png",
  },
  "skull.human": {
    name: "Human Skull",
    shortname: "skull.human",
    category: "resource",
    image: "/images/resources/skull.human.png",
  },
  "skull.wolf": {
    name: "Wolf Skull",
    shortname: "skull.wolf",
    category: "resource",
    image: "/images/resources/skull.wolf.png",
  },
  stones: {
    shortname: "stones",
    name: "Stones",
    category: "resource",
    image: "/images/resources/stones.png",
  },
  sulfur: {
    shortname: "sulfur",
    name: "Sulfur",
    category: "resource",
    image: "/images/resources/sulfur.png",
  },
  "sulfur.ore": {
    name: "Sulfur Ore",
    shortname: "sulfur.ore",
    category: "resource",
    image: "/images/resources/sulfur.ore.png",
  },
  "targeting.computer": {
    name: "Targeting Computer",
    shortname: "targeting.computer",
    category: "resource",
    image: "/images/resources/targeting.computer.png",
  },
  water: {
    name: "Water",
    shortname: "water",
    category: "resource",
    image: "/images/resources/water.png",
  },
  "water.radioactive": {
    name: "Radioactive Water",
    shortname: "water.radioactive",
    category: "resource",
    image: "/images/resources/water.radioactive.png",
  },
  "water.salt": {
    name: "Salt Water",
    shortname: "water.salt",
    category: "resource",
    image: "/images/resources/water.salt.png",
  },
  wood: {
    shortname: "wood",
    name: "Wood",
    category: "resource",
    image: "/images/resources/wood.png",
  },
};
