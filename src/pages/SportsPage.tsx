import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft,
  Dumbbell,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Waves,
  Mountain,
  Bike,
  Trophy,
  Users,
  Calendar,
  Banknote,
  Clock,
  TreePine,
  Footprints,
} from "lucide-react";

const sportCategories = [
  {
    category: "Swimming & Water Sports",
    icon: Waves,
    spots: [
      { name: "Seebad Enge / Utoquai", desc: "Lake Zurich public baths — swim in the lake May–September. Iconic Zurich experience.", cost: "CHF 8/day", type: "Public Bath" },
      { name: "Hallenbad City / Oerlikon", desc: "Indoor pools open year-round. Lanes, family areas, saunas.", cost: "CHF 8–10/visit", type: "Indoor Pool" },
      { name: "ASVZ Water Sports", desc: "University sports offering sailing, rowing, and kayaking on Lake Zurich.", cost: "CHF 100–150/semester", type: "University" },
    ],
  },
  {
    category: "Gym & Fitness",
    icon: Dumbbell,
    spots: [
      { name: "Migros Fitnesscenter", desc: "Switzerland's most popular gym chain. Modern equipment, group classes, fair prices.", cost: "CHF 55–80/month", type: "Best Value" },
      { name: "Holmes Place / SPHRS", desc: "Premium gyms with spa, pool, and boutique fitness. Multiple Zurich locations.", cost: "CHF 130–200/month", type: "Premium" },
      { name: "ASVZ (University Sports)", desc: "Open to ETH/UZH affiliates. 100+ sports at minimal cost. Best deal in Zurich.", cost: "CHF 100/semester", type: "University" },
      { name: "CrossFit Zurich / Functional Fitness", desc: "Multiple CrossFit boxes across the city with strong community vibes.", cost: "CHF 150–200/month", type: "Community" },
    ],
  },
  {
    category: "Outdoor & Hiking",
    icon: Mountain,
    spots: [
      { name: "Uetliberg (Zurich's Mountain)", desc: "30 min from city center by S-Bahn. Panoramic views, hiking trails, winter sledging.", cost: "Free (SBB ticket)", type: "Must-Do" },
      { name: "Zürichberg / Käferberg Trails", desc: "Urban forest trails perfect for running and walking. Right in the city.", cost: "Free", type: "Urban Nature" },
      { name: "SAC (Swiss Alpine Club)", desc: "Join for mountain huts access, guided tours, alpine courses, and a community of outdoor enthusiasts.", cost: "CHF 80–150/year", type: "Club" },
    ],
  },
  {
    category: "Cycling & Running",
    icon: Bike,
    spots: [
      { name: "Zurich Lake Loop", desc: "30km cycling/running loop around the lake. Flat, scenic, well-maintained.", cost: "Free", type: "Classic Route" },
      { name: "Parkrun Zurich", desc: "Free 5K every Saturday morning at Irchelpark. Great community, all levels welcome.", cost: "Free", type: "Weekly Event" },
      { name: "Züri Velo (City Bikes)", desc: "Free bike sharing for the first 30 minutes. Stations across the city.", cost: "Free–CHF 5", type: "City Bikes" },
    ],
  },
];

const clubs = [
  { name: "FC Zurich (Football)", members: "4'000+", desc: "Historic football club with youth programs for all ages.", cost: "CHF 300–600/year", tag: "Football" },
  { name: "Grasshopper Club (Multi-Sport)", members: "3'500+", desc: "Multi-sport club: football, handball, tennis, athletics, and more.", cost: "CHF 200–500/year", tag: "Multi-Sport" },
  { name: "TC Seeblick (Tennis)", members: "800+", desc: "Tennis club with outdoor and indoor courts. Lessons for all levels.", cost: "CHF 500–1'200/year", tag: "Tennis" },
  { name: "Ruderclub Zürich (Rowing)", members: "400+", desc: "Rowing on Lake Zurich and River Limmat. Beginner courses available.", cost: "CHF 400–800/year", tag: "Rowing" },
  { name: "SC Küsnacht (Ice Hockey)", members: "600+", desc: "Ice hockey club with youth programs and adult recreational leagues.", cost: "CHF 300–700/year", tag: "Ice Hockey" },
  { name: "Turnverein (Gymnastics)", members: "1'000+", desc: "Swiss tradition — gymnastics clubs in every district, all ages.", cost: "CHF 150–400/year", tag: "Gymnastics" },
];

