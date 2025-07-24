"use client";

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const sections = [
    { id: 'scope-and-orders', label: 'Scope & Orders' },
    { id: 'use-of-the-service', label: 'Use of the Service' },
    { id: 'data-and-security', label: 'Data & Security' },
    { id: 'support', label: 'Support' },
    { id: 'fees-and-payment', label: 'Fees & Payment' },
    { id: 'termination', label: 'Termination' },
    { id: 'disclaimers-and-limitation', label: 'Disclaimers & Liability' },
    { id: 'indemnification', label: 'Indemnification' },
    { id: 'confidentiality', label: 'Confidentiality' },
    { id: 'general-provisions', label: 'General Provisions' },
  ];

  return (
    <main className="relative flex min-h-screen bg-black text-neutral-100 overflow-hidden scroll-smooth">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,0,0.12),transparent)] z-0 pointer-events-none" />

      {/* Centered Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex px-6 pt-24 pb-32 space-x-8">
        {/* TOC Card + Image */}
        <aside className="hidden lg:block w-96 flex-shrink-0 sticky top-24 self-start space-y-4">
          {/* Card */}
          <div className="bg-[#191418]/90 rounded-2xl p-6 shadow-lg">
            <nav>
              <h2 className="text-lg font-semibold text-[#e4757a] mb-4">On this page</h2>
              <ul className="space-y-2">
                {sections.map(sec => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="block whitespace-nowrap text-neutral-200 hover:text-white hover:bg-neutral-800 px-3 py-1 rounded-md transition"
                    >
                      {sec.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Standalone Image below the card */}
          <div className="w-96 mx-auto">
            <Image
              src="/readingshrew.png"
              alt="RedShrew reading a book"
              width={300}
              height={300}
              className="rounded-xl"
            />
          </div>
        </aside>

        {/* Content Card */}
        <div className="flex-1 bg-[#191418]/90 rounded-2xl p-8 shadow-lg space-y-12">
          {/* Header */}
          <header className="text-left space-y-4">
            <h1 className="text-4xl font-extrabold text-[#e4757a]">Terms of Service</h1>
            <p className="text-neutral-400 text-sm">Last updated on July 24, 2025</p>
          </header>

          {/* Sections */}
          <section id="scope-and-orders" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Scope & Orders</h2>
            <p>
              You may purchase subscriptions to the Service via online registration, order form, or other ordering
              document (each, an "Order"). This Agreement governs your use of the Service purchased in any Order.
              The Effective Date is the earlier of your first access or the date of your first Order. We may update this
              Agreement from time to time; updates take effect on renewal or a new Order, and continued use constitutes
              acceptance.
            </p>
          </section>

          <section id="use-of-the-service" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Use of the Service</h2>
            <p>
              Subject to compliance and payment of fees, we grant you a non-exclusive, non-transferable license to
              access and use the Service for your internal business purposes. Only authorized employees or contractors
              may use the Service. You may not resell, reverse-engineer, interfere with security, or use the Service to
              build a competing product.
            </p>
          </section>

          <section id="data-and-security" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Data &amp; Security</h2>
            <p>
              You control what data ("Service Data") you send into the Service and represent you have all necessary
              rights. We process and display your data to provide and improve the Service, and may aggregate
              anonymized data for analytics. Our Data Processing Addendum and Privacy Policy govern personal data,
              and we adhere to industry-standard security practices.
            </p>
          </section>

          <section id="support" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Support</h2>
            <p>
              Paid subscriptions include technical support via our online portal and email during business hours. Free
              plans receive community-based support via documentation.
            </p>
          </section>

          <section id="fees-and-payment" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Fees &amp; Payment</h2>
            <p>
              Fees are as set forth in your Order and due within 30 days of invoice. You are responsible for any
              applicable taxes. Subscriptions auto-renew unless canceled 30 days before term end; no pro-rata refunds.
              Payment by credit card authorizes recurring charges for subscription and overages.
            </p>
          </section>

          <section id="termination" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Termination</h2>
            <p>
              Either party may terminate for a material breach not cured within 30 days’ notice. Upon termination,
              your access ceases and your Service Data is deleted per our retention policy.
            </p>
          </section>

          <section id="disclaimers-and-limitation" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Disclaimers &amp; Liability</h2>
            <p>
              The Service is provided "AS IS" without warranty. Except for liability arising from death or personal
              injury, or your breach of use restrictions, our total liability is limited to amounts paid by you in the
              prior 12 months.
            </p>
          </section>

          <section id="indemnification" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Indemnification</h2>
            <p>
              You agree to defend and indemnify RedShrew against third-party claims arising from your Service Data or
              your violation of this Agreement.
            </p>
          </section>

          <section id="confidentiality" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Confidentiality</h2>
            <p>
              Each party will keep the other’s Confidential Information secure and only use it to perform under this
              Agreement. Confidential Information excludes public or independently developed information.
            </p>
          </section>

          <section id="general-provisions" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">General Provisions</h2>
            <ul className="list-disc list-inside ml-4 text-neutral-200">
              <li>Governing Law: California law, U.S.</li>
              <li>Dispute Resolution: San Francisco courts</li>
              <li>Force Majeure: Excusable delays for events beyond control</li>
              <li>Entire Agreement: Includes Business Associate Amendment, DPA, Privacy Policy</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <Footer />
      </div>
    </main>
  );
}
