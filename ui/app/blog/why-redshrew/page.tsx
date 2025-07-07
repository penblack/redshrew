'use client';

//import { EyeOff } from 'lucide-react';

export default function WhyRedShrewBlog() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 font-sans relative overflow-hidden">
      {/* Red grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
            Why RedShrew?
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Understanding the name behind the mission — how a venomous mammal became our symbol of cyber deception.
          </p>
        </header>

        <article className="space-y-6 text-gray-300 text-lg">
          <blockquote className="border-l-4 border-red-500 pl-4 italic text-white">
            “Appear weak when you are strong, and strong when you are weak.”<br />
            — Sun Tzu
          </blockquote>

          <p>
            In cybersecurity, appearing formidable often makes you a target. That’s why <span className="text-white font-bold">RedShrew</span> draws its name from a creature that thrives in the shadows—overlooked, underestimated, but undeniably lethal.
          </p>

          <p>
            The <span className="text-white font-bold">short-tailed shrew</span>, despite its size, has a revved-up metabolism and a venomous bite. If it doesn&apos;t eat for four hours, it could die—yet in that time, it will hunt tirelessly, deploying its tiny fangs with precision. Like the shrew, our philosophy is built around <span className="text-white">stealthy aggression</span>: deploying silent weapons, feigning weakness, and responding only when the adversary is fully committed and unguarded.
          </p>

          <h2 className="text-2xl font-bold text-white">Power in Deception</h2>
          <p>
            RedShrew’s platforms — <span className="text-white font-semibold">PhantomKey</span>, <span className="text-white font-semibold">HoneyPitch</span>, and <span className="text-white font-semibold">Observer</span> — don’t just detect intrusions. They <em>invite</em> them. Our assets are designed to look harmless, even vulnerable:
          </p>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Fake SSH keys scattered across a compromised machine</li>
            <li>Seemingly broken login portals mimicking real production apps</li>
            <li>Hidden network services that exist purely to be poked</li>
          </ul>

          <p>
            When threat actors touch these traps, they reveal themselves — triggering silent alerts, fingerprinting their behavior, and mapping their decision trees in real time.
          </p>

          <h2 className="text-2xl font-bold text-white">An Indiana Jones Trap, Modernized</h2>
          <p>
            Think back to <em>Indiana Jones and the Last Crusade</em>. At the climax, Indy must choose the real Holy Grail among dozens of dazzling cups. The true chalice isn’t jeweled or gilded—it’s plain, humble, and carved from wood. His enemies, misled by grandeur, pick wrong—and perish.
          </p>

          <p>
            RedShrew operates on the same principle. We plant <span className="text-white">unassuming artifacts</span> throughout the digital environment — items attackers believe are real, or worse, trivial. The moment they interact, they’re caught in a decision trap. What looked like a forgotten <code>.env</code> file becomes a <span className="text-white">tracking beacon</span>. A “leaked” API token burns a path straight back to the threat source.
          </p>

          <h2 className="text-2xl font-bold text-white">The Shrew’s Lesson</h2>
          <p>
            We chose the name <span className="text-red-500 font-semibold">RedShrew</span> to honor the value of being overlooked.
            We operate <strong>fast</strong>, <strong>low to the ground</strong>, and <strong>with venom</strong>.
            Our clients regain the advantage not by building bigger walls, but by <em>weaponizing misdirection</em>.
          </p>

          <p className="font-semibold text-white text-center">
            If deception is defense, then underestimation is the ultimate camouflage.
          </p>
        </article>
      </div>
    </main>
  );
}
