import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useChecklistStore } from "@/lib/checklist-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ChevronRight,
  Sparkles,
} from "lucide-react";

// ── Animated Counter ──
function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) animate(motionVal, value, { duration: 1, ease: "easeOut" });
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => { if (ref.current) ref.current.textContent = String(v); });
    return unsub;
  }, [rounded]);

  return <span ref={ref} className={className}>0</span>;
}

// ── Radial Progress ──
function RadialProgress({ value, size = 130, strokeWidth = 8, children }: {
  value: number; size?: number; strokeWidth?: number; children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
        <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--primary))" strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

// ── All milestones for badge system ──
const allMilestones = [
  { catId: "education", at: 25, label: "Explorer", emoji: "🔍" }, { catId: "education", at: 50, label: "Enrolled", emoji: "📚" },
  { catId: "education", at: 75, label: "Settled", emoji: "🎓" }, { catId: "education", at: 100, label: "Master", emoji: "🏆" },
  { catId: "family", at: 25, label: "Started", emoji: "👶" }, { catId: "family", at: 50, label: "Connected", emoji: "👨‍👩‍👧" },
  { catId: "family", at: 75, label: "Supported", emoji: "🤝" }, { catId: "family", at: 100, label: "Thriving", emoji: "💛" },
  { catId: "housing", at: 25, label: "Searching", emoji: "🏠" }, { catId: "housing", at: 50, label: "Found It", emoji: "🔑" },
  { catId: "housing", at: 75, label: "Moved In", emoji: "📦" }, { catId: "housing", at: 100, label: "Home Sweet Home", emoji: "🏡" },
  { catId: "insurance", at: 25, label: "Aware", emoji: "📋" }, { catId: "insurance", at: 50, label: "Comparing", emoji: "⚖️" },
  { catId: "insurance", at: 75, label: "Insured", emoji: "🛡️" }, { catId: "insurance", at: 100, label: "Fully Covered", emoji: "✅" },
  { catId: "sports", at: 25, label: "Active", emoji: "🏃" }, { catId: "sports", at: 50, label: "Regular", emoji: "💪" },
  { catId: "sports", at: 75, label: "Clubbed", emoji: "⚽" }, { catId: "sports", at: 100, label: "Champion", emoji: "🥇" },
  { catId: "finance", at: 25, label: "Budgeting", emoji: "📊" }, { catId: "finance", at: 50, label: "Saving", emoji: "💰" },
  { catId: "finance", at: 75, label: "Investing", emoji: "📈" }, { catId: "finance", at: 100, label: "Secure", emoji: "🏦" },
  { catId: "banking", at: 25, label: "Opened", emoji: "🏧" }, { catId: "banking", at: 50, label: "Set Up", emoji: "💳" },
  { catId: "banking", at: 75, label: "Optimized", emoji: "📱" }, { catId: "banking", at: 100, label: "Pro", emoji: "⭐" },
  { catId: "pension", at: 25, label: "Pillar 1", emoji: "🧱" }, { catId: "pension", at: 50, label: "Pillar 2", emoji: "🏗️" },
  { catId: "pension", at: 75, label: "Pillar 3a", emoji: "🏛️" }, { catId: "pension", at: 100, label: "Future-Proof", emoji: "🌟" },
  { catId: "friends", at: 25, label: "Exploring", emoji: "👋" }, { catId: "friends", at: 50, label: "Socializing", emoji: "🎉" },
  { catId: "friends", at: 75, label: "Connected", emoji: "🤗" }, { catId: "friends", at: 100, label: "Local", emoji: "❤️" },
  { catId: "events", at: 25, label: "Curious", emoji: "🎭" }, { catId: "events", at: 50, label: "Attending", emoji: "🎶" },
  { catId: "events", at: 75, label: "Regular", emoji: "🎪" }, { catId: "events", at: 100, label: "Culture Buff", emoji: "🌍" },
  { catId: "public-services", at: 25, label: "Registered", emoji: "📝" }, { catId: "public-services", at: 50, label: "Documented", emoji: "📄" },
  { catId: "public-services", at: 75, label: "Permitted", emoji: "✔️" }, { catId: "public-services", at: 100, label: "Sorted", emoji: "🎯" },
];

