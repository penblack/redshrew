'use client';

import { Mail, Bug, Flame } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans relative overflow-hidden">
      {/* Distorted Red Grid Background */}
      <svg
        className="absolute inset-0 pointer-events-none opacity-5"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
          </pattern>

          <filter id="distort">
            <feTurbulence baseFrequency="0.01" numOctaves="3" result="turbulence">
              <animate attributeName="baseFrequency" dur="30s" values="0.01;0.012;0.01" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="12" />
          </filter>

          <linearGradient id="fadeMask" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="15%" stopColor="black" stopOpacity="1" />
          </linearGradient>

          <mask id="fade">
            <rect width="100%" height="100%" fill="url(#fadeMask)" />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" filter="url(#distort)" mask="url(#fade)" />
      </svg>

      {/* Red Gradient Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.15),_transparent)] z-0" />

      {/* Floating Beacon */}
      <div className="absolute top-1/3 right-[12%] w-3 h-3 rounded-full bg-red-500 shadow-lg animate-ping z-10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
          Contact RedShrew
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Have a question? Want to collaborate? Spotted a vulnerability? We welcome all engagement — especially from the curious and the adversarial.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col gap-2 border border-red-500 rounded-xl px-6 py-8 bg-zinc-900 hover:shadow-red-500/20 transition">
            <Mail className="text-red-500 mx-auto" size={28} />
            <p className="text-white font-medium">General inquiries</p>
            <a href="mailto:ops@redshrew.com" className="text-red-400">ops@redshrew.com</a>
          </div>

          <div className="flex flex-col gap-2 border border-red-500 rounded-xl px-6 py-8 bg-zinc-900 hover:shadow-red-500/20 transition">
            <Bug className="text-red-500 mx-auto" size={28} />
            <p className="text-white font-medium">Vulnerability reports</p>
            <a href="mailto:security@redshrew.com" className="text-red-400">security@redshrew.com</a>
          </div>

          <div className="flex flex-col gap-2 border border-red-500 rounded-xl px-6 py-8 bg-zinc-900 hover:shadow-red-500/20 transition">
            <Flame className="text-red-500 mx-auto" size={28} />
            <p className="text-white font-medium">Incident response</p>
            <a href="mailto:threat@redshrew.com" className="text-red-400">threat@redshrew.com</a>
          </div>
        </div>

        <p className="text-gray-500 text-xs">
          No contact forms. No sales reps. Just secure channels. We read everything.
        </p>
      </div>
    </main>
  );
}
