import { yellowStar } from "@/shared/ui";
import Image from "next/image";

export default function YellowStarIcon() {
  return (
    <div className="w-4 h-4 flex items-center justify-center">
      <Image src={yellowStar} alt="스타포스" />
    </div>
  );
}
