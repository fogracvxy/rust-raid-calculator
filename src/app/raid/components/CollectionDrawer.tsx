import React, { useState, useRef } from "react";
import Image from "next/image";
import { CollectionItem, Item, Resource, SortedSulfurCost } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface CollectionDrawerProps {
  collection: CollectionItem[];
  handleRemoveItem: (item: Item) => void;
  calculateCost: (option: string, quantity: number) => number;
  resources: Resource[];
  sortedOptions: SortedSulfurCost[];
  handleResetAll: () => void;
  handleAddItem: (item: Item) => void;
}

const CollectionDrawer: React.FC<CollectionDrawerProps> = ({
  collection,
  handleRemoveItem,
  handleAddItem,
  calculateCost,
  resources,
  sortedOptions,
  handleResetAll,
}) => {
  const [activeTab, setActiveTab] = useState<'collection' | 'analysis' | 'strategy'>('collection');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (collection.length === 0) {
    return null;
  }

  // Handle mouse/touch down for drag scrolling
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    
    // Get the correct client X whether it's a touch or mouse event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    setStartX(clientX);
    if (tabsContainerRef.current) {
      setScrollLeft(tabsContainerRef.current.scrollLeft);
    }
  };

  // Handle mouse/touch move for drag scrolling
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    // Get the correct client X whether it's a touch or mouse event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    if (tabsContainerRef.current) {
      const x = clientX - startX;
      tabsContainerRef.current.scrollLeft = scrollLeft - x;
    }
  };

  // Handle mouse/touch up to end drag scrolling
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Group items by category
  const groupedItems = collection.reduce((acc, { item, quantity }) => {
    const category = acc.find(g => g.category === item.category);
    
    if (category) {
      category.items.push({ item, quantity });
    } else {
      acc.push({
        category: item.category,
        items: [{ item, quantity }]
      });
    }
    
    return acc;
  }, [] as { category: string; items: CollectionItem[] }[]);

  // Calculate total sulfur cost per raiding method
  const sulfurCosts = {
    c4: calculateTotalSulfur("c4"),
    rockets: calculateTotalSulfur("rockets"),
    satchel: calculateTotalSulfur("satchel"),
    bullets: calculateTotalSulfur("bullets"),
  };

  // Find best (lowest) sulfur cost
  const bestMethod = Object.entries(sulfurCosts)
    .sort((a, b) => a[1] - b[1])[0];

  function calculateTotalSulfur(method: string) {
    return sortedOptions.find(option => option.item === method)?.quantity || 0;
  }
  
  // Calculate resources needed for all items
  function calculateResources() {
    let c4 = 0;
    let bullets = 0;
    let rockets = 0;
    let satchel = 0;

    collection.forEach((c) => {
      c4 += c.item.destructionOptions.c4 * c.quantity;
      bullets += c.item.destructionOptions.bullets * c.quantity;
      rockets += c.item.destructionOptions.rockets * c.quantity;
      satchel += c.item.destructionOptions.satchel * c.quantity;
    });

    return { c4, bullets, rockets, satchel };
  }
  
  // Get sulfur cost for a specific raiding method
  function getSulfurCost(method: keyof Item["destructionOptions"]) {
    switch (method) {
      case "c4":
        return 2200;
      case "rockets":
        return 1400;
      case "satchel":
        return 480;
      case "bullets":
        return 50;
      default:
        return 0;
    }
  }

  const resourceImages = {
    c4: "/images/tools/c4.png",
    rockets: "/images/ammunition/rockets.png",
    satchel: "/images/tools/satchel.png",
    bullets: "/images/ammunition/ammo.rifle.explosive.png",
  };

  const totalItems = collection.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <motion.div 
      className="mt-10 bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with tabs - Now with horizontal scrolling */}
      <div className="border-b border-gray-800">
        <div 
          className="flex overflow-x-auto scrollbar-hide" 
          ref={tabsContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <button 
            className={`flex items-center px-6 py-4 relative whitespace-nowrap ${activeTab === 'collection' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('collection')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
            <span className="font-medium">Items</span>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </div>
            {activeTab === 'collection' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
          </button>
          
          <button 
            className={`flex items-center px-6 py-4 relative whitespace-nowrap ${activeTab === 'analysis' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('analysis')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Analysis</span>
            {activeTab === 'analysis' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
          </button>
          
          <button 
            className={`flex items-center px-6 py-4 relative whitespace-nowrap ${activeTab === 'strategy' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            onClick={() => setActiveTab('strategy')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            <span className="font-medium">Strategy</span>
            {activeTab === 'strategy' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
          </button>
          
          <div className="ml-auto flex items-center px-4 whitespace-nowrap">
            <button
              className="bg-red-700 hover:bg-red-600 text-white text-sm py-1.5 px-3 rounded-md transition-colors flex items-center"
              onClick={handleResetAll}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          </div>
        </div>
      </div>
      
      {/* Add a hint for mobile users to let them know they can scroll */}
      <div className="bg-gray-900/50 text-gray-400 text-xs text-center py-1 border-b border-gray-800 md:hidden">
        <span>Swipe tabs horizontally ↔️ to see more</span>
      </div>
      
      {/* Collection Items Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'collection' && collection.length > 0 && (
          <motion.div 
            className="p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-5">
              {groupedItems.map((group, groupIndex) => (
                <motion.div 
                  key={group.category} 
                  className="border border-gray-800 rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
                >
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center">
                    <h3 className="text-sm font-medium text-white">{group.category}</h3>
                    <span className="ml-2 bg-gray-700 text-xs text-gray-300 rounded-full px-2 py-0.5">
                      {group.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="p-4 bg-gradient-to-b from-gray-900/80 to-gray-900/95">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.items.map(({ item, quantity }, index) => (
                        <motion.div 
                          key={item.name} 
                          className="relative flex items-center bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-gray-800 hover:border-gray-700 transition-all shadow-md hover:shadow-lg group"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 + index * 0.03 }}
                          whileHover={{ y: -2 }}
                        >
                          <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-gray-900/20 to-black/20 rounded-lg pointer-events-none"></div>
                          <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-gray-800 to-black flex-shrink-0 mr-3 flex items-center justify-center shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0.5 rounded-md bg-black/80"></div>
                            <motion.div 
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                              className="relative z-10"
                            >
                              <Image 
                                src={item.image} 
                                alt={item.name}
                                width={36} 
                                height={36} 
                                className="object-contain drop-shadow-md"
                              />
                            </motion.div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="text-white truncate font-medium group-hover:text-red-500 transition-colors duration-200">{item.name}</div>
                            <div className="flex items-center mt-2">
                              <button
                                className="h-8 w-8 flex items-center justify-center bg-red-800/90 hover:bg-red-700 text-white rounded-l-md text-sm transition-colors shadow-md"
                                onClick={() => handleRemoveItem(item)}
                                aria-label={`Remove ${item.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <div className="h-8 min-w-10 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-white text-sm font-medium px-2 border-y border-black/40 shadow-inner">
                                {quantity}
                              </div>
                              <button
                                className="h-8 w-8 flex items-center justify-center bg-green-700/90 hover:bg-green-600 text-white rounded-r-md text-sm transition-colors shadow-md"
                                onClick={() => handleAddItem(item)}
                                aria-label={`Add ${item.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      
        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="p-5">
            {/* Best raiding method */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h3 className="text-lg font-medium text-white">Most Efficient Method</h3>
              </div>
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 rounded-lg border border-gray-800 shadow-md">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-14 w-14 bg-black rounded-full mr-4 shadow-inner">
                    <Image 
                      src={resourceImages[bestMethod[0] as keyof typeof resourceImages]} 
                      alt={bestMethod[0]}
                      width={32} 
                      height={32} 
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white capitalize">{bestMethod[0]}</div>
                    <div className="flex items-center mt-1">
                      <div className="text-red-500 text-2xl font-bold">{bestMethod[1].toLocaleString()}</div>
                      <div className="text-gray-400 ml-2">sulfur</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resources grid */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h3 className="text-lg font-medium text-white">Required Resources</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {resources.map(resource => resource.quantity > 0 && (
                  <div key={resource.name} className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex items-center">
                    <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center mr-3 shadow-inner">
                      <Image 
                        src={resource.image} 
                        alt={resource.name}
                        width={24} 
                        height={24} 
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{resource.name}</div>
                      <div className="text-white font-bold text-lg">{resource.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sulfur costs comparison */}
            <div>
              <div className="flex items-center mb-3">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-medium text-white">Sulfur Cost Comparison</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(sulfurCosts)
                  .sort((a, b) => a[1] - b[1])
                  .map(([method, cost], index) => (
                  <div 
                    key={method} 
                    className={`bg-gray-900 border rounded-lg p-3 flex flex-col justify-between ${
                      index === 0 
                        ? 'border-red-800 ring-1 ring-red-800' 
                        : 'border-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Image 
                          src={resourceImages[method as keyof typeof resourceImages]} 
                          alt={method}
                          width={16} 
                          height={16} 
                          className="object-contain mr-2"
                        />
                        <div className="capitalize text-sm text-white">{method}</div>
                      </div>
                      {index === 0 && (
                        <span className="inline-block bg-red-900/50 text-red-500 text-xs px-1.5 py-0.5 rounded-sm font-medium">
                          Best
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold">
                      {cost.toLocaleString()} <span className="text-xs text-gray-500 font-normal">sulfur</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Strategy Tab */}
        {activeTab === 'strategy' && (
          <motion.div 
            className="p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >            
            {/* Best Option Breakdown */}
            <div>
              <div className="flex items-center mb-5">
                <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h3 className="text-lg font-medium text-white">Optimized Raiding Strategy</h3>
              </div>
              
              {/* Simple informative banner */}
              <div className="bg-black/30 p-3 rounded-lg border border-gray-800 shadow-md mb-6">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-3">
                    <div className="absolute left-0 top-0">
                      <Image 
                        src="/images/ammunition/ammo.rifle.explosive.png" 
                        alt="Bullets"
                        width={22} 
                        height={22}
                        className="drop-shadow-md" 
                      />
                    </div>
                    <div className="absolute right-0 bottom-0">
                      <Image 
                        src="/images/ammunition/rockets.png" 
                        alt="Rockets"
                        width={22} 
                        height={22}
                        className="drop-shadow-md" 
                      />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    This view shows the most efficient raiding methods for each target based on the item&apos;s optimal combinations. 
                    Each item displays sulfur costs and potential savings over standard methods. But mostly it is higher cost but time efficient.
                  </p>
                </div>
              </div>
              
              {/* Item-specific options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collection.map(({ item, quantity }) => {
                  // Skip items with no bestOption data
                  if (!item.bestOption) return null;
                  
                  // Get options with values > 0 in bestOption
                  const options = [
                    { id: "rockets", image: "/images/ammunition/rockets.png" },
                    { id: "c4", image: "/images/tools/c4.png" },
                    { id: "satchel", image: "/images/tools/satchel.png" },
                    { id: "bullets", image: "/images/ammunition/ammo.rifle.explosive.png" },
                  ];
                  const validOptions = options.filter(
                    opt => item.bestOption && item.bestOption[opt.id as keyof typeof item.bestOption] > 0
                  );
                  
                  if (validOptions.length === 0) return null;
                  
                  // Directly use the bestOption quantities from items.ts
                  const bestOptionMethods = validOptions.map(option => {
                    const optionKey = option.id as keyof typeof item.bestOption;
                    const exactQuantity = item.bestOption![optionKey];
                    // Calculate cost for a single item
                    const sulfurCost = exactQuantity * getSulfurCost(optionKey);
                    
                    return {
                      option,
                      quantity: exactQuantity,
                      sulfurCost
                    };
                  });
                  
                  // Calculate total sulfur cost for the bestOption approach
                  const totalBestOptionSulfur = bestOptionMethods.reduce(
                    (sum, method) => sum + method.sulfurCost, 0
                  ) * quantity; // Multiply by quantity here
                  
                  // Calculate the best standard destruction method
                  const standardMethods = options.map(option => {
                    const optionKey = option.id as keyof typeof item.destructionOptions;
                    const standardQuantity = item.destructionOptions[optionKey];
                    // Calculate cost for a single item
                    const sulfurCost = standardQuantity * getSulfurCost(optionKey);
                    
                    return {
                      option,
                      quantity: standardQuantity,
                      sulfurCost
                    };
                  }).sort((a, b) => a.sulfurCost - b.sulfurCost);
                  
                  // Get the best standard option (lowest sulfur cost)
                  const bestStandardMethod = standardMethods[0];
                  
                  // Calculate savings percentage
                  const savingsPercent = Math.round(
                    (1 - totalBestOptionSulfur / (bestStandardMethod.sulfurCost * quantity)) * 100
                  );
                  
                  return (
                    <motion.div 
                      key={item.name}
                      className="bg-black/40 rounded-lg border border-gray-800 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center p-3 bg-gradient-to-r from-gray-900 to-gray-800">
                        <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            width={28} 
                            height={28} 
                            className="object-contain drop-shadow-lg" 
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="text-white font-medium truncate">{item.name}</h4>
                          <div className="flex items-center mt-1">
                            <div className="text-gray-400 text-xs">Quantity: {quantity}</div>
                            {savingsPercent > 0 && (
                              <div className="ml-auto bg-green-900/30 text-green-500 text-xs px-1.5 py-0.5 rounded-sm">
                                {savingsPercent}% savings
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border-t border-gray-800/50">
                        {/* Comparison section */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-400">Best option vs Standard:</div>
                          <div className="flex items-center">
                            <div className="bg-gray-900 rounded-full px-2 py-1 flex items-center mr-1">
                              <span className="text-red-500 text-xs font-medium mr-1">
                                {Math.round(totalBestOptionSulfur).toLocaleString()}
                              </span>
                              <span className="text-gray-500 text-xs">sulfur</span>
                            </div>
                            <div className="text-xs text-gray-600">vs</div>
                            <div className="ml-1 line-through text-xs text-gray-500">
                              {Math.round(bestStandardMethod.sulfurCost * quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Combined method icons */}
                        <div className="flex items-center mb-3">
                          <div className="flex -space-x-3">
                            {bestOptionMethods.map((method, index) => (
                              <div
                                key={method.option.id}
                                className="h-8 w-8 bg-black rounded-full flex items-center justify-center relative"
                                style={{ zIndex: 10 - index }}
                              >
                                <Image 
                                  src={method.option.image} 
                                  alt={method.option.id}
                                  width={18} 
                                  height={18} 
                                  className="object-contain"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-400 ml-3">
                            Combined approach from data
                          </div>
                        </div>
                        
                        {/* Best option methods from items.ts */}
                        <div className="bg-gray-900/50 rounded-lg p-2">
                          {bestOptionMethods.map((method) => (
                            <div 
                              key={method.option.id}
                              className="flex items-center justify-between py-1.5 border-b border-gray-800/30 last:border-0"
                            >
                              <div className="flex items-center">
                                <div className="h-7 w-7 bg-black rounded-full flex items-center justify-center mr-2">
                                  <Image 
                                    src={method.option.image} 
                                    alt={method.option.id}
                                    width={16} 
                                    height={16} 
                                    className="object-contain"
                                  />
                                </div>
                                <div className="text-xs text-white capitalize">{method.option.id}</div>
                              </div>
                              <div className="flex items-center">
                                <div className="text-white text-xs mr-3">
                                  {method.quantity * quantity}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  ({Math.round(method.sulfurCost * quantity).toLocaleString()} sulfur)
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Standard method comparison */}
                        <div className="mt-3 pt-2 border-t border-gray-800/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-gray-400">Standard approach:</div>
                            <div className="text-xs text-gray-500">
                              {bestStandardMethod.option.id} × {bestStandardMethod.quantity * quantity}
                            </div>
                          </div>
                          <div className="bg-gray-900/30 rounded-lg p-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-7 w-7 bg-black rounded-full flex items-center justify-center mr-2">
                                <Image 
                                  src={bestStandardMethod.option.image} 
                                  alt={bestStandardMethod.option.id}
                                  width={16} 
                                  height={16} 
                                  className="object-contain"
                                />
                              </div>
                              <div className="text-xs text-white capitalize">{bestStandardMethod.option.id}</div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-white text-xs mr-3">
                                {bestStandardMethod.quantity * quantity}
                              </div>
                              <div className="text-gray-500 text-xs">
                                ({Math.round(bestStandardMethod.sulfurCost * quantity).toLocaleString()} sulfur)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollectionDrawer;

