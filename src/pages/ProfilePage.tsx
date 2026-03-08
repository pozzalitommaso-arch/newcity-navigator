import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile, reset } = useOnboardingStore();

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

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences.</p>
        </motion.div>

        {/* Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2 mb-4"><Target className="h-5 w-5 text-accent" /> Priorities</h2>
          <div className="flex flex-wrap gap-2">
            {profile.priorities.length > 0 ? profile.priorities.map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-accent/10 text-accent">{priorityLabels[p] || p}</span>
            )) : <span className="text-sm text-muted-foreground">No priorities selected</span>}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex gap-3 pb-8">
          <Button variant="outline" className="flex-1" onClick={() => navigate("/onboarding")}>Re-do Onboarding</Button>
          <Button variant="destructive" className="flex-1" onClick={() => { reset(); navigate("/"); }}>
            <LogOut className="h-4 w-4 mr-1.5" /> Reset & Exit
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
