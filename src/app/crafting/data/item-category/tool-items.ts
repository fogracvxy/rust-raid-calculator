import type { Item } from "../../types/item.types";

export type ToolItemCategory = "tool";
export type ToolItemShortname = "explosive.timed";

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
};
