import type { Item } from "../../types/item.types";

export type ComponentItemCategory = "component";
export type ComponentItemShortname = "techparts" | "rope" | "metalpipe" | "propanetank";

export const componentItems: {
  [K in ComponentItemShortname]: Item<K> & { category: ComponentItemCategory };
} = {
  techparts: {
    shortname: "techparts",
    name: "Tech Parts",
    category: "component",
    image: "/images/components/techparts.png",
  },
  rope: {
    shortname: "rope",
    name: "Rope",
    category: "component",
    image: "/images/components/rope.png",
  },
  metalpipe: {
    shortname: "metalpipe",
    name: "Metal Pipe",
    category: "component",
    image: "/images/components/metalpipe.png",
    crafting: {
      workbenchLevel: 3,
      yield: 1,
      ingredients: [
        { shortname: "metal.refined", amount: 2 },
        { shortname: "scrap", amount: 20 },
      ]
    }
  },
  propanetank: {
    shortname: "propanetank",
    name: "Empty Propane Tank",
    category: "component",
    image: "/images/components/propanetank.png",
    crafting: {
      workbenchLevel: 2,
      yield: 1,
      ingredients: [
        { shortname: "metal.fragments", amount: 100 },
        { shortname: "scrap", amount: 10 },
      ]
    }
  }
};
