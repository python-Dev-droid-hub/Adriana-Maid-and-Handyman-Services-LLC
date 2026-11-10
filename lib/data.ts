export const company = {
  name: "Adriana Maid & Handyman Services LLC",
  shortName: "Adriana Maid & Handyman",
  headerBrand: "Adriana Maid & Handyman Services",
  tagline: "Cleaning, repairs, and the upkeep your home actually needs.",
  phoneDisplay: "(801) 671-106",
  phoneHref: "tel:+1801671106",
  email: "serafin_ledesma@hotmail.com",
  emailHref: "mailto:serafin_ledesma@hotmail.com",
  city: "Park City",
  region: "UT",
  postalCode: "84098",
  serviceArea: [
    "Park City",
    "Snyderville",
    "Heber",
    "Summit Park",
    "Midway",
    "Silver Summit",
  ],
  hours: [
    { label: "Monday – Friday", value: "8:00 AM – 5:00 PM" },
    { label: "Saturday – Sunday", value: "Closed" },
  ],
} as const;

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  headlineLead: "Maid & Handyman Services",
  headlineAccentBefore: "in ",
  headlineAccent: "Park City.",
  subheadline:
    "Professional home cleaning, handyman repairs, garage door, trimming, and delivery for Park City, Heber Valley, and nearby Utah communities.",
  quoteLabel: "Get a Free Quote",
  callLabel: "Call Now",
  quoteHref: "#contact",
  image: "/images/hero.jpg",
  imageAlt:
    "Adriana Maid and Handyman service van in a driveway with cleaning and handyman supplies in the foreground",
} as const;

export const trustBadges = [
  { id: "licensed", label: "Licensed & Insured", icon: "Shield" as const },
  { id: "rated", label: "5-Star Rated", icon: "Star" as const },
  { id: "same-day", label: "Same-Day Service", icon: "Zap" as const },
] as const;

export type ServiceIcon =
  | "TreeDeciduous"
  | "DoorClosed"
  | "Wrench"
  | "Truck"
  | "Sparkles";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  cardDescription: string;
  description: string;
  icon: ServiceIcon;
  image: string;
  learnMoreHref: string;
};

export const servicesSection = {
  title: "Our Services",
  subtitle: "Professional home services, all in one place.",
} as const;

export const services: Service[] = [
  {
    slug: "trimming",
    title: "Trimming",
    cardDescription: "Hedge, bush and tree trimming.",
    summary: "Hedges, shrubs, and small trees shaped back from walks, drives, and the house.",
    description:
      "Overgrown hedges and low branches make a property harder to use and harder to keep tidy. We shape shrubs, trim hedges, and clear growth away from walkways, driveways, and rooflines, then haul the cuttings with the job.",
    icon: "TreeDeciduous",
    image: "/images/services/trimming.png",
    learnMoreHref: "#contact",
  },
  {
    slug: "garage-door",
    title: "Garage Door",
    cardDescription: "Repair and installation.",
    summary: "Doors that stick, sit off track, or will not open and close the way they should.",
    description:
      "A garage door that groans, stops halfway, or will not seal lets in weather and locks you out of the easiest way into the house. We look at tracks, rollers, hinges, cables, and weather seals, tell you what is worn, and get the door moving smoothly again.",
    icon: "DoorClosed",
    image: "/images/services/garage-door.png",
    learnMoreHref: "#contact",
  },
  {
    slug: "handyman",
    title: "Handyman",
    cardDescription: "General home repairs.",
    summary: "The punch-list repairs and small installs that keep a house working.",
    description:
      "Drywall touch-ups, caulking, fixture and hardware swaps, furniture assembly, minor carpentry, and the other jobs that never quite justify a full remodel crew. You get a clear scope before we start and a finished repair you can use the same day.",
    icon: "Wrench",
    image: "/images/services/handyman.png",
    learnMoreHref: "#contact",
  },
  {
    slug: "delivery",
    title: "Delivery",
    cardDescription: "Pickup and local delivery.",
    summary: "Local pickup, drop-off, and haul-away for supplies and household items.",
    description:
      "Need materials on site, an appliance moved, or debris gone after a cleanup? We handle local pickup and drop-off around Park City and the Heber Valley, and we haul away what a repair or cleanout leaves behind.",
    icon: "Truck",
    image: "/images/services/delivery.png",
    learnMoreHref: "#contact",
  },
  {
    slug: "cleaning",
    title: "Cleaning",
    cardDescription: "Maid and home cleaning.",
    summary: "One-time resets and recurring cleans for kitchens, baths, and everyday surfaces.",
    description:
      "Kitchens, bathrooms, floors, and the surfaces you actually use. Book a one-time reset before guests arrive, or a recurring visit so the house stays ready through the week. Tell us what to focus on and we will stick to that list.",
    icon: "Sparkles",
    image: "/images/services/cleaning.png",
    learnMoreHref: "#contact",
  },
];

