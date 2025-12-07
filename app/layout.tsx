import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Body Fat View - Private Body Composition Analysis",
  description:
    "Track your fitness progress with instant body fat estimates. Privacy-first, no appointments, no equipment needed. Get your free scan in 60 seconds.",
  keywords: [
    "body fat percentage",
    "body composition",
    "fitness tracking",
    "body fat calculator",
    "body fat analysis",
    "fitness progress tracking",
  ],
  openGraph: {
    title: "Body Fat View - Private Body Composition Analysis",
    description:
      "Track your fitness progress with instant body fat estimates. Privacy-first, no appointments, no equipment needed.",
    type: "website",
    url: "https://bodyfatview.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Fat View - Private Body Composition Analysis",
    description:
      "Track your fitness progress with instant body fat estimates. Privacy-first, no appointments, no equipment needed.",
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
