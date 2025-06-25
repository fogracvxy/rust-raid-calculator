import React, { useState, useMemo, useRef, useEffect } from "react";
import TextInput, { type TextInputProps } from "./text-input";
import type { ClassNames } from "../types/classnames.types";
import cn from "classnames";
import Fuse, { type IFuseOptions } from "fuse.js";

export interface SearchInputProps<T = any> extends Omit<TextInputProps, "className" | "classNames" | "onSelect"> {
  data: T[];

  getValue?: (item: T) => string;
  onSelect?: (item: T) => void | { value?: string; focused?: boolean };
  renderOption?: (params: { item: T }) => React.ReactNode;
  fuzzyOptions?: IFuseOptions<T>;
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
  ...rest
}: SearchInputProps<T>) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(data, fuzzyOptions);
  }, [data, fuzzyOptions]);

  const filteredData = useMemo(() => {
    if (!value) return data;
    const results = fuse.search(value);
    return results.map((result) => result.item);
  }, [fuse, value, data]);

  const handleSelect = (item: T) => {
    if (onSelect) {
      const { value: nextValue = value, focused: nextFocused = false } = onSelect(item) ?? {};
      setTimeout(() => {
        if (nextFocused) {
          textInputRef.current?.focus();
        } else {
          textInputRef.current?.blur();
        }
      }, 0);
      onChange?.(nextValue ?? "");
    } else if (onChange) {
      onChange(getValue(item));
    }
  };

  useEffect(() => {
    if (isFocused && !data.length) {
      setIsFocused(false);
    }
  }, [data.length, isFocused]);

  return (
    <div className={cn("relative", className, classNames.root)}>
      <TextInput
        ref={textInputRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        classNames={classNames.input}
        disabled={!data.length}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        {...rest}
      />
      {isFocused && (
        <div
          className={cn(
            "absolute left-0 right-0 z-10 bg-gradient-to-t from-gray-900 to-black rounded border border-gray-800 shadow-2xl mt-1 max-h-60 overflow-auto",
            classNames.dropdown
          )}
        >
          {filteredData.length === 0 ? (
            <div className={cn("p-2 text-gray-500")}>No results found</div>
          ) : (
            filteredData.map((item) => (
              <div
                key={getValue(item)}
                className={cn("cursor-pointer px-3 py-2 hover:bg-gray-800", classNames.option)}
                onMouseDown={() => handleSelect(item)}
              >
                {renderOption?.({ item }) ?? getValue(item)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
