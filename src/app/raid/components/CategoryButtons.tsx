import React from "react";

interface CategoryButtonsProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const categories = [
  { id: "Walls", icon: "🧱" },
  { id: "Doors", icon: "🚪" },
  { id: "Defenses", icon: "🛡️" },
  { id: "Furniture", icon: "🪑" },
  { id: "External Walls", icon: "🏰" },
];

const CategoryButtons: React.FC<CategoryButtonsProps> = React.memo(
  ({ activeCategory, setActiveCategory }) => {
    return (
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" 
            />
          </svg>
          Select Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-red-700 text-white shadow-md shadow-red-900/20 border border-red-600"
                  : "text-gray-300 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 hover:border-gray-600"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              <span>{category.id}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);
CategoryButtons.displayName = "CategoryButtons";
export default CategoryButtons;
