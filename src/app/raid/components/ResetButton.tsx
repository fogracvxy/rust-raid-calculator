import React from "react";
import { CollectionItem } from "../types";
interface ResetButtonProps {
  handleResetAll: () => void;
  collection: CollectionItem[];
}

const ResetButton: React.FC<ResetButtonProps> = ({
  handleResetAll,
  collection,
}) => {
  // Check if any item in the collection has a quantity greater than 0
  const hasItems = collection.some((item) => item.quantity > 0);

  // If no item has a quantity greater than 0, return null (don't render the button)
  if (!hasItems) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleResetAll}
      >
        Reset All and Clear Storage
      </button>
    </div>
  );
};

export default ResetButton;
