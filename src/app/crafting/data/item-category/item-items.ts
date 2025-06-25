import type { Item } from "../../types/item.types";

export type ItemItemCategory = "item";
export type ItemItemShortname = never;

export const itemItems: {
  [K in ItemItemShortname]: Item<K> & { category: ItemItemCategory };
} = {};
