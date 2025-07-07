import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image"; // ✅ Added Image import

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
        <header className="w-full px-16 py-12 flex justify-between items-center text-xl">
          <Link
            href="/"
            className="flex items-center gap-6 leading-none hover:opacity-90 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="RedShrew Logo"
              width={160}
              height={160}
              className="h-40 w-auto"
              priority
            />
            <span className="text-5xl font-extrabold text-red-500 tracking-widest">
              REDSHREW
            </span>
          </Link>

          <nav className="flex gap-14 text-xl font-semibold text-red-500">
            <a href="/solutions" className="hover:text-white transition-colors duration-200">
              Solutions
            </a>
            <a href="/playbook" className="hover:text-white transition-colors duration-200">
              Playbook
            </a>
            <a href="/suite" className="hover:text-white transition-colors duration-200">
              Suite
            </a>
            <a href="/blog" className="hover:text-white transition-colors duration-200">
              Blog
            </a>
            <a href="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </a>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
