// app/platforms/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Footer from "@/components/Footer";

const codeExamples: Record<string, { cmd: string; init: string }> = {
  'Next.js': {
    cmd: 'npx @redshrew/wizard@latest -i next.js',
    init: `import * as RedShrew from '@redshrew/nextjs';

RedShrew.init({
  dsn: 'https://yourRedshrewKey@redshrew.com/ingest',
  deception: true,
  traps: ['ssh', 'api', 'browser'],
  alertSampleRate: 1.0
});`,
  },
  'Node.js': {
    cmd: 'npm install redshrew',
    init: `const RedShrew = require('redshrew');

RedShrew.init({
  dsn: 'https://yourRedshrewKey@redshrew.com/ingest',
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
    cmd: 'docker run redshrew --dsn=https://yourRedshrewKey@redshrew.com/ingest --deception=1',
    init: `# Pull & run the RedShrew container
docker pull redshrew/latest
docker run redshrew --dsn=https://yourRedshrewKey@redshrew.com/ingest --deception=1`,
  },
  Linux: {
    cmd: 'curl -sSL https://redshrew.com/install.sh | bash -- --dsn https://yourRedshrewKey@redshrew.com/ingest',
    init: `# One-liner installer
curl -sSL https://redshrew.com/install.sh | bash -- --dsn https://yourRedshrewKey@redshrew.com/ingest`,
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
    <main className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          All RedShrew Platforms
        </h1>
        <p className="text-center text-neutral-400 mb-16">
          Pick your stack, drop in RedShrew, and start deceiving adversaries instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(codeExamples).map(([platform, { cmd, init }]) => (
            <div key={platform} className="bg-[#191418]/90 rounded-2xl p-6 shadow-lg relative overflow-hidden">
              {/* Optional: You could swap in real platform icons here */}
              <h2 className="text-2xl font-bold mb-4">{platform}</h2>

              {/* Command + copy */}
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

              {/* Init snippet + copy */}
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
                className="inline-block mt-auto text-sm font-semibold text-[#e4757a] hover:underline"
              >
                Learn more &rarr;
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
    </main>
  );
}
