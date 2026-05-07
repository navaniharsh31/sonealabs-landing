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
  title: "SoneaLabs | The 28-Day MVP & AI Agent Engineering Studio",
  description:
    "We build production-ready MVPs in 28 days and autonomous AI agents to replace manual work. A senior engineering studio shipping its own products and building yours.",
  keywords: [
    "Next.js MVP agency",
    "React Native app developers",
    "AI agent builders",
    "build an MVP fast",
    "software development agency",
    "startup engineering studio",
    "autonomous AI workflows",
  ],
  authors: [{ name: "Harsh Navani" }],
  openGraph: {
    title: "SoneaLabs | 28-Day MVP & AI Agents",
    description: "Ship your MVP in 28 days or it's free. We build Next.js apps, React Native mobile apps, and autonomous AI agents.",
    url: "https://sonealabs.com",
    siteName: "SoneaLabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoneaLabs | Engineering Studio",
    description: "Ship your MVP in 28 days or it's free. Next.js, Expo, and AI Agents.",
    creator: "@navaniharsh31",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
