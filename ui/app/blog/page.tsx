'use client';

import Link from 'next/link';
import { FileText, Sparkles, Flame, Shield } from 'lucide-react';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans relative overflow-hidden">
      {/* Optional red grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-20">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-extrabold text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
            RedShrew Blog
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tactical drops, threat analysis, and adversarial insights. We publish what others redact.
          </p>
        </header>

        {/* Posts */}
        <section className="space-y-8">
          {[
            {
              title: 'Launching PhantomKey: The Credential Trap Engine',
              icon: <Flame size={22} className="text-red-500" />,
              date: 'June 24, 2025',
              excerpt:
                'PhantomKey silently inserts fake SSH keys and passwords into attacker-accessible locations — triggering alerts when touched.',
              slug: 'phantomkey',
            },
            {
              title: 'Deploying Honeypitch APIs in the Wild',
              icon: <Sparkles size={22} className="text-red-500" />,
              date: 'June 12, 2025',
              excerpt:
                'We discuss how to design fake login portals and API endpoints that fool scanners and leak attacker methods.',
              slug: 'honeypitch',
            },
            {
              title: 'Why Deception is the Future of Threat Intel',
              icon: <FileText size={22} className="text-red-500" />,
              date: 'May 29, 2025',
              excerpt:
                'Static defenses fail silently. Deception introduces noise and opportunity — for defenders to observe, mislead, and dominate.',
              slug: 'deception-future',
            },
            {
              title: 'Why RedShrew? The Power of Being Underestimated',
              icon: <Shield size={22} className="text-red-500" />,
              date: 'June 27, 2025',
              excerpt:
                'Inspired by the short-tailed shrew, our name represents tactical misdirection, offensive defense, and striking when least expected.',
              slug: 'why-redshrew',
            },
          ].map(({ title, icon, date, excerpt, slug }) => (
            <Link href={`/blog/${slug}`} key={slug}>
              <article className="bg-zinc-900 border border-red-500 p-6 rounded-xl hover:shadow-red-500/20 hover:bg-zinc-800 transition-all">
                <div className="flex items-center gap-3 mb-2 text-sm text-gray-400">
                  {icon}
                  <span>{date}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                <p className="text-sm text-gray-300">{excerpt}</p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
