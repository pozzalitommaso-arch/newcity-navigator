import { create } from 'zustand';

// ── Types ──────────────────────────────────────────────

export interface BankAccount {
  id: string;
  bankName: string;
  iban: string;
  accountType: string;
}

export interface ComplementaryInsurance {
  id: string;
  provider: string;
  policyNumber: string;
  plan: string;
  type: string; // e.g. "Dental", "Hospital", "Travel", "Legal"
}

export interface LoyaltyCard {
  id: string;
  name: string;
  cardNumber: string;
  notes: string;
}

export interface SpareKey {
  id: string;
  name: string;
  date: string;
  number: string;
}

export interface WorkPermit {
  id: string;
  permitType: string;  // e.g. B, C, G, L
  number: string;
  expiryDate: string;
  issuedBy: string;
}

export interface SwissPass {
  id: string;
  number: string;
  validUntil: string;
  travelClass: string;
  halfFare: boolean;
}

// ── Generic list helpers ───────────────────────────────

type ListItem = { id: string };

let _counter = 0;
function uid() {
  _counter++;
  return `ext-${Date.now()}-${_counter}`;
}

// ── Store ──────────────────────────────────────────────

interface ExtrasStore {
  bankAccounts: BankAccount[];
  complementaryInsurances: ComplementaryInsurance[];
  loyaltyCards: LoyaltyCard[];
  spareKeys: SpareKey[];
  workPermits: WorkPermit[];
  swissPasses: SwissPass[];

  addBankAccount: (item: Omit<BankAccount, 'id'>) => void;
  updateBankAccount: (id: string, data: Partial<BankAccount>) => void;
  removeBankAccount: (id: string) => void;

  addComplementaryInsurance: (item: Omit<ComplementaryInsurance, 'id'>) => void;
  updateComplementaryInsurance: (id: string, data: Partial<ComplementaryInsurance>) => void;
  removeComplementaryInsurance: (id: string) => void;

  addLoyaltyCard: (item: Omit<LoyaltyCard, 'id'>) => void;
  updateLoyaltyCard: (id: string, data: Partial<LoyaltyCard>) => void;
  removeLoyaltyCard: (id: string) => void;

  addSpareKey: (item: Omit<SpareKey, 'id'>) => void;
  updateSpareKey: (id: string, data: Partial<SpareKey>) => void;
  removeSpareKey: (id: string) => void;

  addWorkPermit: (item: Omit<WorkPermit, 'id'>) => void;
  updateWorkPermit: (id: string, data: Partial<WorkPermit>) => void;
  removeWorkPermit: (id: string) => void;

  addSwissPass: (item: Omit<SwissPass, 'id'>) => void;
  updateSwissPass: (id: string, data: Partial<SwissPass>) => void;
  removeSwissPass: (id: string) => void;
}

function makeListActions<T extends ListItem>(
  key: keyof ExtrasStore,
  set: any,
) {
  return {
    add: (item: Omit<T, 'id'>) =>
      set((s: any) => ({ [key]: [...s[key], { ...item, id: uid() }] })),
    update: (id: string, data: Partial<T>) =>
      set((s: any) => ({
        [key]: s[key].map((i: T) => (i.id === id ? { ...i, ...data } : i)),
      })),
    remove: (id: string) =>
      set((s: any) => ({ [key]: s[key].filter((i: T) => i.id !== id) })),
  };
}

export const useExtrasStore = create<ExtrasStore>((set) => {
  const bank = makeListActions<BankAccount>('bankAccounts', set);
  const ins = makeListActions<ComplementaryInsurance>('complementaryInsurances', set);
  const card = makeListActions<LoyaltyCard>('loyaltyCards', set);
  const key = makeListActions<SpareKey>('spareKeys', set);
  const permit = makeListActions<WorkPermit>('workPermits', set);
  const pass = makeListActions<SwissPass>('swissPasses', set);

  return {
    bankAccounts: [],
    complementaryInsurances: [],
    loyaltyCards: [],
    spareKeys: [],
    workPermits: [],
    swissPasses: [],

    addBankAccount: bank.add,
    updateBankAccount: bank.update,
    removeBankAccount: bank.remove,

    addComplementaryInsurance: ins.add,
    updateComplementaryInsurance: ins.update,
    removeComplementaryInsurance: ins.remove,

    addLoyaltyCard: card.add,
    updateLoyaltyCard: card.update,
    removeLoyaltyCard: card.remove,

    addSpareKey: key.add,
    updateSpareKey: key.update,
    removeSpareKey: key.remove,

    addWorkPermit: permit.add,
    updateWorkPermit: permit.update,
    removeWorkPermit: permit.remove,

    addSwissPass: pass.add,
    updateSwissPass: pass.update,
    removeSwissPass: pass.remove,
  };
});
