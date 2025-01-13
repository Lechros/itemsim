import {
  numberCan0,
  numberCan1,
  numberCan2,
  numberCan3,
  numberCan4,
  numberCan5,
  numberCan6,
  numberCan7,
  numberCan8,
  numberCan9,
  numberCanClose,
  numberCannot0,
  numberCannot1,
  numberCannot2,
  numberCannot3,
  numberCannot4,
  numberCannot5,
  numberCannot6,
  numberCannot7,
  numberCannot8,
  numberCannot9,
  numberCannotReqDex,
  numberCannotReqInt,
  numberCannotReqLev,
  numberCannotReqLuk,
  numberCannotReqStr,
  numberCanOpen,
  numberCanReqDex,
  numberCanReqInt,
  numberCanReqLev,
  numberCanReqLuk,
  numberCanReqStr,
  numberDisabled0,
  numberDisabled1,
  numberDisabled2,
  numberDisabled3,
  numberDisabled4,
  numberDisabled5,
  numberDisabled6,
  numberDisabled7,
  numberDisabled8,
  numberDisabled9,
  numberDisabledReqDex,
  numberDisabledReqInt,
  numberDisabledReqLev,
  numberDisabledReqLuk,
  numberDisabledReqStr,
  numberLookahead0,
  numberLookahead1,
  numberLookahead2,
  numberLookahead3,
  numberLookahead4,
  numberLookahead5,
  numberLookahead6,
  numberLookahead7,
  numberLookahead8,
  numberLookahead9,
  numberYellow0,
  numberYellow1,
  numberYellow2,
  numberYellow3,
  numberYellow4,
  numberYellow5,
  numberYellow6,
  numberYellow7,
  numberYellow8,
  numberYellow9,
  numberYellowMinus,
} from "@/shared/ui";
import Spacer from "./Spacer";
import { StaticImageData } from "next/image";

type Type = "str" | "dex" | "int" | "luk";

export function ReqArea({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-[156px] flex flex-col pr-[5px]">{children}</div>;
}

export function ReqLine({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex justify-between">{children}</div>;
}

export function ReqLev({
  value,
  decrease = 0,
  can,
}: Readonly<{ value: number; decrease?: number; can: boolean }>) {
  const variant = getVariant(value - decrease, can);
  const reqImage = reqImages[variant as keyof typeof reqImages].lev;
  const digits = (value - decrease).toString().padStart(3, "_");
  const baseDigits = value.toString();
  const decreaseDigits = decrease.toString();

  return (
    <div className="flex items-start gap-px">
      {imageTag(reqImage, "req lev: ", { marginRight: variant === "can" ? "4px" : "3px" })}
      {digits
        .split("")
        .map((digit, i) =>
          digit === "_" ? (
            <Spacer width={5} key={i} />
          ) : (
            <Digit digit={digit} variant={variant === "can" ? "yellow" : variant} key={i} />
          )
        )}
      {decrease > 0 ? (
        <>
          <Spacer width={1} />
          {openTag()}
          {baseDigits.split("").map((digit, i) => (
            <Digit digit={digit} variant="can" gap key={i} />
          ))}
          {minusTag()}
          {decreaseDigits.split("").map((digit, i) => (
            <Digit digit={digit} variant="yellow" gap key={i} />
          ))}
          {closeTag()}
        </>
      ) : null}
    </div>
  );
}

export function ReqStat({
  type,
  value,
  can,
}: Readonly<{
  type: Type;
  value: number;
  can: boolean;
}>) {
  const variant = getVariant(value, can);
  const digits = value.toString().padStart(3, "0");

  return (
    <div className="flex items-start gap-px">
      <Req type={type} variant={variant} />
      {digits.split("").map((digit, i) => (
        <Digit digit={digit} variant={variant} key={i} />
      ))}
    </div>
  );
}

function Req({ type, variant }: Readonly<{ type: Type; variant: Variant }>) {
  const image = reqImages[variant as keyof typeof reqImages][type];

  return imageTag(image, `req ${type}: `, { marginRight: "3px" });
}

function Digit({
  digit,
  variant,
  gap = false,
}: Readonly<{ digit: string; variant: Variant; gap?: boolean }>) {
  const image = digitImages[variant][digit as "0"];

  return imageTag(image, digit, { marginLeft: digit === "1" && gap ? "1px" : undefined });
}

function openTag() {
  return imageTag(numberCanOpen, "(");
}

function minusTag() {
  return imageTag(numberYellowMinus, "-", { marginTop: "2px" });
}

function closeTag() {
  return imageTag(numberCanClose, ")");
}

function imageTag(image: StaticImageData, alt: string, style: React.CSSProperties = {}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img width={image.width} height={image.height} src={image.src} alt={alt} style={style} />
  );
}

function getVariant(value: number, can: boolean) {
  if (value === 0) {
    return "disabled";
  }
  return can ? "can" : "cannot";
}

type Variant = "can" | "cannot" | "disabled" | "lookahead" | "yellow";

const reqImages = {
  can: {
    lev: numberCanReqLev,
    str: numberCanReqStr,
    dex: numberCanReqDex,
    int: numberCanReqInt,
    luk: numberCanReqLuk,
  },
  cannot: {
    lev: numberCannotReqLev,
    str: numberCannotReqStr,
    dex: numberCannotReqDex,
    int: numberCannotReqInt,
    luk: numberCannotReqLuk,
  },
  disabled: {
    lev: numberDisabledReqLev,
    str: numberDisabledReqStr,
    dex: numberDisabledReqDex,
    int: numberDisabledReqInt,
    luk: numberDisabledReqLuk,
  },
};

const digitImages = {
  can: {
    "0": numberCan0,
    "1": numberCan1,
    "2": numberCan2,
    "3": numberCan3,
    "4": numberCan4,
    "5": numberCan5,
    "6": numberCan6,
    "7": numberCan7,
    "8": numberCan8,
    "9": numberCan9,
  },
  cannot: {
    "0": numberCannot0,
    "1": numberCannot1,
    "2": numberCannot2,
    "3": numberCannot3,
    "4": numberCannot4,
    "5": numberCannot5,
    "6": numberCannot6,
    "7": numberCannot7,
    "8": numberCannot8,
    "9": numberCannot9,
  },
  disabled: {
    "0": numberDisabled0,
    "1": numberDisabled1,
    "2": numberDisabled2,
    "3": numberDisabled3,
    "4": numberDisabled4,
    "5": numberDisabled5,
    "6": numberDisabled6,
    "7": numberDisabled7,
    "8": numberDisabled8,
    "9": numberDisabled9,
  },
  lookahead: {
    "0": numberLookahead0,
    "1": numberLookahead1,
    "2": numberLookahead2,
    "3": numberLookahead3,
    "4": numberLookahead4,
    "5": numberLookahead5,
    "6": numberLookahead6,
    "7": numberLookahead7,
    "8": numberLookahead8,
    "9": numberLookahead9,
  },
  yellow: {
    "0": numberYellow0,
    "1": numberYellow1,
    "2": numberYellow2,
    "3": numberYellow3,
    "4": numberYellow4,
    "5": numberYellow5,
    "6": numberYellow6,
    "7": numberYellow7,
    "8": numberYellow8,
    "9": numberYellow9,
  },
};
