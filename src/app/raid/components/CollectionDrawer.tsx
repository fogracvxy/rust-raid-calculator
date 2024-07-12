import React, { useState } from "react";
import Image from "next/image";
import CollectionList from "./CollectionList";
import CollectionSummary from "./CollectionSummary";
import { CollectionItem, Item, Resource, SortedSulfurCost } from "../types";

interface CollectionDrawerProps {
  collection: CollectionItem[];
  handleRemoveItem: (item: Item) => void;
  calculateCost: (option: string, quantity: number) => number;
  resources: Resource[];
  sortedOptions: SortedSulfurCost[];
  handleResetAll: () => void;
}

const CollectionDrawer: React.FC<CollectionDrawerProps> = ({
  collection,
  handleRemoveItem,
  calculateCost,
  resources,
  sortedOptions,
  handleResetAll,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (collection.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-black text-white transition-all duration-300 ease-in-out border-t-2 border-gray-700 ${
        isExpanded ? "h-[50vh]" : "h-16"
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-16">
          <h2 className="text-lg font-bold">Collection Summary</h2>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2  md:py-2 md:px-4 rounded"
            onClick={handleResetAll}
          >
            Reset
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm">{collection.length} item(s)</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${
                isExpanded ? "bg-red-600" : "bg-green-600"
              } text-white px-2 py-1 rounded`}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-4rem)] overflow-hidden">
            <div className="overflow-y-auto scrollbar-custom pr-4">
              <h3 className="text-md font-semibold mb-2">Items</h3>
              <CollectionList
                collection={collection}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
            <div className="overflow-y-auto scrollbar-custom pr-4">
              <CollectionSummary
                collection={collection}
                handleRemoveItem={handleRemoveItem}
                calculateCost={calculateCost}
                resources={resources}
                sortedOptions={sortedOptions}
                handleResetAll={handleResetAll}
              />
              <div className="mt-4 flex justify-end"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDrawer;
