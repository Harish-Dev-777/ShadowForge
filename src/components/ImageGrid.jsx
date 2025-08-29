import { useRef, useEffect } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";

export default function ImageGrid(){
  const wrapRef = useRef();

  useEffect(()=>{
    const wrap = wrapRef.current;
    if(!wrap) return;

    // duplicate items for seamless feeling
    const slides = Array.from(wrap.children);
    slides.forEach(sl => wrap.appendChild(sl.cloneNode(true)));

    const totalWidth = wrap.scrollWidth;
    // Animate translateX of the container to create continuous leftward scroll
    const tl = gsap.to(wrap, {
      x: `-=${totalWidth/2}`,
      ease: "none",
      duration: 20,
      repeat: -1
    });

    // small parallax on images using scroll (vertical)
    const imgs = wrap.querySelectorAll("img");
    const par = gsap.utils.toArray(imgs).map(img=>{
      return gsap.to(img, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: img, start: "top bottom", scrub: true }
      });
    });

    return ()=> {
      tl.kill();
      par.forEach(p=> p.kill && p.kill());
    };
  },[]);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-8">Our Work</h2>
      <div className="overflow-hidden">
        <div ref={wrapRef} className="flex gap-6 will-change-transform px-6">
          {siteContent.projects.map(p=> (
            <div key={p.id} className="min-w-[300px] max-w-[420px] rounded-2xl overflow-hidden bg-[var(--card)]">
              <img src={p.image} alt={p.title} className="w-full h-60 object-cover"/>
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
