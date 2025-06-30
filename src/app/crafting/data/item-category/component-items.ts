import type { Item } from "../../types/item.types";

export type ComponentItemCategory = "component";
export type ComponentItemShortname =
  | "aiming.module.mlrs"
  | "bleach"
  | "carburetor1"
  | "carburetor2"
  | "carburetor3"
  | "crankshaft1"
  | "crankshaft2"
  | "crankshaft3"
  | "ducttape"
  | "fuse"
  | "gears"
  | "glue"
  | "metalblade"
  | "metalpipe"
  | "metalspring"
  | "piston1"
  | "piston2"
  | "piston3"
  | "propanetank"
  | "riflebody"
  | "roadsigns"
  | "rope"
  | "semibody"
  | "sewingkit"
  | "sheetmetal"
  | "smgbody"
  | "sparkplug1"
  | "sparkplug2"
  | "sparkplug3"
  | "sticks"
  | "tarp"
  | "techparts"
  | "valve1"
  | "valve2"
  | "valve3"
  | "vehicle.1mod.cockpit"
  | "vehicle.1mod.cockpit.armored"
  | "vehicle.1mod.cockpit.with.engine"
  | "vehicle.1mod.engine"
  | "vehicle.1mod.flatbed"
  | "vehicle.1mod.passengers.armored"
  | "vehicle.1mod.rear.seats"
  | "vehicle.1mod.storage"
  | "vehicle.1mod.taxi"
  | "vehicle.2mod.camper"
  | "vehicle.2mod.flatbed"
  | "vehicle.2mod.fuel.tank"
  | "vehicle.2mod.passengers"
  | "weapon.mod.burstmodule";

