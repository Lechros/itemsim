import { frameBottom, frameCover, frameLine, frameTop } from "@/shared/ui";
import { clsx } from "@/shared/util";

export default function Frame({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className={clsx("w-[261px] relative", className)}>
      <div className="h-[13px] bg-no-repeat" style={{ backgroundImage: `url(${frameTop.src})` }} />
      <div className="bg-repeat-y px-[13px]" style={{ backgroundImage: `url(${frameLine.src})` }}>
        {children}
      </div>
      <div
        className="h-[13px] bg-no-repeat"
        style={{ backgroundImage: `url(${frameBottom.src})` }}
      />
      <div
        className="w-[53px] h-[43px] bg-no-repeat absolute top-0 left-0"
        style={{ backgroundImage: `url(${frameCover.src})` }}
      />
    </div>
  );
}
