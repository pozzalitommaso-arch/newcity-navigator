import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { cityDatabase } from "@/lib/city-database";
import {
  MapPin,
  User,
  Heart,
  Target,
  ArrowRight,
  ArrowLeft,
  Check,
  Baby,
  Briefcase,
  GraduationCap,
  Home,
  Shield,
  Dumbbell,
  Landmark,
  Palette,
  Music,
  BookOpen,
  Coffee,
  TreePine,
  Dog,
  Globe,
  MessageCircle,
} from "lucide-react";

const genderOptions = ["Man", "Woman", "Non-binary", "Genderqueer", "Prefer not to say", "Other"];
const orientationOptions = ["Straight", "Gay", "Lesbian", "Bisexual", "Pansexual", "Asexual", "Queer", "Prefer not to say", "Other"];
const languageOptions = ["English", "German", "French", "Italian", "Spanish", "Portuguese", "Mandarin", "Japanese", "Korean", "Arabic", "Hindi", "Russian", "Dutch", "Swedish", "Turkish", "Polish"];
const moveReasonOptions = ["Work / Career", "Studies", "Family", "Love / Partner", "Adventure", "Retirement", "Other"];

const steps = [
  { icon: MapPin, label: "Your City" },
  { icon: User, label: "About You" },
  { icon: Heart, label: "Interests" },
  { icon: Target, label: "Priorities" },
];

const interestOptions = [
  { id: "sports", label: "Sports & Fitness", icon: Dumbbell },
  { id: "arts", label: "Arts & Culture", icon: Palette },
  { id: "music", label: "Music", icon: Music },
  { id: "reading", label: "Reading", icon: BookOpen },
  { id: "outdoors", label: "Outdoors", icon: TreePine },
  { id: "food", label: "Food & Dining", icon: Coffee },
  { id: "pets", label: "Pets", icon: Dog },
  { id: "education", label: "Education", icon: GraduationCap },
];

const priorityOptions = [
  { id: "education", label: "Education / Schools", icon: GraduationCap },
  { id: "family", label: "Family Services", icon: Heart },
  { id: "housing", label: "Housing", icon: Home },
  { id: "insurance", label: "Insurance & Health", icon: Shield },
  { id: "sports", label: "Sports & Leisure", icon: Dumbbell },
  { id: "finance", label: "Financial Planning", icon: Landmark },
  { id: "safety", label: "Safety & Security", icon: Shield },
  { id: "career", label: "Career", icon: Briefcase },
];

const familyStatuses = ["Single", "In a Relationship", "Married", "Divorced", "Widowed"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { step, setStep, profile, updateProfile } = useOnboardingStore();
  const [direction, setDirection] = useState(1);
  const [cityQuery, setCityQuery] = useState(profile.city);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(() => {
    const match = cityDatabase.find(c => c.city === profile.city);
    return match?.flag || "";
  });
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filteredCities = cityQuery.trim().length > 0
    ? cityDatabase.filter(c =>
        c.city.toLowerCase().includes(cityQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(cityQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goNext = () => {
    if (step < 3) {
      setDirection(1);
      setStep(step + 1);
    } else {
      navigate("/dashboard");
    }
  };
  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const canProceed = () => {
    switch (step) {
      case 0: return profile.city.trim().length > 0;
      case 1: return profile.familyStatus && profile.age && profile.profession;
      case 2: return profile.interests.length > 0;
      case 3: return profile.priorities.length > 0;
      default: return true;
    }
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
            NewBe
          </span>
          <span className="text-sm text-muted-foreground">Step {step + 1} of 4</span>
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <span className={`hidden sm:block text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-8 lg:w-16 h-0.5 mx-1 transition-colors duration-300 ${i < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 flex items-start justify-center">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">Where are you moving?</h1>
                    <p className="text-muted-foreground">Enter your new city so we can find local resources for you.</p>
                  </div>
                  <div className="relative" ref={suggestionsRef}>
                    {selectedFlag ? (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl z-10">{selectedFlag}</span>
                    ) : (
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    )}
                    <Input
                      placeholder="Start typing a city..."
                      value={cityQuery}
                      onChange={(e) => {
                        setCityQuery(e.target.value);
                        setSelectedFlag("");
                        updateProfile({ city: e.target.value });
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      className="pl-10 h-12 text-base"
                      autoComplete="off"
                    />
                    {showSuggestions && filteredCities.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto">
                        {filteredCities.map((c) => (
                          <button
                            key={`${c.city}-${c.country}`}
                            onClick={() => {
                              setCityQuery(`${c.city}, ${c.country}`);
                              setSelectedFlag(c.flag);
                              updateProfile({ city: c.city });
                              setShowSuggestions(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                          >
                            <span className="text-xl">{c.flag}</span>
                            <span className="text-sm">
                              <span className="font-medium text-foreground">{c.city}</span>
                              <span className="text-muted-foreground">, {c.country}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">Tell us about yourself</h1>
                    <p className="text-muted-foreground">This helps us personalize your experience.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Family Status</label>
                      <div className="flex flex-wrap gap-2">
                        {familyStatuses.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateProfile({ familyStatus: s })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                              profile.familyStatus === s
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card text-foreground border-border hover:border-primary/50"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Age</label>
                        <Input
                          placeholder="e.g., 32"
                          value={profile.age}
                          onChange={(e) => updateProfile({ age: e.target.value })}
                          className="h-11"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Profession</label>
                        <Input
                          placeholder="e.g., Engineer"
                          value={profile.profession}
                          onChange={(e) => updateProfile({ profession: e.target.value })}
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateProfile({ hasChildren: !profile.hasChildren })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          profile.hasChildren
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        <Baby className="h-4 w-4" /> I have children
                      </button>
                      {profile.hasChildren && (
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          placeholder="How many?"
                          value={profile.childrenCount || ""}
                          onChange={(e) => updateProfile({ childrenCount: Number(e.target.value) })}
                          className="h-10 w-28"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">What are your interests?</h1>
                    <p className="text-muted-foreground">Select all that apply — we'll match you with local activities.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((opt) => {
                      const selected = profile.interests.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => updateProfile({ interests: toggleArray(profile.interests, opt.id) })}
                          className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                            selected
                              ? "bg-primary/10 border-primary text-foreground shadow-sm"
                              : "bg-card border-border text-foreground hover:border-primary/30"
                          }`}
                        >
                          <opt.icon className={`h-5 w-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="text-sm font-medium">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">Set your priorities</h1>
                    <p className="text-muted-foreground">What matters most as you settle in?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {priorityOptions.map((opt) => {
                      const selected = profile.priorities.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => updateProfile({ priorities: toggleArray(profile.priorities, opt.id) })}
                          className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                            selected
                              ? "bg-accent/10 border-accent text-foreground shadow-sm"
                              : "bg-card border-border text-foreground hover:border-accent/30"
                          }`}
                        >
                          <opt.icon className={`h-5 w-5 ${selected ? "text-accent" : "text-muted-foreground"}`} />
                          <span className="text-sm font-medium">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between max-w-xl">
          <Button variant="ghost" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="hero" onClick={goNext} disabled={!canProceed()}>
            {step === 3 ? "Go to Dashboard" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
