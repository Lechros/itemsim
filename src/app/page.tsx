"use client";

import { Gear, PotentialGrade } from "@malib/gear";
import { InventoryItem } from "@/entities/inventory";

export default function Inventory() {
  const gears = [
    new Gear({
      meta: {
        id: 1231231,
        version: 1,
        add: [],
      },
      name: "Test",
      type: 123,
      icon: "1402196",
      req: {},
      attributes: {},
      star: 5,
      maxStar: 10,
      scrollUpgradeCount: 5,
      potentialGrade: PotentialGrade.Legendary,
      potentials: [{ title: "hello", option: {} }],
    }),
    new Gear({
      meta: {
        id: 1231231,
        version: 1,
        add: [],
      },
      name: "Test",
      type: 123,
      icon: "1004422",
      req: {},
      attributes: {},
      star: 5,
      maxStar: 10,
      scrollUpgradeCount: 5,
      additionalPotentialGrade: PotentialGrade.Legendary,
      potentials: [{ title: "hello", option: {} }],
      exceptionalUpgradeCount: 1,
    }),
    new Gear({
      meta: {
        id: 1231231,
        version: 1,
        add: [],
      },
      name: "Test",
      type: 123,
      icon: "1004422",
      req: {},
      attributes: {},
      star: 5,
      maxStar: 10,
      scrollUpgradeCount: 5,
    }),
  ];
  return (
    <div className="grid grid-cols-3 max-w-md gap-3 p-3 sm:grid-cols-4 sm:max-w-2xl sm:gap-4 sm:p-4 mx-auto">
      {gears.map((gear) => (
        <InventoryItem gear={gear} key={Math.random()} />
      ))}
    </div>
  );
}
