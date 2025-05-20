// page.tsx

"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

interface Material {
  name: string;
  maxHp: number;
  decayTime: number; // in hours
}

const materials: Material[] = [
  { name: "Twig", maxHp: 10, decayTime: 1 },
  { name: "Wood", maxHp: 250, decayTime: 3 },
  { name: "Stone", maxHp: 500, decayTime: 5 },
  { name: "Sheet Metal", maxHp: 1000, decayTime: 8 },
  { name: "Armored", maxHp: 2000, decayTime: 12 },
];

export default function DecayCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [currentHp, setCurrentHp] = useState<number>(0);
  const [decayInfo, setDecayInfo] = useState<{
    timeLeft: string;
    decayDateTime: string;
  }>({ timeLeft: "", decayDateTime: "" });
  const [error, setError] = useState<string>("");

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const material =
      materials.find((mat) => mat.name === e.target.value) || null;
    setSelectedMaterial(material);

    if (material) {
      if (currentHp > material.maxHp) {
        setCurrentHp(0);
        setError(
          `HP cannot exceed max HP of ${material.maxHp} for selected material.`
        );
        setDecayInfo({ timeLeft: "", decayDateTime: "" });
      } else {
        setError("");
        // Decay info will be recalculated in useEffect
      }
    } else {
      // No material selected, reset currentHp and decayInfo
      setCurrentHp(0);
      setError("");
      setDecayInfo({ timeLeft: "", decayDateTime: "" });
    }
  };

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setCurrentHp(0);
      setError("");
      setDecayInfo({ timeLeft: "", decayDateTime: "" });
    } else {
      const hp = parseFloat(value);
      if (isNaN(hp) || hp < 0) {
        setError("Please enter a valid HP value.");
        setDecayInfo({ timeLeft: "", decayDateTime: "" });
      } else if (selectedMaterial && hp > selectedMaterial.maxHp) {
        setError(
          `HP cannot exceed max HP of ${selectedMaterial.maxHp} for selected material.`
        );
        setDecayInfo({ timeLeft: "", decayDateTime: "" });
      } else {
        setError("");
        setCurrentHp(hp);
        // Decay info will be recalculated in useEffect
      }
    }
  };

  const calculateDecay = (material: Material, hp: number) => {
    if (hp > material.maxHp || hp < 0) {
      return { timeLeft: "Invalid HP value.", decayDateTime: "" };
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
      const decayTime = new Date();
      decayTime.setSeconds(decayTime.getSeconds() + totalSeconds);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };

      const formattedDecayTime = decayTime.toLocaleString([], options);

      return { timeLeft, decayDateTime: formattedDecayTime };
    }
  };

  useEffect(() => {
    if (selectedMaterial && currentHp >= 0 && !error) {
      const { timeLeft, decayDateTime } = calculateDecay(
        selectedMaterial,
        currentHp
      );
      setDecayInfo({ timeLeft, decayDateTime });
    } else {
      setDecayInfo({ timeLeft: "", decayDateTime: "" });
    }
  }, [selectedMaterial, currentHp, error]);

  return (
    <div className="flex flex-col justify-center items-center text-center bg-black min-h-screen p-4">
      <Head>
        <title>Rust Wall Decay Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="text-white rounded-lg p-6 md:p-8 max-w-md w-full border border-gray-800  backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,0,0.15)]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 tracking-wide">
          Rust Wall Decay Calculator
        </h1>

        {/* Material Selection */}
        <div className="mb-6">
          <label
            htmlFor="material"
            className="block text-lg font-medium mb-2 text-gray-200 text-left"
          >
            Select Material:
          </label>
          <div className="relative">
            <select
              id="material"
              value={selectedMaterial ? selectedMaterial.name : ""}
              onChange={handleMaterialChange}
              className="block appearance-none w-full bg-gray-800 border border-gray-700 hover:border-gray-600 px-4 py-3 pr-10 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-transparent text-white"
            >
              <option value="">-- Choose a Material --</option>
              {materials.map((material) => (
                <option key={material.name} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M14.95 7.95a1 1 0 0 0-1.4 0L10 11.5 6.45 7.95a1 1 0 1 0-1.4 1.4l4.5 4.5a1 1 0 0 0 1.4 0l4.5-4.5a1 1 0 0 0 0-1.4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Current HP Input */}
        <div className="mb-6">
          <label
            htmlFor="currentHp"
            className="block text-lg font-medium mb-2 text-gray-200 text-left"
          >
            Enter Current HP{" "}
            {selectedMaterial && (
              <span className="text-red-500 font-bold">
                (Max {selectedMaterial.maxHp})
              </span>
            )}:
          </label>
          <input
            id="currentHp"
            type="number"
            inputMode="decimal"
            value={currentHp === 0 && error === "" ? "" : currentHp}
            onChange={handleHpChange}
            className="border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-3 w-full text-center focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-transparent transition-all"
            min="0"
            disabled={!selectedMaterial}
            aria-disabled={!selectedMaterial}
            aria-describedby="hpError"
            placeholder={
              selectedMaterial
                ? `0 - ${selectedMaterial.maxHp}`
                : "Select a material first"
            }
          />
          {error && (
            <div id="hpError" className="text-red-500 mt-2 text-sm font-semibold">
              {error}
            </div>
          )}
        </div>

        {/* Time Left Display */}
        {decayInfo.timeLeft && !error && (
          <div className="mt-8 p-4 rounded-md border border-gray-700 bg-gray-800/50">
            <div className="text-xl font-semibold text-red-500 mb-2">
              Time Left Until Decay:
            </div>
            <div className="text-2xl font-bold text-white bg-gray-800 py-2 px-4 rounded-md inline-block">
              {decayInfo.timeLeft}
            </div>
            
            {decayInfo.decayDateTime && (
              <div className="mt-4 text-sm text-gray-300 border-t border-gray-700 pt-4">
                <span className="text-gray-400">Expected Decay Time:</span>
                <br />
                <span className="font-mono">{decayInfo.decayDateTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Show invalid HP message if error exists */}
        {error && (
          <div className="mt-6 text-lg font-semibold text-red-500 p-3 border border-red-900/50 rounded-md bg-red-900/10">
            <p>{error}</p>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 text-xs text-gray-500 border-t border-gray-800 pt-4">
          Select a material type and enter the current HP to calculate decay time.
        </div>
      </div>
    </div>
  );
}
