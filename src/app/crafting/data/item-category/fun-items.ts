import type { Item } from "../../types/item.types";

export type FunItemCategory = "fun";
export type FunItemShortname = never;

export const funItems: {
  [K in FunItemShortname]: Item<K> & { category: FunItemCategory };
} = {};
