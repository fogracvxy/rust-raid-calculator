import SearchInput, { type SearchInputProps } from "@/app/components/search-input";
import type { ClassNames } from "@/app/types/classnames.types";
import cn from "classnames";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { itemFuzzyOptions, itemList, items } from "../data/items";
import type { Item, ItemShortname } from "../types/item.types";
import ItemCounterCard from "./item-counter-card";

export type ItemPickerValue = {
  item: ItemShortname;
  quantity: number;
};

export interface ItemPickerProps {
  value: ItemPickerValue[];
  onChange?: (value: ItemPickerValue[]) => void;
  title?: React.ReactNode;
  searchPlaceholder?: string;
  emptyPlaceholder?: React.ReactNode;
  showActualYield?: boolean;
  data?: Item[];
  view?: "grid" | "list";
  className?: string;
  classNames?: ClassNames<"root">;
}

const SearchItemRenderer: NonNullable<SearchInputProps<Item>["renderOption"]> = ({ item }) => {
  return (
    <div className="flex items-center gap-3">
      <Image src={item.image} alt={item.name} width={24} height={24} loading="eager" />
      <span className="text-white font-semibold">{item.name}</span>
    </div>
  );
};

const ItemPicker = ({
  value = [],
  onChange,
  title,
  searchPlaceholder,
  emptyPlaceholder = "No items selected.",
  showActualYield = false,
  data = itemList,
  view = "grid",
  className,
  classNames = {},
}: ItemPickerProps) => {
  const [craftSearchTerm, setCraftSearchTerm] = useState<string>("");
  const handleCraftItemSelect = (item: Item) => {
    const newItem: ItemPickerValue = { item: item.shortname, quantity: 1 };
    onChange?.([...value, newItem]);
  };
  const searchableCraftItems = useMemo(() => {
    const selectedCraftItemShortnames = value.map((i) => i.item);
    return data.filter((item) => !selectedCraftItemShortnames.includes(item.shortname));
  }, [value, data]);

  const readOnly = !onChange;

  return (
    <div
      className={cn(
        "flex-1 bg-gradient-to-b from-gray-900 to-black py-6 px-4 rounded-lg border border-gray-800 shadow-2xl",
        className,
        classNames.root
      )}
    >
      <div className="flex items-center flex-col gap-4 md:flex-row md:justify-between">
        <h2 className="flex items-center gap-3 text-xl font-bold text-white">{title || "Items"}</h2>
        {!readOnly && (
          <SearchInput
            value={craftSearchTerm}
            onChange={setCraftSearchTerm}
            onSelect={handleCraftItemSelect}
            placeholder={searchPlaceholder || "Search items..."}
            data={searchableCraftItems}
            getValue={(item) => item.shortname}
            renderOption={SearchItemRenderer}
            fuzzyOptions={itemFuzzyOptions}
          />
        )}
      </div>
      <div
        className={cn("mt-4 min-h-[200px]", {
          "flex justify-center items-center": value.length === 0,
        })}
      >
        {value.length === 0 ? (
          <p className="text-gray-500 text-center">{emptyPlaceholder}</p>
        ) : (
          <>
            {view === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {value.map(({ item, quantity }) => {
                  return (
                    <ItemCounterCard
                      key={item}
                      shortname={item}
                      value={quantity}
                      onChange={
                        onChange
                          ? (newQuantity) => {
                              onChange(value.map((i) => (i.item === item ? { ...i, quantity: newQuantity } : i)));
                            }
                          : undefined
                      }
                      onRemove={
                        onChange
                          ? () => {
                              onChange(value.filter((i) => i.item !== item));
                            }
                          : undefined
                      }
                      showActualYield={showActualYield}
                    />
                  );
                })}
              </div>
            )}
            {view === "list" && (
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                  <tr className="bg-gray-800 text-gray-300">
                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                      Item
                    </th>
                    <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {value.map(({ item, quantity }) => (
                    <tr key={item} className="border-b border-gray-700">
                      <td className="px-2 sm:px-4 py-2 font-medium whitespace-nowrap">
                        <Image
                          src={items[item].image}
                          alt={items[item].name}
                          width={24}
                          height={24}
                          className="inline-block mr-2"
                        />
                        {items[item].name}
                      </td>
                      <td className="px-2 sm:px-4 py-2">{quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemPicker;
