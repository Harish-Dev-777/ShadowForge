import { siteContent } from "../contents";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  useEffect(() => {
    const cards = gsap.utils.toArray(".testi-card");
    const anim = gsap.from(cards, {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".testimonials", start: "top 85%" },
    });
    return () => anim.kill();
  }, []);

  return (
    <section className="testimonials py-20 px-6 bg-gray-950 relative">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12 text-white tracking-tight">
          What Our Clients Say
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {siteContent.testimonials.map((t, i) => (
            <div
              key={i}
              className="testi-card relative group p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 object-cover rounded-full border-2 border-purple-500 shadow-md mb-4"
                />
                <p className="italic text-gray-300">“{t.quote}”</p>
                <p className="mt-4 font-semibold text-purple-400">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
