// src/contents.js
import img1 from "./images/bg1.jpg";
import img2 from "./images/bg2.jpg";
import img3 from "./images/bg3.jpg";
import img4 from "./images/bg4.jpg";

export const siteContent = {
  logo: "ShadowForge",
  nav: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ's", path: "/faq" },
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
      "Fast Turnaround Without Compromising Quality",
    ],
    timelineInfo:
      "We pride ourselves on efficient project delivery. Most standard websites are completed within 4-6 weeks, while more complex projects like e-commerce platforms typically take 10-12 weeks to ensure all features are perfectly implemented.",
    // Added content for enhanced about page
    mission:
      "To empower businesses with exceptional digital experiences that drive growth, foster innovation, and create meaningful connections with their audience.",
    values: [
      {
        icon: "🚀",
        title: "Innovation",
        description:
          "We constantly explore new technologies and approaches to deliver cutting-edge solutions.",
      },
      {
        icon: "🎯",
        title: "Excellence",
        description:
          "We pursue perfection in every project, paying attention to the smallest details.",
      },
      {
        icon: "🤝",
        title: "Collaboration",
        description:
          "We work closely with our clients to ensure their vision is realized beyond expectations.",
      },
      {
        icon: "💡",
        title: "Creativity",
        description:
          "We approach each project with fresh ideas and creative problem-solving techniques.",
      },
      {
        icon: "⏱️",
        title: "Timeliness",
        description:
          "We respect deadlines and deliver projects on schedule without compromising quality.",
      },
      {
        icon: "🔍",
        title: "Transparency",
        description:
          "We maintain open communication and honest relationships with all our clients.",
      },
    ],
    stats: [
      {
        value: "10",
        label: "Projects Completed",
      },
      {
        value: "98%",
        label: "Client Satisfaction",
      },
      {
        value: "1+",
        label: "Years Experience",
      },
      {
        value: "8+",
        label: "Team Members",
      },
    ],
    cta: {
      title: "Ready to start your project?",
      description:
        "Get in touch with us today and let's discuss how we can help bring your vision to life.",
      buttonText: "Contact Us",
    },
  },
  services: {
    heading: "Our Services",
    description:
      "At ShadowForge, we craft custom websites that bring your business vision to life. Our team blends stunning, modern designs with seamless functionality to create sites that not only look amazing but also engage your audience and drive results. From writing compelling content to optimizing user experience, we ensure your online presence stands out from the competition. Plus, with our ongoing maintenance and updates, your website stays secure, fast, and current—letting you focus on growing your business while we handle the digital details. Partner with ShadowForge and transform your ideas into a powerful online reality.",
    list: [
      {
        title: "Custom Website Design",
        desc: "Our design-first approach ensures every project is crafted to reflect your brand identity while optimizing usability and conversions. We create responsive, user-focused designs that engage audiences across devices.",
        timeline: "4-6 weeks",
        features: [
          "Responsive Design",
          "Brand Identity Integration",
          "UI/UX Optimization",
          "Conversion-Focused Layouts",
        ],
        price: "Starting at ₹35,000",
      },
      {
        title: "Web & App Development",
        desc: "From corporate sites to e-commerce and SaaS platforms, we build scalable, secure, and high-performance digital products using modern technologies like React, Next.js, Java, and Spring Boot.",
        timeline: "6-10 weeks",
        features: [
          "React/Next.js Development",
          "Cross-Platform Compatibility",
          "Performance Optimization",
          "Third-Party API Integration",
        ],
        price: "Starting at ₹50,000",
      },
      {
        title: "UI/UX Strategy",
        desc: "We design intuitive and conversion-focused user experiences. From wireframes to final designs, our team ensures that your digital product delights users while meeting business goals.",
        timeline: "3-5 weeks",
        features: [
          "User Research & Analysis",
          "Wireframing & Prototyping",
          "Usability Testing",
          "Design System Creation",
        ],
        price: "Starting at ₹25,000",
      },
      {
        title: "Backend & API Development",
        desc: "Robust, secure, and scalable backend systems with clean architecture. We specialize in Java, Spring Boot, and RESTful APIs to power your business applications with reliability.",
        timeline: "5-8 weeks",
        features: [
          "Database Design & Optimization",
          "RESTful API Development",
          "Server Configuration",
          "Security Implementation",
        ],
        price: "Starting at ₹45,000",
      },
      {
        title: "E-Commerce Development",
        desc: "Complete online store solutions with secure payment gateways, inventory management, and customer experience optimization. We build platforms that drive sales and growth.",
        timeline: "10-12 weeks",
        features: [
          "Shopping Cart & Checkout",
          "Payment Gateway Integration",
          "Inventory Management",
          "Order Processing System",
        ],
        price: "Starting at ₹75,000",
      },
      {
        title: "Maintenance & Growth",
        desc: "We don't just build and leave—we continuously monitor, optimize, and enhance your website or app to ensure peak performance, security, and long-term growth.",
        timeline: "Ongoing",
        features: [
          "Regular Security Updates",
          "Performance Monitoring",
          "Content Updates",
          "SEO Optimization",
        ],
        price: "Monthly plans from ₹8,000",
      },
    ],
  },
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      image: img1,
      timeline: "12 weeks",
      description:
        "Complete online store with custom features and payment integration",
    },
    {
      id: 2,
      title: "SaaS Dashboard",
      image: img2,
      timeline: "10 weeks",
      description: "Data visualization platform with real-time analytics",
    },
    {
      id: 3,
      title: "Corporate Landing Page",
      image: img3,
      timeline: "5 weeks",
      description: "Professional website with lead generation focus",
    },
    {
      id: 4,
      title: "Creative Portfolio",
      image: img4,
      timeline: "4 weeks",
      description: "Showcase website for creative professionals",
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
        "ShadowForge completely transformed our digital presence. Their team delivered a scalable SaaS platform ahead of schedule, and the UI/UX has drastically improved user engagement. The attention to detail and technical expertise exceeded our expectations.",
      image: "/images/clients/vikram.jpg",
      projectType: "SaaS Platform",
      timeline: "Completed in 9 weeks",
      rating: 5,
    },
    {
      name: "Anjali Mehra",
      role: "Founder, Bloom & Co",
      quote:
        "The website they designed for us not only looks stunning but also performs seamlessly. Their attention to detail and creative approach set them apart from any other agency we've worked with. Our online sales increased by 45% within the first month.",
      image: "/images/clients/anjali.jpg",
      projectType: "E-Commerce Store",
      timeline: "Completed in 11 weeks",
      rating: 5,
    },
    {
      name: "Rohit Kapoor",
      role: "Marketing Head, NexaCorp",
      quote:
        "From branding to backend development, ShadowForge handled everything with professionalism. We saw a 60% boost in leads after launch! Their team was responsive, innovative, and delivered beyond our requirements.",
      image: "/images/clients/rohit.jpg",
      projectType: "Corporate Website",
      timeline: "Completed in 5 weeks",
      rating: 5,
    },
    {
      name: "Priya Desai",
      role: "Director, DesignHub",
      quote:
        "Working with ShadowForge was a game-changer for our agency. They developed a custom CMS that perfectly fits our workflow. The project was delivered on time and within budget, with excellent post-launch support.",
      image: "/images/clients/priya.jpg",
      projectType: "Custom CMS",
      timeline: "Completed in 8 weeks",
      rating: 5,
    },
    {
      name: "Arjun Menon",
      role: "CTO, FinTech Solutions",
      quote:
        "The security implementation and API development for our financial platform was exceptional. ShadowForge's team demonstrated deep expertise in secure coding practices and delivered a robust, scalable solution.",
      image: "/images/clients/arjun.jpg",
      projectType: "FinTech Platform",
      timeline: "Completed in 14 weeks",
      rating: 5,
    },
    {
      name: "Meera Krishnan",
      role: "Owner, Crafted Homes",
      quote:
        "Our interior design portfolio website has received so many compliments. ShadowForge captured our aesthetic perfectly and created a user experience that showcases our work beautifully. The timeline was met exactly as promised.",
      image: "/images/clients/meera.jpg",
      projectType: "Portfolio Website",
      timeline: "Completed in 4 weeks",
      rating: 5,
    },
    {
      name: "Sanjay Patel",
      role: "Operations Manager, LogisticsPlus",
      quote:
        "The inventory management system developed by ShadowForge has streamlined our operations significantly. Their understanding of our business needs and technical implementation was impressive from start to finish.",
      image: "/images/clients/sanjay.jpg",
      projectType: "Inventory Management System",
      timeline: "Completed in 10 weeks",
      rating: 5,
    },
    {
      name: "Neha Sharma",
      role: "Marketing Director, EduTech Innovations",
      quote:
        "Our educational platform needed a complete overhaul, and ShadowForge delivered beyond expectations. The user interface is intuitive, and the backend performance has improved dramatically. Enrollment increased by 35% after relaunch.",
      image: "/images/clients/neha.jpg",
      projectType: "Educational Platform",
      timeline: "Completed in 12 weeks",
      rating: 5,
    },
    {
      name: "Rajiv Malhotra",
      role: "Founder, HealthTrack",
      quote:
        "Developing a healthcare application requires precision and security. ShadowForge's team demonstrated exceptional expertise in both areas. The app has been running flawlessly since launch with excellent user feedback.",
      image: "/images/clients/rajiv.jpg",
      projectType: "Healthcare Application",
      timeline: "Completed in 16 weeks",
      rating: 5,
    },
    {
      name: "Sneha Reddy",
      role: "CEO, GreenSolutions",
      quote:
        "The e-commerce platform ShadowForge built for our sustainable products store has been instrumental in our growth. The user experience is seamless, and the admin panel makes managing products and orders effortless.",
      image: "/images/clients/sneha.jpg",
      projectType: "E-Commerce Platform",
      timeline: "Completed in 12 weeks",
      rating: 5,
    },
  ],
  process: {
    heading: "Our Process",
    steps: [
      {
        title: "Discovery & Planning",
        description:
          "We begin by understanding your business goals, target audience, and project requirements to create a detailed plan.",
        duration: "1-2 weeks",
      },
      {
        title: "Design & Prototyping",
        description:
          "Our designers create wireframes and prototypes to visualize the final product and gather feedback.",
        duration: "2-3 weeks",
      },
      {
        title: "Development",
        description:
          "Our developers bring the designs to life with clean, efficient code and regular progress updates.",
        duration: "Varies by project",
      },
      {
        title: "Testing & Quality Assurance",
        description:
          "We rigorously test every aspect of your project to ensure optimal performance across all devices and browsers.",
        duration: "1-2 weeks",
      },
      {
        title: "Launch & Support",
        description:
          "We deploy your project and provide ongoing support to ensure continued success.",
        duration: "Ongoing",
      },
    ],
  },
  contact: {
    email: "harishmkcse@gmail.com",
    phone: "+91 76786767869",
    address: "Chennai, India",
    emailJS: {
      serviceID: "service_izqbhvl",
      templateID: "template_81bbeke",
      publicKey: "h4gXYxDe_rsQQUjBZ",
    },
  },
  footer: {
    small: "We craft digital experiences that blend creativity and technology.",
    copyright: "© 2025 Shadow Forge",
    services: [
      "Web Design",
      "Web Development",
      "E-Commerce",
      "UI/UX Design",
      "Maintenance",
    ],
    quickLinks: [
      "About Us",
      "Projects",
      "Services",
      "FAQ's",
      "Testimonials",
      "Contact",
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our services, process, and how we work with startups and businesses.",
    items: [
      {
        question: "How long does a typical website project take to complete?",
        answer:
          "Most standard websites take 4-6 weeks to complete. E-commerce platforms typically require 10-12 weeks. The timeline depends on the complexity of your project, the number of revisions, and how quickly we receive content and feedback from you.",
      },
      {
        question: "Do you offer ongoing website maintenance and support?",
        answer:
          "Yes, we offer comprehensive maintenance plans starting from just ₹3,500/month. This includes regular updates, security monitoring, backups, and technical support. We believe in building long-term relationships with our clients.",
      },
      {
        question:
          "Can you work with our existing brand materials and design assets?",
        answer:
          "Absolutely! We can work with your existing brand guidelines, logos, and materials. If you don't have established branding, we can create a complete brand identity for you as part of our design service.",
      },
      {
        question: "What platforms and technologies do you primarily work with?",
        answer:
          "We primarily work with modern technologies including React, Next.js, Node.js, and Java/Spring Boot for robust backend systems. For CMS solutions, we often use WordPress or headless CMS options. We choose the best technology stack for your specific needs.",
      },
      {
        question: "How do we get started with a project?",
        answer:
          "Getting started is easy! Simply contact us for a free consultation. We'll discuss your project needs, timeline, and budget. After that, we'll provide a detailed proposal and project plan. Once approved, we begin with discovery and planning.",
      },
      {
        question: "Do you provide website hosting services?",
        answer:
          "Yes, we offer reliable hosting solutions optimized for performance and security. Our hosting packages include SSL certificates, regular backups, and 99.9% uptime guarantee. We can also help migrate existing sites to our hosting environment.",
      },
      {
        question:
          "What's included in your pricing? Are there any hidden costs?",
        answer:
          "Our pricing includes all design, development, testing, and deployment. We also provide training on how to use your new website. Additional services like content creation, SEO optimization, and ongoing maintenance are available as add-ons. We're transparent about costs with no hidden fees.",
      },
      {
        question: "Can you help with website content creation?",
        answer:
          "Yes, we offer content creation services including copywriting, photography, and video production. Our team can create engaging content that converts visitors into customers, or we can work with your existing content.",
      },
      {
        question: "Do you work with startups and small businesses?",
        answer:
          "Absolutely! We specialize in working with startups and small businesses. We offer scalable solutions that grow with your business and provide startup-friendly pricing options to fit various budgets.",
      },
      {
        question: "What makes ShadowForge different from other agencies?",
        answer:
          "Our combination of technical expertise, design excellence, and startup-focused approach sets us apart. We're not just developers - we're partners in your growth. Our team has diverse skills across multiple technologies, and we prioritize communication and transparency throughout the process.",
      },
      {
        question: "Do you offer e-commerce solutions?",
        answer:
          "Yes, we develop complete e-commerce platforms with secure payment gateways, inventory management, and customer experience optimization. We build online stores that drive sales and growth for your business.",
      },
      {
        question: "What if I need changes after the website is launched?",
        answer:
          "We offer flexible support options post-launch. You can choose our maintenance plan for regular updates, or request changes on an ad-hoc basis. We're here to support your evolving needs as your business grows.",
      },
    ],
  },
};
