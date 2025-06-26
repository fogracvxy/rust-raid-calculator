"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GrResources } from "react-icons/gr";
import { LuWrench } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import Switch from "../components/switch";
import ItemPicker, { type ItemPickerValue } from "./components/item-picker";
import { calculateMultiCraftingBreakdown, type Inventory } from "./utils/calculate-crafting-breakdown";
import { craftableItemList, ingredientItems } from "./data/items";
import { LuPackagePlus } from "react-icons/lu";
import SelectInput from "../components/select-input";
import { BsGrid, BsList } from "react-icons/bs";

export default function CraftingCalculator() {
  const [disallowScraps, setDisallowScraps] = useState<boolean>(true);

  const [craftItems, setCraftItems] = useState<ItemPickerValue[]>([]);
  const [inventoryItems, setInventoryItems] = useState<ItemPickerValue[]>([]);

  const craftItemOptions = useMemo(() => {
    if (!disallowScraps) return craftableItemList;
    return craftableItemList.filter((item) => {
      return !item.crafting.ingredients.some((ing) => ing.shortname === "scrap");
    });
  }, [disallowScraps]);

  const { breakdown: requiredItems, excess } = useMemo(() => {
    const breakdown = calculateMultiCraftingBreakdown(craftItems, {
      disallowScraps,
      inventory: inventoryItems.reduce<Inventory>(
        (acc, { item, quantity }) => ({
          ...acc,
          [item]: (acc[item] || 0) + (quantity || 1),
        }),
        {}
      ),
    });

    return {
      breakdown: Object.entries(breakdown.breakdown)
        .map(([item, quantity]) => ({
          item: item as ItemPickerValue["item"],
          quantity,
        }))
        .toSorted((a, b) => {
          if (b.quantity !== a.quantity) {
            return b.quantity - a.quantity;
          }
          return a.item.localeCompare(b.item);
        }),
      excess: Object.entries(breakdown.excess)
        .map(([item, quantity]) => ({
          item: item as ItemPickerValue["item"],
          quantity,
        }))
        .toSorted((a, b) => {
          if (b.quantity !== a.quantity) {
            return b.quantity - a.quantity;
          }
          return a.item.localeCompare(b.item);
        }),
    };
  }, [craftItems, disallowScraps, inventoryItems]);

  return (
    <motion.div
      className="container mx-auto px-4 py-6 mb-24 md:mb-16 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-gray-900 to-black py-6 px-4 rounded-lg border border-gray-800 shadow-2xl mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-white">Crafting Calculator</h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          Plan which resources you need to craft a set of items.
        </p>
        <div className="hidden md:flex flex-col gap-3 mb-6">
          <p className="text-center">Keyboard Shortcuts</p>
          <p className="text-gray-400 text-center text-sm">
            Search Bar: <kbd className="bg-gray-800 px-2 py-1 rounded">↑</kbd>{" "}
            <kbd className="bg-gray-800 px-2 py-1 rounded">↓</kbd> to navigate,{" "}
            <kbd className="bg-gray-800 px-2 py-1 rounded">Enter</kbd> to select and start editing the quantity.
          </p>
          <p className="text-gray-400 text-center text-sm">
            Quantity: <kbd className="bg-gray-800 px-2 py-1 rounded">↑</kbd>{" "}
            <kbd className="bg-gray-800 px-2 py-1 rounded">↓</kbd> to increase/decrease (hold {" "}
            <kbd className="bg-gray-800 px-2 py-1 rounded">Shift</kbd> for higher steps),{" "}
            <kbd className="bg-gray-800 px-2 py-1 rounded">Enter</kbd> to confirm and go back to the search input.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
          <Switch
            className="bg-black border border-gray-700 rounded-md px-3 py-2 shadow-md"
            checked={disallowScraps}
            onChange={setDisallowScraps}
            label="No Scraps"
            infoTitle="Disallow Scraps"
            info="When enabled, resources that can be crafted with scraps will be treated as raw resources and won't be broken down into scraps."
          />
        </div>
      </div>

      <div className="flex flex-col md:gap-6 md:flex-row">
        <ItemPicker
          value={craftItems}
          onChange={setCraftItems}
          emptyPlaceholder="Select items to craft."
          showActualYield
          title={
            <>
              <LuWrench /> Craft
            </>
          }
          data={craftItemOptions}
          view="grid"
        />
        <ItemPicker
          value={inventoryItems}
          onChange={setInventoryItems}
          emptyPlaceholder="Select items you already have to reduce resource requirements."
          data={ingredientItems}
          title={
            <>
              <MdOutlineInventory2 /> Inventory
            </>
          }
          view="grid"
        />
      </div>

      <div className="flex flex-col md:gap-6 md:flex-row">
        <ItemPicker
          title={
            <>
              <GrResources /> Resources Needed
            </>
          }
          value={requiredItems}
          emptyPlaceholder="No resources needed."
          className="mt-6"
          view="list"
        />
        <ItemPicker
          title={
            <>
              <LuPackagePlus /> Excess Resources
            </>
          }
          value={excess}
          emptyPlaceholder="No excess resources."
          className="mt-6"
          view="list"
        />
      </div>
    </motion.div>
  );
}