export type AboutStatIcon = "Users" | "Award" | "Trophy";

export type AboutStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: AboutStatIcon;
  iconClassName?: string;
};

export const about = {
  label: "About Us",
  title: "Family-Owned. Trusted by Your Neighbors.",
  paragraph:
    "Adriana Maid & Handyman Services LLC is a family-owned crew serving Park City and the Heber Valley. Whether you need a deep clean, a reliable handyman, or help around the yard, we focus on quality work, clear communication, and treating your home with respect.",
  teamImage: "/images/team.png",
  teamImageAlt:
    "Adriana Maid and Handyman team members in branded uniforms with tool belts, standing in front of the company van and a home",
  learnMoreLabel: "Learn More",
  learnMoreHref: "#contact",
  checklist: [
    { id: "experienced", label: "Experienced Team" },
    { id: "reliable", label: "Reliable & On Time" },
    { id: "satisfaction", label: "Satisfaction Guaranteed" },
  ],
  stats: [
    {
      id: "customers",
      value: 500,
      suffix: "+",
      label: "Happy Customers",
      icon: "Users",
    },
    {
      id: "experience",
      value: 5,
      suffix: "+",
      label: "Years Experience",
      icon: "Award",
    },
    {
      id: "satisfaction-rate",
      value: 100,
      suffix: "%",
      label: "Satisfaction",
      icon: "Trophy",
      iconClassName: "text-amber-400",
    },
  ] satisfies AboutStat[],
};

export type WhyChooseTile = {
  id: string;
  title: string;
  description: string;
  image: string;
  number: string;
  featured?: boolean;
  badge?: string;
  imageAlt: string;
};

export const whyChooseUs = {
  label: "Why Adriana",
  title: "Why Choose Us",
  subtitle: "Friendly, dependable help for your home.",
  tiles: [
    {
      id: "fast-response",
      number: "01",
      title: "Fast Response",
      description:
        "Call or message us with what your home needs—cleaning, repairs, garage door help, trimming, or a local delivery—and we get back quickly with timing and a clear plan. We work around your schedule, prioritize urgent requests when our calendar allows, and offer same-day visits whenever we can so your home is taken care of without long waits or back-and-forth.",
      image: "/images/why/fast-response.png",
      imageAlt: "3D lightning bolt and stopwatch icon for fast response",
      featured: true,
      badge: "Same-Day Service Available",
    },
    {
      id: "fair-pricing",
      number: "02",
      title: "Fair Pricing",
      description:
        "Clear scope and price before we begin—no surprises when the job is done.",
      image: "/images/why/fair-pricing.png",
      imageAlt: "3D gold coin and price tag icon for fair pricing",
    },
    {
      id: "trained-staff",
      number: "03",
      title: "Trained & Reliable Staff",
      description:
        "Our crew arrives prepared, communicates clearly, and treats your home with care.",
      image: "/images/why/trained-staff.png",
      imageAlt: "3D worker in hard hat icon for trained reliable staff",
    },
    {
      id: "satisfaction-guaranteed",
      number: "04",
      title: "Satisfaction Guaranteed",
      description:
        "If something is not right, tell us—we make it right to your standards.",
      image: "/images/why/satisfaction.png",
      imageAlt: "3D green shield with checkmark icon for satisfaction guarantee",
    },
  ] satisfies WhyChooseTile[],
  trustStats: [
    { id: "customers", value: 500, suffix: "+", label: "Happy Customers" },
    { id: "experience", value: 5, suffix: "+", label: "Years Experience" },
    { id: "satisfaction", value: 100, suffix: "%", label: "Satisfaction" },
  ],
};

