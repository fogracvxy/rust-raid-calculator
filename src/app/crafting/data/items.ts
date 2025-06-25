import type { IFuseOptions } from "fuse.js";
import type { Item, ItemShortname } from "../types/item.types";
import { ammunitionItems } from "./item-category/ammunition-items";
import { attireItems } from "./item-category/attire-items";
import { componentItems } from "./item-category/component-items";
import { constructionItems } from "./item-category/construction-items";
import { electricalItems } from "./item-category/electrical-items";
import { foodItems } from "./item-category/food-items";
import { funItems } from "./item-category/fun-items";
import { itemItems } from "./item-category/item-items";
import { medicalItems } from "./item-category/medical-items";
import { miscItems } from "./item-category/misc-items";
import { resourceItems } from "./item-category/resource-items";
import { toolItems } from "./item-category/tool-items";
import { trapItems } from "./item-category/trap-items";
import { weaponItems } from "./item-category/weapon-items";

export const items: {
  [K in ItemShortname]: Item<K>;
} = {
  ...ammunitionItems,
  ...attireItems,
  ...componentItems,
  ...constructionItems,
  ...electricalItems,
  ...foodItems,
  ...funItems,
  ...itemItems,
  ...medicalItems,
  ...miscItems,
  ...resourceItems,
  ...toolItems,
  ...trapItems,
  ...weaponItems,
};

export const itemList = Object.values(items).toSorted((a, b) => a.name.localeCompare(b.name)) as Item[];
export const itemShortnames = (Object.keys(items) as ItemShortname[]).toSorted((a, b) => a.localeCompare(b));

export const craftableItemList = itemList.filter(
  (item): item is typeof item & { crafting: NonNullable<(typeof item)["crafting"]> } => {
    return item.crafting !== undefined;
  }
);
export const ingredientItems = itemList.filter((item, _index, arr) => {
  return arr.some(
    (i) => i.shortname !== item.shortname && i.crafting?.ingredients.some((ing) => ing.shortname === item.shortname)
  );
});

export const itemFuzzyOptions: IFuseOptions<Item> = {
  keys: [
    { name: "shortname", weight: 10, getFn: (item) => item.shortname },
    { name: "name", weight: 10, getFn: (item) => item.name },
    { name: "keywords", weight: 5, getFn: (item) => item.keywords ?? [] },
    { name: "category", weight: 1, getFn: (item) => item.category },
  ],
  isCaseSensitive: false,
};
