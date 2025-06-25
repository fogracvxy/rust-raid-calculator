import type { Item } from "../../types/item.types";

export type TrapItemCategory = "trap";
export type TrapItemShortname = never;

export const trapItems: {
  [K in TrapItemShortname]: Item<K> & { category: TrapItemCategory };
} = {};
