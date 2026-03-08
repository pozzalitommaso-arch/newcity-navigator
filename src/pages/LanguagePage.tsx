import CommunitySection from "@/components/CommunitySection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  Languages, BookOpen, GraduationCap, Globe, MessageCircle,
  Award, Clock, FileText, Shield, Target, Milestone,
} from "lucide-react";

const languageSchools = [
  { name: "Migros Klubschule", url: "https://www.klubschule.ch/", desc: "Switzerland's most popular language school. Affordable, good quality, flexible schedules.", tip: "Intensive courses (20h/week) are the fastest way to improve", tier: "Best Value" },
  { name: "Goethe-Institut", url: "https://www.goethe.de/", desc: "Official German cultural institute. Gold standard for German certificates.", tip: "Goethe-Zertifikat is internationally recognized", tier: "Premium" },
  { name: "VOX Sprachschule", url: "https://www.vox-sprachschule.ch/", desc: "Private lessons and small groups. Very flexible scheduling.", tip: "Great for professionals who need evening/weekend classes", tier: "Flexible" },
  { name: "ZHAW Language Center", url: "https://www.zhaw.ch/", desc: "University-level courses. Also open to non-students.", tip: "Academic German if you plan to study in Switzerland", tier: "Academic" },
  { name: "Bellingua", url: "https://www.bellingua.ch/", desc: "Small classes, central Zurich location. Good for intensive learning.", tip: "They offer Swiss German courses too — very useful for integration", tier: "Intensive" },
];

const freeResources = [
  { name: "Duolingo", desc: "Free app. Good for basics and daily practice (A1–B1 level)." },
  { name: "Deutsche Welle (dw.com)", desc: "Free online courses from A1 to C1. Excellent grammar explanations." },
  { name: "Tandem App", desc: "Find language exchange partners in Zurich. Practice with native speakers for free." },
  { name: "SRF News (srf.ch)", desc: "Swiss German news. Start with 'SRF News einfach' (simplified German)." },
  { name: "Meetup.com Language Groups", desc: "Free language exchange meetups in Zurich. Practice in a social setting." },
  { name: "YouTube: Easy German", desc: "Street interviews in simple German. Great for listening comprehension." },
];

const permitTimeline = [
  {
    permit: "Permit L (Short-term)",
    duration: "Up to 12 months",
    language: "No language requirement",
    desc: "Issued for short-term employment contracts. No German needed.",
    color: "bg-muted",
  },
  {
    permit: "Permit B (Residence)",
    duration: "1 year, renewable",
    language: "No formal requirement (but recommended A2+)",
    desc: "Standard work permit for employed individuals. Learning German is strongly recommended for daily life.",
    color: "bg-info/10",
  },
  {
    permit: "Permit B → C Application",
    duration: "After 5–10 years (depending on nationality)",
    language: "B1 spoken + A1 written (minimum)",
    desc: "To apply for permanent residency (C permit), you need to prove German proficiency. EU/EFTA citizens: 5 years. Others: 10 years.",
    color: "bg-warning/10",
  },
  {
    permit: "Permit C (Permanent)",
    duration: "Permanent",
    language: "B1 spoken + A1 written (certified)",
    desc: "Permanent residency. Accepted certificates: Goethe, telc, ÖSD, or fide test. Some cantons require B2.",
    color: "bg-success/10",
  },
  {
    permit: "Swiss Citizenship",
    duration: "After 10 years of residence",
    language: "B1 spoken + A2 written (certified)",
    desc: "Naturalization requires proven integration, language skills, and knowledge of Swiss culture. Municipal, cantonal, and federal approval.",
    color: "bg-primary/10",
  },
];

const germanLevels = [
  { level: "A1", desc: "Basics: greetings, ordering food, simple questions", time: "2–3 months (part-time)", useCase: "Survive daily life" },
  { level: "A2", desc: "Simple conversations, basic shopping, describing routines", time: "3–6 months", useCase: "Feel more comfortable" },
  { level: "B1", desc: "Express opinions, understand main points, write simple texts", time: "6–12 months", useCase: "C permit requirement" },
  { level: "B2", desc: "Fluent conversation, understand complex texts, professional use", time: "12–18 months", useCase: "Work in German-speaking roles" },
  { level: "C1", desc: "Advanced: nuanced expression, academic/professional fluency", time: "18–24 months", useCase: "Full integration" },
];

