'use client';

import Link from 'next/link';
import Footer from "@/components/Footer";
//import ShrewRunner from '@/components/shrewrunner';

export default function EasterEggPage() {
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono px-6 py-24 relative overflow-hidden">
      {/* Glitchy red grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,0,0,0.12),_transparent)] z-0 pointer-events-none" />

      {/* Terminal-like container */}
      <div className="relative z-10 max-w-3xl mx-auto bg-black border border-red-500 rounded-xl p-6 shadow-lg space-y-6">
        <h1 className="text-3xl sm:text-4xl text-red-500 font-bold drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]">
          RedShrew Underground
        </h1>

        <p className="text-green-400 leading-relaxed">
          Welcome, operator. You&apos;ve uncovered a hidden node within the RedShrew network.  
          This environment is used for staging experimental tools, decoys, and adversary-trap modules.
        </p>

        <div className="bg-zinc-900 border border-green-500 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
{`[ACCESS LOG: SUCCESS]
> identity: ???.dev.recon
> tunnel route: onion > relay > exit > honeypoint
> access flag: RED-SHREWD-01337

[TOOLS AVAILABLE]
• PhantomKey > ssh-honeydrop trigger module
• HoneyPitch > clipboard beacon injector
• SpecterMail > decoy MX + reply trap

Use responsibly... or don't.`}
        </div>

        <div className="bg-black border border-red-600 p-4 rounded-md">
          <h2 className="text-red-400 mb-2 text-lg font-semibold">~ Experimental Module: ShrewRunner</h2>
          <div className="flex justify-center items-center overflow-hidden max-w-full">
            <div className="w-full max-w-[800px] aspect-[8/3]">
              <iframe
                src="/shrew-runner/index.html"
                title="ShrewRunner Game"
                width="800"
                height="400"
                className="w-full h-full rounded-md border border-zinc-800"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </div>

        <Link href="/" className="inline-block mt-4 text-red-400 hover:text-white underline transition">
          ← Back to Surface
        </Link>
      </div>
    </main>
  );
}