function getLevelInfo(overallProgress: number) {
  if (overallProgress >= 75) return { level: 4, title: "Zurich Local", icon: Trophy, color: "text-warning" };
  if (overallProgress >= 50) return { level: 3, title: "Settled In", icon: Medal, color: "text-primary" };
  if (overallProgress >= 25) return { level: 2, title: "Getting Started", icon: Flame, color: "text-accent" };
  return { level: 1, title: "New Arrival", icon: Zap, color: "text-info" };
}

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
  const allCatIds = [...new Set(allMilestones.map(m => m.catId))];
  const totalCompleted = allCatIds.reduce((a, id) => a + checklistStore.getCategoryStats(id).completed, 0);
  const completedCategories = allCatIds.filter(id => checklistStore.getCategoryProgress(id) === 100).length;
  const levelInfo = getLevelInfo(overallProgress);
  const LevelIcon = levelInfo.icon;

  // Split badges: unlocked vs next-to-unlock (max 3)
  const unlocked = allMilestones.filter(m => checklistStore.getCategoryProgress(m.catId) >= m.at);
  const locked = allMilestones.filter(m => checklistStore.getCategoryProgress(m.catId) < m.at);
  // "Next to unlock" = lowest `at` per category that isn't yet unlocked
  const nextToUnlock: typeof allMilestones = [];
  const seen = new Set<string>();
  for (const m of locked) {
    if (!seen.has(m.catId) && nextToUnlock.length < 3) {
      nextToUnlock.push(m);
      seen.add(m.catId);
    }
  }

  const interestLabels: Record<string, string> = {
    sports: "Sports & Fitness", arts: "Arts & Culture", music: "Music", reading: "Reading",
    outdoors: "Outdoors", food: "Food & Dining", pets: "Pets", education: "Education",
  };
  const priorityLabels: Record<string, string> = {
    education: "Education", family: "Family Services", housing: "Housing", insurance: "Insurance & Health",
    sports: "Sports & Leisure", finance: "Financial Planning", safety: "Safety & Security", career: "Career",
  };

  const userName = profile.familyMembers.find(m => m.type === 'self')?.name || profile.city || "User";
  const initials = userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || "NB";

  const hasPersonalDetails = profile.city || profile.familyStatus || profile.age || profile.profession;
  const hasInterests = profile.interests.length > 0;
  const hasPriorities = profile.priorities.length > 0;

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

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ─── LEFT SIDEBAR ─── */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            className="lg:w-72 lg:shrink-0">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Avatar Card */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] text-center">
                <div className="flex justify-center mb-3">
                  <RadialProgress value={overallProgress}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[var(--shadow-glow)]">
                      <span className="text-2xl font-bold text-primary-foreground">{initials}</span>
                    </div>
                  </RadialProgress>
                </div>
                <h2 className="text-lg font-display font-bold text-foreground">{userName}</h2>
                {profile.city && (
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {profile.city}
                  </p>
                )}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10">
                  <LevelIcon className={`h-3.5 w-3.5 ${levelInfo.color}`} />
                  <span className="text-xs font-semibold text-foreground">Lv.{levelInfo.level}</span>
                  <span className="text-[10px] text-primary font-medium">{levelInfo.title}</span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-bold text-foreground"><AnimatedCounter value={overallProgress} />%</span>
                  <p className="text-[10px] text-muted-foreground">Overall Progress</p>
                </div>
              </div>

              {/* Compact Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Done", value: totalCompleted, icon: Star, color: "text-warning", bg: "bg-warning/10" },
                  { label: "Active", value: allCatIds.filter(id => { const p = checklistStore.getCategoryProgress(id); return p > 0 && p < 100; }).length, icon: Flame, color: "text-accent", bg: "bg-accent/10" },
                  { label: "Mastered", value: completedCategories, icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
                ].map((stat) => (
                  <div key={stat.label} className="p-2.5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] text-center">
                    <stat.icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                    <div className="text-lg font-bold text-foreground"><AnimatedCounter value={stat.value} /></div>
                    <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-1.5">
                <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1">Quick Actions</h3>
                {quickActions.map((action) => (
                  <button key={action.path} onClick={() => navigate(action.path)}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition-all group text-left">
                    <div className={`p-1.5 rounded-lg ${action.bg}`}><action.icon className={`h-3.5 w-3.5 ${action.color}`} /></div>
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Plan */}
              <div className="p-3.5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-warning/10"><Crown className="h-4 w-4 text-warning" /></div>
                  <div className="flex-1"><h3 className="text-sm font-semibold text-foreground">Free Plan</h3></div>
                </div>
                <Button variant="hero" size="sm" className="w-full mt-2.5" onClick={() => navigate("/pricing")}>Upgrade</Button>
              </div>
            </div>
          </motion.aside>

          {/* ─── RIGHT CONTENT ─── */}
          <div className="flex-1 min-w-0 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-display font-bold text-foreground mb-1">Your Profile</h1>
              <p className="text-sm text-muted-foreground">Your identity, achievements, and preferences — all in one place.</p>
            </motion.div>

            {/* ── Badges: Only unlocked + next to unlock ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Medal className="h-5 w-5 text-warning" /> Achievements
                <span className="text-xs text-muted-foreground font-normal ml-auto">{unlocked.length}/{allMilestones.length} unlocked</span>
              </h2>

              {unlocked.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {unlocked.map((m) => (
                    <motion.div key={`${m.catId}-${m.at}`} whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-base">{m.emoji}</span>
                      <span className="text-xs font-medium text-foreground">{m.label}</span>
                      <Check className="h-3 w-3 text-primary" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 mb-4">
                  <p className="text-sm text-muted-foreground">No badges unlocked yet.</p>
                  <p className="text-xs text-muted-foreground mt-1">Complete tasks in your categories to earn your first badge!</p>
                </div>
              )}

              {nextToUnlock.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Next to unlock
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {nextToUnlock.map((m) => (
                      <div key={`${m.catId}-${m.at}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border opacity-70">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{m.emoji} {m.label} — {m.at}% in {m.catId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* ── Personal Details (hidden if empty, with CTA) ── */}
            {hasPersonalDetails ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] space-y-4">
                <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Personal Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {profile.city && (
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" />City</label>
                      <Input value={profile.city} onChange={(e) => updateProfile({ city: e.target.value })} className="h-10" />
                    </div>
                  )}
                  {profile.familyStatus && (
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><Heart className="h-3 w-3" />Family Status</label>
                      <Input value={profile.familyStatus} onChange={(e) => updateProfile({ familyStatus: e.target.value })} className="h-10" />
                    </div>
                  )}
                  {profile.age && (
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" />Age</label>
                      <Input value={profile.age} onChange={(e) => updateProfile({ age: e.target.value })} className="h-10" />
                    </div>
                  )}
                  {profile.profession && (
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><Briefcase className="h-3 w-3" />Profession</label>
                      <Input value={profile.profession} onChange={(e) => updateProfile({ profession: e.target.value })} className="h-10" />
                    </div>
                  )}
                </div>
                {profile.hasChildren && (
                  <div className="flex items-center gap-2 text-sm">
                    <Baby className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">Children: <strong>{profile.childrenCount}</strong></span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="p-5 rounded-xl bg-card border border-dashed border-border shadow-[var(--shadow-card)] text-center">
                <User className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">No personal details yet</p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">Complete onboarding to personalize your profile.</p>
                <Button variant="outline" size="sm" onClick={() => navigate("/onboarding")}>Complete Onboarding</Button>
              </motion.div>
            )}

            {/* ── Interests & Priorities (side by side, hidden if both empty) ── */}
            {(hasInterests || hasPriorities) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {hasInterests && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                    <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2 mb-2.5">
                      <Palette className="h-4 w-4 text-primary" /> Interests
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.interests.map((i) => (
                        <span key={i} className="px-2 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">{interestLabels[i] || i}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
                {hasPriorities && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                    className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                    <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2 mb-2.5">
                      <Target className="h-4 w-4 text-accent" /> Priorities
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.priorities.map((p) => (
                        <span key={p} className="px-2 py-1 rounded-lg text-xs font-medium bg-accent/10 text-accent">{priorityLabels[p] || p}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

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
