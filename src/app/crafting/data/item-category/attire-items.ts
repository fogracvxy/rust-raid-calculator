import type { Item } from "../../types/item.types";

export type AttireItemCategory = "attire";
export type AttireItemShortname = never;

export const attireItems: {
  [K in AttireItemShortname]: Item<K> & { category: AttireItemCategory };
} = {};
