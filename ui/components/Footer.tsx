import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#180606] text-neutral-300 border-t border-red-900">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo & name */}
        <div className="flex items-center gap-3">
          <Image
            src="/rat-circle-logo-red-512x512.png"
            alt="RedShrew Logo"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-bold tracking-wider text-red-400">REDSHREW</span>
          <span className="text-xs text-neutral-500 ml-2">
            © {new Date().getFullYear()} RedShrew. All rights reserved.
          </span>
        </div>

        {/* Center: Links */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/privacy" className="hover:underline hover:text-red-400 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline hover:text-red-400 transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:underline hover:text-red-400 transition-colors">
            Contact
          </Link>
          <Link href="/blog" className="hover:underline hover:text-red-400 transition-colors">
            Blog
          </Link>
          <Link href="/security" className="hover:underline hover:text-red-400 transition-colors">
            Security
          </Link>
        </nav>

        {/* Right: Tagline & GitHub */}
        <div className="flex items-center gap-3">
          <span className="text-xs italic text-neutral-500">Deception is Defense.</span>
          <a
            href="https://github.com/redshrew"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
            aria-label="GitHub"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="fill-neutral-400 hover:fill-red-500 transition-colors"
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.64.07-.64 1.02.08 1.56 1.07 1.56 1.07 .9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06a9.07 9.07 0 0 1 2.5-.34c.85.01 1.71.12 2.5.34 1.91-1.34 2.75-1.06 2.75-1.06 .55 1.43.2 2.48.1 2.74 .64.72 1.03 1.64 1.03 2.77 0 3.97-2.34 4.84-4.57 5.1 .36.31.68.93.68 1.87 0 1.35-.01 2.43-.01 2.76 0 .27.18.59.69.48C19.13 20.58 22 16.76 22 12.26 22 6.58 17.52 2 12 2Z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
    );
}
