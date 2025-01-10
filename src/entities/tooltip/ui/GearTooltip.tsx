import { Gear } from "@malib/gear";
import Frame from "./Frame";
import Stars from "./Stars";

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
    </Frame>
  );
}
