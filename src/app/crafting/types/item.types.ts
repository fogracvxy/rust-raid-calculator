import type { StaticImageData } from "next/image";
import type { AmmunitionItemCategory, AmmunitionItemShortname } from "../data/item-category/ammunition-items";
import type { AttireItemCategory, AttireItemShortname } from "../data/item-category/attire-items";
import type { ComponentItemCategory, ComponentItemShortname } from "../data/item-category/component-items";
import type { ConstructionItemCategory, ConstructionItemShortname } from "../data/item-category/construction-items";
import type { ElectricalItemCategory, ElectricalItemShortname } from "../data/item-category/electrical-items";
import type { FoodItemCategory, FoodItemShortname } from "../data/item-category/food-items";
import type { FunItemCategory, FunItemShortname } from "../data/item-category/fun-items";
import type { ItemItemCategory, ItemItemShortname } from "../data/item-category/item-items";
import type { MedicalItemCategory, MedicalItemShortname } from "../data/item-category/medical-items";
import type { MiscItemCategory, MiscItemShortname } from "../data/item-category/misc-items";
import type { ResourceItemCategory, ResourceItemShortname } from "../data/item-category/resource-items";
import type { ToolItemCategory, ToolItemShortname } from "../data/item-category/tool-items";
import type { TrapItemCategory, TrapItemShortname } from "../data/item-category/trap-items";
import type { WeaponItemCategory, WeaponItemShortname } from "../data/item-category/weapon-items";

export type ItemShortname =
  | AmmunitionItemShortname
  | AttireItemShortname
  | ComponentItemShortname
  | ConstructionItemShortname
  | ElectricalItemShortname
  | FoodItemShortname
  | FunItemShortname
  | ItemItemShortname
  | MedicalItemShortname
  | MiscItemShortname
  | ResourceItemShortname
  | ToolItemShortname
  | TrapItemShortname
  | WeaponItemShortname;

export type ItemCategory =
  | AmmunitionItemCategory
  | AttireItemCategory
  | ComponentItemCategory
  | ConstructionItemCategory
  | ElectricalItemCategory
  | FoodItemCategory
  | FunItemCategory
  | ItemItemCategory
  | MedicalItemCategory
  | MiscItemCategory
  | ResourceItemCategory
  | ToolItemCategory
  | TrapItemCategory
  | WeaponItemCategory;

export interface Item<T extends ItemShortname = ItemShortname> {
  shortname: T;
  name: string;
  category: ItemCategory;
  image: string | StaticImageData;
  keywords?: string[];
  crafting?: {
    yield: number;
    workbenchLevel?: 1 | 2 | 3;
    ingredients: {
      shortname: ItemShortname extends T ? ItemShortname : Exclude<ItemShortname, T>;
      amount: number;
    }[];
  };
  // IDEA: Add "recycling" property and merge from items_recycle.ts data
  // IDEA: Add "smelting" property for recipes that can be smelted
  // IDEA: Add "refining" property for recipes that can be refined
}
