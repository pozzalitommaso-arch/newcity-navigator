import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  ExternalLink,
  Star,
  CheckCircle2,
  Lightbulb,
  Baby,
  BookOpen,
  Globe,
  Clock,
  Banknote,
  Calendar,
  Info,
  Languages,
} from "lucide-react";

const schoolTypes = [
  {
    type: "Public Schools (Volksschule)",
    desc: "Free, high-quality education in German. Structured into Kindergarten (4–6), Primarschule (6–12), and Sekundarschule (12–15).",
    language: "German",
    cost: "Free",
    rating: 4,
  },
  {
    type: "International Schools",
    desc: "English or bilingual curriculum (IB, British, American). Popular with expat families. Long waitlists.",
    language: "English / Bilingual",
    cost: "CHF 25'000–45'000/year",
    rating: 5,
  },
  {
    type: "Private Swiss Schools",
    desc: "Swiss curriculum with smaller classes. Some offer bilingual programs. High academic standards.",
    language: "German / Bilingual",
    cost: "CHF 15'000–35'000/year",
    rating: 4,
  },
  {
    type: "Gymnasium (High School)",
    desc: "Academic track after Sekundarschule (age 12+). Entrance exam required. Leads to Matura diploma for university.",
    language: "German",
    cost: "Free (public)",
    rating: 5,
  },
];

const topSchools = [
  { name: "Zurich International School (ZIS)", area: "Wädenswil / Adliswil", type: "IB Curriculum", ages: "3–18", tag: "Top Choice" },
  { name: "Inter-Community School (ICS)", area: "Zurich-Wollishofen", type: "IB Curriculum", ages: "3–18", tag: "Central Location" },
  { name: "Swiss International School (SIS)", area: "Multiple locations", type: "Bilingual EN/DE", ages: "4–18", tag: "Bilingual" },
  { name: "Lyceum Alpinum Zuoz", area: "Engadin (boarding)", type: "IB & Swiss Matura", ages: "12–18", tag: "Boarding" },
  { name: "Academia Zurich", area: "Zurich City", type: "Swiss Matura", ages: "15–19", tag: "Private Swiss" },
  { name: "Tandem IMS", area: "Zurich City", type: "Bilingual EN/DE", ages: "4–15", tag: "Small & Personal" },
];

const websites = [
  { name: "Stadt Zürich Schulamt", url: "https://www.stadt-zuerich.ch/ssd", desc: "Official school authority — enrollment, school districts, calendar.", tag: "Official" },
  { name: "Volksschulamt Kanton Zürich", url: "https://www.zh.ch/de/bildung", desc: "Cantonal education office — curriculum, regulations, school search.", tag: "Cantonal" },
  { name: "International School Database", url: "https://www.international-schools-database.com", desc: "Compare international schools worldwide with reviews and fees.", tag: "Comparison" },
  { name: "education.ch", url: "https://www.education.ch", desc: "Swiss education portal — all school types, vocational training, universities.", tag: "Overview" },
];

const tips = [
  { icon: Calendar, title: "Enroll Early", text: "Public school enrollment starts in January for the following August. International schools have even earlier deadlines — apply 6–12 months ahead." },
  { icon: Languages, title: "German is Key", text: "Public schools teach in Swiss German. Free German courses (DaZ) are offered for non-German speaking children to help them integrate." },
  { icon: Baby, title: "Kindergarten is Mandatory", text: "2 years of Kindergarten (age 4–6) are mandatory in Zurich canton. Children are assigned to the nearest public Kindergarten." },
  { icon: Globe, title: "School District Matters", text: "Public school assignment is based on your home address. Research school quality by district before choosing where to live." },
  { icon: Banknote, title: "Financial Support Available", text: "Subsidies and scholarships exist for private/international schools. The canton also offers Ausbildungsbeiträge (education grants)." },
  { icon: BookOpen, title: "Homework Culture", text: "Swiss schools assign regular homework. Many families use Aufgabenhilfe (homework help) programs offered by the city." },
];

const checklist = [
  { text: "Research school options for your children's ages", done: true },
  { text: "Check public school assignment for your address", done: false },
  { text: "Visit/apply to international schools if needed", done: false },
  { text: "Register for German language courses (DaZ)", done: false },
  { text: "Gather required documents (residence permit, vaccination records)", done: false },
  { text: "Complete enrollment at assigned school", done: false },
  { text: "Arrange after-school care (Hort) if needed", done: false },
  { text: "Connect with school parent community", done: false },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function EducationPage() {
  const navigate = useNavigate();
  const completedCount = checklist.filter((c) => c.done).length;
  const progress = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}><ArrowLeft className="h-5 w-5" /></Button>
            <span className="font-display text-2xl font-bold text-primary">NewBe</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> Zurich</div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-info/10"><GraduationCap className="h-6 w-6 text-info" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Education in Zurich</h1>
              <p className="text-muted-foreground">Schools, enrollment, and everything for your children's education</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" />
            <span className="text-sm font-medium text-muted-foreground">{progress}% complete</span>
          </div>
        </motion.div>

        {/* School Types */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-info" /> School Types in Switzerland
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {schoolTypes.map((s) => (
              <div key={s.type} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{s.type}</h3>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<span key={i} className={`text-xs ${i < s.rating ? "text-warning" : "text-muted"}`}>★</span>))}</div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                <div className="flex gap-4 text-xs">
                  <div><span className="text-muted-foreground">Language: </span><span className="font-semibold text-foreground">{s.language}</span></div>
                  <div><span className="text-muted-foreground">Cost: </span><span className="font-semibold text-foreground">{s.cost}</span></div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Top Schools */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" /> Top Schools Near Zurich
          </h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {topSchools.map((school) => (
              <motion.div key={school.name} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm">{school.name}</h3>
                </div>
                <span className="text-xs font-medium bg-info/10 text-info px-2 py-0.5 rounded-full">{school.tag}</span>
                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium text-foreground">{school.area}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Curriculum</span><span className="font-medium text-foreground">{school.type}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Ages</span><span className="font-medium text-foreground">{school.ages}</span></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Websites */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" /> Useful Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {websites.map((site) => (
              <a key={site.name} href={site.url} target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all group block">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{site.name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{site.tag}</span>
                <p className="text-sm text-muted-foreground mt-2">{site.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Tips */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" /> Practical Advice
          </h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {tips.map((tip) => (
              <motion.div key={tip.title} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-warning/10"><tip.icon className="h-4 w-4 text-warning" /></div>
                  <h3 className="font-semibold text-foreground text-sm">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tip.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Checklist */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="pb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" /> Education Checklist
          </h2>
          <div className="max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
            <div className="space-y-3">
              {checklist.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? "bg-success" : "border-2 border-muted"}`}>
                    {c.done && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}
                  </div>
                  <span className={`text-sm ${c.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
