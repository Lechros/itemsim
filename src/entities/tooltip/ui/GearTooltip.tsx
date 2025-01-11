import { Gear } from "@malib/gear";
import Frame from "./Frame";
import Grade from "./Grade";
import Stars from "./Stars";
import { SoulTitle, NameTitle, TitleGroup } from "./Titles";
import Attributes from "./Attributes";
import DotLine from "./DotLine";
import Spacer from "./Spacer";

export default function GearTooltip({
  gear,
  className,
}: Readonly<{
  gear: Gear;
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
    <Frame className={className}>
      <Stars star={gear.star} maxStar={gear.maxStar} color={gear.starScroll ? "blue" : "yellow"} />
      <Spacer height={6} />
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
    </Frame>
  );
}
