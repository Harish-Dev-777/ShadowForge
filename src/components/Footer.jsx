import { Link } from "react-router-dom";
import { siteContent } from "../contents";

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#0b0710] text-[#9ca3af]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-[var(--accent)] font-bold">{siteContent.logo}</h4>
          <p className="mt-3 text-sm">{siteContent.footer.small}</p>
          <p className="mt-4 text-sm">
            Email:{" "}
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="text-white"
            >
              {siteContent.contact.email}
            </a>
          </p>
          <p className="text-sm">
            Phone:{" "}
            <a href={`tel:${siteContent.contact.phone}`} className="text-white">
              {siteContent.contact.phone}
            </a>
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Explore</h5>
          {siteContent.nav.map((n, i) => (
            <Link key={i} to={n.path} className="block mb-2 hover:text-white">
              {n.name}
            </Link>
          ))}
        </div>

        <div>
          <h5 className="font-semibold mb-3">Get a quote</h5>
          <p className="text-sm">
            Send us your project idea and we'll give a fast estimate.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-4 px-4 py-2 rounded-full bg-[var(--accent)] text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="border-t border-[#24142f] py-6 text-center text-sm text-[#6b7280]">
        {siteContent.footer?.copyright} · All rights reserved
      </div>
    </footer>
  );
}
