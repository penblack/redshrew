'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';

export default function DemoHub() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-24 font-sans overflow-hidden">
      {/* Background Grid */}
      <svg className="absolute inset-0 z-0 pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
          </pattern>
          <filter id="distort">
            <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="turbulence">
              <animate attributeName="baseFrequency" dur="45s" values="0.008;0.009;0.008" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="12" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" filter="url(#distort)" opacity="0.2" />
      </svg>

      {/* Demo Hub Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        <header className="space-y-4">
          <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
            RedShrew Demo Hub
          </h1>
          <p className="text-gray-300 text-lg">
            Explore deception tools built to trap, trace, and analyze adversary behavior.
          </p>
        </header>

        {/* Demo Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <DemoLink href="/demo" title="PhantomKey" description="Fake SSH Key Trap" />
          <DemoLink href="/honey-pitch-demo" title="HoneyPitch" description="Login Portal Trap" />
          <DemoLink href="/platforms" title="Platforms" description="Integration Examples" />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </main>
  );
}

function DemoLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="block p-6 border border-red-600 rounded-lg bg-zinc-900 bg-opacity-70 hover:bg-red-600 hover:text-white transition"
    >
      <h2 className="text-2xl font-semibold mb-1 text-red-400">{title}</h2>
      <p className="text-gray-300 text-sm">{description}</p>
    </Link>
  );
}
