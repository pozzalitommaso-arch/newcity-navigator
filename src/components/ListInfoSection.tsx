import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  type?: string;
  optional?: boolean;
}

interface ListInfoSectionProps<T extends Record<string, any>> {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  items: (T & { id: string })[];
  fields: FieldDef[];
  getSummary: (item: T) => string;
  onAdd: (item: Omit<T, "id">) => void;
  onUpdate: (id: string, data: Partial<T>) => void;
  onRemove: (id: string) => void;
  emptyText?: string;
}

export default function ListInfoSection<T extends Record<string, any>>({
  title,
  icon: Icon,
  iconColor,
  iconBg,
  items,
  fields,
  getSummary,
  onAdd,
  onUpdate,
  onRemove,
  emptyText = "None added yet",
}: ListInfoSectionProps<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});

  const startAdd = () => {
    const empty: Record<string, string> = {};
    fields.forEach((f) => (empty[f.key] = ""));
    setDraft(empty);
    setIsAdding(true);
    setEditingId(null);
  };

  const startEdit = (item: T & { id: string }) => {
    const d: Record<string, string> = {};
    fields.forEach((f) => (d[f.key] = (item as any)[f.key] || ""));
    setDraft(d);
    setEditingId(item.id);
    setIsAdding(false);
  };

  const saveAdd = () => {
    onAdd(draft as unknown as Omit<T, "id">);
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (editingId) {
      onUpdate(editingId, draft as unknown as Partial<T>);
      setEditingId(null);
    }
  };

  const cancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const renderForm = (onSave: () => void) => (
    <div className="p-4 rounded-xl bg-card border border-primary/20 shadow-[var(--shadow-card)] space-y-2">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="text-xs text-muted-foreground mb-0.5 block">
            {f.label}{f.optional ? " (optional)" : ""}
          </label>
          <Input
            value={draft[f.key] || ""}
            onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
            placeholder={f.placeholder}
            type={f.type || "text"}
            className="h-8 text-sm"
            maxLength={200}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancel();
              if (e.key === "Enter") onSave();
            }}
          />
        </div>
      ))}
      <div className="flex gap-1.5 pt-1">
        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={cancel}>
          <X className="h-3 w-3 mr-1" /> Cancel
        </Button>
        <Button size="sm" className="h-7 text-xs" onClick={onSave}>
          <Check className="h-3 w-3 mr-1" /> Save
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${iconBg}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        {!isAdding && (
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={startAdd}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        )}
      </div>

      {/* Existing items */}
      {items.length === 0 && !isAdding && (
        <p className="text-sm text-muted-foreground italic pl-8">{emptyText}</p>
      )}

      {items.map((item) =>
        editingId === item.id ? (
          <div key={item.id}>{renderForm(saveEdit)}</div>
        ) : (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {getSummary(item)}
              </p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEdit(item)}
                className="p-1 rounded hover:bg-muted"
              >
                <Pencil className="h-3 w-3 text-muted-foreground" />
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="p-1 rounded hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3 text-destructive" />
              </button>
            </div>
          </div>
        )
      )}

      {/* Add form */}
      {isAdding && renderForm(saveAdd)}
    </div>
  );
}
