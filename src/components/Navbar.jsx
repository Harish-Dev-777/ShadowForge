import { Link, NavLink, useLocation } from "react-router-dom";
import { siteContent } from "../contents";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [loc.pathname]);

  // Animate navbar elements on mount
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    gsap.fromTo(
      buttonRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1,0.7)",
        delay: 0.6,
      }
    );
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (open) {
      // Show mobile menu with animation
      gsap.to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        onStart: () => {
          menuRef.current.style.display = "flex";
        },
      });

      // Animate menu items with better stagger and easing
      gsap.fromTo(
        ".mobile-nav-item",
        { y: -15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.2)",
          delay: 0.15,
        }
      );
    } else {
      // Hide mobile menu with animation
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          menuRef.current.style.display = "none";
        },
      });
    }
  }, [open]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(13,6,16,0.95)] backdrop-blur-xl border-b border-[#3a1c5a] shadow-2xl"
          : "bg-transparent"
      }`}
      style={{
        // Hide scrollbar and prevent white line
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* Hide scrollbar for WebKit browsers */}
      <style>
        {`
          header::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          ref={logoRef}
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 transition-all duration-300"
        >
          {siteContent.logo}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {siteContent.nav.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item relative text-sm transition-all duration-300 pb-1 ${
                  isActive
                    ? "text-[var(--accent)] font-semibold"
                    : "text-[#cbd5e1] hover:text-[var(--accent)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA Magic Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            ref={buttonRef}
            to="/contact"
            className="magic-button group relative overflow-hidden px-10 py-4 rounded-full font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {/* ShadowForge effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 group-hover:from-indigo-600 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-500 rounded-full"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>

            {/* Animated glow effect */}
            <span className="absolute -inset-2 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-xl group-hover:animate-pulse transition-all duration-700 rounded-full"></span>

            {/* ShadowForge shadow */}
            <span className="absolute inset-0 shadow-[0_0_15px_rgba(139,92,246,0.5),0_0_30px_rgba(147,51,234,0.3),0_0_45px_rgba(236,72,153,0.2)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6),0_0_40px_rgba(147,51,234,0.4),0_0_60px_rgba(236,72,153,0.3)] transition-all duration-500 rounded-full"></span>

            {/* Shadow text background */}
            <span className="absolute inset-0 flex items-center justify-center opacity-10 font-black text-xl">
              SHADOW
            </span>

            <span className="relative z-10 flex items-center pl-2 pr-1">
              {siteContent.hero?.navCta || "Free Consultation"}
              <svg
                className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#cbd5e1] hover:text-[var(--accent)] transition-colors duration-300 p-2 rounded-lg hover:bg-white/5"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden bg-[rgba(13,6,16,0.98)] backdrop-blur-xl border-t border-[#3a1c5a] overflow-hidden flex flex-col items-center justify-center"
        style={{
          display: "none",
          height: 0,
          opacity: 0,
          // Hide scrollbar for mobile menu
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hide scrollbar for WebKit browsers in mobile menu */}
        <style>
          {`
            .mobile-menu-container::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className="mobile-menu-container w-full px-6 py-8 flex flex-col items-center">
          {siteContent.nav.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="mobile-nav-item w-full text-center py-4 text-xl font-medium text-[#cbd5e1] hover:text-[var(--accent)] transition-all duration-300 border-b border-white/5 last:border-b-0"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mobile-nav-item w-full mt-6 magic-button text-center group relative overflow-hidden px-6 py-4 rounded-full font-semibold text-white transition-all duration-500"
          >
            {/* Enhanced mobile button with ShadowForge effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 group-hover:from-indigo-600 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-500 rounded-full"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>

            {/* ShadowForge shadow for mobile */}
            <span className="absolute inset-0 shadow-[0_0_10px_rgba(139,92,246,0.4),0_0_20px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5),0_0_30px_rgba(147,51,234,0.4)] transition-all duration-500 rounded-full"></span>

            <span className="relative z-10 px-2">
              {siteContent.hero?.navCta || "Free Consultation"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
