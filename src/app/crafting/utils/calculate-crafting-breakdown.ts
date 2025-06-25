import { items } from "../data/items";
import type { Item, ItemShortname } from "../types/item.types";

export type ItemBreakdown = Partial<Record<ItemShortname, number>>;
export type Inventory = Partial<Record<ItemShortname, number>>;

export interface CalculateCraftingBreakdownOptions {
  disallowScraps?: boolean;
  inventory?: Inventory;
  excess?: Inventory;
}
export interface CalculateCraftingBreakdownResult {
  breakdown: ItemBreakdown;
  inventory: Inventory;

  /**
   * Crafting some items may require crafting other items that have a higher yield than actually needed.
   * This excess inventory is the leftover items that can be used in the crafting of other items that require them.
   *
   * A simple example of two items that can benefit from using excess (rather than crafting each one from scratch) are 1x Rocket and 1x Firebomb.
   * Without excess, the calculator would actually output 1x cloth and 2x animal fat than actually required.
   */
  excess: Inventory;
}

export const calculateCraftingBreakdown = (
  item: ItemShortname,
  quantity: number,
  { disallowScraps = true, inventory = {}, excess = {} }: CalculateCraftingBreakdownOptions = {}
): CalculateCraftingBreakdownResult => {
  let localInventory: Inventory = { ...inventory };
  let localExcess: Inventory = { ...excess };

  if (quantity === 0) return { breakdown: {}, inventory: localInventory, excess: localExcess };

  const availableInventory = localInventory[item] || 0;
  const availableExcess = localExcess[item] || 0;
  const available = availableInventory + availableExcess;

  const remainingQty = Math.max(0, quantity - available);

  const usedFromExcess = Math.min(availableExcess, quantity);
  localExcess[item] = availableExcess - usedFromExcess;
  if (localExcess[item] === 0) {
    delete localExcess[item];
  }

  const usedFromInventory = Math.min(availableInventory, quantity - usedFromExcess);
  localInventory[item] = availableInventory - usedFromInventory;

  if (remainingQty === 0) return { breakdown: {}, inventory: localInventory, excess: localExcess };

  const { crafting } = items[item] ?? {};
  if (!crafting) {
    return { breakdown: { [item]: remainingQty }, inventory: localInventory, excess: localExcess };
  }

  const { yield: yieldPerCraft, ingredients } = crafting;
  if (disallowScraps && ingredients.some((ing) => ing.shortname === "scrap")) {
    return { breakdown: { [item]: remainingQty }, inventory: localInventory, excess: localExcess };
  }

  const craftsNeeded = Math.ceil(remainingQty / yieldPerCraft);
  const totalProduced = craftsNeeded * yieldPerCraft;
  const newExcess = totalProduced - remainingQty;
  localExcess[item] = (localExcess[item] || 0) + newExcess;

  const breakdown: ItemBreakdown = {};

  for (const { shortname, amount } of ingredients) {
    const needed = amount * craftsNeeded;

    const {
      breakdown: subBreakdown,
      inventory: subInventory,
      excess: subExcess,
    } = calculateCraftingBreakdown(shortname, needed, {
      disallowScraps,
      inventory: localInventory,
      excess: localExcess,
    });

    localInventory = subInventory;
    localExcess = subExcess;

    for (const [key, value] of Object.entries(subBreakdown)) {
      breakdown[key as ItemShortname] = (breakdown[key as ItemShortname] || 0) + value;
    }
  }

  if (localExcess[item] === 0) {
    delete localExcess[item];
  }
  return { breakdown, inventory: localInventory, excess: localExcess };
};

export const calculateMultiCraftingBreakdown = (
  itemsToCraft: Array<{ item: ItemShortname; quantity: number }>,
  { disallowScraps = true, inventory = {}, excess = {} }: CalculateCraftingBreakdownOptions = {}
): CalculateCraftingBreakdownResult => {
  let localInventory: Inventory = { ...inventory };
  let localExcess: Inventory = { ...excess };
  const breakdown: ItemBreakdown = {};

  for (const { item, quantity } of itemsToCraft) {
    const {
      breakdown: itemBreakdown,
      inventory: updatedInventory,
      excess: updatedExcess,
    } = calculateCraftingBreakdown(item, quantity, {
      disallowScraps,
      inventory: localInventory,
      excess: localExcess,
    });

    localInventory = updatedInventory;
    localExcess = updatedExcess;

    for (const [key, value] of Object.entries(itemBreakdown)) {
      breakdown[key as ItemShortname] = (breakdown[key as ItemShortname] || 0) + value;
    }
  }

  return { breakdown, inventory: localInventory, excess: localExcess };
};