export type CtaTrustIcon = "ShieldCheck" | "Star" | "Zap";
export type CtaStepIcon = "MessageSquare" | "FileText" | "CheckCircle";

export const cta = {
  id: "quote",
  label: "Free Quote, Same-Day Service",
  titleLead: "Ready for a",
  titleAccent: "Spotless,",
  titleTrail: "Well-Kept Home?",
  subtitle: "Get your free quote today. Same-day service available.",
  quoteLabel: "Get a Free Quote",
  quoteHref: "#contact",
  callLabel: "Call Now",
  callHref: company.phoneHref,
  crewImage: "/images/cta-crew.png",
  crewImageAlt:
    "Adriana Maid & Handyman crew standing in front of their branded service van",
  pickerLabel: "What do you need help with?",
  trustItems: [
    { id: "licensed", label: "Licensed & Insured", icon: "ShieldCheck" as const },
    { id: "rated", label: "5-Star Rated", icon: "Star" as const },
    { id: "same-day", label: "Same-Day Service", icon: "Zap" as const },
  ] satisfies ReadonlyArray<{ id: string; label: string; icon: CtaTrustIcon }>,
  serviceOptions: [
    { id: "trimming", title: "Trimming", image: "/images/services/trimming.png" },
    { id: "garage-door", title: "Garage Door", image: "/images/services/garage-door.png" },
    { id: "handyman", title: "Handyman", image: "/images/services/handyman.png" },
    { id: "delivery", title: "Delivery", image: "/images/services/delivery.png" },
    { id: "cleaning", title: "Cleaning", image: "/images/services/cleaning.png" },
  ],
  stepsTitle: "How We Work",
  stepsSubtitle:
    "A simple three-step process from your first message to a job done right.",
  steps: [
    {
      id: "tell-us",
      number: "1",
      title: "Tell us what you need",
      description: "Send a message or call with a few details about the job.",
      icon: "MessageSquare" as const,
    },
    {
      id: "quote",
      number: "2",
      title: "Get your free quote",
      description: "You get a clear price before we start—no surprises.",
      icon: "FileText" as const,
    },
    {
      id: "done",
      number: "3",
      title: "We get it done",
      description: "We show up on time and finish the job with care.",
      icon: "CheckCircle" as const,
    },
  ] satisfies ReadonlyArray<{
    id: string;
    number: string;
    title: string;
    description: string;
    icon: CtaStepIcon;
  }>,
} as const;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  service: string;
  imageSrc: string;
  rating: number;
  avatar: {
    initials: string;
    className: string;
  };
};

export const testimonialsSection = {
  title: "What Our Customers Say",
  subtitle: "Real neighbors across Park City and the Heber Valley.",
} as const;

/**
 * Starter quotes for layout only. Replace names and quotes with real reviews before publishing.
 */
export const testimonials: Testimonial[] = [
  {
    id: "cleaning-park-city",
    quote:
      "They deep-cleaned our kitchen and bathrooms before guests arrived. The house looked and smelled fresh, and the team was respectful of our space.",
    name: "Melissa R.",
    role: "Park City homeowner",
    service: "Cleaning",
    imageSrc: "/images/testimonials/melissa.jpg",
    rating: 5,
    avatar: { initials: "MR", className: "bg-teal/15 text-teal" },
  },
  {
    id: "handyman-heber",
    quote:
      "We had a handful of small repairs on one list. They fixed the door hardware, re-caulked the bath, and cleared everything in a single visit.",
    name: "Daniel K.",
    role: "Heber Valley resident",
    service: "Handyman",
    imageSrc: "/images/testimonials/daniel.jpg",
    rating: 5,
    avatar: { initials: "DK", className: "bg-orange/15 text-orange" },
  },
  {
    id: "garage-door-midway",
    quote:
      "Our garage door was loud and stopped halfway. They explained what was worn, replaced the rollers, and it opens smoothly now.",
    name: "Hannah T.",
    role: "Midway homeowner",
    service: "Garage Door",
    imageSrc: "/images/testimonials/hannah.jpg",
    rating: 5,
    avatar: { initials: "HT", className: "bg-navy/10 text-navy" },
  },
];

export type FaqCategory =
  | "all"
  | "pricing"
  | "scheduling"
  | "services"
  | "trust";

