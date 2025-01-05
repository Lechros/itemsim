import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const nexonGothic = localFont({
  src: [
    {
      path: "./NEXON-Lv1-Gothic-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./NEXON-Lv1-Gothic.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./NEXON-Lv1-Gothic-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "아이템 시뮬레이터",
  description: "메이플스토리 아이템 시뮬레이터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nexonGothic.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
