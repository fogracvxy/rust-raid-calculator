import type { Item } from "../../types/item.types";

export type ToolItemCategory = "tool";
export type ToolItemShortname = "explosive.timed" | "explosive.satchel";

export const toolItems: {
  [K in ToolItemShortname]: Item<K> & { category: ToolItemCategory };
} = {
  "explosive.timed": {
    shortname: "explosive.timed",
    name: "Timed Explosive Charge",
    category: "tool",
    keywords: ["C4"],
    image: "/images/c4.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        { shortname: "cloth", amount: 5 },
        { shortname: "explosives", amount: 20 },
        { shortname: "techparts", amount: 2 },
      ],
    },
  },
  "explosive.satchel": {
    shortname: "explosive.satchel",
    name: "Satchel Charge",
    category: "tool",
    image: "/images/satchel.png",
    crafting: {
      workbenchLevel: 1,
      yield: 1,
      ingredients: [
        { shortname: "grenade.beancan", amount: 4 },
        { shortname: "stash.small", amount: 1 },
        { shortname: "rope", amount: 1 },
      ],
    },
  },
};
