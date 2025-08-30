import { useEffect, useRef, useState } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const ref = useRef();
  const servicesRef = useRef([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Reduced startup-friendly pricing
  const startupPricing = [
    "₹12,000 (Startup Offer)",
    "₹20,000 (Startup Offer)",
    "₹9,500 (Startup Offer)",
    "₹18,000 (Startup Offer)",
    "₹28,000 (Startup Offer)",
    "From ₹3,500/month",
  ];

  useEffect(() => {
    // Check device type
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      const heroChars = gsap.utils.toArray(".section-heading-char");
      gsap.fromTo(
        heroChars,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.03,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      // Card animations
      const serviceCards = gsap.utils.toArray(".service-card");
      serviceCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Add hover animation for cards
        if (!isMobile) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.03,
              duration: 0.3,
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
            });
          });
        }
      });

      // Timeline animation
      const processSteps = gsap.utils.toArray(".process-step");

      processSteps.forEach((step, index) => {
        gsap.fromTo(
          step,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Number animation
        const number = step.querySelector(".process-number");
        if (number) {
          gsap.fromTo(
            number,
            { scale: 0, rotation: -180, opacity: 0 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1,
              delay: index * 0.2 + 0.2,
              ease: "elastic.out(1.2, 0.8)",
              scrollTrigger: {
                trigger: number,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // SVG drawing animation
      gsap.utils.toArray(".svg-draw").forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
          },
          {
            strokeDashoffset: 0,
            duration: 1,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: path,
              start: isMobile ? "top 95%" : "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Background elements animation
      gsap.to(".floating-bg", {
        y: 30,
        rotation: 5,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // CTA animation
      const ctaSection = document.querySelector(".cta-section");
      if (ctaSection) {
        gsap.to(ctaSection, {
          y: 30,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [isMobile]);

  const handleContactNavigation = () => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      gsap.to(mainContent, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => navigate("/contact"),
      });
    } else {
      navigate("/contact");
    }
  };

  // Function to split text into characters for animation
  const splitTextIntoChars = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="section-heading-char inline-block">
        {char}
      </span>
    ));
  };

  // Spotlight Card Component
  const SpotlightCard = ({ children, className = "" }) => {
    return (
      <div
        className={`relative h-full rounded-3xl bg-gradient-to-br from-gray-900/80 to-black/80 p-6 md:p-8 border border-gray-700/30 overflow-hidden ${className}`}
      >
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Purple glow effect */}
        <div className="absolute -inset-1 bg-purple-500/10 blur-lg group-hover:bg-purple-500/20 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

        {children}
      </div>
    );
  };

  // Timeline Item Component
  const TimelineItem = ({ step, index, isMobile }) => {
    return (
      <div className="process-step relative">
        {/* Mobile layout */}
        {isMobile ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl shadow-purple-500/50 mb-6 process-number z-10">
              {index + 1}
            </div>
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 p-6 rounded-3xl border border-gray-700/50 shadow-2xl w-full">
              <h4 className="text-xl font-extrabold text-white mb-3">
                {step.title}
              </h4>
              <p className="text-white mb-3 text-base leading-relaxed">
                {step.description}
              </p>
              <div className="text-purple-300 font-bold text-sm">
                {step.duration}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop/Tablet layout */
          <div className="flex items-start gap-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl shadow-purple-500/50 process-number flex-shrink-0 z-10">
              {index + 1}
            </div>
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 p-6 md:p-8 rounded-3xl border border-gray-700/50 shadow-2xl flex-1">
              <h4 className="text-xl md:text-2xl font-extrabold text-white mb-3 md:mb-4">
                {step.title}
              </h4>
              <p className="text-white mb-3 md:mb-4 text-base md:text-lg leading-relaxed">
                {step.description}
              </p>
              <div className="text-purple-300 font-bold text-sm md:text-base">
                {step.duration}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Service Icon Component
  const ServiceIcon = ({ index }) => {
    const icons = [
      // Custom Website Design
      <svg
        className="service-svg w-12 h-12 md:w-16 md:h-16 text-purple-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" className="svg-draw" />
        <path d="M3 9h18" className="svg-draw" />
        <path d="M9 21V9" className="svg-draw" />
      </svg>,

      // Web & App Development
      <svg
        className="service-svg w-12 h-12 md:w-16 md:h-16 text-blue-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" className="svg-draw" />
        <path
          d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"
          className="svg-draw"
        />
        <path d="M2 2l7.586 7.586" className="svg-draw" />
      </svg>,

      // UI/UX Strategy
      <svg
        className="service-svg w-12 h-12 md:w-16 md:h-16 text-pink-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 8l4 4-4 4M7 8l-4 4 4 4" className="svg-draw" />
        <line x1="12" y1="2" x2="12" y2="22" className="svg-draw" />
      </svg>,

      // Backend & API Development
      <svg
        className="service-svg w-12 h-12 md:w-16 md:h-16 text-green-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" className="svg-draw" />
        <rect x="2" y="14" width="20" height="8" rx="2" className="svg-draw" />
        <line x1="6" y1="6" x2="6" y2="6" className="svg-draw" />
        <line x1="6" y1="18" x2="6" y2="18" className="svg-draw" />
      </svg>,

      // E-Commerce Development
      <svg
        className="service-svg w-12 h-12 md:w-16 md:h-16 text-yellow-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" className="svg-draw" />
        <circle cx="20" cy="21" r="1" className="svg-draw" />
        <path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
          className="svg-draw"
        />
      </svg>,

      // Maintenance & Growth
      <svg
        className="service-svg w-12 h-12 md:w-16 md:h-16 text-cyan-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          className="svg-draw"
        />
      </svg>,
    ];

    return icons[index] || icons[0];
  };

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden bg-gradient-to-br from-gray-950 to-black"
    >
      {/* Hero Section */}
      <div className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="floating-bg absolute top-20 left-20 w-80 h-80 bg-purple-600 rounded-full filter blur-4xl"></div>
          <div className="floating-bg absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full filter blur-4xl"></div>
          <div className="floating-bg absolute top-1/2 left-1/4 w-64 h-64 bg-pink-600 rounded-full filter blur-4xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h2 className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 md:mb-8">
            {splitTextIntoChars(siteContent.services.heading)}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-300 font-bold mb-4 md:mb-6">
            Startup-Friendly Pricing • Premium Quality • Rapid Delivery
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed max-w-3xl mx-auto">
            {siteContent.services.description}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 md:w-8 md:h-12 border-4 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-2 md:h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Services Grid with Spotlight Cards */}
      <div className="services-grid py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center mb-12 md:mb-16">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Services
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {siteContent.services.list.map((service, index) => (
              <div
                key={service.title}
                ref={(el) => (servicesRef.current[index] = el)}
                className="service-card group"
              >
                <SpotlightCard>
                  <div className="relative z-10">
                    <div className="text-center mb-4 lg:mb-6">
                      <ServiceIcon index={index} />
                    </div>

                    <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-3 lg:mb-4 text-center">
                      {service.title}
                    </h3>

                    <p className="text-white mb-4 lg:mb-6 leading-relaxed text-center text-base lg:text-lg">
                      {service.desc}
                    </p>

                    <ul className="mb-4 lg:mb-6 space-y-2">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center text-xs lg:text-sm text-white"
                        >
                          <svg
                            className="w-3 h-3 lg:w-4 lg:h-4 mr-2 text-green-300 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-between items-center pt-3 lg:pt-4 border-t border-gray-700/50">
                      <div className="flex items-center text-xs lg:text-sm text-white">
                        <svg
                          className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {service.timeline}
                      </div>
                      <div className="text-xs lg:text-sm font-bold text-purple-300">
                        {startupPricing[index]}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="process-section relative py-20 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center mb-12 md:mb-20">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Seamless
            </span>{" "}
            Process
          </h3>

          <div className="space-y-16 md:space-y-24">
            {siteContent.process.steps.map((step, index) => (
              <TimelineItem
                key={index}
                step={step}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section relative py-12 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex flex-col items-center gap-6 md:gap-8 p-6 md:p-12 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-3xl border border-gray-700/50 backdrop-blur-lg shadow-2xl w-full">
            <h4 className="text-2xl md:text-3xl font-extrabold text-white text-center">
              Ready to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Build Your Vision
              </span>
              ?
            </h4>
            <p className="text-white text-base md:text-xl text-center max-w-2xl leading-relaxed">
              Let's discuss your project with our startup-friendly approach and
              transparent pricing
            </p>
            <Link
              to="/contact"
              onClick={() => navigateToPage("/contact")}
              className="px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-extrabold text-base md:text-lg hover:shadow-3xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-heading-char {
          transform-origin: 50% 100%;
        }

        /* Smooth scrolling for mobile */
        @media (max-width: 1023px) {
          html {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </section>
  );
}
