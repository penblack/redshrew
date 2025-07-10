"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <header className="w-full px-6 py-4 flex flex-col items-center text-xl relative z-50">
      <div className="flex justify-center items-center gap-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-4 leading-none hover:opacity-90 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="RedShrew Logo"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
          <span className="text-2xl font-extrabold text-red-500 tracking-widest">
            REDSHREW
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10 text-neutral-300 font-semibold ml-12">
          <Link href="/solutions" className="hover:text-red-500 transition-colors">Solutions</Link>
          <Link href="/playbook" className="hover:text-red-500 transition-colors">Playbook</Link>
          <Link href="/suite" className="hover:text-red-500 transition-colors">Suite</Link>
          <Link href="/blog" className="hover:text-red-500 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4 ml-12">
          <Link
            href="/demo"
            className="border border-red-500 text-neutral-200 hover:bg-red-600 hover:text-white transition-colors px-4 py-2 rounded-md text-sm font-medium"
          >
            Get a Demo
          </Link>
  <Link
  href="/get-started"
  className="bg-neutral-300 text-black hover:shrewombre hover:text-white transition-colors px-4 py-2 rounded-md text-sm font-medium"
>
  Get Started
</Link>


        </div>
      </div>

      {/* Hamburger Button */}
      <button className="md:hidden text-red-500 z-50 absolute top-4 right-6" onClick={toggleMobileMenu} aria-label="Toggle Menu">
        {mobileOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Dark Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-black text-red-500 flex flex-col items-start p-6 gap-6 z-50 shadow-lg md:hidden"
          >
            <Link href="/solutions" onClick={toggleMobileMenu} className="text-lg">Solutions</Link>
            <Link href="/playbook" onClick={toggleMobileMenu} className="text-lg">Playbook</Link>
            <Link href="/suite" onClick={toggleMobileMenu} className="text-lg">Suite</Link>
            <Link href="/blog" onClick={toggleMobileMenu} className="text-lg">Blog</Link>
            <Link href="/contact" onClick={toggleMobileMenu} className="text-lg">Contact</Link>
            <hr className="w-full border-neutral-700 my-2" />
            <Link href="/demo" onClick={toggleMobileMenu} className="text-lg">Get a Demo</Link>
            <Link href="/get-started" onClick={toggleMobileMenu} className="text-lg">Get Started</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
