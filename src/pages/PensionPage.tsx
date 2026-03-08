import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  PiggyBank, TrendingUp, Shield, Calculator, Banknote, Building2, Clock,
} from "lucide-react";

const pillars = [
  {
    name: "Pillar 1 — AHV (State Pension)",
    desc: "Mandatory state pension. Contributions deducted from salary (5.3% each by employer and employee). Provides basic retirement income.",
    details: [
      { label: "Max Pension", value: "CHF 2'450/month (single), CHF 3'675 (couple)" },
      { label: "Retirement Age", value: "65 (men & women, as of 2025)" },
      { label: "Contribution", value: "Automatic payroll deduction" },
    ],
    icon: Shield,
  },
  {
    name: "Pillar 2 — BVG (Occupational Pension)",
    desc: "Employer-sponsored pension. Both you and your employer contribute. Builds a capital that can be withdrawn or converted to a pension at retirement.",
    details: [
      { label: "Contribution", value: "7–18% of salary (age-dependent)" },
      { label: "Employer Match", value: "At least 50% of total contribution" },
      { label: "Early Withdrawal", value: "Allowed for home purchase or self-employment" },
    ],
    icon: Building2,
  },
  {
    name: "Pillar 3a — Private Pension",
    desc: "Voluntary, tax-advantaged savings. The most powerful tax optimization tool in Switzerland. Max CHF 7'056/year (2026, employed).",
    details: [
      { label: "Tax Saving", value: "CHF 1'500–2'500/year in Zurich" },
      { label: "Best Providers", value: "VIAC, Finpension, Frankly (invest in index funds)" },
      { label: "Withdrawal", value: "At retirement, for home purchase, or leaving Switzerland" },
    ],
    icon: TrendingUp,
  },
];

const providers = [
  { name: "VIAC", desc: "Digital 3a with low-cost index funds. 0.44% total fees. Best for hands-off investing.", tag: "Best Value", cost: "0.44% TER" },
  { name: "Finpension", desc: "Lowest fees in Switzerland (0.39%). Flexible investment strategies.", tag: "Cheapest", cost: "0.39% TER" },
  { name: "Frankly (ZKB)", desc: "By Zürcher Kantonalbank. Good funds, slightly higher fees. Trusted brand.", tag: "Trusted", cost: "0.48% TER" },
  { name: "Bank 3a Accounts", desc: "Traditional savings-based 3a at any bank. Safe but very low returns (~0.5%).", tag: "Conservative", cost: "~0.5% interest" },
];

const tips = [
  { icon: Calculator, title: "Open 3a Day One", text: "Every year you miss is lost tax savings. Even partial contributions help. Set up a standing order for monthly deposits." },
  { icon: TrendingUp, title: "Invest, Don't Save", text: "A 3a savings account earns ~0.5%. Invested in index funds, expect 4–6% long-term. Over 30 years, that's 3x more." },
  { icon: PiggyBank, title: "Multiple 3a Accounts", text: "Open up to 5 accounts. Withdraw them in different years to spread the tax burden on withdrawal. Start planning now." },
  { icon: Banknote, title: "Check Your BVG Statement", text: "Review your Pillar 2 pension certificate (Vorsorgeausweis) annually. Understand your projected retirement income." },
  { icon: Clock, title: "Buy-In Opportunity", text: "If you moved from abroad, you may have BVG contribution gaps. Voluntary buy-ins are tax-deductible. Consult your HR." },
  { icon: Shield, title: "Leaving Switzerland?", text: "Pillar 2 and 3a can be withdrawn when leaving permanently. Pillar 1 (AHV) may still pay a pension if you contributed 1+ years." },
];

const websites = [
  { name: "VIAC.ch", url: "https://www.viac.ch", desc: "Best digital Pillar 3a platform with index investing.", tag: "3a Investing" },
  { name: "Finpension.ch", url: "https://www.finpension.ch", desc: "Lowest-cost 3a provider. Excellent fund selection.", tag: "Cheapest 3a" },
  { name: "AHV/IV Info", url: "https://www.ahv-iv.ch", desc: "Official information about Swiss state pension (Pillar 1).", tag: "Official" },
  { name: "VZ Vermögenszentrum", url: "https://www.vermoegenszentrum.ch", desc: "Independent pension planning and retirement advice.", tag: "Advisory" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PensionPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("pension");
  const { completed: completedCount, total } = getCategoryStats("pension");

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}><ArrowLeft className="h-5 w-5" /></Button>
            <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> Zurich</div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-success/10"><PiggyBank className="h-6 w-6 text-success" /></div>
            <div><h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Pension & Retirement</h1><p className="text-muted-foreground">Switzerland's 3-pillar system and how to maximize it</p></div>
          </div>
          <div className="mt-4 flex items-center gap-4"><Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span></div>
        </motion.div>

        {pillars.map((p) => (
          <motion.section key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-success/10 shrink-0"><p.icon className="h-5 w-5 text-success" /></div>
                <div><h2 className="font-display text-xl font-bold text-foreground">{p.name}</h2><p className="text-sm text-muted-foreground mt-1">{p.desc}</p></div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {p.details.map((d) => (<div key={d.label} className="p-3 rounded-lg bg-muted/50"><span className="text-xs font-medium text-muted-foreground">{d.label}</span><p className="text-sm font-medium text-foreground mt-0.5">{d.value}</p></div>))}
              </div>
            </div>
          </motion.section>
        ))}

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Best Pillar 3a Providers</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {providers.map((p) => (<div key={p.name} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground">{p.name}</h3><span className="text-xs font-medium bg-success/10 text-success px-2 py-0.5 rounded-full">{p.tag}</span></div>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-2 text-xs"><span className="text-muted-foreground">Fees: </span><span className="font-semibold text-foreground">{p.cost}</span></div>
            </div>))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Resources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {websites.map((s) => (<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all group block">
              <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</h3><ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" /></div>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.tag}</span><p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </a>))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Practical Advice</h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {tips.map((t) => (<motion.div key={t.title} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-2"><div className="p-2 rounded-lg bg-warning/10"><t.icon className="h-4 w-4 text-warning" /></div><h3 className="font-semibold text-foreground text-sm">{t.title}</h3></div>
              <p className="text-sm text-muted-foreground">{t.text}</p>
            </motion.div>))}
          </motion.div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" /> Pension Checklist</h2>
          <div className="max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]"><div className="space-y-3">
            {checklist.map((c, i) => (<div key={i} className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? "bg-success" : "border-2 border-muted"}`}>{c.done && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}</div><span className={`text-sm ${c.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{c.text}</span></div>))}
          </div></div>
        </motion.section>
      </div>
    </div>
  );
}
