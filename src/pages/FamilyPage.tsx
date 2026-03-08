import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft,
  Heart,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Baby,
  Users,
  Clock,
  Banknote,
  Phone,
  Building2,
  Stethoscope,
  Calendar,
  HandHeart,
  TreePine,
} from "lucide-react";

const services = [
  {
    category: "Childcare & Daycare (Kita)",
    items: [
      { name: "City of Zurich Kitas", desc: "Subsidized daycare centers run by the city. Ages 3 months to school age. Waitlists of 6–12 months.", cost: "CHF 1–130/day (income-based)", tag: "Subsidized" },
      { name: "Private Kitas (globegarden, pop e poppa)", desc: "Private chains with flexible hours, bilingual programs, and modern facilities.", cost: "CHF 120–180/day", tag: "Premium" },
      { name: "Tagesfamilien (Day Families)", desc: "Licensed family daycare in a caretaker's home. More personal, smaller groups.", cost: "CHF 8–12/hour", tag: "Personal" },
    ],
  },
  {
    category: "After-School Care (Hort)",
    items: [
      { name: "School-based Hort", desc: "After-school care provided at public schools. Lunch, homework help, and play time.", cost: "CHF 6–30/day (income-based)", tag: "Affordable" },
      { name: "Mittagstisch (Lunch Table)", desc: "Supervised lunch program at school. Warm meal and recreation.", cost: "CHF 8–15/meal", tag: "Lunchtime" },
    ],
  },
  {
    category: "Family Support Services",
    items: [
      { name: "Mütter- und Väterberatung", desc: "Free parenting advice for families with children 0–5. Health checks, nutrition, development guidance.", cost: "Free", tag: "Essential" },
      { name: "Familienbegleitung (Family Support)", desc: "Home-visit support for families in challenging situations. Multilingual counselors.", cost: "Free / Subsidized", tag: "Support" },
      { name: "Elternnotruf", desc: "24/7 helpline for parents in crisis. Confidential advice for stress, overwhelm, conflict.", cost: "Free", tag: "24/7" },
    ],
  },
];

const websites = [
  { name: "Kinderbetreuung Zürich", url: "https://www.stadt-zuerich.ch/kinderbetreuung", desc: "Official city portal for daycare search, subsidies, and enrollment.", tag: "Official" },
  { name: "kibesuisse.ch", url: "https://www.kibesuisse.ch", desc: "Swiss childcare association — find licensed daycare and day families.", tag: "Directory" },
  { name: "Pro Juventute", url: "https://www.projuventute.ch", desc: "Youth support organization — parenting tips, crisis help, activities.", tag: "Support" },
  { name: "Familienzentren Zürich", url: "https://www.stadt-zuerich.ch/familienzentren", desc: "Family centers across Zurich with playgroups, courses, and community.", tag: "Community" },
  { name: "HEKS Neue Gärten", url: "https://www.heks.ch", desc: "Integration programs for migrant families — language, networking, culture.", tag: "Integration" },
];

const tips = [
  { icon: Clock, title: "Register for Kita Immediately", text: "Zurich daycare waitlists average 6–12 months. Register during pregnancy or as soon as you decide to move. Multiple registrations are recommended." },
  { icon: Banknote, title: "Check Subsidy Eligibility", text: "City daycare subsidies are income-based. Even middle-income families may qualify. Apply through the Sozialdepartement." },
  { icon: Calendar, title: "Spielgruppen (Playgroups)", text: "For ages 2.5–5, Spielgruppen offer 2–3 mornings/week of social play and German exposure. Great transition before Kindergarten." },
  { icon: Users, title: "Join Parent Communities", text: "Facebook groups like 'Expat Parents Zurich' and local Quartierverein events are invaluable for making connections and getting advice." },
  { icon: HandHeart, title: "Maternity/Paternity Rights", text: "Switzerland offers 14 weeks paid maternity leave and 2 weeks paternity leave. Some employers offer more — always check your contract." },
  { icon: TreePine, title: "Family-Friendly Neighborhoods", text: "Kreis 2, 6, 7, and 10 are especially popular with families. Look for proximity to parks, schools, and Kitas." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function FamilyPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("family");
  const { completed: completedCount, total } = getCategoryStats("family");

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
            <div className="p-3 rounded-xl bg-accent/10"><Heart className="h-6 w-6 text-accent" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Family Services in Zurich</h1>
              <p className="text-muted-foreground">Childcare, family support, and everything your family needs</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span>
          </div>
        </motion.div>

        {/* Services by Category */}
        {services.map((section) => (
          <motion.section key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">{section.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((s) => (
                <div key={s.name} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
                  </div>
                  <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">{s.tag}</span>
                  <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                  <div className="mt-3 text-xs"><span className="text-muted-foreground">Cost: </span><span className="font-semibold text-foreground">{s.cost}</span></div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

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
          <CategoryChecklist categoryId="family" title="Family Checklist" />
        </motion.section>
      </div>
    </div>
  );
}
