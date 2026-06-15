// Mock data for portfolio website

export const portfolioData = {
  // Personal Info
  name: "John Carlo Calubiran",
  title: "Automation Specialist",
  tagline: "Transforming Business Operations Through Intelligent Automation",
  email: "carlocalubs@gmail.com",
  phone: "+639565229350",
  linkedin: "", // To be added later
  
  // Hero Section
  hero: {
    title: "John Carlo Calubiran",
    subtitle: "Automation Specialist",
    description: "Empowering businesses with AI-driven automation solutions, seamless API integrations, and customer service excellence.",
  },

  // Services
  services: [
    {
      id: 1,
      title: "Customer Service",
      description: "Comprehensive customer support across multiple channels including email, chat, and phone. Delivering exceptional service experiences with proven track record.",
      features: ["Email Support", "Live Chat", "Phone Support", "Ticket Management"],
      icon: "headset"
    },
    {
      id: 2,
      title: "AI Automation",
      description: "Leverage cutting-edge AI automation tools to streamline workflows, reduce manual tasks, and boost operational efficiency.",
      features: ["Workflow Automation", "Process Optimization", "Task Automation", "Smart Solutions"],
      icon: "bot"
    },
    {
      id: 3,
      title: "API Integration",
      description: "Seamless integration of third-party APIs to connect your systems, automate data flow, and enhance functionality.",
      features: ["REST API", "Webhooks", "Data Sync", "System Integration"],
      icon: "plug"
    },
    {
      id: 4,
      title: "CRM Integration",
      description: "Connect and optimize your CRM systems for better customer relationships, data management, and business insights.",
      features: ["CRM Setup", "Data Migration", "Custom Workflows", "Analytics"],
      icon: "database"
    }
  ],

  // Work Experience
  experience: [
    {
      id: 1,
      title: "Business Process Associate - Care Representative",
      company: "Tata Consultancy Services",
      client: "AGL Retailer AU",
      period: "March 2023 - April 2026",
      description: "Delivered exceptional customer service for energy and telecommunications services",
      responsibilities: [
        "Assisted customers with billing inquiries, bill shock concerns, payments, refunds, and account management",
        "Processed gas, electricity, internet and mobile connection, disconnection, and transfer requests",
        "Coordinated with distributors and internal departments to resolve service and account-related issues",
        "Escalated complex cases to management and specialized teams for resolution",
        "Provided accurate information regarding energy services while delivering excellent customer service"
      ]
    },
    {
      id: 2,
      title: "Customer Service Representative",
      company: "Teleperformance",
      client: "UnitedHealthcare USA",
      period: "February 2022 - March 2023",
      description: "Facilitated healthcare coordination and member support services",
      responsibilities: [
        "Facilitated appointment scheduling and care coordination for members",
        "Assisted members with provider searches and appointment arrangements",
        "Improved overall member satisfaction and access to care",
        "Supported members with benefits, claims, coverage verification, and healthcare service inquiries",
        "Provided healthcare navigation support to ensure members received appropriate care"
      ]
    }
  ],

  // Skills
  skills: [
    { name: "Zapier", level: 90, category: "Automation" },
    { name: "n8n", level: 85, category: "Automation" },
    { name: "Make", level: 88, category: "Automation" },
    { name: "Power Automate", level: 82, category: "Automation" },
    { name: "Customer Service", level: 95, category: "Soft Skills" },
    { name: "API Integration", level: 80, category: "Technical" },
    { name: "CRM Systems", level: 85, category: "Technical" }
  ],

  // Previous Works - Placeholder for now
  projects: [
    {
      id: 1,
      title: "Project Coming Soon",
      description: "Exciting project details will be added here",
      category: "Automation",
      technologies: ["To be updated"],
      status: "placeholder"
    }
  ],

  // Testimonials - Random for now
  testimonials: [
    {
      id: 1,
      name: "Sarah Mitchell",
      position: "Operations Manager",
      company: "TechFlow Solutions",
      content: "John's automation expertise transformed our workflow efficiency by 60%. His attention to detail and problem-solving skills are exceptional.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Director of Customer Success",
      company: "Global Services Inc.",
      content: "Working with John was a game-changer. His customer service background combined with technical automation skills delivered outstanding results.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      position: "CTO",
      company: "Innovation Labs",
      content: "John's API integration work was flawless. He completed our complex CRM integration ahead of schedule and exceeded all expectations.",
      rating: 5
    }
  ]
};
