'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black text-neutral-100 overflow-hidden">
      {/* Radial gradient background from EasterEggPage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,0,0,0.12),_transparent)] z-0 pointer-events-none" />

      <div className="relative z-10 flex-1 max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-12">
        {/* Title */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-red-500">Terms of Service</h1>
          <p className="text-gray-400 text-md">Last updated: July 23, 2025</p>
        </header>

        {/* Terms sections */}
        <section className="space-y-6 text-neutral-300">
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using RedShrew&apos;s services (the “Service”), you agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-red-400 hover:underline">Privacy Policy</Link>.
          </p>

          <h2 className="text-2xl font-semibold text-white">2. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. We will notify you of material changes by updating the “Last updated” date. Continued use of the Service constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-semibold text-white">3. License to Use</h2>
          <p>
            RedShrew grants you a limited, non-exclusive, non-transferable license to access and use the Service for your internal business purposes, subject to these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-white">4. User Obligations</h2>
          <p>
            You agree not to reverse engineer, decompile, or otherwise attempt to discover the source code of the Service. You must comply with all applicable laws and refrain from unauthorized use.
          </p>

          <h2 className="text-2xl font-semibold text-white">5. Intellectual Property</h2>
          <p>
            All content, trademarks, and data on the Service are the property of RedShrew or its licensors. No rights are granted other than as expressly provided in these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-white">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, RedShrew and its affiliates will not be liable for any indirect, incidental, or consequential damages arising out of or in connection with the Service.
          </p>

          <h2 className="text-2xl font-semibold text-white">7. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-semibold text-white">8. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <Link href="mailto:privacy@redshrew.com" className="text-red-400 hover:underline">
              privacy@redshrew.com
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
