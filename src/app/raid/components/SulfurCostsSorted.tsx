import React from "react";
import Image from "next/image";

import { SortedSulfurCost } from "../types";

interface SulfurCostsSortedProps {
  sortedOptions: SortedSulfurCost[];
}

const SulfurCostsSorted: React.FC<SulfurCostsSortedProps> = ({
  sortedOptions,
}) => {
  const totalQuantity = sortedOptions.reduce(
    (sum, option) => sum + option.quantity,
    0
  );

  if (totalQuantity === 0) {
    return null; // If totalQuantity is 0, return nothing
  }

  return (
    <div className="p-4 py-8 ml-6">
      <h2 className="text-xl font-bold mb-4">
        Sulfur Costs Sorted (Lowest to Highest)
      </h2>
      <div className="flex">
        {sortedOptions.map(({ item, quantity }) => (
          <div key={item} className="flex items-center mr-4">
            <div style={{ position: "relative" }}>
              <Image
                src={`/images/${item}.png`}
                height={50}
                width={50}
                alt={item.toUpperCase()}
              />
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#DDD71B",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                <p className="opacity-100">{quantity}</p>
                <div className="flex flex-col w-20 h-20 absolute top-0 left-0">
                  <Image
                    src="/images/sulfur.png"
                    height={15}
                    width={15}
                    alt="Sulfur"
                    className="brightness-100"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SulfurCostsSorted;
