import { Link, NavLink, useLocation } from "react-router-dom";
import { siteContent } from "../contents";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const loc = useLocation();
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const timelineRef = useRef(null);
  const menuTopRef = useRef(null);
  const menuMiddleRef = useRef(null);
  const menuBottomRef = useRef(null);

  // Center the navbar on mount and resize
  useEffect(() => {
    const centerNavbar = () => {
      if (navRef.current) {
        navRef.current.style.left = "50%";
        navRef.current.style.transform = "translateX(-50%)";
      }
    };

    // Center initially
    centerNavbar();

    // Center on resize
    window.addEventListener("resize", centerNavbar);

    return () => {
      window.removeEventListener("resize", centerNavbar);
    };
  }, []);

  // Enhanced scroll detection with center alignment maintained
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 10;
      setScrolled(isScrolled);

      // Maintain center alignment while applying scroll effects
      if (navRef.current) {
        const translateY = isScrolled ? -5 : 0;
        const blurAmount = Math.min(20, scrollY / 5);
        const opacityAmount = Math.min(0.95, 0.85 + scrollY / 2000);

        gsap.to(navRef.current, {
          y: translateY,
          duration: 0.6,
          ease: "power2.out",
        });

        navRef.current.style.backdropFilter = `blur(${blurAmount}px)`;
        navRef.current.style.backgroundColor = `rgba(0, 0, 0, ${
          opacityAmount * 0.9
        })`;
        navRef.current.style.borderColor = `rgba(139, 92, 246, ${
          0.1 + scrollY / 1000
        })`;

        // Ensure center alignment is maintained
        navRef.current.style.left = "50%";
        navRef.current.style.transform = "translateX(-50%)";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  // GSAP animations timeline
  useEffect(() => {
    timelineRef.current = gsap.timeline();

    // Logo animation
    timelineRef.current.fromTo(
      logoRef.current,
      { y: -30, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
        delay: 0.2,
      }
    );

    // Nav items animation with staggered delay
    timelineRef.current.fromTo(
      ".nav-item",
      { y: -25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.5,
      },
      "<+=0.3"
    );

    // CTA button animation
    timelineRef.current.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
      },
      "<+=0.2"
    );

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Enhanced button animations with purple-pink color fade
  const handleButtonHover = (isHovering) => {
    const button = buttonRef.current;
    if (!button) return;

    const buttonFill = button.querySelector(".button-fill");
    const buttonText = button.querySelector(".button-text");
    const buttonBorder = button.querySelector(".button-border");

    if (isHovering) {
      // Color fade animation to purple-pink
      gsap.to(buttonFill, {
        backgroundColor: "rgba(139, 92, 246, 1)",
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(buttonText, {
            color: "#fff",
            duration: 0.2,
          });
        },
      });

      // Border animation
      gsap.to(buttonBorder, {
        borderColor: "rgba(192, 132, 252, 0.8)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Button lift effect
      gsap.to(button, {
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Reverse color fade animation
      gsap.to(buttonFill, {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        duration: 0.4,
        ease: "power2.out",
        onStart: () => {
          gsap.to(buttonText, {
            color: "#fff",
            duration: 0.1,
          });
        },
      });

      // Reverse border effect
      gsap.to(buttonBorder, {
        borderColor: "rgba(139, 92, 246, 0.5)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Reset button position
      gsap.to(button, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Handle nav item hover with purple-pink color fade effect
  const handleNavHover = (event, isHovering, index) => {
    const target = event.target;

    if (isHovering) {
      // Color fade and lift effect on hovered item
      gsap.to(target, {
        y: -2,
        color: "#c084fc", // Light purple-pink
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Reset position and color
      gsap.to(target, {
        y: 0,
        color: "#fff", // White text
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Animate hamburger menu with purple-pink transformation
  useEffect(() => {
    if (open) {
      // Transform hamburger to X with purple-pink color
      gsap.to(menuTopRef.current, {
        y: 8,
        rotate: 45,
        backgroundColor: "#c084fc",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(menuMiddleRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(menuBottomRef.current, {
        y: -8,
        rotate: -45,
        backgroundColor: "#c084fc",
        duration: 0.3,
        ease: "power2.out",
      });

      // Show mobile menu with animation
      gsap.to(menuRef.current, {
        height: "100vh",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        onStart: () => {
          menuRef.current.style.display = "flex";
          document.body.style.overflow = "hidden";
        },
      });

      // Animate menu items with better stagger and easing
      gsap.fromTo(
        ".mobile-nav-item",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );

      // Animate mobile CTA button
      gsap.fromTo(
        ".mobile-cta-button",
        {
          scale: 0.8,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.4,
        }
      );
    } else {
      // Transform X back to hamburger
      gsap.to(menuTopRef.current, {
        y: 0,
        rotate: 0,
        backgroundColor: "#fff",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(menuMiddleRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.to(menuBottomRef.current, {
        y: 0,
        rotate: 0,
        backgroundColor: "#fff",
        duration: 0.3,
        ease: "power2.out",
      });

      // Hide mobile menu with animation
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          menuRef.current.style.display = "none";
          document.body.style.overflow = "auto";
        },
      });
    }
  }, [open]);

  return (
    <header
      ref={navRef}
      className="fixed top-4 z-50 transition-all duration-500 w-[95%] max-w-6xl rounded-2xl overflow-hidden"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        boxShadow:
          "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(139, 92, 246, 0.2)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Hide scrollbar for WebKit browsers */}
      <style>
        {`
          header::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div
          className="absolute -left-20 top-0 w-[140%] h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2), transparent)",
            filter: "blur(10px)",
            animation: "gradientMove 8s ease infinite",
          }}
        ></div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { transform: translateX(-20%); }
            50% { transform: translateX(20%); }
            100% { transform: translateX(-20%); }
          }
        `}
      </style>

      <div className="relative z-10 px-5 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo with purple-pink gradient */}
        <Link
          ref={logoRef}
          to="/"
          className="relative z-10 text-2xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500 group"
          onMouseEnter={(e) => {
            gsap.to(e.target, {
              y: -2,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.target, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
        >
          <span className="relative">{siteContent.logo}</span>
        </Link>

        {/* Desktop Nav with white text and purple-pink hover */}
        <nav className="hidden md:flex gap-8 items-center">
          {siteContent.nav.map((item, index) => (
            <div key={item.name} className="relative group">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-item relative text-lg transition-all duration-300 py-2 ${
                    isActive
                      ? "text-purple-300 font-medium"
                      : "text-white hover:text-purple-300"
                  }`
                }
                onMouseEnter={(e) => handleNavHover(e, true, index)}
                onMouseLeave={(e) => handleNavHover(e, false, index)}
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Purple-Pink CTA Button */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <button
            ref={buttonRef}
            className="relative overflow-hidden px-5 py-2.5 rounded-full font-medium transition-all duration-400 group"
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            onClick={() => (window.location.href = "/contact")}
          >
            {/* Fill effect */}
            <div
              className="button-fill absolute inset-0 bg-black rounded-full pointer-events-none transition-all duration-400"
              style={{ zIndex: -1 }}
            ></div>

            {/* Button text */}
            <span className="button-text relative z-10 flex items-center text-white text-sm">
              {siteContent.hero?.navCta || "Get Started"}
            </span>

            {/* Border with glow */}
            <div className="button-border absolute inset-0 rounded-full border border-purple-500 pointer-events-none transition-all duration-400"></div>
          </button>
        </div>

        {/* Purple-Pink Hamburger Menu */}
        <button
          className="md:hidden relative z-20 text-white transition-all duration-300 p-3 rounded-lg group"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <div
              ref={menuTopRef}
              className="w-full h-0.5 bg-white rounded-full transition-all duration-300 transform"
            ></div>
            <div
              ref={menuMiddleRef}
              className="w-full h-0.5 bg-white rounded-full transition-all duration-300"
            ></div>
            <div
              ref={menuBottomRef}
              className="w-full h-0.5 bg-white rounded-full transition-all duration-300 transform"
            ></div>
          </div>
        </button>
      </div>

      {/* Enhanced Mobile Menu with Attractive Design */}
      <div
        ref={menuRef}
        className="md:hidden bg-black backdrop-blur-2xl overflow-hidden flex flex-col items-center justify-center"
        style={{
          display: "none",
          height: 0,
          opacity: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          background: "rgba(0, 0, 0, 0.98)",
          backdropFilter: "blur(25px)",
        }}
      >
        {/* Decorative gradient elements */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/20 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-pink-900/20 to-transparent opacity-30"></div>

        <div className="mobile-menu-container w-full px-6 py-8 flex flex-col items-center overflow-y-auto relative z-10">
          {/* Mobile menu header with logo */}
          <div className="w-full flex justify-center mb-8">
            <Link
              to="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
              onClick={() => setOpen(false)}
            >
              {siteContent.logo}
            </Link>
          </div>

          {/* Navigation items with improved spacing and alignment */}
          <nav className="w-full flex flex-col space-y-2 mb-8">
            {siteContent.nav.map((item, index) => (
              <div
                key={item.name}
                className="w-full border-b border-purple-900/30 last:border-b-0"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `mobile-nav-item w-full text-center py-5 text-lg font-medium transition-all duration-300 relative group flex items-center justify-between
                    ${
                      isActive
                        ? "text-purple-300 bg-purple-900/20 rounded-lg"
                        : "text-white hover:text-purple-300"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="flex-1 text-center">{item.name}</span>
                  <span
                    className={`text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 mr-4
                    ${loc.pathname === item.path ? "opacity-100" : ""}`}
                  >
                    →
                  </span>
                </NavLink>
              </div>
            ))}
          </nav>

          {/* Enhanced CTA Button for Mobile */}
          <div className="w-full px-4 mt-4">
            <Link
              to="/contact"
              className="mobile-cta-button w-full text-center group relative overflow-hidden px-6 py-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500"></div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:animate-shine transition-all duration-1000"></div>
              </div>

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center">
                {siteContent.hero?.navCta || "Get Started"}
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
              </span>
            </Link>
          </div>

          {/* Social links or additional info */}
          <div className="w-full mt-8 text-center text-gray-400 text-sm">
            <p>Follow us on social media</p>
            <div className="flex justify-center space-x-4 mt-3">
              <a
                href="#"
                className="text-purple-400 hover:text-pink-400 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-purple-400 hover:text-pink-400 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-purple-400 hover:text-pink-400 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CSS for animations */}
      <style>
        {`
          @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          .group-hover\\:animate-shine {
            animation: shine 1.5s infinite;
          }
        `}
      </style>
    </header>
  );
}
