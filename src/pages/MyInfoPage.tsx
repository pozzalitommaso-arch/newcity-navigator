import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore, defaultQuickInfo, defaultPetInfo, FamilyMember, FamilyMemberType, QuickInfo, PetInfo } from "@/lib/onboarding-store";
import { useExtrasStore } from "@/lib/extras-store";
import EssentialsCard, { cardMeta, QuickInfoKey } from "@/components/EssentialsCard";
import ListInfoSection, { FieldDef } from "@/components/ListInfoSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import {
  ArrowLeft, User, Users, Baby, Heart, PawPrint, Plus, Trash2, ChevronDown, ChevronRight,
  Home, CreditCard, Shield, Stethoscope, Phone, FileText, Pencil, Check, X,
  Wallet, ShieldPlus, Tag, Key, Briefcase, Train,
} from "lucide-react";

const essentialsKeys: QuickInfoKey[] = ["address", "bank", "insurance", "doctor", "emergencyContact", "ahvNumber"];

const memberTypeLabels: Record<FamilyMemberType, string> = {
  self: "You",
  spouse: "Spouse / Partner",
  child: "Child",
  pet: "Pet",
};

const memberTypeIcons: Record<FamilyMemberType, React.ElementType> = {
  self: User,
  spouse: Heart,
  child: Baby,
  pet: PawPrint,
};

const memberTypeColors: Record<FamilyMemberType, { color: string; bg: string }> = {
  self: { color: "text-primary", bg: "bg-primary/10" },
  spouse: { color: "text-accent", bg: "bg-accent/10" },
  child: { color: "text-info", bg: "bg-info/10" },
  pet: { color: "text-warning", bg: "bg-warning/10" },
};

const petFieldDefs = [
  { key: "name", label: "Pet Name", placeholder: "e.g., Luna" },
  { key: "species", label: "Species", placeholder: "e.g., Dog, Cat" },
  { key: "breed", label: "Breed", placeholder: "e.g., Labrador" },
  { key: "chipNumber", label: "Chip / ID Number", placeholder: "e.g., 756..." },
  { key: "vetName", label: "Vet Name", placeholder: "e.g., Dr. Huber" },
  { key: "vetPhone", label: "Vet Phone", placeholder: "e.g., +41 44 999 00 00" },
  { key: "insuranceProvider", label: "Insurance Provider", placeholder: "e.g., Animalia" },
  { key: "insurancePolicyNumber", label: "Insurance Policy #", placeholder: "e.g., PET-12345" },
];

function PetInfoCard({ member }: { member: FamilyMember }) {
  const { updateFamilyMemberPetInfo } = useOnboardingStore();
  const petData = member.petInfo || defaultPetInfo;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});

  const filledValues = Object.entries(petData).filter(([, v]) => Boolean(v));
  const summary = filledValues.length > 0
    ? [petData.name, petData.species, petData.breed].filter(Boolean).join(" · ") || filledValues.map(([, v]) => v).join(", ")
    : "";

  const startEdit = () => {
    setDraft({ ...petData } as Record<string, string>);
    setIsEditing(true);
  };

  const save = () => {
    updateFamilyMemberPetInfo(member.id, draft as unknown as Partial<PetInfo>);
    setIsEditing(false);
  };

  return (
    <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-warning/10">
            <PawPrint className="h-4 w-4 text-warning" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pet Details</span>
        </div>
        {!isEditing && (
          <button onClick={startEdit} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted">
            <Pencil className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-2">
          {petFieldDefs.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-muted-foreground mb-0.5 block">{f.label}</label>
              <Input
                value={draft[f.key] || ""}
                onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="h-8 text-sm"
                maxLength={200}
                onKeyDown={(e) => { if (e.key === "Escape") setIsEditing(false); }}
              />
            </div>
          ))}
          <div className="flex gap-1.5 pt-1">
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setIsEditing(false)}>
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

