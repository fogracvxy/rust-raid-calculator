import type { Item } from "../../types/item.types";

export type FunItemCategory = "fun";
export type FunItemShortname =
  | "abovegroundpool"
  | "beachchair"
  | "beachparasol"
  | "beachtable"
  | "beachtowel"
  | "boogieboard"
  | "boombox"
  | "cassette"
  | "cassette.medium"
  | "cassette.short"
  | "confetticannon"
  | "connected.speaker"
  | "discoball"
  | "discofloor"
  | "drumkit"
  | "firework.boomer.blue"
  | "firework.boomer.champagne"
  | "firework.boomer.green"
  | "firework.boomer.orange"
  | "firework.boomer.pattern"
  | "firework.boomer.red"
  | "firework.boomer.violet"
  | "firework.romancandle.blue"
  | "firework.romancandle.green"
  | "firework.romancandle.red"
  | "firework.romancandle.violet"
  | "firework.volcano"
  | "firework.volcano.red"
  | "firework.volcano.violet"
  | "fun.bass"
  | "fun.boomboxportable"
  | "fun.casetterecorder"
  | "fun.cowbell"
  | "fun.flute"
  | "fun.guitar"
  | "fun.jerrycanguitar"
  | "fun.tambourine"
  | "fun.trumpet"
  | "fun.tuba"
  | "innertube"
  | "laserlight"
  | "lunar.firecrackers"
  | "megaphone"
  | "microphonestand"
  | "mobilephone"
  | "newyeargong"
  | "paddlingpool"
  | "piano"
  | "pinata"
  | "skull.trophy"
  | "skullspikes"
  | "skylantern"
  | "sled"
  | "soundlight"
  | "telephone"
  | "vehicle.car_radio"
  | "wrappedgift"
  | "wrappingpaper"
  | "xylophone";

