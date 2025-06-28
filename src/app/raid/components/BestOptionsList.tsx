import React from "react";
import Image from "next/image";
import { CollectionItem } from "../types";

interface BestOptionsListProps {
  collection: CollectionItem[];
}

const BestOptionsList: React.FC<BestOptionsListProps> = ({ collection }) => {
  const totalQuantity = collection.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity === 0) {
    return null;
  }

  const options = [
    { id: "c4", image: "/images/tools/c4.png" },
    { id: "bullets", image: "/images/ammunition/ammo.rifle.explosive.png" },
    { id: "rockets", image: "/images/ammunition/rockets.png" },
    { id: "satchel", image: "/images/tools/satchel.png" },
  ];
  const optionTotals = options.reduce((acc, option) => {
    const total = collection.reduce(
      (sum, c) => sum + (c.item.bestOption?.[option.id as keyof typeof c.item.bestOption] || 0) * c.quantity,
      0
    );
    if (total > 0) {
      acc[option.id] = { total, option };
    }
    return acc;
  }, {} as Record<string, { total: number; option: { image: string } }>);

  if (Object.keys(optionTotals).length === 0) {
    return null;
  }

  return (
    <div className="mt-8 ml-10">
      <h2 className="text-xl font-bold mb-2">Best Options Calculated</h2>
      <div className="flex flex-wrap">
        {Object.entries(optionTotals).map(
          ([
            option,
            {
              total,
              option: { image },
            },
          ]) => (
            <div key={option} className="flex items-center mr-4 mb-4 relative">
              <div className="relative">
                <Image src={image} height={50} width={50} alt={option} />
                <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                  {total}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BestOptionsList;
