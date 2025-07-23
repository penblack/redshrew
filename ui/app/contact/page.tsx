'use client';

import { Mail, Bug, Flame } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black text-white font-sans overflow-hidden px-4 sm:px-6 py-24">
      {/* Curved Grid Background with Glow */}
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
              <animate attributeName="baseFrequency" dur="45s" values="0.008;0.009;0.008" repeatCount="indefinite" />
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
          opacity="0.2"
        />
      </svg>

      {/* Smooth Red Gradient Glow */}
      <div className="absolute bottom-[-20vh] left-0 w-full h-[80vh] bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.15),_rgba(0,0,0,0))] z-0" />

      {/* Easter egg ping */}
      <Link href="/easter-egg">
        <div
          className="absolute top-[10%] right-[5%] w-4 h-4 rounded-full bg-red-600 shadow-md animate-ping z-50 cursor-pointer hover:scale-110 transition-transform"
          title="Don't click me..."
        />
      </Link>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-14">
        <h1 className="text-5xl sm:text-6xl font-bold text-shrewombre2">
          Want to Say Hello?
        </h1>

        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Have a question? Want to collaborate? Spotted a vulnerability? We welcome all engagement — especially from the curious and the adversarial.
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <ContactCard
            icon={<Mail className="text-red-500" size={28} />}
            title="General Inquiries"
            email="ops@redshrew.com"
          />
          <ContactCard
            icon={<Bug className="text-red-500" size={28} />}
            title="Vulnerability Reports"
            email="security@redshrew.com"
          />
          <ContactCard
            icon={<Flame className="text-red-500" size={28} />}
            title="Incident Response"
            email="threat@redshrew.com"
          />
        </div>

        <p className="text-gray-500 text-xs">
          No contact forms. No sales reps. Just secure channels. We read everything.
        </p>
      </div>

      {/* Footer pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </main>
  );
}

function ContactCard({ icon, title, email }: { icon: React.ReactNode; title: string; email: string }) {
  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg shadow-red-600/20 hover:shadow-red-500/40 hover:bg-zinc-800/60 transition-all duration-300 flex flex-col items-center gap-2">
      {icon}
      <p className="text-white font-medium text-sm">{title}</p>
      <a href={`mailto:${email}`} className="text-red-400 text-sm font-mono">
        {email}
      </a>
    </div>
  );
}
