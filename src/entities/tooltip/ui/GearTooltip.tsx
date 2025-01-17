import { clsx } from "@/shared/util";
import { Gear } from "@malib/gear";
import Attributes from "./Attributes";
import { DiffExtra, DiffExtraArea } from "./DiffExtra";
import DotLine from "./DotLine";
import Frame from "./Frame";
import Grade from "./Grade";
import Icon from "./Icon";
import Incline from "./Incline";
import { ReqArea, ReqLev, ReqLine, ReqStat } from "./Reqs";
import Spacer from "./Spacer";
import Stars from "./Stars";
import { IconArea, InclineReqArea, SummaryArea } from "./SummaryArea";
import { NameTitle, SoulTitle, TitleGroup } from "./Titles";
import styles from "./tooltip.module.css";
import { JobReq } from "./JobReq";

type Incline =
  | {
      mode: "attack";
      attack: number;
    }
  | {
      mode: "combat";
      combat: number;
    }
  | {
      mode: "attack_combat";
      attack: number;
      combat: number;
    };

export default function GearTooltip({
  gear,
  incline = { mode: "attack", attack: 0 },
  cannot = {},
  diff = { pdd: 0, bdr: 0, igpddr: 0 },
  className,
}: Readonly<{
  gear: Gear;
  incline?: Incline;
  cannot?: {
    level?: boolean;
    str?: boolean;
    dex?: boolean;
    int?: boolean;
    luk?: boolean;
    job?: boolean;
  };
  diff?: {
    pdd: number;
    bdr: number;
    igpddr: number;
  };
  className?: string;
}>) {
  return (
    <Frame className={clsx(styles.pixelated, className)}>
      <Stars star={gear.star} maxStar={gear.maxStar} color={gear.starScroll ? "blue" : "yellow"} />
      <TitleGroup>
        <SoulTitle soul={gear.soul} />
        <NameTitle name={gear.name} scrollUpgradeCount={gear.scrollUpgradeCount} color="white" />
      </TitleGroup>
      <Spacer height={4} />
      <Grade grade={gear.potentialGrade} specialGrade={gear.attributes.specialGrade} />
      <Attributes
        only={gear.attributes.only}
        trade={gear.attributes.trade}
        onlyEquip={gear.attributes.onlyEquip}
        share={gear.attributes.share}
        blockGoldenHammer={gear.attributes.blockGoldenHammer}
        canPotential={gear.attributes.canPotential}
      />
      <Spacer height={10} />
      <DotLine />
      <Spacer height={6} />
      <SummaryArea>
        <IconArea>
          <Icon
            icon={gear.shapeIcon}
            grade={Math.max(gear.potentialGrade, gear.additionalPotentialGrade)}
            newBonus={false}
          />
        </IconArea>
        <InclineReqArea>
          {incline.mode === "attack" ? (
            <Incline label="공격력 증가량" diff={incline.attack} />
          ) : null}
          {incline.mode === "combat" ? (
            <Incline label="전투력 증가량" diff={incline.combat} />
          ) : null}
          {incline.mode === "attack_combat" ? (
            <>
              <Incline label="공격력 증가량" diff={incline.attack} small />
              <Incline label="전투력 증가량" diff={incline.combat} small />
            </>
          ) : null}
          <Spacer height={1} />
          <ReqArea>
            <ReqLine>
              <ReqLev
                value={gear.req.level}
                decrease={gear.baseOption.reqLevelDecrease + gear.addOption.reqLevelDecrease}
                can
              />
            </ReqLine>
            <Spacer height={9} />
            <ReqLine>
              <ReqStat type="str" value={gear.req.str} can={!cannot?.str} />
              <ReqStat type="luk" value={gear.req.luk} can={!cannot?.luk} />
            </ReqLine>
            <Spacer height={3} />
            <ReqLine>
              <ReqStat type="dex" value={gear.req.dex} can={!cannot?.dex} />
              <ReqStat type="int" value={gear.req.int} can={!cannot?.int} />
            </ReqLine>
          </ReqArea>
        </InclineReqArea>
      </SummaryArea>
      <Spacer height={5} />
      <DiffExtraArea>
        <DiffExtra type="pdd" value={diff.pdd} />
        <DiffExtra type="bdr" value={diff.bdr} percent />
        <DiffExtra type="igpddr" value={diff.igpddr} percent />
      </DiffExtraArea>
      <Spacer height={3} />
      <JobReq reqJob={gear.req.job} gearType={gear.type} can />
    </Frame>
  );
}
