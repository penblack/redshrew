"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import ContentCarousel from "@/components/ContentCarousel";
import Footer from "@/components/Footer";
import './globals.css';
import DecryptedText from "@/components/DecryptedText";


export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Next.js");
  const codeExamples: Record<string, string> = {
    "Next.js": `import * as RedShrew from '@redshrew/nextjs';\n\nRedShrew.init({\n  dsn: 'https://yourRedshrewKey@redshrew.com/ingest',\n  deception: true,\n  traps: [ 'ssh', 'api', 'browser' ],\n  alertSampleRate: 1.0\n});`,
    "Node.js": `const RedShrew = require('redshrew');\n\nRedShrew.init({\n  dsn: 'https://yourRedshrewKey@redshrew.com/ingest',\n  deception: true,\n  traps: ['ssh', 'api'],\n});`,
    "Python": `import redshrew\n\nredshrew.init(\n  dsn='https://yourRedshrewKey@redshrew.com/ingest',\n  deception=True,\n  traps=['ssh', 'api'],\n)`,
    "Docker": `docker run redshrew --dsn=https://yourRedshrewKey@redshrew.com/ingest --deception=1`,
    "Linux": `curl -sSL https://redshrew.com/install.sh | bash -s -- --dsn https://yourRedshrewKey@redshrew.com/ingest`
  };

  return (
    <main className="relative bg-black text-white overflow-x-hidden font-sans">

      {/* 🔴 RED GLOW CENTER BACKGROUND */}
      <motion.div
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: [0.6, 0.7, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[11%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.5)_0%,_transparent_65%)] blur-2xl" />
      </motion.div>

      {/* 🔳 CURVED GRID OVERLAY — HERO */}
      <svg
        className="absolute inset-0 z-0 pointer-events-none"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
          </pattern>
          <filter id="hero-distort">
            <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="turbulence">
              <animate attributeName="baseFrequency" dur="20s" values="0.008;0.009;0.008" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="12" />
          </filter>
          <linearGradient id="hero-fadeMask" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="hero-fade">
            <rect width="100%" height="100%" fill="url(#hero-fadeMask)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#hero-grid)"
          filter="url(#hero-distort)"
          mask="url(#hero-fade)"
          opacity="0.12"
        />
      </svg>

      {/* 🔻 PARTICLE CANVAS */}
      <canvas id="particles" className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20" />

      {/* 🔻 TOP BANNER CTA */}
      <div className="w-full text-center z-20 relative mt-3">
        <a
          href="https://discord.gg/redshrew"
          className="inline-block text-sm font-medium shrewombre text-white px-6 py-2 rounded-full shadow-md hover:bg-red-300 hover:text-white transition-colors"
        >
          Want to connect with the folks building RedShrew? Join us on Discord.
        </a>
      </div>

      <section className="relative z-40 flex flex-col justify-start items-center px-6 sm:px-12 lg:px-24 text-center min-h-[100vh] pt-[4vh]">
        <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold leading-tight text-white mb-4 drop-shadow-[0_0_30px_rgba(255,0,0,0.6)]">
          <DecryptedText
            text="Deception is Defense."
            speed={120}
            maxIterations={25}
            animateOn="view"
            revealDirection="end"
            className="text-white"
            encryptedClassName="text-white/60"
          />
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 italic max-w-xl mb-7">
          "All warfare is based on deception. — Sun Tzu"
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="/demo"
            className="inline-block bg-white text-black px-8 py-4 rounded-md text-lg font-semibold tracking-wide shadow-md transition-colors hover:bg-red-700 hover:text-white"
            style={{ transition: 'background 0.3s, color 0.3s' }}
          >
            Try PhantomKey for Free
          </a>
          <a
            href="/suite"
            className="inline-block border-2 border-red-500 text-white hover:bg-red-300 hover:text-black transition-colors px-8 py-4 rounded-md text-lg font-semibold tracking-wide shadow-md"
          >
            Explore the Suite
          </a>
        </div>

        {/* 🖥️ MONITOR UI IMAGE */}
        <div className="relative w-full max-w-[1150px] px-4 sm:px-12 -mt-25">
          <Image
            src="/monitor3.png"
            alt="RedShrew Suite Monitor UI"
            width={1400}
            height={900}
            className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(255,0,0,0.3)]"
            priority
          />
        </div>
      </section>

      {/*
        👇 BRANDS/LOGOS SECTION (commented out)
        <section className="w-full flex flex-col items-center justify-center mt-16 mb-4">
          ...logos grid with 3M, Airbnb, Airbus, Atlassian, Coinbase, EA, F1, FIFA,
          Husqvarna, NBA, Postmates, Square, Volkswagen, Yamaha, Anthropic, Binance, Uber, Palo Alto...
        </section>
      */}

      {/* SVG Ombre */}
      <section className="relative flex flex-col items-center justify-center w-full py-24 overflow-x-hidden" style={{ background: "transparent" }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1920 820"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
          style={{ filter: "blur(2.5px)" }}
        >
          <defs>
            <linearGradient id="redshrewOmbre" x1="0" y1="0" x2="0" y2="820" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1a0505" />
              <stop offset="60%" stopColor="#7e191a" />
              <stop offset="100%" stopColor="#e4757a" />
            </linearGradient>
          </defs>
          <polygon
            points="0,90 1920,0 1920,820 0,780"
            fill="url(#redshrewOmbre)"
            opacity="0.94"
          />
        </svg>

        <h2 className="z-10 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-20 text-center drop-shadow-[0_2px_10px_rgba(255,0,0,0.22)]">
          When an attack happens, respond faster with RedShrew
        </h2>

        <div className="grid grid-cols-3 grid-rows-2 gap-x-12 gap-y-10 items-center justify-center relative z-10">
          {/* Top Left Card */}
          <div className="inline-flex flex-col items-center border border-white rounded-xl p-3 bg-black/30">
            <img src="/chart1.svg" alt="Error Monitoring" className="h-24 w-auto" />
            <span className="text-white font-semibold text-lg mt-2">Deception-Driven Threat Detection</span>
          </div>

          {/* Centerpiece Card */}
          <div className="row-span-2 flex items-center justify-center">
            <div className="inline-flex flex-col items-center border-2 border-white rounded-2xl p-4 bg-black/30">
              <img
                src="/chart5.svg"
                alt="RedShrew Command Center"
                className="w-[340px] h-[240px] object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Top Right Card */}
          <div className="inline-flex flex-col items-center border border-white rounded-xl p-3 bg-black/30">
            <img src="/chart2.svg" alt="Tracing" className="h-24 w-auto" />
            <span className="text-white font-semibold text-lg mt-2">Attack Tracing</span>
          </div>

          {/* Bottom Left Card */}
          <div className="inline-flex flex-col items-center border border-white rounded-xl p-3 bg-black/30">
            <img src="/chart3.svg" alt="Session Replay" className="h-24 w-auto" />
            <span className="text-white font-semibold text-lg mt-2">Forensic Replay & Analysis</span>
          </div>

          {/* Bottom Right Card */}
          <div className="inline-flex flex-col items-center border border-white rounded-xl p-3 bg-black/30">
            <img src="/chart4.svg" alt="Code Coverage" className="h-24 w-auto" />
            <span className="text-white font-semibold text-lg mt-2">Coverage Analytics & Exposure Mapping</span>
          </div>
        </div>
      </section>

      {/* ─── Honeypot Traps Section ─────────────────────────────────────────── */}
      <section className="relative w-full py-24 flex flex-col items-center bg-black overflow-x-hidden">
        {/* 🔳 CURVED GRID OVERLAY — HONEYPOT */}
        <svg
          className="absolute inset-0 z-0 pointer-events-none"
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="honeypot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
            </pattern>
            <filter id="honeypot-distort">
              <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="turbulence">
                <animate attributeName="baseFrequency" dur="15s" values="0.008;0.009;0.008" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="12" />
            </filter>
            <linearGradient id="honeypot-fadeMask" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="20%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <mask id="honeypot-fade">
              <rect width="100%" height="100%" fill="url(#honeypot-fadeMask)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#honeypot-grid)"
            filter="url(#honeypot-distort)"
            mask="url(#honeypot-fade)"
            opacity="0.12"
          />
        </svg>

        <div className="relative z-10 max-w-6xl w-full mx-auto">
          {/* ─── Top Row: Honeypot Traps ─────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
            <div className="flex flex-col justify-center">
              <h5 className="text-xs uppercase text-[#e4757a] font-bold mb-2 tracking-wider">
                Deception-Driven Threat Detection
              </h5>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                Honeypot Traps
              </h2>
              <div className="flex flex-col gap-6 mb-8">
                <div className="rounded-xl bg-[#191418]/90 p-5 text-white font-semibold text-base shadow-lg">
                  <div className="mb-1 font-bold">Prioritize Real Threats</div>
                  <p className="text-xs text-neutral-300 mb-3">
                    Instantly surface attacker actions that matter most. Deceive, observe, and triage intrusions in real time, no more alert fatigue.
                  </p>
                  <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#7e191a] hover:bg-[#e4757a] shadow transition">
                    Read the docs
                  </button>
                </div>
                <div className="rounded-xl bg-[#403a3a] p-5 text-white font-semibold text-base shadow-lg">
                  <div className="mb-1 font-bold">Trace the Intruder</div>
                  <p className="text-xs text-neutral-300 mb-3">
                    Rewind every move made by adversaries. Follow their path from the first scan to their last attempt at lateral movement.
                  </p>
                  <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#191418]/90 hover:bg-[#7e191a] shadow transition">
                    Learn More
                  </button>
                </div>
                <div className="rounded-xl bg-[#4b2727]/90 p-5 text-white font-semibold text-base shadow-lg">
                  <div className="mb-1 font-bold">Automate Your Countermeasures</div>
                  <p className="text-xs text-neutral-300 mb-3">
                    Block, mislead, or monitor attackers on autopilot. Trigger custom responses, alerts, or forensics as soon as traps are touched.
                  </p>
                  <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#e4757a] hover:bg-[#7e191a] shadow transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src="/threatdetection.png"
                alt="Threat Detection"
                className="rounded-xl shadow-2xl border-2 border-[#e4757a]/30 w-full max-w-xl object-cover"
              />
            </div>
          </div>

          {/* ─── Bottom Row: Attack Tracing ──────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="relative flex items-center justify-center order-2 md:order-1">
              <img
                src="/attacktracing.png"
                alt="Attack Tracing"
                className="rounded-xl shadow-2xl border-2 border-[#e4757a]/30 w-full max-w-xl object-cover"
              />
            </div>
            <div className="flex flex-col justify-center order-1 md:order-2">
              <h5 className="text-xs uppercase text-[#e4757a] font-bold mb-2 tracking-wider">
                Attack Tracing
              </h5>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                Don't just observe.<br />Take action.
              </h2>
              <div className="flex flex-col gap-6 mb-8">
                <div className="rounded-xl bg-[#191418]/90 p-5 text-white font-semibold text-base shadow-lg">
                  <div className="mb-1 font-bold">Find &amp; Fix the Problem</div>
                  <p className="text-xs text-neutral-300 mb-3">
                    See the complete trace path from breach to bottleneck. Map attacker routes and service disruptions across your entire system.
                  </p>
                  <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#7e191a] hover:bg-[#e4757a] shadow transition">
                    Learn more
                  </button>
                </div>
                <div className="rounded-xl bg-[#403a3a] p-5 text-white font-semibold text-base shadow-lg">
                  <div className="mb-1 font-bold">Pinpoint Attacker Choke Points</div>
                  <p className="text-xs text-neutral-300 mb-3">
                    Identify network or system areas where attackers repeatedly fail or succeed. Use trace telemetry to dynamically reinforce weak points.
                  </p>
                  <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#191418] hover:bg-[#7e191a] shadow transition">
                    Learn more
                  </button>
                </div>
                <div className="rounded-xl bg-[#4b2727]/90 p-5 text-white font-semibold text-base shadow-lg">
                  <div className="mb-1 font-bold">Investigate Known Threat Patterns</div>
                  <p className="text-xs text-neutral-300 mb-3">
                    Detect repeating exploit attempts and adversary behavior using historical trace patterns. Optimize defenses based on real TTPs.
                  </p>
                  <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#e4757a] hover:bg-[#7e191a] shadow transition">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="relative z-10 w-full flex flex-col items-center py-24 bg-gradient-to-b from-black via-neutral-900 to-[#1a0505] overflow-hidden">
        <div className="relative z-10 max-w-2xl w-full text-center px-4">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-7">
            Deploy in Seconds
          </h2>
          <p className="text-neutral-200 text-lg mb-12">
            RedShrew works with every major platform and technology stack.<br />
            Drop RedShrew into your stack. Arm your systems with deception traps instantly.
          </p>

          {/* Platform Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
            <span className="font-semibold text-neutral-300">Choose your platform:</span>
            <select
              className="bg-neutral-900 border border-red-700 text-white rounded-md px-4 py-2 font-semibold"
              value={selectedPlatform}
              onChange={e => setSelectedPlatform(e.target.value)}
            >
              {Object.keys(codeExamples).map(platform => (
                <option value={platform} key={platform}>{platform}</option>
              ))}
            </select>
          </div>

          {/* One-liner + Copy */}
          <div className="bg-neutral-900 text-left rounded-xl shadow-lg p-4 mb-6 w-full overflow-x-auto">
            <div className="flex items-center justify-between min-w-[22rem] whitespace-nowrap">
              <span className="font-mono text-base text-white">
                {`npx @redshrew/wizard@latest -i ${selectedPlatform.toLowerCase()}`}
              </span>
              <button
                onClick={() => {
                  const cmd = `npx @redshrew/wizard@latest -i ${selectedPlatform.toLowerCase()}`;
                  navigator.clipboard.writeText(cmd);
                }}
                className="ml-3 p-2 hover:bg-neutral-800 rounded transition"
                aria-label="Copy to clipboard"
              >
                <img src="/copy.svg" alt="Copy" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-neutral-900 text-left rounded-xl shadow-lg p-4 mb-8 w-full overflow-x-auto">
            <pre className="text-sm text-neutral-200">
              <code>{codeExamples[selectedPlatform]}</code>
            </pre>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/get-started" className="bg-red-800 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-colors">
              CREATE REDSHREW ACCOUNT
            </a>
            <a href="/platforms" className="border-2 border-red-700 text-white hover:bg-red-700 hover:text-white px-8 py-3 rounded-full shadow text-lg font-bold transition-colors">
              SEE ALL PLATFORMS
            </a>
          </div>
        </div>
      </section>

      {/* 📨 Newsletter Signup Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 bg-black relative overflow-hidden">
        <svg
          className="absolute left-[10000%] top-[33%] md:left-[1270px] md:top-[50px] w-[140px] h-[140px] z-0"
          viewBox="0 0 140 140"
          fill="none"
          aria-hidden="true"
          style={{ filter: "blur(2.5px)" }}
        >
          <circle cx="70" cy="70" r="68" fill="#e4757a" fillOpacity="0.19" />
        </svg>
        <svg
          className="absolute right-[800px] bottom-10 w-[100px] h-[80px] z-0"
          viewBox="0 0 100 80"
          fill="none"
          aria-hidden="true"
          style={{ filter: "blur(1.5px)" }}
        >
          <polygon points="50,0 100,80 0,80" fill="#7e191a" fillOpacity="0.22" />
        </svg>
        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[180px] bg-red-900/30 rounded-full blur-3xl pointer-events-none z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-4xl mx-auto">
          <div className="text-white flex-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Get the Latest from RedShrew</h2>
            <p className="font-semibold mb-1">Sign up for exclusive deception ops, threat research, and product news.</p>
            <p className="text-neutral-300 mb-3 text-base">
              We don&apos;t spam. Just smart, monthly updates—maybe the occasional urgent threat alert, but never daily noise.
            </p>
          </div>
          <div className="flex-1 bg-neutral-900 border border-red-800/60 rounded-2xl shadow-xl px-8 py-7 flex flex-col gap-3 min-w-[320px] max-w-md">
            <label htmlFor="newsletter-email" className="font-semibold text-neutral-200 mb-1">Your Email:*</label>
            <input
              id="newsletter-email"
              type="email"
              required
              className="rounded-md px-4 py-2 bg-black text-white border border-red-700 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="you@email.com"
            />
            <label className="flex items-center gap-2 mt-2 text-neutral-300 text-sm">
              <input type="checkbox" className="accent-red-700" required />
              I want to receive monthly threat briefings and RedShrew updates. Unsubscribe anytime.
            </label>
            <p className="text-xs text-neutral-500 mt-2">
              By submitting, you agree to our <a href="https://policies.google.com/privacy" className="underline hover:text-red-400">privacy policy</a>.
            </p>
            <button
              type="button"
              className="mt-2 bg-neutral-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg shadow transition-colors"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </section>

      <ContentCarousel />

      <section className="relative w-full flex flex-col items-center justify-center pt-0 pb-20 bg-black overflow-hidden">
        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Outsmart Threats Before They Strike.
          </h2>
          <p className="text-lg text-neutral-300 mb-8">
            Deploy the only deception platform that empowers defenders to <span className="text-red-800 font-bold">catch, mislead, and study adversaries</span> without slowing down real operations.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a
              href="/demo"
              className="bg-neutral-300 hover:bg-red-700 hover:text-white text-black font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-colors"
            >
              TRY REDSHREW FOR FREE
            </a>
            <a
              href="/suite"
              className="border-2 border-red-900 text-white hover:bg-red-900 hover:text-white px-8 py-3 rounded-full shadow text-lg font-bold transition-colors"
            >
              EXPLORE OUR SUITE
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}