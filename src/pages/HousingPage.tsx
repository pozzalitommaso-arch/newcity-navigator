import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ZurichMap from "@/components/ZurichMap";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft,
  Home,
  ExternalLink,
  MapPin,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Key,
  Banknote,
  FileText,
  Star,
  Info,
} from "lucide-react";

const districts = [
  { name: "Kreis 1 – Altstadt", rentRange: "2'200–3'800", buyRange: "15'000–22'000", vibe: "Historic center, luxury, tourists", rating: 4 },
  { name: "Kreis 2 – Enge/Wollishofen", rentRange: "1'800–3'200", buyRange: "12'000–18'000", vibe: "Lake views, upscale, families", rating: 5 },
  { name: "Kreis 3 – Wiedikon", rentRange: "1'500–2'600", buyRange: "10'000–14'000", vibe: "Diverse, good transit, lively", rating: 4 },
  { name: "Kreis 4 – Aussersihl", rentRange: "1'400–2'400", buyRange: "9'000–13'000", vibe: "Trendy, nightlife, multicultural", rating: 3 },
  { name: "Kreis 5 – Industriequartier", rentRange: "1'600–2'800", buyRange: "11'000–16'000", vibe: "Hip, tech scene, converted lofts", rating: 4 },
  { name: "Kreis 6 – Oberstrass/Unterstrass", rentRange: "1'700–2'900", buyRange: "11'500–16'000", vibe: "University area, green, quiet", rating: 5 },
  { name: "Kreis 7 – Fluntern/Hottingen", rentRange: "2'000–3'500", buyRange: "14'000–20'000", vibe: "Premium, ETH/Zoo, panoramic views", rating: 5 },
  { name: "Kreis 8 – Riesbach/Seefeld", rentRange: "1'900–3'400", buyRange: "13'000–19'000", vibe: "Lakeside, cafés, elegant", rating: 5 },
  { name: "Kreis 9 – Albisrieden/Altstetten", rentRange: "1'300–2'200", buyRange: "8'000–12'000", vibe: "Affordable, developing, families", rating: 3 },
  { name: "Kreis 10 – Höngg/Wipkingen", rentRange: "1'400–2'400", buyRange: "9'500–13'000", vibe: "Green, village feel, ETH campus", rating: 4 },
  { name: "Kreis 11 – Oerlikon/Seebach", rentRange: "1'300–2'300", buyRange: "8'500–12'500", vibe: "Growing, good transit, malls", rating: 3 },
  { name: "Kreis 12 – Schwamendingen", rentRange: "1'200–2'000", buyRange: "7'500–11'000", vibe: "Most affordable, multicultural, green", rating: 3 },
];

const websites = [
  { name: "Homegate.ch", url: "https://www.homegate.ch", desc: "Switzerland's largest real estate platform. Rent & buy listings.", tag: "Most Popular" },
  { name: "ImmoScout24.ch", url: "https://www.immoscout24.ch", desc: "Comprehensive listings with detailed filters and price comparisons.", tag: "Recommended" },
  { name: "Comparis.ch", url: "https://www.comparis.ch/immobilien", desc: "Aggregator comparing listings across platforms + mortgage calculator.", tag: "Best for Comparison" },
  { name: "Flatfox.ch", url: "https://flatfox.ch", desc: "Direct applications, digital dossier, modern UX.", tag: "Digital-First" },
  { name: "Ronorp.net", url: "https://www.ronorp.net", desc: "Community-driven, great for WG (shared flats) and sublets.", tag: "Shared Flats" },
  { name: "WGZimmer.ch", url: "https://www.wgzimmer.ch", desc: "Dedicated platform for shared apartments and rooms.", tag: "WG / Rooms" },
];

const tips = [
  { icon: FileText, title: "Prepare Your Dossier", text: "Swiss landlords expect a complete application: ID, work contract, salary statements (3 months), debt certificate (Betreibungsauskunft), and references." },
  { icon: Banknote, title: "Budget 3 Months Deposit", text: "Landlords require a deposit of up to 3 months rent, held in a blocked bank account (Mietkautionskonto)." },
  { icon: Key, title: "Apply Fast & Wide", text: "Zurich's vacancy rate is under 0.5%. Apply to 10–20+ apartments. Attend viewings promptly. First impressions matter." },
  { icon: AlertTriangle, title: "Watch for Scams", text: "Never pay before visiting. Always verify the landlord or agency. Use official platforms only." },
  { icon: Building2, title: "Understand Swiss Leases", text: "Leases typically have 3-month notice periods. 'Nettomiete' is rent only; 'Bruttomiete' includes utilities (Nebenkosten)." },
  { icon: Star, title: "Tenant Rights", text: "The Mieterverband (tenant association) offers free legal advice. You can challenge unfair rent increases." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function HousingPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("housing");
  const { completed: completedCount, total } = getCategoryStats("housing");

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-display text-2xl font-bold text-primary">NewBe</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Zurich
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/10">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Housing in Zurich</h1>
              <p className="text-muted-foreground">Everything you need to find your new home</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" />
            <span className="text-sm font-medium text-muted-foreground">{progress}% complete</span>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> Zurich Districts & Price Map
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <ZurichMap />
              <div className="mt-3 p-3 rounded-lg bg-muted/50">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 mt-0.5 shrink-0 text-info" />
                  <p>Click markers for prices. Monthly rent (CHF) for 3.5-room apartments. Buy prices per m² (CHF). Approximate 2026 data.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {districts.map((d) => (
                <div
                  key={d.name}
                  className="p-4 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition-shadow"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{d.name}</h3>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-xs ${i < d.rating ? "text-warning" : "text-muted"}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{d.vibe}</p>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Rent: </span>
                      <span className="font-semibold text-foreground">CHF {d.rentRange}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Buy/m²: </span>
                      <span className="font-semibold text-foreground">CHF {d.buyRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Websites */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Best Websites to Find Apartments
          </h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {websites.map((site) => (
              <motion.a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all group block"
              >
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

        {/* Price Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" /> Price Overview — Zurich 2026
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Studio / 1.5 room", rent: "1'200–1'800", buy: "8'000–14'000" },
              { label: "2.5 rooms", rent: "1'500–2'400", buy: "9'000–16'000" },
              { label: "3.5 rooms", rent: "1'800–3'200", buy: "10'000–18'000" },
              { label: "4.5+ rooms", rent: "2'500–5'000+", buy: "12'000–22'000" },
            ].map((p) => (
              <div key={p.label} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h3 className="font-semibold text-foreground text-sm mb-3">{p.label}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rent/month</span>
                    <span className="font-semibold text-foreground">CHF {p.rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buy/m²</span>
                    <span className="font-semibold text-foreground">CHF {p.buy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practical Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" /> Practical Advice
          </h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {tips.map((tip) => (
              <motion.div
                key={tip.title}
                variants={item}
                className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <tip.icon className="h-4 w-4 text-warning" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tip.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pb-8"
        >
          <CategoryChecklist categoryId="housing" title="Housing Checklist" />
        </motion.section>
      </div>
    </div>
  );
}
