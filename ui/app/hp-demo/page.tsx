'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';

export default function HoneyPitchDemo() {
  const [log, setLog] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get('username') as string;
    const password = form.get('password') as string;
    // Trigger alert and record log details
    alert(`🔔 Alert: Received fake login for ${username}`);
    const details = {
      endpoint: '/api/login',
      username,
      password,
      ip: '192.168.13.42',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      location: 'Unknown (requires GeoIP)',
      tool: 'Browser fetch',
    };
    setLog(JSON.stringify(details, null, 2));
  };

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-24 overflow-hidden font-sans">
      {/* Background grid */}
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
          <linearGradient id="fadeMask" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="fade">
            <rect width="100%" height="100%" fill="url(#fadeMask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" filter="url(#distort)" mask="url(#fade)" opacity="0.2" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">HoneyPitch Demo</h1>
          <p className="text-gray-300 text-lg">Interact with this fake login portal and see the intelligence we capture.</p>
        </header>

        {/* Demo layout: two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login Portal Card */}
          <div className="bg-zinc-900 bg-opacity-70 border border-red-600 rounded-lg p-6">
            <h2 className="text-xl text-red-400 mb-4">Fake Login Portal</h2>
            <form onSubmit={handleLogin} className="space-y-4 font-sans">
              <input type="text" name="username" placeholder="Username" required className="w-full p-2 bg-black border border-gray-700 rounded text-white" />
              <input type="password" name="password" placeholder="Password" required className="w-full p-2 bg-black border border-gray-700 rounded text-white" />
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition px-4 py-2 rounded text-white font-semibold">
                Log In
              </button>
            </form>
          </div>
          {/* Intelligence Capture Card */}
          <div className="bg-zinc-900 bg-opacity-70 border border-red-600 rounded-lg p-6 font-mono text-sm overflow-auto">
            <h2 className="text-xl text-red-400 mb-4">Captured Intelligence</h2>
            {!log ? (
              <p className="text-gray-400">No interactions yet. Try logging in.</p>
            ) : (
              <pre>{log}</pre>
            )}
          </div>
        </div>

        {/* Detailed Insights Section */}
        {log && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/** Parse JSON and display key details in individual cards **/}
            {Object.entries(JSON.parse(log)).map(([key, value]) => (
              <div key={key} className="bg-zinc-900 bg-opacity-70 border border-red-600 rounded-lg p-4 text-sm">
                <p className="text-red-400 font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-gray-300 break-words">{value as string}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
