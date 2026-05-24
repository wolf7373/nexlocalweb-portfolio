"use client";

import "./raf-polyfill";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Calendar,
  ChevronDown,
  Clock3,
  Cpu,
  Dumbbell,
  ExternalLink,
  Gauge,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Target,
  WandSparkles,
  Zap,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const email = "nexlocalweb@gmail.com";

const navItems = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Team", "#team"],
  ["Contact", "#contact"]
] as const;

type Stat = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { value: 62, suffix: "+", label: "Projects completed", icon: Rocket },
  { value: 98, suffix: "%", label: "Client satisfaction", icon: BadgeCheck },
  { value: 3.4, suffix: "x", label: "Average growth", decimals: 1, icon: BarChart3 },
  { value: 10, suffix: " days", label: "Fast delivery", icon: Clock3 }
];

const services: Array<{ title: string; body: string; icon: LucideIcon }> = [
  {
    title: "Business Websites",
    body: "Premium brand websites for local businesses that need trust, clarity, and high-converting pages.",
    icon: Globe2
  },
  {
    title: "Gym Websites",
    body: "Bold fitness experiences with class highlights, trainer sections, offers, and inquiry-ready CTAs.",
    icon: Dumbbell
  },
  {
    title: "Restaurant Websites",
    body: "Menu-led restaurant and cafe websites built for reservations, discovery, and repeat visitors.",
    icon: Store
  },
  {
    title: "AI Chat Integration",
    body: "Smart inquiry flows and AI-assisted lead capture concepts that make support feel instant.",
    icon: Bot
  },
  {
    title: "Landing Pages",
    body: "Focused sales pages for launches, campaigns, ads, personal brands, and local offers.",
    icon: MousePointer2
  },
  {
    title: "Website Redesign",
    body: "Transform dated websites into premium digital storefronts without losing your identity.",
    icon: WandSparkles
  },
  {
    title: "Speed Optimization",
    body: "Cleaner frontend builds, image handling, and interaction polish for fast perceived performance.",
    icon: Gauge
  },
  {
    title: "SEO-Friendly Design",
    body: "Structured sections, readable content, and local intent baked into the UI foundation.",
    icon: Search
  }
];

type Project = {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  colors: [string, string];
  image?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    title: "Interview Guider AI",
    category: "Startup",
    summary:
      "An AI-powered interview preparation platform with mock interview flows, DSA/System Design/HR practice paths, scheduling, and feedback-led progress tracking.",
    tags: ["AI Product", "Interview UX", "Scheduling", "Feedback"],
    colors: ["#22d3ee", "#7c3aed"],
    image: "/images/projects/interview-guider-ai-sharp.png",
    liveUrl: "https://interview-guider.vercel.app/"
  },
  {
    title: "Modern Gym Website",
    category: "Gym",
    summary: "A premium fitness website with membership CTAs, trainer proof, and a mobile-first class journey.",
    tags: ["Next.js", "Motion", "SEO"],
    colors: ["#0ea5e9", "#7c3aed"]
  },
  {
    title: "Luxury Cafe Website",
    category: "Cafe",
    summary: "An elegant cafe experience with menu storytelling, gallery sections, and local discovery content.",
    tags: ["Brand UI", "Menu UX", "Local SEO"],
    colors: ["#06b6d4", "#d946ef"]
  },
  {
    title: "Restaurant Ordering UI",
    category: "Restaurant",
    summary: "A conversion-led ordering interface designed around quick decisions and clear offer hierarchy.",
    tags: ["React", "Ordering UI", "Mobile"],
    colors: ["#f97316", "#8b5cf6"]
  },
  {
    title: "Real Estate Landing Page",
    category: "Real Estate",
    summary: "A trust-heavy property landing page with lead forms, amenity storytelling, and locality proof.",
    tags: ["Lead Gen", "Maps", "CRM Ready"],
    colors: ["#22c55e", "#0ea5e9"]
  },
  {
    title: "AI Startup Dashboard",
    category: "AI",
    summary: "A futuristic UI concept for showing leads, business scores, and growth opportunities.",
    tags: ["AI UI", "Dashboard", "SaaS Feel"],
    colors: ["#8b5cf6", "#22d3ee"]
  }
];

