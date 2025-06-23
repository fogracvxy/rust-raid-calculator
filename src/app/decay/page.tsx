// page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { format, formatDistance, addSeconds } from "date-fns";
import { motion } from "framer-motion";
import { FaClock, FaCalendarAlt, FaQuestionCircle, FaInfo, FaShareAlt, FaBell, FaExchangeAlt, FaUndo } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

interface Material {
  name: string;
  maxHp: number;
  decayTime: number; // in hours
  color: string;
}

const materials: Material[] = [
  { name: "Twig", maxHp: 10, decayTime: 1, color: "rgb(217, 119, 6)" }, // amber-600
  { name: "Wood", maxHp: 250, decayTime: 3, color: "rgb(202, 138, 4)" }, // yellow-600
  { name: "Stone", maxHp: 500, decayTime: 5, color: "rgb(107, 114, 128)" }, // gray-500
  { name: "Sheet Metal", maxHp: 1000, decayTime: 8, color: "rgb(113, 113, 122)" }, // zinc-500
  { name: "Armored", maxHp: 2000, decayTime: 12, color: "rgb(71, 85, 105)" }, // slate-600
];

export default function DecayCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [currentHp, setCurrentHp] = useState<number>(0);
  const [percentHp, setPercentHp] = useState<number>(100);
  const [inputMode, setInputMode] = useState<"absolute" | "percentage">("absolute");
  const [decayInfo, setDecayInfo] = useState<{
    timeLeft: string;
    decayDateTime: string;
    relativeTime: string;
    totalSeconds?: number;
  }>({ timeLeft: "", decayDateTime: "", relativeTime: "" });
  const [error, setError] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>("");
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [isSliderMoving, setIsSliderMoving] = useState<boolean>(false);
  const sliderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved values from localStorage on component mount
  useEffect(() => {
    const savedMaterial = localStorage.getItem('decayCalculator_material');
    const savedHp = localStorage.getItem('decayCalculator_hp');
    const savedInputMode = localStorage.getItem('decayCalculator_inputMode') as "absolute" | "percentage" | null;
    const savedNotification = localStorage.getItem('decayCalculator_notification');

    if (savedMaterial) {
      const material = materials.find(m => m.name === savedMaterial);
      if (material) setSelectedMaterial(material);
    }

    if (savedHp) {
      const hp = parseFloat(savedHp);
      setCurrentHp(hp);
      if (selectedMaterial) {
        setPercentHp((hp / selectedMaterial.maxHp) * 100);
      }
    }

    if (savedInputMode) {
      setInputMode(savedInputMode);
    }

    if (savedNotification) {
      setNotification(savedNotification === 'true');
    }
  }, []);

  // Save values to localStorage when they change
  useEffect(() => {
    if (selectedMaterial) {
      localStorage.setItem('decayCalculator_material', selectedMaterial.name);
    }
    
    if (currentHp > 0) {
      localStorage.setItem('decayCalculator_hp', currentHp.toString());
    }
    
    localStorage.setItem('decayCalculator_inputMode', inputMode);
    localStorage.setItem('decayCalculator_notification', notification.toString());
  }, [selectedMaterial, currentHp, inputMode, notification]);

  // Handle material selection change
  const handleMaterialChange = (materialName: string) => {
    const material = materials.find((mat) => mat.name === materialName) || null;
    setSelectedMaterial(material);

    if (material) {
      if (inputMode === "absolute" && currentHp > material.maxHp) {
        setCurrentHp(material.maxHp);
        setPercentHp(100);
        toast.info(`Set HP to maximum value of ${material.maxHp}`);
      } else if (inputMode === "percentage") {
        // When switching materials with percentage mode, keep the same percentage
        const newHp = Math.round((percentHp / 100) * material.maxHp);
        setCurrentHp(newHp);
      } else if (currentHp > 0) {
        // If currentHp is already set, calculate the percentage
        setPercentHp((currentHp / material.maxHp) * 100);
      }
      setError("");
    } else {
      setCurrentHp(0);
      setPercentHp(0);
      setError("");
      setDecayInfo({ timeLeft: "", decayDateTime: "", relativeTime: "" });
    }
  };

  // Handle HP input change
  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setCurrentHp(0);
      setPercentHp(0);
      setError("");
      setDecayInfo({ timeLeft: "", decayDateTime: "", relativeTime: "" });
      return;
    }

    if (selectedMaterial) {
      if (inputMode === "absolute") {
        const hp = parseFloat(value);
        if (isNaN(hp) || hp < 0) {
          setError("Please enter a valid HP value.");
          setDecayInfo({ timeLeft: "", decayDateTime: "", relativeTime: "" });
        } else if (hp > selectedMaterial.maxHp) {
          setError(`HP cannot exceed max HP of ${selectedMaterial.maxHp} for ${selectedMaterial.name}.`);
          setDecayInfo({ timeLeft: "", decayDateTime: "", relativeTime: "" });
        } else {
          setError("");
          setCurrentHp(hp);
          setPercentHp((hp / selectedMaterial.maxHp) * 100);
        }
      } else {
        // Percentage mode
        const percent = parseFloat(value);
        if (isNaN(percent) || percent < 0 || percent > 100) {
          setError("Please enter a valid percentage between 0 and 100.");
          setDecayInfo({ timeLeft: "", decayDateTime: "", relativeTime: "" });
        } else {
          setError("");
          setPercentHp(percent);
          const hp = Math.round((percent / 100) * selectedMaterial.maxHp);
          setCurrentHp(hp);
        }
      }
    }
  };

  // Handle slider interactions
  const handleSliderMouseDown = () => {
    setIsSliderMoving(true);
  };

  const handleSliderMouseUp = () => {
    setIsSliderMoving(false);
  };

  // Handle slider change with debounce to prevent race conditions
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMaterial) {
      const value = parseFloat(e.target.value);
      
      if (inputMode === "absolute") {
        setCurrentHp(value);
        setPercentHp((value / selectedMaterial.maxHp) * 100);
      } else {
        setPercentHp(value);
        const hp = Math.round((value / 100) * selectedMaterial.maxHp);
        setCurrentHp(hp);
      }
      setError("");
      
      // Clear any existing timeout
      if (sliderTimeoutRef.current) {
        clearTimeout(sliderTimeoutRef.current);
      }
      
      // Set a new timeout
      sliderTimeoutRef.current = setTimeout(() => {
        // This ensures we update after the slider has settled
        if (inputMode === "absolute") {
          setPercentHp((value / selectedMaterial.maxHp) * 100);
        } else {
          setCurrentHp(Math.round((value / 100) * selectedMaterial.maxHp));
        }
      }, 50);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (sliderTimeoutRef.current) {
        clearTimeout(sliderTimeoutRef.current);
      }
    };
  }, []);
  
  // Toggle between absolute and percentage input modes
  const toggleInputMode = () => {
    // When switching modes, first clear any pending slider timeout
    if (sliderTimeoutRef.current) {
      clearTimeout(sliderTimeoutRef.current);
    }
    
    if (inputMode === "absolute") {
      setInputMode("percentage");
    } else {
      setInputMode("absolute");
    }
    
    // Force recalculation of the values to ensure synchronization
    if (selectedMaterial) {
      if (inputMode === "absolute") {
        // Switching to percentage
        const newPercent = (currentHp / selectedMaterial.maxHp) * 100;
        setPercentHp(newPercent);
      } else {
        // Switching to absolute
        const newHp = Math.round((percentHp / 100) * selectedMaterial.maxHp);
        setCurrentHp(newHp);
      }
    }
  };

  // Reset to max HP
  const resetToMax = () => {
    if (selectedMaterial) {
      setCurrentHp(selectedMaterial.maxHp);
      setPercentHp(100);
      toast.info(`Reset to maximum HP (${selectedMaterial.maxHp})`);
    }
  };

  // Toggle notifications
  const toggleNotification = () => {
    if (!notification && selectedMaterial && currentHp > 0) {
      // Request permission for notifications
      if (Notification && Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            setNotification(true);
            toast.success("Decay notifications enabled!");
          } else {
            toast.error("Notification permission denied");
          }
        });
      } else {
        setNotification(true);
        toast.success("Decay notifications enabled!");
      }
    } else {
      setNotification(false);
      toast.info("Decay notifications disabled");
    }
  };

  // Calculate decay information
  const calculateDecay = (material: Material, hp: number) => {
    if (hp > material.maxHp || hp < 0) {
      return { 
        timeLeft: "Invalid HP value.", 
        decayDateTime: "", 
        relativeTime: "",
        totalSeconds: 0
      };
    } else {
      const decayPerHp = material.decayTime / material.maxHp; // hours per HP
      const timeRemaining = decayPerHp * hp; // in hours

      // Convert time to hours, minutes, and seconds
      const totalSeconds = Math.floor(timeRemaining * 3600);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const timeLeft = `${hours}h ${minutes}m ${seconds}s`;

      // Calculate the exact decay date and time in the user's local timezone
      const now = new Date();
      const decayTime = addSeconds(now, totalSeconds);

      const formattedDecayTime = format(
        decayTime, 
        "EEEE, MMMM d, yyyy 'at' h:mm:ss a (zzz)"
      );

      // Get relative time (e.g., "in about 3 hours")
      const relativeTime = formatDistance(decayTime, now, { addSuffix: true });

      return { 
        timeLeft, 
        decayDateTime: formattedDecayTime,
        relativeTime,
        totalSeconds
      };
    }
  };

  // Update decay information when inputs change
  useEffect(() => {
    if (selectedMaterial && currentHp >= 0 && !error) {
      const decayDetails = calculateDecay(selectedMaterial, currentHp);
      setDecayInfo(decayDetails);
    } else {
      setDecayInfo({ timeLeft: "", decayDateTime: "", relativeTime: "" });
    }
  }, [selectedMaterial, currentHp, error]);

  // Live countdown timer
  useEffect(() => {
    if (selectedMaterial && currentHp > 0 && !error) {
      const decayDetails = calculateDecay(selectedMaterial, currentHp);
      let remainingSeconds = decayDetails.totalSeconds;

      const timer = setInterval(() => {
        remainingSeconds--;
        
        if (remainingSeconds <= 0) {
          clearInterval(timer);
          setCountdown("Decayed!");
          if (notification) {
            // Show decay notification
            new Notification("Rust Decay Alert", {
              body: `Your ${selectedMaterial.name} structure has decayed!`,
              icon: "/favicon.ico"
            });
          }
          return;
        }

        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;
        
        setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(timer);
    }
  }, [selectedMaterial, currentHp, error, notification]);

  // Share functionality
  const shareCalculation = () => {
    if (selectedMaterial && currentHp > 0) {
      const shareText = `My ${selectedMaterial.name} structure with ${currentHp}/${selectedMaterial.maxHp} HP will decay ${decayInfo.relativeTime} (${decayInfo.decayDateTime})`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Rust Decay Calculator',
          text: shareText,
        })
          .then(() => toast.success('Shared successfully'))
          .catch(() => toast.error('Error sharing'));
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText)
          .then(() => toast.success('Copied to clipboard!'))
          .catch(() => toast.error('Failed to copy'));
      }
    }
  };

  // Decay information container animation
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center bg-black min-h-screen p-2 sm:p-4">
      <Head>
        <title>Rust Wall Decay Calculator</title>
      </Head>
      <ToastContainer position="top-right" theme="dark" />
      
      <div className="text-white rounded-lg p-4 sm:p-6 md:p-8 max-w-lg w-full border border-gray-800 backdrop-blur-sm shadow-[0_0_25px_rgba(255,0,0,0.15)]">
        <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 tracking-wide mb-2 sm:mb-0">
            Rust Decay Calculator
          </h1>
          <div className="flex space-x-3 sm:space-x-2">
            <button 
              onClick={() => setShowCompare(!showCompare)}
              className="p-2.5 sm:p-2 text-gray-400 hover:text-white transition-colors rounded-full sm:rounded-md bg-gray-800/50 hover:bg-gray-700/60"
              aria-label="Compare materials"
              title="Compare materials"
            >
              <FaExchangeAlt size={18} />
            </button>
            <button 
              onClick={toggleNotification}
              className={`p-2.5 sm:p-2 transition-colors rounded-full sm:rounded-md bg-gray-800/50 hover:bg-gray-700/60 ${notification ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              aria-label={notification ? "Disable notifications" : "Enable notifications"}
              title={notification ? "Disable notifications" : "Enable notifications"}
            >
              <FaBell size={18} />
            </button>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-2.5 sm:p-2 text-gray-400 hover:text-white transition-colors rounded-full sm:rounded-md bg-gray-800/50 hover:bg-gray-700/60"
              aria-label="Show information about decay"
              title="About decay"
            >
              <FaInfo size={18} />
            </button>
          </div>
        </div>

        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-900/60 p-4 rounded-md mb-4 sm:mb-6 text-left text-sm"
          >
            <h2 className="font-bold text-red-500 mb-2">How Decay Works:</h2>
            <p className="mb-2 text-gray-300">
              Decay is a feature that slowly decreases the health of player-made structures if left unattended.
            </p>
            <p className="mb-2 text-gray-300">
              Structures decay from the farthest point from the Toolcupboard. Higher tier building materials decay slower 
              and after a longer initial delay.
            </p>
            <p className="mb-2 text-gray-300">
              This calculator helps you estimate when your structures will decay based on current HP and material type.
            </p>
          </motion.div>
        )}

        {/* Material Comparison Table */}
        {showCompare && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 sm:mb-6 overflow-x-auto bg-gray-900/30 rounded-md p-2"
          >
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                <tr>
                  <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">Material</th>
                  <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">Max HP</th>
                  <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">Decay Time</th>
                  <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3">HP/Hour</th>
                </tr>
              </thead>
              <tbody>
                {materials.map(material => (
                  <tr 
                    key={material.name} 
                    className={`border-b border-gray-700 ${selectedMaterial?.name === material.name ? 'bg-gray-700/30' : 'hover:bg-gray-800/30'}`}
                    onClick={() => handleMaterialChange(material.name)}
                    style={{cursor: 'pointer'}}
                  >
                    <td className="px-2 sm:px-4 py-2 font-medium whitespace-nowrap">{material.name}</td>
                    <td className="px-2 sm:px-4 py-2">{material.maxHp}</td>
                    <td className="px-2 sm:px-4 py-2">{material.decayTime}h</td>
                    <td className="px-2 sm:px-4 py-2">{(material.maxHp / material.decayTime).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Material Selection */}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="material-select"
            className="block text-base sm:text-lg font-medium mb-2 text-gray-200 text-left"
          >
            Select Material:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-2">
            {materials.map((material) => (
              <button
                key={material.name}
                id={material.name === selectedMaterial?.name ? "material-select" : undefined}
                onClick={() => handleMaterialChange(material.name)}
                className={`p-3 sm:p-2 rounded-md text-sm transition-all ${
                  selectedMaterial?.name === material.name 
                    ? 'bg-gray-700 ring-2 ring-red-500 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
                style={{
                  borderLeft: `4px solid ${material.color}`
                }}
              >
                {material.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Mode Toggle & HP Input */}
        {selectedMaterial && (
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap justify-between items-center mb-2">
              <label
                htmlFor="currentHp"
                className="block text-base sm:text-lg font-medium text-gray-200 text-left mb-2 sm:mb-0"
              >
                {inputMode === "absolute" ? "Current HP:" : "Current HP Percentage:"}
              </label>
              <div className="flex w-full sm:w-auto justify-end sm:justify-normal space-x-2 mt-1 sm:mt-0">
                <button
                  onClick={resetToMax}
                  className="flex-1 sm:flex-none text-sm px-3 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-md transition-colors flex items-center justify-center"
                  title="Reset to maximum HP"
                >
                  <FaUndo size={14} className="mr-1.5" /> Reset
                </button>
                <button
                  onClick={toggleInputMode}
                  className="flex-1 sm:flex-none text-sm px-3 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-md transition-colors flex items-center justify-center"
                >
                  Switch to {inputMode === "absolute" ? "%" : "HP"}
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* HP Input */}
              <input
                id="currentHp"
                type="number"
                inputMode="decimal"
                value={
                  inputMode === "absolute"
                    ? (currentHp === 0 && error === "" ? "" : currentHp)
                    : (percentHp === 0 && error === "" ? "" : percentHp.toFixed(1))
                }
                onChange={handleHpChange}
                className="border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-3 w-full text-center focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-transparent transition-all"
                min="0"
                max={inputMode === "absolute" ? selectedMaterial.maxHp : 100}
                step={inputMode === "absolute" ? 1 : 0.1}
                aria-describedby="hpError"
                placeholder={
                  inputMode === "absolute"
                    ? `0 - ${selectedMaterial.maxHp}`
                    : "0 - 100%"
                }
              />
              
              {/* HP Value Display (opposite of current input mode) */}
              {currentHp > 0 && (
                <div className="absolute right-0 top-full mt-1 text-sm text-gray-400">
                  {inputMode === "absolute" 
                    ? `${percentHp.toFixed(1)}% of max HP` 
                    : `${currentHp} / ${selectedMaterial.maxHp} HP`}
                </div>
              )}
            </div>
            
            {/* HP Slider with improved handling */}
            {selectedMaterial && (
              <div className="mt-6">
                <input
                  type="range"
                  min="0"
                  max={inputMode === "absolute" ? selectedMaterial.maxHp : 100}
                  step={inputMode === "absolute" ? 1 : 0.1}
                  value={inputMode === "absolute" ? currentHp : percentHp}
                  onChange={handleSliderChange}
                  onMouseDown={handleSliderMouseDown}
                  onMouseUp={handleSliderMouseUp}
                  onTouchStart={handleSliderMouseDown}
                  onTouchEnd={handleSliderMouseUp}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${selectedMaterial.color} 0%, ${selectedMaterial.color} ${(inputMode === "absolute" ? (currentHp / selectedMaterial.maxHp) : (percentHp / 100)) * 100}%, #374151 ${(inputMode === "absolute" ? (currentHp / selectedMaterial.maxHp) : (percentHp / 100)) * 100}%, #374151 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>{inputMode === "absolute" ? selectedMaterial.maxHp : "100%"}</span>
                </div>
              </div>
            )}
            
            {error && (
              <div id="hpError" className="text-red-500 mt-2 text-sm font-semibold">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Time Left Display */}
        {decayInfo.timeLeft && !error && (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
            className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-md border border-gray-700 bg-gray-800/50"
          >
            <div className="flex items-center justify-center text-lg sm:text-xl font-semibold text-red-500 mb-3">
              <FaClock className="mr-2" /> Time Until Decay:
            </div>
            
            {/* Live Countdown Timer */}
            {countdown && (
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white bg-gray-800 py-2 sm:py-3 px-4 sm:px-5 rounded-md inline-block font-mono">
                {countdown}
              </div>
            )}
            
            <div className="mt-2 text-base sm:text-lg text-gray-300">
              {decayInfo.timeLeft}
            </div>
            
            {decayInfo.relativeTime && (
              <div className="mt-2 text-base sm:text-lg text-gray-300">
                {decayInfo.relativeTime}
              </div>
            )}
            
            {decayInfo.decayDateTime && (
              <div className="mt-4 sm:mt-5 text-sm text-gray-300 border-t border-gray-700 pt-4">
                <div className="flex items-center justify-center text-gray-400 mb-1">
                  <FaCalendarAlt className="mr-2" /> Expected Decay Time:
                </div>
                <span className="font-mono text-white break-words">{decayInfo.decayDateTime}</span>
                
                {/* Share button */}
                <button 
                  onClick={shareCalculation}
                  className="mt-4 flex items-center justify-center mx-auto px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors w-full sm:w-auto"
                >
                  <FaShareAlt className="mr-2" /> Share Calculation
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* No material or HP selected message */}
        {!selectedMaterial && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-md border border-gray-700 bg-gray-800/50 text-gray-400">
            <FaQuestionCircle size={36} className="mx-auto mb-3" />
            <p>Please select a material type and enter the current HP to calculate decay time.</p>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-xs text-gray-500 border-t border-gray-800 pt-4">
          All decay times are based on standard Rust decay rates and displayed in your local timezone.
        </div>
      </div>
    </div>
  );
}