export const funItems: {
  [K in FunItemShortname]: Item<K> & { category: FunItemCategory };
} = {
  abovegroundpool: {
    name: "Above Ground Pool",
    shortname: "abovegroundpool",
    category: "fun",
    image: "/images/fun/abovegroundpool.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "tarp",
          amount: 3,
        },
        {
          shortname: "wood",
          amount: 500,
        },
      ],
    },
  },
  beachchair: {
    name: "Beach Chair",
    shortname: "beachchair",
    category: "fun",
    image: "/images/fun/beachchair.png",
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
  beachparasol: {
    name: "Beach Parasol",
    shortname: "beachparasol",
    category: "fun",
    image: "/images/fun/beachparasol.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 20,
        },
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  beachtable: {
    name: "Beach Table",
    shortname: "beachtable",
    category: "fun",
    image: "/images/fun/beachtable.png",
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
  beachtowel: {
    name: "Beach Towel",
    shortname: "beachtowel",
    category: "fun",
    image: "/images/fun/beachtowel.png",
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
  boogieboard: {
    name: "Boogie Board",
    shortname: "boogieboard",
    category: "fun",
    image: "/images/fun/boogieboard.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
  boombox: {
    name: "Boom Box",
    shortname: "boombox",
    category: "fun",
    image: "/images/fun/boombox.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
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
  cassette: {
    name: "Cassette - Long",
    shortname: "cassette",
    category: "fun",
    image: "/images/fun/cassette.png",
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
  "cassette.medium": {
    name: "Cassette - Medium",
    shortname: "cassette.medium",
    category: "fun",
    image: "/images/fun/cassette.medium.png",
    crafting: {
      yield: 3,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "cassette.short": {
    name: "Cassette - Short",
    shortname: "cassette.short",
    category: "fun",
    image: "/images/fun/cassette.short.png",
    crafting: {
      yield: 5,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  confetticannon: {
    name: "Confetti Cannon",
    shortname: "confetticannon",
    category: "fun",
    image: "/images/fun/confetticannon.png",
  },
  "connected.speaker": {
    name: "Connected Speaker",
    shortname: "connected.speaker",
    category: "fun",
    image: "/images/fun/connected.speaker.png",
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
  discoball: {
    name: "Disco Ball",
    shortname: "discoball",
    category: "fun",
    image: "/images/fun/discoball.png",
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
  discofloor: {
    name: "Disco Floor",
    shortname: "discofloor",
    category: "fun",
    image: "/images/fun/discofloor.png",
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
  drumkit: {
    name: "Junkyard Drum Kit",
    shortname: "drumkit",
    category: "fun",
    image: "/images/fun/drumkit.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  "firework.boomer.blue": {
    name: "Blue Boomer",
    shortname: "firework.boomer.blue",
    category: "fun",
    image: "/images/fun/firework.boomer.blue.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
        {
          shortname: "lowgradefuel",
          amount: 15,
        },
      ],
    },
  },
  "firework.boomer.champagne": {
    name: "Champagne Boomer",
    shortname: "firework.boomer.champagne",
    category: "fun",
    image: "/images/fun/firework.boomer.champagne.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 30,
        },
        {
          shortname: "gunpowder",
          amount: 75,
        },
        {
          shortname: "lowgradefuel",
          amount: 30,
        },
      ],
    },
  },
  "firework.boomer.green": {
    name: "Green Boomer",
    shortname: "firework.boomer.green",
    category: "fun",
    image: "/images/fun/firework.boomer.green.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
        {
          shortname: "lowgradefuel",
          amount: 15,
        },
      ],
    },
  },
  "firework.boomer.orange": {
    name: "Orange Boomer",
    shortname: "firework.boomer.orange",
    category: "fun",
    image: "/images/fun/firework.boomer.orange.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
        {
          shortname: "lowgradefuel",
          amount: 15,
        },
      ],
    },
  },
  "firework.boomer.pattern": {
    name: "Pattern Boomer",
    shortname: "firework.boomer.pattern",
    category: "fun",
    image: "/images/fun/firework.boomer.pattern.png",
    crafting: {
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
        {
          shortname: "lowgradefuel",
          amount: 15,
        },
      ],
    },
  },
  "firework.boomer.red": {
    name: "Red Boomer",
    shortname: "firework.boomer.red",
    category: "fun",
    image: "/images/fun/firework.boomer.red.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
        {
          shortname: "lowgradefuel",
          amount: 15,
        },
      ],
    },
  },
  "firework.boomer.violet": {
    name: "Violet Boomer",
    shortname: "firework.boomer.violet",
    category: "fun",
    image: "/images/fun/firework.boomer.violet.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "gunpowder",
          amount: 30,
        },
        {
          shortname: "lowgradefuel",
          amount: 15,
        },
      ],
    },
  },
  "firework.romancandle.blue": {
    name: "Blue Roman Candle",
    shortname: "firework.romancandle.blue",
    category: "fun",
    image: "/images/fun/firework.romancandle.blue.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 10,
        },
      ],
    },
  },
  "firework.romancandle.green": {
    name: "Green Roman Candle",
    shortname: "firework.romancandle.green",
    category: "fun",
    image: "/images/fun/firework.romancandle.green.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 10,
        },
      ],
    },
  },
  "firework.romancandle.red": {
    name: "Red Roman Candle",
    shortname: "firework.romancandle.red",
    category: "fun",
    image: "/images/fun/firework.romancandle.red.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 10,
        },
      ],
    },
  },
  "firework.romancandle.violet": {
    name: "Violet Roman Candle",
    shortname: "firework.romancandle.violet",
    category: "fun",
    image: "/images/fun/firework.romancandle.violet.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "lowgradefuel",
          amount: 10,
        },
      ],
    },
  },
  "firework.volcano": {
    name: "White Volcano Firework",
    shortname: "firework.volcano",
    category: "fun",
    image: "/images/fun/firework.volcano.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 20,
        },
        {
          shortname: "gunpowder",
          amount: 15,
        },
      ],
    },
  },
  "firework.volcano.red": {
    name: "Red Volcano Firework",
    shortname: "firework.volcano.red",
    category: "fun",
    image: "/images/fun/firework.volcano.red.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 20,
        },
        {
          shortname: "gunpowder",
          amount: 15,
        },
      ],
    },
  },
  "firework.volcano.violet": {
    name: "Violet Volcano Firework",
    shortname: "firework.volcano.violet",
    category: "fun",
    image: "/images/fun/firework.volcano.violet.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 20,
        },
        {
          shortname: "gunpowder",
          amount: 15,
        },
      ],
    },
  },
  "fun.bass": {
    name: "Shovel Bass",
    shortname: "fun.bass",
    category: "fun",
    image: "/images/fun/fun.bass.png",
    crafting: {
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
  "fun.boomboxportable": {
    name: "Portable Boom Box",
    shortname: "fun.boomboxportable",
    category: "fun",
    image: "/images/fun/fun.boomboxportable.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 120,
        },
      ],
    },
  },
  "fun.casetterecorder": {
    name: "Cassette Recorder",
    shortname: "fun.casetterecorder",
    category: "fun",
    image: "/images/fun/fun.casetterecorder.png",
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
  "fun.cowbell": {
    name: "Cowbell",
    shortname: "fun.cowbell",
    category: "fun",
    image: "/images/fun/fun.cowbell.png",
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
  "fun.flute": {
    name: "Pan Flute",
    shortname: "fun.flute",
    category: "fun",
    image: "/images/fun/fun.flute.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 20,
        },
        {
          shortname: "cloth",
          amount: 5,
        },
      ],
    },
  },
  "fun.guitar": {
    name: "Acoustic Guitar",
    shortname: "fun.guitar",
    category: "fun",
    image: "/images/fun/fun.guitar.png",
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
  "fun.jerrycanguitar": {
    name: "Jerry Can Guitar",
    shortname: "fun.jerrycanguitar",
    category: "fun",
    image: "/images/fun/fun.jerrycanguitar.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 25,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "fun.tambourine": {
    name: "Canbourine",
    shortname: "fun.tambourine",
    category: "fun",
    image: "/images/fun/fun.tambourine.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
      ],
    },
  },
  "fun.trumpet": {
    name: "Plumber's Trumpet",
    shortname: "fun.trumpet",
    category: "fun",
    image: "/images/fun/fun.trumpet.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "fun.tuba": {
    name: "Sousaphone",
    shortname: "fun.tuba",
    category: "fun",
    image: "/images/fun/fun.tuba.png",
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
  innertube: {
    name: "Inner Tube",
    shortname: "innertube",
    category: "fun",
    image: "/images/fun/innertube.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
  laserlight: {
    name: "Laser Light",
    shortname: "laserlight",
    category: "fun",
    image: "/images/fun/laserlight.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  "lunar.firecrackers": {
    name: "Firecracker String",
    shortname: "lunar.firecrackers",
    category: "fun",
    image: "/images/fun/lunar.firecrackers.png",
  },
  megaphone: {
    name: "Megaphone",
    shortname: "megaphone",
    category: "fun",
    image: "/images/fun/megaphone.png",
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
  microphonestand: {
    name: "Microphone Stand",
    shortname: "microphonestand",
    category: "fun",
    image: "/images/fun/microphonestand.png",
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
  mobilephone: {
    name: "Mobile Phone",
    shortname: "mobilephone",
    category: "fun",
    image: "/images/fun/mobilephone.png",
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
  newyeargong: {
    name: "New Year Gong",
    shortname: "newyeargong",
    category: "fun",
    image: "/images/fun/newyeargong.png",
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
  paddlingpool: {
    name: "Paddling Pool",
    shortname: "paddlingpool",
    category: "fun",
    image: "/images/fun/paddlingpool.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 100,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
  piano: {
    name: "Wheelbarrow Piano",
    shortname: "piano",
    category: "fun",
    image: "/images/fun/piano.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 200,
        },
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  pinata: {
    name: "Pinata",
    shortname: "pinata",
    category: "fun",
    image: "/images/fun/pinata.png",
  },
  "skull.trophy": {
    name: "Skull Trophy",
    shortname: "skull.trophy",
    category: "fun",
    image: "/images/fun/skull.trophy.png",
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
  skullspikes: {
    name: "Skull Spikes",
    shortname: "skullspikes",
    category: "fun",
    image: "/images/fun/skullspikes.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
        {
          shortname: "skull.human",
          amount: 1,
        },
      ],
    },
  },
  skylantern: {
    name: "Sky Lantern",
    shortname: "skylantern",
    category: "fun",
    image: "/images/fun/skylantern.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 10,
        },
        {
          shortname: "lowgradefuel",
          amount: 5,
        },
      ],
    },
  },
  sled: {
    name: "Sled",
    shortname: "sled",
    category: "fun",
    image: "/images/fun/sled.png",
  },
  soundlight: {
    name: "Sound Light",
    shortname: "soundlight",
    category: "fun",
    image: "/images/fun/soundlight.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
      ],
    },
  },
  telephone: {
    name: "Telephone",
    shortname: "telephone",
    category: "fun",
    image: "/images/fun/telephone.png",
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
          amount: 100,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "vehicle.car_radio": {
    name: "Car Radio",
    shortname: "vehicle.car_radio",
    category: "fun",
    image: "/images/fun/vehicle.car_radio.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 120,
        },
      ],
    },
  },
  wrappedgift: {
    name: "Wrapped Gift",
    shortname: "wrappedgift",
    category: "fun",
    image: "/images/fun/wrappedgift.png",
  },
  wrappingpaper: {
    name: "Wrapping Paper",
    shortname: "wrappingpaper",
    category: "fun",
    image: "/images/fun/wrappingpaper.png",
  },
  xylophone: {
    name: "Xylobone",
    shortname: "xylophone",
    category: "fun",
    image: "/images/fun/xylophone.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "bone.fragments",
          amount: 50,
        },
      ],
    },
  },
};
