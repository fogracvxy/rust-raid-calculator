import type { Item } from "../../types/item.types";

export type ItemItemCategory = "item";
export type ItemItemShortname = "stash.small";

export const itemItems: {
  [K in ItemItemShortname]: Item<K> & { category: ItemItemCategory };
} = {
  "stash.small": {
    shortname: "stash.small",
    name: "Small Stash",
    category: "item",
    image: "/images/items/stash.small.png",
    crafting: {
      yield: 1,
      ingredients: [{ shortname: "cloth", amount: 10 }],
    },
  },
};
