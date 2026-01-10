import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Body Fat View - AI Body Composition Analysis",
  description:
    "Track your fitness progress with AI-powered body composition estimates. Get instant body fat analysis in 60 seconds. No appointments, no equipment needed. Start with 1 free scan.",
  keywords: [
    "body fat percentage",
    "body composition",
    "fitness tracking",
    "AI body analysis",
    "body fat calculator",
    "body composition analysis",
    "fitness progress tracking",
    "body fat estimate",
  ],
  openGraph: {
    title: "Body Fat View - AI Body Composition Analysis",
    description:
      "Track your fitness progress with AI-powered body composition estimates. Get instant analysis in 60 seconds. Start with 1 free scan.",
    type: "website",
    url: "https://bodyfatview.com",
    siteName: "Body Fat View",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Fat View - AI Body Composition Analysis",
    description:
      "Track your fitness progress with AI-powered body composition estimates. Get instant analysis in 60 seconds.",
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
  verification: {
    // Add Google Search Console verification when ready
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
