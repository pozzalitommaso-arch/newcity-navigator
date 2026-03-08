import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useChecklistStore } from "@/lib/checklist-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import {
  GraduationCap, Home, Shield, Heart, Dumbbell, Landmark, Bell,
  Sparkles, MapPin, ArrowRight, CheckCircle2, Clock, AlertCircle,
  ChevronRight, User, MessageCircle, Building2, PiggyBank, Users,
  CalendarDays, FileText, Zap, TrendingUp, Calendar, Calculator,
  Rocket, Timer, PartyPopper, UserPlus, FolderOpen, BarChart3,
  ShoppingBag,
} from "lucide-react";
import type { QuickInfo } from "@/lib/onboarding-store";

const categoryData = [
  { id: "education", icon: GraduationCap, label: "Education", color: "text-info", bg: "bg-info/10", desc: "Schools, courses, enrollment" },
  { id: "family", icon: Heart, label: "Family Services", color: "text-accent", bg: "bg-accent/10", desc: "Childcare, family support" },
  { id: "housing", icon: Home, label: "Housing", color: "text-primary", bg: "bg-primary/10", desc: "Neighborhood, utilities" },
  { id: "insurance", icon: Shield, label: "Insurance & Health", color: "text-success", bg: "bg-success/10", desc: "Health, liability, home" },
  { id: "sports", icon: Dumbbell, label: "Sports & Leisure", color: "text-warning", bg: "bg-warning/10", desc: "Clubs, gyms, activities" },
  { id: "finance", icon: Landmark, label: "Financial Planning", color: "text-primary", bg: "bg-primary/10", desc: "Retirement, taxes, banking" },
  { id: "banking", icon: Building2, label: "Banking", color: "text-info", bg: "bg-info/10", desc: "Accounts, payments, transfers" },
  { id: "pension", icon: PiggyBank, label: "Pension & Retirement", color: "text-success", bg: "bg-success/10", desc: "Pillars, 3a, planning" },
  { id: "friends", icon: Users, label: "Friends & Community", color: "text-accent", bg: "bg-accent/10", desc: "Meet people, networking" },
  { id: "events", icon: CalendarDays, label: "Events & Culture", color: "text-warning", bg: "bg-warning/10", desc: "Local events, festivals" },
  { id: "public-services", icon: FileText, label: "Public Services", color: "text-info", bg: "bg-info/10", desc: "Registration, permits" },
  { id: "shopping", icon: ShoppingBag, label: "Shopping & Furnishing", color: "text-warning", bg: "bg-warning/10", desc: "Furniture, wardrobe, markets" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } } };

const essentialsKeys: (keyof QuickInfo)[] = ["address", "bank", "insurance", "doctor", "emergencyContact", "ahvNumber"];

