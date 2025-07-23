'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from "@/components/Footer";
import { Flame, Sparkles, FileText, Shield } from 'lucide-react';

const posts = [
  {
    title: 'Launching PhantomKey: The Credential Trap Engine',
    icon: Flame,
    date: 'June 24, 2025',
    excerpt:
      'PhantomKey silently inserts fake SSH keys and passwords into attacker-accessible locations — triggering alerts when touched.',
    slug: 'phantomkey',
    image: '/phantomkey launch.png',
  },
  {
    title: 'Deploying Honeypitch APIs in the Wild',
    icon: Sparkles,
    date: 'June 12, 2025',
    excerpt:
      'We discuss how to design fake login portals and API endpoints that fool scanners and leak attacker methods.',
    slug: 'honeypitch',
    image: '/honeypitchapi.png',
  },
  {
    title: 'Why Deception is the Future of Threat Intel',
    icon: FileText,
    date: 'May 29, 2025',
    excerpt:
      'Static defenses fail silently. Deception introduces noise and opportunity — for defenders to observe, mislead, and dominate.',
    slug: 'deception-future',
    image: '/intel.png',
  },
  {
    title: 'Why RedShrew? The Power of Being Underestimated',
    icon: Shield,
    date: 'June 27, 2025',
    excerpt:
      'Inspired by the short-tailed shrew, our name represents tactical misdirection, offensive defense, and striking when least expected.',
    slug: 'why-redshrew',
    image: '/underestimated.png',
  },
];

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#191418]/90 text-white font-sans relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex-grow px-6 py-24 w-full max-w-7xl mx-auto">
        <header className="text-left space-y-4 mb-14">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-neutral-300">
            The Latest RedShrew News
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Tactical drops, threat analysis, and adversarial insights. We publish what others redact.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(({ title, icon: Icon, date, excerpt, slug, image }) => (
            <Link href={`/blog/${slug}`} key={slug}>
              <article className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow hover:shadow-red-500/30 transition-all">
                <div className="relative h-48 w-full">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-red-400 mb-1">
                    <Icon className="w-4 h-4" />
                    <span>{date}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-1 text-white">{title}</h2>
                  <p className="text-sm text-gray-400 line-clamp-3">{excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <Footer />
    </main>
  );
}
