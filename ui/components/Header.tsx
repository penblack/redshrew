"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const productRef = useRef<HTMLDivElement>(null);

  // Click outside handler for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        productRef.current &&
        !productRef.current.contains(event.target as Node)
      ) {
        setProductOpen(false);
      }
    }
    if (productOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productOpen]);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  // Helper: pill-style nav link classes
  const navLinkClasses = "px-4 py-2 rounded-full transition-colors font-semibold hover:bg-red-300 hover:text-black focus:bg-red-400 focus:text-black active:bg-red-400 active:text-black";

  return (
    <header className="w-full px-6 py-0 flex flex-col items-center text-xl relative z-50">
      <div className="flex justify-center items-center gap-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center leading-none hover:opacity-90 transition-opacity"
        >
          <Image
            src="/rat-circle-logo-red-512x512.png"
            alt="RedShrew Logo"
            width={512}
            height={512}
            className="h-36 w-auto"
            priority
          />
          <span className="text-3xl font-extrabold text-red-700 tracking-widest">
            REDSHREW
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-4 text-neutral-300 font-semibold ml-12">
          {/* PRODUCT DROPDOWN (first button) */}
          <div className="relative group" ref={productRef}>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold focus:outline-none transition-colors ${
                productOpen
                  ? "bg-red-300 text-black"
                  : "hover:bg-red-300 hover:text-black"
              }`}
              onClick={() => setProductOpen((v) => !v)}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={productOpen}
            >
              Product
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="ml-1">
                <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" clipRule="evenodd" />
              </svg>
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-4 bg-black border border-red-800/40 rounded-2xl shadow-2xl px-10 py-8 z-50 transition-all duration-200 ${
                productOpen ? "block" : "hidden"
              }`}
              style={{ minWidth: "1050px" }}
            >
              <div className="grid grid-cols-3 gap-12 text-left items-start">
                {/* Suite */}
                <div>
                  <h4 className="font-bold text-lg text-red-400 mb-3 pl-1">Suite</h4>
                  <ul className="space-y-2">
                    <li><Link href="/phantomkey" className={navLinkClasses}>PhantomKey</Link></li>
                    <li><Link href="/honeypitch" className={navLinkClasses}>HoneyPitch</Link></li>
                    <li><Link href="/observer" className={navLinkClasses}>Observer</Link></li>
                    <li><Link href="/API" className={navLinkClasses}>API</Link></li>
                    <li><Link href="/Cloud" className={navLinkClasses}>Cloud</Link></li>
                    <li><Link href="/suite" className={navLinkClasses}>See All Tools</Link></li>
                  </ul>
                </div>
                {/* Ecosystem */}
                <div>
                  <h4 className="font-bold text-lg text-red-400 mb-3 pl-1">Ecosystems and integrations</h4>
                  <ul className="space-y-2">
                    <li><span className="font-medium text-neutral-200"></span></li>
                    <li><span className={navLinkClasses}>AWS, Azure</span></li>
                    <li><span className={navLinkClasses}>Splunk</span></li>
                    <li><span className={navLinkClasses}>QRadar</span></li>
                    <li><span className={navLinkClasses}>Windows</span></li>
                    <li><span className={navLinkClasses}>MAC OS</span></li>
                    <li><span className={navLinkClasses}>Linux</span></li>
                    <li><span className={navLinkClasses}>Kubernetes, Docker</span></li>
                    <li><span className={navLinkClasses}>SIEM</span></li>
                    <li><span className={navLinkClasses}>SOC Tools</span></li>
                  </ul>
                </div>
                {/* Why RedShrew */}
                <div>
                  <h4 className="font-bold text-lg text-red-400 mb-3 pl-1">Why RedShrew</h4>
                  <ul className="space-y-2">
                    <li><span className={navLinkClasses}>Deception-Driven Security</span></li>
                    <li><span className={navLinkClasses}>Rapid Threat Detection</span></li>
                    <li><span className={navLinkClasses}>Zero False Positives</span></li>
                    <li><span className={navLinkClasses}>Easy Deployment</span></li>
                    <li><span className={navLinkClasses}>No Impact on Users</span></li>
                    <li><span className={navLinkClasses}>Compliance Ready</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Link href="/solutions" className={navLinkClasses}>Solutions</Link>
          <Link href="/playbook" className={navLinkClasses}>Playbook</Link>
          <Link href="/suite" className={navLinkClasses}>Suite</Link>
          <Link href="/blog" className={navLinkClasses}>Blog</Link>
          <Link href="/contact" className={navLinkClasses}>Contact</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4 ml-12">
          <Link
            href="/demo"
            className="border border-red-900 text-neutral-200 hover:shrewombre2 hover:text-white transition-colors px-4 py-2 rounded-md text-sm font-medium"
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
            <Link href="/product" onClick={toggleMobileMenu} className="text-lg">Product</Link>
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
