import { clsx } from "@/shared/util";
import { GearShare, GearTrade, PotentialCan } from "@malib/gear";
import { useEffect, useRef } from "react";
import styles from "./tooltip.module.css";

type Props = {
  only: boolean;
  trade: GearTrade;
  onlyEquip: boolean;
  share: GearShare;
  blockGoldenHammer: boolean;
  canPotential: PotentialCan;
};

export function Attributes(attributes: Readonly<Props>) {
  const tags = getTags(attributes);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    getElementsLastInLine(ref.current).forEach((el) => {
      el.classList.remove(styles.commaAfter);
    });
  }, [
    ref,
    attributes.only,
    attributes.trade,
    attributes.onlyEquip,
    attributes.share,
    attributes.blockGoldenHammer,
    attributes.canPotential,
  ]);

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center pl-[19px] pr-[20px]" ref={ref}>
      {tags.map((tag) => (
        <span
          className={clsx("whitespace-pre", styles.detailText, styles.orange, styles.commaAfter)}
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function getTags({
  only,
  trade,
  onlyEquip,
  share,
  blockGoldenHammer,
  canPotential,
}: Readonly<Props>) {
  const tags = [];
  if (only) {
    tags.push("고유 아이템");
  }
  if (trade === GearTrade.TradeBlock) {
    tags.push("교환 불가");
  } else if (trade === GearTrade.EquipTradeBlock) {
    tags.push("장착 시 교환 불가");
  }
  if (onlyEquip) {
    tags.push("고유장착 아이템");
  }
  if (share === GearShare.AccountSharable) {
    tags.push("월드 내 나의 캐릭터간 이동만 가능");
  } else if (share === GearShare.AccountSharableOnce) {
    tags.push("월드 내 나의 캐릭터 간 1회 이동 가능", "(이동 후 교환불가)");
  }
  if (blockGoldenHammer) {
    tags.push("황금 망치 사용 불가");
  }
  if (canPotential === PotentialCan.Fixed) {
    tags.push("잠재능력 재설정 불가");
  }
  return tags;
}

function getElementsLastInLine(parent: Element) {
  const elements = [];
  const children = parent.children;
  for (let i = 0; i < children.length - 1; i++) {
    const cur = children[i];
    const next = children[i + 1];
    if (cur.getBoundingClientRect().y < next.getBoundingClientRect().y) {
      elements.push(cur);
    }
  }
  elements.push(children[children.length - 1]);
  return elements;
}
