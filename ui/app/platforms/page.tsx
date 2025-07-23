'use client';

import { useState } from 'react';
import Image from 'next/image';
import Footer from "@/components/Footer";

const codeExamples: Record<string, { cmd: string; init: string }> = {
  'Next.js': {
    cmd: 'npx @redshrew/wizard@latest -i next.js',
    init: `import * as RedShrew from '@redshrew/nextjs';

RedShrew.init({
  dsn: 'https://yourRedShrewKey@redshrew.com/ingest',
  deception: true,
  traps: ['ssh', 'api', 'browser'],
  alertSampleRate: 1.0
});`,
  },
  'Node.js': {
    cmd: 'npm install redshrew',
    init: `const RedShrew = require('redshrew');

RedShrew.init({
  dsn: 'https://yourRedShrewKey@redshrew.com/ingest',
  deception: true,
  traps: ['ssh', 'api']
});`,
  },
  Python: {
    cmd: 'pip install redshrew',
    init: `import redshrew

redshrew.init(
  dsn='https://yourRedshrewKey@redshrew.com/ingest',
  deception=True,
  traps=['ssh', 'api']
)`,
  },
  Docker: {
    cmd: 'docker run redshrew --dsn=https://yourRedShrewKey@redshrew.com/ingest --deception=1',
    init: `# Pull & run the RedShrew container
docker pull redshrew/latest
docker run redshrew --dsn=https://yourRedShrewKey@redshrew.com/ingest --deception=1`,
  },
  Linux: {
    cmd: 'curl -sSL https://redshrew.com/install.sh | bash -- --dsn https://yourRedShrewKey@redshrew.com/ingest',
    init: `# One-liner installer
curl -sSL https://redshrew.com/install.sh | bash -- --dsn https://yourRedShrewKey@redshrew.com/ingest`,
  },
};

export default function PlatformsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* --- Curved Wavy Grid SVG Background --- */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 800"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gridline" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="rgba(231,20,35,1)" stopOpacity="0.2" />
            <stop offset="1" stopColor="rgba(231,20,35,1)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Horizontal waves */}
        {[...Array(16)].map((_, i) => (
          <path
            key={`h${i}`}
            d={
              `M 0 ${50 * i + 20} C 400 ${40 * i + 60}, 1040 ${60 * i + 10}, 1440 ${50 * i + 30}`
            }
            stroke="url(#gridline)"
            strokeWidth="1"
            fill="none"
          />
        ))}
        {/* Vertical waves */}
        {[...Array(13)].map((_, i) => (
          <path
            key={`v${i}`}
            d={
              `M ${120 * i} 0 C ${110 * i} 300, ${140 * i} 500, ${120 * i} 800`
            }
            stroke="url(#gridline)"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      <div className="relative z-10 flex-1 max-w-5xl mx-auto px-4 pb-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          All RedShrew Platforms
        </h1>
        <p className="text-center text-neutral-400 mb-16">
          Pick your stack, drop in RedShrew, and start deceiving adversaries instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(codeExamples).map(([platform, { cmd, init }]) => (
            <div
              key={platform}
              className="bg-[#191418]/90 rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-4">{platform}</h2>

              <div className="flex items-center justify-between bg-[#000]/20 rounded-md px-4 py-2 mb-4 overflow-x-auto whitespace-nowrap">
                <code className="font-mono text-sm">{cmd}</code>
                <button
                  onClick={() => handleCopy(cmd)}
                  className="ml-3 shrink-0 p-1 hover:bg-neutral-800 rounded transition"
                  aria-label={`Copy ${platform} install command`}
                >
                  <Image src="/copy.svg" alt="Copy" width={20} height={20} />
                </button>
              </div>

              <div className="relative bg-[#000]/20 rounded-md p-4 mb-6 overflow-x-auto">
                <pre className="font-mono text-xs text-neutral-200 whitespace-pre-wrap">
                  <code>{init}</code>
                </pre>
                <button
                  onClick={() => handleCopy(init)}
                  className="absolute top-3 right-3 p-1 hover:bg-neutral-800 rounded transition"
                  aria-label={`Copy ${platform} init code`}
                >
                  <Image src="/copy.svg" alt="Copy" width={16} height={16} />
                </button>
              </div>

              <a
                href={`/docs/${platform.toLowerCase().replace('.', '')}`}
                className="mt-auto inline-block text-sm font-semibold text-[#e4757a] hover:underline"
              >
                Learn more →
              </a>

              {copied === cmd || copied === init ? (
                <div className="absolute bottom-4 right-4 bg-green-600 text-black px-3 py-1 rounded-full text-xs">
                  Copied!
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Footer pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