const websites = [
  { name: "ASVZ.ch", url: "https://www.asvz.ch", desc: "University sports Zurich — 100+ sports, open to affiliates and some public.", tag: "Best Deal" },
  { name: "ZürichSport", url: "https://www.stadt-zuerich.ch/ssd/de/index/sport.html", desc: "City of Zurich sports portal — facilities, clubs, and events.", tag: "Official" },
  { name: "Swiss Olympic Club Finder", url: "https://www.swissolympic.ch", desc: "Find registered sports clubs across Switzerland by sport and location.", tag: "Club Finder" },
  { name: "Outdoor Active", url: "https://www.outdooractive.com", desc: "Hiking, cycling, and trail maps for the Zurich region and all of Switzerland.", tag: "Trails" },
  { name: "Zürich Tourismus", url: "https://www.zuerich.com/en/visit/sport", desc: "Tourist office guide to sports and outdoor activities in Zurich.", tag: "Guide" },
];

const tips = [
  { icon: Trophy, title: "Try Before You Join", text: "Most Swiss clubs offer Schnuppertraining (trial sessions). Attend 2–3 before committing to membership fees." },
  { icon: Calendar, title: "Seasonal Sports", text: "Lake swimming May–Sep, skiing Dec–Apr, hiking Apr–Nov. Plan your activities around Swiss seasons for maximum enjoyment." },
  { icon: Users, title: "Vereinskultur (Club Culture)", text: "Swiss sports clubs are also social hubs. Joining a Verein is one of the best ways to integrate and build friendships." },
  { icon: Banknote, title: "Sport Tax Deductions", text: "Children's sports fees (up to CHF 500/year per child) are tax-deductible in Zurich canton. Keep receipts!" },
  { icon: Clock, title: "Book Facilities Early", text: "Public tennis courts, football pitches, and gym slots fill up fast. Book via the city's online reservation system." },
  { icon: Footprints, title: "Free Activities Everywhere", text: "Running trails, outdoor fitness parks (Vita Parcours), lake swimming, and hiking are all free. Switzerland is an outdoor playground." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function SportsPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("sports");
  const { completed: completedCount, total } = getCategoryStats("sports");

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
            <div className="p-3 rounded-xl bg-warning/10"><Dumbbell className="h-6 w-6 text-warning" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Sports & Leisure in Zurich</h1>
              <p className="text-muted-foreground">Gyms, clubs, outdoor activities, and staying active in your new city</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span>
          </div>
        </motion.div>

        {/* Sport Categories */}
        {sportCategories.map((section) => (
          <motion.section key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
              <section.icon className="h-5 w-5 text-warning" /> {section.category}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">🔑 {section.category === "Swimming & Water Sports" ? <><strong className="text-foreground">Don't miss:</strong> Lake swimming is a quintessential Zurich experience — Seebad Enge and Utoquai are iconic. Best from June to September, it's free and unforgettable.</> : section.category === "Gym & Fitness" ? <><strong className="text-foreground">Best value:</strong> ASVZ (university sports) at CHF 100/semester is unbeatable if you're affiliated. Otherwise, Migros FitnessCenter offers the best quality-price ratio.</> : section.category === "Outdoor & Hiking" ? <><strong className="text-foreground">Must-do:</strong> Uetliberg is just 30 minutes away and gives you panoramic Alpine views. Join SAC (Swiss Alpine Club) for mountain hut discounts and a great hiking community.</> : <><strong className="text-foreground">Great option:</strong> Parkrun is free every Saturday at Irchelpark — no signup needed. Perfect way to start running and meet people in a friendly, international community.</>}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.spots.map((s) => (
                <div key={s.name} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
                    <span className="text-xs font-medium bg-warning/10 text-warning px-2 py-0.5 rounded-full shrink-0">{s.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-2 text-xs"><span className="text-muted-foreground">Cost: </span><span className="font-semibold text-foreground">{s.cost}</span></div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Clubs */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" /> Popular Sports Clubs
          </h2>
          <p className="text-sm text-muted-foreground mb-4">🔑 <strong className="text-foreground">Integration tip:</strong> Joining a Swiss Verein (sports club) is the #1 way to make local friends. Most offer trial sessions — try 2-3 clubs before committing. The social life is as valuable as the sport.</p>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {clubs.map((club) => (
              <motion.div key={club.name} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{club.name}</h3>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">{club.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{club.desc}</p>
                <div className="flex gap-4 mt-2 text-xs">
                  <div><span className="text-muted-foreground">Members: </span><span className="font-medium text-foreground">{club.members}</span></div>
                  <div><span className="text-muted-foreground">Cost: </span><span className="font-medium text-foreground">{club.cost}</span></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Websites */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Useful Resources</h2>
          <p className="text-sm text-muted-foreground mb-4">🔑 <strong className="text-foreground">Bookmark these:</strong> ASVZ.ch and ZürichSport are your go-to portals for finding everything from pool schedules to Vita Parcours trail maps.</p>
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
          <CategoryChecklist categoryId="sports" title="Sports Checklist" />
        </motion.section>
      </div>
    </div>
  );
}
