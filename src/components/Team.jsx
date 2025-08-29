import { siteContent } from "../contents";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-card", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });

      // 3D Tilt Effect
      const cards = gsap.utils.toArray(".team-card");
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rX =
            (e.clientX -
              card.getBoundingClientRect().left -
              card.offsetWidth / 2) /
            40;
          const rY =
            (e.clientY -
              card.getBoundingClientRect().top -
              card.offsetHeight / 2) /
            -40;
          gsap.to(card, {
            rotateY: rX,
            rotateX: rY,
            scale: 1.05,
            duration: 0.4,
          });
        });
        card.addEventListener("mouseleave", () =>
          gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6 })
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-gray-950 relative">
      <h2 className="text-4xl font-bold text-center mb-12 text-white tracking-tight">
        Meet Our Team
      </h2>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {siteContent.team.map((m, i) => (
          <div
            key={i}
            className="team-card relative group p-6 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/10 shadow-lg backdrop-blur-md overflow-hidden transition-transform"
          >
            {/* Glow Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <img
                src={m.image}
                alt={m.name}
                className="w-24 h-24 object-cover rounded-full border-2 border-purple-500 shadow-md mb-4"
              />
              <h3 className="text-lg font-semibold text-white">{m.name}</h3>
              <p className="text-purple-400 text-sm mb-3">{m.role}</p>
              <ul className="text-sm text-gray-300 space-y-1">
                {m.skills.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center gap-1"
                  >
                    <span className="text-purple-400">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
