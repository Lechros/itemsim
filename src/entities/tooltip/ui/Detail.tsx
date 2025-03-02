import { clsx } from "@/shared/util";
import styles from "./tooltip.module.css";
import {
  GearAddOption,
  GearBaseOption,
  GearOption,
  GearStarforceOption,
  GearType,
  GearUpgradeOption,
  isLeftWeapon,
  isWeapon,
} from "@malib/gear";

export function DetailArea({ children }: Readonly<{ children?: React.ReactNode }>) {
  return <div className="pl-[13px] pr-[9px] w-full flex flex-col items-start">{children}</div>;
}

export function Superior({ superior = false }: Readonly<{ superior?: boolean }>) {
  if (!superior) {
    return null;
  }

  return <div className={clsx(styles.detailText, styles.green, "self-center")}>슈페리얼</div>;
}

export function GearTypeDetail({ gearType }: Readonly<{ gearType: GearType }>) {
  const className = clsx(styles.detailText, styles.white);
  const str = getGearTypeString(gearType);

  if (isWeapon(gearType)) {
    const handType =
      isLeftWeapon(gearType) || gearType === GearType.katara ? "한손무기" : "두손무기";
    return (
      <>
        <div className={className}>
          무기분류 : {str} ({handType})
        </div>
        <div className={className}>
          공격속도 : <span className="text-red-500 font-bold">*TODO*</span>
        </div>
      </>
    );
  }

  return <div className={className}>장비분류 : {str}</div>;
}

export function GearOptions({
  baseOption,
  addOption,
  upgradeOption,
  starforceOption,
}: Readonly<{
  baseOption: GearBaseOption;
  addOption: GearAddOption;
  upgradeOption: GearUpgradeOption;
  starforceOption: GearStarforceOption;
}>) {
  return statFormats.map(([option, format, percent]) => {
    const base = baseOption[option];
    const add = addOption[option as keyof GearAddOption];
    const upgrade = upgradeOption[option as keyof GearUpgradeOption];
    const star = starforceOption[option as keyof GearStarforceOption];
    const sum = base + add + upgrade + star;
    if (sum === 0) {
      return null;
    }
    const p = percent ? "%" : "";
    const key = `${option}_${base}_${add}_${upgrade}_${star}`;
    const propStr = format.replace("#", `${sum}${p}`);
    if (add > 0 || upgrade + star > 0) {
      return (
        <div className={clsx(styles.detailText, styles.white)} key={key}>
          <span className={styles.blue}>{propStr}</span> ({base}
          {p}
          {add !== 0 ? (
            <span className={styles.green}>
              {" +"}
              {add}
              {p}
            </span>
          ) : null}
          {upgrade !== 0 ? (
            <span className={upgrade > 0 ? styles.purple2 : styles.red}>
              {" +"}
              {upgrade}
              {p}
            </span>
          ) : null}
          {star !== 0 ? (
            <span className={styles.orange2}>
              {" +"}
              {star}
              {p}
            </span>
          ) : null}
          )
        </div>
      );
    } else {
      return (
        <div className={clsx(styles.detailText, styles.white)} key={key}>
          {propStr}
        </div>
      );
    }
  });
}

