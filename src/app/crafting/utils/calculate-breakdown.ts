import { items } from "../data/items";
import type { ItemShortname } from "../types/item";

type ItemBreakdown = Partial<Record<ItemShortname, number>>;

const breakdownCache = new Map<`${ItemShortname}@${number}@${boolean}`, ItemBreakdown>(); // Used for dynamic programming to avoid recalculating sub-results

export const mergeBreakdowns = (...sources: ItemBreakdown[]) => {
  const target: ItemBreakdown = {};
  for (const source of sources) {
    for (const key in source) {
      target[key as ItemShortname] = (target[key as ItemShortname] || 0) + (source[key as ItemShortname] || 0);
    }
  }
  return target;
};

/**
 * Breaks down the `target` into raw materials (i.e. non-craftable items) required to craft the specified `quantity`.
 */
export const calculateBreakdown = (
  item: ItemShortname,
  quantity: number,
  { rawOnly = true, useCache = true }: { rawOnly?: boolean; useCache?: boolean } = {}
): ItemBreakdown => {
  if (quantity === 0) return {};

  const { crafting } = items[item] ?? {};
  if (!crafting) {
    return { [item]: quantity };
  }

  const { yield: yieldPerCraft, ingredients } = crafting;
  const craftsNeeded = Math.ceil(quantity / yieldPerCraft);

  const cacheKey = `${item}@${craftsNeeded}@${rawOnly}` as const;
  if (useCache) {
    // Note: You can't calculate the breakdown for 1 unit, cache that and simply multiply it by `craftsNeeded`.
    // Some items may have sub-ingredients that also need to be broken down, which would lead to incorrect results (results in more than actually needed).
    const cacheResult = breakdownCache.get(cacheKey);
    if (cacheResult) {
      return { ...cacheResult };
    }
  }

  const breakdown: ItemBreakdown = {};
  for (const { shortname, amount } of ingredients) {
    if (!rawOnly) {
      breakdown[shortname] = (breakdown[shortname] || 0) + amount * craftsNeeded;
    }
    const needed = amount * craftsNeeded;
    const subBreakdown = calculateBreakdown(shortname, needed);
    for (const [key, value] of Object.entries(subBreakdown)) {
      breakdown[key as ItemShortname] = (breakdown[key as ItemShortname] || 0) + value;
    }
  }

  if (useCache) {
    breakdownCache.set(cacheKey, { ...breakdown });
  }
  return breakdown;
};
