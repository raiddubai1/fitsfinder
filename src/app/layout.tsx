import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PackSmart - Smart Packing Lists for Every Trip",
  description: "Never forget essential items again. Create personalized packing lists based on your destination, trip duration, activities, and preferences.",
  keywords: ["PackSmart", "packing list", "travel", "trip planner", "luggage", "travel essentials"],
  authors: [{ name: "PackSmart Team" }],
  openGraph: {
    title: "PackSmart - Smart Packing Lists",
    description: "Create personalized packing lists for every trip",
    url: "https://packsmart.app",
    siteName: "PackSmart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PackSmart - Smart Packing Lists",
    description: "Never forget essential items again with smart packing lists",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/favicon.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
