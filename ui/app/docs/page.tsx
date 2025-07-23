'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function DocsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Glitchy background from EasterEggPage */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,0,0,0.12),_transparent)] z-0 pointer-events-none"
      />

      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-100 mb-4">
            Welcome to RedShrew Docs
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            Learn how to deploy deception-powered defenses across your systems using RedShrew&apos;s suite of tools.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/shrewdocs.png"
            alt="Documentation Hero"
            width={400}
            height={300}
            className="mx-auto lg:mx-0"
          />
        </div>
      </div>

      {/* Grid Sections */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Most Used SDKs */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-red-400">Most Used RedShrew SDKs</h2>
          <ul className="space-y-2">
            {['Next.js', 'Node.js', 'Python', 'Go'].map(sdk => (
              <li
                key={sdk}
                className="bg-zinc-900 px-4 py-2 rounded border border-zinc-800 text-white"
              >
                {sdk}
              </li>
            ))}
          </ul>
        </div>

        {/* All Tools */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-red-400">All Tools in the Suite</h2>
          <ul className="grid grid-cols-2 gap-2">
            {[
              'PhantomKey',
              'HoneyPitch',
              'Observer',
              'StatusPy',
              'Config Vault',
              'TrapTest',
              'FakeSSH',
              'API Shield',
            ].map(tool => (
              <li
                key={tool}
                className="bg-zinc-900 px-4 py-2 rounded border border-zinc-800 text-white text-sm"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-red-400">Get the Most out of RedShrew</h2>
          <ul className="space-y-2">
            {[
              'How RedShrew Traps Work',
              'Deployment Instructions',
              'Usage in Live Environments',
              'Privacy & Legal Info',
              'Support and Help Desk',
            ].map(link => (
              <li
                key={link}
                className="bg-zinc-900 px-4 py-2 rounded border border-zinc-800 text-white text-sm"
              >
                <Link href="#">{link}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </main>
  );
}