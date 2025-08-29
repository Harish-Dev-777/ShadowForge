// src/components/Hero.jsx
import { useEffect, useRef, useState } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Link } from "react-router-dom";

// Register the ScrollTo plugin
gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const ref = useRef();
  const buttonRef = useRef();
  const scrollRef = useRef();
  const colsRef = useRef([]);
  const textContainerRef = useRef();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Make sure button is visible initially
      gsap.set(buttonRef.current, { opacity: 1, scale: 1 });

      // Create a master timeline for coordinated animations
      const masterTl = gsap.timeline();

      // Background elements subtle animation
      gsap.to(".hero-bg-element", {
        y: 20,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 2,
          from: "random",
        },
      });

      // Enhanced hero text animation with smoother stagger
      const textTl = gsap.timeline();
      textTl
        .from(".hero-line", {
          y: 100,
          opacity: 0,
          rotationX: 15,
          duration: 1.2,
          stagger: {
            amount: 0.6,
            from: "start",
            ease: "power3.out",
          },
          onStart: () => {
            // Add a subtle blur filter that clears up
            gsap.set(".hero-line", { filter: "blur(10px)" });
            gsap.to(".hero-line", {
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.15,
            });
          },
        })
        .from(
          ".hero-sub",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .from(
          buttonRef.current,
          {
            scale: 0,
            opacity: 0,
            rotation: -5,
            duration: 1,
            ease: "elastic.out(1,0.7)",
          },
          "-=0.3"
        )
        .from(
          ".hero-secondary",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-bottom-text",
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.3"
        );

      masterTl.add(textTl);

      // Enhanced button glowing effect with color shifts
      const buttonGlow = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      buttonGlow
        .to(buttonRef.current, {
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
          duration: 1.5,
          ease: "power1.inOut",
        })
        .to(buttonRef.current, {
          boxShadow:
            "0 0 30px rgba(236, 72, 153, 0.7), 0 0 60px rgba(236, 72, 153, 0.4)",
          duration: 1.5,
          ease: "power1.inOut",
        })
        .to(buttonRef.current, {
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
          duration: 1.5,
          ease: "power1.inOut",
        });

      // Improved continuous vertical belt scroll with smoother looping
      // Only on larger screens
      if (windowSize.width > 768) {
        colsRef.current.forEach((col, i) => {
          if (!col) return;

          const images = Array.from(col.children);
          const gap = 24;

          // Duplicate content for seamless loop
          images.forEach((img) => {
            const clone = img.cloneNode(true);
            col.appendChild(clone);
          });

          const totalHeight = images.reduce(
            (acc, el) => acc + el.offsetHeight + gap,
            0
          );

          // Set initial position for alternating directions
          if (i === 1) gsap.set(col, { y: -totalHeight });

          // Create smoother scrolling with eased start/end
          gsap.to(col, {
            y: i === 0 ? `-=${totalHeight}` : `+=${totalHeight}`,
            duration: 40,
            ease: "none",
            repeat: -1,
            modifiers: {
              y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
            },
          });
        });
      } else {
        // For mobile, create a single column vertical scroll (slower)
        const mobileCol = document.querySelector(".mobile-scroll-col");
        if (mobileCol) {
          const images = Array.from(mobileCol.children);
          const gap = 16; // Smaller gap for mobile

          // Duplicate content for seamless loop
          images.forEach((img) => {
            const clone = img.cloneNode(true);
            mobileCol.appendChild(clone);
          });

          const totalHeight = images.reduce(
            (acc, el) => acc + el.offsetHeight + gap,
            0
          );

          // Create slower vertical scrolling animation for mobile
          gsap.to(mobileCol, {
            y: `-=${totalHeight}`,
            duration: 60, // Slower duration for mobile
            ease: "none",
            repeat: -1,
            modifiers: {
              y: (y) => `${parseFloat(y) % totalHeight}px`,
            },
          });
        }
      }

      // Enhanced scroll indicator with fade in/out and bounce
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 2,
          ease: "power2.out",
        }
      );

      const scrollBounce = gsap.to(scrollRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });

      // Text container subtle float effect
      gsap.to(textContainerRef.current, {
        y: -10,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Clean up all animations on unmount
      return () => {
        scrollBounce.kill();
        buttonGlow.kill();
      };
    }, ref);

    return () => ctx.revert();
  }, [windowSize.width, isMounted]);

  const scrollToGrid = () => {
    const gridSection = document.getElementById("image-grid");
    if (gridSection) {
      // Use smooth scroll with offset to prevent white line at top
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: gridSection,
          offsetY: 70,
        },
        ease: "power2.inOut",
      });
    }
  };

  // If not mounted yet, show a simple version to prevent flash of hidden content
  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center px-4 md:px-12 lg:px-20 overflow-hidden bg-black">
        <div className="relative z-30 w-full md:max-w-[700px] flex flex-col justify-center h-full space-y-4 md:space-y-5 top-5 md:top-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight space-y-1">
            {siteContent.hero.titleLines.map((line, i) => (
              <span
                key={i}
                className={`block ${
                  line.toLowerCase().includes("forge")
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                    : "text-white"
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-md">
            {siteContent.hero.subtitle}
          </p>

          <div className="flex flex-col gap-8 md:gap-12">
            <Link
              to="/contact"
              className="inline-block w-fit mb-4 md:mb-5 px-8 md:px-10 text-center text-base md:text-lg py-4 md:py-5 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 shadow-2xl"
            >
              {siteContent.hero.cta}
            </Link>
            <p className="text-gray-400 text-xs md:text-sm">
              {siteContent.hero.secondary}
            </p>
          </div>

          <p className="text-gray-400 text-xs md:text-sm lg:text-base tracking-wide">
            {siteContent.hero.bottomText}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center px-4 md:px-12 lg:px-20 overflow-hidden bg-black hero-bg-pulse"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a202c 0%, #000000 70%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="hero-bg-element absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="hero-bg-element absolute bottom-1/3 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-indigo-800/10 rounded-full blur-3xl"></div>
        <div className="hero-bg-element absolute top-1/3 right-1/3 w-40 h-40 md:w-64 md:h-64 bg-pink-800/10 rounded-full blur-3xl"></div>
      </div>

      {/* Left-aligned Text */}
      <div
        ref={textContainerRef}
        className="relative z-30 w-full md:max-w-[700px] flex flex-col justify-center h-full space-y-4 md:space-y-5 top-5 md:top-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight space-y-1">
          {siteContent.hero.titleLines.map((line, i) => (
            <span
              key={i}
              className={`hero-line block ${
                line.toLowerCase().includes("forge")
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                  : "text-white"
              }`}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-sub text-base sm:text-lg md:text-xl text-gray-300 max-w-md">
          {siteContent.hero.subtitle}
        </p>

        <div className="flex flex-col gap-8 md:gap-12">
          <Link
            ref={buttonRef}
            to="/contact"
            className="inline-block w-fit mb-4 md:mb-5 px-8 md:px-10 text-center text-base md:text-lg py-4 md:py-5 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 shadow-2xl transition-transform duration-300 hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">{siteContent.hero.cta}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
          <p className="hero-secondary text-gray-400 text-xs md:text-sm">
            {siteContent.hero.secondary}
          </p>
        </div>

        <p className="hero-bottom-text text-gray-400 text-xs md:text-sm lg:text-base tracking-wide">
          {siteContent.hero.bottomText}
        </p>
      </div>

      {/* Right: 2 Vertical Columns of Images - Hidden on mobile */}
      {windowSize.width > 768 ? (
        <div className="absolute right-6 lg:right-20 top-0 bottom-0 w-[40%] lg:w-[45%] flex gap-4 lg:gap-6 overflow-hidden z-0">
          {[0, 1].map((idx) => (
            <div
              key={idx}
              ref={(el) => (colsRef.current[idx] = el)}
              className="scroll-col flex flex-col gap-4 lg:gap-6"
              style={{ minWidth: "180px", zIndex: -1 }}
            >
              {siteContent.hero.bgImages.map((img, i) => (
                <img
                  key={`${idx}-${i}`}
                  src={img}
                  alt={`bg-${i}`}
                  className="w-full h-[380px] md:h-[420px] lg:h-[460px] xl:h-[500px] rounded-2xl lg:rounded-3xl shadow-2xl object-cover transform transition-transform duration-700 hover:scale-105"
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Mobile: Single column background scroll with darker overlay
        <div className="absolute inset-0 overflow-hidden z-0 mobile-scroll-container">
          <div className="mobile-scroll-col flex flex-col gap-4">
            {siteContent.hero.bgImages.map((img, i) => (
              <div key={`mobile-${i}`} className="relative">
                <img
                  src={img}
                  alt={`bg-${i}`}
                  className="w-full h-48 object-cover opacity-40" // Smaller height and lower opacity
                />
                {/* Darker overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gradient Overlays - Fixed to prevent white line */}
      <div className="absolute top-0 inset-x-0 h-40 md:h-70 bg-gradient-to-b from-black to-transparent z-20"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 md:h-70 bg-gradient-to-t from-black to-transparent z-20"></div>
      <div className="absolute left-0 inset-y-0 w-20 md:w-30 bg-gradient-to-r from-black to-transparent z-20"></div>
      <div className="absolute right-0 inset-y-0 w-20 md:w-30 bg-gradient-to-l from-black to-transparent z-20"></div>

      {/* Additional dark overlay for mobile to improve text visibility */}
      {windowSize.width <= 768 && (
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      )}

      {/* Scroll Indicator */}
      <div
        onClick={scrollToGrid}
        className="cursor-pointer absolute bottom-6 md:bottom-8 w-full flex justify-center z-30"
      >
        <div ref={scrollRef} className="flex flex-col items-center space-y-2">
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 md:h-3 bg-white/70 rounded-full mt-1"></div>
          </div>
          <span className="text-white/70 text-xs md:text-sm tracking-wider font-light">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
