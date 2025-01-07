"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { InventoryStoreProvider } from "../entities/inventory";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemeProvider attribute="class" defaultTheme="dark">
        <InventoryStoreProvider>{children}</InventoryStoreProvider>
      </NextThemeProvider>
    </NextUIProvider>
  );
}
