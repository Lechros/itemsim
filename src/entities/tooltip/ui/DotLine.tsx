import { frameDotline } from "@/shared/ui";
import { clsx } from "@/shared/util";

export function DotLine({ className }: Readonly<{ className?: string }>) {
  return (
    <hr
      className={clsx("w-[261px] h-[2px] border-none", className)}
      style={{ backgroundImage: `url(${frameDotline.src})` }}
    />
  );
}