export type FaqServiceTag =
  | "Cleaning"
  | "Garage Door"
  | "Trimming"
  | "Delivery"
  | "Handyman";

export type Faq = {
  id: string;
  category: Exclude<FaqCategory, "all">;
  question: string;
  answer: string;
  service?: FaqServiceTag;
  popular?: boolean;
};

export const faqSection = {
  label: "Got Questions?",
  title: "Frequently Asked Questions",
  subtitle:
    "Quick answers about our cleaning, handyman, garage door, trimming and delivery services.",
  image: "/images/faq.jpg",
  imageAlt: "3D question mark and house illustration",
  defaultOpenId: "get-quote",
  searchPlaceholder: "Search questions...",
  emptyState:
    "No match found. Call us or send a message and we'll help.",
  helpTitle: "Still have questions?",
  helpText:
    "Our family-owned team is happy to help. We reply within a few hours.",
  helpQuoteLabel: "Get a Free Quote",
  helpQuoteHref: "#quote",
  helpCallLabel: "Call Now",
  helpMessageLabel: "Send us a message",
  helpMessageHref: "#contact",
  categories: [
    { id: "all", label: "All" },
    { id: "pricing", label: "Pricing & Quotes" },
    { id: "scheduling", label: "Scheduling" },
    { id: "services", label: "Services" },
    { id: "trust", label: "Trust & Safety" },
  ] as const satisfies ReadonlyArray<{ id: FaqCategory; label: string }>,
  serviceIcons: {
    Cleaning: "/images/services/cleaning.png",
    "Garage Door": "/images/services/garage-door.png",
    Trimming: "/images/services/trimming.png",
    Delivery: "/images/services/delivery.png",
    Handyman: "/images/services/handyman.png",
  } as const satisfies Record<FaqServiceTag, string>,
} as const;

export const faqs: Faq[] = [
  {
    id: "get-quote",
    category: "pricing",
    question: "How do I get a quote?",
    answer:
      "We offer free quotes. Send the form, call us, or message us with a few details and photos. We reply within a few hours.",
    popular: true,
  },
  {
    id: "quote-free",
    category: "pricing",
    question: "Is the quote really free, with no obligation?",
    answer:
      "Yes. You only pay if you approve the work. Getting a quote never locks you into a booking.",
  },
  {
    id: "pricing-decided",
    category: "pricing",
    question: "How is pricing decided?",
    answer:
      "Pricing depends on the size of the job, time, and materials. You get the full price before we begin, so there are no surprises.",
  },
  {
    id: "payment-methods",
    category: "pricing",
    // TODO: Owner to confirm accepted payment methods.
    question: "What payment methods do you accept?",
    answer:
      "Cash, major cards, and common digital payment apps. Ask us when you book if you prefer a specific option.",
  },
  {
    id: "materials-included",
    category: "pricing",
    question: "Are materials included in the quote?",
    answer:
      "When materials are needed, we include them in the quote up front or note them clearly so you know the total before we start.",
  },
  {
    id: "same-day",
    category: "scheduling",
    question: "Do you offer same-day service?",
    answer:
      "Often yes, depending on our schedule and the job. Call us early in the day for the best chance at a same-day visit.",
    popular: true,
  },
  {
    id: "business-hours",
    category: "scheduling",
    question: "What are your business hours?",
    answer:
      "Monday through Friday, 8:00 AM to 5:00 PM. We are closed Saturday and Sunday. Call or message us during those hours for the fastest reply.",
  },
  {
    id: "need-to-be-home",
    category: "scheduling",
    question: "Do I need to be home during the service?",
    answer:
      "Not always. For cleaning and trimming you can give us access. For repairs it helps to be there for the first few minutes.",
  },
  {
    id: "how-far-ahead",
    category: "scheduling",
    question: "How far ahead should I book?",
    answer:
      "A few days ahead is ideal, especially for larger jobs. Urgent needs can often be worked in sooner when our schedule allows.",
  },
  {
    id: "reschedule-cancel",
    category: "scheduling",
    question: "Can I reschedule or cancel?",
    answer:
      "Yes. Please give us as much notice as you can so we can offer your slot to another homeowner and rebook you smoothly.",
  },
  {
    id: "service-area",
    category: "services",
    question: "What areas do you serve?",
    answer:
      "Park City, the Heber Valley, and nearby areas including Snyderville, Heber, Summit Park, Midway, and Silver Summit. If you are not sure, contact us.",
    popular: true,
  },
  {
    id: "cleaning-supplies",
    category: "services",
    service: "Cleaning",
    question: "Do you bring your own cleaning supplies and tools?",
    answer:
      "Yes, we bring our own supplies and tools. If you prefer specific products, let us know when you book.",
  },
  {
    id: "garage-door-work",
    category: "services",
    service: "Garage Door",
    question: "Can you repair or replace a garage door?",
    answer:
      "Yes. We handle common repairs and installations. Send a photo of the problem for a faster quote.",
  },
  {
    id: "trimming-scope",
    category: "services",
    service: "Trimming",
    question: "What kind of trimming do you do?",
    answer:
      "Hedge, bush, and tree trimming, plus clean-up after the job so your yard is left tidy.",
  },
  {
    id: "handyman-scope",
    category: "services",
    service: "Handyman",
    question: "What handyman jobs do you take?",
    answer:
      "General home repairs such as fixtures, mounting, patching, and small fixes around the house. We also handle local delivery when you need it.",
  },
  {
    id: "licensed-insured",
    category: "trust",
    question: "Are you licensed and insured?",
    answer:
      "Yes, fully licensed and insured, so your home and our crew are protected on every visit.",
  },
  {
    id: "trained-staff",
    category: "trust",
    // TODO: Owner to confirm background-check policy before publishing this claim publicly.
    question: "Are your team members trained and reliable?",
    answer:
      "Yes. Our crew is trained, background-checked, and treats your home with care from start to finish.",
  },
  {
    id: "satisfaction",
    category: "trust",
    question: "What if I am not happy with the result?",
    answer:
      "Tell us within 24 hours and we will come back and make it right at no extra charge for the fix.",
  },
  {
    id: "pets-home",
    category: "trust",
    question: "Are you comfortable working around pets?",
    answer:
      "Yes. Let us know about pets when you book so we can plan access and keep everyone comfortable during the visit.",
  },
  {
    id: "home-security",
    category: "trust",
    question: "How do you keep my home secure?",
    answer:
      "We only enter with your permission, follow your access instructions, and leave doors and gates as we found them when we finish.",
  },
];

