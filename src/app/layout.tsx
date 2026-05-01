import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import Cursor from "@/components/Cursor";
import "lenis/dist/lenis.css";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces-google",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "SoneaLabs",
  description:
    "An engineering studio shipping its own products and building yours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Cursor />
      </body>
    </html>
  );
}
