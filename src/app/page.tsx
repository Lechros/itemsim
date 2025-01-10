"use client";

import { InventoryItem, InventoryList } from "@/entities/inventory";
import { getObjectHash } from "@/shared/util";
import { Gear, PotentialGrade } from "@malib/gear";

export default function InventoryPage() {
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
    <InventoryList
      className="mx-auto"
      isEmpty={gears.length === 0}
      emptyMessage="인벤토리가 비어 있습니다."
    >
      {gears.map((gear) => (
        <InventoryItem gear={gear} key={getObjectHash(gear)} />
      ))}
    </InventoryList>
  );
}
