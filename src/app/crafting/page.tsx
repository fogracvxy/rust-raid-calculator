"use client";
import { calculateBreakdown, mergeBreakdowns } from "./utils/calculate-breakdown";

export default function CraftingCalculator() {
  return <pre>{JSON.stringify(mergeBreakdowns(
    calculateBreakdown("explosive.timed", 1),
    calculateBreakdown("explosive.timed", 4),
    calculateBreakdown("lowgradefuel", 100),
    calculateBreakdown("ammo.rifle.explosive", 100)
  ), null, 2)}</pre>;
}
