// Mock data for portfolio website

export const portfolioData = {
  // Personal Info
  name: "John Carlo R. Calubiran",
  title: "Automation Specialist",
  tagline: "Transforming Business Operations Through Intelligent Automation",
  email: "carlocalubs@gmail.com",
  phone: "+639565229350",
  linkedin: "", // To be added later
  calendly: "https://calendly.com/carlocalubs/30min",
  profileImage: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/tafkpjz1_wmremove-transformed.png",
  profileVideo: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/yp069pbn_download%20%282%29.mp4",
  
  // Hero Section
  hero: {
    title: "John Carlo R. Calubiran",
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
      title: "Freelancer - Customer Support & Automation Specialist",
      company: "Upwork & Onlinejobs.ph",
      client: "Various International Clients",
      period: "2024 - Present",
      description: "Providing freelance customer support and AI automation services to clients worldwide",
      responsibilities: [
        "Delivering top-tier customer support across multiple channels (email, chat, phone) for global clients",
        "Building custom automation workflows using Zapier, n8n, Make, and Power Automate",
        "Integrating APIs and CRM systems to streamline client business operations",
        "Implementing AI-powered solutions to reduce manual workload and improve efficiency",
        "Managing multiple client projects with strict deadlines and high quality standards"
      ]
    },
    {
      id: 2,
      title: "Business Process Associate - Care Representative and Upskill into Automation Specialist",
      company: "Tata Consultancy Services",
      client: "AGL Retailer AU",
      period: "March 2023 - April 2026",
      description: "Delivered exceptional customer service for energy and telecommunications services while upskilling into AI automation specialist",
      responsibilities: [
        "Assisted customers with billing inquiries, bill shock concerns, payments, refunds, and account management",
        "Processed gas, electricity, internet and mobile connection, disconnection, and transfer requests",
        "Coordinated with distributors and internal departments to resolve service and account-related issues",
        "Escalated complex cases to management and specialized teams for resolution",
        "Provided accurate information regarding energy services while delivering excellent customer service",
        "Implemented AI automation for QA processes to enhance quality control and operational efficiency",
        "Leveraged TCS AI Wisdom Next platform for intelligent process automation and data-driven insights",
        "Developed automated workflows to streamline repetitive tasks and improve team productivity"
      ]
    },
    {
      id: 3,
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

  // Previous Works / Projects
  projects: [
    {
      id: 1,
      title: "Auto Post Weather Status to SocMed and save to Gdrive",
      description: "Automated workflow using n8n that fetches real-time weather data from AccuWeather, generates social media content via AI Agent (Google Gemini), creates images using Nano Banana via APIFree, and publishes to Facebook, Instagram, and Twitter while saving everything to Google Drive.",
      category: "n8n Automation",
      technologies: ["n8n", "Gemini AI", "AccuWeather", "Google Drive", "Social Media APIs"],
      image: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/9090l9mz_Auto%20Post%20Weather%20Status%20to%20SocMed%20and%20save%20to%20Gdrive.jpg",
      video: null,
      status: "live"
    },
    {
      id: 2,
      title: "Gmail Integration & Document Processing",
      description: "Make.com (formerly Integromat) automation that watches incoming emails, extracts attachments, uploads files to Google Drive, generates AI-powered responses, logs data to Google Sheets, and sends follow-up emails — all hands-free.",
      category: "Make Automation",
      technologies: ["Make.com", "Gmail", "Google Drive", "Google Sheets", "AI Processing"],
      image: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/fczn6u31_make.jpg",
      video: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/aqm61mbz_make.mp4",
      status: "live"
    },
    {
      id: 3,
      title: "AI-Powered Content Distribution Pipeline",
      description: "Zapier multi-step workflow that monitors Google Drive for new files, uses AI by Zapier to transcribe video/audio, analyzes content, then intelligently distributes posts to Instagram and LinkedIn with proper formatting and scheduling.",
      category: "Zapier Automation",
      technologies: ["Zapier", "AI by Zapier", "Google Drive", "Instagram", "LinkedIn"],
      image: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/oormgy3h_zapier.jpg",
      video: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/5plpsdy1_zapier.mp4",
      status: "live"
    },
    {
      id: 4,
      title: "Asana & Xero Task-to-Invoice Sync Automation",
      description: "Make.com workflow that watches completed Asana tasks, makes API calls to Xero for invoice data, routes through an iterator and router, syncs data to Google Sheets, creates CSV reports, and uploads attachments back to Asana — fully automating the task-to-invoice reporting cycle.",
      category: "Make Automation",
      technologies: ["Make.com", "Asana", "Xero", "Google Sheets", "CSV Processing"],
      image: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/9dmjedly_1.%20PROJECT%20SCREENSHOT.jpg",
      video: null,
      status: "live"
    }
  ],

  // Testimonials
  testimonials: [
    {
      id: 1,
      name: "Flora Mcgrath",
      position: "AGL Contact Manager",
      company: "AGL Retailer Australia",
      content: "John Carlo is an exceptional team member with outstanding customer service skills. His dedication to learning AI automation and applying it to our QA processes has significantly improved our team's efficiency. A true asset to any organization.",
      rating: 5,
      avatar: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/2k7iim3c_MY%20PICTURE.jpg",
      avatarPosition: "right center",
      featured: true,
      fullImage: "https://customer-assets.emergentagent.com/job_tcs-portfolio-pro/artifacts/2k7iim3c_MY%20PICTURE.jpg"
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      position: "Operations Manager",
      company: "TechFlow Solutions",
      content: "John's automation expertise transformed our workflow efficiency by 60%. His attention to detail and problem-solving skills are exceptional.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Director of Customer Success",
      company: "Global Services Inc.",
      content: "Working with John was a game-changer. His customer service background combined with technical automation skills delivered outstanding results.",
      rating: 5
    }
  ]
};
