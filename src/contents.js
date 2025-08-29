// src/contents.js
import img1 from "./images/bg1.jpg";
import img2 from "./images/bg2.jpg";
import img3 from "./images/bg3.jpg";
import img4 from "./images/bg4.jpg";

export const siteContent = {
  logo: "ShadowForge", // 🔥 Updated brand name
  nav: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ],
  hero: {
    titleLines: ["Dream It,", "We Forge It Into Reality"],
    subtitle: "Your digital growth partner.",
    cta: "Start Your Project",
    navCta: "Free consultation",
    secondary: "We turn ideas into digital success",
    bottomText: "Digital Agency | Branding | Development",
    bgImages: [img1, img2, img3, img4],
  },
  about: {
    heading: "About Us",
    intro:
      "At ShadowForge, we specialize in forging powerful, high-performance digital solutions that help businesses thrive. Based in Pondicherry, India, our team has delivered 120+ successful projects across industries—ranging from e-commerce to SaaS platforms—focused on innovation, scalability, and impactful user experience.",
    story:
      "Founded with a vision to empower businesses through technology, ShadowForge has grown from a small studio into a trusted digital partner for startups, enterprises, and creative brands. Our strength lies in combining creativity with technical expertise—crafting designs that inspire and building systems that perform. With every project, we aim to exceed expectations, ensuring our clients not only launch but scale with confidence.",
    whyChoose: [
      "Proven Expertise Across Domains",
      "Custom-Tailored Digital Solutions",
      "Full-Cycle Development & Design",
      "Commitment to Client Success",
    ],
  },
  services: {
    heading: "Our Services",
    description:
      "At ShadowForge, we craft custom websites that bring your business vision to life. Our team blends stunning, modern designs with seamless functionality to create sites that not only look amazing but also engage your audience and drive results. From writing compelling content to optimizing user experience, we ensure your online presence stands out from the competition. Plus, with our ongoing maintenance and updates, your website stays secure, fast, and current—letting you focus on growing your business while we handle the digital details. Partner with ShadowForge and transform your ideas into a powerful online reality.",
    list: [
      {
        title: "Custom Website Design",
        desc: "Our design-first approach ensures every project is crafted to reflect your brand identity while optimizing usability and conversions. We create responsive, user-focused designs that engage audiences across devices.",
      },
      {
        title: "Web & App Development",
        desc: "From corporate sites to e-commerce and SaaS platforms, we build scalable, secure, and high-performance digital products using modern technologies like React, Next.js, Java, and Spring Boot.",
      },
      {
        title: "UI/UX Strategy",
        desc: "We design intuitive and conversion-focused user experiences. From wireframes to final designs, our team ensures that your digital product delights users while meeting business goals.",
      },
      {
        title: "Backend & API Development",
        desc: "Robust, secure, and scalable backend systems with clean architecture. We specialize in Java, Spring Boot, and RESTful APIs to power your business applications with reliability.",
      },
      {
        title: "Maintenance & Growth",
        desc: "We don’t just build and leave—we continuously monitor, optimize, and enhance your website or app to ensure peak performance, security, and long-term growth.",
      },
    ],
  },
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      image: img1,
    },
    {
      id: 2,
      title: "SaaS Dashboard",
      image: img2,
    },
    {
      id: 3,
      title: "Corporate Landing Page",
      image: img3,
    },
    {
      id: 4,
      title: "Creative Portfolio",
      image: img4,
    },
  ],
  team: [
    {
      name: "Harish",
      role: "Founder & Lead Developer",
      skills: [
        "Full-Stack Development",
        "Java + Spring Boot",
        "React & Next.js",
        "Scalable Architecture",
      ],
      image: "/images/team/Harish.jpg",
    },
    {
      name: "Chandru",
      role: "UI/UX Designer",
      skills: ["Wireframing", "Prototyping", "Figma", "User Research"],
      image: "/images/team/Chandru.jpg",
    },
    {
      name: "Dhinesh Kumar",
      role: "Backend Developer",
      skills: [
        "Java",
        "Microservices",
        "API Development",
        "Database Optimization",
      ],
      image: "/images/team/Dhinesh.jpg",
    },
    {
      name: "Karthik",
      role: "Web Developer",
      skills: ["SEO", "React", "Backend", "Content Marketing", "Analytics"],
      image: "/images/team/Karthik.jpg",
    },
    {
      name: "Vidun",
      role: "Dot Net Developer",
      skills: [
        "Angular",
        "C#",
        "Backend",
        "Microsoft SQL",
        "Windows Application",
      ],
      image: "/images/team/Vidun.jpg",
    },
    {
      name: "Parasuraman",
      role: "Web Developer",
      skills: ["HTML", "CSS", "JavaScript", "Java", "Spring Boot", "MySql"],
      image: "/images/team/Parasuraman.jpg",
    },
    {
      name: "Gurubaran",
      role: "Web Developer",
      skills: ["React", "CSS", "JavaScript", "Java", "Spring Boot"],
      image: "/images/team/Gurubaran.jpg",
    },
    {
      name: "Nagulan",
      role: "Web Developer",
      skills: ["React", "CSS", "JavaScript", "Java", "Spring Boot"],
      image: "/images/team/Nagulan.jpg",
    },
  ],
  testimonials: [
    {
      name: "Vikram S",
      role: "CEO, TechStart",
      quote:
        "ShadowForge completely transformed our digital presence. Their team delivered a scalable SaaS platform ahead of schedule, and the UI/UX has drastically improved user engagement.",
      image: "/images/clients/vikram.jpg",
    },
    {
      name: "Anjali Mehra",
      role: "Founder, Bloom & Co",
      quote:
        "The website they designed for us not only looks stunning but also performs seamlessly. Their attention to detail and creative approach set them apart from any other agency we’ve worked with.",
      image: "/images/clients/anjali.jpg",
    },
    {
      name: "Rohit Kapoor",
      role: "Marketing Head, NexaCorp",
      quote:
        "From branding to backend development, ShadowForge handled everything with professionalism. We saw a 60% boost in leads after launch!",
      image: "/images/clients/rohit.jpg",
    },
  ],
  contact: {
    email: "harishmkcse@gmail.com", // replace with your Gmail
    emailJS: {
      serviceID: "your_service_id",
      templateID: "your_template_id",
      publicKey: "your_public_key",
    },
  },
  footer: {
    small: "We craft digital experiences that blend creativity and technology.",
    copyright: "© 2025 Shadow Forge",
  },
};
