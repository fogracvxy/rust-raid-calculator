import type { Item } from "../../types/item.types";

export type ElectricalItemCategory = "electrical";
export type ElectricalItemShortname =
  | "autoturret"
  | "ceilinglight"
  | "command.block"
  | "computerstation"
  | "electric.andswitch"
  | "electric.audioalarm"
  | "electric.battery.rechargable.large"
  | "electric.battery.rechargable.medium"
  | "electric.battery.rechargable.small"
  | "electric.blocker"
  | "electric.button"
  | "electric.cabletunnel"
  | "electric.counter"
  | "electric.digitalclock"
  | "electric.doorcontroller"
  | "electric.flasherlight"
  | "electric.fuelgenerator.small"
  | "electric.furnace"
  | "electric.generator.small"
  | "electric.hbhfsensor"
  | "electric.heater"
  | "electric.igniter"
  | "electric.laserdetector"
  | "electric.orswitch"
  | "electric.pressurepad"
  | "electric.random.switch"
  | "electric.rf.broadcaster"
  | "electric.rf.receiver"
  | "electric.seismicsensor"
  | "electric.simplelight"
  | "electric.sirenlight"
  | "electric.solarpanel.large"
  | "electric.splitter"
  | "electric.sprinkler"
  | "electric.switch"
  | "electric.teslacoil"
  | "electric.timer"
  | "electric.xorswitch"
  | "electrical.branch"
  | "electrical.combiner"
  | "electrical.memorycell"
  | "elevator"
  | "fluid.combiner"
  | "fluid.splitter"
  | "fluid.switch"
  | "fridge"
  | "generator.wind.scrap"
  | "hopper"
  | "hosetool"
  | "industrial.combiner"
  | "industrial.conveyor"
  | "industrial.crafter"
  | "industrial.splitter"
  | "industrial.wall.light"
  | "modularcarlift"
  | "pipetool"
  | "powered.water.purifier"
  | "ptz.cctv.camera"
  | "rf_pager"
  | "searchlight"
  | "sign.neon.125x125"
  | "sign.neon.125x215.animated"
  | "sign.neon.125x215"
  | "sign.neon.xl.animated"
  | "sign.neon.xl"
  | "smart.alarm"
  | "smart.switch"
  | "storage.monitor"
  | "storageadaptor"
  | "target.reactive"
  | "waterpump"
  | "wiretool"
  | "xmas.lightstring.advanced";

