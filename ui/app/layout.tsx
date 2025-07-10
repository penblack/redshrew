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
      <body className={`${inter.className} antialiased font-sans`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
