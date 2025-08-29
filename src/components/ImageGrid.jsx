// src/components/ImageGrid.jsx
import { useRef, useEffect, useState } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageGrid() {
  const wrapRef = useRef();
  const tlRef = useRef();
  const sectionRef = useRef();
  const cardsRef = useRef([]);
  const cometRefs = useRef([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Title animation
      gsap.fromTo(
        ".grid-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".grid-title",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Description animation
      gsap.fromTo(
        ".grid-description",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".grid-description",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Card animations
      gsap.fromTo(
        cardsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".grid-card",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Setup horizontal scroll for all devices
      const wrap = wrapRef.current;
      if (!wrap) return;

      const slides = gsap.utils.toArray(wrap.children);
      const gap = 24;

      // Clear any existing clones to avoid duplication
      while (wrap.children.length > slides.length) {
        wrap.removeChild(wrap.lastChild);
      }

      // Duplicate slides for seamless infinite scroll
      slides.forEach((sl) => wrap.appendChild(sl.cloneNode(true)));

      // Calculate total width of original slides
      const totalWidth = slides.reduce(
        (acc, child) => acc + child.offsetWidth + gap,
        0
      );

      // Set container width explicitly
      wrap.style.width = `${totalWidth * 2}px`;

      // Reset position to avoid jumpiness
      gsap.set(wrap, { x: 0 });

      // GSAP continuous horizontal scroll
      tlRef.current = gsap.to(wrap, {
        x: `-=${totalWidth}`,
        duration: 40,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      // Pause on hover for all devices
      const handleMouseEnter = () => {
        setIsHovered(true);
        if (tlRef.current) tlRef.current.pause();
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
        if (tlRef.current) tlRef.current.play();
      };

      // Dragging functionality for desktop
      if (windowSize.width > 768) {
        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
          isDown = true;
          startX = e.pageX - wrap.offsetLeft;
          scrollLeft = wrap.scrollLeft;
        };

        const handleMouseUp = () => {
          isDown = false;
        };

        const handleMouseMove = (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - wrap.offsetLeft;
          const walk = (x - startX) * 2;
          wrap.scrollLeft = scrollLeft - walk;
        };

        wrap.addEventListener("mousedown", handleMouseDown);
        wrap.addEventListener("mouseup", handleMouseUp);
        wrap.addEventListener("mousemove", handleMouseMove);

        return () => {
          wrap.removeEventListener("mousedown", handleMouseDown);
          wrap.removeEventListener("mouseup", handleMouseUp);
          wrap.removeEventListener("mousemove", handleMouseMove);
        };
      } else {
        // For mobile and tablet, enable manual scrolling
        wrap.style.overflowX = "auto";
        wrap.style.cursor = "grab";

        // Add momentum scrolling for mobile
        let startX, scrollLeft, isScrolling;

        const handleTouchStart = (e) => {
          startX = e.touches[0].pageX - wrap.offsetLeft;
          scrollLeft = wrap.scrollLeft;
          isScrolling = true;
          if (tlRef.current) tlRef.current.pause();
        };

        const handleTouchMove = (e) => {
          if (!isScrolling) return;
          e.preventDefault();
          const x = e.touches[0].pageX - wrap.offsetLeft;
          const walk = (x - startX) * 2;
          wrap.scrollLeft = scrollLeft - walk;
        };

        const handleTouchEnd = () => {
          isScrolling = false;
          // Resume auto-scroll after a delay if not hovering
          setTimeout(() => {
            if (!isHovered && tlRef.current) tlRef.current.play();
          }, 2000);
        };

        wrap.addEventListener("touchstart", handleTouchStart);
        wrap.addEventListener("touchmove", handleTouchMove);
        wrap.addEventListener("touchend", handleTouchEnd);

        return () => {
          wrap.removeEventListener("touchstart", handleTouchStart);
          wrap.removeEventListener("touchmove", handleTouchMove);
          wrap.removeEventListener("touchend", handleTouchEnd);
        };
      }

      wrap.addEventListener("mouseenter", handleMouseEnter);
      wrap.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (tlRef.current) tlRef.current.kill();
        wrap.removeEventListener("mouseenter", handleMouseEnter);
        wrap.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [windowSize.width, isHovered]);

  // Initialize comet elements for each card
  useEffect(() => {
    cometRefs.current = cometRefs.current.slice(0, cardsRef.current.length);

    cardsRef.current.forEach((card, index) => {
      if (card && !card.querySelector(".comet-trail")) {
        const comet = document.createElement("div");
        comet.className = "comet-trail";
        comet.style.cssText = `
          position: absolute;
          width: 120px;
          height: 120px;
          pointer-events: none;
          z-index: 2;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(15px);
          opacity: 0;
          transform: translate(-50%, -50%);
        `;
        card.style.position = "relative";
        card.style.overflow = "hidden";
        card.appendChild(comet);
        cometRefs.current[index] = comet;
      }
    });
  }, [siteContent.projects]);

  // Enhanced comet card hover effect
  const handleCardHover = (e, index) => {
    const card = e.currentTarget;
    if (!card) return;

    // Scale up the hovered card
    gsap.to(card, {
      scale: 1.05,
      zIndex: 10,
      duration: 0.3,
      ease: "power2.out",
    });

    // Get comet element
    const comet = card.querySelector(".comet-trail");
    if (!comet) return;

    // Calculate position
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Position comet at cursor
    gsap.set(comet, {
      x: x,
      y: y,
      opacity: 0,
      scale: 0,
    });

    // Animate comet trail across the card
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2);
    const distance = Math.sqrt(
      Math.pow(rect.width, 2) + Math.pow(rect.height, 2)
    );
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;

    gsap.to(comet, {
      x: targetX,
      y: targetY,
      scale: 2,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(comet, {
          opacity: 0,
          duration: 0.3,
        });
      },
    });

    // Slightly scale down other cards
    cardsRef.current.forEach((otherCard, i) => {
      if (i !== index && otherCard) {
        gsap.to(otherCard, {
          scale: 0.98,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  const handleCardLeave = (e, index) => {
    const card = e.currentTarget;
    if (!card) return;

    // Reset all cards to normal state
    gsap.to(card, {
      scale: 1,
      zIndex: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Reset other cards
    cardsRef.current.forEach((otherCard, i) => {
      if (i !== index && otherCard) {
        gsap.to(otherCard, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });

    // Hide comet
    const comet = card.querySelector(".comet-trail");
    if (comet) {
      gsap.to(comet, {
        opacity: 0,
        duration: 0.2,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="image-grid"
      className="py-20 md:py-24 bg-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-12 px-4 relative z-10">
        <h2 className="grid-title text-3xl md:text-4xl font-bold text-white">
          Our Work
        </h2>
        <p className="grid-description text-gray-400 mt-2 max-w-2xl mx-auto">
          A showcase of projects we've forged into reality with innovation and
          precision.
        </p>
      </div>

      <div className="relative overflow-hidden px-4">
        {/* Gradient overlays for belt-style effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-20 pointer-events-none"></div>

        <div
          ref={wrapRef}
          className="flex gap-6 will-change-transform scroll-hide"
          style={{ overflowX: windowSize.width <= 768 ? "auto" : "hidden" }}
        >
          {siteContent.projects.map((p, index) => (
            <div
              key={p.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="grid-card w-[300px] md:w-[380px] flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 group relative"
              onMouseMove={(e) => handleCardHover(e, index)}
              onMouseLeave={(e) => handleCardLeave(e, index)}
            >
              {/* Border gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"></div>

              <div className="overflow-hidden relative z-10">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 relative z-10">
                <h3 className="font-semibold text-white text-lg mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm">{p.description}</p>

                {/* Safely render tags only if they exist */}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-purple-900/30 text-purple-200 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition-all flex items-center">
                  View Project
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots for mobile */}
      {windowSize.width <= 768 && (
        <div className="flex justify-center mt-8 space-x-2">
          {siteContent.projects.map((_, index) => (
            <div key={index} className="w-2 h-2 bg-gray-600 rounded-full"></div>
          ))}
        </div>
      )}

      {/* Scroll indicator for horizontal scroll */}
      <div className="text-center mt-6 text-gray-500 text-sm animate-pulse">
        <span className="inline-block mr-2">←</span>
        {windowSize.width > 768
          ? "Hover to pause • Scroll to explore"
          : "Swipe to explore"}
        <span className="inline-block ml-2">→</span>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (max-width: 768px) {
          .grid-card {
            width: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
