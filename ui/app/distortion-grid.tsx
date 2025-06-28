<svg
  className="absolute inset-0 z-0 pointer-events-none opacity-10"
  viewBox="0 0 800 600"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid slice"
>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
    </pattern>
    <filter id="distort">
      <feTurbulence
        type="turbulence"
        baseFrequency="0.01"
        numOctaves="3"
        result="turbulence"
      >
        <animate
          attributeName="baseFrequency"
          dur="10s"
          values="0.01;0.03;0.015;0.01"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" />
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="url(#grid)" filter="url(#distort)" />
</svg>
