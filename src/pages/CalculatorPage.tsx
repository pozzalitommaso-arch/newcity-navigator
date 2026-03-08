import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calculator,
  Home,
  ShoppingCart,
  Train,
  Utensils,
  Shield,
  Dumbbell,
  GraduationCap,
  Wifi,
  Baby,
  PiggyBank,
} from "lucide-react";

interface ExpenseCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  avg: number;
  color: string;
  tip: string;
}

const expenseCategories: ExpenseCategory[] = [
  { id: "rent", label: "Rent (2-bed apartment)", icon: Home, avg: 2200, color: "text-primary", tip: "Kreis 9/11/12 are most affordable; Kreis 1/7/8 are premium" },
  { id: "groceries", label: "Groceries", icon: ShoppingCart, avg: 600, color: "text-success", tip: "Migros & Coop are standard; Aldi & Lidl are 20-30% cheaper" },
  { id: "transport", label: "Public Transport", icon: Train, avg: 87, color: "text-info", tip: "ZVV monthly pass. Half-Fare card saves 50% on intercity" },
  { id: "dining", label: "Dining Out", icon: Utensils, avg: 400, color: "text-warning", tip: "Lunch menus CHF 18-25. Dinner for two: CHF 80-150" },
  { id: "health", label: "Health Insurance", icon: Shield, avg: 380, color: "text-accent", tip: "Mandatory Grundversicherung. Higher franchise = lower premium" },
  { id: "gym", label: "Gym / Sports", icon: Dumbbell, avg: 80, color: "text-warning", tip: "Club memberships CHF 60-120/month. Outdoor activities are free!" },
  { id: "internet", label: "Internet & Mobile", icon: Wifi, avg: 100, color: "text-info", tip: "Swisscom is premium; Salt & Sunrise are competitive" },
  { id: "childcare", label: "Childcare (Kita)", icon: Baby, avg: 2200, color: "text-accent", tip: "Full-time Kita: CHF 2000-2800/month. Subsidies available" },
  { id: "education", label: "Int'l School (optional)", icon: GraduationCap, avg: 2500, color: "text-primary", tip: "Public school is free. International: CHF 25-45k/year" },
  { id: "savings", label: "Pillar 3a / Savings", icon: PiggyBank, avg: 588, color: "text-success", tip: "Max CHF 7,056/year for Pillar 3a. Tax deductible!" },
];

export default function CalculatorPage() {
  const navigate = useNavigate();
  const [salary, setSalary] = useState(8000);
  const [expenses, setExpenses] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    expenseCategories.forEach((c) => (init[c.id] = c.avg));
    return init;
  });
  const [includeChildcare, setIncludeChildcare] = useState(false);
  const [includeSchool, setIncludeSchool] = useState(false);

  const totalExpenses = Object.entries(expenses).reduce((sum, [id, val]) => {
    if (id === "childcare" && !includeChildcare) return sum;
    if (id === "education" && !includeSchool) return sum;
    return sum + val;
  }, 0);

  const remaining = salary - totalExpenses;
  const savingsRate = salary > 0 ? Math.round((Math.max(0, remaining) / salary) * 100) : 0;

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
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Cost of Living Calculator</h1>
          <p className="text-muted-foreground text-lg">Compare your salary against typical Zurich expenses.</p>
        </motion.div>

        {/* Salary Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
          <label className="text-sm font-medium text-foreground mb-2 block">Monthly Net Salary (CHF)</label>
          <Input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="h-12 text-lg font-semibold"
            min={0}
            max={100000}
          />
        </motion.div>

        {/* Summary Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Income</p>
              <p className="text-xl font-bold text-foreground">CHF {salary.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expenses</p>
              <p className="text-xl font-bold text-accent">CHF {totalExpenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className={`text-xl font-bold ${remaining >= 0 ? "text-success" : "text-destructive"}`}>
                CHF {remaining.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={Math.min(100, (totalExpenses / Math.max(1, salary)) * 100)} className="h-3 bg-muted flex-1" />
            <span className="text-sm font-medium text-muted-foreground">{savingsRate}% saved</span>
          </div>
        </motion.div>

        {/* Toggle optional expenses */}
        <div className="flex gap-3">
          <button
            onClick={() => setIncludeChildcare(!includeChildcare)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              includeChildcare ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"
            }`}
          >
            <Baby className="h-4 w-4 inline mr-1.5" /> Include Childcare
          </button>
          <button
            onClick={() => setIncludeSchool(!includeSchool)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              includeSchool ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"
            }`}
          >
            <GraduationCap className="h-4 w-4 inline mr-1.5" /> Include Int'l School
          </button>
        </div>

        {/* Expense Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" /> Monthly Expenses
          </h2>
          {expenseCategories.map((cat) => {
            if (cat.id === "childcare" && !includeChildcare) return null;
            if (cat.id === "education" && !includeSchool) return null;
            const pct = salary > 0 ? Math.round(((expenses[cat.id] || 0) / salary) * 100) : 0;
            return (
              <div key={cat.id} className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-2">
                  <cat.icon className={`h-5 w-5 ${cat.color} shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{cat.label}</span>
                      <span className="text-xs text-muted-foreground">{pct}% of income</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={expenses[cat.id]}
                    onChange={(e) => setExpenses({ ...expenses, [cat.id]: Number(e.target.value) })}
                    className="h-9 w-32 text-sm"
                    min={0}
                    max={50000}
                  />
                  <span className="text-xs text-muted-foreground flex-1">Avg: CHF {cat.avg} — {cat.tip}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
