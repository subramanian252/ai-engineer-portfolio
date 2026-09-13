import type { Metadata } from "next";
import {
  Manrope,
  Barlow_Condensed,
  Bricolage_Grotesque,
  Caveat,
} from "next/font/google";
import { profile } from "@/content/portfolio";
import "./globals.css";
import "./anime.css";
import "./storybook.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const playful = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-playful",
  display: "swap",
});
const handwritten = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — AI Engineer`,
  description:
    "Subramanian M, AI Engineer in Coimbatore, India. RAG, LangGraph, AI agents and production backends. Explore his work, ask about his experience and download his résumé.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${display.variable} ${playful.variable} ${handwritten.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
