import CommunitySection from "@/components/CommunitySection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  ShoppingCart, Clock, AlertTriangle, Store, Apple, Wheat,
  Leaf, Package, Truck, CalendarX, Coffee, Wine,
} from "lucide-react";

const supermarkets = [
  { name: "Migros", desc: "Switzerland's largest retailer. Good quality, mid-range prices. No alcohol.", url: "https://www.migros.ch/", tier: "Standard", tip: "Get a free Cumulus card — earn points on every purchase" },
  { name: "Coop", desc: "Second largest. Slightly pricier than Migros but broader selection. Sells alcohol.", url: "https://www.coop.ch/", tier: "Standard", tip: "Supercard gives you points. Coop-to-go for quick lunch" },
  { name: "Aldi Suisse", desc: "German discounter. 20–30% cheaper than Migros/Coop on basics.", url: "https://www.aldi-suisse.ch/", tier: "Budget", tip: "Weekly specials on Wednesdays and Saturdays are excellent" },
  { name: "Lidl", desc: "Another German discounter. Great bakery section and weekly deals.", url: "https://www.lidl.ch/", tier: "Budget", tip: "Lidl Plus app gives extra discounts and digital receipts" },
  { name: "Denner", desc: "Migros-owned discount chain. Best prices on wine and spirits.", url: "https://www.denner.ch/", tier: "Budget", tip: "Wine selection is surprisingly good for the price" },
  { name: "Globus", desc: "Premium department store with gourmet food hall. Special occasion shopping.", url: "https://www.globus.ch/", tier: "Premium", tip: "Delicatessen section is amazing for gifts and treats" },
];

const onlineGroceries = [
  { name: "Migros Online (migros.ch)", desc: "Full Migros range delivered to your door. Min. CHF 99 for free delivery.", tip: "Schedule delivery windows — very reliable" },
  { name: "Coop.ch", desc: "Coop's online shop. Same-day delivery available in Zurich.", tip: "Free delivery over CHF 99.90" },
  { name: "Farmy.ch", desc: "Farm-to-door organic & local produce. Higher quality, higher price.", tip: "Great for seasonal Swiss produce and supporting local farmers" },
];

const openingHours = [
  { day: "Monday–Friday", hours: "8:00 – 20:00 (some until 21:00)", note: "Larger stores and those in shopping centers may stay open later" },
  { day: "Saturday", hours: "8:00 – 18:00 (some until 20:00)", note: "Stock up! This is your last chance before Sunday" },
  { day: "Sunday", hours: "CLOSED ❌", note: "Almost everything is closed. Only train station shops (Zürich HB, Stadelhofen) are open" },
  { day: "Public Holidays", hours: "CLOSED ❌", note: "Same as Sunday. Check calendar for Swiss holidays (there are many!)" },
];

const sundaySurvival = [
  { title: "Zürich HB Bahnhof", desc: "Train station shops open 7 days. Migros, Coop, bakeries, pharmacies.", icon: Store },
  { title: "Stadelhofen Station", desc: "Small Coop and convenience stores open on Sundays.", icon: Store },
  { title: "Gas Station Shops", desc: "Coop Pronto and Migrolino at gas stations. Open late, including Sundays.", icon: Package },
  { title: "Restaurants & Takeaway", desc: "Restaurants are open on Sundays. Use Eat.ch or Uber Eats for delivery.", icon: Coffee },
];

const swissSpecialties = [
  { title: "Weekly Markets", desc: "Bürkliplatz (Tue & Fri), Helvetiaplatz (Sat) — fresh produce, cheese, bread, flowers. Cash + TWINT accepted.", icon: Apple },
  { title: "Reformhaus / Bio Shops", desc: "Organic & health food stores. More expensive but very high quality. Try Alnatura or Müller Reformhaus.", icon: Leaf },
  { title: "Asian/International Groceries", desc: "Asia Food (Langstrasse), Yummy Market (Europaallee) for ingredients you can't find at Migros.", icon: Wheat },
  { title: "Wine & Spirits", desc: "Denner has the best prices. Coop and Migros (Aligro) for bulk. Note: Migros does NOT sell alcohol.", icon: Wine },
];

