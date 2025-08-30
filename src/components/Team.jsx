// src/components/Team.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "../contents";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const containerRef = useRef(null);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate team members on scroll with staggered delay
      gsap.fromTo(
        ".team-member",
        {
          y: 100,
          opacity: 0,
          rotationY: -15,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate section title
      gsap.fromTo(
        ".team-title",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add floating animation to cards
      gsap.to(".team-member", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Advanced Team Card with 3D effects
  const AdvancedTeamCard = ({ member, index }) => {
    const cardRef = useRef(null);
    const contentRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
      if (!cardRef.current) return;

      const card = cardRef.current;

      // 3D tilt effect on mouse move
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

        // Parallax effect for content
        gsap.to(contentRef.current, {
          y: (y - centerY) / 20,
          duration: 0.5,
          ease: "power2.out",
        });

        // Animate glow position
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            x: (x - centerX) / 5,
            y: (y - centerY) / 5,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });

        gsap.to(contentRef.current, {
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <div
        ref={cardRef}
        className="team-member group relative w-full h-96 perspective-1000"
        onMouseEnter={() => setActiveMember(index)}
        onMouseLeave={() => setActiveMember(null)}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
        </div>

        {/* Main card content */}
        <div className="relative h-full bg-gray-900 rounded-3xl p-6 overflow-hidden transform-gpu transition-all duration-500 group-hover:bg-gray-850">
          {/* Animated glow effect */}
          <div
            ref={glowRef}
            className="absolute -inset-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          ></div>

          {/* Content container with parallax effect */}
          <div
            ref={contentRef}
            className="relative h-full flex flex-col items-center justify-center"
          >
            {/* Profile image/avatar */}
            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-4xl font-bold z-10">
                {member.name.charAt(0)}
              </div>

              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-indigo-600 bg-opacity-90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 p-4">
                <div className="text-center">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="block text-xs text-white py-1 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Member info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400">
                {member.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {member.role}
              </p>

              {/* Skills tags with hover animation */}
              <div className="flex flex-wrap justify-center gap-2">
                {member.skills.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full transform-gpu transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social links/CTA (appears on hover) */}
            {/* <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex space-x-3">
              <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-colors duration-300">
                <span className="text-sm">📧</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-colors duration-300">
                <span className="text-sm">💼</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* Connection line when a card is active */}
        {activeMember === index && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="py-20 bg-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <h2 className="team-title text-4xl md:text-5xl font-bold text-center text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Meet Our Team
          </span>
        </h2>

        <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Talented professionals dedicated to bringing your vision to life
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {siteContent.team.map((member, index) => (
            <AdvancedTeamCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Team stats */}
        {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">50+</div>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">12</div>
            <p className="text-gray-400">Team Members</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 mb-2">99%</div>
            <p className="text-gray-400">Client Satisfaction</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 mb-2">5+</div>
            <p className="text-gray-400">Years Experience</p>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Team;
