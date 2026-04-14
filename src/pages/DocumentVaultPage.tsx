import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Plus, CalendarIcon,
  Sparkles, Lightbulb, PenLine, Trash2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// ── Section 1: Suggested ──
const suggestedItems = [
  { id: "work-permit", name: "Work Permit" },
  { id: "health-insurance", name: "Health Insurance Card" },
  { id: "ahv-number", name: "AHV Number" },
  { id: "bank-account", name: "Bank Account" },
];

// ── Section 2: Expert picks ──
const expertItems = [
  { id: "spare-key", name: "Spare Key" },
  { id: "serafe", name: "Serafe Payment" },
  { id: "loyalty-cards", name: "Loyalty Cards" },
  { id: "ga-travelcard", name: "GA Travelcard" },
  { id: "pillar-3a", name: "Pillar 3a" },
  { id: "tax-documents", name: "Tax Documents" },
  { id: "car-registration", name: "Car Registration" },
  { id: "swiss-pass", name: "Swiss Pass" },
  { id: "emergency-contact", name: "Emergency Contact" },
  { id: "lease-agreement", name: "Lease Agreement" },
  { id: "internet-contract", name: "Internet Contract" },
  { id: "halbtax", name: "Halbtax" },
];

interface CustomItem {
  id: string;
  name: string;
  deadline?: Date;
}

export default function DocumentVaultPage() {
  const navigate = useNavigate();

  // Section 1 — all pre-checked
  const [suggested, setSuggested] = useState<Record<string, boolean>>(
    Object.fromEntries(suggestedItems.map((i) => [i.id, true]))
  );

  // Section 2
  const [expertOpen, setExpertOpen] = useState(false);
  const [expert, setExpert] = useState<Record<string, boolean>>({});

  // Section 3
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [newName, setNewName] = useState("");
  const [newDeadline, setNewDeadline] = useState<Date | undefined>();

  const toggleSuggested = (id: string) =>
    setSuggested((p) => ({ ...p, [id]: !p[id] }));

  const toggleExpert = (id: string) =>
    setExpert((p) => ({ ...p, [id]: !p[id] }));

  const addCustom = () => {
    if (!newName.trim()) return;
    setCustomItems((prev) => [
      ...prev,
      { id: `custom-${Date.now()}`, name: newName.trim(), deadline: newDeadline },
    ]);
    setNewName("");
    setNewDeadline(undefined);
  };

  const removeCustom = (id: string) =>
    setCustomItems((prev) => prev.filter((i) => i.id !== id));

  // Count
  const suggestedCount = Object.values(suggested).filter(Boolean).length;
  const expertCount = Object.values(expert).filter(Boolean).length;
  const totalSelected = suggestedCount + expertCount + customItems.length;

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-display text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
              NewBe
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Add to my Vault</h1>
          <p className="text-muted-foreground text-lg mb-8">Pick what matters to you — we'll help you track it all.</p>
        </motion.div>

        {/* ── Section 1: Suggested for you ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-display text-base font-semibold text-foreground">Suggested for you</h2>
          </div>
          <div className="space-y-3">
            {suggestedItems.map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={!!suggested[item.id]}
                  onCheckedChange={() => toggleSuggested(item.id)}
                />
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  suggested[item.id] ? "text-foreground" : "text-muted-foreground line-through"
                )}>
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* ── Section 2: Expert picks ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] overflow-hidden">
          <button
            onClick={() => setExpertOpen(!expertOpen)}
            className="w-full flex items-center gap-2 p-5 text-left hover:bg-muted/30 transition-colors"
          >
            <Lightbulb className="h-5 w-5 text-accent" />
            <span className="font-display text-base font-semibold text-foreground flex-1">
              You might not have thought of
            </span>
            <span className="text-xs text-muted-foreground mr-2">
              {expertOpen ? "" : `+ See ${expertItems.length} expert picks`}
              {expertCount > 0 && ` · ${expertCount} selected`}
            </span>
            {expertOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>

          {expertOpen && (
            <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
              {expertItems.map((item) => (
                <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={!!expert[item.id]}
                    onCheckedChange={() => toggleExpert(item.id)}
                  />
                  <span className={cn(
                    "text-sm font-medium",
                    expert[item.id] ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Section 3: Add your own ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] space-y-4">
          <div className="flex items-center gap-2">
            <PenLine className="h-5 w-5 text-primary" />
            <h2 className="font-display text-base font-semibold text-foreground">Add your own</h2>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Item name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              className="flex-1"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={newDeadline}
                  onSelect={setNewDeadline}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <Button onClick={addCustom} size="icon" className="shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {newDeadline && (
            <p className="text-xs text-muted-foreground">
              Deadline: {format(newDeadline, "PPP")}
            </p>
          )}

          {customItems.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              {customItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 group">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <span className="text-sm font-medium text-foreground flex-1">{item.name}</span>
                  {item.deadline && (
                    <span className="text-xs text-muted-foreground">
                      {format(item.deadline, "dd MMM yyyy")}
                    </span>
                  )}
                  <button onClick={() => removeCustom(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Footer ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="sticky bottom-6">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-12 text-base font-semibold rounded-xl shadow-lg"
            disabled={totalSelected === 0}
          >
            Add Selected ({totalSelected})
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
