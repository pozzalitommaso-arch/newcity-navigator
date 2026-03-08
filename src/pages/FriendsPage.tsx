import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  Users, MessageCircle, Globe, Coffee, Handshake, CalendarDays, Heart, Languages,
} from "lucide-react";

const ways = [
  { name: "Expat Meetups & Groups", icon: Users, desc: "Facebook groups, InterNations events, and expat associations are the fastest way to meet people who understand your situation.", items: [
    { name: "InterNations Zurich", desc: "Monthly events, professional networking, interest groups", cost: "Free events / CHF 5–10 premium", tag: "Largest Expat Network" },
    { name: "Meetup.com Groups", desc: "Hiking, language exchange, board games, tech meetups — dozens of active groups", cost: "Usually free", tag: "Diverse" },
    { name: "Zurich Expats (Facebook)", desc: "10'000+ members. Housing tips, recommendations, social events", cost: "Free", tag: "Community" },
  ]},
  { name: "Swiss Integration", icon: Handshake, desc: "Joining local Swiss associations (Vereine) is the #1 way to build deep, lasting friendships with locals.", items: [
    { name: "Sports Vereine", desc: "Football, tennis, hiking, rowing clubs. Swiss club culture is deeply social", cost: "CHF 150–600/year", tag: "Best for Integration" },
    { name: "Quartierverein (Neighborhood Assoc.)", desc: "Local community events, volunteering, neighborhood initiatives", cost: "CHF 20–50/year", tag: "Hyperlocal" },
    { name: "Volunteer Work", desc: "Benevol Zurich connects volunteers with organizations. Great for purpose and connections", cost: "Free", tag: "Give Back" },
  ]},
  { name: "Language & Culture", icon: Languages, desc: "Shared learning creates fast bonds. Language and cooking classes are natural friendship incubators.", items: [
    { name: "Tandem Language Partners", desc: "Swap your language for German/Swiss German practice. Deep 1-on-1 connections", cost: "Free", tag: "1-on-1" },
    { name: "Migros Klubschule Courses", desc: "Not just languages — cooking, art, dance, photography with locals", cost: "CHF 200–600/course", tag: "Diverse Classes" },
    { name: "Stammtisch (Regular Table)", desc: "Monthly pub meetups for specific communities. Ask around or check Meetup", cost: "Pay your own drinks", tag: "Casual" },
  ]},
];

const websites = [
  { name: "InterNations.org", url: "https://www.internations.org/zurich-expats", desc: "World's largest expat community. Events, forums, guides.", tag: "Expat Network" },
  { name: "Meetup.com", url: "https://www.meetup.com/cities/ch/zurich/", desc: "Find groups for any interest — hiking, tech, language, social.", tag: "Events" },
  { name: "Benevol Zurich", url: "https://www.benevol.ch", desc: "Volunteer matching platform. Find meaningful community work.", tag: "Volunteering" },
  { name: "Stadt Zürich Integration", url: "https://www.stadt-zuerich.ch/integration", desc: "City integration office — free programs, German courses, welcome events.", tag: "Official" },
];

const tips = [
  { icon: Coffee, title: "Say Yes to Everything", text: "First 6 months: accept every invitation. Aperitif, Grillabend, Wanderung — every event is a chance to build your network." },
  { icon: Languages, title: "Learn (Some) Swiss German", text: "Even basic greetings in Schwiizerdütsch (Grüezi, Merci vilmal) show respect and instantly warm people up." },
  { icon: Heart, title: "Be Patient", text: "Swiss friendships build slowly but run deep. It may take 1–2 years to feel truly embedded. Persistence pays off." },
  { icon: Handshake, title: "Verein = Social Life", text: "In Switzerland, social life often revolves around clubs. Join at least one Verein — it's the most authentic path to local friendships." },
  { icon: CalendarDays, title: "Host Something", text: "Invite colleagues or neighbors for an Apéro (drinks & snacks). Swiss people appreciate the gesture and will reciprocate." },
  { icon: Globe, title: "Mix Expat + Local", text: "Balance expat friendships (for shared experience) with local ones (for integration). Both are valuable." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function FriendsPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("friends");
  const { completed: completedCount, total } = getCategoryStats("friends");

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
            <div className="p-3 rounded-xl bg-accent/10"><Users className="h-6 w-6 text-accent" /></div>
            <div><h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Friends & Community</h1><p className="text-muted-foreground">Build your social network and feel at home in Zurich</p></div>
          </div>
          <div className="mt-4 flex items-center gap-4"><Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span></div>
        </motion.div>

        {ways.map((section) => (
          <motion.section key={section.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2"><section.icon className="h-5 w-5 text-accent" /> {section.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{section.desc}</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {section.items.map((i) => (<div key={i.name} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground text-sm">{i.name}</h3><span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full shrink-0">{i.tag}</span></div>
                <p className="text-sm text-muted-foreground">{i.desc}</p>
                <div className="mt-2 text-xs"><span className="text-muted-foreground">Cost: </span><span className="font-semibold text-foreground">{i.cost}</span></div>
              </div>))}
            </div>
          </motion.section>
        ))}

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Resources</h2>
          <p className="text-sm text-muted-foreground mb-4">🔑 <strong className="text-foreground">Pro tip:</strong> InterNations events are the fastest way to meet other expats in your first month. For deeper local integration, join a Verein or volunteer through Benevol.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {websites.map((s) => (<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all group block">
              <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</h3><ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" /></div>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s.tag}</span><p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </a>))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Practical Advice</h2>
          <p className="text-sm text-muted-foreground mb-4">🔑 <strong className="text-foreground">Patience pays off:</strong> Swiss friendships build slowly but last a lifetime. Say yes to every invitation in your first 6 months — and host an Apéro at your place. Swiss people love being invited.</p>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {tips.map((t) => (<motion.div key={t.title} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-2"><div className="p-2 rounded-lg bg-warning/10"><t.icon className="h-4 w-4 text-warning" /></div><h3 className="font-semibold text-foreground text-sm">{t.title}</h3></div>
              <p className="text-sm text-muted-foreground">{t.text}</p>
            </motion.div>))}
          </motion.div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-8">
          <CategoryChecklist categoryId="friends" title="Community Checklist" />
        </motion.section>
      </div>
    </div>
  );
}
