import { useState, useRef, useEffect } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Link} from 'react-router-dom'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqRef = useRef(null);
  const itemsRef = useRef([]);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      // Smooth closing animation
      const timeline = gsap.timeline();

      timeline
        .to(itemsRef.current[index].querySelector(".faq-answer"), {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          itemsRef.current[index].querySelector("svg"),
          {
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .set(itemsRef.current[index], {
          borderColor: "rgba(55, 65, 81, 0.5)",
        })
        .set(itemsRef.current[index].querySelector(".faq-question"), {
          color: "#ffffff",
        })
        .call(() => setActiveIndex(null));
    } else {
      // If another FAQ is open, close it first with smooth animation
      if (activeIndex !== null) {
        const closeTimeline = gsap.timeline();

        closeTimeline
          .to(itemsRef.current[activeIndex].querySelector(".faq-answer"), {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          })
          .to(
            itemsRef.current[activeIndex].querySelector("svg"),
            {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .set(itemsRef.current[activeIndex], {
            borderColor: "rgba(55, 65, 81, 0.5)",
          })
          .set(itemsRef.current[activeIndex].querySelector(".faq-question"), {
            color: "#ffffff",
          });
      }

      // Open new FAQ
      setActiveIndex(index);

      // Use a timeout to allow the state to update and DOM to change
      setTimeout(() => {
        const answerElement =
          itemsRef.current[index].querySelector(".faq-answer");
        const answerContent = answerElement.querySelector("div");

        // Get the natural height of the content
        const contentHeight = answerContent.offsetHeight;

        // Create smooth opening animation timeline
        const openTimeline = gsap.timeline();

        openTimeline
          .set(answerElement, {
            height: 0,
            opacity: 0,
          })
          .to(
            itemsRef.current[index].querySelector("svg"),
            {
              rotation: 180,
              duration: 0.5,
              ease: "back.out(1.5)",
            },
            0
          )
          .to(
            answerElement,
            {
              height: contentHeight,
              duration: 0.6,
              ease: "power2.out",
            },
            0.1
          )
          .to(
            answerElement,
            {
              opacity: 1,
              duration: 0.4,
              ease: "power1.out",
            },
            0.2
          );
      }, 10);
    }
  };

  useEffect(() => {
    // Animation for section heading with smoother easing
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for description with smoother easing
    gsap.fromTo(
      descriptionRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Smoother animation for FAQ items with better staggering
    gsap.fromTo(
      itemsRef.current,
      { y: 70, opacity: 0, rotationX: -5 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.02,
        duration: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Smoother animation for CTA section
    gsap.fromTo(
      ctaRef.current,
      { y: 50, opacity: 1, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Smoother background elements animation
    const bgElements = faqRef.current.querySelectorAll(".bg-element");
    gsap.to(bgElements, {
      y: 40,
      duration: 25,
      repeat: -1,
      yoyo: true,
      stagger: 4,
      ease: "sine.inOut",
    });

    // Enhanced hover effect for FAQ items
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const question = item.querySelector(".faq-question");
      const icon = item.querySelector("svg");

      item.addEventListener("mouseenter", () => {
        if (activeIndex !== index) {
          gsap.to(item, {
            borderColor: "rgba(139, 92, 246, 0.6)",
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(question, {
            color: "#ddd6fe",
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      });

      item.addEventListener("mouseleave", () => {
        if (activeIndex !== index) {
          gsap.to(item, {
            borderColor: "rgba(55, 65, 81, 0.5)",
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(question, {
            color: "#ffffff",
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [activeIndex]);

  return (
    <section
      ref={faqRef}
      className="py-20 px-6 bg-gradient-to-br from-gray-950 to-black relative overflow-hidden"
      id="faq"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.15] overflow-hidden pointer-events-none">
        <div className="bg-element absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl"></div>
        <div className="bg-element absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="bg-element absolute top-2/3 left-1/3 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl"></div>
      </div>

      {/* Floating particles with smoother animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-500/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-full h-full bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {siteContent.faq.heading}
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            {siteContent.faq.description}
          </p>
        </div>

        <div className="space-y-6">
          {siteContent.faq.items.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="faq-item border-b border-gray-800 pb-6 transition-all duration-300"
            >
              <button
                className="flex justify-between items-center w-full text-left py-4 focus:outline-none group"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="faq-question text-lg md:text-xl font-semibold text-white pr-4 transition-colors duration-300">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 ml-4 transform transition-transform duration-300">
                  <svg
                    className={`w-6 h-6 text-purple-400 transition-all duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </span>
              </button>
              <div
                className="faq-answer overflow-hidden transition-all duration-300"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800 relative overflow-hidden">
            {/* CTA background effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl"></div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto relative z-10">
              We're here to help you with any questions about our services,
              pricing, or process.
            </p>
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 inline-block relative z-10 hover:scale-105 transform"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-item {
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .faq-question {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQ;
