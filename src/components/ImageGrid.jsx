import { useRef, useEffect, useState } from "react";
import { siteContent } from "../contents";
import { gsap } from "gsap";

export default function ImageGrid() {
  const containerRef = useRef();
  const wrapRef = useRef();
  const animationRef = useRef();
  const cardsRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Filter projects based on active filter
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(siteContent.projects);
    } else {
      setFilteredProjects(
        siteContent.projects.filter(
          (project) => project.tags && project.tags.includes(activeFilter)
        )
      );
    }
  }, [activeFilter]);

  // Initialize animation
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || filteredProjects.length === 0) return;

    // Clear previous content
    wrap.innerHTML = "";

    // Create slides
    const slides = filteredProjects.map((project, index) => {
      const slide = document.createElement("div");
      slide.className = `grid-card ${
        isMobile ? "w-[180px] " : "w-[300px] md:w-[380px]"
      } flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 group relative`;

      slide.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0"></div>
        <div class="overflow-hidden relative z-10">
          <img
            src="${project.image}"
            alt="${project.title}"
            class="w-full h-48 md:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-4 md:p-5 relative z-10">
          <h3 class="font-semibold text-white text-base md:text-lg mb-1 md:mb-2 line-clamp-1">${
            project.title
          }</h3>
          <p class="text-gray-400 text-xs md:text-sm line-clamp-2 md:line-clamp-none">${
            project.description
          }</p>
          ${
            project.tags && project.tags.length > 0
              ? `
            <div class="mt-3 md:mt-4 flex flex-wrap gap-1 md:gap-2">
              ${project.tags
                .slice(0, isMobile ? 2 : 3)
                .map(
                  (tag) => `
                <span class="text-xs bg-purple-900/30 text-purple-200 px-2 py-1 rounded-full">${tag}</span>
              `
                )
                .join("")}
              ${
                project.tags.length > (isMobile ? 2 : 3)
                  ? `
                <span class="text-xs bg-gray-800/30 text-gray-400 px-2 py-1 rounded-full">
                  +${project.tags.length - (isMobile ? 2 : 3)}
                </span>
              `
                  : ""
              }
            </div>
          `
              : ""
          }
          <button class="mt-3 md:mt-4 text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-all flex items-center view-project-btn" data-index="${index}">
            View Project
            <svg class="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
        <div class="comet-trail absolute pointer-events-none z-5 w-[100px] h-[100px] bg-radial-gradient from-purple-500/60 via-transparent to-transparent rounded-full filter blur-[10px] opacity-0"></div>
      `;

      return slide;
    });

    // Double the content for seamless looping
    const originalContent = slides.map((slide) => slide.outerHTML).join("");
    wrap.innerHTML = originalContent + originalContent;

    // Add event listeners to the new buttons
    setTimeout(() => {
      const buttons = wrap.querySelectorAll(".view-project-btn");
      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = parseInt(e.currentTarget.getAttribute("data-index"));
          openLightbox(index);
        });
      });

      // Add mouse wheel event for horizontal scrolling
      const container = containerRef.current;
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
      }
    }, 0);

    const newSlides = gsap.utils.toArray(wrap.children);
    const gap = isMobile ? 16 : 24;
    const totalWidth =
      newSlides.reduce((acc, child) => acc + child.offsetWidth + gap, 0) - gap;

    // Set container width
    wrap.style.width = `${totalWidth}px`;

    // Create the infinite scroll animation
    const animate = () => {
      if (isHovered || isDragging) {
        // Apply momentum scrolling after drag
        if (Math.abs(velocity) > 0.1) {
          const deceleration = 0.95;
          const newVelocity = velocity * deceleration;
          setVelocity(newVelocity);

          const currentX = parseFloat(
            wrap.style.transform
              ?.replace("translateX(", "")
              .replace("px)", "") || 0
          );
          const newX = currentX + newVelocity;

          // Reset position when scrolled halfway
          if (Math.abs(newX) >= totalWidth / 2) {
            wrap.style.transform = `translateX(0px)`;
          } else {
            wrap.style.transform = `translateX(${newX}px)`;
          }
        }
      } else {
        // Auto-scroll when not interacting
        const currentX = parseFloat(
          wrap.style.transform?.replace("translateX(", "").replace("px)", "") ||
            0
        );
        let newX = currentX - (isMobile ? 0.8 : 1);

        // Reset position when scrolled halfway
        if (Math.abs(newX) >= totalWidth / 2) {
          newX = 0;
        }

        wrap.style.transform = `translateX(${newX}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const container = containerRef.current;
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isHovered, isDragging, isMobile, filteredProjects, velocity]);

  // Handle mouse wheel for horizontal scrolling
  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // Prevent vertical scrolling if we're scrolling horizontally
      e.preventDefault();

      const wrap = wrapRef.current;
      if (!wrap) return;

      const currentX = parseFloat(
        wrap.style.transform?.replace("translateX(", "").replace("px)", "") || 0
      );
      const newX = currentX - e.deltaY * 0.8;

      wrap.style.transform = `translateX(${newX}px)`;

      // Set velocity for momentum scrolling
      setVelocity(-e.deltaY * 0.8);
    }
  };

  // Handle mouse events for manual scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(
      parseFloat(
        wrapRef.current.style.transform
          ?.replace("translateX(", "")
          .replace("px)", "")
      ) || 0
    );
    setVelocity(0);
    setLastX(e.pageX);
    setLastTime(performance.now());
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentTime = performance.now();
    const currentX = e.pageX;
    const deltaX = currentX - lastX;
    const deltaTime = currentTime - lastTime;

    // Calculate velocity for momentum scrolling
    if (deltaTime > 0) {
      const newVelocity = (deltaX / deltaTime) * 16;
      setVelocity(newVelocity);
    }

    setLastX(currentX);
    setLastTime(currentTime);

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll multiplier

    // Apply smooth scrolling with easing
    gsap.to(wrapRef.current, {
      x: scrollLeft + walk,
      duration: 0.1,
      ease: "power1.out",
      overwrite: true,
    });
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(
      parseFloat(
        wrapRef.current.style.transform
          ?.replace("translateX(", "")
          .replace("px)", "")
      ) || 0
    );
    setVelocity(0);
    setLastX(e.touches[0].pageX);
    setLastTime(performance.now());
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentTime = performance.now();
    const currentX = e.touches[0].pageX;
    const deltaX = currentX - lastX;
    const deltaTime = currentTime - lastTime;

    // Calculate velocity for momentum scrolling
    if (deltaTime > 0) {
      const newVelocity = (deltaX / deltaTime) * 16;
      setVelocity(newVelocity);
    }

    setLastX(currentX);
    setLastTime(currentTime);

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    // Apply smooth scrolling with easing
    gsap.to(wrapRef.current, {
      x: scrollLeft + walk,
      duration: 0.1,
      ease: "power1.out",
      overwrite: true,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Comet card hover effect
  const handleCardHover = (e, index) => {
    if (isMobile) return; // Disable hover effects on mobile

    const card = e.currentTarget;
    if (!card) return;

    // Scale up the hovered card
    gsap.to(card, {
      scale: 1.05,
      zIndex: 10,
      duration: 0.3,
      ease: "power2.out",
    });

    // Create comet trail effect
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create comet element if it doesn't exist
    let comet = card.querySelector(".comet-trail");
    if (!comet) {
      comet = document.createElement("div");
      comet.className = "comet-trail";
      card.appendChild(comet);
    }

    // Animate comet trail
    gsap.fromTo(
      comet,
      {
        x: x - 50,
        y: y - 50,
        scale: 0,
        opacity: 1,
      },
      {
        x: x + 100,
        y: y + 100,
        scale: 2,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );
  };

  const handleCardLeave = (e, index) => {
    if (isMobile) return;

    const card = e.currentTarget;
    if (!card) return;

    // Reset card to normal state
    gsap.to(card, {
      scale: 1,
      zIndex: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Open lightbox with project details
  const openLightbox = (index) => {
    setCurrentImage(filteredProjects[index]);
    setShowLightbox(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Close lightbox
  const closeLightbox = () => {
    setShowLightbox(false);
    setCurrentImage(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  // Navigate between images in lightbox
  const navigateLightbox = (direction) => {
    if (!currentImage) return;

    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === currentImage.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredProjects.length;
    } else {
      newIndex =
        (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    }

    setCurrentImage(filteredProjects[newIndex]);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showLightbox) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateLightbox("next");
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLightbox, currentImage]);

  // Get unique tags from all projects
  const allTags = [
    ...new Set(siteContent.projects.flatMap((project) => project.tags || [])),
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-10 md:mb-12 px-4 relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white">Our Work</h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm md:text-base">
          A showcase of projects we've forged into reality with innovation and
          precision.
        </p>

        {/* Filter buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
          <button
            className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm transition-all ${
              activeFilter === "all"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Projects
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm transition-all ${
                activeFilter === tag
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden px-4 md:px-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Gradient overlays for belt-style effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-gray-900 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-gray-900 to-transparent z-20 pointer-events-none"></div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No projects found for this filter.
          </div>
        ) : (
          <div
            ref={wrapRef}
            className="flex gap-4 md:gap-6 will-change-transform"
          >
            {/* Content will be populated by useEffect */}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="text-center mt-6 text-gray-500 text-sm animate-pulse px-4">
        <span className="inline-block mr-2">←</span>
        {isMobile
          ? "Swipe to scroll • Auto-scrolls when idle"
          : "Hover to pause • Drag to scroll • Use mouse wheel"}
        <span className="inline-block ml-2">→</span>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && currentImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8">
          <div className="relative max-w-4xl w-full max-h-full overflow-auto">
            <button
              className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={closeLightbox}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={() => navigateLightbox("prev")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={() => navigateLightbox("next")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className="w-full h-auto max-h-[60vh] object-contain"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentImage.title}
                </h3>
                <p className="text-gray-300 mb-4">{currentImage.description}</p>

                {currentImage.tags && currentImage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentImage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-purple-900/30 text-purple-200 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {currentImage.link && (
                  <a
                    href={currentImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Visit Live Site
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles */}
      <style jsx>{`
        .bg-radial-gradient {
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.6) 0%,
            transparent 70%
          );
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
