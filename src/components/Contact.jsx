import { useState, useRef, useEffect } from "react";
import { siteContent } from "../contents";
import emailjs from "emailjs-com";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ContactInline() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [buttonState, setButtonState] = useState("idle");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const formRef = useRef();
  const sectionRef = useRef();
  const inputRefs = useRef([]);
  const floatingSvgRef = useRef();
  const mailIconRef = useRef();
  const circlesRef = useRef([]);
  const toastRef = useRef();

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    // Auto hide after 2 seconds
    setTimeout(() => {
      hideToast();
    }, 2000);
  };

  // Hide toast with animation
  const hideToast = () => {
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setToast({ show: false, message: "", type: "" });
        },
      });
    }
  };

  // Check if all fields are filled
  useEffect(() => {
    const filled =
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.message.trim();
    setAllFieldsFilled(filled);

    if (filled && buttonState === "idle") {
      // Change button to ready state when all fields are filled
      setButtonState("ready");
    } else if (!filled && buttonState === "ready") {
      // Revert to idle if fields are no longer all filled
      setButtonState("idle");
    }
  }, [form, buttonState]);

  // Animate toast when it appears
  useEffect(() => {
    if (toast.show && toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [toast.show]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(
        sectionRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate form elements with staggered effects
      gsap.fromTo(
        ".form-element",
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate input fields with focus effects
      inputRefs.current.forEach((input, index) => {
        if (input) {
          // Label animation
          const label = input.previousElementSibling;
          gsap.fromTo(
            label,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.5 + index * 0.15,
              ease: "power2.out",
            }
          );

          // Input field animation
          gsap.fromTo(
            input,
            {
              y: 30,
              opacity: 0,
              scaleX: 0.8,
            },
            {
              y: 0,
              opacity: 1,
              scaleX: 1,
              duration: 0.8,
              delay: 0.7 + index * 0.2,
              ease: "power3.out",
            }
          );
        }
      });

      // Animate floating SVG elements
      animateFloatingSVG();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateFloatingSVG = () => {
    // Mail icon floating animation
    gsap.to(mailIconRef.current, {
      y: -5,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Circles pulsing animation
    circlesRef.current.forEach((circle, index) => {
      if (circle) {
        gsap.to(circle, {
          scale: 1.1,
          opacity: 0.6,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.5,
          ease: "sine.inOut",
        });
      }
    });
  };

  const handleSvgHover = () => {
    // Scale up on hover
    gsap.to(floatingSvgRef.current, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
    });

    // Bounce mail icon on hover
    gsap.to(mailIconRef.current, {
      y: -8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleSvgLeave = () => {
    // Return to normal scale
    gsap.to(floatingSvgRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Return mail icon to normal position
    gsap.to(mailIconRef.current, {
      y: -5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMailClick = (e) => {
    e.preventDefault();
    window.open(`mailto:${siteContent.contact.email}`, "_blank");
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Phone validation function
  const validatePhone = (phone) => {
    // Basic phone validation - allows numbers, spaces, parentheses, hyphens, and plus sign
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return re.test(phone);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.message.trim()) {
      newErrors.message = "Project details are required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Please provide more details about your project";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Add input animation on focus
    const input = e.target;
    gsap.to(input, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setButtonState("error");
      setStatus("Please fix the errors above");

      // Show error toast
      showToast("Please fix the errors above", "error");

      // Shake animation for errors
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 5,
      });

      return;
    }

    setButtonState("loading");
    setStatus("Sending your message...");

    try {
      const { serviceID, templateID, publicKey } = siteContent.contact.emailJS;
      await emailjs.send(
        serviceID,
        templateID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          to_email: siteContent.contact.email,
          reply_to: form.email,
        },
        publicKey
      );

      setButtonState("success");
      setStatus(
        "Message sent successfully! We'll get back to you within 24 hours."
      );

      // Show success toast
      showToast("Message sent successfully!", "success");

      // Celebrate animation
      gsap.to(".form-element", {
        y: -10,
        duration: 0.2,
        stagger: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      // Reset form after success
      setTimeout(() => {
        setForm({ name: "", email: "", phone: "", message: "" });
        setButtonState("idle");
        setErrors({});
      }, 3000);
    } catch (err) {
      console.error("Email sending error:", err);
      setButtonState("error");
      setStatus(
        "Failed to send message. Please try again or contact us directly."
      );

      // Show error toast
      showToast("Failed to send message. Please try again.", "error");

      setTimeout(() => {
        setButtonState("idle");
      }, 3000);
    }
  };

  // Stateful Button Component with different states
  const StatefulButton = () => {
    return (
      <button
        type="submit"
        disabled={buttonState === "loading" || buttonState === "success"}
        className={`relative inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 ${
          buttonState === "idle"
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : buttonState === "ready"
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
            : buttonState === "loading"
            ? "bg-gray-700 text-gray-300"
            : buttonState === "success"
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
        }`}
      >
        <span className="relative z-10 flex items-center">
          {buttonState === "idle" && "Fill all fields to send"}
          {buttonState === "ready" && "Send Message"}
          {buttonState === "loading" && (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          )}
          {buttonState === "success" && (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Sent!
            </>
          )}
          {buttonState === "error" && (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Error
            </>
          )}
        </span>
      </button>
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="py-20 px-6 bg-gradient-to-br from-gray-950 to-black"
        id="contact"
      >
        <div
          ref={formRef}
          className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-700/50 relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-600 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-white">
              Let's Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Amazing
              </span>
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Share your vision and let's make it reality together
            </p>

            <form onSubmit={submit} className="space-y-6">
              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium">
                  Your Name *
                </label>
                <input
                  ref={(el) => (inputRefs.current[0] = el)}
                  name="name"
                  value={form.name}
                  onChange={change}
                  className={`w-full p-4 rounded-xl bg-gray-800/50 border outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-gray-700/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium">
                  Email Address *
                </label>
                <input
                  ref={(el) => (inputRefs.current[1] = el)}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  className={`w-full p-4 rounded-xl bg-gray-800/50 border outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-gray-700/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium">
                  Phone Number *
                </label>
                <input
                  ref={(el) => (inputRefs.current[2] = el)}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={change}
                  className={`w-full p-4 rounded-xl bg-gray-800/50 border outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-gray-700/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  }`}
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium">
                  Project Details *
                </label>
                <textarea
                  ref={(el) => (inputRefs.current[3] = el)}
                  name="message"
                  value={form.message}
                  onChange={change}
                  rows={5}
                  className={`w-full p-4 rounded-xl bg-gray-800/50 border outline-none transition-all duration-300 backdrop-blur-sm resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-gray-700/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  }`}
                  placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <div className="form-element text-center pt-4">
                <StatefulButton />
              </div>

              {status && (
                <div
                  className={`text-center text-sm mt-4 transition-all duration-300 ${
                    buttonState === "success"
                      ? "text-green-400"
                      : buttonState === "error"
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toast.show && (
        <div
          ref={toastRef}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg font-medium z-50 ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <div className="flex items-center">
            {toast.type === "success" ? (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}

      {/* Fixed Floating Mail SVG - Different Design */}
      <div
        ref={floatingSvgRef}
        className="fixed z-50 right-6 bottom-6 w-14 h-14 cursor-pointer"
        onMouseEnter={handleSvgHover}
        onMouseLeave={handleSvgLeave}
        onClick={handleMailClick}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#gradient)"
            opacity="0.9"
            filter="url(#glow)"
          />

          {/* Animated circles */}
          <circle
            ref={(el) => (circlesRef.current[0] = el)}
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Modern Mail Icon */}
          <g ref={mailIconRef} transform="translate(25, 25)">
            {/* Mail outline */}
            <rect
              x="5"
              y="10"
              width="40"
              height="30"
              rx="3"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
            />

            {/* Mail flap */}
            <path
              d="M5 10L25 25L45 10"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />

            {/* Mail lines */}
            <line
              x1="15"
              y1="20"
              x2="35"
              y2="20"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <line
              x1="15"
              y1="25"
              x2="35"
              y2="25"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <line
              x1="15"
              y1="30"
              x2="30"
              y2="30"
              stroke="#ffffff"
              strokeWidth="2"
            />

            {/* Envelope highlight */}
            <path
              d="M40 12L45 10"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.7"
            />
          </g>

          {/* Outer ring with pulse effect */}
          <circle
            ref={(el) => (circlesRef.current[1] = el)}
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Clickable area */}
          <circle cx="50" cy="50" r="48" fill="transparent" />
        </svg>
      </div>
    </>
  );
}
