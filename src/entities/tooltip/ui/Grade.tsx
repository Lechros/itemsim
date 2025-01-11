import { PotentialGrade } from "@malib/gear";
import styles from "./tooltip.module.css";
import { clsx } from "@/shared/util";

export default function Grade({
  grade,
  specialGrade,
}: Readonly<{ grade: PotentialGrade; specialGrade: boolean }>) {
  if (grade === PotentialGrade.Normal) {
    return null;
  }

  return (
    <div className={clsx(styles.detailText, styles.white)}>
      {getGradeString(grade, specialGrade)}
    </div>
  );
}

function getGradeString(grade: PotentialGrade, specialGrade: boolean) {
  if (specialGrade) {
    return "(스페셜 아이템)";
  }
  switch (grade) {
    case PotentialGrade.Rare:
      return "(레어 아이템)";
    case PotentialGrade.Epic:
      return "(에픽 아이템)";
    case PotentialGrade.Unique:
      return "(유니크 아이템)";
    case PotentialGrade.Legendary:
      return "(레전드리 아이템)";
    default:
      return "";
  }
}
