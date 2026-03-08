import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  Building2, CreditCard, Globe, Banknote, Wallet, Shield, Smartphone,
} from "lucide-react";

const bankOptions = [
  { name: "ZKB (Zürcher Kantonalbank)", desc: "Zurich's cantonal bank. State-guaranteed, full-service, trusted locally. Best for everyday Swiss banking.", cost: "CHF 3–8/month", tag: "Local Favorite" },
  { name: "UBS", desc: "Global Swiss bank. Wide ATM network, premium services, international transfers.", cost: "CHF 5–10/month", tag: "Global" },
  { name: "PostFinance", desc: "By Swiss Post. Simple, affordable, great app. Free cash deposits at any post office.", cost: "CHF 5/month", tag: "Simple" },
  { name: "Neon", desc: "Swiss neobank — no fees, great app, Mastercard included. Perfect for digital-first users.", cost: "Free", tag: "Free" },
  { name: "Yuh", desc: "By Swissquote + PostFinance. Free account with investing built in, multi-currency.", cost: "Free", tag: "Invest + Bank" },
  { name: "Wise", desc: "Best for international transfers. Multi-currency account, real exchange rates.", cost: "Low fees per transfer", tag: "International" },
];

const websites = [
  { name: "Moneyland.ch", url: "https://www.moneyland.ch", desc: "Compare bank accounts, fees, credit cards, and savings accounts.", tag: "Must-Use" },
  { name: "Comparis.ch", url: "https://www.comparis.ch/bankkonten", desc: "Swiss comparison platform for bank accounts and financial products.", tag: "Comparison" },
  { name: "SIX Swiss Exchange", url: "https://www.six-group.com", desc: "Swiss stock exchange — for understanding Swiss financial markets.", tag: "Markets" },
];

const tips = [
  { icon: CreditCard, title: "Swiss IBAN Required", text: "Most employers require a Swiss IBAN for salary. Open an account as soon as you have your residence permit." },
  { icon: Smartphone, title: "TWINT is Essential", text: "Switzerland's mobile payment app. Used everywhere — restaurants, markets, peer transfers. Link it to your bank account." },
  { icon: Globe, title: "Multi-Currency Strategy", text: "Use Wise for receiving foreign currency. Use a Swiss bank for daily CHF transactions. Best of both worlds." },
  { icon: Shield, title: "Deposit Guarantee", text: "Swiss bank deposits are guaranteed up to CHF 100'000 per bank. Cantonal banks (ZKB) have additional state guarantees." },
  { icon: Wallet, title: "Credit Cards", text: "Swiss credit cards often have annual fees (CHF 100–250). Consider Certo! or free Neon Mastercard as alternatives." },
  { icon: Banknote, title: "Cash Still Matters", text: "Switzerland uses more cash than you'd expect. Keep some CHF on hand, especially for smaller shops and markets." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function BankingPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("banking");
  const { completed: completedCount, total } = getCategoryStats("banking");

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
            <div className="p-3 rounded-xl bg-info/10"><Building2 className="h-6 w-6 text-info" /></div>
            <div><h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Banking in Zurich</h1><p className="text-muted-foreground">Set up your Swiss bank account and payment methods</p></div>
          </div>
          <div className="mt-4 flex items-center gap-4"><Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span></div>
        </motion.div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Recommended Banks</h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" animate="show">
            {bankOptions.map((b) => (<motion.div key={b.name} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground text-sm">{b.name}</h3><span className="text-xs font-medium bg-info/10 text-info px-2 py-0.5 rounded-full shrink-0">{b.tag}</span></div>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
              <div className="mt-2 text-xs"><span className="text-muted-foreground">Cost: </span><span className="font-semibold text-foreground">{b.cost}</span></div>
            </motion.div>))}
          </motion.div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {websites.map((s) => (<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all group block">
              <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</h3><ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" /></div>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.tag}</span>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
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
          <CategoryChecklist categoryId="banking" title="Banking Checklist" />
        </motion.section>
      </div>
    </div>
  );
}
