import type { Item } from "../../types/item.types";

export type ElectricalItemCategory = "electrical";
export type ElectricalItemShortname = never;

export const electricalItems: {
  [K in ElectricalItemShortname]: Item<K> & { category: ElectricalItemCategory };
} = {};
