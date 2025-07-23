'use client';

import { ShieldCheck, KeyRound, Eye } from 'lucide-react';
import Footer from "@/components/Footer";

export default function PlaybookPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans relative overflow-hidden">
      {/* Optional Red Grid Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {/* Neon Title */}
        <header className="space-y-4 text-center">
          <h1 className="text-6xl font-extrabold text-red-500 tracking-wider drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
            REDSHREW PLAYBOOK
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Our deception strategies are not passive defenses — they are dynamic countermeasures. This is how we deploy, monitor, and respond.
          </p>
        </header>

        {/* Core Tactics */}
        <section>
          <h2 className="text-3xl font-bold border-b border-red-500 pb-2 mb-6">Core Tactics</h2>
          <ul className="space-y-4 text-gray-300 text-base leading-relaxed">
            <li>
              <span className="text-red-500">▾</span> <strong className="text-white">Deceptive Planting:</strong> Synthetic SSH keys, credentials, and tokens strategically embedded in real environments.
            </li>
            <li>
              <span className="text-red-500">▾</span> <strong className="text-white">Real-Time Fingerprinting:</strong> Logs attacker metadata on contact — IP, device type, user-agent, and more.
            </li>
            <li>
              <span className="text-red-500">▾</span> <strong className="text-white">High-Fidelity Lures:</strong> Assets realistic enough to ensnare even advanced threat actors.
            </li>
          </ul>
        </section>

        {/* Toolkit */}
        <section>
          <h2 className="text-3xl font-bold border-b border-red-500 pb-2 mb-6">Deployment Toolkit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'PhantomKey',
                icon: <KeyRound size={28} className="text-red-500" />,
                description:
                  'Credential traps that trigger alerts on use. Fast detection of internal or external compromise.',
              },
              {
                title: 'HoneyPitch',
                icon: <ShieldCheck size={28} className="text-red-500" />,
                description:
                  'Decoy endpoints & login flows that simulate production logic. Used to trap scanners and log TTPs.',
              },
              {
                title: 'Observer',
                icon: <Eye size={28} className="text-red-500" />,
                description:
                  'Tor-routed daemon that logs attacker behavior silently. Ultra low-noise, high-context monitoring.',
              },
            ].map(({ title, icon, description }) => (
              <div
                key={title}
                className="bg-zinc-900 border border-red-500 rounded-xl p-6 shadow-md hover:shadow-red-500/20 transition-all"
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

        {/* Response Philosophy */}
        <section>
          <h2 className="text-3xl font-bold border-b border-red-500 pb-2 mb-4">Behavioral Response</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            RedShrew doesn’t just alert — it <strong className="text-white">documents, adapts, and counters</strong>.
            Every breach attempt becomes a learning opportunity. Every log line is intel.
          </p>
        </section>
      </div>
    </main>
  );
}
