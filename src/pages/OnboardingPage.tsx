import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { cityDatabase } from "@/lib/city-database";
import {
  MapPin, User, Heart, Target, ArrowRight, ArrowLeft, Check,
  Baby, Briefcase, GraduationCap, Home, Shield, Dumbbell, Landmark,
  Palette, Music, BookOpen, Coffee, TreePine, Dog, Globe,
  MessageCircle, Camera, Gamepad2, Bike, Plane, Utensils, Wine,
  Laptop, Film, Waves, Flower2, HandHeart, Languages, Building2,
  PiggyBank, Users, CalendarDays, FileText, Car, Stethoscope,
  CheckCheck, Search, ChevronDown, X, PawPrint,
} from "lucide-react";

const genderOptions = ["Man", "Woman", "Non-binary", "Genderqueer", "Prefer not to say", "Other"];
const orientationOptions = ["Straight", "Gay", "Lesbian", "Bisexual", "Pansexual", "Asexual", "Queer", "Prefer not to say", "Other"];

const nationalityOptions = [
  "Afghan","Albanian","Algerian","American","Andorran","Angolan","Argentine","Armenian","Australian","Austrian",
  "Azerbaijani","Bahamian","Bahraini","Bangladeshi","Barbadian","Belarusian","Belgian","Belizean","Beninese","Bhutanese",
  "Bolivian","Bosnian","Brazilian","British","Bruneian","Bulgarian","Burkinabe","Burmese","Burundian","Cambodian",
  "Cameroonian","Canadian","Cape Verdean","Central African","Chadian","Chilean","Chinese","Colombian","Comorian","Congolese",
  "Costa Rican","Croatian","Cuban","Cypriot","Czech","Danish","Djiboutian","Dominican","Dutch","Ecuadorian",
  "Egyptian","Emirati","Equatorial Guinean","Eritrean","Estonian","Ethiopian","Fijian","Filipino","Finnish","French",
  "Gabonese","Gambian","Georgian","German","Ghanaian","Greek","Grenadian","Guatemalan","Guinean","Guyanese",
  "Haitian","Honduran","Hungarian","Icelandic","Indian","Indonesian","Iranian","Iraqi","Irish","Israeli",
  "Italian","Ivorian","Jamaican","Japanese","Jordanian","Kazakh","Kenyan","Korean","Kosovar",
  "Kuwaiti","Kyrgyz","Latvian","Lebanese","Liberian","Libyan","Liechtenstein","Lithuanian","Luxembourgish",
  "Macedonian","Malaysian","Maltese","Mexican","Moldovan","Mongolian","Montenegrin","Moroccan","Mozambican",
  "Namibian","Nepalese","New Zealander","Nicaraguan","Nigerian","Norwegian","Omani","Pakistani","Panamanian",
  "Paraguayan","Peruvian","Polish","Portuguese","Qatari","Romanian","Russian","Rwandan","Saudi","Senegalese",
  "Serbian","Singaporean","Slovak","Slovenian","Somali","South African","Spanish","Sri Lankan","Sudanese",
  "Swedish","Swiss","Syrian","Taiwanese","Tanzanian","Thai","Trinidadian","Tunisian","Turkish","Ugandan",
  "Ukrainian","Uruguayan","Uzbek","Venezuelan","Vietnamese","Yemeni","Zambian","Zimbabwean",
];

