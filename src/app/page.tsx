"use client";

import { InventoryItem, InventoryList } from "@/entities/inventory";
import { GearTooltip } from "@/entities/tooltip";
import { getObjectHash } from "@/shared/util";
import { Gear } from "@malib/gear";
import { useMemo, useState } from "react";

export default function InventoryPage() {
  const [selectedGear, setSelectedGear] = useState<Gear>();

  const gears = useMemo(
    () => [
      new Gear({
        meta: { id: 1402196, version: 1, add: [] },
        name: "파프니르 페니텐시아",
        icon: "1402196",
        type: 140,
        req: { level: 150, str: 450, job: 1 },
        attributes: { trade: 2, cuttable: 2, incline: { charm: 100 }, bossReward: true },
        baseOption: { str: 40, dex: 40, attackPower: 171, bossDamage: 30, ignoreMonsterArmor: 10 },
        scrollUpgradeCount: 5,
        scrollUpgradeableCount: 3,
        star: 22,
        maxStar: 25,
      }),
      new Gear({
        meta: { id: 1114318, version: 1, add: [] },
        name: "어웨이크 링",
        desc: "각성의 산에서 얻을 수 있는 특별한 능력의 반지이다.\\r\\n어웨이크 링 전용 강화 주문서만 사용 가능\\r\\n잠재능력 및 에디셔널 잠재능력 부여 가능",
        icon: "1114318",
        type: 111,
        req: { level: 120 },
        attributes: { only: true, trade: 1, onlyEquip: true, blockGoldenHammer: true },
        baseOption: {
          str: 10,
          dex: 10,
          int: 10,
          luk: 10,
          maxHp: 1000,
          maxMp: 1000,
          attackPower: 10,
          magicPower: 10,
        },
        scrollUpgradeableCount: 3,
      }),
      new Gear({
        meta: { id: 1004422, version: 1, add: [] },
        name: "앱솔랩스 나이트헬름",
        icon: "1004422",
        type: 100,
        req: { level: 160, str: 480, job: 1 },
        attributes: { trade: 2, cuttable: 2, incline: { charm: 100 }, bossReward: true },
        baseOption: { str: 45, dex: 45, attackPower: 3, armor: 400, ignoreMonsterArmor: 10 },
        scrollUpgradeableCount: 11,
        maxStar: 25,
      }),
    ],
    []
  );

  return (
    <>
      <InventoryList
        className="mx-auto"
        isEmpty={gears.length === 0}
        emptyMessage="인벤토리가 비어 있습니다."
      >
        {gears.map((gear) => (
          <InventoryItem
            gear={gear}
            key={getObjectHash(gear)}
            onPress={() => setSelectedGear(gear)}
          />
        ))}
      </InventoryList>
      <div className="ml-auto w-[300px]">
        {selectedGear ? <GearTooltip gear={selectedGear} key={Math.random()} /> : null}
      </div>
    </>
  );
}
