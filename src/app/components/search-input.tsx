import React, { useState, useMemo, useRef, useEffect, type Ref, type LegacyRef } from "react";
import TextInput, { type TextInputProps } from "./text-input";
import type { ClassNames } from "../types/classnames.types";
import cn from "classnames";
import Fuse, { type IFuseOptions } from "fuse.js";
import { useVirtualizer } from "@tanstack/react-virtual";

export interface SearchRenderOptionProps<T = any> {
  item: T;
}

export interface SearchInputProps<T = any> extends Omit<TextInputProps, "className" | "classNames" | "onSelect"> {
  data: T[];

  getValue?: (item: T) => string;
  onSelect?: (item: T) => void | { value?: string; focused?: boolean };
  renderOption?: (params: SearchRenderOptionProps<T>) => React.ReactNode;
  fuzzyOptions?: IFuseOptions<T>;
  inputRef?: LegacyRef<HTMLInputElement>; // forwardRef doesn't work with generics
  className?: string;
  classNames?: ClassNames<"root" | "dropdown" | "option"> & {
    input?: TextInputProps["classNames"];
  };
}

const SearchInput = <T,>({
  value,
  onChange,
  placeholder,
  className,
  classNames = {},
  data,
  getValue = (item: T) => String(item),
  onSelect,
  renderOption,
  fuzzyOptions = {},
  inputRef,
  ...rest
}: SearchInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const focusedIndexRef = useRef<HTMLDivElement | null>(null);

  const fuse = useMemo(() => {
    return new Fuse(data, fuzzyOptions);
  }, [data, fuzzyOptions]);

  const filteredData = useMemo(() => {
    if (!value) return data;
    const results = fuse.search(value);
    return results.map((result) => result.item);
  }, [fuse, value, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => dropdownRef.current,
    estimateSize: () => 42,
    overscan: 5,
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  const handleSelect = (item: T) => {
    if (onSelect) {
      onSelect(item) ?? {};
    } else if (onChange) {
      onChange(getValue(item));
    }
  };

  useEffect(() => {
    if (isFocused && !data.length) {
      setIsFocused(false);
    }
  }, [data.length, isFocused]);

  useEffect(() => {
    if (focusedIndex == null) return;
    focusedIndexRef.current?.scrollIntoView({ block: "nearest" });
  }, [focusedIndex]);

  return (
    <div className={cn("relative", className, classNames.root)}>
      <TextInput
        {...rest}
        ref={inputRef}
        value={value}
        onChange={(v) => {
          onChange?.(v);
          setFocusedIndex(0);
        }}
        placeholder={placeholder}
        classNames={classNames.input}
        disabled={!data.length}
        onFocus={() => {
          setIsFocused(true);
          setFocusedIndex(0);
        }}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        onKeyDown={(e) => {
          switch (e.key) {
            case "ArrowDown": {
              e.preventDefault();
              if (filteredData.length === 0) return;
              setFocusedIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, filteredData.length - 1)));
              break;
            }
            case "ArrowUp": {
              e.preventDefault();
              if (filteredData.length === 0) return;
              setFocusedIndex((prev) => (prev === null ? filteredData.length - 1 : Math.max(prev - 1, 0)));
              break;
            }
            case "Enter": {
              e.preventDefault();
              if (focusedIndex !== null && filteredData[focusedIndex]) {
                handleSelect(filteredData[focusedIndex]);
                setIsFocused(false);
                setFocusedIndex(null);
              }
              break;
            }
            case "Escape": {
              e.preventDefault();
              setFocusedIndex(null);
              break;
            }
          }
        }}
      />
      {isFocused && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute left-0 right-0 z-10 bg-gradient-to-t from-gray-900 to-black rounded border border-gray-800 shadow-2xl mt-1 max-h-60 overflow-auto",
            classNames.dropdown
          )}
        >
          {filteredData.length === 0 && <div className={cn("p-2 text-gray-500")}>No results found</div>}
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = filteredData[virtualRow.index];
              return (
                <div
                  key={getValue(item)}
                  data-index={virtualRow.index}
                  ref={(el) => {
                    rowVirtualizer.measureElement(el);
                    if (virtualRow.index === focusedIndex) {
                      focusedIndexRef.current = el;
                    }
                  }}
                  className={cn(
                    "cursor-pointer px-3 py-2 hover:bg-gray-800 absolute left-0 right-0 whitespace-normal break-words leading-snug",
                    classNames.option,
                    { "bg-gray-700": focusedIndex === virtualRow.index }
                  )}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onMouseDown={() => handleSelect(item)}
                >
                  {renderOption?.({ item }) ?? getValue(item)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
