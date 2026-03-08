import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useChecklistStore } from "@/lib/checklist-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EssentialsCard from "@/components/EssentialsCard";
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
} from "lucide-react";
import type { QuickInfo } from "@/lib/onboarding-store";

const categoryData = [
  { id: "education", icon: GraduationCap, label: "Education", progress: 20, color: "text-info", bg: "bg-info/10", tasks: 3, desc: "Schools, courses, enrollment", nextStep: "Research international schools and start enrollment process" },
  { id: "family", icon: Heart, label: "Family Services", progress: 10, color: "text-accent", bg: "bg-accent/10", tasks: 4, desc: "Childcare, family support", nextStep: "Register for Kita (daycare) waiting list — spots fill fast" },
  { id: "housing", icon: Home, label: "Housing", progress: 35, color: "text-primary", bg: "bg-primary/10", tasks: 2, desc: "Neighborhood, utilities", nextStep: "Set up electricity & internet with local providers" },
  { id: "insurance", icon: Shield, label: "Insurance & Health", progress: 0, color: "text-success", bg: "bg-success/10", tasks: 5, desc: "Health, liability, home", nextStep: "Compare & register for mandatory health insurance (Grundversicherung)" },
  { id: "sports", icon: Dumbbell, label: "Sports & Leisure", progress: 15, color: "text-warning", bg: "bg-warning/10", tasks: 2, desc: "Clubs, gyms, activities", nextStep: "Browse local sports clubs and sign up for a trial class" },
  { id: "finance", icon: Landmark, label: "Financial Planning", progress: 5, color: "text-primary", bg: "bg-primary/10", tasks: 4, desc: "Retirement, taxes, banking", nextStep: "Set up a tax filing system and understand deductions" },
  { id: "banking", icon: Building2, label: "Banking", progress: 0, color: "text-info", bg: "bg-info/10", tasks: 3, desc: "Accounts, payments, transfers", nextStep: "Open a Swiss bank account and set up TWINT" },
  { id: "pension", icon: PiggyBank, label: "Pension & Retirement", progress: 0, color: "text-success", bg: "bg-success/10", tasks: 3, desc: "Pillars, 3a, planning", nextStep: "Open a Pillar 3a account before year-end for tax savings" },
  { id: "friends", icon: Users, label: "Friends & Community", progress: 5, color: "text-accent", bg: "bg-accent/10", tasks: 2, desc: "Meet people, networking", nextStep: "Join a local expat meetup or Verein (club)" },
  { id: "events", icon: CalendarDays, label: "Events & Culture", progress: 10, color: "text-warning", bg: "bg-warning/10", tasks: 2, desc: "Local events, festivals", nextStep: "Check upcoming local events and add them to your calendar" },
  { id: "public-services", icon: FileText, label: "Public Services", progress: 0, color: "text-info", bg: "bg-info/10", tasks: 5, desc: "Registration, permits, bureaucracy", nextStep: "Register at the Einwohnerkontrolle within 14 days of arrival" },
];

const recommendations = [
  { type: "school", title: "Top-rated International Schools", desc: "Based on your family profile, we found 3 highly-rated international schools within 5km.", icon: GraduationCap, color: "text-info", bg: "bg-info/10", urgent: false },
  { type: "insurance", title: "Health Insurance Setup Required", desc: "You need to register for health insurance within 3 months of arrival. We recommend comparing plans now.", icon: Shield, color: "text-accent", bg: "bg-accent/10", urgent: true },
  { type: "sports", title: "Sports Clubs Near You", desc: "5 sports clubs match your interests in running and swimming. Registration is open this month.", icon: Dumbbell, color: "text-warning", bg: "bg-warning/10", urgent: false },
];

