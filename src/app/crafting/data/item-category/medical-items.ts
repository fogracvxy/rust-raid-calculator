import type { Item } from "../../types/item.types";

export type MedicalItemCategory = "medical";
export type MedicalItemShortname = "antiradpills" | "bandage" | "blood" | "largemedkit" | "syringe.medical";

export const medicalItems: {
  [K in MedicalItemShortname]: Item<K> & { category: MedicalItemCategory };
} = {
  antiradpills: {
    name: "Anti-Radiation Pills",
    shortname: "antiradpills",
    category: "medical",
    image: "/images/medical/antiradpills.png",
  },
  bandage: {
    shortname: "bandage",
    name: "Bandage",
    category: "medical",
    image: "/images/medical/bandage.png",
    crafting: {
      yield: 1,
      ingredients: [{ shortname: "cloth", amount: 4 }],
    },
  },
  blood: {
    name: "Blood",
    shortname: "blood",
    category: "medical",
    image: "/images/medical/blood.png",
  },
  largemedkit: {
    shortname: "largemedkit",
    name: "Large Medkit",
    category: "medical",
    image: "/images/medical/largemedkit.png",
    crafting: {
      yield: 1,
      workbenchLevel: 2,
      ingredients: [
        { shortname: "syringe.medical", amount: 2 },
        { shortname: "lowgradefuel", amount: 10 },
      ],
    },
  },
  "syringe.medical": {
    shortname: "syringe.medical",
    name: "Medical Syringe",
    category: "medical",
    image: "/images/medical/syringe.medical.png",
    crafting: {
      yield: 1,
      workbenchLevel: 2,
      ingredients: [
        { shortname: "cloth", amount: 15 },
        { shortname: "metal.fragments", amount: 10 },
        { shortname: "lowgradefuel", amount: 10 },
      ],
    },
  },
};
