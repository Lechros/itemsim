import { clsx } from "@/shared/util";
import { Gear } from "@malib/gear";
import Attributes from "./Attributes";
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

export default function GearTooltip({
  gear,
  className,
}: Readonly<{
  gear: Gear;
  inclineDisplayMode?: "attack" | "combat" | "attack_combat";
  character?: {
    level: number;
    str: number;
    dex: number;
    int: number;
    luk: number;
    job: number;
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
          <Incline label="공격력 증가량" diff={11508176} small />
          <Incline label="전투력 증가량" diff={0} small />
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
              <ReqStat type="str" value={gear.req.str} can />
              <ReqStat type="luk" value={gear.req.luk} can />
            </ReqLine>
            <Spacer height={3} />
            <ReqLine>
              <ReqStat type="dex" value={gear.req.dex} can />
              <ReqStat type="int" value={gear.req.int} can />
            </ReqLine>
          </ReqArea>
        </InclineReqArea>
      </SummaryArea>
    </Frame>
  );
}
