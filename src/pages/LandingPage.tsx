import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import {
  GraduationCap, Home, Shield, Heart, Dumbbell, Landmark,
  ArrowRight, Bell, Compass, MapPin, User, Sparkles,
  FileText, Users,
} from "lucide-react";

const features = [
  { num: "I", icon: Sparkles, title: "Personal", italic: "guidance", desc: "Schools, insurance and housing — suggestions shaped around the life you actually live, not a generic checklist." },
  { num: "II", icon: Bell, title: "Quiet", italic: "reminders", desc: "Permits, insurance windows, registration cut-offs — surfaced gently, before any of them bite." },
  { num: "III", icon: Compass, title: "Local", italic: "knowledge", desc: "Curated by canton and city. Real neighbourhoods, real services, real community — never copy-pasted." },
  { num: "IV", icon: Heart, title: "Made for", italic: "families", desc: "Partners, children, pets, paperwork — everyone in one calm, well-edited dossier." },
];

const categories = [
  { icon: GraduationCap, label: "Education" },
  { icon: Heart, label: "Family" },
  { icon: Home, label: "Housing" },
  { icon: Shield, label: "Insurance" },
  { icon: Dumbbell, label: "Sport & leisure" },
  { icon: Landmark, label: "Finance" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <PageTransition className="min-h-screen relative">
      {/* Editorial nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-baseline gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <span className="display-serif text-2xl tracking-tight">
              New<span className="editorial-italic text-primary">Be</span>
            </span>
            <span className="hidden sm:inline text-[10px] tracking-[0.25em] uppercase text-muted-foreground border-l border-border pl-3">
              The Switzerland Field Guide
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => navigate("/pricing")}>Pricing</Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} title="Profile">
              <User className="h-5 w-5" />
            </Button>
            <Button size="sm" onClick={() => navigate("/onboarding")}>
              Begin
            </Button>
          </div>
        </div>
      </nav>

      {/* MASTHEAD */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 z-10">
        <div className="container mx-auto px-4">
          {/* Magazine masthead bar */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
            <span>Vol. I — №01</span>
            <span className="hidden md:inline">A Field Guide for Newcomers</span>
            <span>Spring · 2026</span>
          </div>
          <div className="rule-double mb-10 lg:mb-14" />

          {/* HERO HEADLINE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end"
          >
            <div className="lg:col-span-8">
              <span className="eyebrow block mb-6">The Cover Story</span>
              <h1 className="display-serif text-foreground text-[2.75rem] sm:text-6xl lg:text-[7.5rem] leading-[0.95]">
                Moving is hard.<br />
                <span className="editorial-italic text-primary">Settling in</span><br />
                shouldn’t be.
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pb-4 border-l border-border pl-6 lg:pl-8">
              <p className="text-base text-foreground/80 leading-relaxed mb-6 font-light">
                A quiet companion for your first year in Switzerland —
                paperwork, housing, insurance, friendships — gathered into a
                single, <span className="editorial-italic text-primary">well-edited</span> dossier.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Button size="lg" variant="hero" onClick={() => navigate("/onboarding")}>
                  Begin your file <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <button
                  onClick={() => document.getElementById("contents")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm underline underline-offset-4 decoration-1 hover:text-primary transition-colors"
                >
                  Table of contents
                </button>
              </div>
            </div>
          </motion.div>

          {/* DECK / standfirst */}
          <div className="rule mt-16 mb-10" />
          <motion.div
            className="grid md:grid-cols-3 gap-10"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {[
              { k: "11", v: "Life chapters, from permits to friendships" },
              { k: "60+", v: "Swiss cities, mapped canton by canton" },
              { k: "01", v: "Calm dossier instead of fifteen open tabs" },
            ].map((s) => (
              <motion.div key={s.v} variants={fadeUp} className="flex items-baseline gap-5">
                <span className="display-italic text-primary text-5xl md:text-6xl leading-none">{s.k}</span>
                <span className="text-sm text-foreground/70 leading-snug border-l border-border pl-4">{s.v}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="relative z-10 py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="eyebrow block mb-6">From the editor</span>
          <p className="display-italic text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            “The first year somewhere new is not a checklist —
            it’s a <span className="text-primary">slow rewriting</span> of
            what <span className="not-italic display-serif">home</span> means.”
          </p>
          <div className="rule-ink w-16 mx-auto mt-10" />
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-4 block">
            NewBe — Switzerland Edition
          </span>
        </div>
      </section>

      {/* WORRIES — features in a magazine spread */}
      <section id="contents" className="relative z-10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="eyebrow">Section §02 — In this issue</span>
            <span className="text-xs tracking-widest uppercase text-muted-foreground hidden md:inline">p. 14</span>
          </div>
          <h2 className="display-serif text-4xl md:text-6xl text-foreground mb-12 max-w-3xl leading-tight">
            What’s <span className="editorial-italic text-primary">on your mind</span>?
          </h2>

          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {[
              { num: "i.", icon: FileText, label: "Paperwork", italic: "& bureaucracy", desc: "Permits, registration, insurance deadlines — sequenced for your arrival date." },
              { num: "ii.", icon: Home, label: "Housing", italic: "& setting up", desc: "Apartment hunt, utilities, internet, the deposit dance — explained plainly." },
              { num: "iii.", icon: Users, label: "Making", italic: "friends", desc: "Meet-ups, clubs, language tandems — a soft landing into your new community." },
            ].map((card) => (
              <motion.button
                key={card.label}
                variants={fadeUp}
                onClick={() => navigate("/onboarding")}
                className="editorial-card text-left group"
              >
                <div className="flex items-baseline justify-between mb-8">
                  <span className="folio text-2xl">{card.num}</span>
                  <card.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="display-serif text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                  {card.label}<br />
                  <span className="editorial-italic text-primary">{card.italic}</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{card.desc}</p>
                <span className="text-xs tracking-[0.2em] uppercase text-foreground inline-flex items-center gap-2 border-b border-foreground pb-1 group-hover:text-primary group-hover:border-primary transition-colors">
                  Read on <ArrowRight className="h-3 w-3" />
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTENTS — table of contents */}
      <section className="relative z-10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="eyebrow block mb-6">Index</span>
              <h2 className="display-serif text-4xl md:text-5xl leading-tight">
                Table of <span className="editorial-italic text-primary">contents</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Eleven chapters covering the territory between landing and belonging.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-border border-y border-border">
                {categories.map((cat, i) => (
                  <motion.li
                    key={cat.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex items-center justify-between py-4 group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="folio text-base w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <cat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="display-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-xs tracking-widest text-muted-foreground hidden sm:inline">
                      p. {String((i + 1) * 12).padStart(3, "0")}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE METHOD — features */}
      <section className="relative z-10 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-6">
              <span className="eyebrow block mb-4">Section §03 — The method</span>
              <h2 className="display-serif text-4xl md:text-6xl text-foreground leading-[1.05]">
                Everything <span className="editorial-italic text-primary">you need</span>,<br />
                nothing you don’t.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
              <p className="text-base text-foreground/80 leading-relaxed font-light">
                NewBe is a quiet companion for your first year — a single,
                well-edited place for the documents, decisions and small
                daily questions that otherwise live in fifteen open browser tabs.
              </p>
            </div>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {features.map((feat) => (
              <motion.div key={feat.title} variants={fadeUp} className="editorial-card">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="folio text-2xl">№ {feat.num}</span>
                  <feat.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="display-serif text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                  {feat.title} <span className="editorial-italic text-primary">{feat.italic}</span>
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COLOPHON / CTA */}
      <section className="relative z-10 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="rounded-sm p-10 lg:p-16 border border-foreground/10 relative overflow-hidden" style={{ background: "var(--gradient-warm)" }}>
            <div className="grid lg:grid-cols-12 gap-10 items-end relative">
              <div className="lg:col-span-8">
                <span className="eyebrow block mb-6">Colophon</span>
                <h2 className="display-serif text-5xl md:text-7xl leading-[0.95] text-foreground">
                  A new beginning,<br />
                  <span className="editorial-italic text-primary">edited well.</span>
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-foreground/75 mb-6 leading-relaxed font-light">
                  Set up your file in under three minutes. Free to start, no credit card.
                </p>
                <Button size="lg" variant="hero" onClick={() => navigate("/onboarding")}>
                  Begin your file <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 mt-5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> 60+ Swiss cities · all 26 cantons
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-border">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
          <span>© 2026 NewBe — Zürich Bureau</span>
          <span className="display-italic normal-case tracking-normal text-sm">Your new beginning, well edited.</span>
        </div>
      </footer>
    </PageTransition>
  );
}
