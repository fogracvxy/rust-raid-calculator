import type { Item } from "../../types/item.types";

export type ItemItemCategory = "item";
export type ItemItemShortname =
  | "arcade.machine.chippy"
  | "bamboo.barrel"
  | "bathtub.planter"
  | "bbq"
  | "bed"
  | "botabag"
  | "box.repair.bench"
  | "box.wooden"
  | "box.wooden.large"
  | "campfire"
  | "carvable.pumpkin"
  | "chair"
  | "chickencoop"
  | "chineselantern"
  | "chineselanternwhite"
  | "clantable"
  | "clothing.mod.armorinsert_asbestos"
  | "clothing.mod.armorinsert_lead"
  | "clothing.mod.armorinsert_metal"
  | "clothing.mod.armorinsert_wood"
  | "composter"
  | "cookingworkbench"
  | "discord.trophy"
  | "dragondoorknocker"
  | "drone"
  | "dropbox"
  | "easterdoorwreath"
  | "fireplace.stone"
  | "fishtrap.small"
  | "fishtrophy"
  | "frankensteintable"
  | "furnace"
  | "furnace.large"
  | "gunrack.horizontal"
  | "gunrack.single.1.horizontal"
  | "gunrack.single.2.horizontal"
  | "gunrack.single.3.horizontal"
  | "gunrack_stand"
  | "gunrack_tall.horizontal"
  | "gunrack_wide.horizontal"
  | "half.bamboo.shelves"
  | "hazmat.plushy"
  | "hazmatyoutooz"
  | "heavyscientistyoutooz"
  | "hitchtroughcombo"
  | "hobobarrel"
  | "huntingtrophylarge"
  | "huntingtrophysmall"
  | "iotable"
  | "jackolantern.angry"
  | "jackolantern.happy"
  | "kayak"
  | "lantern"
  | "locker"
  | "mailbox"
  | "map"
  | "minecart.planter"
  | "mixingtable"
  | "photoframe.landscape"
  | "photoframe.large"
  | "photoframe.portrait"
  | "planter.large"
  | "planter.small"
  | "planter.triangle"
  | "plantpot.single"
  | "pookie.bear"
  | "research.table"
  | "rockingchair"
  | "rug"
  | "rug.bear"
  | "scarecrow"
  | "secretlabchair"
  | "shelves"
  | "sign.hanging"
  | "sign.hanging.banner.large"
  | "sign.hanging.ornate"
  | "sign.pictureframe.landscape"
  | "sign.pictureframe.portrait"
  | "sign.pictureframe.tall"
  | "sign.pictureframe.xl"
  | "sign.pictureframe.xxl"
  | "sign.pole.banner.large"
  | "sign.post.double"
  | "sign.post.single"
  | "sign.post.town"
  | "sign.post.town.roof"
  | "sign.wooden.huge"
  | "sign.wooden.large"
  | "sign.wooden.medium"
  | "sign.wooden.small"
  | "single.shallow.wall.shelves"
  | "skidoo"
  | "skull_fire_pit"
  | "skulldoorknocker"
  | "sleepingbag"
  | "small.oil.refinery"
  | "snowman"
  | "sofa"
  | "sofa.pattern"
  | "spinner.wheel"
  | "stash.small"
  | "stocking.large"
  | "stocking.small"
  | "storage_barrel_b"
  | "storage_barrel_c"
  | "table"
  | "torchholder"
  | "trophy"
  | "trophy2023"
  | "tunalight"
  | "vending.machine"
  | "venom.snake"
  | "wantedposter"
  | "water.barrel"
  | "water.purifier"
  | "wicker.barrel"
  | "workbench1"
  | "workbench2"
  | "workbench3"
  | "xmas.advent"
  | "xmas.door.garland"
  | "xmas.double.door.garland"
  | "xmas.lightstring"
  | "xmas.tree"
  | "xmas.window.garland"
  | "xmasdoorwreath";

