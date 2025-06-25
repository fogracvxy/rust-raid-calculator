import React from "react";
import type { ItemShortname } from "../types/item.types";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import { items } from "../data/items";
import CounterInput from "@/app/components/counter-input";
import cn from "classnames";

export interface ItemCounterCardProps {
  shortname: ItemShortname;
  value: number;
  onRemove?: () => void;
  onChange?: (value: number) => void;
  showActualYield?: boolean;
}

const ItemCounterCard = ({ shortname, value, onChange, onRemove, showActualYield = false }: ItemCounterCardProps) => {
  const item = items[shortname];
  const readOnly = !onChange;

  return (
    <div className="relative bg-gray-900 px-2 py-4 rounded-lg shadow-md flex flex-col items-center border border-gray-800 hover:border-gray-700">
      {!readOnly && onRemove && (
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-400" onClick={onRemove}>
          <BiX className="h-4 w-4" />
        </button>
      )}
      <div className="bg-black/50 p-2 rounded-full">
        <Image src={item.image} alt={item.name} width={48} height={48} />
      </div>
      <h3 className="text-white font-semibold my-2 text-center">{item.name}</h3>
      {readOnly ? (
        <span className="mt-auto">{value.toLocaleString("en")}</span>
      ) : (
        <>
          {showActualYield && item.crafting && (
            <button
              type="button"
              className={cn("text-gray-400 text-[10px] mt-auto cursor-pointer", {
                "opacity-0": value % (item.crafting.yield || 1) === 0,
              })}
              title="Change to actual yield from crafting"
              onClick={() => {
                onChange?.(Math.ceil(value / (item.crafting!.yield || 1)) * (item.crafting!.yield || 1));
              }}
            >
              ({(Math.ceil(value / (item.crafting.yield || 1)) * (item.crafting.yield || 1)).toLocaleString("en")})
            </button>
          )}
          <CounterInput
            className="mt-1"
            value={value}
            onChange={(newQuantity) => {
              onChange(newQuantity);
            }}
            min={1}
            max={9_999_999}
          />
        </>
      )}
    </div>
  );
};

export default ItemCounterCard;
