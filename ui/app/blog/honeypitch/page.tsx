import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DeceptionFuturePost() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans max-w-3xl mx-auto space-y-12">
      {/* ← Back to Blog Home */}
      <Link
        href="/blog"
        className="inline-flex items-center text-red-400 hover:text-red-300"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Blog Home
      </Link>
      <h1 className="text-4xl font-bold text-red-500">Deploying Honeypitch APIs in the Wild</h1>
      <p className="text-gray-400 text-sm">Posted June 12, 2025</p>
      <article className="space-y-6 text-gray-300 text-base leading-relaxed">
        <p>
          Honeypitch is our deployable deception suite that mimics production APIs and login flows.
          It looks real, it behaves real — but it exists only to bait, monitor, and learn.
        </p>
        <p>
          It includes prebuilt admin panels, fake GraphQL endpoints, and RESTful APIs that mirror the behavior
          of common stacks. Attackers fall into the illusion, and we log every move.
        </p>
        <p>
          Coupled with visual playback and signature detection, Honeypitch offers unmatched insight into automated recon
          and human-led exploitation attempts.
        </p>
      </article>
    </main>
  );
}
