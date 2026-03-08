import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useChecklistStore } from "@/lib/checklist-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EssentialsCard from "@/components/EssentialsCard";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import {
  GraduationCap,
  Home,
  Shield,
  Heart,
  Dumbbell,
  Landmark,
  Bell,
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  User,
  MessageCircle,
  Building2,
  PiggyBank,
  Users,
  CalendarDays,
  FileText,
  Zap,
  TrendingUp,
  Calendar,
  Calculator,
} from "lucide-react";
import type { QuickInfo } from "@/lib/onboarding-store";

const categoryData = [
  { id: "education", icon: GraduationCap, label: "Education", color: "text-info", bg: "bg-info/10", tasks: 3, desc: "Schools, courses, enrollment", span: "sm:col-span-2" },
  { id: "family", icon: Heart, label: "Family Services", color: "text-accent", bg: "bg-accent/10", tasks: 4, desc: "Childcare, family support", span: "" },
  { id: "housing", icon: Home, label: "Housing", color: "text-primary", bg: "bg-primary/10", tasks: 2, desc: "Neighborhood, utilities", span: "" },
  { id: "insurance", icon: Shield, label: "Insurance & Health", color: "text-success", bg: "bg-success/10", tasks: 5, desc: "Health, liability, home", span: "sm:col-span-2" },
  { id: "sports", icon: Dumbbell, label: "Sports & Leisure", color: "text-warning", bg: "bg-warning/10", tasks: 2, desc: "Clubs, gyms, activities", span: "" },
  { id: "finance", icon: Landmark, label: "Financial Planning", color: "text-primary", bg: "bg-primary/10", tasks: 4, desc: "Retirement, taxes, banking", span: "" },
  { id: "banking", icon: Building2, label: "Banking", color: "text-info", bg: "bg-info/10", tasks: 3, desc: "Accounts, payments, transfers", span: "" },
  { id: "pension", icon: PiggyBank, label: "Pension & Retirement", color: "text-success", bg: "bg-success/10", tasks: 3, desc: "Pillars, 3a, planning", span: "" },
  { id: "friends", icon: Users, label: "Friends & Community", color: "text-accent", bg: "bg-accent/10", tasks: 2, desc: "Meet people, networking", span: "sm:col-span-2" },
  { id: "events", icon: CalendarDays, label: "Events & Culture", color: "text-warning", bg: "bg-warning/10", tasks: 2, desc: "Local events, festivals", span: "" },
  { id: "public-services", icon: FileText, label: "Public Services", color: "text-info", bg: "bg-info/10", tasks: 5, desc: "Registration, permits", span: "" },
];

const recommendations = [
  { type: "insurance", title: "Health Insurance Setup Required", desc: "Register for health insurance within 3 months of arrival.", icon: Shield, color: "text-accent", bg: "bg-accent/10", urgent: true },
  { type: "school", title: "Top-rated International Schools", desc: "3 highly-rated schools within 5km of your location.", icon: GraduationCap, color: "text-info", bg: "bg-info/10", urgent: false },
  { type: "sports", title: "Sports Clubs Near You", desc: "5 clubs match your interests. Registration open this month.", icon: Dumbbell, color: "text-warning", bg: "bg-warning/10", urgent: false },
];

const notifications = [
  { text: "School enrollment deadline in 2 weeks", icon: AlertCircle, time: "2h ago", urgent: true },
  { text: "New family-friendly events this weekend", icon: Heart, time: "5h ago", urgent: false },
  { text: "Your housing checklist is 35% complete", icon: CheckCircle2, time: "1d ago", urgent: false },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } } };

