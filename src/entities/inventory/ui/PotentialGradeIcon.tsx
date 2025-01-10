import {
  potentialIconRare,
  potentialIconEpic,
  potentialIconUnique,
  potentialIconLegendary,
  potentialIconNormal,
} from "@/shared/ui";
import { PotentialGrade } from "@malib/gear";
import Image from "next/image";

export default function PotentialGradeIcon({ grade }: Readonly<{ grade: PotentialGrade }>) {
  return <Image src={getPotentialIcon(grade)} alt="잠재옵션 등급" />;
}

function getPotentialIcon(grade: PotentialGrade) {
  switch (grade) {
    case PotentialGrade.Rare:
      return potentialIconRare;
    case PotentialGrade.Epic:
      return potentialIconEpic;
    case PotentialGrade.Unique:
      return potentialIconUnique;
    case PotentialGrade.Legendary:
      return potentialIconLegendary;
    default:
      return potentialIconNormal;
  }
}
