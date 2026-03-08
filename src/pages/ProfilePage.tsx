import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  Heart,
  Baby,
  Calendar,
  Palette,
  Target,
  LogOut,
  Crown,
  GraduationCap,
  Home,
  Shield,
  Dumbbell,
  Landmark,
  Building2,
  PiggyBank,
  Users,
  CalendarDays,
  FileText,
  Trophy,
  Star,
  Flame,
  Zap,
  Medal,
} from "lucide-react";

interface CategoryProgress {
  id: string;
  icon: React.ElementType;
  label: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  color: string;
  bg: string;
  milestones: { at: number; label: string; emoji: string }[];
}

const categories: CategoryProgress[] = [
  { id: "education", icon: GraduationCap, label: "Education", progress: 20, totalTasks: 5, completedTasks: 1, color: "text-info", bg: "bg-info/10",
    milestones: [{ at: 25, label: "Explorer", emoji: "🔍" }, { at: 50, label: "Enrolled", emoji: "📚" }, { at: 75, label: "Settled", emoji: "🎓" }, { at: 100, label: "Master", emoji: "🏆" }] },
  { id: "family", icon: Heart, label: "Family", progress: 10, totalTasks: 6, completedTasks: 1, color: "text-accent", bg: "bg-accent/10",
    milestones: [{ at: 25, label: "Started", emoji: "👶" }, { at: 50, label: "Connected", emoji: "👨‍👩‍👧" }, { at: 75, label: "Supported", emoji: "🤝" }, { at: 100, label: "Thriving", emoji: "💛" }] },
  { id: "housing", icon: Home, label: "Housing", progress: 35, totalTasks: 4, completedTasks: 1, color: "text-primary", bg: "bg-primary/10",
    milestones: [{ at: 25, label: "Searching", emoji: "🏠" }, { at: 50, label: "Found It", emoji: "🔑" }, { at: 75, label: "Moved In", emoji: "📦" }, { at: 100, label: "Home Sweet Home", emoji: "🏡" }] },
  { id: "insurance", icon: Shield, label: "Insurance & Health", progress: 0, totalTasks: 5, completedTasks: 0, color: "text-success", bg: "bg-success/10",
    milestones: [{ at: 25, label: "Aware", emoji: "📋" }, { at: 50, label: "Comparing", emoji: "⚖️" }, { at: 75, label: "Insured", emoji: "🛡️" }, { at: 100, label: "Fully Covered", emoji: "✅" }] },
  { id: "sports", icon: Dumbbell, label: "Sports & Leisure", progress: 15, totalTasks: 4, completedTasks: 1, color: "text-warning", bg: "bg-warning/10",
    milestones: [{ at: 25, label: "Active", emoji: "🏃" }, { at: 50, label: "Regular", emoji: "💪" }, { at: 75, label: "Clubbed", emoji: "⚽" }, { at: 100, label: "Champion", emoji: "🥇" }] },
  { id: "finance", icon: Landmark, label: "Financial Planning", progress: 5, totalTasks: 6, completedTasks: 0, color: "text-primary", bg: "bg-primary/10",
    milestones: [{ at: 25, label: "Budgeting", emoji: "📊" }, { at: 50, label: "Saving", emoji: "💰" }, { at: 75, label: "Investing", emoji: "📈" }, { at: 100, label: "Secure", emoji: "🏦" }] },
  { id: "banking", icon: Building2, label: "Banking", progress: 0, totalTasks: 4, completedTasks: 0, color: "text-info", bg: "bg-info/10",
    milestones: [{ at: 25, label: "Opened", emoji: "🏧" }, { at: 50, label: "Set Up", emoji: "💳" }, { at: 75, label: "Optimized", emoji: "📱" }, { at: 100, label: "Pro", emoji: "⭐" }] },
  { id: "pension", icon: PiggyBank, label: "Pension", progress: 0, totalTasks: 4, completedTasks: 0, color: "text-success", bg: "bg-success/10",
    milestones: [{ at: 25, label: "Pillar 1", emoji: "🧱" }, { at: 50, label: "Pillar 2", emoji: "🏗️" }, { at: 75, label: "Pillar 3a", emoji: "🏛️" }, { at: 100, label: "Future-Proof", emoji: "🌟" }] },
  { id: "friends", icon: Users, label: "Friends & Community", progress: 5, totalTasks: 4, completedTasks: 0, color: "text-accent", bg: "bg-accent/10",
    milestones: [{ at: 25, label: "Exploring", emoji: "👋" }, { at: 50, label: "Socializing", emoji: "🎉" }, { at: 75, label: "Connected", emoji: "🤗" }, { at: 100, label: "Local", emoji: "❤️" }] },
  { id: "events", icon: CalendarDays, label: "Events & Culture", progress: 10, totalTasks: 4, completedTasks: 0, color: "text-warning", bg: "bg-warning/10",
    milestones: [{ at: 25, label: "Curious", emoji: "🎭" }, { at: 50, label: "Attending", emoji: "🎶" }, { at: 75, label: "Regular", emoji: "🎪" }, { at: 100, label: "Culture Buff", emoji: "🌍" }] },
  { id: "public-services", icon: FileText, label: "Public Services", progress: 0, totalTasks: 6, completedTasks: 0, color: "text-info", bg: "bg-info/10",
    milestones: [{ at: 25, label: "Registered", emoji: "📝" }, { at: 50, label: "Documented", emoji: "📄" }, { at: 75, label: "Permitted", emoji: "✔️" }, { at: 100, label: "Sorted", emoji: "🎯" }] },
];