function getGearTypeString(type: GearType) {
  switch (type) {
    case GearType.faceAccessory:
      return "얼굴장식";
    case GearType.eyeAccessory:
      return "눈장식";
    case GearType.earrings:
      return "귀고리";
    case GearType.pendant:
      return "펜던트";
    case GearType.belt:
      return "벨트";
    case GearType.medal:
      return "훈장";
    case GearType.shoulder:
      return "어깨장식";
    case GearType.cap:
      return "모자";
    case GearType.cape:
      return "망토";
    case GearType.coat:
      return "상의";
    case GearType.dragonMask:
      return "드래곤 모자";
    case GearType.dragonPendant:
      return "드래곤 펜던트";
    case GearType.dragonWings:
      return "드래곤 날개장식";
    case GearType.dragonTail:
      return "드래곤 꼬리장식";
    case GearType.glove:
      return "장갑";
    case GearType.longcoat:
      return "한벌옷";
    case GearType.machineEngine:
      return "메카닉 엔진";
    case GearType.machineArms:
      return "메카닉 암";
    case GearType.machineLegs:
      return "메카닉 레그";
    case GearType.machineBody:
      return "메카닉 프레임";
    case GearType.machineTransistors:
      return "메카닉 트랜지스터";
    case GearType.pants:
      return "하의";
    case GearType.ring:
      return "반지";
    case GearType.shield:
      return "방패";
    case GearType.shoes:
      return "신발";
    case GearType.shiningRod:
      return "샤이닝 로드";
    case GearType.soulShooter:
      return "소울 슈터";
    case GearType.ohSword:
      return "한손검";
    case GearType.ohAxe:
      return "한손도끼";
    case GearType.ohBlunt:
      return "한손둔기";
    case GearType.dagger:
      return "단검";
    case GearType.katara:
      return "블레이드";
    case GearType.magicArrow:
      return "마법화살";
    case GearType.card:
      return "카드";
    case GearType.orb:
      return "오브";
    case GearType.dragonEssence:
      return "용의 정수";
    case GearType.soulRing:
      return "소울링";
    case GearType.magnum:
      return "매그넘";
    case GearType.cane:
      return "케인";
    case GearType.wand:
      return "완드";
    case GearType.staff:
      return "스태프";
    case GearType.thSword:
      return "두손검";
    case GearType.thAxe:
      return "두손도끼";
    case GearType.thBlunt:
      return "두손둔기";
    case GearType.spear:
      return "창";
    case GearType.polearm:
      return "폴암";
    case GearType.bow:
      return "활";
    case GearType.crossbow:
      return "석궁";
    case GearType.claw:
      return "아대";
    case GearType.knuckle:
      return "너클";
    case GearType.gun:
      return "건";
    case GearType.android:
      return "안드로이드";
    case GearType.machineHeart:
      return "기계 심장";
    case GearType.pickaxe:
      return "채광 도구";
    case GearType.shovel:
      return "약초채집 도구";
    case GearType.pocket:
      return "포켓 아이템";
    case GearType.dualBowguns:
      return "듀얼 보우건";
    case GearType.handCannon:
      return "핸드캐논";
    case GearType.badge:
      return "뱃지";
    case GearType.emblem:
      return "엠블렘";
    case GearType.soulShield:
      return "소울실드";
    case GearType.demonShield:
      return "포스실드";
    case GearType.petEquip:
      return "펫장비";
    case GearType.heavySword:
      return "대검";
    case GearType.longSword:
      return "태도";
    case GearType.medallion:
      return "메달";
    case GearType.rosary:
      return "로자리오";
    case GearType.ironChain:
      return "쇠사슬";
    case GearType.magicBook1:
    case GearType.magicBook2:
    case GearType.magicBook3:
      return "마도서";
    case GearType.arrowFletching:
      return "화살깃";
    case GearType.bowThimble:
      return "활골무";
    case GearType.daggerScabbard:
      return "단검용 검집";
    case GearType.charm:
      return "부적";
    case GearType.wristBand:
      return "리스트밴드";
    case GearType.farSight:
      return "조준기";
    case GearType.powderKeg:
    case GearType.powderKeg2:
      return "화약통";
    case GearType.mass:
      return "무게추";
    case GearType.document:
      return "문서";
    case GearType.magicMarble:
      return "마법구슬";
    case GearType.arrowhead:
      return "화살촉";
    case GearType.jewel:
      return "보석";
    case GearType.controller:
      return "컨트롤러";
    case GearType.foxMarble:
      return "여우 구슬";
    case GearType.chessPiece:
      return "체스피스";
    case GearType.powerSource:
      return "파워소스";

    case GearType.energySword:
      return "에너지소드";
    case GearType.desperado:
      return "데스페라도";
    case GearType.espLimiter:
      return "ESP 리미터";

    case GearType.gauntletRevolver:
      return "건틀렛 리볼버";
    case GearType.charge:
      return "장약";

    case GearType.chain:
      return "체인";
    case GearType.magicGauntlet:
      return "매직 건틀렛";
    case GearType.transmitter:
      return "무기 전송장치";
    case GearType.magicWing:
      return "매직윙";
    case GearType.pathOfAbyss:
      return "패스 오브 어비스";

    case GearType.relic:
      return "렐릭";
    case GearType.ancientBow:
      return "에인션트 보우";

    case GearType.ritualFan:
      return "부채";
    case GearType.fanTassel:
      return "선추";

    case GearType.tuner:
      return "튜너";
    case GearType.bracelet:
      return "브레이슬릿";

    case GearType.breathShooter:
      return "브레스 슈터";
    case GearType.weaponBelt:
      return "웨폰 벨트";

    case GearType.ornament:
      return "노리개";

    case GearType.chakram:
      return "차크람";
    case GearType.hexSeeker:
      return "헥스시커";
  }
}

const statFormats = [
  ["str", "STR : +#"],
  ["dex", "DEX : +#"],
  ["int", "INT : +#"],
  ["luk", "LUK : +#"],
  ["maxHp", "최대 HP : +#"],
  ["maxMp", "최대 MP : +#"],
  ["maxHpRate", "최대 HP : +#", true],
  ["maxMpRate", "최대 MP : +#", true],
  ["attackPower", "공격력 : +#"],
  ["magicPower", "마력 : +#"],
  ["armor", "방어력 : +#"],
  ["speed", "이동속도 : +#"],
  ["jump", "점프력 : +#"],
  // ["knockback", "직접 타격 시 #의 확률로 넉백"],
  ["bossDamage", "보스 몬스터 공격 시 데미지 +#", true],
  ["ignoreMonsterArmor", "몬스터 방어율 무시 : +#", true],
  ["damage", "데미지 : +#", true],
  ["allStat", "올스탯 : +#", true],
] satisfies [keyof GearOption, ...unknown[]][];
