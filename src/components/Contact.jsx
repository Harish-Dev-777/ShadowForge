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
  const [hologramActive, setHologramActive] = useState(false);
  const [fieldFocus, setFieldFocus] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const formRef = useRef();
  const sectionRef = useRef();
  const inputRefs = useRef([]);
  const toastRef = useRef();
  const successPopupRef = useRef();
  const particlesRef = useRef([]);
  const hologramDisplayRef = useRef();
  const fieldIndicatorRef = useRef();
  const phoneInputRef = useRef();

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
      // Animate section entrance with hologram effect
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

      // Hologram projection animation
      gsap.fromTo(
        ".hologram-line",
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 0.7,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
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

      // Initialize particles
      initParticles();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const initParticles = () => {
    // Create floating particles for background
    particlesRef.current = [];
    const container = sectionRef.current;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full particle";
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor =
        Math.random() > 0.5 ? "#8B5CF6" : "#3B82F6";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;

      container.appendChild(particle);
      particlesRef.current.push(particle);

      // Animate particles
      gsap.to(particle, {
        y: Math.random() * 40 - 20,
        x: Math.random() * 30 - 15,
        duration: Math.random() * 5 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  };

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Phone validation function
  const validatePhone = (phone) => {
    // Remove formatting for validation
    const cleanPhone = phone.replace(/[^\d]/g, "");
    return cleanPhone.length === 10;
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Designation is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Designation must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Communication frequency is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid communication frequency";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Contact channel is required";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit contact channel";
    }

    if (!form.message.trim()) {
      newErrors.message = "Project parameters are required";
    } else if (form.message.trim().length < 10) {
      newErrors.message =
        "Please provide more details about your project parameters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const change = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format phone number if it's the phone field
    if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    }

    setForm((prev) => ({ ...prev, [name]: formattedValue }));

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

    // Activate hologram effect when typing
    if (!hologramActive && value.length > 0) {
      setHologramActive(true);
      if (hologramDisplayRef.current) {
        gsap.to(hologramDisplayRef.current, {
          opacity: 0.7,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    } else if (
      hologramActive &&
      value.length === 0 &&
      Object.values(form).every((val) => val.length === 0)
    ) {
      setHologramActive(false);
      if (hologramDisplayRef.current) {
        gsap.to(hologramDisplayRef.current, {
          opacity: 0.3,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  const handleFocus = (fieldName) => {
    setFieldFocus(fieldName);

    // Animate field indicator
    if (fieldIndicatorRef.current) {
      const fieldElement = document.querySelector(`[name="${fieldName}"]`);
      if (fieldElement) {
        const rect = fieldElement.getBoundingClientRect();
        const containerRect = formRef.current.getBoundingClientRect();

        gsap.to(fieldIndicatorRef.current, {
          y: rect.top - containerRect.top - 5,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  const handleBlur = () => {
    setFieldFocus("");

    // Hide field indicator
    if (fieldIndicatorRef.current) {
      gsap.to(fieldIndicatorRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const showSuccessPopup = () => {
    if (successPopupRef.current) {
      // Reset animation
      gsap.set(successPopupRef.current, { scale: 0, opacity: 0 });

      // Animate in
      gsap.to(successPopupRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // Add confetti effect
      for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.className = "absolute w-2 h-2 confetti-particle";
        confetti.style.backgroundColor = `hsl(${
          Math.random() * 360
        }, 100%, 60%)`;
        confetti.style.left = `${50 + (Math.random() * 20 - 10)}%`;
        confetti.style.top = "50%";
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

        successPopupRef.current.appendChild(confetti);

        gsap.to(confetti, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          rotation: Math.random() * 360,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            successPopupRef.current.removeChild(confetti);
          },
        });
      }

      // Auto-hide after 3 seconds
      setTimeout(() => {
        hideSuccessPopup();
      }, 3000);
    }
  };

  const hideSuccessPopup = () => {
    if (successPopupRef.current) {
      gsap.to(successPopupRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
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

    // Simulate AI processing animation
    gsap.to(".ai-processing-bar", {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    });

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

      // Show success popup
      showSuccessPopup();

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
        setHologramActive(false);
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
        className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-500 group ${
          buttonState === "idle"
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : buttonState === "ready"
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 neon-glow"
            : buttonState === "loading"
            ? "bg-gray-800 text-gray-300"
            : buttonState === "success"
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
        }`}
      >
        {/* Animated background effect for ready state */}
        {buttonState === "ready" && (
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></span>
        )}

        <span className="relative z-10 flex items-center">
          {buttonState === "idle" && (
            <>
              <span className="mr-2 opacity-70">⟳</span> Fill all fields
            </>
          )}
          {buttonState === "ready" && (
            <>
              <span className="mr-2">🚀</span> Launch Message
            </>
          )}
          {buttonState === "loading" && (
            <>
              <div className="mr-2 ai-loader"></div>
              AI Processing...
            </>
          )}
          {buttonState === "success" && (
            <>
              <span className="mr-2">✓</span>
              Message Deployed!
            </>
          )}
          {buttonState === "error" && (
            <>
              <span className="mr-2">⚠</span>
              Transmission Failed
            </>
          )}
        </span>

        {/* AI Processing bar for loading state */}
        {buttonState === "loading" && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
            <div className="ai-processing-bar h-full bg-gradient-to-r from-blue-400 to-purple-400 w-0"></div>
          </div>
        )}
      </button>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes hologramScan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(600%);
            opacity: 0;
          }
        }

        .hologram-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
          opacity: 0.3;
          transform-origin: center;
        }

        .neon-glow {
          box-shadow: 0 0 10px theme("colors.purple.500"),
            0 0 20px theme("colors.purple.500"),
            0 0 30px theme("colors.blue.500");
        }

        .hologram-effect {
          background: linear-gradient(
            125deg,
            rgba(30, 30, 60, 0.7),
            rgba(10, 10, 30, 0.9)
          );
          backdrop-filter: blur(10px);
          border: 1px solid rgba(100, 100, 255, 0.2);
          box-shadow: 0 0 30px rgba(100, 100, 255, 0.1),
            inset 0 0 20px rgba(100, 100, 255, 0.1);
        }

        .ai-loader {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .cyber-input {
          background: rgba(20, 20, 40, 0.6);
          border: 1px solid rgba(100, 100, 255, 0.3);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .cyber-input:focus {
          box-shadow: 0 0 15px rgba(100, 100, 255, 0.5);
          border-color: rgba(100, 100, 255, 0.8);
        }

        .input-error {
          border-color: rgba(255, 50, 50, 0.6) !important;
          box-shadow: 0 0 15px rgba(255, 50, 50, 0.3) !important;
        }

        .particle {
          pointer-events: none;
        }

        .confetti-particle {
          pointer-events: none;
        }

        .field-indicator {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #8b5cf6,
            #3b82f6,
            #8b5cf6,
            transparent
          );
          opacity: 0;
          z-index: 10;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .cyber-input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden"
        id="contact"
      >
        {/* Hologram grid background */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="hologram-line"
              style={{
                top: `${i * 5}%`,
                animation: `hologramScan ${3 + i * 0.2}s linear infinite ${
                  i * 0.1
                }s`,
              }}
            ></div>
          ))}
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-purple-600 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-40 h-40 md:w-64 md:h-64 bg-blue-600 rounded-full filter blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div
          ref={formRef}
          className="max-w-3xl mx-auto hologram-effect rounded-3xl p-6 md:p-10 relative overflow-hidden"
        >
          {/* Hologram display that activates when typing */}
          <div
            ref={hologramDisplayRef}
            className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 opacity-30 pointer-events-none transition-opacity duration-500"
          ></div>

          {/* Field indicator */}
          <div ref={fieldIndicatorRef} className="field-indicator"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-center text-white">
              Initiate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Project
              </span>{" "}
              Collaboration
            </h2>
            <p className="text-gray-400 text-center mb-8 text-lg">
              Share your vision parameters and our AI will match you with
              optimal solutions
            </p>

            <form onSubmit={submit} className="space-y-6">
              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium tracking-wider">
                  DESIGNATION / NAME *
                </label>
                <input
                  ref={(el) => (inputRefs.current[0] = el)}
                  name="name"
                  value={form.name}
                  onChange={change}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  className={`w-full p-4 rounded-xl cyber-input outline-none transition-all duration-300 text-white ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="Enter your identification"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠</span> {errors.name}
                  </p>
                )}
              </div>

              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium tracking-wider">
                  COMMUNICATION FREQUENCY *
                </label>
                <input
                  ref={(el) => (inputRefs.current[1] = el)}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  className={`w-full p-4 rounded-xl cyber-input outline-none transition-all duration-300 text-white ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="your.contact@domain.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠</span> {errors.email}
                  </p>
                )}
              </div>

              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium tracking-wider">
                  CONTACT CHANNEL *
                </label>
                <input
                  ref={(el) => {
                    inputRefs.current[2] = el;
                    phoneInputRef.current = el;
                  }}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={change}
                  onFocus={() => handleFocus("phone")}
                  onBlur={handleBlur}
                  maxLength="16"
                  className={`w-full p-4 rounded-xl cyber-input outline-none transition-all duration-300 text-white ${
                    errors.phone ? "input-error" : ""
                  }`}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠</span> {errors.phone}
                  </p>
                )}
              </div>

              <div className="form-element">
                <label className="text-sm block mb-2 text-gray-300 font-medium tracking-wider">
                  PROJECT PARAMETERS *
                </label>
                <textarea
                  ref={(el) => (inputRefs.current[3] = el)}
                  name="message"
                  value={form.message}
                  onChange={change}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  rows={5}
                  className={`w-full p-4 rounded-xl cyber-input outline-none transition-all duration-300 text-white resize-none ${
                    errors.message ? "input-error" : ""
                  }`}
                  placeholder="Describe your project objectives, technical requirements, timeline, and resources..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 flex items-center">
                    <span className="mr-1">⚠</span> {errors.message}
                  </p>
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

      {/* Enhanced Success Popup */}
      <div
        ref={successPopupRef}
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none opacity-0 scale-0"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 border border-purple-500/30 shadow-2xl transform transition-transform duration-500">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Transmission Successful
            </h3>
            <p className="text-gray-300 mb-6">
              Your project parameters have been received. Our AI is analyzing
              your requirements and will connect you with optimal solutions
              within 24 hours.
            </p>

            <div className="bg-gray-800/50 rounded-xl p-4 text-left">
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                <span>Message encrypted and transmitted</span>
              </div>
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                <span>AI analysis initiated</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                <span>Matching with optimal solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          ref={toastRef}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg font-medium z-50 flex items-center ${
            toast.type === "success"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              : "bg-gradient-to-r from-red-600 to-rose-600 text-white"
          }`}
        >
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {toast.message}
        </div>
      )}
    </>
  );
}
