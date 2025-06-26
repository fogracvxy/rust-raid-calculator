import React from "react";
import type { ClassNames } from "../types/classnames.types";
import cn from "classnames";

export interface SwitchProps {
  className?: string;
  classNames?: ClassNames<"root">;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  infoTitle?: React.ReactNode;
  info?: React.ReactNode;
  label?: React.ReactNode;
}

const Switch = ({ checked, onChange, label, infoTitle, info, className, classNames = {} }: SwitchProps) => {
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <div className={cn("flex items-center gap-2 relative", className, classNames.root)}>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
        <span className="ml-2 text-sm text-white">{label}</span>
      </label>

      {info && (
        <>
          <button
            type="button"
            aria-label="Show auto-recycle info"
            className="ml-2 p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={(e) => {
              e.stopPropagation();
              setShowInfo(!showInfo);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {showInfo && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 md:bg-opacity-0 md:items-end md:justify-end"
              onClick={() => setShowInfo(false)}
              aria-modal="true"
              role="dialog"
            >
              <div
                className="bg-gray-900 text-white rounded-lg shadow-2xl p-6 max-w-xs w-full mx-4 md:mx-0 md:absolute md:bottom-16 md:right-8 border border-red-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-2">
                  {infoTitle && <span className="font-semibold text-red-400">{infoTitle}</span>}
                  <button
                    className="text-gray-400 hover:text-white focus:outline-none"
                    aria-label="Close info"
                    onClick={() => setShowInfo(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="text-sm">{info}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Switch;
