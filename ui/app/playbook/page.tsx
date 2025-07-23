'use client';

import { ShieldCheck, KeyRound, Eye } from 'lucide-react';
import Footer from "@/components/Footer";

export default function PlaybookPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Curved Wavy Grid Background */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 800"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gridline" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="rgba(231,20,35,1)" stopOpacity="0.2" />
            <stop offset="1" stopColor="rgba(231,20,35,1)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Horizontal waves */}
        {[...Array(16)].map((_, i) => (
          <path
            key={`h${i}`}
            d={`M 0 ${50 * i + 20} C 400 ${40 * i + 60}, 1040 ${60 * i + 10}, 1440 ${50 * i + 30}`}
            stroke="url(#gridline)"
            strokeWidth="1"
            fill="none"
          />
        ))}
        {/* Vertical waves */}
        {[...Array(13)].map((_, i) => (
          <path
            key={`v${i}`}
            d={`M ${120 * i} 0 C ${110 * i} 300, ${140 * i} 500, ${120 * i} 800`}
            stroke="url(#gridline)"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      {/* Top blur to fade grid into nav */}
      <div className="absolute inset-x-0 top-0 h-24 z-10 backdrop-blur-md pointer-events-none" />

      <div className="relative z-20 flex-1 max-w-6xl mx-auto px-6 py-24 space-y-20 pb-32">
        {/* Neon Title */}
        <header className="space-y-4 text-center">
          <h1 className="text-6xl font-extrabold text-neutral-100 tracking-wider ">
            Our Playbook
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our deception strategies are not passive defenses — they are dynamic countermeasures. This is how we deploy, monitor, and respond.
          </p>
        </header>

        {/* Core Tactics */}
        <section>
          <h2 className="text-3xl font-bold border-b border-red-900 pb-2 mb-6">Core Tactics</h2>
          <ul className="space-y-4 text-gray-300 text-base leading-relaxed">
            <li>
              <span className="text-red-800">▾</span> <strong className="text-white">Deceptive Planting:</strong> Synthetic SSH keys, credentials, and tokens strategically embedded in real environments.
            </li>
            <li>
              <span className="text-red-800">▾</span> <strong className="text-white">Real-Time Fingerprinting:</strong> Logs attacker metadata on contact — IP, device type, user-agent, and more.
            </li>
            <li>
              <span className="text-red-800">▾</span> <strong className="text-white">High-Fidelity Lures:</strong> Assets realistic enough to ensnare even advanced threat actors.
            </li>
          </ul>
        </section>

        {/* Deployment Toolkit */}
        <section>
          <h2 className="text-3xl font-bold border-b border-red-900 pb-2 mb-6">Deployment Toolkit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'PhantomKey',
                icon: <KeyRound size={28} className="text-red-700" />, 
                description: 'Credential traps that trigger alerts on use. Fast detection of internal or external compromise.',
              },
              {
                title: 'HoneyPitch',
                icon: <ShieldCheck size={28} className="text-red-700" />, 
                description: 'Decoy endpoints & login flows that simulate production logic. Used to trap scanners and log TTPs.',
              },
              {
                title: 'Observer',
                icon: <Eye size={28} className="text-red-700" />, 
                description: 'Tor-routed daemon that logs attacker behavior silently. Ultra low-noise, high-context monitoring.',
              },
            ].map(({ title, icon, description }) => (
              <div
                key={title}
                className="bg-zinc-900  rounded-xl p-6 shadow-md hover:shadow-red-500/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {icon}
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <p className="text-sm text-gray-300">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Behavioral Response */}
        <section>
          <h2 className="text-3xl font-bold border-b border-red-900 pb-2 mb-4">Behavioral Response</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            RedShrew doesn’t just alert — it <strong className="text-white">documents, adapts, and counters</strong>.
            Every breach attempt becomes a learning opportunity. Every log line is intel.
          </p>
        </section>
      </div>

      {/* Footer pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <Footer />
      </div>
    </main>
  );
}