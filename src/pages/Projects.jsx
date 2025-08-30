import React, { useEffect, useRef } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title with a cool effect
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate each project card with staggered effects
      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        // Set initial state
        gsap.set(project, { y: 100, opacity: 0, rotationY: -15 });

        // Create animation
        gsap.to(project, {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        });

        // Hover effect
        project.addEventListener("mouseenter", () => {
          gsap.to(project, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(project, {
            y: 0,
            scale: 1,
            duration: 0.3,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
          });
        });
      });

      // Parallax effect for background elements
      gsap.to(".parallax-bg-1", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".parallax-bg-2", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-950 to-black py-20 px-6 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.15] overflow-hidden">
        <div className="parallax-bg-1 absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="parallax-bg-2 absolute bottom-1/3 right-1/4 w-80 md:w-[500px] h-80 md:h-[500px] bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6 transform-gpu"
          >
            Our <span className="text-purple-400">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our portfolio of innovative digital solutions that have
            helped businesses transform their online presence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="project-card group rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 overflow-hidden shadow-2xl transform-gpu"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 w-full">
                    <button className="w-full py-2 bg-white text-gray-900 font-semibold rounded-lg transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      View Project
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Timeline */}
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 极速加速器 0 0118 0z"
                    ></path>
                  </svg>
                  {project.timeline}
                </div>

                {/* Tech Stack (simulated) */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React", "Node.js", "MongoDB", "Tailwind"].map(
                    (tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .project-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            rgba(139, 92, 246, 0.1),
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .project-card:hover::before {
          opacity: 1;
        }
      `}</style>
      <Footer/>
    </section>
  );
}
