import type { Item } from "../../types/item.types";

export type MedicalItemCategory = "medical";
export type MedicalItemShortname = never;

export const medicalItems: {
  [K in MedicalItemShortname]: Item<K> & { category: MedicalItemCategory };
} = {};
