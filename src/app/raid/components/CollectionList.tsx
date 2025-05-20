// This component has been deprecated and replaced by inline implementation in CollectionDrawer.tsx
// Keeping this file for reference or if we need to revert back.

import React from "react";
import { CollectionItem, Item } from "../types";
import Image from "next/image";

interface CollectionListProps {
  collection: CollectionItem[];
  handleRemoveItem: (item: Item) => void;
}

const CollectionList: React.FC<CollectionListProps> = ({ collection, handleRemoveItem }) => {
  return (
    <div className="space-y-2">
      {collection.map(({ item, quantity }) => (
        <div
          key={item.name}
          className="flex items-center bg-gray-800 p-2 rounded-md"
        >
          <div className="flex-shrink-0 mr-3">
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={40}
              className="rounded"
            />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <p className="text-white">{item.name}</p>
              <div className="flex items-center">
                <span className="text-white mr-2">{quantity}x</span>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 hover:text-red-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
