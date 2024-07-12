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
  return (
    <div className="space-y-2">
      {collection.map((c) => (
        <div
          key={`${c.item.name}`}
          className="flex items-center justify-between bg-gblack border-neutral-600 border p-2 rounded"
        >
          <div className="flex items-center">
            <Image
              src={c.item.image}
              alt={c.item.name}
              width={32}
              height={32}
              className="mr-2"
            />
            <p className="text-sm">
              {c.item.name} x {c.quantity}
            </p>
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm text-xs"
            onClick={() => handleRemoveItem(c.item)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