const swissGermanTips = [
  { phrase: "Grüezi / Grüessech", meaning: "Hello (formal)", context: "Use with strangers, in shops, at work" },
  { phrase: "Hoi / Sali", meaning: "Hi (informal)", context: "Use with friends, younger people" },
  { phrase: "Merci vilmal", meaning: "Thank you very much", context: "Swiss use French 'merci' instead of German 'danke'" },
  { phrase: "Uf Wiederluege", meaning: "Goodbye", context: "More common than standard German 'Auf Wiedersehen'" },
  { phrase: "En Guete", meaning: "Enjoy your meal", context: "Said before eating — always!" },
  { phrase: "Prost / Zum Wohl", meaning: "Cheers", context: "Look everyone in the eyes when clinking glasses" },
];

export default function LanguagePage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("language");
  const stats = getCategoryStats("language");

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}><ArrowLeft className="h-5 w-5" /></Button>
            <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 text-primary" /> <span className="font-medium text-sm">Zürich</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <Languages className="h-8 w-8 text-info" /> Language & Integration
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Learn German, understand Swiss German, and know exactly what level you need for your work permit and residency goals.
          </p>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="h-2 flex-1 max-w-xs bg-muted" />
            <span className="text-sm font-medium text-muted-foreground">{stats.completed}/{stats.total} done</span>
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-4 rounded-xl bg-info/10 border border-info/20">
          <p className="text-sm text-foreground flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-info mt-0.5 shrink-0" />
            <span>
              <strong>Key insight:</strong> Zurich is very international — you can live here in English. But learning German dramatically improves your social life, career options, and is <strong>required for permanent residency (C permit)</strong>. Start early, even just 15 minutes/day.
            </span>
          </p>
        </motion.div>

        {/* Permit Language Timeline */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Milestone className="h-5 w-5 text-primary" /> Language Requirements by Permit
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Even if your current permit doesn't require German, start learning now. The C permit requires B1 — that takes 6–12 months of consistent study.
          </p>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-4">
              {permitTimeline.map((item, i) => (
                <div key={i} className="relative flex gap-4">
                  <div className={`w-10 h-10 rounded-full ${item.color} border-2 border-background flex items-center justify-center shrink-0 z-10`}>
                    <Shield className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-foreground">{item.permit}</h3>
                      <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{item.duration}</span>
                    </div>
                    <p className="text-xs text-primary font-semibold mb-1">📝 {item.language}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* German Levels */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Target className="h-5 w-5 text-warning" /> German Level Guide (CEFR)
          </h2>
          <p className="text-sm text-muted-foreground mb-4">What each level means and how long it takes.</p>
          <div className="space-y-2">
            {germanLevels.map((lvl) => (
              <div key={lvl.level} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-sm font-bold shrink-0">{lvl.level}</span>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{lvl.desc}</p>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {lvl.time}</span>
                    <span className="text-xs text-primary/80">→ {lvl.useCase}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Language Schools */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" /> Language Schools in Zurich
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Migros Klubschule offers the best value. For fast results, choose an intensive course (20h/week). Ask your employer — many cover language course costs.
          </p>
          <div className="space-y-3">
            {languageSchools.map((school) => (
              <a key={school.name} href={school.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:border-primary/30 transition-colors group">
                <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold shrink-0">{school.tier}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{school.name}</h3>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{school.desc}</p>
                  <p className="text-xs text-primary/80 mt-1">💡 {school.tip}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Free Resources */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Globe className="h-5 w-5 text-success" /> Free Learning Resources
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Start learning today — no cost, no commitment.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {freeResources.map((res) => (
              <div key={res.name} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h3 className="text-sm font-semibold text-foreground">{res.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{res.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Swiss German Crash Course */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-accent" /> Swiss German Survival Phrases
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Standard German (Hochdeutsch) is used in writing and formal settings. Swiss German (Schweizerdeutsch) is spoken daily. Learn a few phrases — locals love it!
          </p>
          <div className="space-y-2">
            {swissGermanTips.map((tip) => (
              <div key={tip.phrase} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <span className="font-mono text-sm font-bold text-primary shrink-0 w-32">{tip.phrase}</span>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{tip.meaning}</p>
                  <p className="text-[11px] text-muted-foreground">{tip.context}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Checklist */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-4">
          <CategoryChecklist categoryId="language" title="Language & Integration Checklist" />
        </motion.section>

        <CommunitySection category="language" />
      </div>
    </div>
  );
}
