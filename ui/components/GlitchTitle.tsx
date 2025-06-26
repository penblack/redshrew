// 'use client';

// import { useRef } from 'react';

// export default function GlitchTitle() {
//   const glitchRef = useRef<HTMLDivElement>(null);

//   const glitch = () => {
//     const el = glitchRef.current;
//     if (!el) return;

//     el.style.opacity = '1';
//     setTimeout(() => {
//       el.style.opacity = '0';
//     }, 800);
//   };

//   return (
//     <div
//       onMouseEnter={glitch}
//       className="relative mx-auto flex items-center justify-center"
//       style={{
//         width: '768px',
//         height: '768px',
//       }}
//     >
//       <div
//         ref={glitchRef}
//         className="absolute inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-150"
//         style={{
//           backgroundImage: 'url(\"/glitch-text-mask.gif\")',
//           backgroundSize: 'contain',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//           mixBlendMode: 'screen',
//         }}
//       />
//       <div className="relative z-30 text-white text-[4.8rem] font-extrabold leading-[1.1] text-center">
//         DECEPTION<br />
//         IS DEFENSE.
//       </div>
//     </div>
//   );
// }