const reasons: Array<{ title: string; body: string; icon: LucideIcon }> = [
  { title: "Modern UI/UX", body: "Interfaces that make small businesses feel established and premium.", icon: Palette },
  { title: "Mobile-first design", body: "Built for the way Indian customers browse, compare, and inquire.", icon: Sparkles },
  { title: "Fast loading websites", body: "Lean pages, optimized media, and performance-minded motion.", icon: Zap },
  { title: "AI-powered workflow", body: "Sharper research, faster content direction, and smarter launch planning.", icon: Cpu },
  { title: "Conversion focused", body: "Every section guides users toward calls, visits, emails, or inquiries.", icon: Target },
  {
    title: "Local business understanding",
    body: "Copy and structure tailored for gyms, cafes, clinics, shops, and institutes.",
    icon: MapPin
  },
  { title: "Affordable premium quality", body: "Startup-grade polish with practical delivery for local growth.", icon: ShieldCheck }
];

const processSteps = ["Discovery Call", "Research & Planning", "UI/UX Design", "Development", "Launch & Support"];

const team = [
  ["Vishal", "Founder", "Leads client strategy, design direction, and the premium standard behind every launch.", "V"],
  ["Rinku", "Lead Developer", "Owns frontend build quality, responsive systems, and production-ready implementation.", "R"],
  ["Satyawan", "Full-Stack Developer", "Handles technical architecture, integrations, and dependable delivery across the stack.", "S"],
  ["Prashant", "Client Success", "Keeps communication clear, timelines smooth, and the launch experience comfortable.", "P"]
] as const;

const testimonials = [
  [
    "Rahul Kapoor",
    "IronHouse Gym, Pune",
    "NexLocalWeb made our gym look like a premium fitness brand. Trial class inquiries started coming from the first week."
  ],
  [
    "Nisha Fernandes",
    "BrewLane Cafe, Goa",
    "The website feels premium without being complicated. Our menu, location, and inquiries are finally easy for customers."
  ],
  [
    "Dr. Tanvi Shah",
    "UrbanSmiles Clinic, Ahmedabad",
    "They understood trust and clarity. The new site feels clean, modern, and professional."
  ],
  [
    "Arjun Bedi",
    "Skyline Realty, Jaipur",
    "The landing page made our project feel high-value. The mobile lead form helped the sales team respond quickly."
  ]
] as const;

const faqs = [
  ["How much will my website cost?", "Pricing is discussed on a call after understanding your business, pages, timeline, and design requirements."],
  ["How long does delivery take?", "A focused landing page can be delivered quickly. Full premium websites depend on content readiness and revision rounds."],
  ["How many revisions are included?", "Every project includes structured revision rounds during design and final polish."],
  ["Do you handle hosting?", "We can guide hosting and domain setup. The website stays frontend-only unless your project needs something more."],
  ["Will the website be SEO-friendly?", "Yes. We build clean structure, metadata, local intent sections, fast layouts, and readable content."],
  ["Do you provide support after launch?", "Yes. Launch support and maintenance can be discussed based on your business needs."]
] as const;

const revealVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 280, damping: 28 });
  const springY = useSpring(y, { stiffness: 280, damping: 28 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return <motion.div aria-hidden className="cursor-dot" style={{ x: springX, y: springY }} />;
}

function Reveal({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <Reveal className="mx-auto mb-9 max-w-3xl text-center md:mb-14">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base md:mt-5 md:text-lg">{body}</p>
    </Reveal>
  );
}

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(Number(latest.toFixed(decimals)));
      }
    });
    return controls.stop;
  }, [decimals, inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
}

