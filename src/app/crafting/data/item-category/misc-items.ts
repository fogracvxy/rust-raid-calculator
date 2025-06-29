import type { Item } from "../../types/item.types";

export type MiscItemCategory = "misc";
export type MiscItemShortname =
  | "captainslog"
  | "coffin.storage"
  | "cursedcauldron"
  | "door.key"
  | "easter.bronzeegg"
  | "easter.goldegg"
  | "easter.paintedeggs"
  | "easter.silveregg"
  | "easterbasket"
  | "fogmachine"
  | "giantcandycanedecor"
  | "giantlollipops"
  | "gravestone"
  | "halloween.candy"
  | "halloween.lootbag.large"
  | "halloween.lootbag.medium"
  | "halloween.lootbag.small"
  | "head.bag"
  | "keycard_blue"
  | "keycard_green"
  | "keycard_red"
  | "largecandles"
  | "note"
  | "photo"
  | "pumpkinbasket"
  | "rustige_egg_a"
  | "rustige_egg_b"
  | "rustige_egg_c"
  | "rustige_egg_d"
  | "rustige_egg_e"
  | "rustige_egg_f"
  | "rustige_egg_g"
  | "sickle"
  | "smallcandles"
  | "snowmachine"
  | "spiderweb"
  | "spookyspeaker"
  | "strobelight"
  | "wall.graveyard.fence"
  | "woodcross"
  | "xmas.decoration.baubels"
  | "xmas.decoration.candycanes"
  | "xmas.decoration.gingerbreadmen"
  | "xmas.decoration.lights"
  | "xmas.decoration.pinecone"
  | "xmas.decoration.star"
  | "xmas.decoration.tinsel"
  | "xmas.present.large"
  | "xmas.present.medium"
  | "xmas.present.small";