function getCurrentMilestone(progress: number, milestones: { at: number; label: string; emoji: string }[]) {
  let current = milestones[0];
  for (const m of milestones) {
    if (progress >= m.at) current = m;
  }
  return current;
}

function getNextMilestone(progress: number, milestones: { at: number; label: string; emoji: string }[]) {
  for (const m of milestones) {
    if (progress < m.at) return m;
  }
  return null;
}

function getLevelInfo(overallProgress: number) {
  if (overallProgress >= 75) return { level: 4, title: "Zurich Local", icon: Trophy, color: "text-warning" };
  if (overallProgress >= 50) return { level: 3, title: "Settled In", icon: Medal, color: "text-primary" };
  if (overallProgress >= 25) return { level: 2, title: "Getting Started", icon: Flame, color: "text-accent" };
  return { level: 1, title: "New Arrival", icon: Zap, color: "text-info" };
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile, reset } = useOnboardingStore();

  const overallProgress = Math.round(categories.reduce((a, c) => a + c.progress, 0) / categories.length);
  const totalCompleted = categories.reduce((a, c) => a + c.completedTasks, 0);
  const totalTasks = categories.reduce((a, c) => a + c.totalTasks, 0);
  const completedCategories = categories.filter(c => c.progress === 100).length;
  const levelInfo = getLevelInfo(overallProgress);
  const LevelIcon = levelInfo.icon;

  const interestLabels: Record<string, string> = {
    sports: "Sports & Fitness", arts: "Arts & Culture", music: "Music", reading: "Reading",
    outdoors: "Outdoors", food: "Food & Dining", pets: "Pets", education: "Education",
  };

  const priorityLabels: Record<string, string> = {
    education: "Education", family: "Family Services", housing: "Housing", insurance: "Insurance & Health",
    sports: "Sports & Leisure", finance: "Financial Planning", safety: "Safety & Security", career: "Career",
  };

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

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Header & Level */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Track your settling-in journey and unlock milestones.</p>
        </motion.div>

        {/* Level Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <LevelIcon className={`h-8 w-8 ${levelInfo.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Level {levelInfo.level}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{levelInfo.title}</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">{overallProgress}% Complete</h2>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3 bg-muted mb-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{totalCompleted} of {totalTasks} tasks done</span>
            <span>{completedCategories} categories mastered</span>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="grid grid-cols-3 gap-4">
          {[
            { label: "Tasks Done", value: totalCompleted, icon: Star, color: "text-warning" },
            { label: "In Progress", value: categories.filter(c => c.progress > 0 && c.progress < 100).length, icon: Flame, color: "text-accent" },
            { label: "Not Started", value: categories.filter(c => c.progress === 0).length, icon: Target, color: "text-muted-foreground" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] text-center">
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Category Progress Grid */}
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" /> Category Progress
          </h2>
          <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
            {categories.map((cat) => {
              const current = getCurrentMilestone(cat.progress, cat.milestones);
              const next = getNextMilestone(cat.progress, cat.milestones);
              return (
                <motion.div
                  key={cat.id}
                  variants={item}
                  onClick={() => navigate(`/${cat.id}`)}
                  className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${cat.bg}`}>
                      <cat.icon className={`h-5 w-5 ${cat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground text-sm">{cat.label}</h3>
                        <span className="text-sm font-bold text-foreground">{cat.progress}%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{cat.completedTasks}/{cat.totalTasks} tasks</span>
                        {cat.progress > 0 && (
                          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                            {current.emoji} {current.label}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={cat.progress} className="h-2 bg-muted" />
                    {/* Milestone markers */}
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                      {cat.milestones.map((m) => (
                        <div
                          key={m.at}
                          className="absolute top-1/2 -translate-y-1/2"
                          style={{ left: `${m.at}%`, transform: `translateX(-50%) translateY(-50%)` }}
                        >
                          <div className={`w-2.5 h-2.5 rounded-full border-2 ${
                            cat.progress >= m.at
                              ? "bg-primary border-primary"
                              : "bg-card border-border"
                          }`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {next && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Next: {next.emoji} <span className="font-medium">{next.label}</span> at {next.at}%
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-warning/10"><Crown className="h-5 w-5 text-warning" /></div>
              <div>
                <h3 className="font-semibold text-foreground">Free Plan</h3>
                <p className="text-xs text-muted-foreground">3 categories, limited AI queries</p>
              </div>
            </div>
            <Button variant="hero" size="sm" onClick={() => navigate("/pricing")}>Upgrade</Button>
          </div>
        </motion.div>

        {/* Personal Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] space-y-5">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Personal Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-muted-foreground" />City</label>
              <Input value={profile.city} onChange={(e) => updateProfile({ city: e.target.value })} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-muted-foreground" />Family Status</label>
              <Input value={profile.familyStatus} onChange={(e) => updateProfile({ familyStatus: e.target.value })} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-muted-foreground" />Age</label>
              <Input value={profile.age} onChange={(e) => updateProfile({ age: e.target.value })} className="h-11" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-muted-foreground" />Profession</label>
              <Input value={profile.profession} onChange={(e) => updateProfile({ profession: e.target.value })} className="h-11" />
            </div>
          </div>
          {profile.hasChildren && (
            <div className="flex items-center gap-3">
              <Baby className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Children: <strong>{profile.childrenCount}</strong></span>
            </div>
          )}
        </motion.div>

        {/* Interests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-4"><Palette className="h-5 w-5 text-primary" /> Interests</h2>
          <div className="flex flex-wrap gap-2">
            {profile.interests.length > 0 ? profile.interests.map((i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary">{interestLabels[i] || i}</span>
            )) : <span className="text-sm text-muted-foreground">No interests selected</span>}
          </div>
        </motion.div>

        {/* Priorities */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-4"><Target className="h-5 w-5 text-accent" /> Priorities</h2>
          <div className="flex flex-wrap gap-2">
            {profile.priorities.length > 0 ? profile.priorities.map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-accent/10 text-accent">{priorityLabels[p] || p}</span>
            )) : <span className="text-sm text-muted-foreground">No priorities selected</span>}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="flex gap-3 pb-8">
          <Button variant="outline" className="flex-1" onClick={() => navigate("/onboarding")}>Re-do Onboarding</Button>
          <Button variant="destructive" className="flex-1" onClick={() => { reset(); navigate("/"); }}>
            <LogOut className="h-4 w-4 mr-1.5" /> Reset & Exit
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
