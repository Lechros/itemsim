import { StaticImageData } from "next/image";

export function UIImage({
  image,
  style = {},
}: Readonly<{ image: StaticImageData; style?: React.CSSProperties }>) {
  return (
    <span
      className="block"
      style={{
        width: image.width,
        height: image.height,
        backgroundImage: `url(${image.src})`,
        ...style,
      }}
    />
  );
}
