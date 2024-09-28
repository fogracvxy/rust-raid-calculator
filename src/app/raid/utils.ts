// utils.ts
import { CollectionItem } from "./types";

export const calculateOptionTotals = (
  collection: CollectionItem[],
  options: string[]
) => {
  return options.reduce((acc, option) => {
    const total = collection.reduce(
      (sum, c) =>
        sum +
        (c.item.bestOption?.[option as keyof typeof c.item.bestOption] || 0) *
          c.quantity,
      0
    );
    if (total > 0) {
      acc[option] = total;
    }
    return acc;
  }, {} as Record<string, number>);
};
