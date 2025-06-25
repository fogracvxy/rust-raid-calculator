import type { Item } from "../../types/item.types";

export type FoodItemCategory = "food";
export type FoodItemShortname = never;

export const foodItems: {
  [K in FoodItemShortname]: Item<K> & { category: FoodItemCategory };
} = {};