const essentialsKeys: (keyof QuickInfo)[] = ["address", "bank", "insurance", "doctor", "emergencyContact", "ahvNumber"];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile } = useOnboardingStore();
  const { getOverallProgress, getCategoryProgress } = useChecklistStore();
  const city = profile.city || "Your City";
  const overallProgress = getOverallProgress();

  return (
    <PageTransition className="min-h-screen bg-background gradient-mesh-bg">
      {/* Glass Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="font-display text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => navigate("/timeline")} title="Timeline">
              <Calendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/calculator")} title="Calculator">
              <Calculator className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/chat")} title="AI Assistant">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" title="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-accent rounded-full border-2 border-background animate-pulse" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} title="Profile">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Header with gradient accent */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <MapPin className="h-4 w-4 text-primary" /> <span className="font-medium">{city}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Welcome to your <span className="gradient-text">new life!</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">Here's your personalized settling-in dashboard. Let's make {city} feel like home.</p>
        </motion.div>

        {/* Progress Card — glass style */}
        <motion.div
          className="p-6 rounded-2xl glass-strong border border-border/50 cursor-pointer group"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => navigate("/profile")}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">Settling-In Progress</h2>
                <p className="text-sm text-muted-foreground">Tap to see detailed breakdown →</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold gradient-text">{overallProgress}%</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
            </div>
          </div>
          <div className="relative">
            <Progress value={overallProgress} className="h-3 bg-muted" />
            <div
              className="absolute top-0 left-0 h-3 rounded-full opacity-30 blur-sm"
              style={{ width: `${overallProgress}%`, background: 'var(--gradient-hero)' }}
            />
          </div>
        </motion.div>

        {/* My Essentials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" /> My Essentials
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {essentialsKeys.map((key) => (
              <EssentialsCard key={key} category={key} />
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">AI Recommendations</h2>
              </div>
              <motion.div className="space-y-3" variants={stagger} initial="hidden" animate="show">
                {recommendations.map((rec, i) => (
                  <motion.div key={i} variants={fadeUp} className="bento-card cursor-pointer group">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl ${rec.bg} shrink-0`}><rec.icon className={`h-6 w-6 ${rec.color}`} /></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-foreground">{rec.title}</h3>
                          {rec.urgent && (
                            <span className="text-xs font-semibold bg-accent/15 text-accent px-2.5 py-1 rounded-full flex items-center gap-1">
                              <Zap className="h-3 w-3" /> Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{rec.desc}</p>
                        <button className="text-sm text-primary font-medium mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View details <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bento Grid Categories */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Life Categories</h2>
              <motion.div className="grid sm:grid-cols-3 gap-3" variants={stagger} initial="hidden" animate="show">
                {categoryData.map((cat) => {
                  const catProgress = getCategoryProgress(cat.id);
                  return (
                    <motion.div
                      key={cat.id}
                      variants={fadeUp}
                      onClick={() => navigate(`/${cat.id}`)}
                      className={`bento-card cursor-pointer group ${cat.span}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2.5 rounded-xl ${cat.bg} transition-transform duration-300 group-hover:scale-110`}>
                          <cat.icon className={`h-5 w-5 ${cat.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm">{cat.label}</h3>
                          <p className="text-xs text-muted-foreground truncate">{cat.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 duration-300 shrink-0" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                          <Progress value={catProgress} className="h-1.5 bg-muted" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground tabular-nums">{catProgress}%</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* AI Chat CTA — gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => navigate("/chat")}
              className="p-5 rounded-2xl cursor-pointer group relative overflow-hidden"
              style={{ background: 'var(--gradient-hero)' }}
            >
              <div className="shimmer absolute inset-0" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="h-5 w-5 text-primary-foreground" />
                  <h3 className="font-display text-lg font-semibold text-primary-foreground">Ask AI Assistant</h3>
                </div>
                <p className="text-sm text-primary-foreground/80">Have a question about life in {city}? Ask our AI anything.</p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-2 gap-3"
            >
              <div
                onClick={() => navigate("/timeline")}
                className="bento-card cursor-pointer text-center py-4"
              >
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-semibold text-foreground">Timeline</span>
              </div>
              <div
                onClick={() => navigate("/calculator")}
                className="bento-card cursor-pointer text-center py-4"
              >
                <Calculator className="h-6 w-6 text-info mx-auto mb-2" />
                <span className="text-xs font-semibold text-foreground">Calculator</span>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="bento-card !p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Notifications</h3>
                <div className="p-1.5 rounded-lg bg-muted">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                {notifications.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <n.icon className={`h-4 w-4 mt-0.5 shrink-0 ${n.urgent ? "text-accent" : "text-muted-foreground"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{n.text}</p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" /> {n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
              className="bento-card !p-5"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Your Profile</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium text-foreground">{city}</span></div>
                {profile.familyStatus && <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-medium text-foreground">{profile.familyStatus}</span></div>}
                {profile.profession && <div className="flex justify-between"><span className="text-muted-foreground">Profession</span><span className="font-medium text-foreground">{profile.profession}</span></div>}
                {profile.hasChildren && <div className="flex justify-between"><span className="text-muted-foreground">Children</span><span className="font-medium text-foreground">{profile.childrenCount}</span></div>}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate("/profile")}>View Full Profile</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
