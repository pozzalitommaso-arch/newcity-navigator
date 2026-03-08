import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboardingStore, QuickInfo } from "@/lib/onboarding-store";
import {
  Home, CreditCard, Shield, Stethoscope, Phone, FileText,
  Pencil, Check, X,
} from "lucide-react";

type QuickInfoKey = keyof QuickInfo;

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  type?: string;
}

const fieldDefinitions: Record<QuickInfoKey, FieldDef[]> = {
  address: [
    { key: "street", label: "Street & Number", placeholder: "e.g., Bahnhofstr. 12" },
    { key: "postalCode", label: "Postal Code", placeholder: "e.g., 8001" },
    { key: "city", label: "City", placeholder: "e.g., Zürich" },
  ],
  bank: [
    { key: "bankName", label: "Bank Name", placeholder: "e.g., UBS, PostFinance" },
    { key: "iban", label: "IBAN", placeholder: "e.g., CH93 0076 2011 6238 5295 7" },
    { key: "accountType", label: "Account Type", placeholder: "e.g., Savings, Current" },
  ],
  insurance: [
    { key: "provider", label: "Provider", placeholder: "e.g., CSS, Helsana" },
    { key: "policyNumber", label: "Policy Number", placeholder: "e.g., POL-123456" },
    { key: "plan", label: "Plan / Model", placeholder: "e.g., Telmed, HMO" },
  ],
  doctor: [
    { key: "name", label: "Doctor Name", placeholder: "e.g., Dr. Müller" },
    { key: "phone", label: "Phone", placeholder: "e.g., +41 44 123 45 67", type: "tel" },
    { key: "clinic", label: "Clinic / Practice", placeholder: "e.g., Praxis am See" },
  ],
  emergencyContact: [
    { key: "name", label: "Contact Name", placeholder: "e.g., Anna Schmidt" },
    { key: "phone", label: "Phone", placeholder: "e.g., +41 79 123 45 67", type: "tel" },
    { key: "relationship", label: "Relationship", placeholder: "e.g., Partner, Friend" },
  ],
  ahvNumber: [
    { key: "number", label: "AHV Number", placeholder: "e.g., 756.1234.5678.90" },
  ],
};

export { fieldDefinitions };
export type { QuickInfoKey, FieldDef };

const cardMeta: Record<QuickInfoKey, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  address: { label: "My Address", icon: Home, color: "text-primary", bg: "bg-primary/10" },
  bank: { label: "Bank Account", icon: CreditCard, color: "text-info", bg: "bg-info/10" },
  insurance: { label: "Health Insurance", icon: Shield, color: "text-success", bg: "bg-success/10" },
  doctor: { label: "Doctor / GP", icon: Stethoscope, color: "text-accent", bg: "bg-accent/10" },
  emergencyContact: { label: "Emergency Contact", icon: Phone, color: "text-warning", bg: "bg-warning/10" },
  ahvNumber: { label: "AHV / Social Security", icon: FileText, color: "text-primary", bg: "bg-primary/10" },
};

export { cardMeta };

export function getSummary(category: QuickInfoKey, data: Record<string, string>): string {
  const values = Object.values(data).filter(Boolean);
  if (values.length === 0) return "";
  switch (category) {
    case "address": return [data.street, data.postalCode, data.city].filter(Boolean).join(", ");
    case "bank": return [data.bankName, data.iban].filter(Boolean).join(" · ");
    case "insurance": return [data.provider, data.plan].filter(Boolean).join(" · ");
    case "doctor": return [data.name, data.phone].filter(Boolean).join(" · ");
    case "emergencyContact": return [data.name, data.relationship, data.phone].filter(Boolean).join(" · ");
    case "ahvNumber": return data.number || "";
    default: return values.join(", ");
  }
}

interface EssentialsCardProps {
  category: QuickInfoKey;
  memberId?: string; // If provided, edits that family member's quickInfo
  memberLabel?: string;
}

export default function EssentialsCard({ category, memberId, memberLabel }: EssentialsCardProps) {
  const { profile, updateQuickInfo, updateFamilyMemberQuickInfo } = useOnboardingStore();
  
  const stored = memberId
    ? (profile.familyMembers.find(m => m.id === memberId)?.quickInfo[category] as unknown as Record<string, string>) || {}
    : (profile.quickInfo[category] as unknown as Record<string, string>);
  
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});

  const meta = cardMeta[category];
  const fields = fieldDefinitions[category];
  const Icon = meta.icon;
  const summary = getSummary(category, stored);

  const startEdit = () => {
    setDraft({ ...stored });
    setIsEditing(true);
  };

  const save = () => {
    if (memberId) {
      updateFamilyMemberQuickInfo(memberId, { [category]: draft });
    } else {
      updateQuickInfo({ [category]: draft });
    }
    setIsEditing(false);
  };

  const cancel = () => setIsEditing(false);

  return (
    <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${meta.bg}`}>
            <Icon className={`h-4 w-4 ${meta.color}`} />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{meta.label}</span>
            {memberLabel && (
              <span className="text-xs text-muted-foreground ml-1.5">· {memberLabel}</span>
            )}
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={startEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
          >
            <Pencil className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-muted-foreground mb-0.5 block">{f.label}</label>
              <Input
                value={draft[f.key] || ""}
                onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                type={f.type || "text"}
                className="h-8 text-sm"
                maxLength={200}
                onKeyDown={(e) => {
                  if (e.key === "Escape") cancel();
                }}
              />
            </div>
          ))}
          <div className="flex gap-1.5 pt-1">
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={cancel}>
              <X className="h-3 w-3 mr-1" /> Cancel
            </Button>
            <Button size="sm" className="h-7 text-xs" onClick={save}>
              <Check className="h-3 w-3 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <p
          className={`text-sm truncate cursor-pointer ${summary ? "text-foreground font-medium" : "text-muted-foreground italic"}`}
          onClick={startEdit}
        >
          {summary || "Not set yet — click to add"}
        </p>
      )}
    </div>
  );
}
