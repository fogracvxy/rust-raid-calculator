import type { Item } from "../../types/item.types";

export type ToolItemCategory = "tool";
export type ToolItemShortname =
  | "axe.salvaged"
  | "bucket.water"
  | "cakefiveyear"
  | "chainsaw"
  | "explosive.satchel"
  | "explosive.timed"
  | "fishing.tackle"
  | "fishingrod.handmade"
  | "flare"
  | "flashlight.held"
  | "geiger.counter"
  | "grenade.smoke"
  | "hammer"
  | "hammer.salvaged"
  | "handcuffs"
  | "hatchet"
  | "icepick.salvaged"
  | "jackhammer"
  | "metal.detector"
  | "pickaxe"
  | "rf.detonator"
  | "rock"
  | "shovel"
  | "spraycan"
  | "stone.pickaxe"
  | "stonehatchet"
  | "supply.signal"
  | "surveycharge"
  | "tool.binoculars"
  | "tool.camera"
  | "tool.instant_camera"
  | "toolgun"
  | "torch"
  | "wallpaper.tool";

export const toolItems: {
  [K in ToolItemShortname]: Item<K> & { category: ToolItemCategory };
} = {
  "axe.salvaged": {
    name: "Salvaged Axe",
    shortname: "axe.salvaged",
    category: "tool",
    image: "/images/tools/axe.salvaged.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "metalblade",
          amount: 5,
        },
      ],
    },
  },
  "bucket.water": {
    name: "Water Bucket",
    shortname: "bucket.water",
    category: "tool",
    image: "/images/tools/bucket.water.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 20,
        },
      ],
    },
  },
  cakefiveyear: {
    name: "Birthday Cake",
    shortname: "cakefiveyear",
    category: "tool",
    image: "/images/tools/cakefiveyear.png",
  },
  chainsaw: {
    name: "Chainsaw",
    shortname: "chainsaw",
    category: "tool",
    image: "/images/tools/chainsaw.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "gears",
          amount: 2,
        },
        {
          shortname: "metalblade",
          amount: 6,
        },
      ],
    },
  },
  "explosive.satchel": {
    shortname: "explosive.satchel",
    name: "Satchel Charge",
    category: "tool",
    image: "/images/tools/satchel.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "grenade.beancan",
          amount: 4,
        },
        {
          shortname: "stash.small",
          amount: 1,
        },
        {
          shortname: "rope",
          amount: 1,
        },
      ],
    },
  },
  "explosive.timed": {
    shortname: "explosive.timed",
    name: "Timed Explosive Charge",
    category: "tool",
    keywords: ["C4"],
    image: "/images/tools/c4.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "explosives",
          amount: 20,
        },
        {
          shortname: "cloth",
          amount: 5,
        },
        {
          shortname: "techparts",
          amount: 2,
        },
      ],
    },
  },
  "fishing.tackle": {
    name: "Fishing Tackle",
    shortname: "fishing.tackle",
    category: "tool",
    image: "/images/tools/fishing.tackle.png",
  },
  "fishingrod.handmade": {
    name: "Handmade Fishing Rod",
    shortname: "fishingrod.handmade",
    category: "tool",
    image: "/images/tools/fishingrod.handmade.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "rope",
          amount: 2,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  flare: {
    name: "Flare",
    shortname: "flare",
    category: "tool",
    image: "/images/tools/flare.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "gunpowder",
          amount: 10,
        },
        {
          shortname: "metal.fragments",
          amount: 10,
        },
      ],
    },
  },
  "flashlight.held": {
    name: "Flashlight",
    shortname: "flashlight.held",
    category: "tool",
    image: "/images/tools/flashlight.held.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 30,
        },
      ],
    },
  },
  "geiger.counter": {
    name: "Geiger Counter",
    shortname: "geiger.counter",
    category: "tool",
    image: "/images/tools/geiger.counter.png",
  },
  "grenade.smoke": {
    name: "Smoke Grenade",
    shortname: "grenade.smoke",
    category: "tool",
    image: "/images/tools/grenade.smoke.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "gunpowder",
          amount: 35,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  hammer: {
    name: "Hammer",
    shortname: "hammer",
    category: "tool",
    image: "/images/tools/hammer.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  "hammer.salvaged": {
    name: "Salvaged Hammer",
    shortname: "hammer.salvaged",
    category: "tool",
    image: "/images/tools/hammer.salvaged.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  handcuffs: {
    name: "Handcuffs",
    shortname: "handcuffs",
    category: "tool",
    image: "/images/tools/handcuffs.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 70,
        },
      ],
    },
  },
  hatchet: {
    name: "Hatchet",
    shortname: "hatchet",
    category: "tool",
    image: "/images/tools/hatchet.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "icepick.salvaged": {
    name: "Salvaged Icepick",
    shortname: "icepick.salvaged",
    category: "tool",
    image: "/images/tools/icepick.salvaged.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metalpipe",
          amount: 1,
        },
        {
          shortname: "metalblade",
          amount: 5,
        },
      ],
    },
  },
  jackhammer: {
    name: "Jackhammer",
    shortname: "jackhammer",
    category: "tool",
    image: "/images/tools/jackhammer.png",
  },
  "metal.detector": {
    name: "Metal Detector",
    shortname: "metal.detector",
    category: "tool",
    image: "/images/tools/metal.detector.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "rope",
          amount: 2,
        },
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "metal.refined",
          amount: 5,
        },
      ],
    },
  },
  pickaxe: {
    name: "Pickaxe",
    shortname: "pickaxe",
    category: "tool",
    image: "/images/tools/pickaxe.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 125,
        },
      ],
    },
  },
  "rf.detonator": {
    name: "RF Transmitter",
    shortname: "rf.detonator",
    category: "tool",
    image: "/images/tools/rf.detonator.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  rock: {
    name: "Rock",
    shortname: "rock",
    category: "tool",
    image: "/images/tools/rock.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 10,
        },
      ],
    },
  },
  shovel: {
    name: "Shovel",
    shortname: "shovel",
    category: "tool",
    image: "/images/tools/shovel.png",
  },
  spraycan: {
    name: "Spray Can",
    shortname: "spraycan",
    category: "tool",
    image: "/images/tools/spraycan.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  "stone.pickaxe": {
    name: "Stone Pickaxe",
    shortname: "stone.pickaxe",
    category: "tool",
    image: "/images/tools/stone.pickaxe.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "stones",
          amount: 100,
        },
      ],
    },
  },
  stonehatchet: {
    name: "Stone Hatchet",
    shortname: "stonehatchet",
    category: "tool",
    image: "/images/tools/stonehatchet.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "stones",
          amount: 100,
        },
      ],
    },
  },
  "supply.signal": {
    name: "Supply Signal",
    shortname: "supply.signal",
    category: "tool",
    image: "/images/tools/supply.signal.png",
  },
  surveycharge: {
    name: "Survey Charge",
    shortname: "surveycharge",
    category: "tool",
    image: "/images/tools/surveycharge.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "gunpowder",
          amount: 30,
        },
        {
          shortname: "cloth",
          amount: 5,
        },
        {
          shortname: "metal.fragments",
          amount: 10,
        },
        {
          shortname: "lowgradefuel",
          amount: 20,
        },
      ],
    },
  },
  "tool.binoculars": {
    name: "Binoculars",
    shortname: "tool.binoculars",
    category: "tool",
    image: "/images/tools/tool.binoculars.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 40,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  "tool.camera": {
    name: "Camera",
    shortname: "tool.camera",
    category: "tool",
    image: "/images/tools/tool.camera.png",
  },
  "tool.instant_camera": {
    name: "Instant Camera",
    shortname: "tool.instant_camera",
    category: "tool",
    image: "/images/tools/tool.instant_camera.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "gears",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  toolgun: {
    name: "Garry's Mod Tool Gun",
    shortname: "toolgun",
    category: "tool",
    image: "/images/tools/toolgun.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 20,
        },
      ],
    },
  },
  torch: {
    name: "Torch",
    shortname: "torch",
    category: "tool",
    image: "/images/tools/torch.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 30,
        },
        {
          shortname: "cloth",
          amount: 1,
        },
        {
          shortname: "lowgradefuel",
          amount: 1,
        },
      ],
    },
  },
  "wallpaper.tool": {
    name: "Wallpaper Tool",
    shortname: "wallpaper.tool",
    category: "tool",
    image: "/images/tools/wallpaper.tool.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
};
