import { siteContent } from "../contents";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Testimonials(){
  useEffect(()=>{
    const cards = gsap.utils.toArray(".testi-card");
    const anim = gsap.from(cards, { opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".testimonials", start: "top 85%" }});
    return ()=> anim.kill();
  },[]);

  return (
    <section className="testimonials py-20 px-6 bg-[var(--card)]">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8">What Clients Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {siteContent.testimonials.map((t,i)=>(
            <div key={i} className="testi-card p-6 rounded-2xl">
              <p className="italic text-[#cbd5e1]">“{t.quote}”</p>
              <p className="mt-4 font-semibold text-[var(--accent)]">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
