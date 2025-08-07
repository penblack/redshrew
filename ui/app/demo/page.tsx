'use client';

import { useState } from 'react';
import Footer from "@/components/Footer";

export default function PhantomKeyDemo() {
  const [logVisible, setLogVisible] = useState(false);
  const [callbackShown, setCallbackShown] = useState(false);

  const handleUseKey = () => {
    alert('🔔 Alert triggered: Unauthorized access attempt logged.');
    setLogVisible(true);
    setTimeout(() => {
      setCallbackShown(true);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-24 font-sans overflow-hidden">
      {/* SVG Distorted Red Grid */}
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

      {/* PhantomKey content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold" style={{ color: "#e4757a" }}>
            PhantomKey Demo
          </h1>
          <p className="text-gray-300 text-lg">
            Pretend you&apos;re an attacker stumbling across a fake SSH key...
          </p>
        </header>

        {/* Fake file metadata */}
        <p className="italic text-gray-400">
          Found in <code className="text-red-400">/var/backups/id_rsa.bak</code> &mdash; last modified 3 days ago
        </p>

        {/* Fake SSH Key */}
        <pre className="bg-zinc-900 border border-red-600 p-4 rounded text-sm text-green-400 overflow-x-auto">
{`-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAADAQABAAABAQC7...
...R3UgZXZlbiByZWFkIHRoaXMuIEdvb2QgbG9jawogIAogICAK
-----END OPENSSH PRIVATE KEY-----`}
        </pre>

        {/* Interaction Button */}
        <button
          onClick={handleUseKey}
          className="mt-6 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition px-6 py-3 rounded text-white font-semibold"
        >
          Try to use this key
        </button>

        {/* Operator log view */}
        {logVisible && (
          <>
            <div className="mt-12 p-4 border border-red-500 bg-zinc-900 rounded text-sm text-gray-300">
              <p className="mb-2 text-red-400 font-mono">[OPERATOR VIEW]</p>
              <code className="block whitespace-pre">
{`[ALERT] Unauthorized access attempt to fake SSH key
IP: 192.168.13.42
User-Agent: curl/7.81.0
Timestamp: 2025-06-27 17:12:43`}
              </code>
            </div>

            {/* Tor Beacon */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping shadow-red-500" />
              <span className="text-sm text-red-400 font-mono">
                Sending beacon to Tor C2 node...
              </span>
            </div>
          </>
        )}

        {/* Callback payload */}
        {callbackShown && (
          <div className="mt-10 border border-red-600 rounded-lg p-6 bg-black text-sm text-red-400 space-y-3 font-mono">
            <div className="text-white font-bold text-lg">🔁 Tor Callback Detected</div>
            <div><span className="text-red-300">Time:</span> 2025-06-27 16:38:07 UTC</div>
            <div><span className="text-red-300">Route:</span> 3-hop Onion Relay</div>
            <div><span className="text-red-300">Beacon Fingerprint:</span> 9F:41:33:AD:CE:76:54:11:88</div>
            <div><span className="text-red-300">Payload:</span> /opt/.phantom/.trigger → decoded as &ldquo;id_rsa used on decoy.dev.red&rdquo;</div>
            <div><span className="text-red-300">Operator Note:</span> Engagement active. Adversary likely testing SSH key validity via automated script.</div>
          </div>
        )}
      </div>

      {/* Footer pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
