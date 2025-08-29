import { useEffect, useRef } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero(){
  const ref = useRef();

  useEffect(()=>{
    const ctx = gsap.context(()=> {
      const titleWords = ref.current.querySelectorAll(".hero-line");
      gsap.from(titleWords, {
        y: 80, opacity: 0, duration: 1.1, ease: "power4.out", stagger: 0.08
      });
      gsap.from(".hero-sub", { y: 40, opacity: 0, duration: 1, delay: 0.25 });
      gsap.from(".hero-cta", { scale: 0.85, opacity: 0, duration: 1, delay: 0.6, ease: "elastic.out(1,0.6)" });

      // small parallax on hero image
      gsap.to(".hero-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", scrub: 0.6 }
      });
    }, ref);

    return ()=> ctx.revert();
  },[]);

  return (
    <section ref={ref} className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          {siteContent.hero.titleLines.map((line, i)=> (
            <div key={i} className="hero-line block">{line}</div>
          ))}
        </h1>

        <p className="hero-sub text-lg text-[#94a3b8] max-w-3xl mx-auto">{siteContent.hero.subtitle}</p>

        <div className="mt-8 flex items-center gap-4 justify-center">
          <a href="/contact" className="hero-cta relative inline-block px-6 py-3 rounded-full font-semibold text-[var(--bg)] bg-[var(--accent)] overflow-hidden">
            <span className="relative z-10">{siteContent.hero.cta}</span>
            <span className="absolute inset-0 rounded-full border border-[var(--accent)] animate-spin-slow opacity-60"></span>
          </a>
          <span className="text-[#94a3b8] italic hidden sm:inline">{siteContent.hero.secondary}</span>
        </div>
      </div>

      <div className="mt-12 w-full flex justify-center">
        <img src={siteContent.hero.heroImage} alt="Hero graphic" className="hero-img w-[80%] max-w-3xl rounded-2xl shadow-2xl" />
      </div>
    </section>
  );
}
