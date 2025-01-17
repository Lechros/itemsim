import { clsx } from "@/shared/util";
import { StaticImageData } from "next/image";

export function UIImage({
  image,
  children,
  className,
  style = {},
  as: Component = "span",
}: Readonly<{
  image: StaticImageData;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "span";
}>) {
  return (
    <Component
      className={clsx("block", className)}
      style={{
        width: image.width,
        height: image.height,
        backgroundImage: `url(${image.src})`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
