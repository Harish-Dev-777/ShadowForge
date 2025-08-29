import { Link, NavLink, useLocation } from "react-router-dom";
import { siteContent } from "../contents";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition ${
        scrolled
          ? "bg-[rgba(13,6,16,0.88)] backdrop-blur-md border-b border-[#2b163f]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[var(--accent)]">
          {siteContent.logo}
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {siteContent.nav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm ${
                  isActive
                    ? "text-[var(--accent)] font-semibold"
                    : "text-[#94a3b8] hover:text-[var(--accent)]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="relative inline-block px-4 py-2 rounded-full font-semibold bg-[var(--accent)] text-white overflow-hidden"
          >
            <span className="relative z-10">
              {siteContent.hero?.cta || "Free Consultation"}
            </span>
            <span className="absolute inset-0 rounded-full border border-[var(--accent)] animate-spin-slow opacity-60"></span>
          </Link>
        </div>

        <button
          className="md:hidden text-[#94a3b8]"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-[rgba(13,6,16,0.96)] border-t border-[#2b163f] px-6 py-4">
          {siteContent.nav.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block py-2 text-[#94a3b8] hover:text-[var(--accent)]"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-3 px-4 py-2 rounded-full bg-[var(--accent)] text-white text-center"
          >
            Free Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