export const itemItems: {
  [K in ItemItemShortname]: Item<K> & { category: ItemItemCategory };
} = {
  "arcade.machine.chippy": {
    name: "Chippy Arcade Game",
    shortname: "arcade.machine.chippy",
    category: "item",
    image: "/images/items/arcade.machine.chippy.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
        {
          shortname: "gears",
          amount: 2,
        },
      ],
    },
  },
  "bamboo.barrel": {
    name: "Bamboo Barrel",
    shortname: "bamboo.barrel",
    category: "item",
    image: "/images/items/bamboo.barrel.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "bathtub.planter": {
    name: "Bath Tub Planter",
    shortname: "bathtub.planter",
    category: "item",
    image: "/images/items/bathtub.planter.png",
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
  bbq: {
    name: "Barbeque",
    shortname: "bbq",
    category: "item",
    image: "/images/items/bbq.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 40,
        },
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  bed: {
    name: "Bed",
    shortname: "bed",
    category: "item",
    image: "/images/items/bed.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 60,
        },
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  botabag: {
    name: "Bota Bag",
    shortname: "botabag",
    category: "item",
    image: "/images/items/botabag.png",
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
  "box.repair.bench": {
    name: "Repair Bench",
    shortname: "box.repair.bench",
    category: "item",
    image: "/images/items/box.repair.bench.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 125,
        },
      ],
    },
  },
  "box.wooden": {
    name: "Wood Storage Box",
    shortname: "box.wooden",
    category: "item",
    image: "/images/items/box.wooden.png",
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
  "box.wooden.large": {
    name: "Large Wood Box",
    shortname: "box.wooden.large",
    category: "item",
    image: "/images/items/box.wooden.large.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 250,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  campfire: {
    name: "Camp Fire",
    shortname: "campfire",
    category: "item",
    image: "/images/items/campfire.png",
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
  "carvable.pumpkin": {
    name: "Carvable Pumpkin",
    shortname: "carvable.pumpkin",
    category: "item",
    image: "/images/items/carvable.pumpkin.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "pumpkin",
          amount: 1,
        },
      ],
    },
  },
  chair: {
    name: "Chair",
    shortname: "chair",
    category: "item",
    image: "/images/items/chair.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 50,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  chickencoop: {
    name: "Chicken Coop",
    shortname: "chickencoop",
    category: "item",
    image: "/images/items/chickencoop.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "rope",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  chineselantern: {
    name: "Chinese Lantern",
    shortname: "chineselantern",
    category: "item",
    image: "/images/items/chineselantern.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 5,
        },
      ],
    },
  },
  chineselanternwhite: {
    name: "Chinese Lantern White",
    shortname: "chineselanternwhite",
    category: "item",
    image: "/images/items/chineselanternwhite.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 5,
        },
      ],
    },
  },
  clantable: {
    name: "Clan Table",
    shortname: "clantable",
    category: "item",
    image: "/images/items/clantable.png",
  },
  "clothing.mod.armorinsert_asbestos": {
    name: "Asbestos Armor Insert",
    shortname: "clothing.mod.armorinsert_asbestos",
    category: "item",
    image: "/images/items/clothing.mod.armorinsert_asbestos.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "clothing.mod.armorinsert_lead": {
    name: "Lead Armor Insert",
    shortname: "clothing.mod.armorinsert_lead",
    category: "item",
    image: "/images/items/clothing.mod.armorinsert_lead.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 4,
        },
      ],
    },
  },
  "clothing.mod.armorinsert_metal": {
    name: "Metal Armor Insert",
    shortname: "clothing.mod.armorinsert_metal",
    category: "item",
    image: "/images/items/clothing.mod.armorinsert_metal.png",
  },
  "clothing.mod.armorinsert_wood": {
    name: "Wooden Armor Insert",
    shortname: "clothing.mod.armorinsert_wood",
    category: "item",
    image: "/images/items/clothing.mod.armorinsert_wood.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
      ],
    },
  },
  composter: {
    name: "Composter",
    shortname: "composter",
    category: "item",
    image: "/images/items/composter.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "tarp",
          amount: 2,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  cookingworkbench: {
    name: "Cooking Workbench",
    shortname: "cookingworkbench",
    category: "item",
    image: "/images/items/cookingworkbench.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "stones",
          amount: 200,
        },
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  "discord.trophy": {
    name: "Discord Trophy",
    shortname: "discord.trophy",
    category: "item",
    image: "/images/items/discord.trophy.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  dragondoorknocker: {
    name: "Dragon Door Knocker",
    shortname: "dragondoorknocker",
    category: "item",
    image: "/images/items/dragondoorknocker.png",
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
  drone: {
    name: "Drone",
    shortname: "drone",
    category: "item",
    image: "/images/items/drone.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "cctv.camera",
          amount: 1,
        },
      ],
    },
  },
  dropbox: {
    name: "Drop Box",
    shortname: "dropbox",
    category: "item",
    image: "/images/items/dropbox.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
      ],
    },
  },
  easterdoorwreath: {
    name: "Easter Door Wreath",
    shortname: "easterdoorwreath",
    category: "item",
    image: "/images/items/easterdoorwreath.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
  "fireplace.stone": {
    name: "Stone Fireplace",
    shortname: "fireplace.stone",
    category: "item",
    image: "/images/items/fireplace.stone.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 500,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  "fishtrap.small": {
    name: "Survival Fish Trap",
    shortname: "fishtrap.small",
    category: "item",
    image: "/images/items/fishtrap.small.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "cloth",
          amount: 5,
        },
      ],
    },
  },
  fishtrophy: {
    name: "Fish Trophy",
    shortname: "fishtrophy",
    category: "item",
    image: "/images/items/fishtrophy.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 75,
        },
      ],
    },
  },
  frankensteintable: {
    name: "Frankenstein Table",
    shortname: "frankensteintable",
    category: "item",
    image: "/images/items/frankensteintable.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
      ],
    },
  },
  furnace: {
    name: "Furnace",
    shortname: "furnace",
    category: "item",
    image: "/images/items/furnace.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 200,
        },
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "lowgradefuel",
          amount: 50,
        },
      ],
    },
  },
  "furnace.large": {
    name: "Large Furnace",
    shortname: "furnace.large",
    category: "item",
    image: "/images/items/furnace.large.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 500,
        },
        {
          shortname: "wood",
          amount: 600,
        },
        {
          shortname: "lowgradefuel",
          amount: 75,
        },
      ],
    },
  },
  "gunrack.horizontal": {
    name: "Horizontal Weapon Rack",
    shortname: "gunrack.horizontal",
    category: "item",
    image: "/images/items/gunrack.horizontal.png",
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
          amount: 120,
        },
      ],
    },
  },
  "gunrack.single.1.horizontal": {
    name: "Frontier Bolts Single Item Rack",
    shortname: "gunrack.single.1.horizontal",
    category: "item",
    image: "/images/items/gunrack.single.1.horizontal.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 50,
        },
        {
          shortname: "metal.fragments",
          amount: 20,
        },
      ],
    },
  },
  "gunrack.single.2.horizontal": {
    name: "Frontier Horseshoe Single Item Rack",
    shortname: "gunrack.single.2.horizontal",
    category: "item",
    image: "/images/items/gunrack.single.2.horizontal.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "gunrack.single.3.horizontal": {
    name: "Frontier Horns Single Item Rack",
    shortname: "gunrack.single.3.horizontal",
    category: "item",
    image: "/images/items/gunrack.single.3.horizontal.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "bone.fragments",
          amount: 30,
        },
      ],
    },
  },
  gunrack_stand: {
    name: "Weapon Rack Stand",
    shortname: "gunrack_stand",
    category: "item",
    image: "/images/items/gunrack_stand.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "gunrack_tall.horizontal": {
    name: "Tall Weapon Rack",
    shortname: "gunrack_tall.horizontal",
    category: "item",
    image: "/images/items/gunrack_tall.horizontal.png",
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
          amount: 175,
        },
      ],
    },
  },
  "gunrack_wide.horizontal": {
    name: "Wide Weapon Rack",
    shortname: "gunrack_wide.horizontal",
    category: "item",
    image: "/images/items/gunrack_wide.horizontal.png",
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
          amount: 175,
        },
      ],
    },
  },
  "half.bamboo.shelves": {
    name: "Half Height Bamboo Shelves",
    shortname: "half.bamboo.shelves",
    category: "item",
    image: "/images/items/half.bamboo.shelves.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 40,
        },
      ],
    },
  },
  "hazmat.plushy": {
    name: "Hazmat Plushy",
    shortname: "hazmat.plushy",
    category: "item",
    image: "/images/items/hazmat.plushy.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 50,
        },
      ],
    },
  },
  hazmatyoutooz: {
    name: "Hazmat Youtooz",
    shortname: "hazmatyoutooz",
    category: "item",
    image: "/images/items/hazmatyoutooz.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  heavyscientistyoutooz: {
    name: "Heavy Scientist Youtooz",
    shortname: "heavyscientistyoutooz",
    category: "item",
    image: "/images/items/heavyscientistyoutooz.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  hitchtroughcombo: {
    name: "Hitch & Trough",
    shortname: "hitchtroughcombo",
    category: "item",
    image: "/images/items/hitchtroughcombo.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  hobobarrel: {
    name: "Hobo Barrel",
    shortname: "hobobarrel",
    category: "item",
    image: "/images/items/hobobarrel.png",
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
  huntingtrophylarge: {
    name: "Large Hunting Trophy",
    shortname: "huntingtrophylarge",
    category: "item",
    image: "/images/items/huntingtrophylarge.png",
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
  huntingtrophysmall: {
    name: "Small Hunting Trophy",
    shortname: "huntingtrophysmall",
    category: "item",
    image: "/images/items/huntingtrophysmall.png",
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
  iotable: {
    name: "Engineering Workbench",
    shortname: "iotable",
    category: "item",
    image: "/images/items/iotable.png",
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
          amount: 100,
        },
        {
          shortname: "scrap",
          amount: 50,
        },
      ],
    },
  },
  "jackolantern.angry": {
    name: "Jack O Lantern Angry",
    shortname: "jackolantern.angry",
    category: "item",
    image: "/images/items/jackolantern.angry.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "pumpkin",
          amount: 2,
        },
      ],
    },
  },
  "jackolantern.happy": {
    name: "Jack O Lantern Happy",
    shortname: "jackolantern.happy",
    category: "item",
    image: "/images/items/jackolantern.happy.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "pumpkin",
          amount: 2,
        },
      ],
    },
  },
  kayak: {
    name: "Kayak",
    shortname: "kayak",
    category: "item",
    image: "/images/items/kayak.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "cloth",
          amount: 50,
        },
      ],
    },
  },
  lantern: {
    name: "Lantern",
    shortname: "lantern",
    category: "item",
    image: "/images/items/lantern.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 15,
        },
      ],
    },
  },
  locker: {
    name: "Locker",
    shortname: "locker",
    category: "item",
    image: "/images/items/locker.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "wood",
          amount: 50,
        },
      ],
    },
  },
  mailbox: {
    name: "Mail Box",
    shortname: "mailbox",
    category: "item",
    image: "/images/items/mailbox.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 25,
        },
      ],
    },
  },
  map: {
    name: "Paper Map",
    shortname: "map",
    category: "item",
    image: "/images/items/map.png",
  },
  "minecart.planter": {
    name: "Minecart Planter",
    shortname: "minecart.planter",
    category: "item",
    image: "/images/items/minecart.planter.png",
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
  mixingtable: {
    name: "Mixing Table",
    shortname: "mixingtable",
    category: "item",
    image: "/images/items/mixingtable.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "stones",
          amount: 100,
        },
      ],
    },
  },
  "photoframe.landscape": {
    name: "Landscape Photo Frame",
    shortname: "photoframe.landscape",
    category: "item",
    image: "/images/items/photoframe.landscape.png",
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
  "photoframe.large": {
    name: "Large Photo Frame",
    shortname: "photoframe.large",
    category: "item",
    image: "/images/items/photoframe.large.png",
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
  "photoframe.portrait": {
    name: "Portrait Photo Frame",
    shortname: "photoframe.portrait",
    category: "item",
    image: "/images/items/photoframe.portrait.png",
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
  "planter.large": {
    name: "Large Planter Box",
    shortname: "planter.large",
    category: "item",
    image: "/images/items/planter.large.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "tarp",
          amount: 2,
        },
      ],
    },
  },
  "planter.small": {
    name: "Small Planter Box",
    shortname: "planter.small",
    category: "item",
    image: "/images/items/planter.small.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
  "planter.triangle": {
    name: "Triangle Planter Box",
    shortname: "planter.triangle",
    category: "item",
    image: "/images/items/planter.triangle.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
  "plantpot.single": {
    name: "Single Plant Pot",
    shortname: "plantpot.single",
    category: "item",
    image: "/images/items/plantpot.single.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  "pookie.bear": {
    name: "Pookie Bear",
    shortname: "pookie.bear",
    category: "item",
    image: "/images/items/pookie.bear.png",
  },
  "research.table": {
    name: "Research Table",
    shortname: "research.table",
    category: "item",
    image: "/images/items/research.table.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "scrap",
          amount: 20,
        },
      ],
    },
  },
  rockingchair: {
    name: "Rocking Chair",
    shortname: "rockingchair",
    category: "item",
    image: "/images/items/rockingchair.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 130,
        },
      ],
    },
  },
  rug: {
    name: "Rug",
    shortname: "rug",
    category: "item",
    image: "/images/items/rug.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
      ],
    },
  },
  "rug.bear": {
    name: "Rug Bear Skin",
    shortname: "rug.bear",
    category: "item",
    image: "/images/items/rug.bear.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 20,
        },
      ],
    },
  },
  scarecrow: {
    name: "Scarecrow",
    shortname: "scarecrow",
    category: "item",
    image: "/images/items/scarecrow.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
  secretlabchair: {
    name: "Secretlab Chair",
    shortname: "secretlabchair",
    category: "item",
    image: "/images/items/secretlabchair.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 50,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  shelves: {
    name: "Salvaged Shelves",
    shortname: "shelves",
    category: "item",
    image: "/images/items/shelves.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "sign.hanging": {
    name: "Two Sided Hanging Sign",
    shortname: "sign.hanging",
    category: "item",
    image: "/images/items/sign.hanging.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
      ],
    },
  },
  "sign.hanging.banner.large": {
    name: "Large Banner Hanging",
    shortname: "sign.hanging.banner.large",
    category: "item",
    image: "/images/items/sign.hanging.banner.large.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 20,
        },
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  "sign.hanging.ornate": {
    name: "Two Sided Ornate Hanging Sign",
    shortname: "sign.hanging.ornate",
    category: "item",
    image: "/images/items/sign.hanging.ornate.png",
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
  "sign.pictureframe.landscape": {
    name: "Landscape Picture Frame",
    shortname: "sign.pictureframe.landscape",
    category: "item",
    image: "/images/items/sign.pictureframe.landscape.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
  "sign.pictureframe.portrait": {
    name: "Portrait Picture Frame",
    shortname: "sign.pictureframe.portrait",
    category: "item",
    image: "/images/items/sign.pictureframe.portrait.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
  "sign.pictureframe.tall": {
    name: "Tall Picture Frame",
    shortname: "sign.pictureframe.tall",
    category: "item",
    image: "/images/items/sign.pictureframe.tall.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
  "sign.pictureframe.xl": {
    name: "XL Picture Frame",
    shortname: "sign.pictureframe.xl",
    category: "item",
    image: "/images/items/sign.pictureframe.xl.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
        {
          shortname: "cloth",
          amount: 15,
        },
      ],
    },
  },
  "sign.pictureframe.xxl": {
    name: "XXL Picture Frame",
    shortname: "sign.pictureframe.xxl",
    category: "item",
    image: "/images/items/sign.pictureframe.xxl.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 175,
        },
        {
          shortname: "cloth",
          amount: 30,
        },
      ],
    },
  },
  "sign.pole.banner.large": {
    name: "Large Banner on pole",
    shortname: "sign.pole.banner.large",
    category: "item",
    image: "/images/items/sign.pole.banner.large.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
  "sign.post.double": {
    name: "Double Sign Post",
    shortname: "sign.post.double",
    category: "item",
    image: "/images/items/sign.post.double.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 75,
        },
      ],
    },
  },
  "sign.post.single": {
    name: "Single Sign Post",
    shortname: "sign.post.single",
    category: "item",
    image: "/images/items/sign.post.single.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 75,
        },
      ],
    },
  },
  "sign.post.town": {
    name: "One Sided Town Sign Post",
    shortname: "sign.post.town",
    category: "item",
    image: "/images/items/sign.post.town.png",
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
  "sign.post.town.roof": {
    name: "Two Sided Town Sign Post",
    shortname: "sign.post.town.roof",
    category: "item",
    image: "/images/items/sign.post.town.roof.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "sign.wooden.huge": {
    name: "Huge Wooden Sign",
    shortname: "sign.wooden.huge",
    category: "item",
    image: "/images/items/sign.wooden.huge.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 250,
        },
      ],
    },
  },
  "sign.wooden.large": {
    name: "Large Wooden Sign",
    shortname: "sign.wooden.large",
    category: "item",
    image: "/images/items/sign.wooden.large.png",
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
  "sign.wooden.medium": {
    name: "Medium Wooden Sign",
    shortname: "sign.wooden.medium",
    category: "item",
    image: "/images/items/sign.wooden.medium.png",
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
  "sign.wooden.small": {
    name: "Small Wooden Sign",
    shortname: "sign.wooden.small",
    category: "item",
    image: "/images/items/sign.wooden.small.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 75,
        },
      ],
    },
  },
  "single.shallow.wall.shelves": {
    name: "Single Shallow Wall Shelves",
    shortname: "single.shallow.wall.shelves",
    category: "item",
    image: "/images/items/single.shallow.wall.shelves.png",
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
  skidoo: {
    name: "Diver propulsion vehicle",
    shortname: "skidoo",
    category: "item",
    image: "/images/items/skidoo.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "techparts",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 15,
        },
      ],
    },
  },
  skull_fire_pit: {
    name: "Skull Fire Pit",
    shortname: "skull_fire_pit",
    category: "item",
    image: "/images/items/skull_fire_pit.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "skull.human",
          amount: 1,
        },
      ],
    },
  },
  skulldoorknocker: {
    name: "Skull Door Knocker",
    shortname: "skulldoorknocker",
    category: "item",
    image: "/images/items/skulldoorknocker.png",
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
  sleepingbag: {
    name: "Sleeping Bag",
    shortname: "sleepingbag",
    category: "item",
    image: "/images/items/sleepingbag.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 30,
        },
      ],
    },
  },
  "small.oil.refinery": {
    name: "Small Oil Refinery",
    shortname: "small.oil.refinery",
    category: "item",
    image: "/images/items/small.oil.refinery.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metal.fragments",
          amount: 500,
        },
        {
          shortname: "lowgradefuel",
          amount: 250,
        },
      ],
    },
  },
  snowman: {
    name: "Snowman",
    shortname: "snowman",
    category: "item",
    image: "/images/items/snowman.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "charcoal",
          amount: 50,
        },
        {
          shortname: "cloth",
          amount: 20,
        },
        {
          shortname: "metal.fragments",
          amount: 20,
        },
      ],
    },
  },
  sofa: {
    name: "Sofa",
    shortname: "sofa",
    category: "item",
    image: "/images/items/sofa.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 30,
        },
      ],
    },
  },
  "sofa.pattern": {
    name: "Sofa - Pattern",
    shortname: "sofa.pattern",
    category: "item",
    image: "/images/items/sofa.pattern.png",
  },
  "spinner.wheel": {
    name: "Spinning wheel",
    shortname: "spinner.wheel",
    category: "item",
    image: "/images/items/spinner.wheel.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
      ],
    },
  },
  "stash.small": {
    shortname: "stash.small",
    name: "Small Stash",
    category: "item",
    image: "/images/items/stash.small.png",
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
  "stocking.large": {
    name: "SUPER Stocking",
    shortname: "stocking.large",
    category: "item",
    image: "/images/items/stocking.large.png",
  },
  "stocking.small": {
    name: "Small Stocking",
    shortname: "stocking.small",
    category: "item",
    image: "/images/items/stocking.small.png",
  },
  storage_barrel_b: {
    name: "Storage Barrel Vertical",
    shortname: "storage_barrel_b",
    category: "item",
    image: "/images/items/storage_barrel_b.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  storage_barrel_c: {
    name: "Storage Barrel Horizontal",
    shortname: "storage_barrel_c",
    category: "item",
    image: "/images/items/storage_barrel_c.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  table: {
    name: "Table",
    shortname: "table",
    category: "item",
    image: "/images/items/table.png",
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
  torchholder: {
    name: "Torch Holder",
    shortname: "torchholder",
    category: "item",
    image: "/images/items/torchholder.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 40,
        },
        {
          shortname: "metal.fragments",
          amount: 10,
        },
      ],
    },
  },
  trophy: {
    name: "Twitch Rivals Trophy",
    shortname: "trophy",
    category: "item",
    image: "/images/items/trophy.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  trophy2023: {
    name: "Twitch Rivals Trophy 2023",
    shortname: "trophy2023",
    category: "item",
    image: "/images/items/trophy2023.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  tunalight: {
    name: "Tuna Can Lamp",
    shortname: "tunalight",
    category: "item",
    image: "/images/items/tunalight.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "can.tuna.empty",
          amount: 1,
        },
        {
          shortname: "wood",
          amount: 20,
        },
        {
          shortname: "lowgradefuel",
          amount: 10,
        },
      ],
    },
  },
  "vending.machine": {
    name: "Vending Machine",
    shortname: "vending.machine",
    category: "item",
    image: "/images/items/vending.machine.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 20,
        },
        {
          shortname: "gears",
          amount: 3,
        },
      ],
    },
  },
  "venom.snake": {
    shortname: "venom.snake",
    name: "Snake Venom",
    category: "item",
    image: "/images/items/venom.snake.png",
  },
  wantedposter: {
    name: "Wanted Poster",
    shortname: "wantedposter",
    category: "item",
    image: "/images/items/wantedposter.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 20,
        },
      ],
    },
  },
  "water.barrel": {
    name: "Water Barrel",
    shortname: "water.barrel",
    category: "item",
    image: "/images/items/water.barrel.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 250,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
  "water.purifier": {
    name: "Water Purifier",
    shortname: "water.purifier",
    category: "item",
    image: "/images/items/water.purifier.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "propanetank",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 15,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
  "wicker.barrel": {
    name: "Wicker Barrel",
    shortname: "wicker.barrel",
    category: "item",
    image: "/images/items/wicker.barrel.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  workbench1: {
    name: "Workbench Level 1",
    shortname: "workbench1",
    category: "item",
    image: "/images/items/workbench1.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 500,
        },
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "scrap",
          amount: 50,
        },
      ],
    },
  },
  workbench2: {
    name: "Workbench Level 2",
    shortname: "workbench2",
    category: "item",
    image: "/images/items/workbench2.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 500,
        },
        {
          shortname: "metal.refined",
          amount: 20,
        },
        {
          shortname: "scrap",
          amount: 500,
        },
      ],
    },
  },
  workbench3: {
    name: "Workbench Level 3",
    shortname: "workbench3",
    category: "item",
    image: "/images/items/workbench3.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 1000,
        },
        {
          shortname: "metal.refined",
          amount: 100,
        },
        {
          shortname: "scrap",
          amount: 1250,
        },
      ],
    },
  },
  "xmas.advent": {
    name: "Advent Calendar",
    shortname: "xmas.advent",
    category: "item",
    image: "/images/items/xmas.advent.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
  "xmas.door.garland": {
    name: "Festive Doorway Garland",
    shortname: "xmas.door.garland",
    category: "item",
    image: "/images/items/xmas.door.garland.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
      ],
    },
  },
  "xmas.double.door.garland": {
    name: "Festive Double Doorway Garland",
    shortname: "xmas.double.door.garland",
    category: "item",
    image: "/images/items/xmas.double.door.garland.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
      ],
    },
  },
  "xmas.lightstring": {
    name: "Christmas Lights",
    shortname: "xmas.lightstring",
    category: "item",
    image: "/images/items/xmas.lightstring.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 20,
        },
      ],
    },
  },
  "xmas.tree": {
    name: "Christmas Tree",
    shortname: "xmas.tree",
    category: "item",
    image: "/images/items/xmas.tree.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
  "xmas.window.garland": {
    name: "Festive Window Garland",
    shortname: "xmas.window.garland",
    category: "item",
    image: "/images/items/xmas.window.garland.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
      ],
    },
  },
  xmasdoorwreath: {
    name: "Christmas Door Wreath",
    shortname: "xmasdoorwreath",
    category: "item",
    image: "/images/items/xmasdoorwreath.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
};