export const contactSection = {
  title: "Get in Touch",
  intro:
    "Tell us what your home needs — a clean, a repair, trimming, garage door help, or a local delivery. We will follow up with timing and a free quote.",
  formTitle: "Send a Message",
  detailsTitle: "Reach us directly",
  detailsIntro: "Prefer a quick call or email? We usually reply within a few hours on business days.",
  callCtaTitle: "Need help now?",
  callCtaText: "Talk with our team for a free quote and same-day availability when the schedule allows.",
  callCtaLabel: "Call Now",
  successTitle: "Message sent",
  successMessage:
    "Thanks for reaching out. We received your message and will get back to you during business hours.",
  submitLabel: "Send Message",
  mapTitle: "Service area map",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27533.02289781342!2d-111.5185!3d40.6461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752739f0b0c2b4b%3A0x9e6fa2f8b8c57e9d!2sPark%20City%2C%20UT!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
} as const;

export type FooterSocialIcon = "facebook" | "instagram" | "google";

export const footer = {
  tagline: "Quality home services for Park City and nearby communities.",
  copyright: "© 2026 Adriana Maid & Handyman Services LLC. All rights reserved.",
  creditPrefix: "Developed and designed by",
  creditLabel: "US Brand Booster LLC",
  creditHref: "https://usbrandbooster.com/",
  contactTitle: "Contact",
  subscribeTitle: "Stay Updated",
  subscribeNote: "Get cleaning tips and service updates. No spam.",
  subscribePlaceholder: "Your email address",
  subscribeLabel: "Subscribe",
  subscribeSuccess: "Thanks — you are on the list.",
  quickLinks: [
    { href: "#hero", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ],
  serviceLinks: services.map((service) => ({
    href: "#services",
    label: service.title,
  })),
  socialLinks: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: "facebook" as FooterSocialIcon,
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: "instagram" as FooterSocialIcon,
    },
    {
      id: "google",
      label: "Google",
      href: "https://www.google.com/maps",
      icon: "google" as FooterSocialIcon,
    },
  ],
} as const;
