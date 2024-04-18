"use client";

import { useState } from "react";

export default function RaidCalculator() {
  const [wallTypes, setWallTypes] = useState(0);
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setWallTypes(e.target.value);
  };

  const calculateRaid = () => {
    // Logic to calculate the RAID options based on the number of wall types
    // Update the result state with the calculated options
  };

  return (
    <div>
      <div>
        <label htmlFor="wallTypes">Number of Wall Types:</label>
        <input
          type="number"
          id="wallTypes"
          value={wallTypes}
          onChange={handleChange}
        />
      </div>
      <button onClick={calculateRaid}>Calculate</button>
      {result.length > 0 && (
        <div>
          <h2>RAID Options:</h2>
          <ul>
            {result.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
