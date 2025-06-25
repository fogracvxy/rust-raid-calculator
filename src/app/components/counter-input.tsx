import React, { forwardRef, useEffect } from "react";
import type { ClassNames } from "../types/classnames.types";
import cn from "classnames";

export interface CounterInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "min" | "max" | "type" | "step" | "className"
  > {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  shiftStep?: number;
  className?: string;
  classNames?: ClassNames<"root">;
}

const CounterInput = forwardRef<HTMLInputElement, CounterInputProps>(
  (
    {
      onChange,
      min = 0,
      value = min,
      max = Infinity,
      step = 1,
      shiftStep = 10,
      onKeyDown,
      className,
      classNames = {},
      ...inputProps
    },
    ref
  ) => {
    const [rawValue, setRawValue] = React.useState<string>(`${value}`);
    const [lastValue, setLastValue] = React.useState<number>(value);

    useEffect(() => {
      setRawValue(`${value}`);
    }, [value]);

    useEffect(() => {
      if (Math.max(shiftStep, step) % Math.min(shiftStep, step) !== 0) {
        console.warn("shiftStep should be a multiple of step for consistent behavior.");
      }
    }, [shiftStep, step]);

    return (
      <div className={cn("flex items-center w-full", className, classNames.root)}>
        <button
          onClick={(e) => {
            e.preventDefault();
            const newValue = Math.max((value || 0) - (e.shiftKey ? shiftStep : step), min);
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
          {...inputProps}
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
            setLastValue(value);
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter": {
                e.preventDefault();
                const parsedValue = Number(rawValue);
                if (!isNaN(parsedValue)) {
                  const clampedValue = Math.max(min, Math.min(parsedValue, max));
                  setRawValue(`${clampedValue}`);
                  onChange?.(clampedValue);
                  setLastValue(clampedValue);
                } else {
                  setRawValue(`${value}`);
                }
                break;
              }
              case "Escape": {
                e.preventDefault();
                setRawValue(`${lastValue}`);
                onChange?.(lastValue);
                break;
              }
              case "ArrowUp": {
                e.preventDefault();
                const newValue = Math.min((value || 0) + (e.shiftKey ? shiftStep : step), max);
                setRawValue(`${newValue}`);
                onChange?.(newValue);
                break;
              }
              case "ArrowDown": {
                e.preventDefault();
                const newValue = Math.max((value || 0) - (e.shiftKey ? shiftStep : step), min);
                setRawValue(`${newValue}`);
                onChange?.(newValue);
                break;
              }
            }
            onKeyDown?.(e);
          }}
          className="h-7 bg-gray-800 text-center text-white text-xs focus:outline-none focus:ring-1 focus:ring-red-500 max-w-full min-w-0 grow"
        />

        <button
          onClick={(e) => {
            const newValue = Math.min((value || 0) + (e.shiftKey ? shiftStep : step), max);
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
