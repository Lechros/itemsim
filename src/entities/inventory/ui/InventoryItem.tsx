import { getGearIconUrl, useGearIconOrigin } from "@/shared/api";
import { Icon } from "@/shared/ui";
import { Gear, PotentialGrade } from "@malib/gear";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { clsx } from "@/shared/util";
import YellowStarIcon from "./YellowStarIcon";
import ExceptionalIcon from "./ExceptionalIcon";
import PotentialGradeIcon from "./PotentialGradeIcon";

export default function InventoryItem({
  gear,
  onPress,
  className,
}: Readonly<{
  gear: Gear;
  onPress?: () => void;
  className?: string;
}>) {
  const { origin } = useGearIconOrigin(gear.icon);

  return (
    <Card className={clsx("aspect-square", className)} isPressable onPress={onPress}>
      <CardBody>
        <div className="h-full flex justify-center items-center relative">
          {origin ? (
            <Icon
              src={getGearIconUrl(gear.icon).toString()}
              alt={`${gear.name} 아이콘`}
              origin={origin}
              scale={2}
            />
          ) : null}
          <div className="absolute top-0 left-0 flex gap-1">
            {gear.star > 0 ? (
              <Chip
                classNames={{
                  base: "backdrop-blur-sm backdrop-saturate-150 bg-default/[.5]",
                }}
                size="sm"
                startContent={<YellowStarIcon />}
              >
                {gear.star}
              </Chip>
            ) : null}
            {gear.scrollUpgradeCount > 0 ? (
              <Chip
                classNames={{
                  base: "backdrop-blur-sm backdrop-saturate-150 bg-default/[.5]",
                }}
                size="sm"
              >
                +{gear.scrollUpgradeCount}
              </Chip>
            ) : null}
          </div>
          <div className="absolute bottom-0 left-0 flex">
            {gear.exceptionalUpgradeCount > 0 ? <ExceptionalIcon /> : null}
          </div>
          <div className="absolute bottom-0 right-0 flex flex-col gap-0.5">
            {gear.potentialGrade != PotentialGrade.Normal ||
            gear.additionalPotentialGrade != PotentialGrade.Normal ? (
              <>
                <PotentialGradeIcon grade={gear.potentialGrade} />
                <PotentialGradeIcon grade={gear.additionalPotentialGrade} />
              </>
            ) : null}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
