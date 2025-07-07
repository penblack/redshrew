"use client";

import { useState } from "react";

export default function SuitePage() {
  const [hasError, setHasError] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 flex justify-center items-center">
      {hasError ? (
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-500">Suite Unavailable</h1>
          <p className="text-lg text-gray-300">
            The RedShrew Suite is currently undergoing maintenance or is
            temporarily unreachable.
          </p>
          <p className="text-sm text-gray-500">Please check back later.</p>
        </div>
      ) : (
        <iframe
          src="https://suite.redshrew.com" // change to your hosted suite URL
          className="w-full h-screen border-none"
          onError={() => setHasError(true)}
          title="RedShrew Suite"
        />
      )}
    </main>
  );
}
