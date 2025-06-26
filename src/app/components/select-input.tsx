import React from "react";
import type { ClassNames } from "../types/classnames.types";
import cn from "classnames";

export interface SelectInputProps<T extends string | number | string[]> {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ label: string; value: T }>;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  classNames?: ClassNames<"root" | "select">;
}

const SelectInput = <T extends string | number | string[]>({
  value,
  onChange,
  options,
  left,
  right,
  className,
  classNames = {},
}: SelectInputProps<T>) => {
  return (
    <div className={cn("relative", className, classNames.root)}>
      {left && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{left}</div>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(
          "py-2 bg-black border border-gray-700 rounded-md text-white appearance-none focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all",
          {
            "pl-10": !!left,
            "pr-10": !!right,
            "pl-4": !left,
            "pr-4": !right,
          },
          classNames.select
        )}
      >
        {options.map((option) => (
          <option key={`${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {right && <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">{right}</div>}
    </div>
  );
};

export default SelectInput;
