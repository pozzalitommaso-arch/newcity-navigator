import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, MapPin, ExternalLink, CheckCircle2, Lightbulb,
  CalendarDays, Music, Palette, Ticket, PartyPopper, Mountain, Globe, Star,
} from "lucide-react";

const eventCategories = [
  { category: "Annual Highlights", icon: PartyPopper, items: [
    { name: "Züri Fäscht", date: "Every 3 years (next: 2028)", desc: "Switzerland's largest public festival. 2 million visitors, fireworks, food, music along the lake.", tag: "Iconic" },
    { name: "Sechseläuten", date: "3rd Monday of April", desc: "Spring festival with guild parades and the burning of Böögg (snowman). The faster it burns, the better the summer!", tag: "Tradition" },
    { name: "Street Parade", date: "2nd Saturday of August", desc: "World's largest techno parade. 1 million ravers along the lake. Free.", tag: "Legendary" },
    { name: "Knabenschiessen", date: "2nd weekend of September", desc: "Shooting festival with a huge funfair at Albisgütli. Fun for all ages.", tag: "Fun Fair" },
  ]},
  { category: "Arts & Culture", icon: Palette, items: [
    { name: "Kunsthaus Zürich", date: "Year-round", desc: "World-class art museum with Impressionist, modern, and contemporary collections. Free on Wednesdays.", tag: "Museum" },
    { name: "Zurich Film Festival (ZFF)", date: "Late September", desc: "International film festival with premieres, stars, and public screenings across the city.", tag: "Film" },
    { name: "Theater Spektakel", date: "August", desc: "Open-air performing arts festival on Lake Zurich. Theater, dance, circus, music from around the world.", tag: "Performing Arts" },
  ]},
  { category: "Music & Nightlife", icon: Music, items: [
    { name: "Tonhalle Zürich", date: "Year-round", desc: "World-renowned concert hall. Classical music, jazz, and contemporary performances.", tag: "Classical" },
    { name: "Openair Zurich", date: "Summer", desc: "Open-air concerts and festivals around the city. Check Zürich Openair and Live at Sunset.", tag: "Live Music" },
    { name: "Langstrasse & Kreis 4", date: "Year-round", desc: "Zurich's nightlife hub. Bars, clubs, live music venues. Something for every taste.", tag: "Nightlife" },
  ]},
  { category: "Seasonal & Markets", icon: Star, items: [
    { name: "Christmas Markets", date: "Nov–Dec", desc: "Hauptbahnhof, Bellevue, Niederdorf — magical Christmas markets with mulled wine and crafts.", tag: "Winter" },
    { name: "Farmers Markets", date: "Tue, Fri, Sat", desc: "Bürkliplatz, Helvetiaplatz, Milchbuck — fresh local produce, cheese, bread, flowers.", tag: "Weekly" },
    { name: "Flohmarkt (Flea Markets)", date: "Various weekends", desc: "Kanzlei, Bürkliplatz — vintage finds, antiques, and community atmosphere.", tag: "Shopping" },
  ]},
];

const websites = [
  { name: "ZürichUnbezahlbar", url: "https://www.zuerichunbezahlbar.ch", desc: "Free and low-cost events in Zurich. Updated daily.", tag: "Free Events" },
  { name: "Zürich Tourismus Events", url: "https://www.zuerich.com/en/visit/events", desc: "Official tourism event calendar — comprehensive and reliable.", tag: "Official" },
  { name: "Ron Orp", url: "https://www.ronorp.net", desc: "Daily newsletter with Zurich events, tips, and community listings.", tag: "Daily Tips" },
  { name: "Eventbrite Zurich", url: "https://www.eventbrite.ch", desc: "Workshops, networking, classes, and special events.", tag: "Workshops" },
];

const tips = [
  { icon: Globe, title: "Follow Local Newsletters", text: "Subscribe to Ron Orp (daily) and ZürichUnbezahlbar for a constant stream of events. You'll never run out of things to do." },
  { icon: Ticket, title: "Kulturlegi", text: "Low-income residents can get a Kulturlegi card for 50–70% discounts on cultural events, sports, and courses. Apply at Caritas." },
  { icon: Mountain, title: "Weekend Trips", text: "Zurich is a gateway to the Alps. Lucerne (45 min), Interlaken (2h), and Grindelwald (2.5h) are easy day trips by train." },
  { icon: CalendarDays, title: "Museum Sundays", text: "Many Zurich museums offer free or reduced entry on the first Sunday of the month. Plan your cultural calendar accordingly." },
  { icon: PartyPopper, title: "Nachbarschaftsfeste", text: "Neighborhood parties happen in summer. Check your Quartierverein for dates. Great way to meet neighbors." },
  { icon: Music, title: "Free Concerts", text: "Churches, parks, and public spaces host free concerts year-round. Check Tonhalle free lunchtime concerts." },
];

const checklist = [
  { text: "Subscribe to a local events newsletter", done: false },
  { text: "Visit Kunsthaus Zürich", done: false },
  { text: "Attend a farmers market", done: false },
  { text: "Experience a major Zurich festival", done: false },
  { text: "Explore Langstrasse nightlife", done: false },
  { text: "Visit a Christmas market (winter)", done: false },
  { text: "Take a weekend trip to the Alps", done: false },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function EventsPage() {
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
            <div className="p-3 rounded-xl bg-warning/10"><CalendarDays className="h-6 w-6 text-warning" /></div>
            <div><h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Events & Culture in Zurich</h1><p className="text-muted-foreground">Festivals, arts, markets, and things to do year-round</p></div>
          </div>
          <div className="mt-4 flex items-center gap-4"><Progress value={progress} className="h-2.5 flex-1 max-w-xs bg-muted" /><span className="text-sm font-medium text-muted-foreground">{progress}% complete</span></div>
        </motion.div>

        {eventCategories.map((section) => (
          <motion.section key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><section.icon className="h-5 w-5 text-warning" /> {section.category}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.items.map((e) => (<div key={e.name} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-1"><h3 className="font-semibold text-foreground text-sm">{e.name}</h3><span className="text-xs font-medium bg-warning/10 text-warning px-2 py-0.5 rounded-full shrink-0">{e.tag}</span></div>
                <p className="text-xs text-primary font-medium mb-1">{e.date}</p>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </div>))}
            </div>
          </motion.section>
        ))}

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
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" /> Events Checklist</h2>
          <div className="max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]"><div className="space-y-3">
            {checklist.map((c, i) => (<div key={i} className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${c.done ? "bg-success" : "border-2 border-muted"}`}>{c.done && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}</div><span className={`text-sm ${c.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{c.text}</span></div>))}
          </div></div>
        </motion.section>
      </div>
    </div>
  );
}
