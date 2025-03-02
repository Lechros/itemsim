"use client";

import { InventoryItem, InventoryList } from "@/entities/inventory";
import { GearTooltip } from "@/entities/tooltip";
import { getObjectHash } from "@/shared/util";
import { AddOptionType, Gear, GearData, SpellTraceType } from "@malib/gear";
import { Button } from "@nextui-org/react";
import { produce } from "immer";
import { useState } from "react";

export default function InventoryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [gears, setGears] = useState<GearData[]>(getSampleGears);

  const selectedData = selectedIndex !== undefined ? gears[selectedIndex] : undefined;
  const selectedGear = selectedData ? new Gear(selectedData) : undefined;

  return (
    <>
      <InventoryList
        className="mx-auto"
        isEmpty={gears.length === 0}
        emptyMessage="인벤토리가 비어 있습니다."
      >
        {gears.map((data, i) => (
          <InventoryItem
            gear={new Gear(data)}
            key={getObjectHash(data)}
            onPress={() => setSelectedIndex(i)}
          />
        ))}
      </InventoryList>
      <div className="ml-auto w-[500px] flex gap-4">
        {selectedGear ? (
          <GearTooltip gear={selectedGear} key={getObjectHash(selectedData!)} />
        ) : null}
        <div>
          <Button
            isDisabled={selectedGear === undefined || !selectedGear.canApplyStarforce}
            onPress={() => {
              setGears(
                produce(gears, (draft) => {
                  const data = draft[selectedIndex!];
                  new Gear(data).applyStarforce();
                })
              );
            }}
          >
            스타포스
          </Button>
        </div>
      </div>
    </>
  );
}

function getSampleGears() {
  const gears = [
    {
      meta: { id: 1402196, version: 1, add: [] },
      name: "파프니르 페니텐시아",
      icon: "1402196",
      type: 140,
      req: { level: 150, str: 450, job: 1 },
      attributes: { trade: 2, cuttable: 2, incline: { charm: 100 }, bossReward: true },
      baseOption: {
        str: 40,
        dex: 40,
        attackPower: 171,
        bossDamage: 30,
        ignoreMonsterArmor: 10,
      },
      scrollUpgradeableCount: 8,
      maxStar: 25,
    },
    {
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
    },
    {
      meta: { id: 1004422, version: 1, add: [] },
      name: "앱솔랩스 나이트헬름",
      icon: "1004422",
      type: 100,
      req: { level: 160, str: 480, job: 1 },
      attributes: {
        trade: 2,
        cuttable: 2,
        incline: { charm: 100 },
        bossReward: true,
        superior: true,
      },
      baseOption: { str: 45, dex: 45, attackPower: 3, armor: 400, ignoreMonsterArmor: 10 },
      addOption: { reqLevelDecrease: 15 },
      scrollUpgradeableCount: 11,
      maxStar: 25,
    },
    {
      meta: { id: 1213018, version: 1, add: [] },
      name: "아케인셰이드 튜너",
      icon: "1213018",
      type: 1213,
      req: { level: 200, str: 600, job: 1 },
      attributes: { trade: 2, cuttable: 2, incline: { charm: 200 }, bossReward: true },
      baseOption: {
        str: 100,
        dex: 100,
        attackPower: 295,
        bossDamage: 30,
        ignoreMonsterArmor: 20,
      },
      addOption: { reqLevelDecrease: 25 },
      scrollUpgradeableCount: 8,
      maxStar: 25,
    },
    {
      meta: { id: 1452257, version: 1, add: [] },
      name: "아케인셰이드 보우",
      icon: "1452257",
      type: 145,
      req: { level: 200, dex: 600, job: 4 },
      attributes: { trade: 2, cuttable: 2, incline: { charm: 200 }, bossReward: true },
      baseOption: {
        str: 100,
        dex: 100,
        attackPower: 276,
        speed: 19,
        bossDamage: 30,
        ignoreMonsterArmor: 20,
      },
      scrollUpgradeableCount: 8,
      maxStar: 25,
    },
  ] satisfies GearData[];

  const gear = new Gear(gears[4]);
  gear.applyAddOption(AddOptionType.dex, 7);
  gear.applyAddOption(AddOptionType.attackPower, 7);
  gear.applyAddOption(AddOptionType.bossDamage, 6);
  gear.applyAddOption(AddOptionType.reqLevelDecrease, 5);
  while (gear.canApplyScroll) {
    gear.applySpellTrace(SpellTraceType.dex, 15);
  }
  for (let i = 0; i < 22; i++) {
    gear.applyStarforce();
  }

  return gears;
}