export const electricalItems: {
  [K in ElectricalItemShortname]: Item<K> & { category: ElectricalItemCategory };
} = {
  autoturret: {
    shortname: "autoturret",
    name: "Auto Turret",
    category: "electrical",
    image: "/images/electrical/autoturret.png",
    crafting: {
      yield: 1,
      workbenchLevel: 2,
      ingredients: [
        {
          shortname: "cctv.camera",
          amount: 1,
        },
        {
          shortname: "targeting.computer",
          amount: 1,
        },
        {
          shortname: "metal.refined",
          amount: 10,
        },
      ],
    },
  },
  ceilinglight: {
    name: "Ceiling Light",
    shortname: "ceilinglight",
    category: "electrical",
    image: "/images/electrical/ceilinglight.png",
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
  "command.block": {
    name: "Command Block",
    shortname: "command.block",
    category: "electrical",
    image: "/images/electrical/command.block.png",
  },
  computerstation: {
    name: "Computer Station",
    shortname: "computerstation",
    category: "electrical",
    image: "/images/electrical/computerstation.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "targeting.computer",
          amount: 1,
        },
        {
          shortname: "electric.rf.broadcaster",
          amount: 1,
        },
        {
          shortname: "electric.rf.receiver",
          amount: 1,
        },
      ],
    },
  },
  "electric.andswitch": {
    name: "AND Switch",
    shortname: "electric.andswitch",
    category: "electrical",
    image: "/images/electrical/electric.andswitch.png",
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
  "electric.audioalarm": {
    name: "Audio Alarm",
    shortname: "electric.audioalarm",
    category: "electrical",
    image: "/images/electrical/electric.audioalarm.png",
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
  "electric.battery.rechargable.large": {
    name: "Large Rechargeable Battery",
    shortname: "electric.battery.rechargable.large",
    category: "electrical",
    image: "/images/electrical/electric.battery.rechargable.large.png",
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
  "electric.battery.rechargable.medium": {
    name: "Medium Rechargeable Battery",
    shortname: "electric.battery.rechargable.medium",
    category: "electrical",
    image: "/images/electrical/electric.battery.rechargable.medium.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "electric.battery.rechargable.small": {
    name: "Small Rechargeable Battery",
    shortname: "electric.battery.rechargable.small",
    category: "electrical",
    image: "/images/electrical/electric.battery.rechargable.small.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
      ],
    },
  },
  "electric.blocker": {
    name: "Blocker",
    shortname: "electric.blocker",
    category: "electrical",
    image: "/images/electrical/electric.blocker.png",
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
  "electric.button": {
    name: "Button",
    shortname: "electric.button",
    category: "electrical",
    image: "/images/electrical/electric.button.png",
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
  "electric.cabletunnel": {
    name: "Cable Tunnel",
    shortname: "electric.cabletunnel",
    category: "electrical",
    image: "/images/electrical/electric.cabletunnel.png",
  },
  "electric.counter": {
    name: "Counter",
    shortname: "electric.counter",
    category: "electrical",
    image: "/images/electrical/electric.counter.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "electric.digitalclock": {
    name: "Digital Clock",
    shortname: "electric.digitalclock",
    category: "electrical",
    image: "/images/electrical/electric.digitalclock.png",
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
  "electric.doorcontroller": {
    name: "Door Controller",
    shortname: "electric.doorcontroller",
    category: "electrical",
    image: "/images/electrical/electric.doorcontroller.png",
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
  "electric.flasherlight": {
    name: "Flasher Light",
    shortname: "electric.flasherlight",
    category: "electrical",
    image: "/images/electrical/electric.flasherlight.png",
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
  "electric.fuelgenerator.small": {
    name: "Small Generator",
    shortname: "electric.fuelgenerator.small",
    category: "electrical",
    image: "/images/electrical/electric.fuelgenerator.small.png",
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
      ],
    },
  },
  "electric.furnace": {
    name: "Electric Furnace",
    shortname: "electric.furnace",
    category: "electrical",
    image: "/images/electrical/electric.furnace.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "metal.fragments",
          amount: 200,
        },
      ],
    },
  },
  "electric.generator.small": {
    name: "Test Generator",
    shortname: "electric.generator.small",
    category: "electrical",
    image: "/images/electrical/electric.generator.small.png",
  },
  "electric.hbhfsensor": {
    name: "HBHF Sensor",
    shortname: "electric.hbhfsensor",
    category: "electrical",
    image: "/images/electrical/electric.hbhfsensor.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "electric.heater": {
    name: "Electric Heater",
    shortname: "electric.heater",
    category: "electrical",
    image: "/images/electrical/electric.heater.png",
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
  "electric.igniter": {
    name: "Igniter",
    shortname: "electric.igniter",
    category: "electrical",
    image: "/images/electrical/electric.igniter.png",
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
  "electric.laserdetector": {
    name: "Laser Detector",
    shortname: "electric.laserdetector",
    category: "electrical",
    image: "/images/electrical/electric.laserdetector.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "electric.orswitch": {
    name: "OR Switch",
    shortname: "electric.orswitch",
    category: "electrical",
    image: "/images/electrical/electric.orswitch.png",
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
  "electric.pressurepad": {
    name: "Pressure Pad",
    shortname: "electric.pressurepad",
    category: "electrical",
    image: "/images/electrical/electric.pressurepad.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 150,
        },
        {
          shortname: "metalspring",
          amount: 1,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  "electric.random.switch": {
    name: "RAND Switch",
    shortname: "electric.random.switch",
    category: "electrical",
    image: "/images/electrical/electric.random.switch.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  "electric.rf.broadcaster": {
    name: "RF Broadcaster",
    shortname: "electric.rf.broadcaster",
    category: "electrical",
    image: "/images/electrical/electric.rf.broadcaster.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
      ],
    },
  },
  "electric.rf.receiver": {
    name: "RF Receiver",
    shortname: "electric.rf.receiver",
    category: "electrical",
    image: "/images/electrical/electric.rf.receiver.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
      ],
    },
  },
  "electric.seismicsensor": {
    name: "Seismic Sensor",
    shortname: "electric.seismicsensor",
    category: "electrical",
    image: "/images/electrical/electric.seismicsensor.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "electric.simplelight": {
    name: "Simple Light",
    shortname: "electric.simplelight",
    category: "electrical",
    image: "/images/electrical/electric.simplelight.png",
  },
  "electric.sirenlight": {
    name: "Siren Light",
    shortname: "electric.sirenlight",
    category: "electrical",
    image: "/images/electrical/electric.sirenlight.png",
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
  "electric.solarpanel.large": {
    name: "Large Solar Panel",
    shortname: "electric.solarpanel.large",
    category: "electrical",
    image: "/images/electrical/electric.solarpanel.large.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "electric.splitter": {
    name: "Splitter",
    shortname: "electric.splitter",
    category: "electrical",
    image: "/images/electrical/electric.splitter.png",
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
  "electric.sprinkler": {
    name: "Sprinkler",
    shortname: "electric.sprinkler",
    category: "electrical",
    image: "/images/electrical/electric.sprinkler.png",
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
  "electric.switch": {
    name: "Switch",
    shortname: "electric.switch",
    category: "electrical",
    image: "/images/electrical/electric.switch.png",
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
  "electric.teslacoil": {
    name: "Tesla Coil",
    shortname: "electric.teslacoil",
    category: "electrical",
    image: "/images/electrical/electric.teslacoil.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "electric.timer": {
    name: "Timer",
    shortname: "electric.timer",
    category: "electrical",
    image: "/images/electrical/electric.timer.png",
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
  "electric.xorswitch": {
    name: "XOR Switch",
    shortname: "electric.xorswitch",
    category: "electrical",
    image: "/images/electrical/electric.xorswitch.png",
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
  "electrical.branch": {
    name: "Electrical Branch",
    shortname: "electrical.branch",
    category: "electrical",
    image: "/images/electrical/electrical.branch.png",
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
  "electrical.combiner": {
    name: "Root Combiner",
    shortname: "electrical.combiner",
    category: "electrical",
    image: "/images/electrical/electrical.combiner.png",
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
  "electrical.memorycell": {
    name: "Memory Cell",
    shortname: "electrical.memorycell",
    category: "electrical",
    image: "/images/electrical/electrical.memorycell.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 75,
        },
      ],
    },
  },
  elevator: {
    name: "Elevator",
    shortname: "elevator",
    category: "electrical",
    image: "/images/electrical/elevator.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  "fluid.combiner": {
    name: "Fluid Combiner",
    shortname: "fluid.combiner",
    category: "electrical",
    image: "/images/electrical/fluid.combiner.png",
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
  "fluid.splitter": {
    name: "Fluid Splitter",
    shortname: "fluid.splitter",
    category: "electrical",
    image: "/images/electrical/fluid.splitter.png",
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
  "fluid.switch": {
    name: "Fluid Switch & Pump",
    shortname: "fluid.switch",
    category: "electrical",
    image: "/images/electrical/fluid.switch.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
      ],
    },
  },
  fridge: {
    name: "Fridge",
    shortname: "fridge",
    category: "electrical",
    image: "/images/electrical/fridge.png",
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
  "generator.wind.scrap": {
    name: "Wind Turbine",
    shortname: "generator.wind.scrap",
    category: "electrical",
    image: "/images/electrical/generator.wind.scrap.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 500,
        },
        {
          shortname: "metal.refined",
          amount: 10,
        },
        {
          shortname: "gears",
          amount: 3,
        },
        {
          shortname: "sheetmetal",
          amount: 3,
        },
      ],
    },
  },
  hopper: {
    name: "Hopper",
    shortname: "hopper",
    category: "electrical",
    image: "/images/electrical/hopper.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  hosetool: {
    name: "Hose Tool",
    shortname: "hosetool",
    category: "electrical",
    image: "/images/electrical/hosetool.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  "industrial.combiner": {
    name: "Industrial Combiner",
    shortname: "industrial.combiner",
    category: "electrical",
    image: "/images/electrical/industrial.combiner.png",
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
  "industrial.conveyor": {
    name: "Industrial Conveyor",
    shortname: "industrial.conveyor",
    category: "electrical",
    image: "/images/electrical/industrial.conveyor.png",
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
  "industrial.crafter": {
    name: "Industrial Crafter",
    shortname: "industrial.crafter",
    category: "electrical",
    image: "/images/electrical/industrial.crafter.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 2,
        },
      ],
    },
  },
  "industrial.splitter": {
    name: "Industrial Splitter",
    shortname: "industrial.splitter",
    category: "electrical",
    image: "/images/electrical/industrial.splitter.png",
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
  "industrial.wall.light": {
    name: "Industrial Wall Light",
    shortname: "industrial.wall.light",
    category: "electrical",
    image: "/images/electrical/industrial.wall.light.png",
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
  modularcarlift: {
    name: "Modular Car Lift",
    shortname: "modularcarlift",
    category: "electrical",
    image: "/images/electrical/modularcarlift.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  pipetool: {
    name: "Pipe Tool",
    shortname: "pipetool",
    category: "electrical",
    image: "/images/electrical/pipetool.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  "powered.water.purifier": {
    name: "Powered Water Purifier",
    shortname: "powered.water.purifier",
    category: "electrical",
    image: "/images/electrical/powered.water.purifier.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 300,
        },
        {
          shortname: "cloth",
          amount: 20,
        },
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  "ptz.cctv.camera": {
    name: "PTZ CCTV Camera",
    shortname: "ptz.cctv.camera",
    category: "electrical",
    image: "/images/electrical/ptz.cctv.camera.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "cctv.camera",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 150,
        },
      ],
    },
  },
  rf_pager: {
    name: "RF Pager",
    shortname: "rf_pager",
    category: "electrical",
    image: "/images/electrical/rf_pager.png",
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
  searchlight: {
    name: "Search Light",
    shortname: "searchlight",
    category: "electrical",
    image: "/images/electrical/searchlight.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 500,
        },
        {
          shortname: "metal.fragments",
          amount: 200,
        },
      ],
    },
  },
  "sign.neon.125x125": {
    name: "Small Neon Sign",
    shortname: "sign.neon.125x125",
    category: "electrical",
    image: "/images/electrical/sign.neon.125x125.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
      ],
    },
  },
  "sign.neon.125x215": {
    name: "Medium Neon Sign",
    shortname: "sign.neon.125x215",
    category: "electrical",
    image: "/images/electrical/sign.neon.125x215.png",
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
  "sign.neon.125x215.animated": {
    name: "Medium Animated Neon Sign",
    shortname: "sign.neon.125x215.animated",
    category: "electrical",
    image: "/images/electrical/sign.neon.125x215.animated.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 300,
        },
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  "sign.neon.xl": {
    name: "Large Neon Sign",
    shortname: "sign.neon.xl",
    category: "electrical",
    image: "/images/electrical/sign.neon.xl.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 250,
        },
      ],
    },
  },
  "sign.neon.xl.animated": {
    name: "Large Animated Neon Sign",
    shortname: "sign.neon.xl.animated",
    category: "electrical",
    image: "/images/electrical/sign.neon.xl.animated.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 350,
        },
        {
          shortname: "metal.refined",
          amount: 5,
        },
      ],
    },
  },
  "smart.alarm": {
    name: "Smart Alarm",
    shortname: "smart.alarm",
    category: "electrical",
    image: "/images/electrical/smart.alarm.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "smart.switch": {
    name: "Smart Switch",
    shortname: "smart.switch",
    category: "electrical",
    image: "/images/electrical/smart.switch.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  "storage.monitor": {
    name: "Storage Monitor",
    shortname: "storage.monitor",
    category: "electrical",
    image: "/images/electrical/storage.monitor.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 3,
        },
        {
          shortname: "techparts",
          amount: 1,
        },
      ],
    },
  },
  storageadaptor: {
    name: "Storage Adaptor",
    shortname: "storageadaptor",
    category: "electrical",
    image: "/images/electrical/storageadaptor.png",
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
  "target.reactive": {
    name: "Reactive Target",
    shortname: "target.reactive",
    category: "electrical",
    image: "/images/electrical/target.reactive.png",
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
          amount: 150,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  waterpump: {
    name: "Water Pump",
    shortname: "waterpump",
    category: "electrical",
    image: "/images/electrical/waterpump.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 250,
        },
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "gears",
          amount: 1,
        },
      ],
    },
  },
  wiretool: {
    name: "Wire Tool",
    shortname: "wiretool",
    category: "electrical",
    image: "/images/electrical/wiretool.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
      ],
    },
  },
  "xmas.lightstring.advanced": {
    name: "Deluxe Christmas Lights",
    shortname: "xmas.lightstring.advanced",
    category: "electrical",
    image: "/images/electrical/xmas.lightstring.advanced.png",
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
};
