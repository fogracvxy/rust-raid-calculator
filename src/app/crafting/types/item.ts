export type ItemShortname =
  | "ammo.rifle.explosive"
  | "charcoal"
  | "cloth"
  | "explosive.timed"
  | "explosives"
  | "fat.animal"
  | "gunpowder"
  | "lowgradefuel"
  | "metal.fragments"
  | "metal.refined"
  | "sulfur"
  | "techparts";

export interface Item<T extends ItemShortname = ItemShortname> {
  shortname: T;
  name: string;
  image: string;
  crafting?: {
    yield: number;
    time: number; // in seconds
    workbenchLevel?: 1 | 2 | 3;
    ingredients: {
      shortname: ItemShortname;
      amount: number;
    }[];
  };
  // IDEA: Add "recycling" property and merge from items_recycle.ts data
  // IDEA: Add "smelting" property for recipes that can be smelted
  // IDEA: Add "refining" property for recipes that can be refined
}
