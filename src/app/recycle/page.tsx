"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { itemsRecycle } from "./data/items_recycle";
import { resources } from "./data/resources";
import { motion, AnimatePresence } from "framer-motion";
import { trackFeatureUsage, trackSettingChange, trackCalculatorUsage } from "../utils/analytics";

interface ItemRecycle {
  name: string;
  yield: Yield;
  yieldsafezone?: Yield;
  yieldradioactive?: Yield;
  image: string;
}

interface Yield {
  scrap?: number | null;
  metal?: number | null;
  highQualityMetal?: number | null;
  cloth?: number | null;
  rope?: number | null;
  other?: string;
}

type Mode = "Safezone" | "Radtown" | "Default";

const Recycle: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; amount: number }[]
  >([]);
  const [mode, setMode] = useState<Mode>("Default");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [editingItemName, setEditingItemName] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState<string>("");
  const initialized = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastClickTime = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!initialized.current && typeof window !== "undefined") {
      const storedSelectedItems = localStorage.getItem("selectedItems");
      const storedMode = localStorage.getItem("mode") as Mode | null;

      if (storedSelectedItems) {
        setSelectedItems(JSON.parse(storedSelectedItems));
      }

      if (
        storedMode === "Safezone" ||
        storedMode === "Radtown" ||
        storedMode === "Default"
      ) {
        setMode(storedMode);
      }

      initialized.current = true;
      
      // Track page view
      trackCalculatorUsage("recycle");
    }
  }, []);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }, [selectedItems]);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  // Get unique categories from items
  const categories = useMemo(() => {
    const cats = new Set<string>();
    itemsRecycle.forEach(item => {
      if (item.yield.other) {
        cats.add(item.yield.other);
      }
    });
    return ["All", ...Array.from(cats)];
  }, []);

  const handleIncrement = (itemName: string) => {
    // Prevent rapid consecutive clicks
    const now = Date.now();
    if (now - (lastClickTime.current[`inc_${itemName}`] || 0) < 300) {
      return;
    }
    lastClickTime.current[`inc_${itemName}`] = now;
    
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === itemName);
      if (existingItem) {
        trackFeatureUsage("recycle_item_adjust", `increment_${itemName}`);
        return prevItems.map((item) =>
          item.name === itemName ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        trackFeatureUsage("recycle_item_add", itemName);
        return [...prevItems, { name: itemName, amount: 1 }];
      }
    });
  };

  const handleDecrement = (itemName: string) => {
    // Prevent rapid consecutive clicks
    const now = Date.now();
    if (now - (lastClickTime.current[`dec_${itemName}`] || 0) < 300) {
      return;
    }
    lastClickTime.current[`dec_${itemName}`] = now;
    
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === itemName);
      if (existingItem && existingItem.amount > 0) {
        trackFeatureUsage("recycle_item_adjust", `decrement_${itemName}`);
        return prevItems
          .map((item) =>
            item.name === itemName
              ? { ...item, amount: item.amount - 1 }
              : item
          )
          .filter((item) => item.amount > 0);
      } else {
        return prevItems;
      }
    });
  };

  const resetSelectedItems = () => {
    if (selectedItems.length > 0) {
      trackFeatureUsage("recycle_reset", `items_count_${selectedItems.length}`);
    }
    setSelectedItems([]);
    localStorage.removeItem("selectedItems");
  };

  const handleModeChange = (newMode: Mode) => {
    trackSettingChange("recycle_mode", newMode);
    setMode(newMode);
  };

  const handleCategoryChange = (category: string) => {
    trackSettingChange("recycle_category", category);
    setSelectedCategory(category);
  };

  const handleSearch = (term: string) => {
    if (term.length > 2) {
      trackFeatureUsage("recycle_search", term);
    }
    setSearchTerm(term);
  };

  const totalYield = useMemo(() => {
    const totals: Record<string, number> = {
      totalScrap: 0,
      totalMetal: 0,
      totalCloth: 0,
      totalHighQualityMetal: 0,
      totalRope: 0,
    };

    selectedItems.forEach((item) => {
      const selectedItem = itemsRecycle.find((i) => i.name === item.name);
      if (selectedItem) {
        const yieldType =
          mode === "Safezone"
            ? "yieldsafezone"
            : mode === "Radtown"
            ? "yieldradioactive"
            : "yield";
        const itemYield = selectedItem[yieldType] || {};

        totals.totalScrap += (itemYield.scrap || 0) * item.amount;
        totals.totalMetal += (itemYield.metal || 0) * item.amount;
        totals.totalCloth += (itemYield.cloth || 0) * item.amount;
        totals.totalHighQualityMetal +=
          (itemYield.highQualityMetal || 0) * item.amount;
        totals.totalRope += (itemYield.rope || 0) * item.amount;
      }
    });

    return totals;
  }, [selectedItems, mode]);

  // Filter items based on search term and category
  const filteredItems = useMemo(() => {
    return itemsRecycle.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.yield.other === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calculate the total number of items selected
  const totalItemsCount = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.amount, 0);
  }, [selectedItems]);

  // Handle direct number input for item quantity
  const handleQuantityChange = (itemName: string, value: string) => {
    setEditingItemName(itemName);
    setTempAmount(value);
  };

  const handleQuantityBlur = (itemName: string) => {
    const numValue = parseInt(tempAmount);
    
    if (!isNaN(numValue)) {
      if (numValue > 0) {
        // Update item with new quantity
        setSelectedItems((prevItems) => {
          const existingItem = prevItems.find((item) => item.name === itemName);
          if (existingItem) {
            return prevItems.map((item) =>
              item.name === itemName ? { ...item, amount: numValue } : item
            );
          } else {
            return [...prevItems, { name: itemName, amount: numValue }];
          }
        });
      } else {
        // Remove item if quantity is 0
        setSelectedItems((prevItems) => 
          prevItems.filter(item => item.name !== itemName)
        );
      }
    }
    
    setEditingItemName(null);
    setTempAmount("");
  };

  const handleQuantityKeyDown = (e: React.KeyboardEvent, itemName: string) => {
    if (e.key === "Enter") {
      handleQuantityBlur(itemName);
    } else if (e.key === "Escape") {
      setEditingItemName(null);
      setTempAmount("");
    }
  };

  // Focus input field when entering edit mode
  useEffect(() => {
    if (editingItemName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingItemName]);

  return (
    <motion.div 
      className="container mx-auto px-4 py-6 mb-24 md:mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-gray-900 to-black py-6 px-4 rounded-lg border border-gray-800 shadow-2xl mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-white">
          Recycling Calculator
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          Select items and see what resources you&apos;ll get in different recycling modes
        </p>
        
        {/* Mode Selection and Reset Button */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
          <div className="relative">
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value as Mode)}
              className="py-2 pl-10 pr-4 bg-black border border-gray-700 rounded-md text-white appearance-none focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
            >
              <option value="Default">Default</option>
              <option value="Safezone">Safezone</option>
              <option value="Radtown">Radtown</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          
          <button
            onClick={resetSelectedItems}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Reset
          </button>
          
          {totalItemsCount > 0 && (
            <div className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-md shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="font-medium">{totalItemsCount}</span> <span className="ml-1 text-sm text-gray-200">items</span>
            </div>
          )}
        </div>
        
        {/* Search and Filtering */}
        <div className="flex flex-col md:flex-row justify-center gap-3 mb-6">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search items..."
              className="w-full py-2 pl-10 pr-4 bg-black border border-gray-700 rounded-md text-white focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="py-2 pl-10 pr-4 bg-black border border-gray-700 rounded-md text-white appearance-none focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item: ItemRecycle) => {
            const selectedItem = selectedItems.find((i) => i.name === item.name);
            const amount = selectedItem ? selectedItem.amount : 0;
            const isEditing = editingItemName === item.name;
            
            // Get current yield based on mode
            const currentYield = mode === "Safezone" 
              ? item.yieldsafezone || item.yield 
              : mode === "Radtown" 
                ? item.yieldradioactive || item.yield 
                : item.yield;

            return (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col bg-gradient-to-b from-gray-900 to-black border ${amount > 0 ? 'border-red-800' : 'border-gray-800'} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all`}
              >
                <div className="p-3 relative flex flex-col items-center">
                  <div className="h-16 w-16 relative mb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full opacity-80"></div>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={64} 
                      height={64}
                      className="drop-shadow-lg relative z-10"
                      priority={item.name.includes("gears")}
                    />
                    {amount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-20">
                        {amount}
                      </div>
                    )}
                  </div>
                  <h3 className="text-white text-sm font-medium text-center mb-1">{item.name}</h3>
                  
                  {/* Resource yields preview */}
                  <div className="flex justify-center space-x-1 mt-1 mb-2">
                    {currentYield.scrap && (
                      <div className="relative group">
                        <div className="w-5 h-5 relative">
                          <Image 
                            src="/images/resources/scrap.png" 
                            alt="Scrap" 
                            width={20} 
                            height={20} 
                            priority
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {currentYield.scrap} scrap
                        </div>
                      </div>
                    )}
                    {currentYield.metal && (
                      <div className="relative group">
                        <div className="w-5 h-5 relative">
                          <Image 
                            src="/images/resources/metal.fragments.png" 
                            alt="Metal" 
                            width={20} 
                            height={20}
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {currentYield.metal} metal
                        </div>
                      </div>
                    )}
                    {currentYield.highQualityMetal && (
                      <div className="relative group">
                        <div className="w-5 h-5 relative">
                          <Image 
                            src="/images/resources/metal.refined.png" 
                            alt="HQM" 
                            width={20} 
                            height={20}
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {currentYield.highQualityMetal} HQM
                        </div>
                      </div>
                    )}
                    {currentYield.cloth && (
                      <div className="relative group">
                        <div className="w-5 h-5 relative">
                          <Image 
                            src="/images/resources/cloth.png" 
                            alt="Cloth" 
                            width={20} 
                            height={20}
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {currentYield.cloth} cloth
                        </div>
                      </div>
                    )}
                    {currentYield.rope && (
                      <div className="relative group">
                        <div className="w-5 h-5 relative">
                          <Image 
                            src="/images/components/rope.png" 
                            alt="Rope" 
                            width={20} 
                            height={20}
                          />
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {currentYield.rope} rope
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quantity Controls - Simplified, using onClick instead of touch/mouse events */}
                  <div className="flex items-center mt-auto w-full">
                    <button
                      onClick={() => handleDecrement(item.name)}
                      className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 w-10 h-8 flex items-center justify-center text-white rounded-l transition-colors"
                      disabled={amount === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    {/* Direct number input or display */}
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        type="number"
                        min="0"
                        value={tempAmount}
                        onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                        onBlur={() => handleQuantityBlur(item.name)}
                        onKeyDown={(e) => handleQuantityKeyDown(e, item.name)}
                        className="h-8 bg-gray-800 flex-1 text-center text-white text-sm border-y border-black/40 focus:outline-none focus:ring-1 focus:ring-red-500"
                        style={{ width: "100%", minWidth: "40px" }}
                      />
                    ) : (
                      <div 
                        className="h-8 min-w-10 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-white text-sm font-medium px-2 border-y border-black/40 shadow-inner flex-1 cursor-pointer"
                        onClick={() => {
                          setEditingItemName(item.name);
                          setTempAmount(amount.toString());
                        }}
                      >
                        {amount}
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleIncrement(item.name)}
                      className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 w-10 h-8 flex items-center justify-center text-white rounded-r transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="mb-2">No items found</p>
          <p className="text-sm">Try a different search term or category</p>
        </div>
      )}
      
      {/* Recycle Summary */}
      {selectedItems.length > 0 && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-gray-900 text-white border-t border-gray-800 shadow-[0_-5px_15px_rgba(0,0,0,0.3)] z-20"
        >
          <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-medium flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    mode === 'Safezone' ? 'bg-blue-500' : 
                    mode === 'Radtown' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className={
                    mode === 'Safezone' ? 'text-blue-400' : 
                    mode === 'Radtown' ? 'text-green-400' : 'text-red-400'
                  }>{mode}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span>Recycle Summary</span>
                </h2>
                <p className="text-sm text-gray-400">
                  Total Items: {totalItemsCount} • Different Types: {selectedItems.length}
                </p>
              </div>
              
              <div className="flex items-center flex-wrap justify-center gap-2 md:gap-4">
                {resources.map((resource) => {
                  const totalResource = totalYield[`total${resource.name}`];
                  if (!totalResource) return null;
                  
                  return (
                    <motion.div 
                      key={resource.name} 
                      className="flex items-center bg-black bg-opacity-50 rounded-lg p-2 shadow-md"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className="relative h-10 w-10 mr-2">
                        <Image
                          src={resource.image}
                          fill
                          sizes="40px"
                          alt={resource.name}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs">{resource.name}</div>
                        <div className="text-white font-bold text-lg">{totalResource}</div>
                      </div>
                    </motion.div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Recycle;
