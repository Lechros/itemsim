import { blueStar, emptyStar, yellowStar } from "@/shared/ui";

export default function Stars({
  star,
  maxStar,
  color = "yellow",
}: Readonly<{ star: number; maxStar: number; color?: "yellow" | "blue" }>) {
  const lines = toStarArray(star, maxStar);

  return (
    <div className="flex flex-col items-center gap-[8px]">
      {lines.map((line, l) => (
        <div className="h-[10px] flex gap-[6px] pr-[1px]" key={l}>
          {line.map((group, g) => (
            <div className="flex items-start" key={g}>
              {group.map((lit, s) => (
                <Star color={color} isEmpty={!lit} key={s} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Star({ color, isEmpty }: Readonly<{ color: string; isEmpty: boolean }>) {
  let src, alt;
  if (isEmpty) {
    src = emptyStar;
    alt = "☆";
  } else {
    src = color === "yellow" ? yellowStar : blueStar;
    alt = "★";
  }
  // Using <img /> since next/image modifies the image
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="w-[11px] h-[10px] -mr-[1px] select-none" src={src.src} alt={alt} />;
}

const STAR_PER_LINE = 15;
const STAR_PER_GROUP = 5;

function toStarArray(star: number, maxStar: number) {
  maxStar = Math.max(star, maxStar);
  const lines = [];
  for (let l = 0; l < maxStar; l += STAR_PER_LINE) {
    const line = [];
    for (let g = l; g < Math.min(maxStar, l + STAR_PER_LINE); g += STAR_PER_GROUP) {
      const group = [];
      for (let s = g; s < Math.min(maxStar, g + STAR_PER_GROUP); s++) {
        group.push(s < star);
      }
      line.push(group);
    }
    lines.push(line);
  }
  return lines;
}
