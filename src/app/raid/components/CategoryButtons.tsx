import React from "react";

interface CategoryButtonsProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const categories = [
  "Walls",
  "Doors",
  "Defenses",
  "Furniture",
  "External Walls",
];

const CategoryButtons: React.FC<CategoryButtonsProps> = React.memo(
  ({ activeCategory, setActiveCategory }) => {
    return (
      <div className="flex justify-center flex-wrap gap-4 my-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`text-sm font-semibold px-3 py-1 rounded ${
              activeCategory === category
                ? "bg-red-600 text-white"
                : "text-white border border-gray-300 hover:bg-red-600"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
);
CategoryButtons.displayName = "CategoryButtons";
export default CategoryButtons;
