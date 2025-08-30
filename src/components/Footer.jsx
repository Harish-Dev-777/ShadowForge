import { Link, useLocation } from "react-router-dom";
import { siteContent } from "../contents";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Importing React Icons for better consistency
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaDribbble,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  const location = useLocation();
  const footerRef = useRef();
  const isContactPage = location.pathname === "/contact";
  const [isVisible, setIsVisible] = useState(false);
  const magneticRefs = useRef([]);

  // Social media data
  const socialMedia = [
    // {
    //   name: "Twitter",
    //   icon: <FaTwitter />,
    //   url: "#",
    //   color: "hover:text-blue-400",
    // },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "#",
      color: "hover:text-pink-500",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "#",
      color: "hover:text-gray-300",
    },
    // {
    //   name: "Dribbble",
    //   icon: <FaDribbble />,
    //   url: "#",
    //   color: "hover:text-pink-600",
    // },
    {
      name: "Email",
      icon: <FaEnvelope />,
      url: `mailto:${siteContent.contact.email}`,
      color: "hover:text-red-400",
    },
  ];

  // Enhanced magnetic animation effect
  useEffect(() => {
    const magneticElements = document.querySelectorAll(".magnetic");

    const handleMouseMove = (e) => {
      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
        const maxDistance = 100;

        if (distance < maxDistance) {
          const strength = 1 - distance / maxDistance;
          gsap.to(el, {
            x: distanceX * 0.15 * strength,
            y: distanceY * 0.15 * strength,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Navigate to page and scroll to top
  const navigateToPage = (path) => {
    if (location.pathname === path) {
      scrollToTop();
    } else {
      setTimeout(scrollToTop, 100);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Show footer immediately but animate elements
      gsap.set(footerRef.current, { opacity: 1, y: 0 });

      // Create water wave effect
      const waveTl = gsap.timeline({ repeat: -1 });
      waveTl
        .to(".wave-layer", {
          attr: { d: "M0,80 Q250,100 500,80 T1000,80 V100 H0 Z" },
          duration: 8,
          ease: "sine.inOut",
        })
        .to(".wave-layer", {
          attr: { d: "M0,80 Q250,60 500,80 T1000,80 V100 H0 Z" },
          duration: 8,
          ease: "sine.inOut",
        });

      // Animate footer elements with smooth stagger
      gsap.fromTo(
        ".footer-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate social icons with enhanced effects
      gsap.fromTo(
        ".social-icon",
        { scale: 0, rotation: -10 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Set up scroll trigger to detect when footer is in view
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 95%",
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Interactive Link Component
  const FooterLink = ({ to, children, className = "" }) => {
    return (
      <Link
        to={to}
        className={`relative py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300 group ${className}`}
        onClick={() => navigateToPage(to)}
      >
        <span className="relative z-10 flex items-center">
          <span className="inline-block mr-2 text-purple-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
            <FaArrowRight size={12} />
          </span>
          {children}
        </span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    );
  };

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-gray-950 to-black text-gray-300 relative overflow-hidden "
    >
      {/* Water wave effect */}
      <div className="absolute -top-1 left-0 w-full h-12 pointer-events-none">
        <svg
          viewBox="0 0 1000 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            className="wave-layer"
            d="M0,80 Q250,80 500,80 T1000,80 V100 H0 Z"
            fill="rgba(15, 23, 42, 1)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {/* Brand Section */}
        <div className="footer-element">
          <div className="flex items-center mb-4">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full mr-3"></div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {siteContent.logo}
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            {siteContent.footer.small}
          </p>

          <div className="mt-4 space-y-2">
            <p className="text-sm flex items-center">
              <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {siteContent.contact.email}
              </a>
            </p>
            <p className="text-sm flex items-center">
              <span className="text-gray-400 mr-2">📞</span>
              <a
                href={`tel:${siteContent.contact.phone}`}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {siteContent.contact.phone}
              </a>
            </p>
          </div>

          {/* Social Links with magnetic effect */}
          <div className="mt-6 flex space-x-3">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                ref={(el) => (magneticRefs.current[index] = el)}
                href={social.url}
                className={`social-icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 magnetic ${social.color} hover:scale-110`}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-element">
          <h4 className="font-semibold text-white mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2">
            {siteContent.nav.map((n, i) => (
              <li key={i}>
                <FooterLink to={n.path}>{n.name}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-element">
          <h4 className="font-semibold text-white mb-4 text-lg">
            Our Services
          </h4>
          <ul className="space-y-2">
            {siteContent.footer.services.map((service, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                <span className="text-sm text-gray-300">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact CTA */}
        {!isContactPage && (
          <div className="footer-element">
            <h4 className="font-semibold text-white mb-4 text-lg">
              Get Started
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Ready to start your project? Contact us for a free estimate.
            </p>

            <Link
              to="/contact"
              onClick={() => navigateToPage("/contact")}
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 magnetic hover:scale-105"
            >
              Start Your Project
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Fixed floating mail icon with magnetic effect */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`mailto:${siteContent.contact.email}`}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg transition-all duration-300 magnetic hover:scale-110"
          aria-label="Contact us via email"
        >
          <FaEnvelope className="w-5 h-5" />
        </a>
      </div>

      {/* Back to Top Button with magnetic effect */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:bg-gray-700 z-40 magnetic hover:scale-110"
          aria-label="Back to top"
        >
          <FaArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} {siteContent.footer.copyright} · All
              rights reserved
            </div>
            <div className="flex space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
