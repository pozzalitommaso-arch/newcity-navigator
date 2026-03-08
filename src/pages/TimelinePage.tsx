import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Home,
  Shield,
  Building2,
  GraduationCap,
  Users,
  Dumbbell,
  Heart,
  Landmark,
  MapPin,
} from "lucide-react";

const timeline = [
  {
    week: "Before Arrival",
    color: "bg-accent",
    items: [
      { icon: FileText, text: "Gather documents: passport, work contract, diplomas, birth certificates", tip: "Get apostille stamps if needed" },
      { icon: Home, text: "Start apartment search on Homegate & ImmoScout24", tip: "Zurich vacancy rate is <0.5% — start early" },
      { icon: Shield, text: "Research health insurance options on Comparis.ch", tip: "You have 3 months after arrival to register" },
    ],
  },
  {
    week: "Week 1",
    color: "bg-primary",
    items: [
      { icon: MapPin, text: "Register at Einwohnerkontrolle (residents' office)", tip: "Required within 14 days — bring passport, work contract, lease" },
      { icon: Building2, text: "Open a Swiss bank account", tip: "UBS, ZKB, or neobank (Yuh, Neon). Bring ID + permit" },
      { icon: Shield, text: "Register for mandatory health insurance", tip: "Compare on Comparis.ch — deadline is 3 months from arrival" },
    ],
  },
  {
    week: "Week 2",
    color: "bg-info",
    items: [
      { icon: Building2, text: "Set up TWINT and mobile banking", tip: "TWINT is Switzerland's #1 mobile payment — essential for daily life" },
      { icon: FileText, text: "Apply for residence permit if not yet received", tip: "Permit B (employed) or Permit L (short-term)" },
      { icon: Home, text: "Set up electricity, internet & Serafe (TV fee)", tip: "EWZ for electricity, Swisscom/Salt/Sunrise for internet" },
    ],
  },
  {
    week: "Week 3–4",
    color: "bg-success",
    items: [
      { icon: GraduationCap, text: "Enroll children in school or Kita", tip: "Contact your Kreisschulpflege for public school assignment" },
      { icon: Heart, text: "Find a family doctor (Hausarzt) and dentist", tip: "Choose one close to home — needed for insurance model" },
      { icon: Landmark, text: "Open a Pillar 3a retirement account", tip: "VIAC or Finpension — max CHF 7,056/year for tax deduction" },
    ],
  },
  {
    week: "Month 2",
    color: "bg-warning",
    items: [
      { icon: Users, text: "Join expat groups and local Vereine (clubs)", tip: "InterNations, Meetup.com, or local sports/culture clubs" },
      { icon: Dumbbell, text: "Sign up for a gym or sports club", tip: "Many clubs offer trial memberships — Vereinskultur is big in Switzerland" },
      { icon: FileText, text: "Get a Half-Fare card (Halbtax) for public transport", tip: "CHF 185/year — saves 50% on all trains, buses, boats" },
    ],
  },
  {
    week: "Month 3+",
    color: "bg-primary",
    items: [
      { icon: Shield, text: "Review and optimize insurance coverage", tip: "Adjust franchise, add supplementary insurance if needed" },
      { icon: Landmark, text: "Prepare for first tax declaration (Steuererklärung)", tip: "Due by March 31 — consider a tax advisor for the first year" },
      { icon: MapPin, text: "Explore neighborhoods, weekend trips, and Swiss culture", tip: "SBB day passes, hiking trails, cheese fondue season!" },
    ],
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } };

export default function TimelinePage() {
  const navigate = useNavigate();

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

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Your Settling-In Timeline</h1>
          <p className="text-muted-foreground text-lg mb-10">A week-by-week guide to getting fully set up in Switzerland.</p>
        </motion.div>

        <motion.div className="relative" variants={container} initial="hidden" animate="show">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

          {timeline.map((phase, pi) => (
            <motion.div key={phase.week} variants={item} className="relative mb-10 last:mb-0">
              {/* Week dot */}
              <div className={`absolute left-0 top-0 w-10 h-10 rounded-full ${phase.color} flex items-center justify-center z-10`}>
                <CalendarDays className="h-5 w-5 text-white" />
              </div>

              <div className="ml-14">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">{phase.week}</h2>
                <div className="space-y-3">
                  {phase.items.map((task, ti) => (
                    <div key={ti} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                      <div className="flex items-start gap-3">
                        <task.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{task.text}</p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {task.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