const languageOptions = [
  "Afrikaans","Albanian","Amharic","Arabic","Armenian","Azerbaijani","Bengali","Bosnian","Bulgarian","Burmese",
  "Catalan","Chinese (Mandarin)","Chinese (Cantonese)","Croatian","Czech","Danish","Dutch","English","Estonian",
  "Filipino (Tagalog)","Finnish","French","Georgian","German","Greek","Gujarati","Hausa","Hebrew","Hindi",
  "Hungarian","Icelandic","Indonesian","Irish","Italian","Japanese","Kannada","Kazakh","Khmer","Korean",
  "Kurdish","Latvian","Lithuanian","Luxembourgish","Macedonian","Malay","Malayalam","Maltese","Marathi",
  "Mongolian","Nepali","Norwegian","Pashto","Persian (Farsi)","Polish","Portuguese","Punjabi","Romanian",
  "Romansh","Russian","Serbian","Sinhala","Slovak","Slovenian","Somali","Spanish","Swahili","Swedish",
  "Swiss German","Tamil","Telugu","Thai","Turkish","Ukrainian","Urdu","Uzbek","Vietnamese","Welsh","Yoruba","Zulu",
];

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
  { id: "outdoors", label: "Outdoors & Hiking", icon: TreePine },
  { id: "food", label: "Food & Cooking", icon: Utensils },
  { id: "dining", label: "Restaurants & Bars", icon: Wine },
  { id: "pets", label: "Pets & Animals", icon: Dog },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "cycling", label: "Cycling", icon: Bike },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "tech", label: "Tech & Startups", icon: Laptop },
  { id: "film", label: "Film & Cinema", icon: Film },
  { id: "swimming", label: "Swimming & Water", icon: Waves },
  { id: "gardening", label: "Gardening", icon: Flower2 },
  { id: "volunteering", label: "Volunteering", icon: HandHeart },
  { id: "languages", label: "Language Learning", icon: Languages },
  { id: "coffee", label: "Coffee & Cafés", icon: Coffee },
];

const priorityOptions = [
  { id: "education", label: "Education / Schools", icon: GraduationCap },
  { id: "family", label: "Family Services", icon: Heart },
  { id: "housing", label: "Housing", icon: Home },
  { id: "insurance", label: "Insurance & Health", icon: Shield },
  { id: "sports", label: "Sports & Leisure", icon: Dumbbell },
  { id: "finance", label: "Financial Planning", icon: Landmark },
  { id: "banking", label: "Banking", icon: Building2 },
  { id: "pension", label: "Pension & Retirement", icon: PiggyBank },
  { id: "friends", label: "Friends & Community", icon: Users },
  { id: "events", label: "Events & Culture", icon: CalendarDays },
  { id: "public-services", label: "Public Services", icon: FileText },
  { id: "safety", label: "Safety & Security", icon: Shield },
  { id: "career", label: "Career", icon: Briefcase },
  { id: "transport", label: "Transport & Mobility", icon: Car },
  { id: "healthcare", label: "Healthcare & Doctors", icon: Stethoscope },
];

const familyStatuses = ["Single", "In a Relationship", "Married", "Divorced", "Widowed"];

// ── Searchable Dropdown Component ──
function SearchableDropdown({ value, onChange, options, placeholder, icon: Icon }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string; icon?: React.ElementType;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : options.slice(0, 8);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 h-11 px-3 rounded-md border border-input bg-background text-sm text-left hover:border-primary/50 transition-colors"
      >
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
        <span className={`flex-1 truncate ${value ? "text-foreground" : "text-muted-foreground"}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-muted/50 rounded-lg border-0 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? filtered.map((opt) => (
              <button key={opt} type="button"
                onClick={() => { onChange(opt); setOpen(false); setQuery(""); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors ${
                  value === opt ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                }`}>
                {value === opt && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                <span>{opt}</span>
              </button>
            )) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Multi-Select Dropdown Component ──
