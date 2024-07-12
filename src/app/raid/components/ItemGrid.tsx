import React from "react";
import Image from "next/image";
import { Item, CollectionItem } from "../types";

interface ItemGridProps {
  category: string | null;
  items: Item[];
  collection: CollectionItem[];
  handleAddItem: (item: Item) => void;
  handleRemoveItem: (item: Item) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({
  category,
  items,
  collection,
  handleAddItem,
  handleRemoveItem,
}) => {
  const renderItemsByCategory = (category: string) => {
    const filteredItems = items.filter((item) => item.category === category);

    return filteredItems.map((item) => {
      const collectionItem = collection.find((c) => c.item.name === item.name);
      const quantity = collectionItem ? collectionItem.quantity : 0;

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
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-sm ml-2  rounded-r"
              onClick={() => handleAddItem(item)}
            >
              +
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {category && renderItemsByCategory(category)}
    </div>
  );
};

export default ItemGrid;
