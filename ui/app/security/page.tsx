'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';

export default function SecurityPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black text-neutral-100 overflow-hidden">
      {/* Radial gradient background from EasterEggPage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,0,0,0.12),_transparent)] z-0 pointer-events-none" />

      <div className="relative z-10 flex-1 max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-12">
        {/* Title */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-red-500">Security</h1>
          <p className="text-gray-400 text-md">Learn about RedShrew's security practices and policies.</p>
        </header>

        {/* Security sections */}
        <section className="space-y-6 text-neutral-300">
          <h2 className="text-2xl font-semibold text-white">1. Data Encryption</h2>
          <p>
            All data in transit and at rest is protected using industry-standard encryption protocols, including TLS 1.2+ and AES-256 encryption.
          </p>

          <h2 className="text-2xl font-semibold text-white">2. Access Controls</h2>
          <p>
            We enforce role-based access control (RBAC) and the principle of least privilege to ensure only authorized personnel can access sensitive systems.
          </p>

          <h2 className="text-2xl font-semibold text-white">3. Infrastructure Security</h2>
          <p>
            Our infrastructure is regularly audited, patched, and monitored. We follow CIS benchmarks and run continuous vulnerability scanning.
          </p>

          <h2 className="text-2xl font-semibold text-white">4. Compliance</h2>
          <p>
            We align with key compliance standards, such as SOC 2 Type II and GDPR, to maintain trust and legal adherence.
          </p>

          <h2 className="text-2xl font-semibold text-white">5. Incident Response</h2>
          <p>
            RedShrew maintains a robust incident response plan with regular drills, ensuring rapid detection, containment, and recovery from security incidents.
          </p>

          <h2 className="text-2xl font-semibold text-white">6. Reporting Issues</h2>
          <p>
            If you discover a security vulnerability or have concerns, please report it to{' '}
            <Link href="mailto:security@redshrew.com" className="text-red-400 hover:underline">
              security@redshrew.com
            </Link>.
          </p>
        </section>
      </div>

      {/* Footer pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </main>
  );
}
