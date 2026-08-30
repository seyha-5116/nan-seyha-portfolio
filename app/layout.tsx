import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { BackgroundFX } from "@/components/background-fx";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollTop } from "@/components/scroll-top";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nan Seyha — Full-Stack Developer",
    template: "%s — Nan Seyha",
  },
  description:
    "Nan Seyha is a full-stack developer building precise, functional web applications — from engineering-grade frontends to dependable backends.",
  keywords: [
    "Nan Seyha",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    title: "Nan Seyha — Full-Stack Developer",
    description:
      "Full-stack developer building precise, functional web applications.",
    url: SITE_URL,
    siteName: "Nan Seyha",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c0f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <BackgroundFX />
        <ScrollProgress />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <ScrollTop />
        <Footer />
      </body>
    </html>
  );
}