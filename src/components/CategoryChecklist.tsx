import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useChecklistStore } from "@/lib/checklist-store";
import { Progress } from "@/components/ui/progress";

interface CategoryChecklistProps {
  categoryId: string;
  title: string;
}

export default function CategoryChecklist({ categoryId, title }: CategoryChecklistProps) {
  const { checklists, toggleItem, getCategoryProgress, getCategoryStats } = useChecklistStore();
  const items = checklists[categoryId] || [];
  const progress = getCategoryProgress(categoryId);
  const { completed, total } = getCategoryStats(categoryId);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-success" /> {title}
      </h2>
      <div className="max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{completed} of {total} completed</span>
          <span className="text-sm font-semibold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-muted mb-5" />
        <div className="space-y-2">
          {items.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => toggleItem(categoryId, i)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  item.done ? "bg-success" : "border-2 border-muted-foreground/30 hover:border-primary"
                }`}
              >
                {item.done && <CheckCircle2 className="h-3 w-3 text-success-foreground" />}
              </div>
              <span
                className={`text-sm transition-colors ${
                  item.done ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {item.text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
