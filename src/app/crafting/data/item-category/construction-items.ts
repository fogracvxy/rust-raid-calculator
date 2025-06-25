import type { Item } from "../../types/item.types";

export type ConstructionItemCategory = "construction";
export type ConstructionItemShortname = never;

export const constructionItems: {
  [K in ConstructionItemShortname]: Item<K> & { category: ConstructionItemCategory };
} = {};
