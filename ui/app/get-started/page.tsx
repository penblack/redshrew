"use client";
import Footer from "@/components/Footer";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* --- HERO SECTION --- */}
      <section
        className="relative w-full"
        style={{
          background: "linear-gradient(150deg, #170608 60%, #75131e 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)",
        }}
      >
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-5 px-8 min-h-[75vh]">
  {/* LEFT: Hero Text + Logos */}
  <div className="flex flex-col items-start justify-center py-16">
    <h1 className="text-5xl font-extrabold mb-4">Start defending today</h1>
    <p className="text-lg text-neutral-200 mb-7 max-w-lg">
      RedShrew helps defenders and teams instantly detect real threats using next-gen deception, so you can catch attackers before they strike. Get started in seconds.
    </p>
    <div className="text-xlg text-neutral-300 mb-2 font-semibold tracking-wider">
      THESE FOLKS GET IT:
    </div>
            <div className="flex gap-8 flex-wrap items-center mb-2">
              <img src="/logos/3m.svg" alt="3M" className="h-10 filter invert brightness-200" />
              <img src="/logos/airbnb.svg" alt="Airbnb" className="h-10 filter invert brightness-200" />
              <img src="/logos/volkswagen.svg" alt="Volkswagen" className="h-10 filter invert brightness-200" />
              <img src="/logos/anthropic.svg" alt="Anthropic" className="h-10 filter invert brightness-200" />
              <img src="/logos/ea.svg" alt="EA" className="h-10 filter invert brightness-200" />
            </div>
          </div>
          {/* RIGHT: Signup Form */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-full max-w-lg bg-[#0c070a] bg-opacity-95 border border-red-500 rounded-2xl shadow-2xl p-10">
              <h2 className="text-2xl font-extrabold mb-7 text-center">Get Started with RedShrew</h2>
              <form className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">Name*</label>
                    <input className="w-full bg-neutral-900 border border-red-500 rounded-md px-4 py-2 text-white" placeholder="Your Name" required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">Organization*</label>
                    <input className="w-full bg-neutral-900 border border-red-600 rounded-md px-4 py-2 text-white" placeholder="Organization" required />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">Email*</label>
                    <input type="email" className="w-full bg-neutral-900 border border-red-600 rounded-md px-4 py-2 text-white" placeholder="you@company.com" required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">Password*</label>
                    <input type="password" className="w-full bg-neutral-900 border border-red-600 rounded-md px-4 py-2 text-white" placeholder="Password (8+ characters)" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Data Storage Location*</label>
                  <select className="w-full bg-neutral-900 border border-red-600 rounded-md px-4 py-2 text-white" required>
                    <option value="">Select a location</option>
                    <option value="us">US</option>
                    <option value="eu">EU</option>
                    <option value="asia">Asia</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="inline-flex items-center text-sm text-neutral-200 gap-2">
                    <input type="checkbox" className="accent-red-700 rounded-sm" />
                    I want to receive monthly threat briefings.
                  </label>
                  <label className="inline-flex items-center text-sm text-neutral-200 gap-2">
                    <input type="checkbox" className="accent-red-700 rounded-sm" required />
                    I agree to the <a href="/privacy" className="underline hover:text-red-400 ml-1">Terms of Service and Privacy Policy</a>.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-900 hover:bg-red-500 text-white font-bold py-3 rounded-lg shadow-lg mt-2 text-lg transition-colors"
                >
                  CREATE YOUR ACCOUNT
                </button>
                <div className="flex items-center gap-2 my-4">
                  <span className="flex-1 h-px bg-neutral-800" />
                  <span className="text-neutral-500 text-sm">or sign up with</span>
                  <span className="flex-1 h-px bg-neutral-800" />
                </div>
                <div className="flex justify-center gap-4">
                  <button type="button" className="bg-neutral-900 border border-neutral-500 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-full">Google</button>
                  <button type="button" className="bg-neutral-900 border border-neutral-500 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-full">GitHub</button>
                  <button type="button" className="bg-neutral-900 border border-neutral-500 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-full">Azure</button>
                </div>
                <p className="text-xs text-neutral-500 text-center mt-5">
                  This form is protected by reCAPTCHA. By creating an account, you agree to our <a href="/privacy" className="underline hover:text-red-400">Privacy Policy</a> and <a href="/terms" className="underline hover:text-red-400">Terms</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- "Getting started is easy" Section --- */}
      <section
        className="w-full py-24 flex flex-col items-center relative"
        style={{
          background: "#000000ff 100%",
          clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)",
        }}
      >

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-14 text-center">Getting started is easy</h2>
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-5xl">
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-white">Start for free</h3>
            <p className="text-base text-neutral-200 text-center max-w-xs">
              Start with RedShrew’s free tier: instant access, no credit card required. Upgrade or downgrade anytime.
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-white">No contracts</h3>
            <p className="text-base text-neutral-200 text-center max-w-xs">
              You can upgrade or downgrade at any time, and we’ll automatically adjust your rate on your next billing cycle.
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-white">Save money</h3>
            <p className="text-base text-neutral-200 text-center max-w-xs">
              Flexible pricing: only pay for what you need, with deep discounts for annual plans or reserved capacity.
            </p>
          </div>
        </div>
      </section>

      {/* --- Brand Banner --- */}
      <section
  className="w-full py-14 flex flex-col items-center relative"
  style={{
          background: "linear-gradient(150deg, #75131e 100%, #170608 100%)",
    clipPath: 'polygon(-10% 5%, 100% 10%, 100% 70%, 0% 90%)',
  }}
