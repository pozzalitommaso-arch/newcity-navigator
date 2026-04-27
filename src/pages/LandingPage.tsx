import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import {
  GraduationCap, Home, Shield, Heart, Dumbbell, Landmark,
  ArrowRight, Bell, BarChart3, MapPin, User, Sparkles,
  FileText, Users, Zap, Wifi, Cpu,
} from "lucide-react";

const features = [
  { num: "01", icon: Sparkles, title: "AI.GUIDANCE", desc: "Personalised suggestions for schools, insurance and housing — built around the life you actually live.", glow: "primary" },
  { num: "02", icon: Bell, title: "PROACTIVE.PINGS", desc: "Permits, insurance windows, registration cut-offs. Surfaced before they bite.", glow: "magenta" },
  { num: "03", icon: BarChart3, title: "QUIET.PROGRESS", desc: "A calm, honest view of how settled you really are. No streaks. No noise.", glow: "cyan" },
  { num: "04", icon: MapPin, title: "LOCAL.NOT.GENERIC", desc: "Curated knowledge by canton and city — neighbourhoods, services, community.", glow: "primary" },
];

const categories = [
  { icon: GraduationCap, label: "Education" },
  { icon: Heart, label: "Family" },
  { icon: Home, label: "Housing" },
  { icon: Shield, label: "Insurance" },
  { icon: Dumbbell, label: "Sport" },
  { icon: Landmark, label: "Finance" },
];

