import type { Item } from "../../types/item.types";

export type AttireItemCategory = "attire";
export type AttireItemShortname =
  | "attire.banditguard"
  | "attire.bunny.onesie"
  | "attire.bunnyears"
  | "attire.egg.suit"
  | "attire.hide.boots"
  | "attire.hide.helterneck"
  | "attire.hide.pants"
  | "attire.hide.poncho"
  | "attire.hide.skirt"
  | "attire.hide.vest"
  | "attire.nesthat"
  | "attire.ninja.suit"
  | "attire.reindeer.headband"
  | "attire.snowman.helmet"
  | "barrelcostume"
  | "bone.armor.suit"
  | "boots.frog"
  | "bucket.helmet"
  | "burlap.gloves"
  | "burlap.gloves.new"
  | "burlap.headwrap"
  | "burlap.shirt"
  | "burlap.shoes"
  | "burlap.trousers"
  | "chicken.costume"
  | "clatter.helmet"
  | "coffeecan.helmet"
  | "cratecostume"
  | "deer.skull.mask"
  | "diving.fins"
  | "diving.mask"
  | "diving.tank"
  | "diving.wetsuit"
  | "draculacape"
  | "draculamask"
  | "frankensteinmask"
  | "frankensteins.monster.01.head"
  | "frankensteins.monster.01.legs"
  | "frankensteins.monster.01.torso"
  | "frankensteins.monster.02.head"
  | "frankensteins.monster.02.legs"
  | "frankensteins.monster.02.torso"
  | "frankensteins.monster.03.head"
  | "frankensteins.monster.03.legs"
  | "frankensteins.monster.03.torso"
  | "ghostsheet"
  | "gingerbreadsuit"
  | "gloweyes"
  | "hab.armor"
  | "halloween.mummysuit"
  | "halloween.surgeonsuit"
  | "hat.beenie"
  | "hat.boonie"
  | "hat.bunnyhat"
  | "hat.candle"
  | "hat.cap"
  | "hat.dragonmask"
  | "hat.gas.mask"
  | "hat.miner"
  | "hat.oxmask"
  | "hat.rabbitmask"
  | "hat.ratmask"
  | "hat.snakemask"
  | "hat.tigermask"
  | "hat.wellipets"
  | "hat.wolf"
  | "hazmatsuit"
  | "hazmatsuit.arcticsuit"
  | "hazmatsuit_scientist_arctic"
  | "hazmatsuit_scientist_nvgm"
  | "hazmatsuit_scientist_peacekeeper"
  | "heavy.plate.helmet"
  | "heavy.plate.jacket"
  | "heavy.plate.pants"
  | "hoodie"
  | "horse.armor.roadsign"
  | "horse.armor.wood"
  | "horse.costume"
  | "horse.saddle.double"
  | "horse.saddle.single"
  | "horse.saddlebag"
  | "horse.shoes.advanced"
  | "horse.shoes.basic"
  | "jacket"
  | "jacket.snow"
  | "jumpsuit.suit"
  | "jumpsuit.suit.blue"
  | "jumpsuit.waterwellnpc"
  | "largebackpack"
  | "lumberjack hoodie"
  | "mask.balaclava"
  | "mask.bandana"
  | "metal.facemask"
  | "metal.plate.torso"
  | "metal.shield"
  | "movembermoustache"
  | "mummymask"
  | "nightvisiongoggles"
  | "oubreak_scientist"
  | "pants"
  | "pants.shorts"
  | "parachute"
  | "partyhat"
  | "prisonerhood"
  | "reinforced.wooden.shield"
  | "riot.helmet"
  | "roadsign.gloves"
  | "roadsign.jacket"
  | "roadsign.kilt"
  | "santabeard"
  | "santahat"
  | "scarecrow.suit"
  | "scarecrowhead"
  | "scientistsuit_heavy"
  | "shirt.collared"
  | "shirt.tanktop"
  | "shoes.boots"
  | "smallbackpack"
  | "tactical.gloves"
  | "tshirt"
  | "tshirt.long"
  | "twitch.headset"
  | "twitchrivalsflag"
  | "twitchsunglasses"
  | "wood.armor.helmet"
  | "wood.armor.jacket"
  | "wood.armor.pants"
  | "woodarmor.gloves"
  | "wooden.shield";

