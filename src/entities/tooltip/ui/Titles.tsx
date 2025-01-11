import { clsx } from "@/shared/util";
import { SoulData } from "@malib/gear";
import React from "react";
import styles from "./tooltip.module.css";

export function TitleGroup({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}

export function SoulTitle({ soul }: Readonly<{ soul?: SoulData }>) {
  if (!soul) {
    return null;
  }

  return (
    <div className={clsx(styles.titleText, styles.green)}>{soul.name.replace(/소울$/, "")}</div>
  );
}

export function NameTitle({
  name,
  scrollUpgradeCount,
  color,
}: Readonly<{ name: string; scrollUpgradeCount: number; color: string }>) {
  return (
    <div className={clsx(styles.titleText, styles[color])}>
      {name}
      {scrollUpgradeCount > 0 ? ` (+${scrollUpgradeCount})` : null}
    </div>
  );
}
