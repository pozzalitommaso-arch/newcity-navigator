import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useChecklistStore } from "@/lib/checklist-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef } from "react";
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
  MessageCircle,
  Clock,
  FolderHeart,
  Lock,
  Check,
} from "lucide-react";

// ── Animated Counter ──
function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(motionVal, value, { duration: 1, ease: "easeOut" });
    }
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v);
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={ref} className={className}>0</span>;
}

// ── Radial Progress ──
function RadialProgress({ value, size = 140, strokeWidth = 10, children }: {
  value: number; size?: number; strokeWidth?: number; children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="hsl(var(--primary))" strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ── Data ──
interface CategoryProgress {
  id: string;
  icon: React.ElementType;
  label: string;
  gradient: string;
  milestones: { at: number; label: string; emoji: string }[];
}

const categories: CategoryProgress[] = [
  { id: "education", icon: GraduationCap, label: "Education", gradient: "from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10",
    milestones: [{ at: 25, label: "Explorer", emoji: "🔍" }, { at: 50, label: "Enrolled", emoji: "📚" }, { at: 75, label: "Settled", emoji: "🎓" }, { at: 100, label: "Master", emoji: "🏆" }] },
  { id: "family", icon: Heart, label: "Family", gradient: "from-rose-500/20 to-pink-500/20 dark:from-rose-500/10 dark:to-pink-500/10",
    milestones: [{ at: 25, label: "Started", emoji: "👶" }, { at: 50, label: "Connected", emoji: "👨‍👩‍👧" }, { at: 75, label: "Supported", emoji: "🤝" }, { at: 100, label: "Thriving", emoji: "💛" }] },
  { id: "housing", icon: Home, label: "Housing", gradient: "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10",
    milestones: [{ at: 25, label: "Searching", emoji: "🏠" }, { at: 50, label: "Found It", emoji: "🔑" }, { at: 75, label: "Moved In", emoji: "📦" }, { at: 100, label: "Home Sweet Home", emoji: "🏡" }] },
  { id: "insurance", icon: Shield, label: "Insurance & Health", gradient: "from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10",
    milestones: [{ at: 25, label: "Aware", emoji: "📋" }, { at: 50, label: "Comparing", emoji: "⚖️" }, { at: 75, label: "Insured", emoji: "🛡️" }, { at: 100, label: "Fully Covered", emoji: "✅" }] },
  { id: "sports", icon: Dumbbell, label: "Sports & Leisure", gradient: "from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10",
    milestones: [{ at: 25, label: "Active", emoji: "🏃" }, { at: 50, label: "Regular", emoji: "💪" }, { at: 75, label: "Clubbed", emoji: "⚽" }, { at: 100, label: "Champion", emoji: "🥇" }] },
  { id: "finance", icon: Landmark, label: "Financial Planning", gradient: "from-violet-500/20 to-purple-500/20 dark:from-violet-500/10 dark:to-purple-500/10",
    milestones: [{ at: 25, label: "Budgeting", emoji: "📊" }, { at: 50, label: "Saving", emoji: "💰" }, { at: 75, label: "Investing", emoji: "📈" }, { at: 100, label: "Secure", emoji: "🏦" }] },
  { id: "banking", icon: Building2, label: "Banking", gradient: "from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/10 dark:to-blue-500/10",
    milestones: [{ at: 25, label: "Opened", emoji: "🏧" }, { at: 50, label: "Set Up", emoji: "💳" }, { at: 75, label: "Optimized", emoji: "📱" }, { at: 100, label: "Pro", emoji: "⭐" }] },
  { id: "pension", icon: PiggyBank, label: "Pension", gradient: "from-lime-500/20 to-green-500/20 dark:from-lime-500/10 dark:to-green-500/10",
    milestones: [{ at: 25, label: "Pillar 1", emoji: "🧱" }, { at: 50, label: "Pillar 2", emoji: "🏗️" }, { at: 75, label: "Pillar 3a", emoji: "🏛️" }, { at: 100, label: "Future-Proof", emoji: "🌟" }] },
  { id: "friends", icon: Users, label: "Friends & Community", gradient: "from-pink-500/20 to-rose-500/20 dark:from-pink-500/10 dark:to-rose-500/10",
    milestones: [{ at: 25, label: "Exploring", emoji: "👋" }, { at: 50, label: "Socializing", emoji: "🎉" }, { at: 75, label: "Connected", emoji: "🤗" }, { at: 100, label: "Local", emoji: "❤️" }] },
  { id: "events", icon: CalendarDays, label: "Events & Culture", gradient: "from-amber-500/20 to-yellow-500/20 dark:from-amber-500/10 dark:to-yellow-500/10",
    milestones: [{ at: 25, label: "Curious", emoji: "🎭" }, { at: 50, label: "Attending", emoji: "🎶" }, { at: 75, label: "Regular", emoji: "🎪" }, { at: 100, label: "Culture Buff", emoji: "🌍" }] },
  { id: "public-services", icon: FileText, label: "Public Services", gradient: "from-slate-500/20 to-gray-500/20 dark:from-slate-500/10 dark:to-gray-500/10",
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

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } } };

// ── Quick Actions ──
const quickActions = [
  { label: "My Info Hub", icon: FolderHeart, path: "/my-info", color: "text-primary", bg: "bg-primary/10" },
  { label: "Timeline", icon: Clock, path: "/timeline", color: "text-info", bg: "bg-info/10" },
  { label: "AI Chat", icon: MessageCircle, path: "/chat", color: "text-accent", bg: "bg-accent/10" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile, reset } = useOnboardingStore();
  const checklistStore = useChecklistStore();

  const overallProgress = checklistStore.getOverallProgress();
  const allCatIds = categories.map(c => c.id);
  const totalCompleted = allCatIds.reduce((a, id) => a + checklistStore.getCategoryStats(id).completed, 0);
  const totalTasks = allCatIds.reduce((a, id) => a + checklistStore.getCategoryStats(id).total, 0);
  const completedCategories = allCatIds.filter(id => checklistStore.getCategoryProgress(id) === 100).length;
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

  // Get user initials
  const userName = profile.familyMembers.find(m => m.type === 'self')?.name || profile.city || "User";
  const initials = userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || "NB";

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}><ArrowLeft className="h-5 w-5" /></Button>
            <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          </div>
        </div>
      </nav>

      {/* Two-column layout */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ─── LEFT SIDEBAR (sticky on desktop) ─── */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            className="lg:w-80 lg:shrink-0"
          >
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Avatar + Level Card */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] text-center">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <RadialProgress value={overallProgress} size={130} strokeWidth={8}>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[var(--shadow-glow)]">
                      <span className="text-3xl font-bold text-primary-foreground">{initials}</span>
                    </div>
                  </RadialProgress>
                </div>

                <h2 className="text-xl font-display font-bold text-foreground">{userName}</h2>
                {profile.city && (
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {profile.city}
                  </p>
                )}

                {/* Level badge */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
                  <LevelIcon className={`h-4 w-4 ${levelInfo.color}`} />
                  <span className="text-sm font-semibold text-foreground">Level {levelInfo.level}</span>
                  <span className="text-xs text-primary font-medium">{levelInfo.title}</span>
                </div>

                <div className="mt-4 text-3xl font-bold text-foreground">
                  <AnimatedCounter value={overallProgress} />%
                </div>
                <p className="text-xs text-muted-foreground mt-1">Overall Progress</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Done", value: totalCompleted, icon: Star, color: "text-warning", bg: "bg-warning/10" },
                  { label: "Active", value: allCatIds.filter(id => { const p = checklistStore.getCategoryProgress(id); return p > 0 && p < 100; }).length, icon: Flame, color: "text-accent", bg: "bg-accent/10" },
                  { label: "Mastered", value: completedCategories, icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-3 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] text-center"
                  >
                    <div className={`w-8 h-8 mx-auto rounded-lg ${stat.bg} flex items-center justify-center mb-1.5`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Quick Actions</h3>
                {quickActions.map((action) => (
                  <button
                    key={action.path}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all group text-left"
                  >
                    <div className={`p-2 rounded-lg ${action.bg} group-hover:scale-110 transition-transform`}>
                      <action.icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Plan */}
              <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10"><Crown className="h-5 w-5 text-warning" /></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">Free Plan</h3>
                    <p className="text-xs text-muted-foreground">3 categories, limited AI</p>
                  </div>
                </div>
                <Button variant="hero" size="sm" className="w-full mt-3" onClick={() => navigate("/pricing")}>Upgrade</Button>
              </div>
            </div>
          </motion.aside>

          {/* ─── RIGHT CONTENT ─── */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-display font-bold text-foreground mb-1">Your Profile</h1>
              <p className="text-muted-foreground">Track your settling-in journey, unlock badges, and see your progress.</p>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Medal className="h-5 w-5 text-warning" /> Achievement Badges
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {categories.map((cat) => {
                  const catProgress = checklistStore.getCategoryProgress(cat.id);
                  return cat.milestones.map((m) => {
                    const unlocked = catProgress >= m.at;
                    return (
                      <motion.div
                        key={`${cat.id}-${m.at}`}
                        whileHover={unlocked ? { scale: 1.15, rotate: 5 } : {}}
                        className={`relative flex flex-col items-center p-2 rounded-xl border transition-all ${
                          unlocked
                            ? "bg-card border-primary/30 shadow-[var(--shadow-card)]"
                            : "bg-muted/30 border-border opacity-40"
                        }`}
                      >
                        <span className="text-2xl">{m.emoji}</span>
                        <span className="text-[9px] text-center text-muted-foreground mt-1 leading-tight">{m.label}</span>
                        {unlocked && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-2.5 w-2.5 text-primary-foreground" />
                          </div>
                        )}
                        {!unlocked && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-muted border border-border flex items-center justify-center">
                            <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                          </div>
                        )}
                      </motion.div>
                    );
                  });
                })}
              </div>
            </motion.div>

            {/* Category Progress - Gradient Tiles */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" /> Category Progress
              </h2>
              <motion.div className="grid sm:grid-cols-2 gap-4" variants={container} initial="hidden" animate="show">
                {categories.map((cat) => {
                  const catProgress = checklistStore.getCategoryProgress(cat.id);
                  const catStats = checklistStore.getCategoryStats(cat.id);
                  const current = getCurrentMilestone(catProgress, cat.milestones);
                  const next = getNextMilestone(catProgress, cat.milestones);
                  return (
                    <motion.div
                      key={cat.id}
                      variants={item}
                      onClick={() => navigate(`/${cat.id}`)}
                      whileHover={{ y: -4 }}
                      className={`p-4 rounded-xl border border-border bg-gradient-to-br ${cat.gradient} backdrop-blur-sm shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow cursor-pointer group`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-card/80 shadow-sm">
                          <cat.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm">{cat.label}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{catStats.completed}/{catStats.total} tasks</span>
                            {catProgress > 0 && (
                              <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-card/80 text-foreground">
                                {current.emoji} {current.label}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-lg font-bold text-foreground">{catProgress}%</span>
                      </div>
                      <Progress value={catProgress} className="h-2 bg-card/50" />
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

            {/* Personal Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] space-y-5">
              <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Personal Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-muted-foreground" />City</label>
                  <Input value={profile.city} onChange={(e) => updateProfile({ city: e.target.value })} className="h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-muted-foreground" />Family Status</label>
                  <Input value={profile.familyStatus} onChange={(e) => updateProfile({ familyStatus: e.target.value })} className="h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-muted-foreground" />Age</label>
                  <Input value={profile.age} onChange={(e) => updateProfile({ age: e.target.value })} className="h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-muted-foreground" />Profession</label>
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

            {/* Interests & Priorities side by side */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 mb-3"><Palette className="h-4 w-4 text-primary" /> Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.length > 0 ? profile.interests.map((i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">{interestLabels[i] || i}</span>
                  )) : <span className="text-sm text-muted-foreground">No interests selected</span>}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 mb-3"><Target className="h-4 w-4 text-accent" /> Priorities</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.priorities.length > 0 ? profile.priorities.map((p) => (
                    <span key={p} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-accent/10 text-accent">{priorityLabels[p] || p}</span>
                  )) : <span className="text-sm text-muted-foreground">No priorities selected</span>}
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="flex gap-3 pb-8">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/onboarding")}>Re-do Onboarding</Button>
              <Button variant="destructive" className="flex-1" onClick={() => { reset(); navigate("/"); }}>
                <LogOut className="h-4 w-4 mr-1.5" /> Reset & Exit
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
