import type { Item } from "../../types/item.types";

export type MiscItemCategory = "misc";
export type MiscItemShortname = never;

export const miscItems: {
  [K in MiscItemShortname]: Item<K> & { category: MiscItemCategory };
} = {};
