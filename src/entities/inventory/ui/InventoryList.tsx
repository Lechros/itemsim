import { clsx } from "@/shared/util";

export default function InventoryList({
  children,
  isEmpty = false,
  emptyMessage,
  className,
}: Readonly<{
  children?: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        "max-w-md sm:max-w-2xl p-3 sm:p-4",
        !isEmpty && "grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4",
        className
      )}
    >
      {isEmpty ? (
        <p className="text-center text-large text-foreground-500">{emptyMessage}</p>
      ) : (
        children
      )}
    </div>
  );
}
