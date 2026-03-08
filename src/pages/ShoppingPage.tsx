import CommunitySection from "@/components/CommunitySection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CategoryChecklist from "@/components/CategoryChecklist";
import { useChecklistStore } from "@/lib/checklist-store";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  ShoppingBag, Sofa, Shirt, Lamp, UtensilsCrossed, Bed,
  Recycle, Store, Globe, Tag, Truck, Package,
} from "lucide-react";

const newStores = [
  { name: "IKEA Zürich", url: "https://www.ikea.com/ch/", desc: "Affordable furniture & home essentials. Delivery available.", icon: Sofa, tip: "Family card gives you free coffee & discounts" },
  { name: "Pfister", url: "https://www.pfister.ch/", desc: "Mid-range Swiss furniture store. Good quality sofas and beds.", icon: Bed, tip: "Sale events in January & July — up to 50% off" },
  { name: "JYSK", url: "https://www.jysk.ch/", desc: "Budget-friendly Scandinavian home goods.", icon: Lamp, tip: "Great for basics: pillows, curtains, storage" },
  { name: "Möbel Pfister / Interio", url: "https://www.interio.ch/", desc: "Modern home décor and smaller furniture pieces.", icon: Package, tip: "Good for decorative items and accessories" },
  { name: "Coop Bau+Hobby", url: "https://www.coopbauundhobby.ch/", desc: "DIY, tools, garden, and home improvement.", icon: Store, tip: "Use your Supercard for points on all purchases" },
  { name: "Migros Do It + Garden", url: "https://www.doitgarden.ch/", desc: "Home improvement, kitchen, and garden supplies.", icon: Store, tip: "Often cheaper than Coop for basics" },
];

const secondHandPlatforms = [
  { name: "Ricardo.ch", url: "https://www.ricardo.ch/", desc: "Switzerland's largest auction & marketplace. Furniture, electronics, everything.", icon: Tag, tip: "Set alerts for items you need — great deals appear daily" },
  { name: "Tutti.ch", url: "https://www.tutti.ch/", desc: "Free classifieds — many items listed for free or very cheap.", icon: Recycle, tip: "Filter by 'Gratis' to find free furniture from people moving out" },
  { name: "Facebook Marketplace", url: "https://www.facebook.com/marketplace/", desc: "Local buy/sell groups. Great for quick neighborhood deals.", icon: Globe, tip: "Join 'Zurich Expat Buy & Sell' and 'Free Your Stuff Zurich' groups" },
  { name: "Brockenhaus / Brocki", url: "https://www.brockenhaus.ch/", desc: "Charity thrift stores. Furniture, kitchenware, books, clothes.", icon: Store, tip: "Brocki Zürich Wiedikon is massive — go on a weekday morning for best selection" },
  { name: "Revendo", url: "https://www.revendo.ch/", desc: "Refurbished electronics — phones, laptops, tablets.", icon: Package, tip: "1-year warranty on refurbished Apple products" },
];

const wardrobeStores = [
  { name: "H&M / Zara / Uniqlo", desc: "Bahnhofstrasse & Europaallee — all the basics within walking distance.", tip: "Uniqlo for layering — Swiss weather is unpredictable" },
  { name: "Zalando.ch", desc: "Free delivery & returns. Huge selection of Swiss/EU brands.", tip: "Sign up for Zalando Plus for free next-day delivery" },
  { name: "Galaxus.ch", desc: "Switzerland's Amazon. Electronics, clothing, home, everything.", tip: "Price history feature helps you buy at the right time" },
  { name: "Second-hand: Depop / Vinted", desc: "Pre-loved fashion. Growing Swiss user base.", tip: "Great for quality Swiss brands like Mammut or Freitag at 50% off" },
];

const essentialsList = [
  { category: "Kitchen", items: "Pots, pans, cutting board, knife set, plates, glasses, cutlery, kettle, toaster" },
  { category: "Bedroom", items: "Mattress, duvet (Swiss standard: 160x210cm), pillows, sheets, hangers" },
  { category: "Bathroom", items: "Towels, shower curtain, bath mat, toiletries, cleaning supplies" },
  { category: "Living Room", items: "Sofa/couch, coffee table, lamp, curtains (many Swiss apartments have none!)" },
  { category: "Practical", items: "Vacuum cleaner, iron, laundry rack, trash bags (Züri-Sack!), recycling bins" },
];

