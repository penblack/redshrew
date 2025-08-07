// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RedShrew – Deception is Defense",
  description: "Cyber deception tools and strategies for adversary detection and response.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <head>
        {/* Open Graph */}
        <meta property="og:title" content="RedShrew – Deception is Defense" />
        <meta property="og:description" content="Deploy fake secrets, login traps, and monitor adversary behavior in real time." />
        <meta property="og:image" content="https://www.redshrew.com/preview.png" />
        <meta property="og:url" content="https://www.redshrew.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RedShrew – Deception is Defense" />
        <meta name="twitter:description" content="Modern deception for modern threats." />
        <meta name="twitter:image" content="https://www.redshrew.com/preview.png" />
      </head>
      <body className={`${inter.className} antialiased font-sans`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
