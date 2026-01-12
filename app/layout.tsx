import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import DiscordBanner from "@/components/DiscordBanner";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://brmax.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "BR-MAX | iMessage Conversation Video Generator",
  description:
    "Generate realistic iMessage-style conversation videos with full control over scripts, voices, themes, monetization chats, and cinematic rendering, all inside BR-MAX.",
  keywords: [
    "BR-MAX",
    "iMessage video generator",
    "chat video maker",
    "iMessage conversation video",
    "Remotion video generator",
    "scripted chat visuals",
    "chat marketing videos",
    "iMessage chat animation",
    "video rendering tool",
  ],
  openGraph: {
    title: "BR-MAX | Generate Realistic iMessage-Style Conversation Videos",
    description:
      "Generate scripted iMessage conversations, customize voice settings, add monetization segments, and export polished conversation videos seamlessly.",
    url: `${baseUrl}/`,
    siteName: "BR-MAX",
    type: "website",
    images: [
      {
        url: "https://br-max.s3.ap-south-1.amazonaws.com/og-brmax-1200x630.png",
        width: 1200,
        height: 630,
        alt: "BR-MAX iMessage Conversation Video Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BR-MAX | iMessage Conversation Video Generator",
    description:
      "Create polished iMessage-style videos from your custom scripts with full control over visuals and audio.",
    images: [
      "https://br-max.s3.ap-south-1.amazonaws.com/og-brmax-1200x630.png",
    ],
  },
  alternates: {
    canonical: `${baseUrl}/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics/>
        <ServiceWorkerRegistration />
        <DiscordBanner />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