function MultiSelectDropdown({ values, onChange, options, placeholder, icon: Icon }: {
  values: string[]; onChange: (v: string[]) => void; options: string[]; placeholder: string; icon?: React.ElementType;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase())).slice(0, 10)
    : options.slice(0, 10);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (val: string) => {
    onChange(values.includes(val) ? values.filter(v => v !== val) : [...values, val]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 min-h-[2.75rem] px-3 py-1.5 rounded-md border border-input bg-background text-sm text-left hover:border-primary/50 transition-colors"
      >
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
        <div className="flex-1 flex flex-wrap gap-1">
          {values.length > 0 ? values.map(v => (
            <span key={v} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
              {v}
              <X className="h-3 w-3 cursor-pointer hover:text-primary/70" onClick={(e) => { e.stopPropagation(); toggle(v); }} />
            </span>
          )) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search languages..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-muted/50 rounded-lg border-0 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? filtered.map((opt) => {
              const selected = values.includes(opt);
              return (
                <button key={opt} type="button"
                  onClick={() => toggle(opt)}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-muted/50 transition-colors ${
                    selected ? "bg-primary/10" : ""
                  }`}>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    selected ? "bg-primary border-primary" : "border-border"
                  }`}>
                    {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <span className={selected ? "text-primary font-medium" : "text-foreground"}>{opt}</span>
                </button>
              );
            }) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
        c.canton.toLowerCase().includes(cityQuery.toLowerCase())
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
    if (step < 3) { setDirection(1); setStep(step + 1); }
    else navigate("/dashboard");
  };
  const goBack = () => {
    if (step > 0) { setDirection(-1); setStep(step - 1); }
    else navigate("/");
  };

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const canProceed = () => {
    switch (step) {
      case 0: return profile.city.trim().length > 0;
      case 1: return profile.age.trim().length > 0;
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
          <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          <span className="text-sm text-muted-foreground">Step {step + 1} of 4</span>
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <span className={`hidden sm:block text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
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
            <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
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
                              <span className="text-muted-foreground"> ({c.canton})</span>
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
                    <p className="text-muted-foreground">This helps us personalize your experience. All fields are optional.</p>
                  </div>
                  <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-1">
                    {/* Gender */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Gender</label>
                      <div className="flex flex-wrap gap-2">
                        {genderOptions.map((g) => (
                          <button key={g}
                            onClick={() => updateProfile({ gender: g, ...(g !== "Other" ? { genderCustom: "" } : {}) })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                              profile.gender === g ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"
                            }`}>{g}</button>
                        ))}
                      </div>
                      {profile.gender === "Other" && (
                        <Input placeholder="How do you identify?" value={profile.genderCustom} onChange={(e) => updateProfile({ genderCustom: e.target.value })} className="h-10 mt-2" maxLength={50} />
                      )}
                    </div>

                    {/* Orientation */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Sexual Orientation</label>
                      <div className="flex flex-wrap gap-2">
                        {orientationOptions.map((o) => (
                          <button key={o}
                            onClick={() => updateProfile({ orientation: o, ...(o !== "Other" ? { orientationCustom: "" } : {}) })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                              profile.orientation === o ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"
                            }`}>{o}</button>
                        ))}
                      </div>
                      {profile.orientation === "Other" && (
                        <Input placeholder="How do you identify?" value={profile.orientationCustom} onChange={(e) => updateProfile({ orientationCustom: e.target.value })} className="h-10 mt-2" maxLength={50} />
                      )}
                    </div>

                    {/* Family Status */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Relationship Status</label>
                      <div className="flex flex-wrap gap-2">
                        {familyStatuses.map((s) => (
                          <button key={s}
                            onClick={() => updateProfile({ familyStatus: s })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                              profile.familyStatus === s ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"
                            }`}>{s}</button>
                        ))}
                      </div>
                    </div>

                    {/* Age & Profession */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Age</label>
                        <Input placeholder="e.g., 32" value={profile.age} onChange={(e) => updateProfile({ age: e.target.value })} className="h-11" maxLength={3} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Profession</label>
                        <Input placeholder="e.g., Engineer" value={profile.profession} onChange={(e) => updateProfile({ profession: e.target.value })} className="h-11" maxLength={100} />
                      </div>
                    </div>

                    {/* Nationality — Searchable Dropdown */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />Nationality
                      </label>
                      <SearchableDropdown
                        value={profile.nationality}
                        onChange={(v) => updateProfile({ nationality: v })}
                        options={nationalityOptions}
                        placeholder="Select your nationality..."
                        icon={Globe}
                      />
                    </div>

                    {/* Languages — Multi-Select Dropdown */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />Languages you speak
                      </label>
                      <MultiSelectDropdown
                        values={profile.languages}
                        onChange={(v) => updateProfile({ languages: v })}
                        options={languageOptions}
                        placeholder="Select languages..."
                        icon={Languages}
                      />
                    </div>

                    {/* Reason for moving */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Why are you moving?</label>
                      <div className="flex flex-wrap gap-2">
                        {moveReasonOptions.map((r) => (
                          <button key={r}
                            onClick={() => updateProfile({ moveReason: r })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                              profile.moveReason === r ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"
                            }`}>{r}</button>
                        ))}
                      </div>
                    </div>

                    {/* ── Children Section ── */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                        <Baby className="h-3.5 w-3.5 text-muted-foreground" />Children
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateProfile({ hasChildren: !profile.hasChildren, ...(!profile.hasChildren ? {} : { childrenCount: 0 }) })}
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
                            type="number" min={1} max={10} placeholder="How many?"
                            value={profile.childrenCount || ""}
                            onChange={(e) => updateProfile({ childrenCount: Number(e.target.value) })}
                            className="h-10 w-28"
                          />
                        )}
                      </div>
                    </div>

                    {/* ── Pets Section ── */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                        <PawPrint className="h-3.5 w-3.5 text-muted-foreground" />Pets
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateProfile({ hasPets: !profile.hasPets, ...(!profile.hasPets ? {} : { petsCount: 0 }) })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            profile.hasPets
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          <PawPrint className="h-4 w-4" /> I have pets
                        </button>
                        {profile.hasPets && (
                          <Input
                            type="number" min={1} max={10} placeholder="How many?"
                            value={profile.petsCount || ""}
                            onChange={(e) => updateProfile({ petsCount: Number(e.target.value) })}
                            className="h-10 w-28"
                          />
                        )}
                      </div>
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
                  <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                    {interestOptions.map((opt) => {
                      const selected = profile.interests.includes(opt.id);
                      return (
                        <button key={opt.id}
                          onClick={() => updateProfile({ interests: toggleArray(profile.interests, opt.id) })}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                            selected ? "bg-primary/10 border-primary text-foreground shadow-sm" : "bg-card border-border text-foreground hover:border-primary/30"
                          }`}>
                          <opt.icon className={`h-5 w-5 shrink-0 ${selected ? "text-primary" : "text-muted-foreground"}`} />
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
                  <button
                    onClick={() => {
                      const allIds = priorityOptions.map(o => o.id);
                      const allSelected = allIds.every(id => profile.priorities.includes(id));
                      updateProfile({ priorities: allSelected ? [] : allIds });
                    }}
                    className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                      priorityOptions.every(o => profile.priorities.includes(o.id))
                        ? "bg-accent/10 border-accent text-foreground shadow-sm"
                        : "bg-card border-border text-foreground hover:border-accent/30"
                    }`}>
                    <CheckCheck className={`h-5 w-5 ${priorityOptions.every(o => profile.priorities.includes(o.id)) ? "text-accent" : "text-muted-foreground"}`} />
                    <span className="text-sm font-semibold">Select All</span>
                  </button>
                  <div className="grid grid-cols-2 gap-3 max-h-[42vh] overflow-y-auto pr-1">
                    {priorityOptions.map((opt) => {
                      const selected = profile.priorities.includes(opt.id);
                      return (
                        <button key={opt.id}
                          onClick={() => updateProfile({ priorities: toggleArray(profile.priorities, opt.id) })}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                            selected ? "bg-accent/10 border-accent text-foreground shadow-sm" : "bg-card border-border text-foreground hover:border-accent/30"
                          }`}>
                          <opt.icon className={`h-5 w-5 shrink-0 ${selected ? "text-accent" : "text-muted-foreground"}`} />
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
