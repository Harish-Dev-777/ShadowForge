import { useEffect, useRef, useState } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const ref = useRef();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [countersVisible, setCountersVisible] = useState(false);
  const [hasCounted, setHasCounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef(null);
  const animationRef = useRef(null);
  const cardRefs = useRef([]);
  const counterAnimationRefs = useRef([]);
  const counterValues = useRef([0, 0, 0, 0]); // Track current counter values

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section heading with more dramatic effect
      gsap.fromTo(
        ".testimonials-heading",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-heading",
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate subtitle
      gsap.fromTo(
        ".testimonials-subtitle",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials-subtitle",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate filter buttons with more noticeable effect
      gsap.fromTo(
        ".filter-btn",
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".filter-container",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate stats counters with more dramatic effect
      gsap.fromTo(
        ".stat-item",
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.25,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate CTA section
      gsap.fromTo(
        ".cta-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".cta-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Set up scroll trigger for counters
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 80%",
        onEnter: () => {
          if (!hasCounted) {
            setCountersVisible(true);
            setHasCounted(true);
          }
        },
        onLeaveBack: () => setCountersVisible(false),
      });

      // Enhanced parallax effect for background elements
      gsap.to(".parallax-bg-1", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".parallax-bg-2", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Initialize scrolling animations for testimonial rows
      initScrollAnimation();
    }, ref);

    return () => {
      ctx.revert();
      // Clean up animations
      if (animationRef.current) animationRef.current.kill();

      // Clean up counter animations
      counterAnimationRefs.current.forEach((anim) => {
        if (anim) anim.kill();
      });
    };
  }, [hasCounted]);

  const initScrollAnimation = () => {
    // Clear any existing animations
    if (animationRef.current) animationRef.current.kill();

    // Infinite moving cards animation with chain effect
    if (scrollerRef.current) {
      const scrollerContent =
        scrollerRef.current.querySelector(".scroller-inner");
      if (!scrollerContent) return;

      // Get the total width of the content
      const scrollerContentWidth = scrollerContent.scrollWidth;

      // Create the animation with chain effect
      animationRef.current = gsap.to(scrollerContent, {
        x: -scrollerContentWidth / 2,
        duration: 40,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const modX = parseFloat(x) % (scrollerContentWidth / 2);
            // Add chain effect - slight bounce at transition points
            if (modX > -10 && modX < 0) {
              return modX - (modX * modX) / 20;
            }
            return modX;
          }),
        },
        paused: isPaused,
        onRepeat: () => {
          // Add a slight delay before restarting for chain effect
          gsap.to(scrollerContent, {
            x: "-=5",
            duration: 0.3,
            ease: "power1.out",
            yoyo: true,
            repeat: 1,
          });
        },
      });
    }
  };

  useEffect(() => {
    // Reinitialize animations when pause state changes
    initScrollAnimation();
  }, [isPaused, activeFilter]);

  const handleNavigateToContact = () => {
    navigate("/contact");
  };

  // Filter testimonials by project type
  const filteredTestimonials =
    activeFilter === "all"
      ? siteContent.testimonials
      : siteContent.testimonials.filter((t) =>
          t.projectType.toLowerCase().includes(activeFilter.toLowerCase())
        );

  // Get unique project types for filter buttons
  const projectTypes = [
    ...new Set(siteContent.testimonials.map((t) => t.projectType)),
  ];

  // Counter component with TheMaxWeb style
  const Counter = ({ end, duration, label, index }) => {
    const [count, setCount] = useState(counterValues.current[index]);
    const hasAnimatedRef = useRef(false);
    const counterRef = useRef(null);
    const counterContainerRef = useRef(null);

    useEffect(() => {
      // If we've already counted to the max value, don't animate again
      if (counterValues.current[index] === end) {
        setCount(end);
        return;
      }

      if (!countersVisible) {
        // If counters are not visible but we've already counted, show the final value
        if (hasCounted) {
          setCount(end);
          counterValues.current[index] = end;
        }
        return;
      }

      // Only animate once
      if (hasAnimatedRef.current) {
        return;
      }

      hasAnimatedRef.current = true;

      // Use GSAP for smooth counting animation
      const counterElement = counterRef.current;
      if (!counterElement) return;

      // Kill any existing animation for this counter
      if (counterAnimationRefs.current[index]) {
        counterAnimationRefs.current[index].kill();
      }

      // Start from the current value, not from 0
      const startValue = counterValues.current[index];

      // Create and store the new animation
      counterAnimationRefs.current[index] = gsap.to(counterElement, {
        innerText: end,
        duration: duration / 1000,
        snap: { innerText: 1 },
        ease: "power2.out",
        onUpdate: function () {
          const currentValue = Math.floor(parseInt(counterElement.innerText));
          setCount(currentValue);
          counterValues.current[index] = currentValue;
        },
        onStart: () => {
          // Add animation class to container
          if (counterContainerRef.current) {
            counterContainerRef.current.classList.add("counting");
          }
        },
        onComplete: () => {
          // Remove animation class from container
          if (counterContainerRef.current) {
            counterContainerRef.current.classList.remove("counting");
          }
          // Ensure we set the final value
          setCount(end);
          counterValues.current[index] = end;
        },
      });
    }, [countersVisible, end, duration, hasCounted, index]);

    return (
      <div
        ref={counterContainerRef}
        className="stat-item h-full p-6 md:p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden"
      >
        {/* Animated background element */}
        <div className="counter-bg absolute inset-0 opacity-0 transition-opacity duration-500"></div>

        <div className="relative z-10">
          <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 flex justify-center items-end">
            <span ref={counterRef} className="counter-number">
              {count}
            </span>
            <span className="text-purple-400 ml-1 text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2">
              +
            </span>
          </div>
          <div className="text-gray-300 text-lg md:text-xl font-medium">
            {label}
          </div>
        </div>

        <style jsx>{`
          .stat-item {
            transition: all 0.4s ease;
          }

          .stat-item.counting {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .stat-item.counting .counter-bg {
            opacity: 1;
            background: linear-gradient(
              135deg,
              rgba(139, 92, 246, 0.1) 0%,
              rgba(99, 102, 241, 0.1) 100%
            );
          }

          .counter-number {
            background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          }
        `}</style>
      </div>
    );
  };

  // Testimonial card component with Aceternity Comet Card effect
  const TestimonialCard = ({ testimonial, index }) => {
    const cardRef = useRef(null);
    const cometTrailTimeout = useRef(null);

    useEffect(() => {
      cardRefs.current[index] = cardRef.current;

      const card = cardRef.current;
      if (!card) return;

      // Set up GSAP hover animations
      const content = card.querySelector(".card-content");

      const cardAnimation = gsap.to(card, {
        y: -5,
        scale: 1.02,
        duration: 0.4,
        paused: true,
        ease: "power2.out",
      });

      const handleMouseEnter = (e) => {
        setIsPaused(true);
        cardAnimation.play();
      };

      const handleMouseLeave = () => {
        setIsPaused(false);
        cardAnimation.reverse();

        // Clear any pending comet trail timeouts
        if (cometTrailTimeout.current) {
          clearTimeout(cometTrailTimeout.current);
          cometTrailTimeout.current = null;
        }
      };

      const handleMouseMove = (e) => {
        // Create comet trail on mouse move with throttling
        if (!cometTrailTimeout.current) {
          cometTrailTimeout.current = setTimeout(() => {
            if (cardRef.current) {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const comet = document.createElement("div");
              comet.className =
                "comet absolute w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 pointer-events-none";
              comet.style.cssText =
                "filter: blur(8px); box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.7); z-index: 1;";

              card.appendChild(comet);

              gsap.set(comet, {
                x: x,
                y: y,
                opacity: 1,
              });

              gsap.to(comet, {
                x: x + (Math.random() * 200 - 100),
                y: y + (Math.random() * 200 - 100),
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                  if (card.contains(comet)) {
                    card.removeChild(comet);
                  }
                },
              });
            }

            cometTrailTimeout.current = null;
          }, 100); // Throttle to create comets every 100ms
        }
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
      card.addEventListener("mousemove", handleMouseMove);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
        card.removeEventListener("mousemove", handleMouseMove);

        if (cometTrailTimeout.current) {
          clearTimeout(cometTrailTimeout.current);
        }
      };
    }, [index]);

    return (
      <div
        ref={cardRef}
        className="card testimonial-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[450px] relative p-4 sm:p-6 md:p-8 rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl mx-3 sm:mx-4 group overflow-hidden"
      >
        {/* Content */}
        <div className="card-content relative z-10 h-full flex flex-col">
          {/* Rating stars */}
          <div className="flex items-center mb-4 sm:mb-5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                  i < testimonial.rating ? "text-yellow-400" : "text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 sm:ml-3 text-xs sm:text-sm md:text-base text-gray-500">
              {testimonial.rating}/5
            </span>
          </div>

          {/* Quote with proper alignment */}
          <p className="text-gray-200 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed flex-grow">
            "{testimonial.quote}"
          </p>

          {/* Project info */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800/50 rounded-xl">
            <div className="flex justify-between items-center text-xs sm:text-sm md:text-base mb-1 sm:mb-2">
              <span className="text-gray-300">Project Type:</span>
              <span className="text-purple-400 font-medium">
                {testimonial.projectType}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
              <span className="text-gray-300">Timeline:</span>
              <span className="text-green-400 font-medium">
                {testimonial.timeline}
              </span>
            </div>
          </div>

          {/* Client info */}
          <div className="flex items-center pt-3 sm:pt-5 border-t border-gray-800 mt-auto">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl">
                {testimonial.name.charAt(0)}
              </div>
            </div>
            <div className="ml-3 sm:ml-4">
              <h4 className="text-white font-semibold text-base sm:text-lg md:text-xl">
                {testimonial.name}
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-br from-gray-950 to-black min-h-screen overflow-hidden relative"
    >
      {/* Enhanced parallax background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.15] overflow-hidden">
        <div className="parallax-bg-1 absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="parallax-bg-2 absolute bottom-1/3 right-1/4 w-80 md:w-[500px] h-80 md:h-[500px] bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-28">
          <h2 className="testimonials-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
            Client Testimonials
          </h2>
          <p className="testimonials-subtitle text-gray-400 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl px-4">
            Hear what our clients have to say about their experience working
            with ShadowForge. We take pride in delivering exceptional results
            and building lasting relationships.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="filter-container flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-24 px-4">
          <button
            className={`filter-btn px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all text-sm sm:text-lg md:text-xl ${
              activeFilter === "all"
                ? "bg-purple-600 text-white shadow-2xl shadow-purple-500/40"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-lg"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Projects
          </button>
          {projectTypes.map((type, index) => (
            <button
              key={index}
              className={`filter-btn px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all text-sm sm:text-lg md:text-xl ${
                activeFilter === type
                  ? "bg-purple-600 text-white shadow-2xl shadow-purple-500/40"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-lg"
              }`}
              onClick={() => setActiveFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Testimonials display - Infinite moving cards with chain effect */}
        <div
          ref={scrollerRef}
          className="scroller relative max-w-[100vw] overflow-hidden mask-image-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="scroller-inner flex w-max flex-nowrap gap-0 py-4 sm:py-6">
            {[...filteredTestimonials, ...filteredTestimonials].map(
              (testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              )
            )}
          </div>
        </div>

        {/* Stats section with TheMaxWeb style counters */}
        <div className="stats-section mt-16 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10 text-center">
          <Counter
            end={120}
            duration={2000}
            label="Projects Completed"
            index={0}
          />
          <Counter
            end={95}
            duration={2000}
            label="Client Satisfaction"
            index={1}
          />
          <Counter
            end={98}
            duration={2000}
            label="On-Time Delivery"
            index={2}
          />
          <Counter end={50} duration={2000} label="Happy Clients" index={3} />
        </div>

        {/* CTA Section */}
        <div className="cta-section text-center mt-16 md:mt-32">
          <h3 className="cta-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
            Ready to start your project?
          </h3>
          <p className="cta-text text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 text-lg sm:text-xl md:text-2xl">
            Join our satisfied clients and let us bring your vision to life with
            our expertise and dedication.
          </p>
          <button
            className="cta-button relative inline-flex h-12 sm:h-14 md:h-16 overflow-hidden rounded-full p-[1.5px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleNavigateToContact}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 sm:px-10 md:px-12 py-2 sm:py-3 text-base sm:text-lg md:text-xl font-medium text-white backdrop-blur-3xl">
              Start Your Project Today
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
