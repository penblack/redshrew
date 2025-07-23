// pages/privacy-policy.tsx

import Link from "next/link";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 px-6 py-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-red-500">Privacy Policy</h1>
          <p className="text-gray-400 text-md">
            Last updated: July 22, 2025
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
          <p className="text-neutral-300">
            RedShrew (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy outlines the types of information we may collect, how we use it, and the steps we take to ensure it remains secure.
          </p>

          <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
          <ul className="list-disc pl-5 text-neutral-300 space-y-1">
            <li>Information you provide directly (e.g. email address, contact form submissions)</li>
            <li>Technical data (e.g. browser type, operating system, IP address)</li>
            <li>Usage data from our suite (e.g. telemetry, event logs, deception triggers)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-neutral-300 space-y-1">
            <li>To operate and improve RedShrew’s products and services</li>
            <li>To respond to inquiries and provide support</li>
            <li>To analyze usage trends and enhance user experience</li>
            <li>To detect and prevent unauthorized or malicious activity</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">4. Data Sharing</h2>
          <p className="text-neutral-300">
            We do not sell your data. We may share anonymized or aggregated data with trusted infrastructure providers and partners strictly for operational or legal reasons.
          </p>

          <h2 className="text-2xl font-semibold text-white">5. Cookies & Tracking</h2>
          <p className="text-neutral-300">
            Our platform may use cookies or similar technologies to store session data and track usage analytics. You can disable cookies in your browser settings, but some features may be limited.
          </p>

          <h2 className="text-2xl font-semibold text-white">6. Data Retention</h2>
          <p className="text-neutral-300">
            We retain user data only as long as necessary for legitimate operational or legal purposes. You may request deletion of your data at any time by contacting us.
          </p>

          <h2 className="text-2xl font-semibold text-white">7. Security</h2>
          <p className="text-neutral-300">
            We implement strong technical and procedural safeguards to protect your data, including encryption, role-based access control, and deception-based monitoring.
          </p>

          <h2 className="text-2xl font-semibold text-white">8. Your Rights</h2>
          <p className="text-neutral-300">
            Depending on your jurisdiction, you may have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>

          <h2 className="text-2xl font-semibold text-white">9. Contact Us</h2>
          <p className="text-neutral-300">
            If you have questions about this policy or your data, please email us at:{" "}
            <Link href="mailto:privacy@redshrew.com" className="text-red-400 hover:underline">
              privacy@redshrew.com
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
