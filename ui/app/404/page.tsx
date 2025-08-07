// app/not-found.tsx

import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white">
      <div className="relative flex flex-col items-center justify-center flex-grow text-center px-6 py-16 overflow-hidden">

        {/* Animated center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[800px] h-[800px] rounded-full bg-[#e4757a] opacity-30 blur-[150px] animate-pulse-slow" />
        </div>

        {/* Main content */}
        <div className="z-10 max-w-xl w-full">
          <img
            src="/404.png"
            alt="Lost RedShrew"
            className="mx-auto mb-10 w-72 h-auto sm:w-80 md:w-96"
          />
          <h1 className="text-5xl sm:text-6xl font-extrabold text-red-500 mb-4">
            Oops!
          </h1>
          <p className="text-2xl font-semibold mb-2">Error Code: 404</p>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            We can’t find the page you’re looking for!
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg sm:text-xl font-bold py-3 px-6 rounded-lg transition"
          >
            Go Back to Safety
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
