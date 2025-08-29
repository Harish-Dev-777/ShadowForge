import { siteContent } from "../contents";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Team(){
  const ref = useRef();

  useEffect(()=>{
    const ctx = gsap.context(()=> {
      // stagger in cards and add small parallax for each
      gsap.from(".team-card", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 90%" }});
      // parallax tilt-like subtle movement on pointer move
      const cards = gsap.utils.toArray(".team-card");
      cards.forEach(card => {
        card.addEventListener("mousemove", (e)=>{
          const rX = (e.clientX - card.getBoundingClientRect().left - card.offsetWidth/2) / 40;
          const rY = (e.clientY - card.getBoundingClientRect().top - card.offsetHeight/2) / -40;
          gsap.to(card, { rotateY: rX, rotateX: rY, scale: 1.02, duration: 0.4 });
        });
        card.addEventListener("mouseleave", ()=> gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6 }));
      });
    }, ref);

    return ()=> ctx.revert();
  },[]);

  return (
    <section ref={ref} className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {siteContent.team.map((m, i)=>(
          <div key={i} className="team-card relative p-6 rounded-2xl bg-[var(--card)] overflow-hidden">
            <span className="absolute inset-0 rounded-2xl border border-[var(--accent)] opacity-40 animate-spin-slow"></span>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold">{m.name}</h3>
              <p className="text-[#94a3b8]">{m.role}</p>
              <ul className="mt-3 text-sm text-[#cbd5e1]">
                {m.skills.map((s, idx)=> <li key={idx}>• {s}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
