import type { Item } from "../../types/item.types";

export type ConstructionItemCategory = "construction";
export type ConstructionItemShortname =
  | "barricade.concrete"
  | "barricade.medieval"
  | "barricade.metal"
  | "barricade.sandbags"
  | "barricade.stone"
  | "barricade.wood"
  | "barricade.wood.cover"
  | "barricade.woodwire"
  | "beehive"
  | "building.planner"
  | "cupboard.tool"
  | "door.closer"
  | "door.double.hinged.bardoors"
  | "door.double.hinged.metal"
  | "door.double.hinged.toptier"
  | "door.double.hinged.wood"
  | "door.hinged.metal"
  | "door.hinged.toptier"
  | "door.hinged.wood"
  | "floor.grill"
  | "floor.ladder.hatch"
  | "floor.triangle.grill"
  | "floor.triangle.ladder.hatch"
  | "gates.external.high.stone"
  | "gates.external.high.wood"
  | "ladder.wooden.wall"
  | "legacy.shelter.wood"
  | "lock.code"
  | "lock.key"
  | "mining.pumpjack"
  | "mining.quarry"
  | "shutter.metal.embrasure.a"
  | "shutter.metal.embrasure.b"
  | "shutter.wood.a"
  | "wall.external.high"
  | "wall.external.high.ice"
  | "wall.external.high.stone"
  | "wall.frame.cell"
  | "wall.frame.cell.gate"
  | "wall.frame.fence"
  | "wall.frame.fence.gate"
  | "wall.frame.garagedoor"
  | "wall.frame.lunar2025_a"
  | "wall.frame.netting"
  | "wall.frame.shopfront"
  | "wall.frame.shopfront.metal"
  | "wall.ice.wall"
  | "wall.window.bars.metal"
  | "wall.window.bars.toptier"
  | "wall.window.bars.wood"
  | "wall.window.glass.reinforced"
  | "watchtower.wood"
  | "water.catcher.large"
  | "water.catcher.small";

