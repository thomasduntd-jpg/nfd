import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import LoadingScreen from "./LoadingScreen";

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Федосов Николай — Портфолио",
  description: "Графический дизайнер. Айдентика, графика, 3D, анимация.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={interTight.className}>
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}