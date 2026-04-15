"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);

  // Close product dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (productRef.current && !productRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleMobileMenu = () => setMobileOpen((v) => !v);

  // Plain text nav link — color shift on hover, no pill background (matches Sentry proportions)
  const navLink =
    "text-sm text-neutral-300 hover:text-white transition-colors px-3 py-1.5 whitespace-nowrap";

  // Dropdown menu item
  const dropItem =
    "block px-3 py-1.5 rounded-md text-sm text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors whitespace-nowrap";

  return (
    <header className="sticky top-0 z-50 w-full bg-black/75 backdrop-blur-md border-b border-white/[0.08]">
      {/* Single constrained row — mirrors Sentry's max-w-7xl centered bar */}
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-8">

        {/* ── LEFT: Logo + Brand ──────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/rat-circle-logo-red-512x512.png"
            alt="RedShrew Logo"
            width={512}
            height={512}
            className="h-9 w-auto"
            priority
          />
          <span className="text-lg font-extrabold text-red-600 tracking-widest leading-none select-none">
            REDSHREW
          </span>
        </Link>

        {/* ── CENTER: Primary nav ─────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center" aria-label="Primary">

          {/* Product — mega-menu dropdown */}
          <div className="relative" ref={productRef}>
            <button
              onClick={() => setProductOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={productOpen}
              className={`flex items-center gap-1 ${navLink} ${productOpen ? "text-white" : ""}`}
            >
              Product
              <ChevronDown
                size={14}
                className={`mt-px flex-shrink-0 transition-transform duration-200 ${productOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mega-menu panel */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-2.5 w-[700px]
                bg-neutral-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl
                transition-all duration-200 origin-top
                ${productOpen
                  ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                }`}
            >
              <div className="grid grid-cols-3 p-5 gap-5">
                {/* Suite */}
                <div>
                  <p className="text-[11px] font-semibold text-red-400 uppercase tracking-wider mb-2 px-3">
                    Suite
                  </p>
                  <ul className="space-y-0.5">
                    <li><Link href="/phantomkey" className={dropItem}>PhantomKey</Link></li>
                    <li><Link href="/honeypitch" className={dropItem}>HoneyPitch</Link></li>
                    <li><Link href="/observer"   className={dropItem}>Observer</Link></li>
                    <li><Link href="/API"        className={dropItem}>API</Link></li>
                    <li><Link href="/Cloud"      className={dropItem}>Cloud</Link></li>
                    <li>
                      <Link
                        href="/suite"
                        className="block px-3 py-1.5 rounded-md text-sm text-red-400 hover:text-red-300 hover:bg-white/[0.06] transition-colors"
                      >
                        See All Tools →
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Ecosystems — vertical divider via border-l */}
                <div className="border-l border-white/10 pl-5">
                  <p className="text-[11px] font-semibold text-red-400 uppercase tracking-wider mb-2 px-3">
                    Ecosystems
                  </p>
                  <ul className="space-y-0.5">
                    <li><span className={dropItem}>AWS, Azure</span></li>
                    <li><span className={dropItem}>Splunk</span></li>
                    <li><span className={dropItem}>QRadar</span></li>
                    <li><span className={dropItem}>Windows</span></li>
                    <li><span className={dropItem}>Linux / macOS</span></li>
                    <li><span className={dropItem}>Kubernetes, Docker</span></li>
                    <li><span className={dropItem}>SIEM / SOC Tools</span></li>
                  </ul>
                </div>

                {/* Why RedShrew — vertical divider */}
                <div className="border-l border-white/10 pl-5">
                  <p className="text-[11px] font-semibold text-red-400 uppercase tracking-wider mb-2 px-3">
                    Why RedShrew
                  </p>
                  <ul className="space-y-0.5">
                    <li><span className={dropItem}>Deception-Driven Security</span></li>
                    <li><span className={dropItem}>Rapid Threat Detection</span></li>
                    <li><span className={dropItem}>Zero False Positives</span></li>
                    <li><span className={dropItem}>Easy Deployment</span></li>
                    <li><span className={dropItem}>No Impact on Users</span></li>
                    <li><span className={dropItem}>Compliance Ready</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link href="/solutions" className={navLink}>Solutions</Link>
          <Link href="/playbook"  className={navLink}>Playbook</Link>
          <Link href="/suite"     className={navLink}>Suite</Link>
          <Link href="/blog"      className={navLink}>Blog</Link>
          <Link href="/contact"   className={navLink}>Contact</Link>
        </nav>

        {/* ── RIGHT: Auth buttons ─────────────────────────────────── */}
        {/* Outlined (ghost) + Filled — visually distinct, matches Sentry's "Sign in / Get started" */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/demo"
            className="px-4 py-2 rounded-md text-sm font-medium text-neutral-200
              border border-neutral-600 hover:border-neutral-400 hover:text-white
              transition-colors whitespace-nowrap"
          >
            Get a Demo
          </Link>
          <Link
            href="/get-started"
            className="px-4 py-2 rounded-md text-sm font-semibold text-white
              bg-red-600 hover:bg-red-500 transition-colors whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>

        {/* ── Hamburger (mobile only) ─────────────────────────────── */}
        <button
          className="md:hidden text-neutral-300 hover:text-white transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile slide-in panel ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm
              bg-neutral-950 border-l border-white/10
              flex flex-col p-6 gap-4 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Menu
              </span>
              <button
                onClick={toggleMobileMenu}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <Link href="/product"    onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-white transition-colors">Product</Link>
            <Link href="/solutions"  onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-white transition-colors">Solutions</Link>
            <Link href="/playbook"   onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-white transition-colors">Playbook</Link>
            <Link href="/suite"      onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-white transition-colors">Suite</Link>
            <Link href="/blog"       onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-white transition-colors">Blog</Link>
            <Link href="/contact"    onClick={toggleMobileMenu} className="text-base text-neutral-200 hover:text-white transition-colors">Contact</Link>

            <hr className="border-white/10 my-1" />

            <Link
              href="/demo"
              onClick={toggleMobileMenu}
              className="text-base text-neutral-200 hover:text-white transition-colors"
            >
              Get a Demo
            </Link>
            <Link
              href="/get-started"
              onClick={toggleMobileMenu}
              className="w-full text-center px-4 py-2.5 rounded-md text-sm font-semibold
                text-white bg-red-600 hover:bg-red-500 transition-colors"
            >
              Get Started
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
