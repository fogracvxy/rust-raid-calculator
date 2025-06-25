import type { Item } from "../../types/item.types";

export type ElectricalItemCategory = "electrical";
export type ElectricalItemShortname = "autoturret";

export const electricalItems: {
  [K in ElectricalItemShortname]: Item<K> & { category: ElectricalItemCategory };
} = {
  autoturret: {
    shortname: "autoturret",
    name: "Auto Turret",
    category: "electrical",
    image: "/images/autoturret.png",
    crafting: {
      yield: 1,
      workbenchLevel: 2,
      ingredients: [
        { shortname: "cctv.camera", amount: 1 },
        { shortname: "targeting.computer", amount: 1 },
        { shortname: "metal.refined", amount: 10 },
      ],
    },
  },
};
