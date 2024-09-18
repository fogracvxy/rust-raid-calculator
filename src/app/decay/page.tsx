// page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { FaGlobe } from "react-icons/fa6";

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
  const [currentHp, setCurrentHp] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [decayDateTime, setDecayDateTime] = useState<string>("");

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const material = materials.find((mat) => mat.name === e.target.value);
    setSelectedMaterial(material || null);
    // Do not reset currentHp or timeLeft
  };

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hp = parseFloat(e.target.value);
    setCurrentHp(isNaN(hp) ? null : hp);
  };

  // Recalculate decay time whenever selectedMaterial or currentHp changes
  useEffect(() => {
    if (selectedMaterial && currentHp !== null) {
      if (currentHp > selectedMaterial.maxHp || currentHp < 0) {
        setTimeLeft("Invalid HP value.");
        setDecayDateTime("");
      } else {
        const decayPerHp = selectedMaterial.decayTime / selectedMaterial.maxHp; // hours per HP
        const timeRemaining = decayPerHp * currentHp; // in hours

        // Convert time to hours, minutes, and seconds
        const totalSeconds = Math.floor(timeRemaining * 3600);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

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

        setDecayDateTime(`Expected Decay Time: ${formattedDecayTime}`);
      }
    } else {
      setTimeLeft("");
      setDecayDateTime("");
    }
  }, [selectedMaterial, currentHp]);

  return (
    <div className="flex flex-col justify-center items-center text-center bg-black min-h-screen ">
      <div className="text-white shadow-lg rounded-lg p-8 max-w-md w-full border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-red-600">
          Rust Wall Decay Calculator
        </h1>

        {/* Material Selection */}
        <div className="mb-6">
          <label htmlFor="material" className="block text-lg font-medium mb-2 ">
            Select Material:
          </label>
          <div className="relative">
            <select
              id="material"
              value={selectedMaterial ? selectedMaterial.name : ""}
              onChange={handleMaterialChange}
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 text-black"
            >
              <option value="">-- Choose a Material --</option>
              {materials.map((material) => (
                <option key={material.name} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.95 7.95a1 1 0 0 0-1.4 0L10 11.5 6.45 7.95a1 1 0 1 0-1.4 1.4l4.5 4.5a1 1 0 0 0 1.4 0l4.5-4.5a1 1 0 0 0 0-1.4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Current HP Input */}
        {selectedMaterial && (
          <div className="mb-6">
            <label
              htmlFor="currentHp"
              className="block text-lg font-medium mb-2 text-white-700"
            >
              Enter Current HP (Max {selectedMaterial.maxHp}):
            </label>
            <input
              id="currentHp"
              type="number"
              value={currentHp ?? ""}
              onChange={handleHpChange}
              className="border border-gray-300 text-black rounded px-4 py-2 w-full text-center focus:outline-none focus:border-blue-500"
              min="0"
            />
          </div>
        )}

        {/* Time Left Display */}
        {timeLeft && (
          <div className="mt-6 text-xl font-semibold text-white-800">
            <p>
              {timeLeft === "Invalid HP value."
                ? timeLeft
                : "Time Left Until Decay:"}
            </p>
            {timeLeft !== "Invalid HP value." && <p>{timeLeft}</p>}
            {decayDateTime && (
              <div className="mt-4 text-lg text-white-800">{decayDateTime}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
