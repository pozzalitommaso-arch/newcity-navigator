import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import {
  GraduationCap, Home, Shield, Heart, Dumbbell, Landmark,
  ArrowRight, Bell, BarChart3, MapPin, User, Sparkles,
  FileText, Users,
} from "lucide-react";

const features = [
  { num: "01", icon: Sparkles, title: "AI-powered guidance", desc: "Personalised suggestions for schools, insurance and housing — built around the life you actually live." },
  { num: "02", icon: Bell, title: "Proactive deadlines", desc: "Permits, insurance windows, registration cut-offs. Surfaced before they bite." },
  { num: "03", icon: BarChart3, title: "Quiet progress", desc: "A calm, honest view of how settled you really are. No streaks. No noise." },
  { num: "04", icon: MapPin, title: "Local, not generic", desc: "Curated knowledge by canton and city — neighbourhoods, services, community." },
];

const categories = [
  { icon: GraduationCap, label: "Education" },
  { icon: Heart, label: "Family" },
  { icon: Home, label: "Housing" },
  { icon: Shield, label: "Insurance" },
  { icon: Dumbbell, label: "Sport" },
  { icon: Landmark, label: "Finance" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } } };

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <PageTransition className="min-h-screen bg-background">
      {/* Editorial nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-baseline gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <span className="display-serif text-2xl text-foreground">NewBE</span>
            <span className="eyebrow hidden sm:inline">N°01 — Switzerland</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => navigate("/pricing")}>Pricing</Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} title="Profile">
              <User className="h-5 w-5" />
            </Button>
            <Button size="sm" onClick={() => navigate("/onboarding")}>Get started</Button>
          </div>
        </div>
      </nav>

      {/* HERO — editorial masthead */}
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-4">
          {/* Masthead row */}
          <div className="flex items-center justify-between mb-10 lg:mb-16">
            <span className="eyebrow">Issue 01 · Spring 2026</span>
            <span className="eyebrow hidden md:inline">A field guide for newcomers</span>
            <span className="eyebrow mono">CH · 🇨🇭</span>
          </div>

          <div className="rule-ink mb-10 lg:mb-14" />

          {/* Headline grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            <div className="lg:col-span-8">
              <h1 className="display-serif text-foreground text-[3.25rem] sm:text-7xl lg:text-[8.5rem] leading-[0.92]">
                Moving<br />
                <span className="display-italic">is hard.</span><br />
                Settling in<br />
                <span className="accent-mark">shouldn’t&nbsp;be.</span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-6">
              <span className="eyebrow block mb-3">The thesis</span>
              <p className="text-base text-foreground/80 leading-relaxed mb-6">
                Bureaucracy, housing, insurance, friendship — twelve months of admin
                compressed into a single, calm checklist. Tailored to your canton,
                your family, your week ahead.
              </p>
              <div className="flex items-center gap-3">
                <Button size="lg" onClick={() => navigate("/onboarding")}>
                  Begin your file <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="eyebrow underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Read more ↓
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sub-stats row */}
          <div className="rule mt-16 mb-6" />
          <div className="grid grid-cols-3 gap-6">
            {[
              { k: "11", v: "Life categories" },
              { k: "50+", v: "Curated checks" },
              { k: "AI", v: "Guidance, on tap" },
            ].map((s) => (
              <div key={s.v} className="flex flex-col">
                <span className="display-serif text-4xl md:text-6xl text-foreground leading-none">{s.k}</span>
                <span className="eyebrow mt-2">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORRIES — three-column editorial */}
      <section className="py-20 border-t border-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="display-serif text-3xl md:text-5xl text-foreground">
              What’s on your mind?
            </h2>
            <span className="eyebrow hidden md:inline">§ 02 — Concerns</span>
          </div>

          <motion.div
            className="grid md:grid-cols-3 border-t border-border"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { num: "01", icon: FileText, label: "Paperwork & bureaucracy", desc: "Permits, registration, insurance deadlines — sequenced for your arrival date." },
              { num: "02", icon: Home, label: "Housing & setup", desc: "Apartment hunt, utilities, internet, the deposit dance — explained plainly." },
              { num: "03", icon: Users, label: "Making friends", desc: "Meet-ups, clubs, language tandems — a soft landing into a new community." },
            ].map((card, i) => (
              <motion.button
                key={card.label}
                variants={fadeUp}
                onClick={() => navigate("/onboarding")}
                className={`text-left p-8 group transition-colors hover:bg-secondary/60 ${
                  i < 2 ? "md:border-r border-border" : ""
                } border-b border-border`}
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="section-num">{card.num}</span>
                  <card.icon className="h-5 w-5 text-foreground/60 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="display-serif text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                  {card.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                <span className="eyebrow inline-flex items-center gap-1 mt-6 text-foreground group-hover:text-accent transition-colors">
                  Start here <ArrowRight className="h-3 w-3" />
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES — quiet horizontal index */}
      <section className="py-16 bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4">
          <span className="eyebrow block mb-6">Index of categories</span>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {categories.map((cat, i) => (
              <div key={cat.label} className="flex items-baseline gap-3">
                <span className="mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <cat.icon className="h-4 w-4 text-foreground/70" />
                <span className="display-serif text-xl text-foreground">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES — editorial 2x2 with hairlines */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-4">
              <span className="eyebrow block mb-4">§ 03 — The method</span>
              <h2 className="display-serif text-4xl md:text-6xl text-foreground leading-none">
                Everything you need.<br />
                <span className="display-italic accent-mark">Nothing you don’t.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 lg:pt-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                NewBE is a quiet companion for the first year — a single, well-edited
                place for the documents, decisions and small daily questions that
                otherwise live in fifteen open browser tabs.
              </p>
            </div>
          </div>

          <motion.div
            className="grid md:grid-cols-2 border-t border-foreground"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                className={`p-8 lg:p-10 border-b border-border ${
                  i % 2 === 0 ? "md:border-r border-border" : ""
                }`}
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="section-num">{feat.num}</span>
                  <feat.icon className="h-5 w-5 text-foreground/60" />
                </div>
                <h3 className="display-serif text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                  {feat.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — full bleed ink block */}
      <section className="bg-foreground text-background py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="eyebrow !text-background/60 block mb-4">Colophon</span>
              <h2 className="display-serif text-5xl md:text-7xl leading-[0.95]">
                A new beginning,<br />
                <span className="display-italic" style={{ color: "hsl(var(--accent))" }}>edited well.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-background/70 mb-6 leading-relaxed">
                Set up your file in under three minutes. Free to start, no credit card.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/onboarding")}
                className="bg-background text-foreground hover:bg-background/90"
              >
                Get started <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow">© 2026 NewBE — Zürich</span>
          <span className="eyebrow">Your new beginning, well edited.</span>
        </div>
      </footer>
    </PageTransition>
  );
}
