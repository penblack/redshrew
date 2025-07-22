import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

// ---- Brand Colors ----
const gridRed = "#e32d32";    // bright, branded grid
const gridDark = "#250606";   // deep background

// ---- Carousel Data ----
const VISIBLE_CARDS = 3;

const articles = [
  {
    img: "/gaming.png",
    title: "RedShrew for Gaming",
    description: "Your telemetry reveals more than logs alone. Whether you’re building FPS, MMOs, or strategy titles, see attacker moves in real time.",
    video: false,
  },
  {
    img: "/lunch.png",
    title: "Lunch & Learn: Real Tracing",
    description: "Errors are just the start. Learn how to spot and trace lateral movement before it escalates. Your users will never know.",
    video: false,
  },
  {
    img: "/monitoring.png",
    title: "Threat Monitoring by RedShrew",
    description: "Designed for defenders, RedShrew’s analytics cut the guesswork and empower you to pinpoint intruders without slowing your stack.",
    video: false,
  },
  {
    img: "/mobile.png",
    title: "RedShrew for Mobile Apps",
    description: "From app exploits to session hijacks—capture and replay runtime threats in one view. Get the holistic story.",
    video: false,
  },
  {
    img: "/osint.png",
    title: "OSINT for Defenders",
    description: "Combine OSINT signals with live telemetry for total situational awareness and rapid attacker attribution.",
    video: false,
  },
  {
    img: "/replay.png",
    title: "Replay: Real-World Attacks",
    description: "See every click and keystroke. Rewind breaches and study adversaries like never before.",
    video: false,
  },
];

// --- Infinite Loop: Duplicate Edges ---
const extendedArticles = [
  ...articles.slice(-VISIBLE_CARDS),
  ...articles,
  ...articles.slice(0, VISIBLE_CARDS),
];

export default function ContentCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start at first real card
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / VISIBLE_CARDS;
      scrollRef.current.scrollLeft = cardWidth * VISIBLE_CARDS;
    }
  }, []);

  // Infinite loop effect
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const cardWidth = clientWidth / VISIBLE_CARDS;
    const maxScroll = cardWidth * (articles.length + VISIBLE_CARDS);

    if (scrollLeft < cardWidth * 0.5) {
      scrollRef.current.scrollLeft = cardWidth * articles.length + scrollLeft;
    } else if (scrollLeft > maxScroll - cardWidth * 0.5) {
      scrollRef.current.scrollLeft = cardWidth * VISIBLE_CARDS + (scrollLeft - maxScroll);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth / VISIBLE_CARDS;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center py-20 bg-black overflow-hidden">
      {/* --- Wavy Grid SVG Background --- */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 800"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gridline" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={gridRed} stopOpacity="0.12" />
            <stop offset="1" stopColor={gridRed} stopOpacity="0.04" />
          </linearGradient>
        </defs>
        {/* Horizontal */}
        {[...Array(16)].map((_, i) => (
          <path
            key={"h" + i}
            d={`
              M 0 ${50 * i + 20}
              C 400 ${40 * i + 60}, 1040 ${60 * i + 10}, 1440 ${50 * i + 30}
            `}
            stroke="url(#gridline)"
            strokeWidth="1"
            fill="none"
          />
        ))}
        {/* Vertical */}
        {[...Array(13)].map((_, i) => (
          <path
            key={"v" + i}
            d={`
              M ${120 * i} 0
              C ${110 * i} 300, ${140 * i} 500, ${120 * i} 800
            `}
            stroke="url(#gridline)"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      {/* --- Foreground Content --- */}
      <h2 className="text-white text-3xl sm:text-4xl font-bold mb-12 text-center z-10">Of course we have more content</h2>
      {/* Arrow Left */}
      <button
        className="absolute left-89 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-2 border border-white/20 shadow"
        aria-label="Scroll left"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>
      {/* Arrow Right */}
      <button
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-2 border border-white/20 shadow"
        aria-label="Scroll right"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Fade left */}
      <div className="pointer-events-none absolute left-85 top-9 h-full w-40 z-20 flex items-center">
        <div
          className="h-[65%] w-full rounded-l-2xl blur-xl"
          style={{
            filter: "blur(18px)",
            background: `linear-gradient(to right, ${gridDark} 70%, transparent 100%)`,
            opacity: 0.9,
          }}
        />
      </div>
      {/* Fade right */}
      <div className="pointer-events-none absolute right-85 top-9 h-full w-40 z-20 flex items-center">
        <div
          className="h-[65%] w-full rounded-r-2xl blur-xl"
          style={{
            filter: "blur(18px)",
            background: `linear-gradient(to left, ${gridDark} 70%, transparent 100%)`,
            opacity: 0.9,
          }}
        />
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="relative flex gap-6 overflow-x-auto no-scrollbar px-36 pb-4 scroll-smooth snap-x snap-mandatory w-full max-w-6xl z-10"
        tabIndex={-1}
        style={{ scrollbarWidth: "none" }}
        onScroll={handleScroll}
      >
        {extendedArticles.map((article, idx) => (
         <div
  key={idx}
  className="flex-shrink-0 bg-neutral-900/95 border border-red-800/70 rounded-2xl shadow-xl w-80 snap-center overflow-hidden relative group transition-transform hover:-translate-y-1 duration-200 hover:border-red-600"
>

            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              {article.video && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-lg" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-neutral-200">{article.title}</h3>
              <p className="mt-1 text-neutral-400 text-base">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
