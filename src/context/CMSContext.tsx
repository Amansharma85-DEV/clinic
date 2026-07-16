import React, { createContext, useContext, useState, useEffect } from 'react';

// --- TYPES ---
export interface ClinicInfo {
  name: string;
  logoText: string;
  logoUrl?: string; // Base64 if custom uploaded
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  whatsappNumber: string;
  callNumber: string;
  googleMapsLink: string;
  instagramUrl: string;
  facebookUrl: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
  rating: string;
  ratingCount: string;
  experience: string;
  safety: string;
}

export interface AboutData {
  heading: string;
  content: string;
  imageUrl: string;
  stats: { value: string; label: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name mapping
}

export interface DoctorItem {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  specialization: string;
  languages: string;
  imageUrl: string;
}

export interface BeforeAfterItem {
  id: string;
  category: string; // Acne, Pigmentation, Laser, Hair, Facial
  beforeImage: string;
  afterImage: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  review: string;
  location: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AppointmentLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Cancelled';
  createdAt: string;
}

export interface ThemeConfig {
  primaryFont: string;
  primaryColor: string; // e.g. Soft Blue #f0f7ff
  accentColor: string;  // e.g. Gold #c5a880
  greenColor: string;   // e.g. Light Green #f2faf3
  isDarkTheme: boolean;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
  metaKeywords: string;
}

export interface ClinicState {
  clinicInfo: ClinicInfo;
  hero: HeroData;
  about: AboutData;
  services: ServiceItem[];
  whyChooseUs: WhyChooseUsItem[];
  doctors: DoctorItem[];
  beforeAfter: BeforeAfterItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  leads: AppointmentLead[];
  theme: ThemeConfig;
  seo: SEOConfig;
}

// --- INITIAL SEED DATA ---
const DEFAULT_STATE: ClinicState = {
  clinicInfo: {
    name: "Aura Skin & Hair Clinic",
    logoText: "Aura",
    phone: "+1 (555) 019-2834",
    email: "appointments@auraclinic.com",
    address: "101 Luxury Wellness Blvd, Beverly Hills, CA 90210",
    workingHours: "Monday - Saturday: 10:00 AM - 8:00 PM, Sunday: Closed",
    whatsappNumber: "+15550192834",
    callNumber: "+15550192834",
    googleMapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.708682054668!2d-118.40348738478435!3d34.07062402393278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc0bc7c14a9b%3A0xa648a30a84e27fbd!2sBeverly%20Hills%2C%20CA%2090210%2C%20USA!5e0!3m2!1sen!2sin!4v1688000000000!5m2!1sen!2sin",
    instagramUrl: "https://instagram.com",
    facebookUrl: "https://facebook.com"
  },
  hero: {
    title: "Healthy Skin,\nBeautiful Confidence.",
    subtitle: "Advanced Skin, Hair & Laser Treatments by Certified Dermatologists using modern technology and personalized care.",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    rating: "4.9 Rating",
    ratingCount: "5000+ Happy Patients",
    experience: "10+ Years Experience",
    safety: "100% Safe Treatment"
  },
  about: {
    heading: "Welcome to Our Skin Clinic",
    content: "We specialize in advanced skin, hair and cosmetic treatments designed to improve confidence and overall skin health. Our experienced dermatologists use modern technology with personalized treatment plans for every patient.",
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&w=800&q=80",
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "5000+", label: "Happy Patients" },
      { value: "25+", label: "Treatments Available" },
      { value: "98%", label: "Patient Satisfaction" }
    ]
  },
  services: [
    {
      id: "srv-1",
      title: "Acne Treatment",
      description: "Targeted clinical therapy to clear active acne breakouts and restore skin balance.",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      category: "Skin"
    },
    {
      id: "srv-2",
      title: "Acne Scar Removal",
      description: "Advanced laser resurfacing and microneedling to minimize deep scars and texturing.",
      imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80",
      category: "Laser"
    },
    {
      id: "srv-3",
      title: "Pigmentation Treatment",
      description: "Remove dark spots, melasma, and uneven skin tone using modern lasers.",
      imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80",
      category: "Skin"
    },
    {
      id: "srv-4",
      title: "Laser Hair Removal",
      description: "Safe, permanent hair reduction for smooth skin using US FDA-approved lasers.",
      imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
      category: "Laser"
    },
    {
      id: "srv-5",
      title: "Hydra Facial",
      description: "Deep cleansing, exfoliation, and hydration with nourishing serums for dynamic glow.",
      imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
      category: "Facial"
    },
    {
      id: "srv-6",
      title: "Chemical Peel",
      description: "Medical-grade peels to exfoliate outer layers and reveal fresh skin underneath.",
      imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
      category: "Facial"
    },
    {
      id: "srv-7",
      title: "Skin Brightening",
      description: "Customized IV therapy and topical formulations for radiant and healthy skin.",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
      category: "Skin"
    },
    {
      id: "srv-8",
      title: "Hair Fall Treatment",
      description: "Effective medical protocols to halt hair loss and stimulate new follicles.",
      imageUrl: "https://images.unsplash.com/photo-1585751119414-ef2636f8aedf?auto=format&fit=crop&w=600&q=80",
      category: "Hair"
    },
    {
      id: "srv-9",
      title: "PRP Therapy",
      description: "Platelet-Rich Plasma treatment for active skin rejuvenation and hair regrowth.",
      imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80",
      category: "Hair"
    },
    {
      id: "srv-10",
      title: "Anti Aging Treatment",
      description: "Non-surgical skin tightening, collagen boosters, and cellular therapies.",
      imageUrl: "https://images.unsplash.com/photo-1614859324967-bdf461fcf769?auto=format&fit=crop&w=600&q=80",
      category: "Anti-Aging"
    },
    {
      id: "srv-11",
      title: "Botox",
      description: "Smoothen fine lines, crow's feet, and wrinkles with precise micro-injections.",
      imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80",
      category: "Anti-Aging"
    },
    {
      id: "srv-12",
      title: "Fillers",
      description: "Restore youthful volume to cheeks, lips, and under-eye hollows.",
      imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80",
      category: "Anti-Aging"
    },
    {
      id: "srv-13",
      title: "Skin Allergy Treatment",
      description: "Comprehensive testing and management plans for acute and chronic allergies.",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      category: "Skin"
    },
    {
      id: "srv-14",
      title: "Mole Removal",
      description: "Quick, painless radiofrequency excision leaving minimal to no scarring.",
      imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      category: "Skin"
    },
    {
      id: "srv-15",
      title: "Wart Removal",
      description: "Cryotherapy or laser removal to clear persistent warts and lesions safely.",
      imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&w=600&q=80",
      category: "Skin"
    },
    {
      id: "srv-16",
      title: "Nail Treatment",
      description: "Therapeutic care for fungal nail infections, ingrowths, and brittleness.",
      imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
      category: "Skin"
    }
  ],
  whyChooseUs: [
    { id: "wcu-1", title: "Experienced Dermatologists", description: "Our doctors hold MD and board certifications with over a decade of clinical experience.", iconName: "UserCheck" },
    { id: "wcu-2", title: "Modern Equipment", description: "We employ cutting-edge clinical devices for precise, swift diagnostic assessments.", iconName: "Cpu" },
    { id: "wcu-3", title: "FDA Approved Technology", description: "Your safety is paramount; we only use globally accredited FDA technologies.", iconName: "ShieldCheck" },
    { id: "wcu-4", title: "Affordable Pricing", description: "High-end skincare structured transparently without any hidden premiums.", iconName: "BadgeDollarSign" },
    { id: "wcu-5", title: "Personalized Care", description: "Individualized therapy tracks tailored precisely for your custom biology.", iconName: "HeartHandshake" },
    { id: "wcu-6", title: "Safe & Hygienic Environment", description: "Sterile conditions matching international clinical sanitization protocols.", iconName: "Sparkles" },
    { id: "wcu-7", title: "Minimal Waiting Time", description: "Smart calendar routing ensures zero bottlenecks on your visit.", iconName: "Clock" },
    { id: "wcu-8", title: "Easy Online Booking", description: "Claim and adjust calendar slots from any desktop or mobile unit instantly.", iconName: "CalendarCheck" }
  ],
  doctors: [
    {
      id: "doc-1",
      name: "Dr. Elena Vance",
      qualification: "MD - Dermatology, Venereology & Leprosy, MBBS",
      experience: "12+ Years",
      specialization: "Cosmetic Dermatology, Anti-Aging & Laser Treatments",
      languages: "English, Spanish",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "doc-2",
      name: "Dr. Marcus Sterling",
      qualification: "MD, FAAD (Fellow of American Academy of Dermatology)",
      experience: "15+ Years",
      specialization: "Clinical Dermatology, Acne Management & Hair Restoration",
      languages: "English, French",
      imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80"
    }
  ],
  beforeAfter: [
    {
      id: "ba-1",
      category: "Acne",
      beforeImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "ba-2",
      category: "Pigmentation",
      beforeImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "ba-3",
      category: "Laser",
      beforeImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "ba-4",
      category: "Hair",
      beforeImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1585751119414-ef2636f8aedf?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "ba-5",
      category: "Facial",
      beforeImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80",
      afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
    }
  ],
  testimonials: [
    {
      id: "tst-1",
      name: "Sophia Loren",
      rating: 5,
      review: "Aura Clinic changed my life. My acne was severe, and Dr. Elena formulated a plan that cleared my skin in 3 months! I feel confident again.",
      location: "Beverly Hills",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: "tst-2",
      name: "Isabella Ross",
      rating: 5,
      review: "Laser Hair Removal was virtually painless and so fast. Best technology and wonderful staff. Highly recommended!",
      location: "Santa Monica",
      imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: "tst-3",
      name: "Clara Jenkins",
      rating: 5,
      review: "The Hydra Facial is my monthly ritual now. My skin has never looked so glowing, hydrated, and plump!",
      location: "Pasadena",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ],
  faqs: [
    { id: "faq-1", question: "How long does acne treatment take?", answer: "Typically, visible improvements can be seen within 4-6 weeks, while complete clearance can take 3-6 months depending on the severity of the acne and compliance with the treatment plan." },
    { id: "faq-2", question: "Is laser hair removal permanent?", answer: "Laser hair removal offers permanent hair reduction. It reduces hair growth by 85-90%. Any hair that grows back will be much finer, lighter, and sparse. Maintenance sessions are recommended once or twice a year." },
    { id: "faq-3", question: "Do you provide online consultation?", answer: "Yes, we provide digital consultations via secure video calls for follow-ups and skin assessments. However, some procedures require in-person visits." },
    { id: "faq-4", question: "Are treatments safe?", answer: "Absolutely. All our laser treatments and clinical procedures are performed by certified, board-registered dermatologists using US FDA-approved equipment under strict hygienic protocols." },
    { id: "faq-5", question: "What is PRP?", answer: "PRP (Platelet-Rich Plasma) therapy uses a concentration of your own platelets from your blood to stimulate collagen production and speed up healing. It is highly effective for hair restoration and facial rejuvenation." },
    { id: "faq-6", question: "How much does consultation cost?", answer: "Our standard consultation with a certified dermatologist starts at $75. This includes a full skin and hair analysis and a customized treatment prescription." }
  ],
  leads: [
    {
      id: "lead-1",
      name: "Jane Doe",
      phone: "(555) 123-4567",
      email: "jane.doe@example.com",
      treatment: "Acne Scar Removal",
      preferredDate: "2026-07-20",
      message: "Looking for an appointment to treat my post-acne scarring. Hope to hear back soon!",
      status: "Pending",
      createdAt: new Date().toISOString()
    }
  ],
  theme: {
    primaryFont: "Inter",
    primaryColor: "#f0f7ff", // Soft blue
    accentColor: "#c5a880",  // Gold accent
    greenColor: "#f2faf3",   // Light green
    isDarkTheme: false
  },
  seo: {
    metaTitle: "Aura Skin & Hair Clinic | Premium Dermatological Treatments",
    metaDescription: "Welcome to Aura Skin & Hair Clinic. We provide advanced clinical treatments for acne, scars, hair loss, laser reduction and high-end facial care by certified dermatologists.",
    metaKeywords: "skin clinic, hair clinic, dermatologist, laser hair removal, botox, chemical peel, hydra facial, acne treatment, PRP therapy",
    googleAnalyticsId: "G-XXXXXXXXXX"
  }
};