const notifications = [
  { text: "School enrollment deadline in 2 weeks", icon: AlertCircle, time: "2h ago", urgent: true },
  { text: "New family-friendly events this weekend", icon: Heart, time: "5h ago", urgent: false },
  { text: "Your housing checklist is 35% complete", icon: CheckCircle2, time: "1d ago", urgent: false },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const quickInfoCards = [
  { key: "address" as const, label: "My Address", icon: Home, color: "text-primary", bg: "bg-primary/10", placeholder: "e.g., Bahnhofstr. 12, 8001 Zürich" },
  { key: "bank" as const, label: "Bank Account", icon: CreditCard, color: "text-info", bg: "bg-info/10", placeholder: "e.g., UBS, IBAN CH93..." },
  { key: "insurance" as const, label: "Health Insurance", icon: Shield, color: "text-success", bg: "bg-success/10", placeholder: "e.g., CSS, Policy #123..." },
  { key: "doctor" as const, label: "Doctor / GP", icon: Stethoscope, color: "text-accent", bg: "bg-accent/10", placeholder: "e.g., Dr. Müller, +41 44..." },
  { key: "emergencyContact" as const, label: "Emergency Contact", icon: Phone, color: "text-warning", bg: "bg-warning/10", placeholder: "e.g., Anna, +41 79..." },
  { key: "ahvNumber" as const, label: "AHV / Social Security", icon: FileText, color: "text-primary", bg: "bg-primary/10", placeholder: "e.g., 756.1234.5678.90" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, updateQuickInfo } = useOnboardingStore();
  const { getOverallProgress, getCategoryProgress } = useChecklistStore();
  const city = profile.city || "Your City";
  const overallProgress = getOverallProgress();
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/chat")} title="AI Assistant">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" title="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-accent rounded-full border-2 border-card" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} title="Profile">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <MapPin className="h-4 w-4" /> {city}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Welcome to your new life!</h1>
          <p className="text-muted-foreground text-lg">Here's your personalized settling-in dashboard. Let's make {city} feel like home.</p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          className="p-6 rounded-2xl bg-card shadow-[var(--shadow-card)] border border-border cursor-pointer hover:shadow-[var(--shadow-soft)] transition-shadow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => navigate("/profile")}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl font-semibold text-foreground">Settling-In Progress</h2>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <Progress value={overallProgress} className="h-3 bg-muted" />
          <p className="text-sm text-muted-foreground mt-2">Tap to see detailed category progress, milestones & what's missing →</p>
        </motion.div>

        {/* Quick Access Info Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" /> My Essentials
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickInfoCards.map((card) => {
              const value = profile.quickInfo[card.key];
              const isEditing = editingCard === card.key;
              return (
                <div key={card.key} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${card.bg}`}>
                        <card.icon className={`h-4 w-4 ${card.color}`} />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{card.label}</span>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => { setEditingCard(card.key); setEditValue(value); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
                      >
                        <Pencil className="h-3 w-3 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="flex gap-1.5">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder={card.placeholder}
                        className="h-8 text-sm"
                        autoFocus
                        maxLength={200}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") { updateQuickInfo({ [card.key]: editValue }); setEditingCard(null); }
                          if (e.key === "Escape") setEditingCard(null);
                        }}
                      />
                      <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => { updateQuickInfo({ [card.key]: editValue }); setEditingCard(null); }}>
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </Button>
                    </div>
                  ) : (
                    <p className={`text-sm truncate ${value ? "text-foreground font-medium" : "text-muted-foreground italic"}`}>
                      {value || "Not set yet — click to add"}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">AI Recommendations</h2>
              </div>
              <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
                {recommendations.map((rec, i) => (
                  <motion.div key={i} variants={item} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow cursor-pointer group">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl ${rec.bg} shrink-0`}><rec.icon className={`h-6 w-6 ${rec.color}`} /></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-foreground">{rec.title}</h3>
                          {rec.urgent && <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">Urgent</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{rec.desc}</p>
                        <button className="text-sm text-primary font-medium mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">View details <ArrowRight className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Life Categories</h2>
              <motion.div className="grid sm:grid-cols-2 gap-4" variants={container} initial="hidden" animate="show">
                {categoryData.map((cat) => {
                  const catProgress = getCategoryProgress(cat.id);
                  return (
                  <motion.div
                    key={cat.id}
                    variants={item}
                    onClick={() => navigate(`/${cat.id}`)}
                    className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${cat.bg}`}><cat.icon className={`h-5 w-5 ${cat.color}`} /></div>
                        <div>
                          <h3 className="font-semibold text-foreground">{cat.label}</h3>
                          <p className="text-xs text-muted-foreground">{cat.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={catProgress} className="h-2 flex-1 bg-muted" />
                      <span className="text-sm font-medium text-muted-foreground">{catProgress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{cat.tasks} tasks pending</p>
                  </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Chat CTA */}
            <div
              onClick={() => navigate("/chat")}
              className="p-5 rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-card)] cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="h-5 w-5" />
                <h3 className="font-display text-lg font-semibold">Ask AI Assistant</h3>
              </div>
              <p className="text-sm text-primary-foreground/80">Have a question about life in {city}? Ask our AI assistant anything.</p>
            </div>

            {/* Notifications */}
            <div className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground">Notifications</h3>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <n.icon className={`h-4 w-4 mt-0.5 shrink-0 ${n.urgent ? "text-accent" : "text-muted-foreground"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{n.text}</p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Clock className="h-3 w-3" /> {n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Profile */}
            <div className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Your Profile</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium text-foreground">{city}</span></div>
                {profile.familyStatus && <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-medium text-foreground">{profile.familyStatus}</span></div>}
                {profile.profession && <div className="flex justify-between"><span className="text-muted-foreground">Profession</span><span className="font-medium text-foreground">{profile.profession}</span></div>}
                {profile.hasChildren && <div className="flex justify-between"><span className="text-muted-foreground">Children</span><span className="font-medium text-foreground">{profile.childrenCount}</span></div>}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate("/profile")}>View Full Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
