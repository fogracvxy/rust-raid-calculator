import React from "react";
import Image from "next/image";
import { CollectionItem } from "../types";
interface BestOptionSulfurCostProps {
  collection: CollectionItem[];
  calculateCost: (option: string, quantity: number) => number;
}
const BestOptionSulfurCost: React.FC<BestOptionSulfurCostProps> = ({
  collection,
  calculateCost,
}) => {
  const totalQuantity = collection.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  if (totalQuantity === 0) {
    return null; // If totalQuantity is 0, return nothing
  }
  const options = ["c4", "bullets", "rockets", "satchel"].filter((option) => {
    const totalCost = collection.reduce((total, c) => {
      const optionValue =
        c.item.bestOption?.[option as keyof typeof c.item.bestOption] || 0;
      return total + calculateCost(option, optionValue * c.quantity);
    }, 0);
    return totalCost > 0;
  });

  if (options.length === 0) {
    return null; // If no options have a cost, return nothing
  }
  return (
    <div className="p-4 py-8">
      <h2 className="text-xl font-bold  ml-6 mb-4">Best Option Sulfur Cost</h2>
      <div className="flex  ml-6">
        {options.map((option) => {
          const totalCost = collection.reduce((total, c) => {
            const optionValue =
              c.item.bestOption?.[option as keyof typeof c.item.bestOption] ||
              0;
            return total + calculateCost(option, optionValue * c.quantity);
          }, 0);
          return (
            <div key={option} className="flex items-center mr-4">
              <div style={{ position: "relative" }}>
                <Image
                  src={`/images/${option}.png`}
                  height={50}
                  width={50}
                  alt={option.toUpperCase()}
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
                  <p className="opacity-100">{totalCost}</p>
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
          );
        })}
      </div>
    </div>
  );
};
export default BestOptionSulfurCost;
