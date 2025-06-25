import type { Item } from "../../types/item.types";

export type WeaponItemCategory = "weapon";
export type WeaponItemShortname = never;

export const weaponItems: {
  [K in WeaponItemShortname]: Item<K> & { category: WeaponItemCategory };
} = {};
