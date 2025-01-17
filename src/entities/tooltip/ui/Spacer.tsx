export function Spacer({ width, height }: Readonly<{ width?: number; height?: number }>) {
  return (
    <span
      aria-hidden
      className="block"
      style={{
        width,
        height,
      }}
    />
  );
}