const marqueeItems = [
  "PERMIT.B", "AHV.NUMBER", "SERAFE", "HALBTAX", "PILLAR.3A", "TAX.AT.SOURCE",
  "GEMEINDE", "KRANKENKASSE", "RESIDENCE.PERMIT", "BANK.IBAN", "GA.TRAVELCARD",
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } } };

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <PageTransition className="min-h-screen relative">
      {/* Animated blobs backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob bg-primary" style={{ width: 500, height: 500, top: "-10%", left: "-10%" }} />
        <div className="blob bg-accent" style={{ width: 400, height: 400, top: "30%", right: "-10%", animationDelay: "-5s" }} />
        <div className="blob bg-info" style={{ width: 450, height: 450, bottom: "-15%", left: "30%", animationDelay: "-9s" }} />
      </div>

      {/* Cyber nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-baseline gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <span className="display-serif text-2xl text-foreground flicker">NewBE<span className="text-primary text-glow-primary">_</span></span>
            <span className="eyebrow hidden sm:inline">v2.0 // CH</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => navigate("/pricing")}>Pricing</Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} title="Profile">
              <User className="h-5 w-5" />
            </Button>
            <Button size="sm" onClick={() => navigate("/onboarding")} className="glow-primary">
              <Zap className="h-3.5 w-3.5" /> Get started
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 z-10">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 relative">
          {/* Top status bar */}
          <div className="flex items-center justify-between mb-10 lg:mb-14">
            <span className="tape">SYS.ONLINE</span>
            <span className="eyebrow hidden md:inline">// FIELD GUIDE FOR NEWCOMERS</span>
            <span className="eyebrow mono">[CH·46.8°N]</span>
          </div>

          <div className="rule-ink mb-10 lg:mb-14" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            <div className="lg:col-span-8 relative">
              <h1 className="display-serif text-foreground text-[3.25rem] sm:text-7xl lg:text-[8.5rem] leading-[0.9]">
                <span className="block">MOVING</span>
                <span className="block display-italic chrome-text text-[2.75rem] sm:text-6xl lg:text-[7rem]">is.hard</span>
                <span className="block">SETTLING IN</span>
                <span className="block accent-mark text-glow-accent">shouldn’t·be</span>
              </h1>
              {/* Decorative corner brackets */}
              <span className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary opacity-60" />
              <span className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-accent opacity-60" />
            </div>

            <div className="lg:col-span-4 lg:pb-6 glass p-6 rounded-sm">
              <span className="eyebrow block mb-3">// THE.THESIS</span>
              <p className="text-base text-foreground/85 leading-relaxed mb-6">
                Bureaucracy, housing, insurance, friendship — twelve months of admin
                compressed into a single, calm checklist. Tailored to your canton,
                your family, your week ahead.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Button size="lg" onClick={() => navigate("/onboarding")} className="glow-primary">
                  Initialize <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="eyebrow hover:text-accent transition-colors"
                >
                  scroll ↓
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="rule mt-16 mb-6" />
          <motion.div
            className="grid grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {[
              { k: "11", v: "LIFE.CATEGORIES", icon: Cpu },
              { k: "50+", v: "CURATED.CHECKS", icon: Wifi },
              { k: "AI", v: "GUIDANCE.ON.TAP", icon: Zap },
            ].map((s) => (
              <motion.div key={s.v} variants={fadeUp} className="flex flex-col">
                <span className="display-serif text-4xl md:text-6xl gradient-text leading-none">{s.k}</span>
                <span className="eyebrow mt-2 flex items-center gap-2"><s.icon className="h-3 w-3" />{s.v}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE band */}
      <section className="relative z-10 py-6 border-y border-primary/30 bg-background/40 backdrop-blur-sm overflow-hidden">
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="marquee-track" aria-hidden={dup === 1}>
              {marqueeItems.map((item, i) => (
                <span key={`${dup}-${i}`} className="eyebrow text-primary/80 flex items-center gap-3 whitespace-nowrap">
                  <span className="text-accent">◆</span> {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* WORRIES */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="display-serif text-3xl md:text-5xl text-foreground">
              What’s <span className="accent-mark">on your mind</span>?
            </h2>
            <span className="eyebrow hidden md:inline">§02 // CONCERNS</span>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { num: "01", icon: FileText, label: "Paperwork & bureaucracy", desc: "Permits, registration, insurance deadlines — sequenced for your arrival date." },
              { num: "02", icon: Home, label: "Housing & setup", desc: "Apartment hunt, utilities, internet, the deposit dance — explained plainly." },
              { num: "03", icon: Users, label: "Making friends", desc: "Meet-ups, clubs, language tandems — a soft landing into a new community." },
            ].map((card) => (
              <motion.button
                key={card.label}
                variants={fadeUp}
                onClick={() => navigate("/onboarding")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bento-card text-left group"
              >
                <div className="flex items-baseline justify-between mb-6 relative z-10">
                  <span className="section-num">{card.num}</span>
                  <card.icon className="h-5 w-5 text-foreground/60 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))] transition-all" />
                </div>
                <h3 className="display-serif text-2xl md:text-3xl text-foreground mb-3 leading-tight relative z-10">
                  {card.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{card.desc}</p>
                <span className="eyebrow inline-flex items-center gap-1 mt-6 group-hover:text-accent transition-colors relative z-10">
                  Start here <ArrowRight className="h-3 w-3" />
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES — terminal index */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="glass rounded-sm p-8">
            <span className="eyebrow block mb-6">// INDEX.OF.CATEGORIES</span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-baseline gap-3 cursor-pointer group"
                >
                  <span className="mono text-xs text-primary">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <cat.icon className="h-4 w-4 text-foreground/70 group-hover:text-primary transition-colors" />
                  <span className="display-serif text-xl text-foreground group-hover:text-glow-primary transition-all">{cat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-5">
              <span className="eyebrow block mb-4">§03 // THE.METHOD</span>
              <h2 className="display-serif text-4xl md:text-6xl text-foreground leading-none">
                Everything you need.<br />
                <span className="display-italic chrome-text">nothing.you.don’t</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                NewBE is a quiet companion for the first year — a single, well-edited
                place for the documents, decisions and small daily questions that
                otherwise live in fifteen open browser tabs.
              </p>
            </div>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feat) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="bento-card group"
              >
                <div className="flex items-baseline justify-between mb-6 relative z-10">
                  <span className="section-num">{feat.num}</span>
                  <feat.icon className={`h-5 w-5 transition-all ${
                    feat.glow === "magenta" ? "text-accent group-hover:drop-shadow-[0_0_12px_hsl(var(--accent))]" :
                    feat.glow === "cyan" ? "text-info group-hover:drop-shadow-[0_0_12px_hsl(var(--info))]" :
                    "text-primary group-hover:drop-shadow-[0_0_12px_hsl(var(--primary))]"
                  }`} />
                </div>
                <h3 className="display-serif text-2xl md:text-3xl text-foreground mb-3 leading-tight relative z-10 mono tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed relative z-10">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — chrome block */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-sm overflow-hidden p-10 lg:p-16 noise" style={{ background: "var(--gradient-card)", border: "1px solid hsl(var(--border))" }}>
            {/* Iridescent border sweep */}
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "var(--gradient-iridescent)", backgroundSize: "200% 200%", animation: "iridescent-shift 6s linear infinite", maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)", WebkitMask: "linear-gradient(black 0 0) content-box, linear-gradient(black 0 0)", WebkitMaskComposite: "xor", padding: "1px" } as React.CSSProperties} />

            <div className="grid lg:grid-cols-12 gap-8 items-end relative">
              <div className="lg:col-span-8">
                <span className="eyebrow block mb-4">// COLOPHON</span>
                <h2 className="display-serif text-5xl md:text-7xl leading-[0.9] text-foreground">
                  A new beginning,<br />
                  <span className="display-italic accent-mark">edited.well</span>
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Set up your file in under three minutes. Free to start, no credit card.
                </p>
                <Button size="lg" onClick={() => navigate("/onboarding")} className="glow-primary">
                  Boot sequence <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-border">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow">© 2026 NewBE // ZÜRICH.NODE</span>
          <span className="eyebrow">Your new beginning, well edited.</span>
        </div>
      </footer>
    </PageTransition>
  );
}
