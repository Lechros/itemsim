import { GearType } from "@malib/gear";
import { UIImage } from "./UIImage";
import {
  jobDisable0,
  jobDisable1,
  jobDisable2,
  jobDisable3,
  jobDisable4,
  jobDisable5,
  jobEnable0,
  jobEnable1,
  jobEnable2,
  jobEnable3,
  jobEnable4,
  jobEnable5,
  jobExpand,
  jobNormal,
} from "@/shared/ui";
import styles from "./tooltip.module.css";
import { clsx } from "@/shared/util";

export function JobReq({
  reqJob,
  can,
  gearType,
}: Readonly<{ reqJob: number; can: boolean; gearType: GearType }>) {
  const extraJobReqString = getExtraJobReqString(gearType) ?? getExtraJobReqStringByJob(reqJob);
  const frameImage = extraJobReqString ? jobExpand : jobNormal;

  return (
    <UIImage image={frameImage} className="flex flex-col items-center" as="div">
      <div className="pt-[7px] flex gap-[14px]">
        <JobClass index={0} enabled={reqJob === 0} can={can} />
        {([1, 2, 3, 4, 5] as const).map((i) => (
          <JobClass
            index={i}
            enabled={reqJob === 0 || (reqJob & (1 << (i - 1))) !== 0}
            can={can}
            key={i}
          />
        ))}
      </div>
      {extraJobReqString ? (
        <div className={clsx(styles.detailText, styles.orange2, "mt-[5px] pr-px")}>
          {extraJobReqString}
        </div>
      ) : null}
    </UIImage>
  );
}

function JobClass({
  index,
  enabled,
  can,
}: Readonly<{ index: 0 | 1 | 2 | 3 | 4 | 5; enabled: boolean; can: boolean }>) {
  const image = can ? canImages[index] : cannotImages[index];
  return <UIImage image={image} className={!enabled ? "invisible" : undefined} />;
}

function getExtraJobReqString(type: GearType) {
  switch (type) {
    // 0xxx
    case GearType.medallion:
      return "히어로 직업군 착용 가능";
    case GearType.rosary:
      return "팔라딘 직업군 착용 가능";
    case GearType.ironChain:
      return "다크나이트 직업군 착용 가능";
    case GearType.magicBook1:
      return "불,독 계열 마법사 착용 가능";
    case GearType.magicBook2:
      return "얼음,번개 계열 마법사 착용 가능";
    case GearType.magicBook3:
      return "비숍 계열 마법사 착용 가능";
    case GearType.arrowFletching:
      return "보우마스터 직업군 착용 가능";
    case GearType.bowThimble:
      return "신궁 직업군 착용 가능";
    case GearType.daggerScabbard:
      return "섀도어 직업군 착용 가능";
    case GearType.charm:
      return "나이트로드 직업군 착용 가능";
    case GearType.katara:
      return "듀얼블레이드 직업군 착용 가능";
    case GearType.wristBand:
      return "바이퍼 직업군 착용 가능";
    case GearType.farSight:
      return "캡틴 직업군 착용 가능";
    case GearType.powderKeg:
      return "캐논 슈터 직업군 착용 가능";
    case GearType.relic:
      return "패스파인더 직업군 착용 가능";

    // 1xxx
    case GearType.jewel:
      return "시그너스 기사단 착용 가능";

    // 2xxx
    case GearType.mass:
      return getExtraJobReqStringByJob(21);
    case GearType.document:
      return getExtraJobReqStringByJob(22);
    case GearType.magicArrow:
      return getExtraJobReqStringByJob(23);
    case GearType.card:
      return getExtraJobReqStringByJob(24);
    case GearType.foxMarble:
      return getExtraJobReqStringByJob(25);
    case GearType.orb:
    case GearType.shiningRod:
      return getExtraJobReqStringByJob(27);

    // 3xxx
    case GearType.demonShield:
      return getExtraJobReqStringByJob(31);
    case GearType.desperado:
      return "데몬 어벤져 착용 가능";
    case GearType.magicMarble:
      return "배틀메이지 직업군 착용 가능";
    case GearType.arrowhead:
      return "와일드헌터 직업군 착용 가능";
    case GearType.magnum:
      return "메카닉 착용 가능";
    case GearType.controller:
    case GearType.powerSource:
    case GearType.energySword:
      return getExtraJobReqStringByJob(36);
    case GearType.gauntletRevolver:
    case GearType.charge:
      return getExtraJobReqStringByJob(37);

    // 5xxx
    case GearType.soulShield:
      return "미하일 착용 가능";

    // 6xxx
    case GearType.dragonEssence:
      return getExtraJobReqStringByJob(61);
    case GearType.breathShooter:
    case GearType.weaponBelt:
      return getExtraJobReqStringByJob(63);
    case GearType.chain:
    case GearType.transmitter:
      return getExtraJobReqStringByJob(64);
    case GearType.soulRing:
    case GearType.soulShooter:
      return getExtraJobReqStringByJob(65);

    // 10xxx
    case GearType.heavySword:
    case GearType.longSword:
      return getExtraJobReqStringByJob(101);

    case GearType.espLimiter:
    case GearType.chessPiece:
      return getExtraJobReqStringByJob(142);

    case GearType.magicGauntlet:
    case GearType.magicWing:
      return getExtraJobReqStringByJob(152);

    case GearType.pathOfAbyss:
      return getExtraJobReqStringByJob(155);

    case GearType.ritualFan:
    case GearType.fanTassel:
      return getExtraJobReqStringByJob(164);

    case GearType.tuner:
    case GearType.bracelet:
      return getExtraJobReqStringByJob(151);

    case GearType.ornament:
      return getExtraJobReqStringByJob(162);

    case GearType.chakram:
    case GearType.hexSeeker:
      return getExtraJobReqStringByJob(154);
  }
}

function getExtraJobReqStringByJob(specJob: number) {
  switch (specJob) {
    case 21:
      return "아란 착용 가능";
    case 22:
      return "에반 착용 가능";
    case 23:
      return "메르세데스 착용가능";
    case 24:
      return "팬텀 착용 가능";
    case 25:
      return "은월 착용 가능";
    case 27:
      return "루미너스 착용 가능";
    case 31:
      return "데몬 직업군 착용 가능";
    case 36:
      return "제논 착용 가능";
    case 37:
      return "블래스터 착용 가능";
    case 51:
      return "미하일 착용 가능";
    case 61:
      return "카이저 착용 가능";
    case 63:
      return "카인 착용 가능";
    case 64:
      return "카데나 착용 가능";
    case 65:
      return "엔젤릭 버스터 착용 가능";
    case 101:
      return "제로 착용 가능";
    case 142:
      return "키네시스 착용 가능";
    case 151:
      return "아델 착용 가능";
    case 152:
      return "일리움 착용 가능";
    case 154:
      return "칼리 착용 가능";
    case 155:
      return "아크 착용 가능";
    case 162:
      return "라라 착용 가능";
    case 164:
      return "호영 착용 가능";
  }
}

const canImages = {
  0: jobEnable0,
  1: jobEnable1,
  2: jobEnable2,
  3: jobEnable3,
  4: jobEnable4,
  5: jobEnable5,
};

const cannotImages = {
  0: jobDisable0,
  1: jobDisable1,
  2: jobDisable2,
  3: jobDisable3,
  4: jobDisable4,
  5: jobDisable5,
};