const moneyTips = [
  "Aldi and Lidl are 20-30% cheaper than Migros/Coop for everyday items",
  "Too Good To Go app: rescue meals from restaurants for CHF 3-5",
  "Migros Budget / Coop Prix Garantie lines are excellent quality for the price",
  "Buy seasonal produce at weekly markets — fresher and often cheaper",
  "Batch cooking on weekends saves CHF 200-400/month vs eating out",
  "Compare prices with the Supercard/Cumulus apps before shopping",
];

export default function GroceriesPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("groceries");
  const stats = getCategoryStats("groceries");

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
            <ShoppingCart className="h-8 w-8 text-success" /> Groceries & Daily Shopping
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Where to buy food, what's open when, and how to save money on your weekly shop.
          </p>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="h-2 flex-1 max-w-xs bg-muted" />
            <span className="text-sm font-medium text-muted-foreground">{stats.completed}/{stats.total} done</span>
          </div>
        </motion.div>

        {/* CRITICAL: Sunday warning */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-5 rounded-xl bg-accent/10 border border-accent/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">⚠️ Shops are CLOSED on Sundays!</h3>
              <p className="text-sm text-muted-foreground">
                This is the #1 surprise for newcomers. Almost all shops, supermarkets, and pharmacies are closed on Sundays and public holidays.
                Stock up on Saturday or use train station shops (see below).
              </p>
            </div>
          </div>
        </motion.div>

        {/* Opening Hours */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Clock className="h-5 w-5 text-info" /> Opening Hours
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Do your big shop on Saturday morning. Use Migros Online or Coop.ch for delivery if you work late. Always have a Sunday backup plan.
          </p>
          <div className="space-y-2">
            {openingHours.map((slot) => (
              <div key={slot.day} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="w-28 shrink-0">
                  <span className={`text-sm font-semibold ${slot.hours.includes("CLOSED") ? "text-accent" : "text-foreground"}`}>{slot.day}</span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${slot.hours.includes("CLOSED") ? "text-accent" : "text-foreground"}`}>{slot.hours}</p>
                  <p className="text-xs text-muted-foreground">{slot.note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Sunday Survival */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <CalendarX className="h-5 w-5 text-accent" /> Sunday Survival Guide
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Places that ARE open on Sundays — your lifeline.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {sundaySurvival.map((place) => (
              <div key={place.title} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 mb-1">
                  <place.icon className="h-4 w-4 text-success" />
                  <h3 className="text-sm font-semibold text-foreground">{place.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{place.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Supermarkets */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" /> Supermarkets
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Do your basics at Aldi/Lidl and top up specialties at Migros/Coop. You'll save CHF 200+/month without sacrificing quality.
          </p>
          <div className="space-y-3">
            {supermarkets.map((store) => (
              <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:border-primary/30 transition-colors group">
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold shrink-0 ${
                  store.tier === "Budget" ? "bg-success/10 text-success" : store.tier === "Premium" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
                }`}>{store.tier}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{store.name}</h3>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{store.desc}</p>
                  <p className="text-xs text-primary/80 mt-1">💡 {store.tip}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Online Groceries */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Truck className="h-5 w-5 text-info" /> Online Grocery Delivery
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Migros Online is the most reliable. Order by noon for next-day delivery. Free delivery over CHF 99.
          </p>
          <div className="space-y-3">
            {onlineGroceries.map((store) => (
              <div key={store.name} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h3 className="text-sm font-semibold text-foreground">{store.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{store.desc}</p>
                <p className="text-xs text-info/80 mt-1">💡 {store.tip}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Swiss Specialties */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Apple className="h-5 w-5 text-accent" /> Markets & Specialty Shops
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Beyond the supermarket — local gems for fresh produce and international ingredients.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {swissSpecialties.map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Money-Saving Tips */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" /> Money-Saving Tips
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Groceries in Switzerland are expensive. These tips can save you CHF 200–400/month.
          </p>
          <div className="space-y-2">
            {moneyTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Checklist */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-4">
          <CategoryChecklist categoryId="groceries" title="Groceries Checklist" />
        </motion.section>

        <CommunitySection category="groceries" />
      </div>
    </div>
  );
}
