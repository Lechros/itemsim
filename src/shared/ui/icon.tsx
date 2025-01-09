export default function Icon({
  src,
  alt,
  origin,
}: Readonly<{ src: string; alt: string; origin: [number, number] }>) {
  return (
    <div className="w-8 h-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{
          marginLeft: `${-origin[0]}px`,
          marginTop: `${32 - origin[1]}px`,
          imageRendering: "pixelated",
        }}
        src={src}
        alt={alt}
      />
    </div>
  );
}
