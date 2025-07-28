"use client";

import Link from 'next/link';
import Footer from '@/components/Footer';

export default function SecurityPage() {
  const sections = [
    { id: 'infrastructure-and-network-security', label: 'Infrastructure and Network Security' },
    { id: 'business-continuity-and-disaster-recovery', label: 'Business Continuity & Disaster Recovery' },
    { id: 'data-flow', label: 'Data Flow' },
    { id: 'data-security-and-privacy', label: 'Data Security & Privacy' },
    { id: 'application-security', label: 'Application Security' },
    { id: 'email-security', label: 'Email Security' },
    { id: 'audit-controls', label: 'Audit Controls' },
    { id: 'secure-application-development', label: 'Secure Application Development' },
    { id: 'corporate-security', label: 'Corporate Security' },
    { id: 'security-policies', label: 'Security Policies' },
    { id: 'background-checks', label: 'Background Checks & Training' },
    { id: 'vulnerability-disclosure', label: 'Vulnerability Disclosure' },
    { id: 'compliance-certifications', label: 'Compliance Certifications' },
    { id: 'data-privacy', label: 'Data Privacy' }
  ];

  return (
    <main className="relative flex min-h-screen bg-black text-white overflow-hidden scroll-smooth">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,0,0,0.12),transparent)] z-0 pointer-events-none" />

      {/* Centered Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex px-6 pt-24 pb-32 space-x-8">
        {/* TOC Card */}
        <aside className="hidden lg:block w-96 flex-shrink-0 sticky top-24 self-start">
          <div className="bg-[#191418]/90 rounded-2xl p-6 shadow-lg">
            <nav>
              <h2 className="text-lg font-semibold text-[#e4757a] mb-4">On this page</h2>
              <ul className="space-y-2">
                {sections.map((sec) => (
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
        </aside>

        {/* Content Card */}
        <div className="flex-1 bg-[#191418]/90 rounded-2xl p-8 shadow-lg space-y-12">
          {/* Header */}
          <header className="text-left space-y-4">
            <h1 className="text-4xl font-extrabold text-red-500">Security & Compliance</h1>
            <p className="text-neutral-400 text-sm">Last updated on July 24, 2025</p>
          </header>

          {/* Sections */}
          <section id="infrastructure-and-network-security" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Infrastructure and Network Security</h2>
            <h3 className="text-xl font-medium text-[#e4757a]">Physical Access Control</h3>
            <p>RedShrew is hosted on Google Cloud Platform, benefiting from Google&apos;s state-of-the-art data center security, including multi-factor electronic access controls, surveillance systems with 24/7 monitoring, perimeter fencing and biometric verification, and intrusion detection systems. RedShrew personnel have no physical access to Google&rsquo;s data centers.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Logical Access Control</h3>
            <p>RedShrew infrastructure access is restricted to authorized team members via secure two-factor authenticated VPNs. Server access requires unique private keys securely stored in encrypted storage.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Penetration Testing</h3>
            <p>RedShrew undergoes annual penetration testing by third-party security specialists. Testing is performed on isolated environments without exposing customer data. Vulnerability findings guide immediate remediation strategies, and penetration testing summaries are available upon customer request.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Third-Party Audit</h3>
            <p>RedShrew and Google Cloud Platform regularly participate in independent third-party audits, including SOC 2 (SSAE 18) and ISO 27001 certifications. Audit reports are available to customers upon request.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Intrusion Detection and Prevention</h3>
            <p>RedShrew leverages advanced IDS/IPS systems with both behavioral analysis and signature-based detection to continuously monitor and prevent threats. Our security team actively monitors alerts and swiftly addresses anomalous activity.</p>
          </section>

          <section id="business-continuity-and-disaster-recovery" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Business Continuity and Disaster Recovery</h2>
            <h3 className="text-xl font-medium text-[#e4757a]">High Availability</h3>
            <p>RedShrew&apos;s infrastructure is designed with redundancy to ensure continuous availability. Regular maintenance is performed seamlessly without impacting platform uptime.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Business Continuity</h3>
            <p>Encrypted hourly backups of all customer data are securely stored across multiple geographical regions. These backups facilitate rapid restoration in rare cases of primary data loss.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Disaster Recovery</h3>
            <p>In case of region-wide service disruptions, RedShrew rapidly activates a duplicate environment in an alternative geographical region on Google Cloud Platform. Our operations team is highly experienced in executing region-wide recovery plans.</p>
          </section>

          <section id="data-flow" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Data Flow</h2>
            <h3 className="text-xl font-medium text-[#e4757a]">Data into System</h3>
            <p>RedShrew&apos;s sensors securely transmit detection events via encrypted channels. We strongly encourage proactive scrubbing of sensitive data and offer customizable scrubbing tools within our SDKs, recommending filters for passwords and secret keys, credit card numbers, session cookies, and authentication headers.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Data through System</h3>
            <p>Data transmission to RedShrew occurs exclusively via encrypted HTTPS/TLS connections, and data remains AES-256 encrypted both in transit and at rest.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Data out of System</h3>
            <p>Event data is securely accessible via the RedShrew user interface and APIs. Integration with third-party security and workflow management tools adheres to stringent security standards.</p>
          </section>

          <section id="data-security-and-privacy" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Data Security and Privacy</h2>
            <h3 className="text-xl font-medium text-[#e4757a]">Data Encryption</h3>
            <p>All data stored in RedShrew’s systems is encrypted at rest using Google’s globally redundant Key Management Service. Encrypted data ensures robust security even in the unlikely event of physical breaches.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Data Retention</h3>
            <p>RedShrew retains customer event data by default for 90 days. Regular backups follow the same retention policies, and data beyond these periods is permanently deleted.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Data Removal</h3>
            <p>Upon subscription termination, customer data becomes inaccessible within 24 hours and is permanently deleted following the defined retention period. Customers can also request immediate data deletion via our support channels.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">PII Scrubbing</h3>
            <p>RedShrew recommends customers avoid sending personally identifiable information (PII). Our Data Scrubber service proactively removes suspected sensitive data. Users can further customize scrubbing options in their project settings.</p>
          </section>

          <section id="application-security" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Application Security</h2>
            <h3 className="text-xl font-medium text-[#e4757a]">Multi-Factor Authentication</h3>
            <p>RedShrew strongly encourages MFA usage, including security keys and TOTP apps, to enhance account security. User MFA status visibility helps customers manage internal security practices.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Single Sign-On (SSO) and SAML 2.0</h3>
            <p>RedShrew offers robust SSO and SAML 2.0 integrations, supporting streamlined authentication and automated account provisioning with providers like Azure Active Directory and Okta.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">REST API Authentication</h3>
            <p>All data stored in RedShrew&rsquo;s systems is encrypted at rest using Google&rsquo;s globally redundant Key Management Service. Encrypted data ensures robust security even in the unlikely event of physical breaches.</p>
          </section>

          <section id="email-security" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Email Security</h2>
            <p>RedShrew employs SPF, DMARC, and DNSSEC policies to mitigate email spoofing and phishing threats. Detailed records and configurations are transparently available.</p>
          </section>

          <section id="audit-controls" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Audit Controls</h2>
            <p>RedShrew provides detailed audit logs of user and administrative actions, including timestamps and IP addresses, ensuring full visibility for security compliance and incident management.</p>
          </section>

          <section id="secure-application-development" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Secure Application Development</h2>
            <p>RedShrew adheres to continuous delivery practices, including thorough automated testing, peer reviews, and rapid vulnerability remediation to minimize security risks.</p>
          </section>

          <section id="corporate-security" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Corporate Security</h2>
            <h3 className="text-xl font-medium text-[#e4757a]">Malware Protection</h3>
            <p>RedShrew utilizes advanced Endpoint Detection and Response (EDR) and Mobile Device Management (MDM) tools on company devices, enforcing stringent security policies.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Risk Management</h3>
            <p>Following NIST SP 800-30 guidelines, RedShrew proactively conducts regular security risk assessments and implements stringent risk management procedures.</p>
            <h3 className="text-xl font-medium text-[#e4757a]">Contingency Planning</h3>
            <p>RedShrew maintains comprehensive contingency plans, regularly updated and rigorously tested to ensure swift response and resolution in any disruptive scenarios.</p>
          </section>

          <section id="security-policies" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Security Policies</h2>
            <ul className="list-disc list-inside ml-4 text-neutral-200">
              <li>Access and Change Management</li>
              <li>Data Security and Incident Response</li>
              <li>Vendor and Vulnerability Management</li>
            </ul>
            <p>Detailed security policy documentation is available to enterprise customers upon request.</p>
          </section>

          <section id="background-checks" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Background Checks & Training</h2>
            <p>RedShrew performs extensive background checks for all employees, including identity verification, criminal record checks, and global watchlist screenings. Comprehensive security training is mandatory for all staff annually.</p>
          </section>

          <section id="vulnerability-disclosure" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Vulnerability Disclosure</h2>
            <p>RedShrew welcomes vulnerability reports at <Link href="mailto:security@redshrew.com" className="text-red-400 hover:underline">security@redshrew.com</Link>, actively validating and promptly addressing identified issues. Regular security advisories are publicly available.</p>
          </section>

          <section id="compliance-certifications" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Compliance Certifications</h2>
            <ul className="list-disc list-inside ml-4 text-neutral-200">
              <li>SOC2 Type I & II</li>
              <li>ISO 27001</li>
            </ul>
            <p>Reports and certificates are available upon request.</p>
          </section>

          <section id="data-privacy" className="space-y-4 text-neutral-200">
            <h2 className="text-2xl font-semibold text-white">Data Privacy</h2>
            <p>RedShrew adheres strictly to applicable data protection laws, offering a Data Processing Addendum detailing our privacy and compliance obligations.</p>
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