export const attireItems: {
  [K in AttireItemShortname]: Item<K> & { category: AttireItemCategory };
} = {
  "attire.banditguard": {
    name: "Bandit Guard Gear",
    shortname: "attire.banditguard",
    category: "attire",
    image: "/images/clothing/attire.banditguard.png",
  },
  "attire.bunny.onesie": {
    name: "Bunny Onesie",
    shortname: "attire.bunny.onesie",
    category: "attire",
    image: "/images/clothing/attire.bunny.onesie.png",
  },
  "attire.bunnyears": {
    name: "Bunny Ears",
    shortname: "attire.bunnyears",
    category: "attire",
    image: "/images/clothing/attire.bunnyears.png",
  },
  "attire.egg.suit": {
    name: "Egg Suit",
    shortname: "attire.egg.suit",
    category: "attire",
    image: "/images/clothing/attire.egg.suit.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 60,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  "attire.hide.boots": {
    name: "Hide Boots",
    shortname: "attire.hide.boots",
    category: "attire",
    image: "/images/clothing/attire.hide.boots.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 10,
        },
      ],
    },
  },
  "attire.hide.helterneck": {
    name: "Hide Halterneck",
    shortname: "attire.hide.helterneck",
    category: "attire",
    image: "/images/clothing/attire.hide.helterneck.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 10,
        },
      ],
    },
  },
  "attire.hide.pants": {
    name: "Hide Pants",
    shortname: "attire.hide.pants",
    category: "attire",
    image: "/images/clothing/attire.hide.pants.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 10,
        },
      ],
    },
  },
  "attire.hide.poncho": {
    name: "Hide Poncho",
    shortname: "attire.hide.poncho",
    category: "attire",
    image: "/images/clothing/attire.hide.poncho.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 15,
        },
      ],
    },
  },
  "attire.hide.skirt": {
    name: "Hide Skirt",
    shortname: "attire.hide.skirt",
    category: "attire",
    image: "/images/clothing/attire.hide.skirt.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 10,
        },
      ],
    },
  },
  "attire.hide.vest": {
    name: "Hide Vest",
    shortname: "attire.hide.vest",
    category: "attire",
    image: "/images/clothing/attire.hide.vest.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 10,
        },
      ],
    },
  },
  "attire.nesthat": {
    name: "Nest Hat",
    shortname: "attire.nesthat",
    category: "attire",
    image: "/images/clothing/attire.nesthat.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  "attire.ninja.suit": {
    name: "Ninja Suit",
    shortname: "attire.ninja.suit",
    category: "attire",
    image: "/images/clothing/attire.ninja.suit.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 60,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  "attire.reindeer.headband": {
    name: "Reindeer Antlers",
    shortname: "attire.reindeer.headband",
    category: "attire",
    image: "/images/clothing/attire.reindeer.headband.png",
  },
  "attire.snowman.helmet": {
    name: "Snowman Helmet",
    shortname: "attire.snowman.helmet",
    category: "attire",
    image: "/images/clothing/attire.snowman.helmet.png",
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
  barrelcostume: {
    name: "A Barrel Costume",
    shortname: "barrelcostume",
    category: "attire",
    image: "/images/clothing/barrelcostume.png",
  },
  "bone.armor.suit": {
    name: "Bone Armor",
    shortname: "bone.armor.suit",
    category: "attire",
    image: "/images/clothing/bone.armor.suit.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
        {
          shortname: "bone.fragments",
          amount: 70,
        },
      ],
    },
  },
  "boots.frog": {
    name: "Frog Boots",
    shortname: "boots.frog",
    category: "attire",
    image: "/images/clothing/boots.frog.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
  "bucket.helmet": {
    name: "Bucket Helmet",
    shortname: "bucket.helmet",
    category: "attire",
    image: "/images/clothing/bucket.helmet.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 35,
        },
      ],
    },
  },
  "burlap.gloves": {
    name: "Leather Gloves",
    shortname: "burlap.gloves",
    category: "attire",
    image: "/images/clothing/burlap.gloves.png",
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
  "burlap.gloves.new": {
    name: "Burlap Gloves",
    shortname: "burlap.gloves.new",
    category: "attire",
    image: "/images/clothing/burlap.gloves.new.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 5,
        },
      ],
    },
  },
  "burlap.headwrap": {
    name: "Burlap Headwrap",
    shortname: "burlap.headwrap",
    category: "attire",
    image: "/images/clothing/burlap.headwrap.png",
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
  "burlap.shirt": {
    name: "Burlap Shirt",
    shortname: "burlap.shirt",
    category: "attire",
    image: "/images/clothing/burlap.shirt.png",
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
  "burlap.shoes": {
    name: "Burlap Shoes",
    shortname: "burlap.shoes",
    category: "attire",
    image: "/images/clothing/burlap.shoes.png",
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
  "burlap.trousers": {
    name: "Burlap Trousers",
    shortname: "burlap.trousers",
    category: "attire",
    image: "/images/clothing/burlap.trousers.png",
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
  "chicken.costume": {
    name: "Chicken Costume",
    shortname: "chicken.costume",
    category: "attire",
    image: "/images/clothing/chicken.costume.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  "clatter.helmet": {
    name: "Clatter Helmet",
    shortname: "clatter.helmet",
    category: "attire",
    image: "/images/clothing/clatter.helmet.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 35,
        },
      ],
    },
  },
  "coffeecan.helmet": {
    name: "Coffee Can Helmet",
    shortname: "coffeecan.helmet",
    category: "attire",
    image: "/images/clothing/coffeecan.helmet.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
        {
          shortname: "metal.fragments",
          amount: 60,
        },
        {
          shortname: "sewingkit",
          amount: 1,
        },
      ],
    },
  },
  cratecostume: {
    name: "Crate Costume",
    shortname: "cratecostume",
    category: "attire",
    image: "/images/clothing/cratecostume.png",
  },
  "deer.skull.mask": {
    name: "Bone Helmet",
    shortname: "deer.skull.mask",
    category: "attire",
    image: "/images/clothing/deer.skull.mask.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
        {
          shortname: "bone.fragments",
          amount: 30,
        },
      ],
    },
  },
  "diving.fins": {
    name: "Diving Fins",
    shortname: "diving.fins",
    category: "attire",
    image: "/images/clothing/diving.fins.png",
  },
  "diving.mask": {
    name: "Diving Mask",
    shortname: "diving.mask",
    category: "attire",
    image: "/images/clothing/diving.mask.png",
  },
  "diving.tank": {
    name: "Diving Tank",
    shortname: "diving.tank",
    category: "attire",
    image: "/images/clothing/diving.tank.png",
  },
  "diving.wetsuit": {
    name: "Wetsuit",
    shortname: "diving.wetsuit",
    category: "attire",
    image: "/images/clothing/diving.wetsuit.png",
  },
  draculacape: {
    name: "Dracula Cape",
    shortname: "draculacape",
    category: "attire",
    image: "/images/clothing/draculacape.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 50,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  draculamask: {
    name: "Dracula Mask",
    shortname: "draculamask",
    category: "attire",
    image: "/images/clothing/draculamask.png",
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
  frankensteinmask: {
    name: "Frankenstein Mask",
    shortname: "frankensteinmask",
    category: "attire",
    image: "/images/clothing/frankensteinmask.png",
  },
  "frankensteins.monster.01.head": {
    name: "Light Frankenstein Head",
    shortname: "frankensteins.monster.01.head",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.01.head.png",
  },
  "frankensteins.monster.01.legs": {
    name: "Light Frankenstein Legs",
    shortname: "frankensteins.monster.01.legs",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.01.legs.png",
  },
  "frankensteins.monster.01.torso": {
    name: "Light Frankenstein Torso",
    shortname: "frankensteins.monster.01.torso",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.01.torso.png",
  },
  "frankensteins.monster.02.head": {
    name: "Medium Frankenstein Head",
    shortname: "frankensteins.monster.02.head",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.02.head.png",
  },
  "frankensteins.monster.02.legs": {
    name: "Medium Frankenstein Legs",
    shortname: "frankensteins.monster.02.legs",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.02.legs.png",
  },
  "frankensteins.monster.02.torso": {
    name: "Medium Frankenstein Torso",
    shortname: "frankensteins.monster.02.torso",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.02.torso.png",
  },
  "frankensteins.monster.03.head": {
    name: "Heavy Frankenstein Head",
    shortname: "frankensteins.monster.03.head",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.03.head.png",
  },
  "frankensteins.monster.03.legs": {
    name: "Heavy Frankenstein Legs",
    shortname: "frankensteins.monster.03.legs",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.03.legs.png",
  },
  "frankensteins.monster.03.torso": {
    name: "Heavy Frankenstein Torso",
    shortname: "frankensteins.monster.03.torso",
    category: "attire",
    image: "/images/clothing/frankensteins.monster.03.torso.png",
  },
  ghostsheet: {
    name: "Ghost Costume",
    shortname: "ghostsheet",
    category: "attire",
    image: "/images/clothing/ghostsheet.png",
  },
  gingerbreadsuit: {
    name: "Gingerbread Suit",
    shortname: "gingerbreadsuit",
    category: "attire",
    image: "/images/clothing/gingerbreadsuit.png",
  },
  gloweyes: {
    name: "Glowing Eyes",
    shortname: "gloweyes",
    category: "attire",
    image: "/images/clothing/gloweyes.png",
  },
  "hab.armor": {
    name: "Hot Air Balloon Armor",
    shortname: "hab.armor",
    category: "attire",
    image: "/images/clothing/hab.armor.png",
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
  "halloween.mummysuit": {
    name: "Mummy Suit",
    shortname: "halloween.mummysuit",
    category: "attire",
    image: "/images/clothing/halloween.mummysuit.png",
  },
  "halloween.surgeonsuit": {
    name: "Surgeon Scrubs",
    shortname: "halloween.surgeonsuit",
    category: "attire",
    image: "/images/clothing/halloween.surgeonsuit.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 60,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  "hat.beenie": {
    name: "Beenie Hat",
    shortname: "hat.beenie",
    category: "attire",
    image: "/images/clothing/hat.beenie.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
      ],
    },
  },
  "hat.boonie": {
    name: "Boonie Hat",
    shortname: "hat.boonie",
    category: "attire",
    image: "/images/clothing/hat.boonie.png",
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
  "hat.bunnyhat": {
    name: "Bunny Hat",
    shortname: "hat.bunnyhat",
    category: "attire",
    image: "/images/clothing/hat.bunnyhat.png",
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
  "hat.candle": {
    name: "Candle Hat",
    shortname: "hat.candle",
    category: "attire",
    image: "/images/clothing/hat.candle.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
        {
          shortname: "lowgradefuel",
          amount: 5,
        },
      ],
    },
  },
  "hat.cap": {
    name: "Baseball Cap",
    shortname: "hat.cap",
    category: "attire",
    image: "/images/clothing/hat.cap.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 5,
        },
      ],
    },
  },
  "hat.dragonmask": {
    name: "Dragon Mask",
    shortname: "hat.dragonmask",
    category: "attire",
    image: "/images/clothing/hat.dragonmask.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  "hat.gas.mask": {
    name: "Gas Mask",
    shortname: "hat.gas.mask",
    category: "attire",
    image: "/images/clothing/hat.gas.mask.png",
  },
  "hat.miner": {
    name: "Miners Hat",
    shortname: "hat.miner",
    category: "attire",
    image: "/images/clothing/hat.miner.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
        {
          shortname: "lowgradefuel",
          amount: 10,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "hat.oxmask": {
    name: "Ox Mask",
    shortname: "hat.oxmask",
    category: "attire",
    image: "/images/clothing/hat.oxmask.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  "hat.rabbitmask": {
    name: "Rabbit Mask",
    shortname: "hat.rabbitmask",
    category: "attire",
    image: "/images/clothing/hat.rabbitmask.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  "hat.ratmask": {
    name: "Rat Mask",
    shortname: "hat.ratmask",
    category: "attire",
    image: "/images/clothing/hat.ratmask.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  "hat.snakemask": {
    name: "Snake mask",
    shortname: "hat.snakemask",
    category: "attire",
    image: "/images/clothing/hat.snakemask.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  "hat.tigermask": {
    name: "Tiger Mask",
    shortname: "hat.tigermask",
    category: "attire",
    image: "/images/clothing/hat.tigermask.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  "hat.wellipets": {
    name: "Wellipets Hat",
    shortname: "hat.wellipets",
    category: "attire",
    image: "/images/clothing/hat.wellipets.png",
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
  "hat.wolf": {
    name: "Wolf Headdress",
    shortname: "hat.wolf",
    category: "attire",
    image: "/images/clothing/hat.wolf.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "skull.wolf",
          amount: 1,
        },
      ],
    },
  },
  hazmatsuit: {
    name: "Hazmat Suit",
    shortname: "hazmatsuit",
    category: "attire",
    image: "/images/clothing/hazmatsuit.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "tarp",
          amount: 5,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
        {
          shortname: "metal.refined",
          amount: 8,
        },
      ],
    },
  },
  "hazmatsuit.arcticsuit": {
    name: "Arctic Suit",
    shortname: "hazmatsuit.arcticsuit",
    category: "attire",
    image: "/images/clothing/hazmatsuit.arcticsuit.png",
  },
  hazmatsuit_scientist_arctic: {
    name: "Arctic Scientist Suit",
    shortname: "hazmatsuit_scientist_arctic",
    category: "attire",
    image: "/images/clothing/hazmatsuit_scientist_arctic.png",
  },
  hazmatsuit_scientist_nvgm: {
    name: "NVGM Scientist Suit",
    shortname: "hazmatsuit_scientist_nvgm",
    category: "attire",
    image: "/images/clothing/hazmatsuit_scientist_nvgm.png",
  },
  hazmatsuit_scientist_peacekeeper: {
    name: "Scientist Suit",
    shortname: "hazmatsuit_scientist_peacekeeper",
    category: "attire",
    image: "/images/clothing/hazmatsuit_scientist_peacekeeper.png",
  },
  "heavy.plate.helmet": {
    name: "Heavy Plate Helmet",
    shortname: "heavy.plate.helmet",
    category: "attire",
    image: "/images/clothing/heavy.plate.helmet.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "sheetmetal",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 4,
        },
      ],
    },
  },
  "heavy.plate.jacket": {
    name: "Heavy Plate Jacket",
    shortname: "heavy.plate.jacket",
    category: "attire",
    image: "/images/clothing/heavy.plate.jacket.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "sheetmetal",
          amount: 2,
        },
        {
          shortname: "metal.refined",
          amount: 4,
        },
      ],
    },
  },
  "heavy.plate.pants": {
    name: "Heavy Plate Pants",
    shortname: "heavy.plate.pants",
    category: "attire",
    image: "/images/clothing/heavy.plate.pants.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "sheetmetal",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 4,
        },
      ],
    },
  },
  hoodie: {
    name: "Hoodie",
    shortname: "hoodie",
    category: "attire",
    image: "/images/clothing/hoodie.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 40,
        },
        {
          shortname: "sewingkit",
          amount: 1,
        },
      ],
    },
  },
  "horse.armor.roadsign": {
    name: "Roadsign Horse Armor",
    shortname: "horse.armor.roadsign",
    category: "attire",
    image: "/images/clothing/horse.armor.roadsign.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "roadsigns",
          amount: 4,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  "horse.armor.wood": {
    name: "Wooden Horse Armor",
    shortname: "horse.armor.wood",
    category: "attire",
    image: "/images/clothing/horse.armor.wood.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "rope",
          amount: 2,
        },
        {
          shortname: "wood",
          amount: 300,
        },
      ],
    },
  },
  "horse.costume": {
    name: "Horse Costume",
    shortname: "horse.costume",
    category: "attire",
    image: "/images/clothing/horse.costume.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  "horse.saddle.double": {
    name: "Double Horse Saddle",
    shortname: "horse.saddle.double",
    category: "attire",
    image: "/images/clothing/horse.saddle.double.png",
  },
  "horse.saddle.single": {
    name: "Single Horse Saddle",
    shortname: "horse.saddle.single",
    category: "attire",
    image: "/images/clothing/horse.saddle.single.png",
  },
  "horse.saddlebag": {
    name: "Saddle bag",
    shortname: "horse.saddlebag",
    category: "attire",
    image: "/images/clothing/horse.saddlebag.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 20,
        },
      ],
    },
  },
  "horse.shoes.advanced": {
    name: "High Quality Horse Shoes",
    shortname: "horse.shoes.advanced",
    category: "attire",
    image: "/images/clothing/horse.shoes.advanced.png",
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
  "horse.shoes.basic": {
    name: "Basic Horse Shoes",
    shortname: "horse.shoes.basic",
    category: "attire",
    image: "/images/clothing/horse.shoes.basic.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  jacket: {
    name: "Jacket",
    shortname: "jacket",
    category: "attire",
    image: "/images/clothing/jacket.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 50,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  "jacket.snow": {
    name: "Snow Jacket",
    shortname: "jacket.snow",
    category: "attire",
    image: "/images/clothing/jacket.snow.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 60,
        },
        {
          shortname: "sewingkit",
          amount: 1,
        },
      ],
    },
  },
  "jumpsuit.suit": {
    name: "Jumpsuit",
    shortname: "jumpsuit.suit",
    category: "attire",
    image: "/images/clothing/jumpsuit.suit.png",
  },
  "jumpsuit.suit.blue": {
    name: "Blue Jumpsuit",
    shortname: "jumpsuit.suit.blue",
    category: "attire",
    image: "/images/clothing/jumpsuit.suit.blue.png",
  },
  "jumpsuit.waterwellnpc": {
    name: "Waterwell NPC Jumpsuit",
    shortname: "jumpsuit.waterwellnpc",
    category: "attire",
    image: "/images/clothing/jumpsuit.waterwellnpc.png",
  },
  largebackpack: {
    name: "Large Backpack",
    shortname: "largebackpack",
    category: "attire",
    image: "/images/clothing/largebackpack.png",
  },
  "lumberjack hoodie": {
    name: "Lumberjack Hoodie",
    shortname: "lumberjack hoodie",
    category: "attire",
    image: "/images/clothing/lumberjack hoodie.png",
  },
  "mask.balaclava": {
    name: "Improvised Balaclava",
    shortname: "mask.balaclava",
    category: "attire",
    image: "/images/clothing/mask.balaclava.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
      ],
    },
  },
  "mask.bandana": {
    name: "Bandana Mask",
    shortname: "mask.bandana",
    category: "attire",
    image: "/images/clothing/mask.bandana.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 5,
        },
      ],
    },
  },
  "metal.facemask": {
    name: "Metal Facemask",
    shortname: "metal.facemask",
    category: "attire",
    image: "/images/clothing/metal.facemask.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 50,
        },
        {
          shortname: "metal.refined",
          amount: 15,
        },
        {
          shortname: "sewingkit",
          amount: 6,
        },
      ],
    },
  },
  "metal.plate.torso": {
    name: "Metal Chest Plate",
    shortname: "metal.plate.torso",
    category: "attire",
    image: "/images/clothing/metal.plate.torso.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 50,
        },
        {
          shortname: "metal.refined",
          amount: 18,
        },
        {
          shortname: "sewingkit",
          amount: 8,
        },
      ],
    },
  },
  "metal.shield": {
    name: "Metal Shield",
    shortname: "metal.shield",
    category: "attire",
    image: "/images/clothing/metal.shield.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 300,
        },
        {
          shortname: "leather",
          amount: 10,
        },
        {
          shortname: "cloth",
          amount: 50,
        },
      ],
    },
  },
  movembermoustache: {
    name: "Movember Moustache",
    shortname: "movembermoustache",
    category: "attire",
    image: "/images/clothing/movembermoustache.png",
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
  mummymask: {
    name: "Mummy Mask",
    shortname: "mummymask",
    category: "attire",
    image: "/images/clothing/mummymask.png",
  },
  nightvisiongoggles: {
    name: "Night Vision Goggles",
    shortname: "nightvisiongoggles",
    category: "attire",
    image: "/images/clothing/nightvisiongoggles.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 10,
        },
        {
          shortname: "techparts",
          amount: 2,
        },
      ],
    },
  },
  oubreak_scientist: {
    name: "Outbreak Scientist Suit",
    shortname: "oubreak_scientist",
    category: "attire",
    image: "/images/clothing/oubreak_scientist.png",
  },
  pants: {
    name: "Pants",
    shortname: "pants",
    category: "attire",
    image: "/images/clothing/pants.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 40,
        },
        {
          shortname: "sewingkit",
          amount: 1,
        },
      ],
    },
  },
  "pants.shorts": {
    name: "Shorts",
    shortname: "pants.shorts",
    category: "attire",
    image: "/images/clothing/pants.shorts.png",
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
  parachute: {
    name: "Parachute",
    shortname: "parachute",
    category: "attire",
    image: "/images/clothing/parachute.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "tarp",
          amount: 2,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
        {
          shortname: "cloth",
          amount: 50,
        },
      ],
    },
  },
  partyhat: {
    name: "Party Hat",
    shortname: "partyhat",
    category: "attire",
    image: "/images/clothing/partyhat.png",
  },
  prisonerhood: {
    name: "Prisoner Hood",
    shortname: "prisonerhood",
    category: "attire",
    image: "/images/clothing/prisonerhood.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
  "reinforced.wooden.shield": {
    name: "Reinforced Wooden Shield",
    shortname: "reinforced.wooden.shield",
    category: "attire",
    image: "/images/clothing/reinforced.wooden.shield.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "roadsigns",
          amount: 1,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "wood",
          amount: 200,
        },
      ],
    },
  },
  "riot.helmet": {
    name: "Riot Helmet",
    shortname: "riot.helmet",
    category: "attire",
    image: "/images/clothing/riot.helmet.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "roadsign.gloves": {
    name: "Roadsign Gloves",
    shortname: "roadsign.gloves",
    category: "attire",
    image: "/images/clothing/roadsign.gloves.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 20,
        },
        {
          shortname: "roadsigns",
          amount: 1,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  "roadsign.jacket": {
    name: "Road Sign Jacket",
    shortname: "roadsign.jacket",
    category: "attire",
    image: "/images/clothing/roadsign.jacket.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 20,
        },
        {
          shortname: "roadsigns",
          amount: 2,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  "roadsign.kilt": {
    name: "Road Sign Kilt",
    shortname: "roadsign.kilt",
    category: "attire",
    image: "/images/clothing/roadsign.kilt.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 10,
        },
        {
          shortname: "roadsigns",
          amount: 1,
        },
        {
          shortname: "sewingkit",
          amount: 2,
        },
      ],
    },
  },
  santabeard: {
    name: "Santa Beard",
    shortname: "santabeard",
    category: "attire",
    image: "/images/clothing/santabeard.png",
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
  santahat: {
    name: "Santa Hat",
    shortname: "santahat",
    category: "attire",
    image: "/images/clothing/santahat.png",
  },
  "scarecrow.suit": {
    name: "Scarecrow Suit",
    shortname: "scarecrow.suit",
    category: "attire",
    image: "/images/clothing/scarecrow.suit.png",
  },
  scarecrowhead: {
    name: "Scarecrow Wrap",
    shortname: "scarecrowhead",
    category: "attire",
    image: "/images/clothing/scarecrowhead.png",
  },
  scientistsuit_heavy: {
    name: "Heavy Scientist Suit",
    shortname: "scientistsuit_heavy",
    category: "attire",
    image: "/images/clothing/scientistsuit_heavy.png",
  },
  "shirt.collared": {
    name: "Shirt",
    shortname: "shirt.collared",
    category: "attire",
    image: "/images/clothing/shirt.collared.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
      ],
    },
  },
  "shirt.tanktop": {
    name: "Tank Top",
    shortname: "shirt.tanktop",
    category: "attire",
    image: "/images/clothing/shirt.tanktop.png",
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
  "shoes.boots": {
    name: "Boots",
    shortname: "shoes.boots",
    category: "attire",
    image: "/images/clothing/shoes.boots.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "leather",
          amount: 20,
        },
        {
          shortname: "metal.fragments",
          amount: 15,
        },
        {
          shortname: "sewingkit",
          amount: 1,
        },
      ],
    },
  },
  smallbackpack: {
    name: "Small Backpack",
    shortname: "smallbackpack",
    category: "attire",
    image: "/images/clothing/smallbackpack.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "sewingkit",
          amount: 5,
        },
        {
          shortname: "cloth",
          amount: 50,
        },
      ],
    },
  },
  "tactical.gloves": {
    name: "Tactical Gloves",
    shortname: "tactical.gloves",
    category: "attire",
    image: "/images/clothing/tactical.gloves.png",
  },
  tshirt: {
    name: "T-Shirt",
    shortname: "tshirt",
    category: "attire",
    image: "/images/clothing/tshirt.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 25,
        },
      ],
    },
  },
  "tshirt.long": {
    name: "Longsleeve T-Shirt",
    shortname: "tshirt.long",
    category: "attire",
    image: "/images/clothing/tshirt.long.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 30,
        },
      ],
    },
  },
  "twitch.headset": {
    name: "Headset",
    shortname: "twitch.headset",
    category: "attire",
    image: "/images/clothing/twitch.headset.png",
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
  twitchrivalsflag: {
    name: "Twitch Rivals Flag",
    shortname: "twitchrivalsflag",
    category: "attire",
    image: "/images/clothing/twitchrivalsflag.png",
  },
  twitchsunglasses: {
    name: "Purple Sunglasses",
    shortname: "twitchsunglasses",
    category: "attire",
    image: "/images/clothing/twitchsunglasses.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 30,
        },
      ],
    },
  },
  "wood.armor.helmet": {
    name: "Wood Armor Helmet",
    shortname: "wood.armor.helmet",
    category: "attire",
    image: "/images/clothing/wood.armor.helmet.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
        {
          shortname: "wood",
          amount: 150,
        },
      ],
    },
  },
  "wood.armor.jacket": {
    name: "Wood Chestplate",
    shortname: "wood.armor.jacket",
    category: "attire",
    image: "/images/clothing/wood.armor.jacket.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 20,
        },
        {
          shortname: "wood",
          amount: 250,
        },
      ],
    },
  },
  "wood.armor.pants": {
    name: "Wood Armor Pants",
    shortname: "wood.armor.pants",
    category: "attire",
    image: "/images/clothing/wood.armor.pants.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 15,
        },
        {
          shortname: "wood",
          amount: 150,
        },
      ],
    },
  },
  "woodarmor.gloves": {
    name: "Wood Armor Gloves",
    shortname: "woodarmor.gloves",
    category: "attire",
    image: "/images/clothing/woodarmor.gloves.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 15,
        },
      ],
    },
  },
  "wooden.shield": {
    name: "Wooden Shield",
    shortname: "wooden.shield",
    category: "attire",
    image: "/images/clothing/wooden.shield.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 250,
        },
        {
          shortname: "cloth",
          amount: 20,
        },
      ],
    },
  },
};
