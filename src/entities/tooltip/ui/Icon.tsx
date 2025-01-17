import { getGearIconUrl, useGearIconOrigin } from "@/shared/api";
import {
  OriginIcon,
  iconBase,
  iconBorderEpic,
  iconBorderLegendary,
  iconBorderRare,
  iconBorderUnique,
  iconCover,
  iconDotNew,
  iconDotOld,
} from "@/shared/ui";
import { PotentialGrade } from "@malib/gear";

export function Icon({
  icon,
  grade,
  newBonus = false,
}: Readonly<{
  icon: string;
  grade: PotentialGrade;
  newBonus?: boolean;
}>) {
  const { origin } = useGearIconOrigin(icon);

  return (
    <div className="relative">
      {getIconBorder(grade) ? (
        <div
          className="w-[90px] h-[80px] absolute top-px left-px"
          style={{ backgroundImage: `url(${getIconBorder(grade)!.src})` }}
        />
      ) : null}
      <div className="w-[82px] h-[82px]" style={{ backgroundImage: `url(${iconBase.src})` }}>
        <div className="w-[80px] h-[80px] flex items-center justify-center">
          <OriginIcon
            src={getGearIconUrl(icon).toString()}
            alt="아이콘"
            origin={origin}
            scale={2}
          />
        </div>
      </div>
      <div
        className="w-[10px] h-[10px] absolute top-[5px] left-[5px] flex items-center justify-center"
        style={{ backgroundImage: `url(${iconDotOld.src})` }}
      >
        {newBonus ? (
          <div className="w-[6px] h-[6px]" style={{ backgroundImage: `url(${iconDotNew.src})` }} />
        ) : null}
      </div>
      <div
        className="w-[74px] h-[74px] absolute top-[4px] left-[4px]"
        style={{ backgroundImage: `url(${iconCover.src})` }}
      />
    </div>
  );
}

function getIconBorder(grade: PotentialGrade) {
  switch (grade) {
    case PotentialGrade.Rare:
      return iconBorderRare;
    case PotentialGrade.Epic:
      return iconBorderEpic;
    case PotentialGrade.Unique:
      return iconBorderUnique;
    case PotentialGrade.Legendary:
      return iconBorderLegendary;
  }
}