function AddMemberForm({ onAdd }: { onAdd: (type: FamilyMemberType, name: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<FamilyMemberType>("spouse");
  const [name, setName] = useState("");

  const types: FamilyMemberType[] = ["spouse", "child", "pet"];

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(type, name.trim());
    setName("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button variant="outline" className="w-full border-dashed h-12" onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" /> Add Family Member or Pet
      </Button>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] space-y-3">
      <div className="flex gap-2">
        {types.map((t) => {
          const Icon = memberTypeIcons[t];
          const colors = memberTypeColors[t];
          return (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 p-2.5 rounded-lg border text-center text-xs font-semibold transition-colors ${
                type === t ? `${colors.bg} ${colors.color} border-current` : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4 mx-auto mb-1" />
              {memberTypeLabels[t]}
            </button>
          );
        })}
      </div>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={type === "pet" ? "Pet's name" : "Name"}
        className="h-10"
        onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setIsOpen(false); }}
        autoFocus
      />
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="flex-1" onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button size="sm" className="flex-1" onClick={handleAdd} disabled={!name.trim()}>Add</Button>
      </div>
    </div>
  );
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function MyInfoPage() {
  const navigate = useNavigate();
  const { profile, addFamilyMember, removeFamilyMember } = useOnboardingStore();
  const extras = useExtrasStore();
  const [expandedMember, setExpandedMember] = useState<string | null>("self");

  const handleAddMember = (type: FamilyMemberType, name: string) => {
    addFamilyMember({
      type,
      name,
      quickInfo: { ...defaultQuickInfo },
      petInfo: type === "pet" ? { ...defaultPetInfo } : undefined,
    });
  };

  const allMembers: { id: string; type: FamilyMemberType; name: string; isSelf: boolean }[] = [
    { id: "self", type: "self" as FamilyMemberType, name: "You", isSelf: true },
    ...profile.familyMembers.map((m) => ({ id: m.id, type: m.type, name: m.name, isSelf: false })),
  ];

  return (
    <PageTransition className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-display text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate("/")}>NewBe</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            My Family <span className="gradient-text">Info Hub</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            All your important details in one place — for you and your whole family.
          </p>
        </motion.div>

        {/* Members List */}
        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          {allMembers.map((member) => {
            const Icon = memberTypeIcons[member.type];
            const colors = memberTypeColors[member.type];
            const isExpanded = expandedMember === member.id;
            const familyMember = profile.familyMembers.find((m) => m.id === member.id);

            return (
              <motion.div key={member.id} variants={fadeUp}>
                {/* Member Header */}
                <button
                  onClick={() => setExpandedMember(isExpanded ? null : member.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    isExpanded
                      ? "bg-card border-primary/30 shadow-[var(--shadow-soft)]"
                      : "bg-card border-border hover:border-primary/20 shadow-[var(--shadow-card)]"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${colors.bg}`}>
                    <Icon className={`h-5 w-5 ${colors.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{memberTypeLabels[member.type]}</p>
                  </div>
                  {!member.isSelf && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFamilyMember(member.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-5"
                  >
                    {/* For pets: show pet-specific card first */}
                    {member.type === "pet" && familyMember && (
                      <PetInfoCard member={familyMember} />
                    )}

                    {/* QuickInfo cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {essentialsKeys.map((key) => (
                        <EssentialsCard
                          key={`${member.id}-${key}`}
                          category={key}
                          memberId={member.isSelf ? undefined : member.id}
                          memberLabel={member.isSelf ? undefined : member.name}
                        />
                      ))}
                    </div>

                    {/* ── Bank Accounts ── */}
                    <ListInfoSection
                      title="Bank Accounts"
                      icon={Wallet}
                      iconColor="text-info"
                      iconBg="bg-info/10"
                      items={extras.bankAccounts}
                      fields={[
                        { key: "bankName", label: "Bank Name", placeholder: "e.g., UBS, PostFinance" },
                        { key: "iban", label: "IBAN", placeholder: "e.g., CH93 0076 2011 6238 5295 7" },
                        { key: "accountType", label: "Account Type", placeholder: "e.g., Savings, Current, Joint" },
                      ]}
                      getSummary={(item) => [item.bankName, item.accountType, item.iban].filter(Boolean).join(" · ")}
                      onAdd={extras.addBankAccount}
                      onUpdate={extras.updateBankAccount}
                      onRemove={extras.removeBankAccount}
                      emptyText="No bank accounts added"
                    />

                    {/* ── Complementary Insurance ── */}
                    <ListInfoSection
                      title="Complementary Insurance"
                      icon={ShieldPlus}
                      iconColor="text-success"
                      iconBg="bg-success/10"
                      items={extras.complementaryInsurances}
                      fields={[
                        { key: "type", label: "Type", placeholder: "e.g., Dental, Hospital, Travel, Legal" },
                        { key: "provider", label: "Provider", placeholder: "e.g., CSS, Helsana, Swica" },
                        { key: "policyNumber", label: "Policy Number", placeholder: "e.g., POL-123456" },
                        { key: "plan", label: "Plan / Model", placeholder: "e.g., Premium, Basic" },
                      ]}
                      getSummary={(item) => [item.type, item.provider, item.plan].filter(Boolean).join(" · ")}
                      onAdd={extras.addComplementaryInsurance}
                      onUpdate={extras.updateComplementaryInsurance}
                      onRemove={extras.removeComplementaryInsurance}
                      emptyText="No complementary insurance added"
                    />

                    {/* ── Loyalty / Store Cards ── */}
                    <ListInfoSection
                      title="Cards & Loyalty"
                      icon={Tag}
                      iconColor="text-accent"
                      iconBg="bg-accent/10"
                      items={extras.loyaltyCards}
                      fields={[
                        { key: "name", label: "Card Name", placeholder: "e.g., Migros Cumulus, Coop Supercard" },
                        { key: "cardNumber", label: "Card Number", placeholder: "e.g., 1234 5678 9012" },
                        { key: "notes", label: "Notes", placeholder: "e.g., linked to email", optional: true },
                      ]}
                      getSummary={(item) => [item.name, item.cardNumber].filter(Boolean).join(" · ")}
                      onAdd={extras.addLoyaltyCard}
                      onUpdate={extras.updateLoyaltyCard}
                      onRemove={extras.removeLoyaltyCard}
                      emptyText="No cards added"
                    />

                    {/* ── Spare Keys ── */}
                    <ListInfoSection
                      title="Spare Keys"
                      icon={Key}
                      iconColor="text-warning"
                      iconBg="bg-warning/10"
                      items={extras.spareKeys}
                      fields={[
                        { key: "name", label: "Left with (Name)", placeholder: "e.g., Anna, Neighbor" },
                        { key: "date", label: "Date Given", placeholder: "e.g., 2024-01-15", type: "date" },
                        { key: "number", label: "Phone Number", placeholder: "e.g., +41 79 123 45 67", type: "tel", optional: true },
                      ]}
                      getSummary={(item) => [item.name, item.date, item.number].filter(Boolean).join(" · ")}
                      onAdd={extras.addSpareKey}
                      onUpdate={extras.updateSpareKey}
                      onRemove={extras.removeSpareKey}
                      emptyText="No spare keys tracked"
                    />

                    {/* ── Work Permit ── */}
                    <ListInfoSection
                      title="Work Permit"
                      icon={Briefcase}
                      iconColor="text-primary"
                      iconBg="bg-primary/10"
                      items={extras.workPermits}
                      fields={[
                        { key: "permitType", label: "Permit Type", placeholder: "e.g., B, C, G, L" },
                        { key: "number", label: "Permit Number", placeholder: "e.g., ZH-123456" },
                        { key: "expiryDate", label: "Expiry Date", placeholder: "e.g., 2026-12-31", type: "date" },
                        { key: "issuedBy", label: "Issued By", placeholder: "e.g., Migration Office Zurich" },
                      ]}
                      getSummary={(item) => [item.permitType && `Permit ${item.permitType}`, item.number, item.expiryDate].filter(Boolean).join(" · ")}
                      onAdd={extras.addWorkPermit}
                      onUpdate={extras.updateWorkPermit}
                      onRemove={extras.removeWorkPermit}
                      emptyText="No work permit added"
                    />

                    {/* ── Swiss Pass ── */}
                    <ListInfoSection
                      title="Swiss Pass"
                      icon={Train}
                      iconColor="text-destructive"
                      iconBg="bg-destructive/10"
                      items={extras.swissPasses}
                      fields={[
                        { key: "number", label: "Swiss Pass Number", placeholder: "e.g., S1234567890" },
                        { key: "validUntil", label: "Valid Until", placeholder: "e.g., 2026-05-31", type: "date" },
                        { key: "travelClass", label: "Travel Class", placeholder: "e.g., 1st, 2nd" },
                      ]}
                      getSummary={(item) => [item.number, item.travelClass && `${item.travelClass} class`, item.validUntil].filter(Boolean).join(" · ")}
                      onAdd={(item) => extras.addSwissPass({ ...item, halfFare: false } as any)}
                      onUpdate={extras.updateSwissPass}
                      onRemove={extras.removeSwissPass}
                      emptyText="No Swiss Pass added"
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Add Member */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <AddMemberForm onAdd={handleAddMember} />
        </motion.div>

        {/* Info callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-5 rounded-xl bg-primary/5 border border-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" /> Your data stays with you
          </h3>
          <p className="text-sm text-muted-foreground">
            All information is stored locally on your device. Nothing is shared without your explicit permission.
            This is your personal family vault for quick reference.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
