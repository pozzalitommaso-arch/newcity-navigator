import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useChecklistStore } from "@/lib/checklist-store";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, TrendingUp, CheckCircle2, Calendar, Target, Award,
  Share2, Mail, ArrowRight, Flame, Star,
} from "lucide-react";

const categoryLabels: Record<string, string> = {
  education: "Education", family: "Family Services", housing: "Housing",
  insurance: "Insurance & Health", sports: "Sports & Leisure", finance: "Financial Planning",
  banking: "Banking", pension: "Pension", friends: "Friends & Community",
  events: "Events & Culture", "public-services": "Public Services",
};

export default function ProgressReportPage() {
  const navigate = useNavigate();
  const { profile } = useOnboardingStore();
  const { getOverallProgress, getCategoryProgress, getCategoryStats, checklists } = useChecklistStore();

  const overall = getOverallProgress();
  const allCategories = Object.keys(checklists);
  const completed = allCategories.filter((c) => getCategoryProgress(c) === 100);
  const inProgress = allCategories.filter((c) => { const p = getCategoryProgress(c); return p > 0 && p < 100; });
  const notStarted = allCategories.filter((c) => getCategoryProgress(c) === 0);

  const totalTasks = allCategories.reduce((sum, c) => sum + getCategoryStats(c).total, 0);
  const doneTasks = allCategories.reduce((sum, c) => sum + getCategoryStats(c).completed, 0);

  // Upcoming deadlines (simulated based on arrival)
  const arrivalDate = profile.arrivalDate ? new Date(profile.arrivalDate) : new Date();
  const daysSinceArrival = Math.floor((Date.now() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24));

  const upcomingTasks = [
    { task: "Register at Einwohnerkontrolle", daysLeft: Math.max(0, 14 - daysSinceArrival), category: "public-services" },
    { task: "Register for health insurance", daysLeft: Math.max(0, 90 - daysSinceArrival), category: "insurance" },
    { task: "Open Pillar 3a account", daysLeft: Math.max(0, 365 - daysSinceArrival), category: "pension" },
  ].filter((t) => t.daysLeft > 0).slice(0, 3);

  // Streak (simulated)
  const streak = doneTasks > 0 ? Math.min(doneTasks, 7) : 0;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}><ArrowLeft className="h-5 w-5" /></Button>
            <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1.5" /> Share
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Your Progress Report</h1>
          <p className="text-muted-foreground text-lg">Here's how your settling-in journey is going.</p>
        </motion.div>

        {/* Hero stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
            <div>
              <div className="text-3xl font-bold gradient-text">{overall}%</div>
              <div className="text-xs text-muted-foreground">Overall</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{doneTasks}</div>
              <div className="text-xs text-muted-foreground">Tasks Done</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{completed.length}</div>
              <div className="text-xs text-muted-foreground">Categories Complete</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning flex items-center justify-center gap-1">
                <Flame className="h-6 w-6" /> {streak}
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
          <Progress value={overall} className="h-3 bg-muted" />
        </motion.div>

        {/* Upcoming deadlines */}
        {upcomingTasks.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" /> Upcoming Deadlines
            </h2>
            <div className="space-y-2">
              {upcomingTasks.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                  <div className={`p-2 rounded-lg ${t.daysLeft <= 7 ? "bg-accent/10" : "bg-muted"}`}>
                    <Target className={`h-4 w-4 ${t.daysLeft <= 7 ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{t.task}</p>
                    <p className="text-xs text-muted-foreground">{categoryLabels[t.category]}</p>
                  </div>
                  <span className={`text-sm font-bold ${t.daysLeft <= 7 ? "text-accent" : "text-muted-foreground"}`}>
                    {t.daysLeft}d left
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Category Breakdown
          </h2>
          <div className="space-y-2">
            {allCategories.sort((a, b) => getCategoryProgress(b) - getCategoryProgress(a)).map((cat) => {
              const p = getCategoryProgress(cat);
              const stats = getCategoryStats(cat);
              return (
                <div key={cat} onClick={() => navigate(`/${cat}`)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/30 transition-colors">
                  {p === 100 ? (
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{categoryLabels[cat] || cat}</span>
                      <span className="text-xs text-muted-foreground">{stats.completed}/{stats.total}</span>
                    </div>
                    <Progress value={p} className="h-1.5 bg-muted" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Email digest CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
          <div className="relative z-10">
            <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5" /> Get Weekly Digest
            </h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Receive a weekly summary of your progress, upcoming deadlines, and local events — straight to your inbox.
            </p>
            <Button variant="secondary" size="sm">
              Enable Weekly Email <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
