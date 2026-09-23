import type { Metadata } from "next";
import {
  Manrope,
  Barlow_Condensed,
  Bricolage_Grotesque,
  Caveat,
} from "next/font/google";
import { profile } from "@/content/portfolio";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import "./anime.css";
import "./storybook.css";
import "./project-viewport.css";
import "./journal.css";
import "./after-hours.css";
import "./mobile.css";
import "./fireflies.css";
import "./theme-transitions.css";
import "./companion.css";
import "./mission-control.css";
import "./workshop-invite.css";
import { AmbientFireflies } from "@/components/ambient-fireflies";

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

const siteUrl = getSiteUrl();

const themeInitScript = `try{const saved=localStorage.getItem("portfolio-theme");if(saved==="day"||saved==="night")document.documentElement.dataset.theme=saved}catch{}`;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  applicationName: "Subramanian’s little AI lab",
  authors: [{ name: profile.name, url: profile.githubUrl }],
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  robots: { index: process.env.VERCEL_ENV !== "preview", follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Subramanian — AI Engineer",
    title: "A curious mind. A world to build.",
    description:
      "Subramanian’s illustrated AI engineering portfolio. RAG, agents, production backends, and a little curiosity.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Subramanian — AI Engineer",
    description:
      "RAG, AI agents, and production backends. Step inside the little AI lab.",
  },
  title: `${profile.name} — AI Engineer`,
  description:
    "Subramanian M, AI Engineer in Coimbatore, India. RAG, LangGraph, AI agents and production backends. Explore his work, ask about his experience and download his résumé.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="day" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${manrope.variable} ${display.variable} ${playful.variable} ${handwritten.variable}`}
      >
        {children}
        <AmbientFireflies />
      </body>
    </html>
  );
}
