import React, { useMemo } from "react";
import Image from "next/image";
import { Item, CollectionItem } from "../types";

interface ItemGridProps {
  category: string | null;
  items: Item[];
  collection: CollectionItem[];
  handleAddItem: (item: Item) => void;
  handleRemoveItem: (item: Item) => void;
}

const ItemGrid: React.FC<ItemGridProps> = React.memo(
  ({ category, items, collection, handleAddItem, handleRemoveItem }) => {
    const filteredItems = useMemo(() => {
      return category ? items.filter((item) => item.category === category) : [];
    }, [category, items]);

    const collectionMap = useMemo(() => {
      const map = new Map<string, number>();
      collection.forEach((c) => {
        map.set(c.item.name, c.quantity);
      });
      return map;
    }, [collection]);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredItems.map((item) => {
          const quantity = collectionMap.get(item.name) || 0;

          return (
            <div key={item.name} className="bg-black rounded-lg shadow-md p-2">
              <Image
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain mx-auto mb-2"
                height={100}
                width={100}
              />
              <p className="text-sm font-semibold text-center">{item.name}</p>
              <div className="flex justify-center items-center mt-2">
                <button
                  className="bg-red-600 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-sm mr-2 rounded-l"
                  onClick={() => handleRemoveItem(item)}
                >
                  -
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-sm ml-2 rounded-r"
                  onClick={() => handleAddItem(item)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
ItemGrid.displayName = "ItemGrid";
export default ItemGrid;
