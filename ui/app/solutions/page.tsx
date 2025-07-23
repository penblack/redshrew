'use client';

import { KeyRound, Eye, ShieldCheck, ShieldAlert, Waypoints } from 'lucide-react';
import Footer from '@/components/Footer';

const solutions = [
  {
    title: 'PhantomKey',
    icon: KeyRound,
    description:
      'Decoy credentials strategically planted across systems. Alerts on use, logs TTPs, and detects lateral movement attempts.',
  },
  {
    title: 'HoneyPitch',
    icon: Waypoints,
    description:
      'Deployable web/API honeypots. Simulates login portals, admin panels, or fake secrets to bait scanners and bots.',
  },
  {
    title: 'Observer',
    icon: Eye,
    description:
      'Stealthy logging layer that routes over Tor or secure tunnels. Records attacker metadata in real time.',
  },
  {
    title: 'Perimeter Blur',
    icon: ShieldCheck,
    description:
      'Obfuscates infrastructure layout through dynamic port cloaking, honeynets, and rotating service exposure.',
  },
  {
    title: 'ShrewLogix AI',
    icon: ShieldAlert,
    description:
      'AI-powered deception analysis. Classifies interactions, ranks intent, and recommends real-time trap reinforcement.',
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black text-white font-sans overflow-hidden">
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
              <animate attributeName="baseFrequency" dur="15s" values="0.008;0.009;0.008" repeatCount="indefinite" />
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

      {/* Content wrapper grows to push footer down */}
      <div className="relative z-10 flex-grow max-w-5xl mx-auto px-4 md:px-6 lg:px-0 pt-24 pb-16 space-y-12">
        <header className="text-center space-y-2">
          <span className="inline-block text-xs font-semibold uppercase text-red-500 tracking-wide">
            Deception‑Driven Solutions
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-[0_0_10px_rgba(198,23,23,0.8)]">
            RedShrew Solutions
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-300">
            RedShrew builds deception-first security tooling to detect, delay, and demoralize adversaries.
            From high-fidelity honeypots to behavioral analytics, each tool is built to confuse, collect, and counter.
          </p>
        </header>

        {/* Solutions grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {solutions.map(({ title, icon: Icon, description }) => (
            <div
              key={title}
              className="w-full max-w-xs bg-zinc-800/60 border border-red-600 rounded-2xl p-6 shadow-lg shadow-red-600/20 hover:shadow-red-500/40 hover:bg-zinc-700/60 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon size={28} className="text-red-500 drop-shadow-md" />
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Footer section */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Bottom wave gradient (behind footer, negative z) */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-red-900 to-transparent pointer-events-none z-[-1]" />
    </main>
  );
}