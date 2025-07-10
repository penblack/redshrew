"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import ContentCarousel from "@/components/ContentCarousel";


export default function Home() {
  // Expanding feature cards state
  const [open, setOpen] = useState<[boolean, boolean, boolean]>([true, false, false]);
  const handleToggle = (idx: number) => {
    setOpen(open.map((v, i) => (i === idx ? !v : false)) as [boolean, boolean, boolean]);
  };

  // Getting Started dropdown/code state
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
        className="absolute top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.5)_0%,_transparent_65%)] blur-2xl" />
      </motion.div>

      {/* 🔳 CURVED GRID OVERLAY */}
      <svg
        className="absolute inset-0 z-0 pointer-events-none"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
          </pattern>
          <filter id="distort">
            <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="turbulence">
              <animate attributeName="baseFrequency" dur="35s" values="0.008;0.009;0.008" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="12" />
          </filter>
          <linearGradient id="fadeMask" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="fade">
            <rect width="100%" height="100%" fill="url(#fadeMask)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          filter="url(#distort)"
          mask="url(#fade)"
          opacity="0.12"
        />
      </svg>

      {/* 🔻 PARTICLE CANVAS */}
      <canvas id="particles" className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20" />

      {/* 🔻 TOP BANNER CTA */}
      <div className="w-full text-center z-20 relative mt-18">
  <a
    href="https://discord.gg/redshrew"
    className="
      inline-block text-sm font-medium
      shrewombre text-white px-6 py-2 rounded-full shadow-md
      hover:bg-red-300 hover:text-white
      transition-colors
    "
  >
    Want to connect with the folks building RedShrew? Join us on Discord.
  </a>
</div>


      <section className="relative z-10 flex flex-col justify-start items-center px-6 sm:px-12 lg:px-24 text-center min-h-[100vh] pt-[4vh]">
        <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extrabold leading-tight text-white mb-4 drop-shadow-[0_0_30px_rgba(255,0,0,0.6)]">
          Deception is defense.
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 italic max-w-xl mb-7">
          “All warfare is based on deception. — Sun Tzu”
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="/demo"
            className="inline-block bg-white text-black hover:bg-neutral-200 transition-colors px-8 py-4 rounded-md text-lg font-semibold tracking-wide shadow-md"
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
        <div className="relative w-full max-w-[1100px] px-4 sm:px-12 -mt-25">
          <Image
            src="/monitor.png"
            alt="RedShrew Suite Monitor UI"
            width={1400}
            height={900}
            className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(255,0,0,0.3)]"
            priority
          />
        </div>
      </section>

      {/* 👇 BRANDS/LOGOS SECTION */}
<section className="w-full flex flex-col items-center justify-center mt-16 mb-4">
  <h2 className="text-neutral-100 text-xl sm:text-2xl mb-7 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(255,0,0,0.13)]">
    100+ GROWING TEAMS USE REDSHREW TO DECEIVE AND DEFEND
  </h2>
  <div className="bg-black/40 backdrop-blur-md rounded-xl border border-red-800/30 shadow-lg px-4 py-6 max-w-6xl w-full">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-8 items-center justify-center">
      <div className="flex justify-center">
        <img src="/logos/3m.svg" alt="3M" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/airbnb.svg" alt="Airbnb" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/airbus.svg" alt="Airbus" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/atlassian.svg" alt="Atlassian" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/coinbase.svg" alt="Coinbase" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/ea.svg" alt="EA" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/f1.svg" alt="F1" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/fifa.svg" alt="Fifa" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/husqvarna.svg" alt="Husqvarna" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/nba.svg" alt="NBA" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/postmates.svg" alt="Postmates" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/square.svg" alt="Square" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/volkswagen.svg" alt="Volkswagen" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
      <div className="flex justify-center">
        <img src="/logos/yamahamotorcorporation.svg" alt="Yamaha Motor Corporation" width={110} height={48}
          className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
          style={{ filter: "invert(1) brightness(2)" }} />
      </div>
    </div>
  </div>
</section>

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






<section className="relative w-full py-24 flex flex-col items-center bg-black overflow-x-hidden">
  {/* Wavy Red Grid Background */}
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    viewBox="0 0 1920 820"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="redGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
      </pattern>
      <filter id="distort">
        <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="turbulence">
          <animate attributeName="baseFrequency" dur="30s" values="0.008;0.009;0.008" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="18" />
      </filter>
      <linearGradient id="fadeGrid" gradientTransform="rotate(90)">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="20%" stopColor="white" stopOpacity="1" />
      </linearGradient>
      <mask id="maskGrid">
        <rect width="100%" height="100%" fill="url(#fadeGrid)" />
      </mask>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill="url(#redGrid)"
      filter="url(#distort)"
      mask="url(#maskGrid)"
      opacity="0.14"
    />
  </svg>

  <div className="relative z-10 max-w-6xl w-full mx-auto">
    {/* Top Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
      {/* Error Monitoring (Left) */}
      <div className="flex flex-col justify-center">
        <h5 className="text-xs uppercase text-[#e4757a] font-bold mb-2 tracking-wider">Deception-Driven Threat Detection</h5>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Honeypot Traps</h2>
        <div className="flex flex-col gap-3 mb-8">
          <div className="rounded-xl border-2 border-[#e4757a] bg-[#191418]/90 p-5 text-white font-semibold text-base shadow-lg">
            <div className="mb-1 text-white font-bold">Prioritize Real Threats</div>
            <div className="text-xs text-neutral-300 mb-2">Instantly surface attacker actions that matter most. Deceive, observe, and triage intrusions in real time, no more alert fatigue.</div>
            <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#e4757a] hover:bg-[#7e191a] shadow transition">
              Read the docs
            </button>
          </div>
          <button className="rounded-lg bg-[#7e191a] hover:bg-[#e4757a] px-6 py-3 text-white font-semibold transition border border-[#e4757a]/60">
            Trace the Intruder
            <div className="text-xs text-neutral-300 mb-2">Rewind every move made by adversaries. Follow their path from the first scan to their last attempt at lateral movement.</div>
            <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#e4757a] hover:bg-[#7e191a] shadow transition">
              Learn More
              </button>
          </button>
          <button className="rounded-lg bg-[#191418]/80 hover:bg-[#1a0505] px-6 py-3 text-white font-semibold transition border border-[#e4757a]/40">
            Automate Your Countermeasures
            <div className="text-xs text-neutral-300 mb-2">Block, mislead, or monitor attackers on autopilot. Trigger custom responses, alerts, or forensics as soon as traps are touched.</div>
            <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#e4757a] hover:bg-[#7e191a] shadow transition">
              Learn More
              </button>
          </button>
        </div>
      </div>
      {/* Screenshot Right */}
      <div className="relative flex items-center justify-center">
        <img
          src="/threatdetection.png"
          alt="Threat Detection"
          className="rounded-xl shadow-2xl border-2 border-[#e4757a]/30 w-full max-w-xl"
        />
        {/* Optionally add mascot, e.g.: */}
        {/* <img src="/mascots/arrow.svg" alt="" className="absolute left-16 bottom-0 w-20 pointer-events-none" /> */}
      </div>
    </div>

    {/* Bottom Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      {/* Screenshot Left */}
      <div className="relative flex items-center justify-center order-2 md:order-1">
        <img
          src="/attacktracing.png"
          alt="Attack Tracing"
          className="rounded-xl shadow-2xl border-2 border-[#e4757a]/30 w-full max-w-xl"
        />
      </div>
      {/* Tracing (Right) */}
      <div className="flex flex-col justify-center order-1 md:order-2">
        <h5 className="text-xs uppercase text-[#e4757a] font-bold mb-2 tracking-wider">Attack Tracing</h5>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Don’t just observe.<br />Take action.</h2>
        <div className="flex flex-col gap-3 mb-8">
          <div className="rounded-xl border-2 border-[#e4757a] bg-[#191418]/90 p-5 text-white font-semibold text-base shadow-lg">
            <div className="mb-1 text-white font-bold">Find and fix the problem, no matter where it occurs</div>
            <div className="text-xs text-neutral-300 mb-2">
              With Tracing, see the complete end-to-end path that data takes through your distributed system to pinpoint the exact origin of an issue.
            </div>
            <button className="inline-block rounded-full px-4 py-1 text-xs font-bold text-white bg-[#e4757a] hover:bg-[#7e191a] shadow transition">
              Learn more
            </button>
          </div>
          <button className="rounded-lg bg-[#7e191a] hover:bg-[#e4757a] px-6 py-3 text-white font-semibold transition border border-[#e4757a]/60">
            Solve slow, fast
          </button>
          <button className="rounded-lg bg-[#191418]/80 hover:bg-[#1a0505] px-6 py-3 text-white font-semibold transition border border-[#e4757a]/40">
            Investigate known problems
          </button>
        </div>
      </div>
    </div>
  </div>
</section>





      {/* Getting Started Section */}
      <section className="relative z-10 w-full flex flex-col items-center py-24 bg-gradient-to-b from-black via-neutral-900 to-[#1a0505] overflow-x-hidden">
        <div className="relative z-10 max-w-2xl w-full text-center px-4">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-7">
            Getting Started is Simple
          </h2>
          <p className="text-neutral-200 text-lg mb-12">
            RedShrew works with every major platform and technology stack.<br />
            Start catching adversaries with just a few lines of code.
          </p>
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
          <div className="bg-neutral-900 text-left rounded-xl shadow-lg p-4 mb-6 w-full flex items-center justify-between">
            <span className="font-mono text-base text-white select-all">
              npx @redshrew/wizard@latest -i {selectedPlatform.toLowerCase()}
            </span>
            <button className="ml-3 text-red-400 hover:text-white">📋</button>
          </div>
          <div className="bg-neutral-900 text-left rounded-xl shadow-lg p-4 mb-8 w-full overflow-x-auto">
            <pre className="text-sm text-neutral-200">
              <code>{codeExamples[selectedPlatform]}</code>
            </pre>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/signup" className="bg-red-700 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg">
              CREATE REDSHREW ACCOUNT
            </a>
            <a href="/docs" className="border-2 border-red-500 text-white hover:bg-red-700 hover:text-white px-8 py-3 rounded-full shadow text-lg font-bold">
              SEE ALL PLATFORMS
            </a>
          </div>
        </div>
      </section>




{/* 📨 Newsletter Signup Section */}
<section className="w-full flex flex-col items-center justify-center py-24 bg-black relative overflow-hidden">
  {/* SVG Accent: Blurred Circle */}
  <svg
    className="absolute left-[10000%] top-[33%] md:left-[1270px] md:top-[50px] w-[140px] h-[140px] z-0"
    viewBox="0 0 140 140"
    fill="none"
    aria-hidden="true"
    style={{ filter: "blur(2.5px)" }}
  >
    <circle cx="70" cy="70" r="68" fill="#e4757a" fillOpacity="0.19" />
  </svg>
  {/* SVG Accent: Triangle */}
  <svg
    className="absolute right-[800px] bottom-10 w-[100px] h-[80px] z-0"
    viewBox="0 0 100 80"
    fill="none"
    aria-hidden="true"
    style={{ filter: "blur(1.5px)" }}
  >
    <polygon points="50,0 100,80 0,80" fill="#7e191a" fillOpacity="0.22" />
  </svg>

  {/* Optional accent (blurred circle or glitch, for cyber vibe) */}
  <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[180px] bg-red-900/30 rounded-full blur-3xl pointer-events-none z-0"></div>

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-4xl mx-auto">
    {/* Left: Text */}
    <div className="text-white flex-1">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Get the Latest from RedShrew</h2>
      <p className="font-semibold mb-1">Sign up for exclusive deception ops, threat research, and product news.</p>
      <p className="text-neutral-300 mb-3 text-base">
        We don’t spam. Just smart, monthly updates—maybe the occasional urgent threat alert, but never daily noise.
      </p>
    </div>
    {/* Right: Signup form */}
    <form className="flex-1 bg-neutral-900 border border-red-800/60 rounded-2xl shadow-xl px-8 py-7 flex flex-col gap-3 min-w-[320px] max-w-md">
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
        By submitting, you agree to our <a href="/privacy" className="underline hover:text-red-400">privacy policy</a>.
      </p>
      <button
        type="submit"
        className="mt-2 bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow transition-colors"
      >
        SIGN UP
      </button>
    </form>
  </div>
</section>


<ContentCarousel />



<section className="w-full flex flex-col items-center justify-center py-20 bg-black relative overflow-hidden">
  {/* 🔴 Red bottom glow */}
  <div
    className="absolute left-1/2 bottom-0 -translate-x-1/2 z-0 pointer-events-none"
    style={{
      width: "120vw",
      height: "300px",
      background: "radial-gradient(ellipse at center, rgba(255,0,0,0.44) 0%, transparent 80%)",
      filter: "blur(32px) brightness(1.2)",
    }}
  />
  <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto text-center px-4">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
      Fix it, don’t just observe it.
    </h2>
    <p className="text-lg text-neutral-300 mb-8">
      Deploy the only deception platform that empowers defenders to <span className="text-red-500 font-bold">catch, mislead, and study adversaries</span> without slowing down real operations.
    </p>
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <a
        href="/demo"
        className="bg-red-700 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-colors"
      >
        TRY REDSHREW FOR FREE
      </a>
      <a
        href="/suite"
        className="border-2 border-red-500 text-white hover:bg-red-700 hover:text-white px-8 py-3 rounded-full shadow text-lg font-bold transition-colors"
      >
        EXPLORE OUR SUITE
      </a>
    </div>
  </div>
</section>





      {/* Footer */}
      <footer className="py-12 px-6 text-center text-neutral-500 text-sm">
        &copy; {new Date().getFullYear()} RedShrew. All rights reserved.
      </footer>
    </main>
  );
}
