'use client';

import { KeyRound, Eye, ShieldCheck, ShieldAlert, Waypoints } from 'lucide-react';
import Footer from "@/components/Footer";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans relative overflow-hidden">
      {/* Optional grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        <header className="space-y-4 text-center">
          <h1 className="text-6xl font-extrabold text-red-500 tracking-wider drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
            RedShrew Solutions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            RedShrew builds deception-first security tooling to detect, delay, and demoralize adversaries.
            From high-fidelity honeypots to behavioral analytics, each tool is built to confuse, collect, and counter.
          </p>
        </header>

        {/* Solution Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'PhantomKey',
              icon: <KeyRound size={28} className="text-red-500" />,
              description:
                'Decoy credentials strategically planted across systems. Alerts on use, logs TTPs, and detects lateral movement attempts.',
            },
            {
              title: 'HoneyPitch',
              icon: <Waypoints size={28} className="text-red-500" />,
              description:
                'Deployable web/API honeypots. Simulates login portals, admin panels, or fake secrets to bait scanners and bots.',
            },
            {
              title: 'Observer',
              icon: <Eye size={28} className="text-red-500" />,
              description:
                'Stealthy logging layer that routes over Tor or secure tunnels. Records attacker metadata in real-time.',
            },
            {
              title: 'Perimeter Blur',
              icon: <ShieldCheck size={28} className="text-red-500" />,
              description:
                'Obfuscates infrastructure layout through dynamic port cloaking, honeynets, and rotating service exposure.',
            },
            {
              title: 'ShrewLogix AI',
              icon: <ShieldAlert size={28} className="text-red-500" />,
              description:
                'AI-powered deception analysis. Classifies interactions, ranks intent, and recommends real-time trap reinforcement.',
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
        </section>
      </div>
    </main>
  );
}
