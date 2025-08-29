import { useState } from "react";
import { siteContent } from "../contents";
import emailjs from "emailjs-com";

export default function ContactInline() {
  const [form, setForm] = useState({ name: "", email: "", idea: "" });
  const [status, setStatus] = useState("");

  const change = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.idea) {
      setStatus("⚠️ Please fill all fields");
      return;
    }
    setStatus("Sending... ⏳");
    try {
      const { serviceID, templateID, publicKey } = siteContent.contact.emailJS;
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.idea,
        },
        publicKey
      );

      setStatus("✅ Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", idea: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <section className="py-20 px-6" id="contact">
      <div className="max-w-3xl mx-auto bg-[var(--card)] rounded-2xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 blur-3xl animate-pulse"></div>

        <h2 className="text-3xl font-bold mb-6 relative z-10 text-center">
          Let’s Build Something Amazing 🚀
        </h2>

        <form onSubmit={submit} className="space-y-5 relative z-10">
          <div>
            <label className="text-sm block mb-1 text-gray-300">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={change}
              className="w-full p-3 rounded-lg bg-[#0e0b12] border border-purple-700/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-600 outline-none transition"
            />
          </div>
          <div>
            <label className="text-sm block mb-1 text-gray-300">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={change}
              className="w-full p-3 rounded-lg bg-[#0e0b12] border border-purple-700/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-600 outline-none transition"
            />
          </div>
          <div>
            <label className="text-sm block mb-1 text-gray-300">
              Project Idea
            </label>
            <textarea
              name="idea"
              value={form.idea}
              onChange={change}
              rows={6}
              className="w-full p-3 rounded-lg bg-[#0e0b12] border border-purple-700/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-600 outline-none transition"
            ></textarea>
          </div>
          <div className="text-center">
            <button className="relative inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-semibold shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <span className="relative z-10">Send Message</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-40 blur-xl animate-pulse"></span>
            </button>
          </div>

          {status && (
            <div className="text-sm mt-3 text-center text-gray-300">
              {status}
            </div>
          )}
        </form>
      </div>

      {/* Floating Mail Button */}
      <a
        href={`mailto:${siteContent.contact.email}`}
        className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        ✉️
      </a>
    </section>
  );
}
