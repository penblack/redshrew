//import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-0 overflow-hidden font-sans">
      {/* Red Glitch Background GIF */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-0 overflow-hidden pointer-events-none">
        <img
          src="/glitch-background.gif"
          alt="Glitch Background"
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
      </div>

     {/*
  Left-Side Glitch Overlay

  <div className="absolute top-0 right-0 w-1/2 h-full z-0 overflow-hidden pointer-events-none">
    <img
      src="/hover_red_glitch.gif"
      alt="Glitch Overlay Left"
      className="w-full h-full object-cover opacity-30 mix-blend-screen"
    />
  </div>
*/}





      {/* Static Grid Background — optional, can remove */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(circle,_rgba(255,0,0,0.15)_1px,_transparent_1px)] bg-[length:4px_4px] opacity-20 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section className="absolute top-[4vh] left-0 z-10 max-w-6xl pl-8 sm:pl-16 lg:pl-24">
        <h1 className="text-[96px] sm:text-[108px] lg:text-[128px] font-semibold leading-[1.05] tracking-tight mb-14 text-neutral-100">
          Deception<br />is defense.
        </h1>

        <p className="text-3xl sm:text-4xl text-neutral-300 italic mb-14">
          “All warfare is based on deception.”<br />
          <span className="not-italic text-2xl sm:text-3xl">— Sun Tzu</span>
        </p>

        <a
  href="#"
  className="inline-block border-2 border-red-500 text-red-500 px-12 py-5 rounded-md hover:bg-red-500 hover:text-black font-semibold transition text-2xl tracking-wide"
>
  See PhantomKey in Action
</a>
      </section>
    </main>
  );
}
