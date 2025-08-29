import { useEffect, useRef, useState } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const ref = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section heading and description with view-based animation
      gsap.fromTo(
        ".section-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-heading",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".section-description",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".section-description",
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate service cards with view-based animation
      gsap.fromTo(
        ".service-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-grid",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate titles within each card with view-based animation
      gsap.fromTo(
        ".svc-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-grid",
            start: "top 75%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate descriptions within each card with view-based animation
      gsap.fromTo(
        ".svc-desc",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          delay: 0.7,
          scrollTrigger: {
            trigger: ".service-grid",
            start: "top 75%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(index);
  };

  return (
    <section ref={ref} id="services" className="py-20 px-6 bg-gray-950">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="section-heading text-3xl md:text-4xl font-bold text-white">
          {siteContent.services.heading}
        </h2>
        <p className="section-description text-gray-400 mt-3">
          {siteContent.services.description}
        </p>
      </div>

      <div className="service-grid max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {siteContent.services.list.map((s, index) => (
          <div
            key={s.title}
            className="service-card relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-105 transition-transform duration-500 group overflow-hidden"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Gradient overlay that follows mouse */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  hoveredCard === index
                    ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`
                    : "transparent",
              }}
            ></div>

            <div className="relative z-10">
              <h3 className="svc-title text-xl font-semibold text-white mb-2">
                {s.title}
              </h3>
              <p className="svc-desc text-gray-400">{s.desc}</p>
            </div>

            {/* Glowing border effect */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
