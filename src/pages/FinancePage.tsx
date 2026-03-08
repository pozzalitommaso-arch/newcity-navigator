import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Landmark,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Banknote,
  PiggyBank,
  TrendingUp,
  Building2,
  FileText,
  Calculator,
  CreditCard,
  Wallet,
  Shield,
  Clock,
} from "lucide-react";

const financialTopics = [
  {
    name: "Swiss Banking Setup",
    icon: Building2,
    desc: "Open a Swiss bank account as soon as you have your residence permit. Most employers require a Swiss IBAN for salary payments.",
    details: [
      { label: "Top Banks", value: "UBS, Credit Suisse (now UBS), ZKB, PostFinance, Neon, Yuh" },
      { label: "Documents Needed", value: "Passport, residence permit, proof of address, employment contract" },
      { label: "Monthly Fees", value: "CHF 0 (Neon/Yuh) to CHF 5–10 (traditional banks)" },
    ],
  },
  {
    name: "Swiss Tax System",
    icon: FileText,
    desc: "Taxes in Switzerland are levied at 3 levels: federal, cantonal, and municipal. Zurich's combined rate is about 22–35% depending on income.",
    details: [
      { label: "Quellensteuer", value: "Withholding tax for B-permit holders (deducted from salary)" },
      { label: "Tax Return", value: "Required if income > CHF 120'000 or C-permit holder" },
      { label: "Key Deductions", value: "Commute, meals, childcare, 3a pillar, insurance premiums" },
    ],
  },
  {
    name: "3-Pillar Retirement System",
    icon: PiggyBank,
    desc: "Switzerland's retirement system has 3 pillars. Understanding and optimizing all three is crucial for long-term financial security.",
    details: [
      { label: "Pillar 1 (AHV)", value: "State pension — mandatory, contribution-based. Won't cover full living costs." },
      { label: "Pillar 2 (BVG)", value: "Occupational pension via employer. Your employer matches contributions." },
      { label: "Pillar 3a", value: "Private voluntary pension. Tax-deductible up to CHF 7'056/year (2026). Open ASAP!" },
    ],
  },
  {
    name: "Cost of Living in Zurich",
    icon: Wallet,
    desc: "Zurich is one of the world's most expensive cities. Budget carefully and take advantage of smart savings strategies.",
    details: [
      { label: "Groceries", value: "CHF 500–800/month per person (save with Aldi, Lidl, Denner)" },
      { label: "Dining Out", value: "CHF 20–40 per meal, CHF 5–7 for coffee" },
      { label: "Transport (GA/ZVV)", value: "CHF 89/month (ZVV annual), CHF 3'860/year (GA Travelcard)" },
      { label: "Total Living Cost", value: "CHF 4'000–7'000/month single, CHF 7'000–12'000 family" },
    ],
  },
];

const banks = [
  { name: "ZKB (Zürcher Kantonalbank)", desc: "Zurich's cantonal bank. State-guaranteed, full-service, trusted locally.", tag: "Local Favorite", type: "Traditional" },
  { name: "UBS", desc: "Global Swiss bank. Full range of services, premium banking options.", tag: "Global", type: "Traditional" },
  { name: "PostFinance", desc: "Owned by Swiss Post. Simple, affordable, great for everyday banking.", tag: "Affordable", type: "Traditional" },
  { name: "Neon", desc: "Swiss neobank — free account, no fees, great app. Modern and lean.", tag: "Free", type: "Digital" },
  { name: "Yuh (by Swissquote + PostFinance)", desc: "Digital bank with investing built in. Free account, multi-currency.", tag: "Invest + Bank", type: "Digital" },
  { name: "Wise (TransferWise)", desc: "Best for international transfers and multi-currency needs.", tag: "International", type: "Digital" },
];