function HeroVisual() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-[-120px] z-0 mx-auto hidden w-[min(980px,86vw)] md:block"
      animate={{ y: [-12, 12, -12], rotate: [-0.6, 0.7, -0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="mock-device rounded-[8px] border border-white/14 bg-slate-950/82 p-3 shadow-glow backdrop-blur-xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[8px]">
          <Image
            src="/images/nexlocalweb-hero.png"
            alt=""
            fill
            sizes="980px"
            className="object-cover object-[center_58%] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/48 via-transparent to-cyan-300/10" />
        </div>
      </div>
      <motion.div
        className="absolute -right-7 bottom-8 w-44 rounded-[8px] border border-white/12 bg-slate-950/88 p-2 shadow-violet backdrop-blur-xl"
        animate={{ y: [10, -12, 10] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <div className="aspect-[9/16] rounded-[8px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 p-3">
          <div className="h-full rounded-[8px] bg-slate-950/82 p-3">
            <div className="mb-4 h-20 rounded-[8px] bg-white/18" />
            <div className="mb-2 h-3 rounded-full bg-white/70" />
            <div className="mb-5 h-3 w-2/3 rounded-full bg-white/35" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-[8px] bg-cyan-300/25" />
              <div className="h-14 rounded-[8px] bg-violet-300/25" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Particles() {
  return (
    <div aria-hidden className="particle-field">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="particle"
          style={
            {
              "--x": `${(index * 19) % 100}%`,
              "--delay": `${index * 0.45}s`,
              "--duration": `${9 + (index % 6)}s`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function MotionLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <motion.a
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`}
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
    >
      {children}
    </motion.a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<string>(faqs[0][0]);
  const categories = ["All", "Startup", "Gym", "Cafe", "Restaurant", "Real Estate", "AI"];
  const filteredProjects = useMemo(
    () => projects.filter((project) => activeCategory === "All" || project.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="relative overflow-hidden">
      <CustomCursor />
      <div className="grid-bg" />
      <div className="noise" />
      <Particles />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#060816]/72 backdrop-blur-2xl">
        <motion.nav
          className="shell flex h-16 items-center justify-between md:h-20"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#top" className="text-lg font-semibold tracking-wide md:text-xl">
            NexLocalWeb
          </a>
          <div className="hidden items-center gap-7 rounded-full border border-white/10 bg-white/[.035] px-5 py-3 text-sm text-slate-300 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
          </div>
          <div className="hidden sm:block">
            <MotionLink href="#contact">Book Free Call <Calendar className="size-4" /></MotionLink>
          </div>
          <button
            className="btn btn-secondary px-3 lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="size-5" />
          </button>
        </motion.nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.24 }}
              className="shell pb-4 lg:hidden"
            >
              <div className="glass grid rounded-[8px] p-2">
                {navItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[8px] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[.06]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="relative overflow-hidden pt-28 md:min-h-[92vh] md:pt-36">
        <Image
          src="/images/nexlocalweb-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover opacity-24"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,8,22,.62),rgba(6,8,22,.76)_48%,#060816_94%)]" />
        <motion.div
          aria-hidden
          className="absolute left-4 right-4 top-20 -z-10 h-80 bg-gradient-to-r from-cyan-500/16 via-violet-500/16 to-blue-500/16 blur-3xl"
          animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="shell relative z-10 pb-16 text-center md:pb-64">
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Websites that make local businesses look <span className="gradient-text">premium.</span>
            </motion.h1>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base md:mt-6 md:text-lg md:leading-8">
                NexLocalWeb builds cinematic, mobile-first websites for gyms, cafes, restaurants, clinics, real estate
                brands, coaching institutes, shops, personal brands, and startups across India.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <MotionLink href="#contact">Book Free Call <ArrowRight className="size-4" /></MotionLink>
                <MotionLink href="#work" variant="secondary">View Our Work <ExternalLink className="size-4" /></MotionLink>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mx-auto mt-8 flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-[8px] border border-white/10 bg-[#060816]/62 p-2 text-xs text-slate-300 shadow-glow backdrop-blur-xl sm:gap-3 sm:p-3 sm:text-sm">
                <span>Trusted by ambitious local brands</span>
                {["PulseFit", "BrewLane", "UrbanSmiles", "EstatePro", "SkillForge"].map((brand) => (
                  <motion.span
                    key={brand}
                    className="rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 font-semibold text-white sm:px-4 sm:py-2"
                    whileHover={{ y: -2, borderColor: "rgba(34,211,238,.42)" }}
                  >
                    {brand}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="shell relative z-10 pb-16 md:-mt-16 md:pb-24">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={index * 0.05}>
                <motion.article
                  className="glow-card glass rounded-[8px] p-6"
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <Icon className="mb-8 size-8 text-cyan-200" />
                  <p className="text-4xl font-semibold">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="services" className="shell py-14 md:py-28">
        <SectionHeader
          eyebrow="Premium Services"
          title="Everything a local business needs to feel expensive online."
          body="Strategy, UI, development, motion, conversion copy, and launch support shaped into one polished frontend experience."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(index % 4) * 0.04}>
                <motion.article
                  className="glow-card glass group h-full rounded-[8px] p-6"
                  whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  <motion.div
                    className="mb-8 flex size-12 items-center justify-center rounded-[8px] bg-cyan-300/10 text-cyan-200"
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="size-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{service.body}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="work" className="shell py-14 md:py-28">
        <SectionHeader
          eyebrow="Featured Work"
          title="Demo projects with real agency-grade positioning."
          body="Each concept is built around trust, faster decisions, and a premium first impression."
        />
        <Reveal>
          <div className="mb-7 flex flex-wrap justify-center gap-2 sm:gap-3 md:mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  activeCategory === category
                    ? "border-cyan-300/60 bg-cyan-300/14 text-white shadow-glow"
                    : "border-white/10 bg-white/[.04] text-slate-400 hover:text-white"
                }`}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </Reveal>
        <motion.div layout className="grid gap-4 md:grid-cols-2 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="glow-card glass group overflow-hidden rounded-[8px] p-2 sm:p-3"
                whileHover={{ y: -8 }}
              >
                <div
                  className={`project-preview transition duration-500 md:group-hover:scale-[1.035] ${
                    project.image ? "with-image" : ""
                  }`}
                  style={{ "--a": project.colors[0], "--b": project.colors[1] } as React.CSSProperties}
                >
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={`${project.title} homepage preview`}
                        fill
                        quality={95}
                        sizes="(min-width: 768px) 560px, calc(100vw - 56px)"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#03040d] via-[#03040d]/72 to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,.22),transparent_24rem)]" />
                    </>
                  ) : null}
                  <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-5 sm:bottom-5">
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase text-cyan-100">
                      <span
                        className={
                          project.image ? "rounded-full border border-white/14 bg-black/45 px-3 py-1.5 backdrop-blur-md" : ""
                        }
                      >
                        {project.category}
                      </span>
                      {project.liveUrl ? (
                        <span className="rounded-full border border-cyan-200/28 bg-black/52 px-3 py-1.5 normal-case text-cyan-50 shadow-glow backdrop-blur-md">
                          Live demo
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={`mt-2 max-w-sm text-lg font-semibold leading-tight text-white sm:mt-3 sm:text-xl ${
                        project.image
                          ? "rounded-[8px] bg-black/52 px-3 py-2 shadow-[0_14px_38px_rgba(0,0,0,.42)] backdrop-blur-md"
                          : "drop-shadow-lg"
                      }`}
                    >
                      {project.title}
                    </p>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/[.06] px-3 py-1 text-xs text-cyan-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-cyan-200">{project.category}</p>
                  <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{project.summary}</p>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white"
                    >
                      View live project <ExternalLink className="size-4" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="shell py-14 md:py-28">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Premium design discipline with local-business practicality."
          body="A high-end look matters only when it helps real owners earn more trust."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={(index % 4) * 0.04}>
                <motion.article className="glow-card glass rounded-[8px] p-5" whileHover={{ y: -7 }}>
                  <Icon className="mb-6 size-6 text-cyan-200" />
                  <h3 className="text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{reason.body}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="process" className="shell py-14 md:py-28">
        <SectionHeader
          eyebrow="Process"
          title="A clear launch path from first call to live website."
          body="No confusing dashboards. Just a sharp workflow that turns your business into a polished web presence."
        />
        <div className="relative grid gap-4 lg:grid-cols-5">
          <div className="timeline-line absolute left-0 right-0 top-12 hidden h-px lg:block" />
          {processSteps.map((step, index) => (
            <Reveal key={step} delay={index * 0.07}>
              <motion.article className="glow-card glass rounded-[8px] p-6" whileHover={{ y: -8 }}>
                <div className="mb-8 flex size-12 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-lg font-semibold text-cyan-100">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  We keep every stage clear, practical, and focused on a premium launch.
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="team" className="shell py-14 md:py-28">
        <SectionHeader
          eyebrow="Core Team"
          title="A compact studio built like a product team."
          body="Strategy, development, full-stack thinking, and client success work together so every website feels cohesive."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(([name, role, bio, initials], index) => (
            <Reveal key={name} delay={index * 0.06}>
              <motion.article className="glow-card glass rounded-[8px] p-6 text-center" whileHover={{ y: -10 }}>
                <motion.div
                  className="mx-auto mb-5 flex size-24 items-center justify-center rounded-full border border-white/14 bg-gradient-to-br from-cyan-300/35 via-violet-400/35 to-white/10 text-xl font-semibold shadow-glow"
                  whileHover={{ scale: 1.07, rotate: 2 }}
                >
                  {initials}
                </motion.div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="mt-1 text-sm font-semibold text-cyan-200">{role}</p>
                <p className="mt-4 text-sm leading-7 text-slate-400">{bio}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="overflow-hidden py-14 md:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Testimonials"
            title="Local owners should feel the quality before they call."
            body="The tone, structure, and polish are designed to make a business feel credible."
          />
        </div>
        <div className="testimonial-track flex w-max gap-4 px-4">
          {[...testimonials, ...testimonials].map(([name, company, quote], index) => (
            <article key={`${name}-${index}`} className="glow-card glass w-[calc(100vw-32px)] max-w-[340px] shrink-0 rounded-[8px] p-5 md:w-[430px] md:max-w-none md:p-6">
              <div className="mb-5 flex gap-1 text-cyan-200">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="leading-8 text-slate-200">"{quote}"</p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-slate-400">{company}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-14 md:py-28">
        <SectionHeader
          eyebrow="FAQ"
          title="Straight answers before the first call."
          body="Premium does not need to feel vague. Here is what most local business owners ask first."
        />
        <div className="mx-auto grid max-w-3xl gap-3">
          {faqs.map(([question, answer]) => (
            <motion.div key={question} className="glass rounded-[8px]" layout>
              <button
                onClick={() => setOpenFaq(openFaq === question ? "" : question)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-semibold"
              >
                {question}
                <motion.span animate={{ rotate: openFaq === question ? 180 : 0 }}>
                  <ChevronDown className="size-5 text-cyan-200" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === question && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/10 px-5 py-5 text-sm leading-7 text-slate-400">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="shell py-14 md:py-28">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <div>
              <span className="eyebrow">
                <Mail className="size-4" /> Start a premium web project
              </span>
              <h2 className="mt-5 text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">
                Tell us what you want your business to become online.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Share your business type, city, pages needed, and launch timeline. Pricing can be discussed on call
                after we understand the project.
              </p>
              <motion.a
                href={`mailto:${email}`}
                className="glass mt-8 flex min-w-0 items-center gap-4 rounded-[8px] p-4"
                whileHover={{ y: -5, borderColor: "rgba(34,211,238,.45)" }}
              >
                <span className="flex size-11 items-center justify-center rounded-[8px] bg-cyan-300/10 text-cyan-200">
                  <Mail className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-slate-400">Email</span>
                  <span className="break-all font-semibold">{email}</span>
                </span>
              </motion.a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={(event) => event.preventDefault()} className="glass rounded-[8px] p-5 md:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Your name", "Amit Sharma"],
                  ["Business type", "Gym, cafe, clinic..."],
                  ["Email", "you@business.com"],
                  ["City", "Delhi, Pune, Jaipur..."]
                ].map(([label, placeholder]) => (
                  <label key={label} className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-300">{label}</span>
                    <input
                      placeholder={placeholder}
                      className="h-12 w-full rounded-[8px] border border-white/10 bg-white/[.055] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:shadow-glow"
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">Project details</span>
                <textarea
                  rows={5}
                  placeholder="Tell us about your business, pages needed, and launch timeline."
                  className="w-full resize-none rounded-[8px] border border-white/10 bg-white/[.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:shadow-glow"
                />
              </label>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <motion.button className="btn btn-primary w-full sm:w-auto" type="submit" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  Send Inquiry <ArrowRight className="size-4" />
                </motion.button>
                <p className="text-sm text-slate-500">UI-only form. Use email to contact us.</p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="#top">
            <span className="block text-xl font-semibold tracking-wide">NexLocalWeb</span>
            <span className="text-sm text-slate-500">Premium websites for local growth.</span>
          </a>
          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white">
                {label}
              </a>
            ))}
          </div>
          <p className="text-sm text-slate-500">(c) 2026 NexLocalWeb. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