export default function ShoppingPage() {
  const navigate = useNavigate();
  const { getCategoryProgress, getCategoryStats } = useChecklistStore();
  const progress = getCategoryProgress("shopping");
  const stats = getCategoryStats("shopping");

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
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 text-primary" /> <span className="font-medium text-sm">Zürich</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-primary" /> Shopping & Furnishing
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Everything you need to turn an empty apartment into a home — from IKEA to second-hand gems.
          </p>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="h-2 flex-1 max-w-xs bg-muted" />
            <span className="text-sm font-medium text-muted-foreground">{stats.completed}/{stats.total} done</span>
          </div>
        </motion.div>

        {/* Pro tip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-sm text-foreground flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-warning mt-0.5 shrink-0" />
            <span>
              <strong>Pro tip:</strong> Many people leave Zurich each month and give away furniture for free. Check Tutti.ch "Gratis" section and "Free Your Stuff Zurich" Facebook group before buying anything new. Swiss apartments often come WITHOUT kitchen appliances (no fridge, no oven!) — check your lease carefully.
            </span>
          </p>
        </motion.div>

        {/* Apartment Essentials Checklist */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" /> Apartment Essentials
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Don't buy everything on day one. Start with a mattress, kitchen basics, and towels. Furnish slowly — you'll find better deals and learn what you actually need.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {essentialsList.map((cat) => (
              <div key={cat.category} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h3 className="text-sm font-semibold text-foreground mb-1">{cat.category}</h3>
                <p className="text-xs text-muted-foreground">{cat.items}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* New Stores */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" /> Where to Buy New
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> IKEA is the go-to for budget furnishing. For quality pieces you'll keep, check Pfister's sale events. Coop Bau+Hobby and Migros Do It for tools and home improvement.
          </p>
          <div className="space-y-3">
            {newStores.map((store) => (
              <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:border-primary/30 transition-colors group">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <store.icon className="h-5 w-5 text-primary" />
                </div>
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

        {/* Second-Hand & Marketplaces */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Recycle className="h-5 w-5 text-success" /> Second-Hand & Marketplaces
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> This is where the magic happens. Zurich has a strong second-hand culture. You can furnish an entire apartment for under CHF 500 if you're patient. Brockenhaus stores are goldmines.
          </p>
          <div className="space-y-3">
            {secondHandPlatforms.map((platform) => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:border-success/30 transition-colors group">
                <div className="p-2 rounded-lg bg-success/10 shrink-0">
                  <platform.icon className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{platform.name}</h3>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{platform.desc}</p>
                  <p className="text-xs text-success/80 mt-1">💡 {platform.tip}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Wardrobe */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Shirt className="h-5 w-5 text-info" /> Wardrobe & Clothing
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Swiss weather demands layers. Invest in a good rain jacket and winter coat. For everyday clothing, Galaxus.ch often beats in-store prices. Second-hand Mammut gear is unbeatable value.
          </p>
          <div className="space-y-3">
            {wardrobeStores.map((store) => (
              <div key={store.name} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h3 className="text-sm font-semibold text-foreground">{store.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{store.desc}</p>
                <p className="text-xs text-info/80 mt-1">💡 {store.tip}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Delivery & Züri-Sack tip */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
            <Truck className="h-5 w-5 text-warning" /> Delivery & Moving Tips
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            🔑 <strong>Our recommendation:</strong> Most stores deliver for CHF 49–99. For second-hand pickups, rent a van from Mobility (car-sharing) for CHF 3.50/hour. Much cheaper than buying delivery.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold text-foreground">🚗 Mobility Car-Sharing</h3>
              <p className="text-xs text-muted-foreground mt-1">Rent a van by the hour for furniture pickups. Available at train stations across Zurich.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold text-foreground">🗑️ Züri-Sack (Trash Bags)</h3>
              <p className="text-xs text-muted-foreground mt-1">Zurich requires official trash bags (CHF 2–3 each). Buy at Migros/Coop. Recycling is free!</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold text-foreground">📦 Bulky Item Disposal</h3>
              <p className="text-xs text-muted-foreground mt-1">ERZ (Entsorgung + Recycling Zürich) picks up old furniture. Schedule online — often free.</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold text-foreground">🏪 Galaxus.ch</h3>
              <p className="text-xs text-muted-foreground mt-1">Free delivery on orders over CHF 50. Same-day delivery available in Zurich for CHF 9.90.</p>
            </div>
          </div>
        </motion.section>

        {/* Checklist */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pb-8">
          <CategoryChecklist categoryId="shopping" title="Shopping & Furnishing Checklist" />
        </motion.section>

        <CommunitySection category="shopping" />
      </div>
    </div>
  );
}