export const constructionItems: {
  [K in ConstructionItemShortname]: Item<K> & { category: ConstructionItemCategory };
} = {
  "barricade.concrete": {
    name: "Concrete Barricade",
    shortname: "barricade.concrete",
    category: "construction",
    image: "/images/construction/barricade.concrete.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 200,
        },
      ],
    },
  },
  "barricade.medieval": {
    name: "Medieval Barricade",
    shortname: "barricade.medieval",
    category: "construction",
    image: "/images/construction/barricade.medieval.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
      ],
    },
  },
  "barricade.metal": {
    name: "Metal Barricade",
    shortname: "barricade.metal",
    category: "construction",
    image: "/images/construction/barricade.metal.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
        {
          shortname: "metalblade",
          amount: 2,
        },
      ],
    },
  },
  "barricade.sandbags": {
    name: "Sandbag Barricade",
    shortname: "barricade.sandbags",
    category: "construction",
    image: "/images/construction/barricade.sandbags.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 100,
        },
        {
          shortname: "cloth",
          amount: 10,
        },
      ],
    },
  },
  "barricade.stone": {
    name: "Stone Barricade",
    shortname: "barricade.stone",
    category: "construction",
    image: "/images/construction/barricade.stone.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 100,
        },
      ],
    },
  },
  "barricade.wood": {
    name: "Wooden Barricade",
    shortname: "barricade.wood",
    category: "construction",
    image: "/images/construction/barricade.wood.png",
    crafting: {
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
      ],
    },
  },
  "barricade.wood.cover": {
    name: "Wooden Barricade Cover",
    shortname: "barricade.wood.cover",
    category: "construction",
    image: "/images/construction/barricade.wood.cover.png",
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
  "barricade.woodwire": {
    name: "Barbed Wooden Barricade",
    shortname: "barricade.woodwire",
    category: "construction",
    image: "/images/construction/barricade.woodwire.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "metal.fragments",
          amount: 50,
        },
        {
          shortname: "rope",
          amount: 1,
        },
      ],
    },
  },
  beehive: {
    name: "Beehive",
    shortname: "beehive",
    category: "construction",
    image: "/images/construction/beehive.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
        {
          shortname: "sheetmetal",
          amount: 1,
        },
      ],
    },
  },
  "building.planner": {
    name: "Building Plan",
    shortname: "building.planner",
    category: "construction",
    image: "/images/construction/building.planner.png",
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
  "cupboard.tool": {
    name: "Tool Cupboard",
    shortname: "cupboard.tool",
    category: "construction",
    image: "/images/construction/cupboard.tool.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 1000,
        },
      ],
    },
  },
  "door.closer": {
    name: "Door Closer",
    shortname: "door.closer",
    category: "construction",
    image: "/images/construction/door.closer.png",
  },
  "door.double.hinged.bardoors": {
    name: "Wooden Frontier Bar Doors",
    shortname: "door.double.hinged.bardoors",
    category: "construction",
    image: "/images/construction/door.double.hinged.bardoors.png",
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
  "door.double.hinged.metal": {
    name: "Sheet Metal Double Door",
    shortname: "door.double.hinged.metal",
    category: "construction",
    image: "/images/construction/door.double.hinged.metal.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 200,
        },
      ],
    },
  },
  "door.double.hinged.toptier": {
    name: "Armored Double Door",
    shortname: "door.double.hinged.toptier",
    category: "construction",
    image: "/images/construction/door.double.hinged.toptier.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 25,
        },
        {
          shortname: "gears",
          amount: 5,
        },
      ],
    },
  },
  "door.double.hinged.wood": {
    name: "Wood Double Door",
    shortname: "door.double.hinged.wood",
    category: "construction",
    image: "/images/construction/door.double.hinged.wood.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 350,
        },
      ],
    },
  },
  "door.hinged.metal": {
    name: "Sheet Metal Door",
    shortname: "door.hinged.metal",
    category: "construction",
    image: "/images/construction/door.hinged.metal.png",
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
  "door.hinged.toptier": {
    name: "Armored Door",
    shortname: "door.hinged.toptier",
    category: "construction",
    image: "/images/construction/door.hinged.toptier.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 20,
        },
        {
          shortname: "gears",
          amount: 5,
        },
      ],
    },
  },
  "door.hinged.wood": {
    name: "Wooden Door",
    shortname: "door.hinged.wood",
    category: "construction",
    image: "/images/construction/door.hinged.wood.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 300,
        },
      ],
    },
  },
  "floor.grill": {
    name: "Floor grill",
    shortname: "floor.grill",
    category: "construction",
    image: "/images/construction/floor.grill.png",
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
  "floor.ladder.hatch": {
    name: "Ladder Hatch",
    shortname: "floor.ladder.hatch",
    category: "construction",
    image: "/images/construction/floor.ladder.hatch.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "ladder.wooden.wall",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 300,
        },
        {
          shortname: "gears",
          amount: 3,
        },
      ],
    },
  },
  "floor.triangle.grill": {
    name: "Floor triangle grill",
    shortname: "floor.triangle.grill",
    category: "construction",
    image: "/images/construction/floor.triangle.grill.png",
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
  "floor.triangle.ladder.hatch": {
    name: "Triangle Ladder Hatch",
    shortname: "floor.triangle.ladder.hatch",
    category: "construction",
    image: "/images/construction/floor.triangle.ladder.hatch.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "ladder.wooden.wall",
          amount: 1,
        },
        {
          shortname: "metal.fragments",
          amount: 300,
        },
        {
          shortname: "gears",
          amount: 3,
        },
      ],
    },
  },
  "gates.external.high.stone": {
    name: "High External Stone Gate",
    shortname: "gates.external.high.stone",
    category: "construction",
    image: "/images/construction/gates.external.high.stone.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 3000,
        },
        {
          shortname: "gears",
          amount: 5,
        },
      ],
    },
  },
  "gates.external.high.wood": {
    name: "High External Wooden Gate",
    shortname: "gates.external.high.wood",
    category: "construction",
    image: "/images/construction/gates.external.high.wood.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 3000,
        },
        {
          shortname: "gears",
          amount: 2,
        },
      ],
    },
  },
  "ladder.wooden.wall": {
    name: "Wooden Ladder",
    shortname: "ladder.wooden.wall",
    category: "construction",
    image: "/images/construction/ladder.wooden.wall.png",
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
          amount: 3,
        },
      ],
    },
  },
  "legacy.shelter.wood": {
    name: "Legacy Wood Shelter",
    shortname: "legacy.shelter.wood",
    category: "construction",
    image: "/images/construction/legacy.shelter.wood.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 600,
        },
      ],
    },
  },
  "lock.code": {
    name: "Code Lock",
    shortname: "lock.code",
    category: "construction",
    image: "/images/construction/lock.code.png",
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
  "lock.key": {
    name: "Key Lock",
    shortname: "lock.key",
    category: "construction",
    image: "/images/construction/lock.key.png",
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
  "mining.pumpjack": {
    name: "Pump Jack",
    shortname: "mining.pumpjack",
    category: "construction",
    image: "/images/construction/mining.pumpjack.png",
  },
  "mining.quarry": {
    name: "Mining Quarry",
    shortname: "mining.quarry",
    category: "construction",
    image: "/images/construction/mining.quarry.png",
  },
  "shutter.metal.embrasure.a": {
    name: "Metal horizontal embrasure",
    shortname: "shutter.metal.embrasure.a",
    category: "construction",
    image: "/images/construction/shutter.metal.embrasure.a.png",
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
  "shutter.metal.embrasure.b": {
    name: "Metal Vertical embrasure",
    shortname: "shutter.metal.embrasure.b",
    category: "construction",
    image: "/images/construction/shutter.metal.embrasure.b.png",
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
  "shutter.wood.a": {
    name: "Wood Shutters",
    shortname: "shutter.wood.a",
    category: "construction",
    image: "/images/construction/shutter.wood.a.png",
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
  "wall.external.high": {
    name: "High External Wooden Wall",
    shortname: "wall.external.high",
    category: "construction",
    image: "/images/construction/wall.external.high.png",
    crafting: {
      workbenchLevel: 1,
      yield: 3,
      ingredients: [
        {
          shortname: "wood",
          amount: 4000,
        },
      ],
    },
  },
  "wall.external.high.ice": {
    name: "High Ice Wall",
    shortname: "wall.external.high.ice",
    category: "construction",
    image: "/images/construction/wall.external.high.ice.png",
    crafting: {
      workbenchLevel: 2,
      yield: 3,
      ingredients: [
        {
          shortname: "stones",
          amount: 3000,
        },
      ],
    },
  },
  "wall.external.high.stone": {
    name: "High External Stone Wall",
    shortname: "wall.external.high.stone",
    category: "construction",
    image: "/images/construction/wall.external.high.stone.png",
    crafting: {
      workbenchLevel: 2,
      yield: 3,
      ingredients: [
        {
          shortname: "stones",
          amount: 4000,
        },
        {
          shortname: "sheetmetal",
          amount: 1,
        },
      ],
    },
  },
  "wall.frame.cell": {
    name: "Prison Cell Wall",
    shortname: "wall.frame.cell",
    category: "construction",
    image: "/images/construction/wall.frame.cell.png",
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
  "wall.frame.cell.gate": {
    name: "Prison Cell Gate",
    shortname: "wall.frame.cell.gate",
    category: "construction",
    image: "/images/construction/wall.frame.cell.gate.png",
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
  "wall.frame.fence": {
    name: "Chainlink Fence",
    shortname: "wall.frame.fence",
    category: "construction",
    image: "/images/construction/wall.frame.fence.png",
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
  "wall.frame.fence.gate": {
    name: "Chainlink Fence Gate",
    shortname: "wall.frame.fence.gate",
    category: "construction",
    image: "/images/construction/wall.frame.fence.gate.png",
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
  "wall.frame.garagedoor": {
    name: "Garage Door",
    shortname: "wall.frame.garagedoor",
    category: "construction",
    image: "/images/construction/wall.frame.garagedoor.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.fragments",
          amount: 300,
        },
        {
          shortname: "gears",
          amount: 2,
        },
      ],
    },
  },
  "wall.frame.lunar2025_a": {
    name: "Lunar Wall Frame Inlay",
    shortname: "wall.frame.lunar2025_a",
    category: "construction",
    image: "/images/construction/wall.frame.lunar2025_a.png",
  },
  "wall.frame.netting": {
    name: "Netting",
    shortname: "wall.frame.netting",
    category: "construction",
    image: "/images/construction/wall.frame.netting.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "rope",
          amount: 1,
        },
      ],
    },
  },
  "wall.frame.shopfront": {
    name: "Shop Front",
    shortname: "wall.frame.shopfront",
    category: "construction",
    image: "/images/construction/wall.frame.shopfront.png",
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
  "wall.frame.shopfront.metal": {
    name: "Metal Shop Front",
    shortname: "wall.frame.shopfront.metal",
    category: "construction",
    image: "/images/construction/wall.frame.shopfront.metal.png",
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
  "wall.ice.wall": {
    name: "Short Ice Wall",
    shortname: "wall.ice.wall",
    category: "construction",
    image: "/images/construction/wall.ice.wall.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "stones",
          amount: 300,
        },
      ],
    },
  },
  "wall.window.bars.metal": {
    name: "Metal Window Bars",
    shortname: "wall.window.bars.metal",
    category: "construction",
    image: "/images/construction/wall.window.bars.metal.png",
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
  "wall.window.bars.toptier": {
    name: "Reinforced Glass Window",
    shortname: "wall.window.bars.toptier",
    category: "construction",
    image: "/images/construction/wall.window.bars.toptier.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        {
          shortname: "metal.refined",
          amount: 4,
        },
      ],
    },
  },
  "wall.window.bars.wood": {
    name: "Wooden Window Bars",
    shortname: "wall.window.bars.wood",
    category: "construction",
    image: "/images/construction/wall.window.bars.wood.png",
    crafting: {
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 50,
        },
      ],
    },
  },
  "wall.window.glass.reinforced": {
    name: "Strengthened Glass Window",
    shortname: "wall.window.glass.reinforced",
    category: "construction",
    image: "/images/construction/wall.window.glass.reinforced.png",
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
  "watchtower.wood": {
    name: "Watch Tower",
    shortname: "watchtower.wood",
    category: "construction",
    image: "/images/construction/watchtower.wood.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        {
          shortname: "wood",
          amount: 250,
        },
      ],
    },
  },
  "water.catcher.large": {
    name: "Large Water Catcher",
    shortname: "water.catcher.large",
    category: "construction",
    image: "/images/construction/water.catcher.large.png",
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
        {
          shortname: "tarp",
          amount: 2,
        },
      ],
    },
  },
  "water.catcher.small": {
    name: "Small Water Catcher",
    shortname: "water.catcher.small",
    category: "construction",
    image: "/images/construction/water.catcher.small.png",
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
          amount: 50,
        },
        {
          shortname: "tarp",
          amount: 1,
        },
      ],
    },
  },
};
