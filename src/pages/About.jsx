// src/pages/About.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "../contents";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import { useNavigate } from "react-router-dom";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTech, setActiveTech] = useState(null);
  const navigate = useNavigate();

  // Memoized technology data
  const technologies = useRef([
    {
      id: "threejs",
      name: "Three.js & R3F",
      description: "Immersive 3D web experiences",
      videoId: "6UoZ7N4VQzc",
      icon: "🔄",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "nextjs",
      name: "Next.js",
      description: "SSR & static site generation",
      videoId: "Sklc_fQBmcs",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "react",
      name: "React",
      description: "Component-based UI architecture",
      videoId: "Tn6-PIqc4UM",
      icon: "⚛️",
      color: "from-green-500 to-teal-500",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      videoId: "mr15Xzb1Ook",
      icon: "🎨",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "java",
      name: "Java & Spring",
      description: "Enterprise backend development",
      videoId: "9SGDpanrc8U",
      icon: "☕",
      color: "from-red-500 to-pink-500",
    },
    {
      id: "javascript",
      name: "JavaScript",
      description: "Web interactivity language",
      videoId: "DHjqpvDnNGE",
      icon: "📜",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "mysql",
      name: "MySQL",
      description: "Relational database management",
      videoId: "7S_tz1z_5bA",
      icon: "🗄️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      description: "NoSQL document database",
      videoId: "-56x56UppqQ",
      icon: "📊",
      color: "from-green-500 to-teal-500",
    },
    {
      id: "express",
      name: "Express.js",
      description: "Minimal Node.js framework",
      videoId: "L72fhGm1tfE",
      icon: "🚀",
      color: "from-gray-500 to-blue-500",
    },
    {
      id: "nodejs",
      name: "Node.js",
      description: "JavaScript runtime environment",
      videoId: "TlB_eWDSMt4",
      icon: "🟢",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "figma",
      name: "Figma",
      description: "Collaborative design tool",
      videoId: "FTFaQWZBqQ8",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
    },
  ]).current;

  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Clean up GSAP scroll triggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Parallax Blob Background Component
  const ParallaxBlobBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    );
  };

  // Animated Text Reveal Component
  const AnimatedTextReveal = React.memo(({ text, delay = 0, speed = 0.03 }) => {
    const textRef = useRef(null);

    useEffect(() => {
      if (!isMounted || !textRef.current) return;

      // Animate each character with a delay
      gsap.to(textRef.current.querySelectorAll("span"), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: speed,
        delay: delay,
        ease: "power2.out",
      });
    }, [isMounted, text, delay, speed]);

    return (
      <span ref={textRef}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  });

  // Holographic Card Component
  const HolographicCard = React.memo(
    ({
      children,
      className = "",
      onClick,
      glowColor = "from-blue-500/10 to-purple-500/10",
    }) => {
      const cardRef = useRef(null);

      useEffect(() => {
        if (!isMounted || !cardRef.current) return;

        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 50,
            rotationY: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }, [isMounted]);

      return (
        <div
          ref={cardRef}
          className={`bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/30 relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`}
          style={{
            background:
              "linear-gradient(145deg, rgba(30,30,40,0.6) 0%, rgba(40,40,50,0.4) 100%)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            transformStyle: "preserve-3d",
          }}
          onClick={onClick}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${glowColor} opacity-50 transition-opacity duration-500`}
          ></div>
          {children}
        </div>
      );
    }
  );

  // Enhanced Technology Modal with YouTube integration
  const TechnologyModal = ({ technology, onClose }) => {
    if (!technology) return null;

    useEffect(() => {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);

    return (
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="relative bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
          >
            ✕
          </button>

          <div className="h-72 md:h-96 lg:h-[500px] relative">
            <iframe
              src={`https://www.youtube.com/embed/${technology.videoId}?autoplay=1&rel=0&modestbranding=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={technology.name}
              loading="lazy"
            ></iframe>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {technology.name}
            </h3>
            <p className="text-gray-300">{technology.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`https://developers.google.com/youtube/v3/docs/videos/list?part=snippet&id=${technology.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
              >
                View Documentation
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Technology Showcase Section
  const TechnologyShowcase = () => {
    return (
      <section className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            <AnimatedTextReveal text="Our Technology Stack" speed={0.02} />
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <HolographicCard
                key={index}
                className="p-5 text-center cursor-pointer group"
                onClick={() => setActiveTech(tech)}
                glowColor={tech.color}
              >
                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-cyan-300 text-xs">
                    Click to watch intro
                  </span>
                </div>
              </HolographicCard>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Advanced Final Section
  const AdvancedFinale = () => {
    const containerRef = useRef(null);

    useEffect(() => {
      if (!isMounted || !containerRef.current) return;

      const elements = containerRef.current.querySelectorAll(".finale-element");

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, [isMounted]);

    const handleStartProject = () => {
      navigate("/contact");
    };

    return (
      <section className="py-20 relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        <div
          ref={containerRef}
          className="container mx-auto px-4 max-w-4xl relative z-10 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 finale-element">
            <AnimatedTextReveal
              text="Ready to Build Your 3D Project?"
              speed={0.02}
            />
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto finale-element">
            Let's create immersive 3D experiences that transform your digital
            presence and engage your audience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center finale-element">
            <button
              onClick={handleStartProject}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105"
            >
              Start Your Project
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105">
              View Our Portfolio
            </button>
          </div>

          {/* Floating 3D elements */}
          <div className="relative h-64 my-16">
            {[
              {
                class: "top-10 left-1/4 w-16 h-16 from-blue-500 to-blue-700",
                delay: 0,
              },
              {
                class:
                  "top-20 right-1/4 w-12 h-12 from-purple-500 to-purple-700",
                delay: 1,
              },
              {
                class: "bottom-20 left-1/3 w-14 h-14 from-pink-500 to-pink-700",
                delay: 2,
              },
              {
                class:
                  "bottom-10 right-1/3 w-10 h-10 from-cyan-500 to-cyan-700",
                delay: 3,
              },
            ].map((blob, i) => (
              <div
                key={i}
                className={`absolute bg-gradient-to-br rounded-full animate-float ${blob.class}`}
                style={{ animationDelay: `${blob.delay}s` }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Mouse click scroll functionality
  useEffect(() => {
    if (!isMounted) return;

    const handleMouseClick = (e) => {
      // Only trigger on left click
      if (e.button !== 0) return;

      // Calculate scroll position based on click position
      const viewportHeight = window.innerHeight;
      const clickY = e.clientY;

      // Determine scroll direction based on click position
      if (clickY < viewportHeight * 0.4) {
        // Scroll up
        window.scrollBy({ top: -viewportHeight * 0.8, behavior: "smooth" });
      } else if (clickY > viewportHeight * 0.6) {
        // Scroll down
        window.scrollBy({ top: viewportHeight * 0.8, behavior: "smooth" });
      }
    };

    window.addEventListener("mousedown", handleMouseClick);
    return () => window.removeEventListener("mousedown", handleMouseClick);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main heading animation with 3D effect
      if (headingRef.current) {
        const headingChars = headingRef.current.querySelectorAll(".char");
        gsap.fromTo(
          headingChars,
          {
            y: 100,
            opacity: 0,
            rotationX: -90,
            z: -100,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            z: 0,
            duration: 1.2,
            stagger: 0.02,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              markers: false,
            },
          }
        );
      }

      // Animate in sections with staggered delay
      gsap.utils.toArray(".animate-section").forEach((section, i) => {
        gsap.fromTo(
          section,
          {
            y: 50,
            opacity: 0,
            rotationY: 10,
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
              markers: false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-black">
        <section className="py-24 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
              {siteContent.about.heading}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
              {siteContent.about.intro}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen overflow-x-hidden bg-black">
      {/* Technology Modal */}
      <TechnologyModal
        technology={activeTech}
        onClose={() => setActiveTech(null)}
      />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black relative min-h-screen flex items-center">
        <ParallaxBlobBackground />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold text-center text-white mb-8"
          >
            {siteContent.about.heading.split("").map((char, i) => (
              <span key={i} className="char inline-block">
                {char}
              </span>
            ))}
          </h1>

          <div className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            <AnimatedTextReveal
              text={siteContent.about.intro}
              delay={0.3}
              speed={0.01}
            />
          </div>

          {/* Tech badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              "3D Experiences",
              "React Three Fiber",
              "Next.js",
              "WebGL",
              "Interactive Design",
            ].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-md rounded-full text-cyan-300 text-sm border border-cyan-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-900 relative animate-section">
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <HolographicCard
              className="space-y-6 p-8"
              glowColor="from-cyan-500/10 to-blue-500/10"
            >
              <h2 className="text-3xl font-bold text-white">
                <AnimatedTextReveal text="Our 3D Journey" speed={0.02} />
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We specialize in creating immersive 3D experiences using
                cutting-edge technologies like Three.js, React Three Fiber, and
                WebGL. Our team of experts brings digital worlds to life with
                stunning visuals and interactive elements that engage users and
                elevate brands.
              </p>
            </HolographicCard>

            <div className="relative h-64 md:h-80">
              <div className="absolute w-32 h-32 bg-purple-500 rounded-full opacity-20 top-8 left-8 animate-pulse"></div>
              <div
                className="absolute w-20 h-20 bg-blue-500 rounded-full opacity-20 top-24 left-40 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute w-28 h-28 bg-pink-500 rounded-full opacity-20 bottom-8 left-20 animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black relative animate-section">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-80 order-2 md:order-1">
              <div className="absolute w-40 h-40 bg-blue-500 rounded-full opacity-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              <div
                className="absolute w-24 h-24 bg-purple-500 rounded-full opacity-20 top-1/4 left-1/4 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute w-20 h-20 bg-pink-500 rounded-full opacity-20 bottom-1/4 right-1/4 animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <HolographicCard
              className="space-y-6 p-8 order-1 md:order-2"
              glowColor="from-purple-500/10 to-pink-500/10"
            >
              <h2 className="text-3xl font-bold text-white">
                <AnimatedTextReveal
                  text="Our Development Philosophy"
                  speed={0.02}
                />
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We believe in pushing the boundaries of web technology to create
                experiences that were once thought impossible. By combining 3D
                graphics with responsive design and seamless performance, we
                build digital products that captivate audiences and deliver
                measurable results.
              </p>
            </HolographicCard>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <TechnologyShowcase />

      {/* Stats Section - Using the imported component */}
      <Stats />

      {/* Final CTA Section */}
      <AdvancedFinale />

      <style jsx>{`
        .bg-dot-pattern {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 20px 20px;
          color: rgba(255, 255, 255, 0.05);
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              currentColor 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 20px 20px;
          color: rgba(255, 255, 255, 0.05);
        }

        .char {
          transform-origin: 50% 100%;
          display: inline-block;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes tilt {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }

        .animate-tilt {
          animation: tilt 10s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default About;
