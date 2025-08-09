import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // e.g. https://api.redshrew.com

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: API_BASE
          ? `${API_BASE}/api/:path*`        // prod / preview on Vercel
          : "http://127.0.0.1:5001/api/:path*", // local dev fallback
      },
    ];
  },
};

export default nextConfig;
