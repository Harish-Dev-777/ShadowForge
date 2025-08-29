import { useEffect, useRef } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Services(){
  const ref = useRef();

  useEffect(()=>{
    const ctx = gsap.context(()=> {
      // reveal each service line with staggered characters (text animation similar to TheMaxWeb)
      gsap.from(".svc-title", { y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } });
      gsap.from(".svc-desc", { y: 20, opacity: 0, stagger: 0.12, duration: 0.7, delay: 0.15, scrollTrigger: { trigger: ref.current, start: "top 85%" }});
    }, ref);

    return ()=> ctx.revert();
  },[]);

  return (
    <section ref={ref} id="services" className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Services</h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {siteContent.services.map(s=>(
          <div key={s.id || s.title} className="relative p-6 rounded-2xl bg-[var(--card)] overflow-hidden">
            <span className="absolute inset-0 rounded-2xl border-2 border-[var(--accent)] opacity-40 animate-spin-slow"></span>
            <div className="relative z-10">
              <h3 className="svc-title text-2xl font-semibold mb-2">{s.title}</h3>
              <p className="svc-desc text-[#94a3b8]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