// Simulated local events
const localEvents = [
  { title: "Flohmarkt Bürkliplatz", when: "Saturday, 8am–4pm", type: "Market" },
  { title: "Free German Tandem Meetup", when: "Wednesday, 7pm", type: "Social" },
  { title: "Newcomers Brunch — Kreis 5", when: "Sunday, 11am", type: "Community" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile } = useOnboardingStore();
  const { getOverallProgress, getCategoryProgress, getCategoryStats, checklists } = useChecklistStore();
  const city = profile.city || "Your City";
  const overallProgress = getOverallProgress();

  // Compute days since arrival for deadline radar
  const arrivalDate = profile.arrivalDate ? new Date(profile.arrivalDate) : new Date();
  const daysSinceArrival = Math.floor((Date.now() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24));

  // Dynamic urgent actions based on arrival date
  const urgentActions = [
    { title: "Register at Einwohnerkontrolle", desc: `${Math.max(0, 14 - daysSinceArrival)} days left — required within 14 days`, icon: FileText, color: "text-info", bg: "bg-info/10", path: "/public-services", urgent: daysSinceArrival < 14, daysLeft: Math.max(0, 14 - daysSinceArrival) },
    { title: "Register for health insurance", desc: `${Math.max(0, 90 - daysSinceArrival)} days left — mandatory within 3 months`, icon: Shield, color: "text-accent", bg: "bg-accent/10", path: "/insurance", urgent: daysSinceArrival < 90, daysLeft: Math.max(0, 90 - daysSinceArrival) },
    { title: "Open a Swiss bank account", desc: "Needed for salary and rent payments", icon: Building2, color: "text-primary", bg: "bg-primary/10", path: "/banking", urgent: false, daysLeft: 999 },
    { title: "Prepare your documents", desc: "Track all required paperwork in one place", icon: FolderOpen, color: "text-warning", bg: "bg-warning/10", path: "/documents", urgent: false, daysLeft: 999 },
  ].filter(a => a.daysLeft > 0 || !a.urgent).slice(0, 4);

  // Sort categories: in-progress first
  const sortedCategories = [...categoryData].sort((a, b) => {
    const pA = getCategoryProgress(a.id);
    const pB = getCategoryProgress(b.id);
    const scoreA = pA > 0 && pA < 100 ? 0 : pA === 0 ? 1 : 2;
    const scoreB = pB > 0 && pB < 100 ? 0 : pB === 0 ? 1 : 2;
    return scoreA - scoreB;
  });

  return (
    <PageTransition className="min-h-screen bg-background gradient-mesh-bg">
      {/* Glass Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="font-display text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => navigate("/documents")} title="Documents"><FolderOpen className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/timeline")} title="Timeline"><Calendar className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/calculator")} title="Cost Simulator"><Calculator className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/progress")} title="Progress Report"><BarChart3 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/chat")} title="AI Assistant"><MessageCircle className="h-5 w-5" /></Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} title="Profile"><User className="h-5 w-5" /></Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <MapPin className="h-4 w-4 text-primary" /> <span className="font-medium text-sm">{city}</span>
            {daysSinceArrival >= 0 && daysSinceArrival < 365 && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">Day {daysSinceArrival + 1} in {city}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Welcome to your <span className="gradient-text">new life!</span>
          </h1>
        </motion.div>

        {/* ── FIRST 72 HOURS / DEADLINE RADAR ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-5 rounded-2xl bg-card border border-accent/20 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 mb-1">
            <Rocket className="h-5 w-5 text-accent" />
            {daysSinceArrival <= 3 ? "Your First 72 Hours" : "What to do next"}
          </h2>
          <p className="text-xs text-muted-foreground mb-3">
            {daysSinceArrival <= 3
              ? "Focus on these critical tasks first — they have real deadlines and consequences."
              : "Your personalized action list based on deadlines and progress."}
          </p>
          <div className="space-y-2">
            {urgentActions.map((action, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className={`p-2 rounded-lg ${action.bg} shrink-0`}>
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{action.title}</h3>
                    {action.urgent && action.daysLeft <= 14 && (
                      <span className="text-[10px] font-semibold bg-accent/15 text-accent px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Timer className="h-2.5 w-2.5" /> {action.daysLeft}d left
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── This Week Near You + People Like You ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* This week near you */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="p-5 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
            <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <PartyPopper className="h-4 w-4 text-warning" /> This Week Near You
            </h2>
            <div className="space-y-2.5">
              {localEvents.map((ev, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{ev.title}</p>
                    <p className="text-[11px] text-muted-foreground">{ev.when} · {ev.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-3 text-xs" onClick={() => navigate("/events")}>
              See all events <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </motion.div>

          {/* People like you */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl bg-card border border-primary/20 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2 mb-3">
              <UserPlus className="h-4 w-4 text-primary" /> People Like You
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center">
                      <User className="h-3.5 w-3.5 text-primary" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">23 newcomers</span> also moved to {city} this month
                </p>
              </div>
              {profile.nationality && (
                <p className="text-xs text-muted-foreground">
                  🌍 8 {profile.nationality} expats are in your area
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                🎯 Most popular first step: Health insurance registration
              </p>
            </div>
            <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => navigate("/friends")}>
              Find your community <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </motion.div>
        </div>

        {/* Progress + Info Hub */}
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="p-5 rounded-2xl glass-strong border border-border/50 cursor-pointer group"
            onClick={() => navigate("/progress")}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10"><TrendingUp className="h-5 w-5 text-primary" /></div>
              <div className="flex-1">
                <h2 className="font-display text-base font-semibold text-foreground">Progress</h2>
                <p className="text-xs text-muted-foreground">View full report →</p>
              </div>
              <span className="text-2xl font-bold gradient-text">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2 bg-muted" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            onClick={() => navigate("/my-info")}
            className="p-5 rounded-2xl glass-strong border border-primary/20 cursor-pointer group hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10"><CheckCircle2 className="h-5 w-5 text-primary" /></div>
              <div className="flex-1">
                <h2 className="font-display text-base font-semibold text-foreground">Family Info Hub</h2>
                <p className="text-xs text-muted-foreground">Your essentials in one place</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {essentialsKeys.map((key) => {
                const stored = profile.quickInfo[key] as unknown as Record<string, string>;
                const filled = Object.values(stored).some(Boolean);
                return (
                  <div key={key} className={`p-1.5 rounded-lg text-center text-[10px] font-medium ${filled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {filled ? "✓" : "○"} {key === "emergencyContact" ? "SOS" : key === "ahvNumber" ? "AHV" : key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Life Categories ── */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">Life Categories</h2>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" variants={stagger} initial="hidden" animate="show">
            {sortedCategories.map((cat) => {
              const catProgress = getCategoryProgress(cat.id);
              const catStats = getCategoryStats(cat.id);
              return (
                <motion.div key={cat.id} variants={fadeUp} onClick={() => navigate(`/${cat.id}`)}
                  className="bento-card cursor-pointer group !p-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`p-2 rounded-lg ${cat.bg} transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                      <cat.icon className={`h-4 w-4 ${cat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{cat.label}</h3>
                      <p className="text-[11px] text-muted-foreground truncate">{cat.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={catProgress} className="h-1.5 bg-muted flex-1" />
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums w-8 text-right">{catProgress}%</span>
                  </div>
                  {catStats.completed > 0 && (
                    <p className="text-[10px] text-muted-foreground mt-1.5">{catStats.completed}/{catStats.total} tasks done</p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Bottom row: AI + Document Vault ── */}
        <div className="grid sm:grid-cols-2 gap-4 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            onClick={() => navigate("/chat")}
            className="p-5 rounded-2xl cursor-pointer group relative overflow-hidden"
            style={{ background: 'var(--gradient-hero)' }}>
            <div className="relative z-10 flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
              <div>
                <h3 className="font-display text-base font-semibold text-primary-foreground">Ask AI Assistant</h3>
                <p className="text-xs text-primary-foreground/80">Questions about life in {city}?</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary-foreground/60 ml-auto group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            onClick={() => navigate("/calculator")}
            className="p-5 rounded-2xl cursor-pointer group relative overflow-hidden"
            style={{ background: 'var(--gradient-warm)' }}>
            <div className="relative z-10 flex items-center gap-3">
              <Calculator className="h-6 w-6 text-primary-foreground" />
              <div>
                <h3 className="font-display text-base font-semibold text-primary-foreground">Cost Simulator</h3>
                <p className="text-xs text-primary-foreground/80">Know your monthly budget before you move</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary-foreground/60 ml-auto group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
