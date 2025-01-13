import {
  decline0,
  decline1,
  decline2,
  decline3,
  decline4,
  decline5,
  decline6,
  decline7,
  decline8,
  decline9,
  decline_10digit0,
  decline_10digit1,
  decline_10digit2,
  decline_10digit3,
  decline_10digit4,
  decline_10digit5,
  decline_10digit6,
  decline_10digit7,
  decline_10digit8,
  decline_10digit9,
  decline_10digitMinus,
  decline_8digit0,
  decline_8digit1,
  decline_8digit2,
  decline_8digit3,
  decline_8digit4,
  decline_8digit5,
  decline_8digit6,
  decline_8digit7,
  decline_8digit8,
  decline_8digit9,
  decline_8digitMinus,
  declineMinus,
  incline0,
  incline1,
  incline2,
  incline3,
  incline4,
  incline5,
  incline6,
  incline7,
  incline8,
  incline9,
  incline_10digit0,
  incline_10digit1,
  incline_10digit2,
  incline_10digit3,
  incline_10digit4,
  incline_10digit5,
  incline_10digit6,
  incline_10digit7,
  incline_10digit8,
  incline_10digit9,
  incline_10digitPlus,
  incline_8digit0,
  incline_8digit1,
  incline_8digit2,
  incline_8digit3,
  incline_8digit4,
  incline_8digit5,
  incline_8digit6,
  incline_8digit7,
  incline_8digit8,
  incline_8digit9,
  incline_8digitPlus,
  inclinePlus,
} from "@/shared/ui";
import { clsx } from "@/shared/util";
import styles from "./tooltip.module.css";

type Size = "normal" | "10digit" | "8digit";

export default function Incline({
  label,
  diff,
  small = false,
}: Readonly<{
  label: string;
  diff: number;
  small?: boolean;
}>) {
  const sign = diff > 0 ? "+" : diff < 0 ? "-" : null;
  const digits = Math.abs(diff).toString();
  const size = getSize(small, digits);

  return (
    <div
      className={clsx("flex flex-col items-end", {
        "gap-[4px] mb-[5px]": size === "normal",
        "gap-[4px] mb-[8px]": size === "10digit",
        "gap-[2px] mb-[7px]": size === "8digit",
      })}
    >
      <div className={clsx("whitespace-pre", styles.detailText, styles.gray2)}>{label} </div>
      <div className={clsx("flex items-center justify-end", { "-mr-[2px]": size === "10digit" })}>
        {sign ? <Sign sign={sign} size={size} /> : null}
        {digits.split("").map((digit, i) => (
          <Digit digit={digit} size={size} isDecline={diff < 0} key={i} />
        ))}
      </div>
    </div>
  );
}

function getSize(small: boolean, digits: string) {
  if (small) {
    return "8digit";
  }
  if (digits.length > 9) {
    return "8digit";
  } else if (digits.length > 7) {
    return "10digit";
  } else {
    return "normal";
  }
}

function Sign({ sign, size }: Readonly<{ sign: "+" | "-"; size: Size }>) {
  const image = signImages[size][sign];
  const margin = signMargins[size];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      width={image.width}
      height={image.height}
      src={image.src}
      alt={sign}
      style={{
        marginRight: `${margin}px`,
      }}
    />
  );
}

function Digit({
  digit,
  size,
  isDecline,
}: Readonly<{ digit: string; size: Size; isDecline: boolean }>) {
  const images = isDecline ? declineImages : inclineImages;
  const image = images[size][digit as keyof (typeof images)["normal"]];
  const margin = digitMargins[size][digit as keyof (typeof digitMargins)["normal"]];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      width={image.width}
      height={image.height}
      src={image.src}
      alt={digit}
      style={{
        marginLeft: `${margin}px`,
      }}
    />
  );
}

const signImages = {
  normal: {
    "+": inclinePlus,
    "-": declineMinus,
  },
  "10digit": {
    "+": incline_10digitPlus,
    "-": decline_10digitMinus,
  },
  "8digit": {
    "+": incline_8digitPlus,
    "-": decline_8digitMinus,
  },
};

const inclineImages = {
  normal: {
    "0": incline0,
    "1": incline1,
    "2": incline2,
    "3": incline3,
    "4": incline4,
    "5": incline5,
    "6": incline6,
    "7": incline7,
    "8": incline8,
    "9": incline9,
  },
  "10digit": {
    "0": incline_10digit0,
    "1": incline_10digit1,
    "2": incline_10digit2,
    "3": incline_10digit3,
    "4": incline_10digit4,
    "5": incline_10digit5,
    "6": incline_10digit6,
    "7": incline_10digit7,
    "8": incline_10digit8,
    "9": incline_10digit9,
  },
  "8digit": {
    "0": incline_8digit0,
    "1": incline_8digit1,
    "2": incline_8digit2,
    "3": incline_8digit3,
    "4": incline_8digit4,
    "5": incline_8digit5,
    "6": incline_8digit6,
    "7": incline_8digit7,
    "8": incline_8digit8,
    "9": incline_8digit9,
  },
};

const declineImages = {
  normal: {
    "0": decline0,
    "1": decline1,
    "2": decline2,
    "3": decline3,
    "4": decline4,
    "5": decline5,
    "6": decline6,
    "7": decline7,
    "8": decline8,
    "9": decline9,
  },
  "10digit": {
    "0": decline_10digit0,
    "1": decline_10digit1,
    "2": decline_10digit2,
    "3": decline_10digit3,
    "4": decline_10digit4,
    "5": decline_10digit5,
    "6": decline_10digit6,
    "7": decline_10digit7,
    "8": decline_10digit8,
    "9": decline_10digit9,
  },
  "8digit": {
    "0": decline_8digit0,
    "1": decline_8digit1,
    "2": decline_8digit2,
    "3": decline_8digit3,
    "4": decline_8digit4,
    "5": decline_8digit5,
    "6": decline_8digit6,
    "7": decline_8digit7,
    "8": decline_8digit8,
    "9": decline_8digit9,
  },
};

const signMargins = {
  normal: 4,
  "10digit": 0,
  "8digit": 0,
};

const digitMargins = {
  normal: {
    "0": 1,
    "1": 4,
    "2": 1,
    "3": 2,
    "4": 1,
    "5": 2,
    "6": 1,
    "7": 2,
    "8": 1,
    "9": 1,
  },
  "10digit": {
    "0": 0,
    "1": 1,
    "2": 1,
    "3": 1,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
  },
  "8digit": {
    "0": 0,
    "1": 1,
    "2": 0,
    "3": 0,
    "4": -1,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
  },
};
