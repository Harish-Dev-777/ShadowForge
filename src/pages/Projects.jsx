import React from "react";
import { siteContent } from "../contents";

export default function Projects(){
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {siteContent.projects.map(p=>(
          <div key={p.id} className="rounded-2xl overflow-hidden bg-[var(--card)]">
            <img src={p.image} alt={p.title} className="w-full h-56 object-cover"/>
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
