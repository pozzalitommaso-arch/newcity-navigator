import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, FileText, CheckCircle2, Circle, Upload, Shield,
  Home, Briefcase, GraduationCap, Heart, AlertCircle,
} from "lucide-react";

interface Doc {
  id: string;
  name: string;
  required: boolean;
  tip: string;
  category: string;
}

const documents: Doc[] = [
  { id: "passport", name: "Valid passport", required: true, tip: "Must be valid for at least 6 months", category: "Identity" },
  { id: "passport-photos", name: "Passport-sized photos (4x)", required: true, tip: "Biometric format, white background", category: "Identity" },
  { id: "birth-cert", name: "Birth certificate (apostilled)", required: true, tip: "Apostille or legalization depending on your country", category: "Identity" },
  { id: "marriage-cert", name: "Marriage certificate", required: false, tip: "Only if married — apostilled copy", category: "Identity" },
  { id: "work-contract", name: "Employment contract", required: true, tip: "Signed contract with Swiss employer", category: "Work" },
  { id: "diplomas", name: "University diplomas", required: false, tip: "Translated to German/English if needed", category: "Work" },
  { id: "cv", name: "Updated CV / Resume", required: false, tip: "Swiss format preferred — include photo", category: "Work" },
  { id: "reference-letters", name: "Reference letters from employers", required: false, tip: "Arbeitszeugnis are standard in Switzerland", category: "Work" },
  { id: "lease", name: "Rental lease agreement", required: true, tip: "Needed for Einwohnerkontrolle registration", category: "Housing" },
  { id: "debt-cert", name: "Betreibungsauskunft (debt certificate)", required: true, tip: "Request from your municipality — proves no debts", category: "Housing" },
  { id: "insurance-card", name: "Health insurance card", required: true, tip: "Must register within 3 months of arrival", category: "Insurance" },
  { id: "liability-insurance", name: "Liability insurance policy", required: false, tip: "Privathaftpflicht — highly recommended", category: "Insurance" },
  { id: "school-records", name: "Children's school records", required: false, tip: "Transcripts, vaccination records for enrollment", category: "Family" },
  { id: "vaccination-records", name: "Vaccination records", required: true, tip: "Swiss schools require proof of vaccination", category: "Family" },
  { id: "drivers-license", name: "International driving license", required: false, tip: "Can use foreign license for 12 months, then must convert", category: "Other" },
  { id: "bank-statements", name: "Bank statements (last 3 months)", required: false, tip: "May be needed for apartment applications", category: "Other" },
];

const categoryIcons: Record<string, React.ElementType> = {
  Identity: FileText,
  Work: Briefcase,
  Housing: Home,
  Insurance: Shield,
  Family: Heart,
  Other: GraduationCap,
};

export default function DocumentVaultPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalRequired = documents.filter((d) => d.required).length;
  const checkedRequired = documents.filter((d) => d.required && checked[d.id]).length;
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedRequired / totalRequired) * 100);

  const categories = [...new Set(documents.map((d) => d.category))];

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

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Document Vault</h1>
          <p className="text-muted-foreground text-lg mb-6">Track every document you need for your move. Never show up unprepared.</p>

          {/* Progress ring */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] flex items-center gap-6">
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                  strokeDasharray={`${progress}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{progress}%</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{checkedRequired}/{totalRequired} required docs ready</h3>
              <p className="text-sm text-muted-foreground">{totalChecked}/{documents.length} total documents checked</p>
              {progress < 100 && (
                <p className="text-xs text-accent mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Complete required documents before your registration appointment
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Document categories */}
        {categories.map((cat) => {
          const Icon = categoryIcons[cat] || FileText;
          const catDocs = documents.filter((d) => d.category === cat);
          return (
            <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" /> {cat}
              </h2>
              <div className="space-y-2">
                {catDocs.map((doc) => (
                  <button key={doc.id} onClick={() => toggle(doc.id)}
                    className="w-full flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] text-left hover:border-primary/30 transition-colors">
                    {checked[doc.id] ? (
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${checked[doc.id] ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {doc.name}
                        </span>
                        {doc.required && !checked[doc.id] && (
                          <span className="text-[10px] font-semibold bg-accent/15 text-accent px-1.5 py-0.5 rounded-full">Required</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{doc.tip}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
