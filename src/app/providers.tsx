"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { InventoryStoreProvider } from "../entities/inventory";
import { SWRConfig } from "swr";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemeProvider attribute="class" defaultTheme="dark">
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}
        >
          <InventoryStoreProvider>{children}</InventoryStoreProvider>
        </SWRConfig>
      </NextThemeProvider>
    </NextUIProvider>
  );
}