export const miscItems: {
  [K in MiscItemShortname]: Item<K> & { category: MiscItemCategory };
} = {
  captainslog: {
    name: "Captain's Log",
    shortname: "captainslog",
    category: "misc",
    image: "/images/misc/captainslog.png",
  },
  "coffin.storage": {
    name: "Coffin",
    shortname: "coffin.storage",
    category: "misc",
    image: "/images/misc/coffin.storage.png",
  },
  cursedcauldron: {
    name: "Cursed Cauldron",
    shortname: "cursedcauldron",
    category: "misc",
    image: "/images/misc/cursedcauldron.png",
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
  "door.key": {
    name: "Door Key",
    shortname: "door.key",
    category: "misc",
    image: "/images/misc/door.key.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 25,
        },
      ],
    },
  },
  "easter.bronzeegg": {
    name: "Bronze Egg",
    shortname: "easter.bronzeegg",
    category: "misc",
    image: "/images/misc/easter.bronzeegg.png",
  },
  "easter.goldegg": {
    name: "Gold Egg",
    shortname: "easter.goldegg",
    category: "misc",
    image: "/images/misc/easter.goldegg.png",
  },
  "easter.paintedeggs": {
    name: "Painted Egg",
    shortname: "easter.paintedeggs",
    category: "misc",
    image: "/images/misc/easter.paintedeggs.png",
  },
  "easter.silveregg": {
    name: "Silver Egg",
    shortname: "easter.silveregg",
    category: "misc",
    image: "/images/misc/easter.silveregg.png",
  },
  easterbasket: {
    name: "Egg Basket",
    shortname: "easterbasket",
    category: "misc",
    image: "/images/misc/easterbasket.png",
  },
  fogmachine: {
    name: "Fogger-3000",
    shortname: "fogmachine",
    category: "misc",
    image: "/images/misc/fogmachine.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "lowgradefuel",
          amount: 30,
        },
        {
          shortname: "metalpipe",
          amount: 1,
        },
      ],
    },
  },
  giantcandycanedecor: {
    name: "Giant Candy Decor",
    shortname: "giantcandycanedecor",
    category: "misc",
    image: "/images/misc/giantcandycanedecor.png",
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
  giantlollipops: {
    name: "Giant Lollipop Decor",
    shortname: "giantlollipops",
    category: "misc",
    image: "/images/misc/giantlollipops.png",
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
  gravestone: {
    name: "Gravestone",
    shortname: "gravestone",
    category: "misc",
    image: "/images/misc/gravestone.png",
  },
  "halloween.candy": {
    name: "Halloween Candy",
    shortname: "halloween.candy",
    category: "misc",
    image: "/images/misc/halloween.candy.png",
  },
  "halloween.lootbag.large": {
    name: "Large Loot Bag",
    shortname: "halloween.lootbag.large",
    category: "misc",
    image: "/images/misc/halloween.lootbag.large.png",
  },
  "halloween.lootbag.medium": {
    name: "Medium Loot Bag",
    shortname: "halloween.lootbag.medium",
    category: "misc",
    image: "/images/misc/halloween.lootbag.medium.png",
  },
  "halloween.lootbag.small": {
    name: "Small Loot Bag",
    shortname: "halloween.lootbag.small",
    category: "misc",
    image: "/images/misc/halloween.lootbag.small.png",
  },
  "head.bag": {
    name: "Head Bag",
    shortname: "head.bag",
    category: "misc",
    image: "/images/misc/head.bag.png",
  },
  keycard_blue: {
    name: "Blue Keycard",
    shortname: "keycard_blue",
    category: "misc",
    image: "/images/misc/keycard_blue.png",
  },
  keycard_green: {
    name: "Green Keycard",
    shortname: "keycard_green",
    category: "misc",
    image: "/images/misc/keycard_green.png",
  },
  keycard_red: {
    name: "Red Keycard",
    shortname: "keycard_red",
    category: "misc",
    image: "/images/misc/keycard_red.png",
  },
  largecandles: {
    name: "Large Candle Set",
    shortname: "largecandles",
    category: "misc",
    image: "/images/misc/largecandles.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "fat.animal",
          amount: 20,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
  note: {
    name: "Note",
    shortname: "note",
    category: "misc",
    image: "/images/misc/note.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 10,
        },
      ],
    },
  },
  photo: {
    name: "Photograph",
    shortname: "photo",
    category: "misc",
    image: "/images/misc/photo.png",
  },
  pumpkinbasket: {
    name: "Pumpkin Basket",
    shortname: "pumpkinbasket",
    category: "misc",
    image: "/images/misc/pumpkinbasket.png",
  },
  rustige_egg_a: {
    name: "Rustigé Egg - Red",
    shortname: "rustige_egg_a",
    category: "misc",
    image: "/images/misc/rustige_egg_a.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  rustige_egg_b: {
    name: "Rustigé Egg - Blue",
    shortname: "rustige_egg_b",
    category: "misc",
    image: "/images/misc/rustige_egg_b.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  rustige_egg_c: {
    name: "Rustigé Egg - Purple",
    shortname: "rustige_egg_c",
    category: "misc",
    image: "/images/misc/rustige_egg_c.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  rustige_egg_d: {
    name: "Rustigé Egg - Ivory",
    shortname: "rustige_egg_d",
    category: "misc",
    image: "/images/misc/rustige_egg_d.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  rustige_egg_e: {
    name: "Rustigé Egg - Green",
    shortname: "rustige_egg_e",
    category: "misc",
    image: "/images/misc/rustige_egg_e.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  rustige_egg_f: {
    name: "Rustigé Egg - White",
    shortname: "rustige_egg_f",
    category: "misc",
    image: "/images/misc/rustige_egg_f.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  rustige_egg_g: {
    name: "Rustigé Egg - Cerulean",
    shortname: "rustige_egg_g",
    category: "misc",
    image: "/images/misc/rustige_egg_g.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  sickle: {
    name: "Sickle",
    shortname: "sickle",
    category: "misc",
    image: "/images/misc/sickle.png",
  },
  smallcandles: {
    name: "Small Candle Set",
    shortname: "smallcandles",
    category: "misc",
    image: "/images/misc/smallcandles.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "fat.animal",
          amount: 10,
        },
        {
          shortname: "cloth",
          amount: 5,
        },
      ],
    },
  },
  snowmachine: {
    name: "Snow Machine",
    shortname: "snowmachine",
    category: "misc",
    image: "/images/misc/snowmachine.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 125,
        },
        {
          shortname: "lowgradefuel",
          amount: 30,
        },
        {
          shortname: "metalpipe",
          amount: 1,
        },
      ],
    },
  },
  spiderweb: {
    name: "Spider Webs",
    shortname: "spiderweb",
    category: "misc",
    image: "/images/misc/spiderweb.png",
  },
  spookyspeaker: {
    name: "Spooky Speaker",
    shortname: "spookyspeaker",
    category: "misc",
    image: "/images/misc/spookyspeaker.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 400,
        },
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
  strobelight: {
    name: "Strobe Light",
    shortname: "strobelight",
    category: "misc",
    image: "/images/misc/strobelight.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  "wall.graveyard.fence": {
    name: "Graveyard Fence",
    shortname: "wall.graveyard.fence",
    category: "misc",
    image: "/images/misc/wall.graveyard.fence.png",
  },
  woodcross: {
    name: "Wooden Cross",
    shortname: "woodcross",
    category: "misc",
    image: "/images/misc/woodcross.png",
  },
  "xmas.decoration.baubels": {
    name: "Decorative Baubels",
    shortname: "xmas.decoration.baubels",
    category: "misc",
    image: "/images/misc/xmas.decoration.baubels.png",
  },
  "xmas.decoration.candycanes": {
    name: "Decorative Plastic Candy Canes",
    shortname: "xmas.decoration.candycanes",
    category: "misc",
    image: "/images/misc/xmas.decoration.candycanes.png",
  },
  "xmas.decoration.gingerbreadmen": {
    name: "Decorative Gingerbread Men",
    shortname: "xmas.decoration.gingerbreadmen",
    category: "misc",
    image: "/images/misc/xmas.decoration.gingerbreadmen.png",
  },
  "xmas.decoration.lights": {
    name: "Tree Lights",
    shortname: "xmas.decoration.lights",
    category: "misc",
    image: "/images/misc/xmas.decoration.lights.png",
  },
  "xmas.decoration.pinecone": {
    name: "Decorative Pinecones",
    shortname: "xmas.decoration.pinecone",
    category: "misc",
    image: "/images/misc/xmas.decoration.pinecone.png",
  },
  "xmas.decoration.star": {
    name: "Star Tree Topper",
    shortname: "xmas.decoration.star",
    category: "misc",
    image: "/images/misc/xmas.decoration.star.png",
  },
  "xmas.decoration.tinsel": {
    name: "Decorative Tinsel",
    shortname: "xmas.decoration.tinsel",
    category: "misc",
    image: "/images/misc/xmas.decoration.tinsel.png",
  },
  "xmas.present.large": {
    name: "Large Present",
    shortname: "xmas.present.large",
    category: "misc",
    image: "/images/misc/xmas.present.large.png",
  },
  "xmas.present.medium": {
    name: "Medium Present",
    shortname: "xmas.present.medium",
    category: "misc",
    image: "/images/misc/xmas.present.medium.png",
  },
  "xmas.present.small": {
    name: "Small Present",
    shortname: "xmas.present.small",
    category: "misc",
    image: "/images/misc/xmas.present.small.png",
  },
};
