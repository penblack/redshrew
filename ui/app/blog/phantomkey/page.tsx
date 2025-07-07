'use client';

export default function PhantomKeyPost() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans max-w-3xl mx-auto space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">
          Launching PhantomKey: The Credential Trap Engine
        </h1>
        <p className="text-gray-400 text-sm">Posted June 24, 2025</p>
      </header>

      <article className="space-y-6 text-gray-300 text-base leading-relaxed">
        <p>
          <span className="font-semibold text-white">PhantomKey</span> inserts high-fidelity decoy credentials into file systems, configuration directories,
          and code repositories to bait adversaries into accessing what they <span className="italic">shouldn&apos;t</span>.
          Each decoy is unique to its host and triggers alerts on interaction.
        </p>

        <p>
          Unlike traditional honeytokens, PhantomKey captures rich metadata — including environment variables, access timestamps,
          user agents, and originating IP addresses. These events are transmitted via <span className="text-white font-semibold">Observer</span>,
          our covert logging daemon.
        </p>

        <p>
          PhantomKey is modular, lightweight, and deployable via both CLI and API. It integrates seamlessly with most modern SIEM platforms.
          It&apos;s not just bait — it&apos;s a trap with teeth.
        </p>
      </article>
    </main>
  );
}
