export const siteContent = {
  logo: "TrendyWeb",
  nav: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ],
  hero: {
    titleLines: ["We create and maintain", "websites that grow businesses"],
    subtitle:
      "We will create and maintain the websites — turn your idea into reality.",
    cta: "Free Consultation",
    secondary: "If your idea, we make it real",
    heroImage: "/images/hero-graphic.png", // replace with your file in /public/images
  },
  services: [
    {
      id: 1,
      title: "Web Development",
      desc: "Modern, fast and responsive websites with React & Next.js.",
    },
    {
      id: 2,
      title: "UI / UX Design",
      desc: "Pixel-perfect design and conversion-focused UI.",
    },
    {
      id: 3,
      title: "Backend & APIs",
      desc: "Secure, scalable backends: Java, Spring Boot, MySQL.",
    },
  ],
  projects: [
    {
      id: 1,
      image: "https://picsum.photos/800/600?random=21",
      title: "E-commerce UI",
    },
    {
      id: 2,
      image: "https://picsum.photos/800/600?random=22",
      title: "SaaS Landing",
    },
    {
      id: 3,
      image: "https://picsum.photos/800/600?random=23",
      title: "Portfolio 3D",
    },
    {
      id: 4,
      image: "https://picsum.photos/800/600?random=24",
      title: "Agency Site",
    },
  ],
  team: [
    {
      name: "Harish",
      role: "Fullstack Developer",
      skills: ["HTML", "CSS", "JS", "React", "Nextjs", "Tailwind"],
    },
    {
      name: "Dhinesh Kumar",
      role: "Backend Developer",
      skills: ["Java", "Spring Boot", "Hibernate", "Servlet", "JDBC", "MySQL"],
    },
    {
      name: "Gurubaran",
      role: "Backend Developer",
      skills: ["Java", "Spring Boot", "Hibernate", "MySQL"],
    },
    {
      name: "Parasuraman",
      role: "Backend Developer",
      skills: ["Java", "Spring Boot", "Hibernate", "MySQL"],
    },
    {
      name: "Karthik",
      role: "Backend Developer",
      skills: ["Java", "Spring Boot", "Hibernate", "MySQL"],
    },
    { name: "Chandru", role: "UI/UX Designer", skills: ["Figma"] },
    { name: "Nagulan", role: "Web Developer", skills: ["Frontend", "Backend"] },
  ],
  testimonials: [
    {
      name: "John D.",
      quote: "TrendyWeb turned our idea into a beautiful product.",
    },
    { name: "Maya R.", quote: "Professional, fast and always helpful." },
    { name: "Alex G.", quote: "Great support and maintenance." },
  ],
  stats: [
    { label: "Projects Delivered", value: 120 },
    { label: "Happy Clients", value: 80 },
    { label: "Years Experience", value: 5 },
  ],
  contact: {
    email: "youremail@example.com",
    phone: "+91 98765 43210",
    emailJS: {
      serviceID: "service_izqbhvl",
      templateID: "YOUR_EMAILJS_TEMPLATE_ID",
      publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    },
  },
  footer: {
    copyright: "© 2025 TrendyWeb",
    small: "We build and maintain websites that scale with your business.",
  },
};
