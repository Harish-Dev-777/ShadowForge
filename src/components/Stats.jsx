import React, { useEffect, useRef, useState, useCallback } from "react";

const Stats = () => {
  const [countersVisible, setCountersVisible] = useState(false);
  const counterRefs = useRef([]);
  const containerRef = useRef();
  const canvasRef = useRef();
  const animationRefs = useRef([]);

  // Counter data
  const stats = [
    { value: 10, label: "Projects Completed", suffix: "+" },
    { value: 98, label: "Client Satisfaction", suffix: "%" },
    { value: 95, label: "On Time Delivery", suffix: "%" },
    { value: 8, label: "Team Members", suffix: "+" },
  ];

  // Initialize counters when component mounts
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      // Clean up any running animations
      animationRefs.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  // Improved counter animation with easing and better performance
  const animateCounter = useCallback(
    (element, targetValue, suffix, duration = 1800) => {
      const startTime = performance.now();
      const startValue = 0;

      // Easing function for smooth animation
      const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeOutExpo(progress);

        const currentValue = Math.floor(
          startValue + (targetValue - startValue) * easedProgress
        );
        element.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          const animationId = requestAnimationFrame(updateCounter);
          animationRefs.current.push(animationId);
        } else {
          element.textContent = `${targetValue}${suffix}`;
        }
      };

      const animationId = requestAnimationFrame(updateCounter);
      animationRefs.current.push(animationId);
    },
    []
  );

  // Animate counters when they become visible
  useEffect(() => {
    if (!countersVisible) return;

    counterRefs.current.forEach((counter, index) => {
      if (!counter) return;
      animateCounter(counter, stats[index].value, stats[index].suffix);
    });
  }, [countersVisible, stats, animateCounter]);

  // Optimized nano-tech background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let lastFrameTime = 0;
    const frameRate = 1000 / 30; // 30fps

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(
        70,
        Math.floor((canvas.width * canvas.height) / 10000)
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          color: `hsl(${200 + Math.random() * 40}, 80%, 65%)`,
        });
      }
    };

    // Draw particles and connections
    const draw = (timestamp) => {
      if (!lastFrameTime) lastFrameTime = timestamp;
      const elapsed = timestamp - lastFrameTime;

      if (elapsed > frameRate) {
        lastFrameTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Pre-calculate positions
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;

          // Bounce off edges
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });

        // Draw connections with reduced frequency for performance
        ctx.strokeStyle = "rgba(100, 150, 255, 0.08)";
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i += 2) {
          for (let j = i + 2; j < particles.length; j += 2) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.globalAlpha = 0.1 * (1 - distance / 120);
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1;

        // Draw particles
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initialize and start animation
    resizeCanvas();
    initParticles();
    animationFrameId = requestAnimationFrame(draw);

    // Handle window resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      ref={containerRef}
    >
      {/* Nano-tech background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
        style={{ zIndex: 0 }}
      />

      {/* Enhanced glowing background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-4xl opacity-15 animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600 rounded-full filter blur-4xl opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-56 h-56 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Impact
            </span>{" "}
            in Numbers
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Delivering exceptional results through cutting-edge technology and
            innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-5 md:p-6 rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                background: "rgba(15, 15, 35, 0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(110, 90, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Enhanced holographic effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(110, 90, 255, 0.15), rgba(60, 180, 255, 0.15), rgba(110, 90, 255, 0.15))",
                  backgroundSize: "200% 200%",
                }}
              ></div>

              {/* Animated border effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(110, 90, 255, 0.6), transparent 70%)",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 3s ease infinite",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              ></div>

              {/* Glowing dot indicator */}
              <div
                className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 8px 2px rgba(72, 187, 120, 0.6)",
                }}
              ></div>

              <div className="relative z-10 text-center">
                <div
                  ref={(el) => (counterRefs.current[index] = el)}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #a78bfa, #60a5fa, #3b82f6)",
                    filter: "drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  0{stat.suffix}
                </div>
                <div className="text-gray-300 text-base md:text-lg font-medium mt-2">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center mt-14 md:mt-16">
          <div
            className="inline-block p-1 rounded-2xl group/btn transition-transform duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(45deg, #6e5aff, #00b3ff, #6e5aff)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 3s ease infinite",
              boxShadow: "0 0 20px rgba(110, 90, 255, 0.5)",
            }}
          >
            <button
              className="px-8 py-3 md:px-10 md:py-4 bg-gray-900 rounded-2xl text-white font-semibold text-base md:text-lg hover:bg-gray-800 transition-all duration-300 group-hover/btn:scale-105 flex items-center justify-center mx-auto"
              onClick={() => (window.location.href = "/contact")}
            >
              <span>Start Your Project</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>

          <p className="text-gray-400 mt-6 text-sm md:text-base">
            Trusted by industry leaders worldwide
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
