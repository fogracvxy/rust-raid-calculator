import React, { forwardRef } from "react";
import type { ClassNames } from "../types/classnames.types";
import cn from "classnames";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "onChange"> {
  className?: string;
  classNames?: ClassNames<"root">;
  value?: string;
  onChange?: (term: string) => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, classNames = {}, value, onChange, ...inputProps }, ref) => {
    return (
      <div className={cn("relative flex-grow max-w-md", className, classNames.root)}>
        <input
          {...inputProps}
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full py-2 pl-10 pr-4 bg-black border border-gray-700 rounded-md text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all disabled:opacity-50 disabled:bg-gray-800 disabled:border-gray-600 disabled:cursor-not-allowed"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

export default TextInput;
