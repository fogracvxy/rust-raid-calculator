import React from "react";
import Image from "next/image";
import { Item, CollectionItem } from "../types";

interface CollectionListProps {
  collection: CollectionItem[];
  handleRemoveItem: (item: Item) => void;
}

const CollectionList: React.FC<CollectionListProps> = ({
  collection,
  handleRemoveItem,
}) => {
  const totalQuantity = collection.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  if (totalQuantity === 0) {
    return null;
  }
  return (
    <div className="mt-8 ml-10">
      <h2 className="text-xl font-bold mb-2">Collection</h2>
      {collection.map((c) => (
        <div key={`${c.item.name}`} className="mb-6">
          <div className="flex items-center mb-2">
            <p className="flex-1 underline underline-offset-4">
              {c.item.name} x {c.quantity}
            </p>
            <button
              className="bg-red-600 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-sm mr-6"
              onClick={() => handleRemoveItem(c.item)}
            >
              Remove
            </button>
          </div>
          {c.item.bestOption && (
            <div className="mt-2 ml-10">
              <h2 className="text-md font-bold mb-2">Best Option (x1) </h2>
              <div className="flex flex-wrap">
                {Object.entries(c.item.bestOption).map(([option, value]) => (
                  <div
                    key={option}
                    className="flex items-center mr-4 mb-4 relative"
                  >
                    {value > 0 && (
                      <div className="relative">
                        <Image
                          src={`/images/${option}.png`}
                          height={35}
                          width={35}
                          alt={option}
                        />
                        <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                          {value}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
