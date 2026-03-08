import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft,
  Shield,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Stethoscope,
  Heart,
  Home,
  Car,
  Banknote,
  AlertTriangle,
  FileText,
  Scale,
  Umbrella,
  Baby,
} from "lucide-react";

const insuranceTypes = [
  {
    name: "Health Insurance (Grundversicherung)",
    mandatory: true,
    desc: "Mandatory for all residents within 3 months of arrival. Covers basic medical, hospital, and pharmacy costs. All insurers must accept you regardless of health.",
    cost: "CHF 300–550/month (adults), CHF 100–150/month (children)",
    tip: "Choose higher franchise (deductible) to lower premiums. Compare on Comparis.ch.",
    icon: Stethoscope,
  },
  {
    name: "Supplementary Health (Zusatzversicherung)",
    mandatory: false,
    desc: "Optional coverage for dental, alternative medicine, private hospital rooms, glasses, and fitness. Insurers CAN reject based on health questionnaire.",
    cost: "CHF 30–200/month depending on coverage",
    tip: "Apply before canceling old foreign insurance — pre-existing conditions may lead to rejection.",
    icon: Heart,
  },
  {
    name: "Household Insurance (Hausratversicherung)",
    mandatory: false,
    desc: "Covers furniture, electronics, and belongings against theft, fire, water damage. Usually includes personal liability (Privathaftpflicht).",
    cost: "CHF 200–500/year",
    tip: "Almost universally recommended. Privathaftpflicht covers accidental damage to others' property.",
    icon: Home,
  },
  {
    name: "Personal Liability (Privathaftpflicht)",
    mandatory: false,
    desc: "Covers damage you accidentally cause to others or their property. Essential in Switzerland where claims culture is strong.",
    cost: "CHF 100–200/year (often bundled with Hausrat)",
    tip: "If you have kids, this is a MUST — children's accidents are covered.",
    icon: Umbrella,
  },
  {
    name: "Car Insurance (Autoversicherung)",
    mandatory: true,
    desc: "Liability (Haftpflicht) is mandatory. Collision (Teilkasko/Vollkasko) optional but recommended for newer cars.",
    cost: "CHF 500–2'000/year depending on coverage & car",
    tip: "Bring proof of no-claims bonus from your home country for discounts.",
    icon: Car,
  },
  {
    name: "Legal Protection (Rechtsschutzversicherung)",
    mandatory: false,
    desc: "Covers legal fees for disputes with landlords, employers, traffic incidents, and more.",
    cost: "CHF 200–500/year",
    tip: "Especially useful for expats navigating unfamiliar Swiss legal system.",
    icon: Scale,
  },
];

const providers = [
  { name: "CSS", specialty: "Largest Swiss health insurer, good digital tools", tag: "Popular" },
  { name: "Helsana", specialty: "Wide supplementary coverage, strong network", tag: "Comprehensive" },
  { name: "Swica", specialty: "Known for excellent customer service and prevention", tag: "Best Service" },
  { name: "Sanitas", specialty: "Digital-first, innovative app and tools", tag: "Digital" },
  { name: "Concordia", specialty: "Competitive premiums, good for families", tag: "Affordable" },
  { name: "Visana", specialty: "Strong in German-speaking Switzerland", tag: "Regional" },
];

const websites = [
  { name: "Comparis.ch", url: "https://www.comparis.ch/krankenkassen", desc: "Switzerland's #1 comparison platform for health insurance premiums.", tag: "Must-Use" },
  { name: "Priminfo (BAG)", url: "https://www.priminfo.admin.ch", desc: "Official government premium comparison tool by the Federal Office of Public Health.", tag: "Official" },
  { name: "bonus.ch", url: "https://www.bonus.ch", desc: "Compare all insurance types — health, car, household, legal.", tag: "All-in-One" },
  { name: "FinanceScout24", url: "https://www.financescout24.ch", desc: "Insurance comparison with personalized quotes and broker support.", tag: "Guided" },
];

const tips = [
  { icon: AlertTriangle, title: "3-Month Deadline", text: "You must register for basic health insurance within 3 months of your residence permit date. After that, the canton assigns you one (usually more expensive)." },
  { icon: Banknote, title: "Franchise Strategy", text: "Choose CHF 2'500 franchise (max) if you're healthy — saves CHF 100+/month. Choose CHF 300 (min) if you have regular medical needs." },
  { icon: FileText, title: "Switch Annually", text: "You can switch basic health insurer every year by November 30th. Premiums vary significantly — always compare!" },
  { icon: Baby, title: "Children's Insurance", text: "Register children for health insurance within 3 months of birth. Children's premiums are lower and some cantons offer subsidies." },
  { icon: Scale, title: "Premium Subsidies", text: "Low-to-middle income residents can apply for Prämienverbilligung (premium reduction) at the cantonal social services." },
  { icon: Heart, title: "Keep Foreign Records", text: "Bring medical records, vaccination certificates, and previous insurance documentation. Supplementary insurers will ask about medical history." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function InsurancePage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("insurance");
  const { completed: completedCount, total } = getCategoryStats("insurance");

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
            <div className="p-3 rounded-xl bg-success/10"><Shield className="h-6 w-6 text-success" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Insurance & Healthcare in Zurich</h1>
              <p className="text-muted-foreground">Mandatory coverage, smart choices, and healthcare setup</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span>
          </div>
        </motion.div>

        {/* Insurance Types */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Insurance Types</h2>
          <motion.div className="grid sm:grid-cols-2 gap-4" variants={container} initial="hidden" animate="show">
            {insuranceTypes.map((ins) => (
              <motion.div key={ins.name} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-success/10 shrink-0"><ins.icon className="h-5 w-5 text-success" /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground text-sm">{ins.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ins.mandatory ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                        {ins.mandatory ? "Mandatory" : "Optional"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{ins.desc}</p>
                    <div className="mt-2 text-xs"><span className="text-muted-foreground">Cost: </span><span className="font-semibold text-foreground">{ins.cost}</span></div>
                    <p className="text-xs text-primary mt-1">💡 {ins.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Providers */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Top Health Insurance Providers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((p) => (
              <div key={p.name} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{p.name}</h3>
                  <span className="text-xs font-medium bg-success/10 text-success px-2 py-0.5 rounded-full">{p.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.specialty}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Websites */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Comparison Platforms</h2>
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
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Practical Advice</h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {tips.map((tip) => (
              <motion.div key={tip.title} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 mb-2"><div className="p-2 rounded-lg bg-warning/10"><tip.icon className="h-4 w-4 text-warning" /></div><h3 className="font-semibold text-foreground text-sm">{tip.title}</h3></div>
                <p className="text-sm text-muted-foreground">{tip.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Checklist */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="pb-8">
          <CategoryChecklist categoryId="insurance" title="Insurance Checklist" />
        </motion.section>
      </div>
    </div>
  );
}
