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

  return <div className="text-center">TO BE ADDED</div>;
}
