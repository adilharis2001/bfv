import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Body Fat View - AI Body Composition Analysis",
  description:
    "Private, AI-powered body composition analysis in 60 seconds. Track your fitness progress with instant body fat estimates.",
  keywords: [
    "body fat percentage",
    "body composition",
    "fitness tracking",
    "AI analysis",
    "body fat calculator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
