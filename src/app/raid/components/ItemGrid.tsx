import React, { useMemo } from "react";
import Image from "next/image";
import { Item, CollectionItem } from "../types";
import { motion } from "framer-motion";

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

    if (!category || filteredItems.length === 0) {
      return null;
    }

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.02
        }
      }
    };
    
    const itemVariant = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
      <motion.div 
        className="mt-8 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="flex items-center mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl text-white font-bold tracking-tight">
            {category} <span className="text-red-500">Items</span>
          </h2>
          <div className="ml-4 bg-gray-800 px-2.5 py-1 rounded-full text-xs font-medium text-gray-300">
            {filteredItems.length} available
          </div>
          <div className="flex-grow border-t border-gray-800 ml-5"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredItems.map((item, index) => {
            const quantity = collectionMap.get(item.name) || 0;
            const inCollection = quantity > 0;

            return (
              <motion.div 
                key={item.name} 
                className={`relative group bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-300 ${
                  inCollection 
                    ? 'border-red-800/50 ring-1 ring-red-800/50 shadow-[0_0_15px_rgba(185,28,28,0.15)]' 
                    : 'border border-gray-800 hover:border-gray-700'
                }`}
                variants={itemVariant}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Background pattern for added visual interest */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_10%_20%,transparent_0,transparent_60%,#111_60.2%,#111_100%)]"></div>
                
                <div className="p-4 flex flex-col items-center relative z-10">
                  <div className="w-28 h-28 relative flex items-center justify-center rounded-lg p-2 mb-3">
                    {/* Base glow effect for item image */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-black to-gray-900 ${
                      inCollection ? 'shadow-[inset_0_0_40px_rgba(185,28,28,0.15)]' : 'shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]'
                    }`}></div>
                    
                    {/* Center spotlight effect */}
                    <div className="absolute inset-2 rounded-lg opacity-20 bg-[radial-gradient(circle_at_center,#fff_0,transparent_70%)]"></div>
                    
                    {/* Item image with subtle animation */}
                    <motion.div
                      className="relative z-10"
                      animate={{ rotate: [0, inCollection ? 1 : 0, inCollection ? -1 : 0, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="object-contain drop-shadow-lg"
                        height={90}
                        width={90}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMxMTEiLz48L3N2Zz4="
                      />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-center text-white mb-4 h-10 flex items-center">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center justify-center w-full mt-1 relative">
                    <button
                      className={`relative group-hover:scale-105 h-9 w-9 flex items-center justify-center rounded-l-md transition-all duration-200 ${
                        quantity === 0
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          : 'bg-red-800/90 hover:bg-red-700 text-white shadow-md'
                      }`}
                      onClick={() => handleRemoveItem(item)}
                      disabled={quantity === 0}
                      aria-label={`Remove ${item.name}`}
                    >
                      <span className="block text-lg font-bold">-</span>
                      {/* Add subtle glow effect on hover for enabled buttons */}
                      {quantity > 0 && (
                        <motion.div 
                          className="absolute inset-0 rounded-l-md bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity"
                          whileHover={{ opacity: 0.3 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </button>
                    
                    <div className="h-9 min-w-10 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-white text-sm font-medium px-3 border-y border-black/40 shadow-inner">
                      {quantity}
                    </div>
                    
                    <button
                      className="relative group-hover:scale-105 h-9 w-9 flex items-center justify-center bg-green-700/90 hover:bg-green-600 text-white rounded-r-md transition-all duration-200 shadow-md"
                      onClick={() => handleAddItem(item)}
                      aria-label={`Add ${item.name}`}
                    >
                      <span className="block text-lg font-bold">+</span>
                      {/* Add subtle glow effect on hover */}
                      <motion.div 
                        className="absolute inset-0 rounded-r-md bg-green-500 opacity-0 hover:opacity-20 transition-opacity"
                        whileHover={{ opacity: 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </button>
                  </div>
                </div>
                
                {inCollection && (
                  <div className="bg-gradient-to-r from-red-900/30 via-red-800/30 to-red-900/30 text-xs border-t border-red-900/30 text-center py-1.5 text-red-400 font-medium">
                    {quantity} in collection
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    );
  }
);
ItemGrid.displayName = "ItemGrid";
export default ItemGrid;
