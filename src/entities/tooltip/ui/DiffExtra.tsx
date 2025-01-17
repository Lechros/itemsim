import {
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
  numberLookaheadMinus,
  numberLookaheadPercent,
  numberLookaheadPlus,
  summaryIconBdr,
  summaryIconIgpddr,
  summaryIconPdd,
} from "@/shared/ui";
import { UIImage } from "./UIImage";

type Type = "pdd" | "bdr" | "igpddr";

export function DiffExtraArea({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="pl-[12px] w-full grid grid-cols-[57px_57px_53px] gap-[5px]">{children}</div>
  );
}

export function DiffExtra({
  type,
  value,
  percent = false,
}: Readonly<{ type: Type; value: number; percent?: boolean }>) {
  const sign = value > 0 ? "+" : value < 0 ? "-" : null;
  const digits = Math.abs(value).toString();

  return (
    <div className="flex items-center justify-between">
      <UIImage image={images[type]} />
      <div className="flex gap-px">
        {sign ? <Sign sign={sign} /> : null}
        {digits.split("").map((digit, i) => (
          <Digit digit={digit} key={i} />
        ))}
        {percent ? <UIImage image={images["%"]} style={{ marginLeft: "3px" }} /> : null}
      </div>
    </div>
  );
}

function Sign({ sign }: Readonly<{ sign: "+" | "-" }>) {
  const image = images[sign];

  return (
    <UIImage
      image={image}
      style={{ marginTop: sign === "-" ? "2px" : undefined, marginRight: "3px" }}
    />
  );
}

function Digit({ digit }: Readonly<{ digit: string }>) {
  const image = images[digit as "0"];

  return <UIImage image={image} style={{ marginLeft: digit === "1" ? "1px" : undefined }} />;
}

const images = {
  pdd: summaryIconPdd,
  bdr: summaryIconBdr,
  igpddr: summaryIconIgpddr,
  "+": numberLookaheadPlus,
  "-": numberLookaheadMinus,
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
  "%": numberLookaheadPercent,
};