const websites = [
  { name: "Moneyland.ch", url: "https://www.moneyland.ch", desc: "Compare banks, credit cards, insurance, mortgages — the Swiss financial comparison bible.", tag: "Must-Use" },
  { name: "Comparis.ch Finance", url: "https://www.comparis.ch/hypotheken", desc: "Compare mortgages, taxes, and financial products. Great calculators.", tag: "Comparison" },
  { name: "ESTV Tax Calculator", url: "https://www.estv.admin.ch/estv/en/home.html", desc: "Official Swiss federal tax calculator — estimate your tax burden by canton.", tag: "Official" },
  { name: "ch.ch Finance", url: "https://www.ch.ch/en/finance-and-taxes/", desc: "Government portal explaining Swiss financial system in plain language.", tag: "Guide" },
  { name: "VZ Vermögenszentrum", url: "https://www.vermoegenszentrum.ch", desc: "Independent financial advisory — retirement planning, tax optimization, investing.", tag: "Advisory" },
];

const tips = [
  { icon: PiggyBank, title: "Open Pillar 3a Immediately", text: "Max out your 3a contribution (CHF 7'056/year) from day one. It's tax-deductible and compounds over time. Use VIAC or Finpension for low-cost investing." },
  { icon: Calculator, title: "Optimize Tax Deductions", text: "Deduct commute costs, work meals (CHF 3'200), professional development, childcare, and Pillar 3a. Consider hiring a tax advisor for year one." },
  { icon: TrendingUp, title: "Invest Your Pillar 3a", text: "Don't leave 3a in a savings account (near 0% interest). Invest in index funds via VIAC, Finpension, or Frankly for 3–5%+ average returns." },
  { icon: CreditCard, title: "Avoid Unnecessary Fees", text: "Use Neon or Yuh for zero-fee banking. Use Wise for international transfers. Avoid credit card cash withdrawals (high fees)." },
  { icon: Clock, title: "Tax Filing Deadlines", text: "Zurich tax returns are due March 31. Extensions are free and easy to request online. Quellensteuer corrections must be filed by March 31 of the following year." },
  { icon: Shield, title: "Emergency Fund", text: "Keep 3–6 months of expenses in a savings account before investing. Swiss job protection is weaker than many EU countries." },
];

const checklist = [
  { text: "Open a Swiss bank account", done: false },
  { text: "Set up salary payment to Swiss IBAN", done: false },
  { text: "Understand your Quellensteuer (withholding tax)", done: false },
  { text: "Open a Pillar 3a account (VIAC, Finpension, or bank)", done: false },
  { text: "Check Pillar 2 pension fund details with employer", done: false },
  { text: "Set up a monthly budget for Zurich cost of living", done: false },
  { text: "Register for online tax filing (ZüriTax)", done: false },
  { text: "Research mortgage options if planning to buy", done: false },
  { text: "Get a Swiss credit card (if needed)", done: false },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function FinancePage() {
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
            <div className="p-3 rounded-xl bg-primary/10"><Landmark className="h-6 w-6 text-primary" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Financial Planning in Zurich</h1>
              <p className="text-muted-foreground">Banking, taxes, retirement, and managing your finances in Switzerland</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span>
          </div>
        </motion.div>

        {/* Financial Topics */}
        {financialTopics.map((topic) => (
          <motion.section key={topic.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 shrink-0"><topic.icon className="h-5 w-5 text-primary" /></div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">{topic.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{topic.desc}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {topic.details.map((d) => (
                  <div key={d.label} className="p-3 rounded-lg bg-muted/50">
                    <span className="text-xs font-medium text-muted-foreground">{d.label}</span>
                    <p className="text-sm font-medium text-foreground mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        ))}

        {/* Banks */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" /> Recommended Banks
          </h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {banks.map((bank) => (
              <motion.div key={bank.name} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{bank.name}</h3>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">{bank.tag}</span>
                </div>
                <span className="text-xs text-muted-foreground">{bank.type}</span>
                <p className="text-sm text-muted-foreground mt-2">{bank.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Websites */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Useful Resources</h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {websites.map((site) => (
              <motion.a key={site.name} href={site.url} target="_blank" rel="noopener noreferrer" variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all group block">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{site.name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{site.tag}</span>
                <p className="text-sm text-muted-foreground mt-2">{site.desc}</p>
              </motion.a>
            ))}
          </motion.div>
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
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" /> Finance Checklist</h2>
          <div className="max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
            <div className="space-y-3">
              {checklist.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? "bg-success" : "border-2 border-muted"}`}>{c.done && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}</div>
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