const LOCAL_STORAGE_KEY = 'aura_clinic_cms_state';

// --- CONTEXT PROVIDER INTERFACE ---
interface CMSContextType {
  state: ClinicState;
  updateClinicInfo: (info: Partial<ClinicInfo>) => void;
  updateHero: (hero: Partial<HeroData>) => void;
  updateAbout: (about: Partial<AboutData>) => void;
  
  // Services
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  reorderServices: (services: ServiceItem[]) => void;
  
  // Doctors
  addDoctor: (doctor: Omit<DoctorItem, 'id'>) => void;
  updateDoctor: (id: string, doctor: Partial<DoctorItem>) => void;
  deleteDoctor: (id: string) => void;
  
  // Before & After
  addBeforeAfter: (item: Omit<BeforeAfterItem, 'id'>) => void;
  updateBeforeAfter: (id: string, item: Partial<BeforeAfterItem>) => void;
  deleteBeforeAfter: (id: string) => void;
  
  // Testimonials
  addTestimonial: (testimonial: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  
  // FAQs
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  
  // Leads (Bookings)
  addLead: (lead: Omit<AppointmentLead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: AppointmentLead['status']) => void;
  deleteLead: (id: string) => void;
  
  // Theme & SEO
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateSEO: (seo: Partial<SEOConfig>) => void;
  
  // Backup / Restore
  exportState: () => string;
  importState: (jsonString: string) => boolean;
  resetToDefault: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ClinicState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateClinicInfo = (info: Partial<ClinicInfo>) => {
    setState(prev => ({ ...prev, clinicInfo: { ...prev.clinicInfo, ...info } }));
  };

  const updateHero = (hero: Partial<HeroData>) => {
    setState(prev => ({ ...prev, hero: { ...prev.hero, ...hero } }));
  };

  const updateAbout = (about: Partial<AboutData>) => {
    setState(prev => ({ ...prev, about: { ...prev.about, ...about } }));
  };

  // --- SERVICES ---
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`
    };
    setState(prev => ({ ...prev, services: [...prev.services, newService] }));
  };

  const updateService = (id: string, service: Partial<ServiceItem>) => {
    setState(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...service } : s)
    }));
  };

  const deleteService = (id: string) => {
    setState(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const reorderServices = (services: ServiceItem[]) => {
    setState(prev => ({ ...prev, services }));
  };

  // --- DOCTORS ---
  const addDoctor = (doctor: Omit<DoctorItem, 'id'>) => {
    const newDoctor: DoctorItem = {
      ...doctor,
      id: `doc-${Date.now()}`
    };
    setState(prev => ({ ...prev, doctors: [...prev.doctors, newDoctor] }));
  };

  const updateDoctor = (id: string, doctor: Partial<DoctorItem>) => {
    setState(prev => ({
      ...prev,
      doctors: prev.doctors.map(d => d.id === id ? { ...d, ...doctor } : d)
    }));
  };

  const deleteDoctor = (id: string) => {
    setState(prev => ({
      ...prev,
      doctors: prev.doctors.filter(d => d.id !== id)
    }));
  };

  // --- BEFORE & AFTER ---
  const addBeforeAfter = (item: Omit<BeforeAfterItem, 'id'>) => {
    const newItem: BeforeAfterItem = {
      ...item,
      id: `ba-${Date.now()}`
    };
    setState(prev => ({ ...prev, beforeAfter: [...prev.beforeAfter, newItem] }));
  };

  const updateBeforeAfter = (id: string, item: Partial<BeforeAfterItem>) => {
    setState(prev => ({
      ...prev,
      beforeAfter: prev.beforeAfter.map(ba => ba.id === id ? { ...ba, ...item } : ba)
    }));
  };

  const deleteBeforeAfter = (id: string) => {
    setState(prev => ({
      ...prev,
      beforeAfter: prev.beforeAfter.filter(ba => ba.id !== id)
    }));
  };

  // --- TESTIMONIALS ---
  const addTestimonial = (testimonial: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...testimonial,
      id: `tst-${Date.now()}`
    };
    setState(prev => ({ ...prev, testimonials: [...prev.testimonials, newTestimonial] }));
  };

  const updateTestimonial = (id: string, testimonial: Partial<TestimonialItem>) => {
    setState(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...testimonial } : t)
    }));
  };

  const deleteTestimonial = (id: string) => {
    setState(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  // --- FAQS ---
  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFAQ: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    setState(prev => ({ ...prev, faqs: [...prev.faqs, newFAQ] }));
  };

  const updateFAQ = (id: string, faq: Partial<FAQItem>) => {
    setState(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => f.id === id ? { ...f, ...faq } : f)
    }));
  };

  const deleteFAQ = (id: string) => {
    setState(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
  };

  // --- LEADS ---
  const addLead = (lead: Omit<AppointmentLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: AppointmentLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setState(prev => ({ ...prev, leads: [newLead, ...prev.leads] }));
  };

  const updateLeadStatus = (id: string, status: AppointmentLead['status']) => {
    setState(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === id ? { ...l, status } : l)
    }));
  };

  const deleteLead = (id: string) => {
    setState(prev => ({
      ...prev,
      leads: prev.leads.filter(l => l.id !== id)
    }));
  };

  // --- THEME & SEO ---
  const updateTheme = (theme: Partial<ThemeConfig>) => {
    setState(prev => ({ ...prev, theme: { ...prev.theme, ...theme } }));
  };

  const updateSEO = (seo: Partial<SEOConfig>) => {
    setState(prev => ({ ...prev, seo: { ...prev.seo, ...seo } }));
  };

  // --- BACKUP & RESTORE ---
  const exportState = () => {
    return JSON.stringify(state, null, 2);
  };

  const importState = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      // Basic validation of fields to check validity
      if (parsed.clinicInfo && parsed.hero && parsed.services && parsed.doctors) {
        setState(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to restore default clinic content? All unsaved customizations and leads will be lost.")) {
      setState(DEFAULT_STATE);
    }
  };

  return (
    <CMSContext.Provider value={{
      state,
      updateClinicInfo,
      updateHero,
      updateAbout,
      addService,
      updateService,
      deleteService,
      reorderServices,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      addBeforeAfter,
      updateBeforeAfter,
      deleteBeforeAfter,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      addLead,
      updateLeadStatus,
      deleteLead,
      updateTheme,
      updateSEO,
      exportState,
      importState,
      resetToDefault
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
