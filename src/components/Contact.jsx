import { useState } from "react";
import { siteContent } from "../contents";
import emailjs from "emailjs-com";

export default function ContactInline(){
  const [form, setForm] = useState({ name: "", email: "", idea: ""});
  const [status, setStatus] = useState("");

  const change = (e)=> setForm(prev=> ({...prev, [e.target.name]: e.target.value}));

  const submit = async (e) => {
    e.preventDefault();
    if(!form.name || !form.email || !form.idea) {
      setStatus("Please fill all fields ✋");
      return;
    }
    setStatus("Sending...");
    try{
      // replace with your EmailJS data in siteContent
      const { serviceID, templateID, publicKey } = siteContent.contact.emailJS;
      await emailjs.send(serviceID, templateID, {
        from_name: form.name,
        from_email: form.email,
        message: form.idea
      }, publicKey);

      setStatus("✅ We will contact you soon ✨");
      setForm({ name: "", email: "", idea: ""});
    }catch(err){
      console.error(err);
      setStatus("Oops — something went wrong. Try again later.");
    }
  };

  return (
    <section className="py-20 px-6" id="contact">
      <div className="max-w-3xl mx-auto bg-[var(--card)] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Name</label>
            <input name="name" value={form.name} onChange={change} className="w-full p-3 rounded-lg bg-[#0e0b12] border border-[#2a1b35]" />
          </div>
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input name="email" value={form.email} onChange={change} className="w-full p-3 rounded-lg bg-[#0e0b12] border border-[#2a1b35]" />
          </div>
          <div>
            <label className="text-sm block mb-1">Project Idea</label>
            <textarea name="idea" value={form.idea} onChange={change} rows={6} className="w-full p-3 rounded-lg bg-[#0e0b12] border border-[#2a1b35]"></textarea>
          </div>
          <div>
            <button className="relative inline-block px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold overflow-hidden">
              <span className="relative z-10">Submit</span>
              <span className="absolute inset-0 rounded-full border border-[var(--accent)] animate-spin-slow opacity-50"></span>
            </button>
          </div>

          {status && <div className="text-sm mt-2">{status}</div>}
        </form>
      </div>

      {/* floating glowing email */}
      <a href={`mailto:${siteContent.contact.email}`} className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center shadow-xl">
        ✉️
      </a>
    </section>
  );
}