export const componentItems: {
  [K in ComponentItemShortname]: Item<K> & { category: ComponentItemCategory };
} = {
  "aiming.module.mlrs": {
    name: "MLRS Aiming Module",
    shortname: "aiming.module.mlrs",
    category: "component",
    image: "/images/components/aiming.module.mlrs.png",
  },
  bleach: {
    name: "Bleach",
    shortname: "bleach",
    category: "component",
    image: "/images/components/bleach.png",
  },
  carburetor1: {
    name: "Low Quality Carburetor",
    shortname: "carburetor1",
    category: "component",
    image: "/images/components/carburetor1.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 40,
        },
      ],
    },
  },
  carburetor2: {
    name: "Medium Quality Carburetor",
    shortname: "carburetor2",
    category: "component",
    image: "/images/components/carburetor2.png",
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
  carburetor3: {
    name: "High Quality Carburetor",
    shortname: "carburetor3",
    category: "component",
    image: "/images/components/carburetor3.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 170,
        },
      ],
    },
  },
  crankshaft1: {
    name: "Low Quality Crankshaft",
    shortname: "crankshaft1",
    category: "component",
    image: "/images/components/crankshaft1.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
      ],
    },
  },
  crankshaft2: {
    name: "Medium Quality Crankshaft",
    shortname: "crankshaft2",
    category: "component",
    image: "/images/components/crankshaft2.png",
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
  crankshaft3: {
    name: "High Quality Crankshaft",
    shortname: "crankshaft3",
    category: "component",
    image: "/images/components/crankshaft3.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 120,
        },
      ],
    },
  },
  ducttape: {
    name: "Duct Tape",
    shortname: "ducttape",
    category: "component",
    image: "/images/components/ducttape.png",
  },
  fuse: {
    name: "Electric Fuse",
    shortname: "fuse",
    category: "component",
    image: "/images/components/fuse.png",
  },
  gears: {
    shortname: "gears",
    name: "Gears",
    category: "component",
    image: "/images/components/gears.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
        {
          shortname: "scrap",
          amount: 100,
        },
      ],
    },
  },
  glue: {
    name: "Glue",
    shortname: "glue",
    category: "component",
    image: "/images/components/glue.png",
  },
  metalblade: {
    name: "Metal Blade",
    shortname: "metalblade",
    category: "component",
    image: "/images/components/metalblade.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 30,
        },
        {
          shortname: "scrap",
          amount: 10,
        },
      ],
    },
  },
  metalpipe: {
    shortname: "metalpipe",
    name: "Metal Pipe",
    category: "component",
    image: "/images/components/metalpipe.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
        {
          shortname: "scrap",
          amount: 20,
        },
      ],
    },
  },
  metalspring: {
    shortname: "metalspring",
    name: "Metal Spring",
    category: "component",
    image: "/images/components/metalspring.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
        {
          shortname: "scrap",
          amount: 50,
        },
      ],
    },
  },
  piston1: {
    name: "Low Quality Pistons",
    shortname: "piston1",
    category: "component",
    image: "/images/components/piston1.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
      ],
    },
  },
  piston2: {
    name: "Medium Quality Pistons",
    shortname: "piston2",
    category: "component",
    image: "/images/components/piston2.png",
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
  piston3: {
    name: "High Quality Pistons",
    shortname: "piston3",
    category: "component",
    image: "/images/components/piston3.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 120,
        },
      ],
    },
  },
  propanetank: {
    shortname: "propanetank",
    name: "Empty Propane Tank",
    category: "component",
    image: "/images/components/propanetank.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "scrap",
          amount: 10,
        },
      ],
    },
  },
  riflebody: {
    name: "Rifle Body",
    shortname: "riflebody",
    category: "component",
    image: "/images/components/riflebody.png",
  },
  roadsigns: {
    name: "Road Signs",
    shortname: "roadsigns",
    category: "component",
    image: "/images/components/roadsigns.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 2,
        },
        {
          shortname: "scrap",
          amount: 20,
        },
      ],
    },
  },
  rope: {
    shortname: "rope",
    name: "Rope",
    category: "component",
    image: "/images/components/rope.png",
  },
  semibody: {
    shortname: "semibody",
    name: "Semi Automatic Body",
    category: "component",
    image: "/images/components/semibody.png",
  },
  sewingkit: {
    name: "Sewing Kit",
    shortname: "sewingkit",
    category: "component",
    image: "/images/components/sewingkit.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "cloth",
          amount: 20,
        },
        {
          shortname: "rope",
          amount: 3,
        },
      ],
    },
  },
  sheetmetal: {
    name: "Sheet Metal",
    shortname: "sheetmetal",
    category: "component",
    image: "/images/components/sheetmetal.png",
  },
  smgbody: {
    name: "SMG Body",
    shortname: "smgbody",
    category: "component",
    image: "/images/components/smgbody.png",
  },
  sparkplug1: {
    name: "Low Quality Spark Plugs",
    shortname: "sparkplug1",
    category: "component",
    image: "/images/components/sparkplug1.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
      ],
    },
  },
  sparkplug2: {
    name: "Medium Quality Spark Plugs",
    shortname: "sparkplug2",
    category: "component",
    image: "/images/components/sparkplug2.png",
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
  sparkplug3: {
    name: "High Quality Spark Plugs",
    shortname: "sparkplug3",
    category: "component",
    image: "/images/components/sparkplug3.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 120,
        },
      ],
    },
  },
  sticks: {
    name: "Sticks",
    shortname: "sticks",
    category: "component",
    image: "/images/components/sticks.png",
  },
  tarp: {
    name: "Tarp",
    shortname: "tarp",
    category: "component",
    image: "/images/components/tarp.png",
  },
  techparts: {
    shortname: "techparts",
    name: "Tech Trash",
    category: "component",
    image: "/images/components/techparts.png",
  },
  valve1: {
    name: "Low Quality Valves",
    shortname: "valve1",
    category: "component",
    image: "/images/components/valve1.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 25,
        },
      ],
    },
  },
  valve2: {
    name: "Medium Quality Valves",
    shortname: "valve2",
    category: "component",
    image: "/images/components/valve2.png",
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
  valve3: {
    name: "High Quality Valves",
    shortname: "valve3",
    category: "component",
    image: "/images/components/valve3.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 120,
        },
      ],
    },
  },
  "vehicle.1mod.cockpit": {
    name: "Cockpit Vehicle Module",
    shortname: "vehicle.1mod.cockpit",
    category: "component",
    image: "/images/components/vehicle.1mod.cockpit.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  "vehicle.1mod.cockpit.armored": {
    name: "Armored Cockpit Vehicle Module",
    shortname: "vehicle.1mod.cockpit.armored",
    category: "component",
    image: "/images/components/vehicle.1mod.cockpit.armored.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
        {
          shortname: "metal.refined",
          amount: 5,
        },
      ],
    },
  },
  "vehicle.1mod.cockpit.with.engine": {
    name: "Cockpit With Engine Vehicle Module",
    shortname: "vehicle.1mod.cockpit.with.engine",
    category: "component",
    image: "/images/components/vehicle.1mod.cockpit.with.engine.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
        {
          shortname: "metal.refined",
          amount: 5,
        },
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  "vehicle.1mod.engine": {
    name: "Engine Vehicle Module",
    shortname: "vehicle.1mod.engine",
    category: "component",
    image: "/images/components/vehicle.1mod.engine.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 100,
        },
        {
          shortname: "metal.refined",
          amount: 3,
        },
      ],
    },
  },
  "vehicle.1mod.flatbed": {
    name: "Flatbed Vehicle Module",
    shortname: "vehicle.1mod.flatbed",
    category: "component",
    image: "/images/components/vehicle.1mod.flatbed.png",
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
          amount: 100,
        },
      ],
    },
  },
  "vehicle.1mod.passengers.armored": {
    name: "Armored Passenger Vehicle Module",
    shortname: "vehicle.1mod.passengers.armored",
    category: "component",
    image: "/images/components/vehicle.1mod.passengers.armored.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
        {
          shortname: "metal.refined",
          amount: 5,
        },
      ],
    },
  },
  "vehicle.1mod.rear.seats": {
    name: "Rear Seats Vehicle Module",
    shortname: "vehicle.1mod.rear.seats",
    category: "component",
    image: "/images/components/vehicle.1mod.rear.seats.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  "vehicle.1mod.storage": {
    name: "Storage Vehicle Module",
    shortname: "vehicle.1mod.storage",
    category: "component",
    image: "/images/components/vehicle.1mod.storage.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 50,
        },
        {
          shortname: "wood",
          amount: 125,
        },
      ],
    },
  },
  "vehicle.1mod.taxi": {
    name: "Taxi Vehicle Module",
    shortname: "vehicle.1mod.taxi",
    category: "component",
    image: "/images/components/vehicle.1mod.taxi.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 175,
        },
        {
          shortname: "wood",
          amount: 125,
        },
        {
          shortname: "metal.refined",
          amount: 5,
        },
      ],
    },
  },
  "vehicle.2mod.camper": {
    name: "Camper Vehicle Module",
    shortname: "vehicle.2mod.camper",
    category: "component",
    image: "/images/components/vehicle.2mod.camper.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 175,
        },
        {
          shortname: "wood",
          amount: 125,
        },
      ],
    },
  },
  "vehicle.2mod.flatbed": {
    name: "Large Flatbed Vehicle Module",
    shortname: "vehicle.2mod.flatbed",
    category: "component",
    image: "/images/components/vehicle.2mod.flatbed.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 150,
        },
        {
          shortname: "wood",
          amount: 150,
        },
      ],
    },
  },
  "vehicle.2mod.fuel.tank": {
    name: "Fuel Tank Vehicle Module",
    shortname: "vehicle.2mod.fuel.tank",
    category: "component",
    image: "/images/components/vehicle.2mod.fuel.tank.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 175,
        },
        {
          shortname: "wood",
          amount: 100,
        },
      ],
    },
  },
  "vehicle.2mod.passengers": {
    name: "Passenger Vehicle Module",
    shortname: "vehicle.2mod.passengers",
    category: "component",
    image: "/images/components/vehicle.2mod.passengers.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 175,
        },
        {
          shortname: "wood",
          amount: 125,
        },
      ],
    },
  },
  "weapon.mod.burstmodule": {
    name: "Burst Module",
    shortname: "weapon.mod.burstmodule",
    category: "component",
    image: "/images/components/weapon.mod.burstmodule.png",
  },
};
