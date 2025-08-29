import React from "react";
import { siteContent } from "../contents";

export default function About(){
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-4">About {siteContent.logo}</h1>
      <p className="text-[#94a3b8]">We are a team of designers and engineers building premium web experiences. Our mission is to create and maintain websites that help clients grow.</p>
    </div>
  );
}
