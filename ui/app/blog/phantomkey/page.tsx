export default function PhantomKeyPost() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans max-w-3xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold text-red-500">Launching PhantomKey: The Credential Trap Engine</h1>
      <p className="text-gray-400 text-sm">Posted June 24, 2025</p>
      <article className="space-y-6 text-gray-300 text-base leading-relaxed">
        <p>
          PhantomKey inserts high-fidelity decoy credentials into file systems, configuration directories, and repositories
          to bait adversaries into touching what they shouldn't. These credentials are unique per host and trigger custom alerts.
        </p>
        <p>
          Unlike traditional honeytokens, PhantomKey logs metadata about the environment, access time, user agent,
          and source IP. These interactions are relayed through Observer, our stealth logging daemon.
        </p>
        <p>
          PhantomKey is modular, deployable via CLI or API, and integrates with SIEM platforms.
          It’s not just bait — it’s a trap with teeth.
        </p>
      </article>
    </main>
  );
}