>
  <div className="text-neutral-300 text-xs tracking-wide mb-8 text-center uppercase">
    OVER 130K ORGANIZATIONS HAVE FEWER (CYBER) ISSUES THAN BEFORE
  </div>
  <div className="flex flex-wrap gap-x-12 gap-y-8 items-center justify-center mb-4 w-full max-w-6xl">
        <div className="flex flex-wrap gap-x-12 gap-y-8 items-center justify-center mb-4 w-full max-w-6xl">
          <img src="/logos/3m.svg" alt="3M" className="h-10 md:h-12 filter invert brightness-200" />
          <img src="/logos/nordvpn.svg" alt="Nord VPN" className="h-10 md:h-12 filter invert brightness-200" />
          <img src="/logos/atlassian.svg" alt="Atlassian" className="h-10 md:h-12 filter invert brightness-200" />
          <img src="/logos/f1.svg" alt="F1" className="h-10 md:h-12 filter invert brightness-200" />
          <img src="/logos/nba.svg" alt="NBA" className="h-10 md:h-12 filter invert brightness-200" />
          <img src="/logos/uber.svg" alt="Uber" className="h-10 md:h-12 filter invert brightness-200" />
          <img src="/logos/airbnb.svg" alt="Airbnb" className="h-10 md:h-12 filter invert brightness-200" />
          <img src="/logos/paloaltonetworks.svg" alt="Palo Alto" className="h-10 md:h-12 filter invert brightness-200" />
        </div>
        </div>
      </section>

      {/* --- Call-to-action Banner --- */}
  {/* --- Call-to-action Banner WITH GRID --- */}
<section className="relative w-full bg-black overflow-hidden py-28 flex flex-col items-center justify-center">
  {/* Animated Wavy Red Grid */}
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    viewBox="0 0 1920 800"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="redGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
      </pattern>
      <filter id="distort" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="turb">
          <animate attributeName="baseFrequency" dur="30s" values="0.008;0.009;0.008" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="turb" scale="18" />
      </filter>
      {/* Vertical fade gradient */}
      <linearGradient id="fadeGridV" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="20%" stopColor="white" stopOpacity="1" />
        <stop offset="80%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <mask id="maskGridV">
        <rect width="100%" height="100%" fill="url(#fadeGridV)" />
      </mask>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill="url(#redGrid)"
      filter="url(#distort)"
      mask="url(#maskGridV)"
      opacity="0.2"
    />
  </svg>

  {/* Foreground Content */}
  <div className="relative z-10 w-full flex flex-col items-center text-center">
    <h3 className="text-2xl font-bold mb-2 text-white">Attacks happen, detect them faster</h3>
    <div className="text-neutral-300 mb-6">Next-gen deception for modern defenders.</div>
    <div className="flex gap-4 justify-center">
      <a
        href="/get-started"
        className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-colors"
      >
        TRY REDSHREW FOR FREE
      </a>
      <a
        href="/demo"
        className="border-2 border-red-400 text-white hover:bg-red-700 hover:text-white px-8 py-3 rounded-full shadow text-lg font-bold transition-colors"
      >
        GET STARTED
      </a>
    </div>
  </div>
</section>


      {/* --- Final Legal Footer --- */}
      <Footer />
    </main>
  );
}
