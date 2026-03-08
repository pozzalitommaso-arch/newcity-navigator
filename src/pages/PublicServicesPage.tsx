import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  FileText, Building2, Stamp, Clock, Globe, AlertTriangle, Car, Home, CreditCard, Scale,
} from "lucide-react";

const services = [
  {
    category: "First Steps (Within 14 Days)",
    urgent: true,
    items: [
      { name: "Einwohnerkontrolle (Residents' Registration)", desc: "Register at your local Kreisbüro within 14 days. Bring passport, permit, rental contract, passport photos.", where: "Kreisbüro of your district", tag: "Day 1" },
      { name: "Residence Permit (Aufenthaltsbewilligung)", desc: "Apply at Migrationsamt. B-permit for EU/EFTA, or employer-sponsored for others.", where: "Migrationsamt Zürich", tag: "Essential" },
    ],
  },
  {
    category: "Within First 3 Months",
    urgent: false,
    items: [
      { name: "Health Insurance Registration", desc: "Mandatory within 3 months. Choose a provider and register. See Insurance page for details.", where: "Any approved insurer", tag: "Mandatory" },
      { name: "Bank Account", desc: "Open a Swiss bank account for salary and daily transactions. See Banking page.", where: "Any Swiss bank", tag: "Essential" },
      { name: "Steuererklärung (Tax Registration)", desc: "Quellensteuer (withholding tax) is automatic for B-permit holders. C-permit holders must file.", where: "Steueramt Zürich", tag: "Automatic / Manual" },
    ],
  },
  {
    category: "Vehicle & Driving",
    urgent: false,
    items: [
      { name: "Driver's License Exchange", desc: "Exchange your foreign license within 12 months. Some countries require a driving test. EU licenses: simple swap.", where: "Strassenverkehrsamt", tag: "12 Months" },
      { name: "Vehicle Registration", desc: "If bringing a car: import, inspect, and register at Strassenverkehrsamt. Swiss plates required.", where: "Strassenverkehrsamt", tag: "If Applicable" },
    ],
  },
  {
    category: "Ongoing Services",
    urgent: false,
    items: [
      { name: "Betreibungsauskunft (Debt Certificate)", desc: "Clean debt record needed for apartment applications, some jobs, and credit. Order from Betreibungsamt.", where: "Betreibungsamt Zürich", tag: "As Needed" },
      { name: "Notary Services (Notar)", desc: "For property purchases, wills, power of attorney. Cantonal notaries are regulated.", where: "Notariat Zürich", tag: "As Needed" },
      { name: "Apostille & Legalisation", desc: "Foreign documents may need apostille or legalisation for Swiss use (marriage cert, diplomas).", where: "Embassy / BJ Bern", tag: "Documents" },
    ],
  },
];

const websites = [
  { name: "Stadt Zürich Services", url: "https://www.stadt-zuerich.ch", desc: "Official city portal — all public services, appointments, forms.", tag: "Official" },
  { name: "ch.ch", url: "https://www.ch.ch/en/", desc: "Swiss government portal — clear guides on permits, taxes, insurance, driving.", tag: "Federal" },
  { name: "Migrationsamt Zürich", url: "https://www.zh.ch/de/migration-integration.html", desc: "Cantonal migration office — permits, renewals, family reunification.", tag: "Permits" },
  { name: "EasyGov.swiss", url: "https://www.easygov.swiss", desc: "One-stop portal for business registration and government services.", tag: "Business" },
  { name: "Post.ch Address Change", url: "https://www.post.ch/umzug", desc: "Forward your mail when moving. Also notifies some authorities automatically.", tag: "Moving" },
];

const tips = [
  { icon: Clock, title: "Book Appointments Online", text: "Most Kreisbüro and government offices require appointments. Book online at stadt-zuerich.ch to avoid long waits." },
  { icon: FileText, title: "Keep Copies of Everything", text: "Switzerland runs on documents. Keep certified copies of permits, contracts, insurance policies, and tax filings." },
  { icon: Globe, title: "Apostille Your Documents", text: "Marriage certificates, birth certificates, and diplomas from abroad often need apostille stamps. Do this before you move!" },
  { icon: AlertTriangle, title: "14-Day Registration Rule", text: "You MUST register at Einwohnerkontrolle within 14 days of moving. Late registration can result in fines." },
  { icon: Scale, title: "Free Legal Advice", text: "Unentgeltliche Rechtsauskunft — free legal consultations available through the city. Book at Rechtsberatungsstelle." },
  { icon: Home, title: "Abmeldung When Leaving", text: "If you move away, deregister (Abmeldung) at the Kreisbüro. Required for tax final settlement and pension withdrawal." },
];

const checklist = [
  { text: "Register at Einwohnerkontrolle (within 14 days)", done: false },
  { text: "Apply for / receive residence permit", done: false },
  { text: "Register for health insurance (within 3 months)", done: false },
  { text: "Open Swiss bank account", done: false },
  { text: "Exchange driver's license (within 12 months)", done: false },
  { text: "Order Betreibungsauskunft for apartment search", done: false },
  { text: "Set up mail forwarding (Post.ch)", done: false },
  { text: "Register with tax office if needed", done: false },
  { text: "Get apostille on foreign documents", done: false },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PublicServicesPage() {
  const navigate = useNavigate();
  const completedCount = checklist.filter((c) => c.done).length;
  const progress = Math.round((completedCount / checklist.length) * 100);

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
            <div className="p-3 rounded-xl bg-info/10"><FileText className="h-6 w-6 text-info" /></div>
            <div><h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Public Services & Bureaucracy</h1><p className="text-muted-foreground">Registration, permits, documents, and navigating Swiss admin</p></div>
          </div>
          <div className="mt-4 flex items-center gap-4"><Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span></div>
        </motion.div>

        {services.map((section) => (
          <motion.section key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
              {section.category}
              {section.urgent && <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">Urgent</span>}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              {section.items.map((s) => (<div key={s.name} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground text-sm">{s.name}</h3><span className="text-xs font-medium bg-info/10 text-info px-2 py-0.5 rounded-full shrink-0">{s.tag}</span></div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-2 text-xs"><span className="text-muted-foreground">Where: </span><span className="font-medium text-foreground">{s.where}</span></div>
              </div>))}
            </div>
          </motion.section>
        ))}

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Official Resources</h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {websites.map((s) => (<motion.a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all group block">
              <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</h3><ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" /></div>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.tag}</span><p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </motion.a>))}
          </motion.div>
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
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" /> Admin Checklist</h2>
          <div className="max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]"><div className="space-y-3">
            {checklist.map((c, i) => (<div key={i} className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? "bg-success" : "border-2 border-muted"}`}>{c.done && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}</div><span className={`text-sm ${c.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{c.text}</span></div>))}
          </div></div>
        </motion.section>
      </div>
    </div>
  );
}
