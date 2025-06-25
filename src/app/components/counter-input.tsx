import React, { forwardRef, useEffect } from "react";
import type { ClassNames } from "../types/classnames.types";
import cn from "classnames";

export interface CounterInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  classNames?: ClassNames<"root">;
}

const CounterInput = forwardRef<HTMLInputElement, CounterInputProps>(
  ({ onChange, min = 0, value = min, max = Infinity, step = 1, className, classNames = {} }, ref) => {
    const [rawValue, setRawValue] = React.useState<string>(`${value}`);

    useEffect(() => {
      setRawValue(`${value}`);
    }, [value]);
    
    return (
      <div className={cn("flex items-center w-full", className, classNames.root)}>
        <button
          onClick={() => {
            const newValue = Math.max((value || 0) - step, min);
            setRawValue(`${newValue}`);
            onChange?.(newValue);
          }}
          className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 h-7 aspect-square flex items-center justify-center text-white rounded-l transition-colors disabled:opacity-50"
          disabled={value <= min}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <input
          ref={ref}
          type="text"
          value={rawValue}
          pattern="[0-9]"
          inputMode="numeric"
          onChange={(e) => {
            const newValue = e.target.value;
            setRawValue(newValue);
            const parsedValue = Number(newValue);
            if (!isNaN(parsedValue)) {
              onChange?.(Math.max(min, Math.min(parsedValue, max)));
            }
          }}
          onBlur={() => {
            setRawValue(`${value}`);
          }}
          className="h-7 bg-gray-800 text-center text-white text-xs focus:outline-none focus:ring-1 focus:ring-red-500 max-w-full min-w-0 grow"
        />

        <button
          onClick={() => {
            const newValue = Math.min((value || 0) + step, max);
            setRawValue(`${newValue}`);
            onChange?.(newValue);
          }}
          disabled={value >= max}
          className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 h-7 aspect-square flex items-center justify-center text-white rounded-r transition-colors disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    );
  }
);
CounterInput.displayName = "CounterInput";

export default CounterInput;
