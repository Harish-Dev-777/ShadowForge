// src/pages/About.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { siteContent } from "../contents";
import Team from "../components/Team";
import Footer from "../components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // Initialize custom cursor
    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;

    if (cursor && cursorFollower) {
      // Hide default cursor
      document.body.style.cursor = "none";

      // Move custom cursor with mouse
      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });

        gsap.to(cursorFollower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      document.addEventListener("mousemove", moveCursor);

      // Cursor effects on interactive elements
      const interactiveElements = document.querySelectorAll(
        "button, a, .interactive-element"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursor, { scale: 1.5, duration: 0.3 });
          gsap.to(cursorFollower, { scale: 2, opacity: 0.5, duration: 0.3 });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(cursor, { scale: 1, duration: 0.3 });
          gsap.to(cursorFollower, { scale: 1, opacity: 0.2, duration: 0.3 });
        });
      });

      return () => {
        document.removeEventListener("mousemove", moveCursor);
        document.body.style.cursor = "auto";
      };
    }
  }, [isMounted]);

  // 3D Tilt Card Component
  const TiltCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);

    useEffect(() => {
      if (!isMounted || !cardRef.current) return;

      const card = cardRef.current;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;

        gsap.to(card, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [isMounted]);

    return (
      <div
        ref={cardRef}
        className={`transform-gpu transition-all duration-300 hover:shadow-2xl ${className}`}
      >
        {children}
      </div>
    );
  };

  // Interactive Stats Component
  const AnimatedStats = () => {
    const statsRef = useRef(null);
    const [counted, setCounted] = useState(false);

    useEffect(() => {
      if (!isMounted || !statsRef.current || counted) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCounted(true);

            // Animate counting up
            const stats = [
              { element: ".stat-1", end: 150, suffix: "+" },
              { element: ".stat-2", end: 99, suffix: "%" },
              { element: ".stat-3", end: 300, suffix: "+" },
              { element: ".stat-4", end: 5, suffix: "yrs" },
            ];

            stats.forEach((stat) => {
              const el = statsRef.current.querySelector(stat.element);
              if (el) {
                gsap.fromTo(
                  el,
                  { textContent: 0 },
                  {
                    textContent: stat.end,
                    duration: 2,
                    snap: { textContent: 1 },
                    stagger: 1,
                    onUpdate: function () {
                      el.textContent =
                        Math.ceil(this.targets()[0].textContent) + stat.suffix;
                    },
                  }
                );
              }
            });
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(statsRef.current);

      return () => observer.disconnect();
    }, [isMounted, counted]);

    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900 to-transparent"></div>
        </div>

        <div
          ref={statsRef}
          className="container mx-auto px-4 max-w-6xl relative z-10"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            <AnimatedTextReveal text="Our Impact in Numbers" />
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 stat-1">
                0+
              </div>
              <p className="text-gray-400">Projects Completed</p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 stat-2">
                0%
              </div>
              <p className="text-gray-400">Client Satisfaction</p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-2 stat-3">
                0+
              </div>
              <p className="text-gray-400">Cups of Coffee</p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-xl">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 mb-2 stat-4">
                0yrs
              </div>
              <p className="text-gray-400">Experience</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Advanced Interactive Timeline Component
  const AdvancedTimeline = () => {
    const timelineSteps = [
      {
        title: "Discovery & Planning",
        description:
          "We begin by understanding your business goals, target audience, and project requirements to create a detailed plan.",
        duration: "1-2 weeks",
        icon: "🔍",
        color: "from-blue-500 to-cyan-500",
      },
      {
        title: "Design & Prototyping",
        description:
          "Our designers create wireframes and prototypes to visualize the final product and gather feedback.",
        duration: "2-3 weeks",
        icon: "🎨",
        color: "from-purple-500 to-pink-500",
      },
      {
        title: "Development",
        description:
          "Our developers bring the designs to life with clean, efficient code and regular progress updates.",
        duration: "4-8 weeks",
        icon: "💻",
        color: "from-green-500 to-teal-500",
      },
      {
        title: "Testing & Quality Assurance",
        description:
          "We rigorously test every aspect of your project to ensure optimal performance across all devices and browsers.",
        duration: "1-2 weeks",
        icon: "🧪",
        color: "from-yellow-500 to-orange-500",
      },
      {
        title: "Launch & Support",
        description:
          "We deploy your project and provide ongoing support to ensure continued success.",
        duration: "Ongoing",
        icon: "🚀",
        color: "from-red-500 to-pink-500",
      },
    ];

    return (
      <InteractiveTimeline
        steps={timelineSteps}
        activeStep={activeTimelineStep}
        setActiveStep={setActiveTimelineStep}
      />
    );
  };

  // Advanced Final Section with Particle Animation
  const AdvancedFinale = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      if (!isMounted || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let particles = [];
      let animationId;

      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Particle class
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.color = `hsl(${Math.random() * 360}, 50%, 70%)`;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
          }

          if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
          }
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Create particles
      const createParticles = () => {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;

        for (let i = 0; i < numberOfParticles; i++) {
          particles.push(new Particle());
        }
      };

      createParticles();

      // Connect particles with lines
      const connectParticles = () => {
        const maxDistance = 100;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${
                1 - distance / maxDistance
              })`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      };

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }

        connectParticles();
        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", resizeCanvas);
      };
    }, [isMounted]);

    return (
      <section className="py-20 relative overflow-hidden min-h-screen flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
        />

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <AnimatedTextReveal text="Ready to Start Your Project?" />
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's transform your ideas into a digital reality that exceeds
            expectations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>Start a Project</MagneticButton>

            <MagneticButton variant="outline">View Our Work</MagneticButton>
          </div>

          {/* Animated floating elements */}
          <div className="relative h-64 my-16">
            <div className="absolute top-10 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full animate-float-1"></div>
            <div className="absolute top-20 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full animate-float-2"></div>
            <div className="absolute bottom-20 left-1/3 w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full animate-float-3"></div>
            <div className="absolute bottom-10 right-1/3 w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full animate-float-4"></div>
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    if (!isMounted) return;

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
            duration: 1.5,
            stagger: 0.03,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Parallax effect for floating blobs
      gsap.to(".parallax-blob", {
        y: (i, target) =>
          ScrollTrigger.maxScroll(window) * 0.1 * (i % 2 ? 1 : -1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

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
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
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
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        ref={cursorFollowerRef}
        className="fixed w-8 h-8 border border-white rounded-full pointer-events-none z-40 opacity-20 transform -translate-x-1/2 -translate-y-1/2"
      ></div>

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
            <AnimatedTextReveal text={siteContent.about.intro} />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-900 relative animate-section">
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <TiltCard className="space-y-6 p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/30">
              <h2 className="text-3xl font-bold text-white">
                <AnimatedTextReveal text="Our Story" />
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {siteContent.about.story}
              </p>
            </TiltCard>

            <div className="relative h-64 md:h-80">
              <div className="parallax-blob absolute w-32 h-32 bg-purple-500 rounded-full opacity-20 top-8 left-8"></div>
              <div className="parallax-blob absolute w-20 h-20 bg-blue-500 rounded-full opacity-20 top-24 left-40"></div>
              <div className="parallax-blob absolute w-28 h-28 bg-pink-500 rounded-full opacity-20 bottom-8 left-20"></div>
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
              <div className="parallax-blob absolute w-40 h-40 bg-blue-500 rounded-full opacity-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="parallax-blob absolute w-24 h-24 bg-purple-500 rounded-full opacity-20 top-1/4 left-1/4"></div>
              <div className="parallax-blob absolute w-20 h-20 bg-pink-500 rounded-full opacity-20 bottom-1/4 right-1/4"></div>
            </div>

            <TiltCard className="space-y-6 p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/30 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-white">
                <AnimatedTextReveal text="Our Mission" />
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {siteContent.about.mission}
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <AnimatedValueCards values={siteContent.about.values} />

      {/* Stats Section */}
      <AnimatedStats />

      {/* Team Section */}
      <Team />

      {/* Timeline Section */}
      <section className="py-20 bg-gray-900 relative animate-section">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            <AnimatedTextReveal text="Our Process" />
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            {siteContent.about.timelineInfo}
          </p>
          <AdvancedTimeline />
        </div>
      </section>

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

        .animate-float-1 {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float 7s ease-in-out infinite 1s;
        }

        .animate-float-3 {
          animation: float 8s ease-in-out infinite 2s;
        }

        .animate-float-4 {
          animation: float 9s ease-in-out infinite 3s;
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
      `}</style>

      <Footer />
    </div>
  );
};

export default About;
