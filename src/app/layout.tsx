import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { clsx } from "@nextui-org/shared-utils";

const nexonLv2Gothic = localFont({
  src: [
    {
      path: "./_fonts/NEXON Lv2 Gothic OTF Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./_fonts/NEXON Lv2 Gothic OTF.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/NEXON Lv2 Gothic OTF Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_fonts/NEXON Lv2 Gothic OTF Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "아이템 시뮬레이터",
  description: "메이플스토리 아이템 시뮬레이터",
  keywords: ["Maplestory", "메이플스토리", "아이템 시뮬레이터"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={clsx("text-foreground bg-background antialiased", nexonLv2Gothic.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
