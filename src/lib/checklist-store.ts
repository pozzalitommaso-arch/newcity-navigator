import { create } from 'zustand';

export interface ChecklistItem {
  text: string;
  done: boolean;
}

interface ChecklistData {
  [categoryId: string]: ChecklistItem[];
}

const defaultChecklists: ChecklistData = {
  education: [
    { text: "Research school options for your children's ages", done: false },
    { text: "Check public school assignment for your address", done: false },
    { text: "Visit prospective schools and attend open days", done: false },
    { text: "Prepare enrollment documents", done: false },
    { text: "Register for DaZ (German as second language) if needed", done: false },
    { text: "Set up school transport or Tageskarte for commute", done: false },
    { text: "Join parent association (Elternrat)", done: false },
  ],
  family: [
    { text: "Register on Kita waitlist(s)", done: false },
    { text: "Apply for childcare subsidies", done: false },
    { text: "Register for family allowances (Familienzulagen)", done: false },
    { text: "Find a pediatrician (Kinderarzt)", done: false },
    { text: "Look into parenting groups (Eltern-Kind-Zentrum)", done: false },
    { text: "Check maternity / paternity leave entitlements", done: false },
  ],
  housing: [
    { text: "Create apartment search dossier", done: false },
    { text: "Register on Homegate & ImmoScout24", done: false },
    { text: "Set up search alerts for your budget", done: false },
    { text: "Get Betreibungsauskunft (debt certificate)", done: false },
    { text: "Attend apartment viewings", done: false },
    { text: "Sign lease agreement", done: false },
    { text: "Set up Mietkautionskonto (deposit account)", done: false },
    { text: "Register at Einwohnerkontrolle", done: false },
    { text: "Set up electricity, internet, insurance", done: false },
  ],
  insurance: [
    { text: "Compare basic health insurance premiums on Comparis", done: false },
    { text: "Choose franchise level and insurance model", done: false },
    { text: "Register for Grundversicherung (mandatory health insurance)", done: false },
    { text: "Consider supplementary insurance (Zusatzversicherung)", done: false },
    { text: "Set up liability insurance (Privathaftpflicht)", done: false },
    { text: "Set up household contents insurance", done: false },
  ],
  sports: [
    { text: "Explore Uetliberg hiking trail", done: false },
    { text: "Try a local sports club trial session", done: false },
    { text: "Sign up for a gym or fitness center", done: false },
    { text: "Visit a Badi (public swimming pool)", done: false },
    { text: "Join a Verein (sports association)", done: false },
  ],
  finance: [
    { text: "Open a Swiss bank account", done: false },
    { text: "Set up salary payment to Swiss IBAN", done: false },
    { text: "Understand Swiss tax obligations", done: false },
    { text: "Set up a budget plan (CHF cost of living)", done: false },
    { text: "Research tax advisor for Steuererklärung", done: false },
    { text: "Open Pillar 3a account before year-end", done: false },
  ],
  banking: [
    { text: "Open a Swiss bank account (bring ID, permit, work contract)", done: false },
    { text: "Set up TWINT mobile payment", done: false },
    { text: "Order a debit/credit card", done: false },
    { text: "Set up e-banking and mobile app", done: false },
  ],
  pension: [
    { text: "Understand the 3-pillar system", done: false },
    { text: "Open a Pillar 3a account (VIAC or Finpension)", done: false },
    { text: "Verify Pillar 2 enrollment with employer", done: false },
    { text: "Request AHV/AVS number", done: false },
  ],
  friends: [
    { text: "Join an expat group (InterNations or Facebook)", done: false },
    { text: "Attend your first local meetup or event", done: false },
    { text: "Join a local Verein (club or association)", done: false },
    { text: "Invite a neighbor or colleague for coffee", done: false },
  ],
  events: [
    { text: "Subscribe to a local events newsletter", done: false },
    { text: "Visit Kunsthaus Zürich", done: false },
    { text: "Attend a local market or street festival", done: false },
    { text: "Check out a live music or theater show", done: false },
  ],
  "public-services": [
    { text: "Register at Einwohnerkontrolle (within 14 days)", done: false },
    { text: "Apply for / receive residence permit", done: false },
    { text: "Get a Betreibungsauskunft", done: false },
    { text: "Register for mandatory health insurance", done: false },
    { text: "Set up SBB Half-Fare card or GA", done: false },
    { text: "Register for Serafe (TV/radio fee)", done: false },
  ],
};

interface ChecklistStore {
  checklists: ChecklistData;
  toggleItem: (categoryId: string, index: number) => void;
  getCategoryProgress: (categoryId: string) => number;
  getOverallProgress: () => number;
  getCategoryStats: (categoryId: string) => { completed: number; total: number };
}

export const useChecklistStore = create<ChecklistStore>((set, get) => ({
  checklists: defaultChecklists,
  toggleItem: (categoryId, index) =>
    set((state) => {
      const items = [...(state.checklists[categoryId] || [])];
      if (items[index]) {
        items[index] = { ...items[index], done: !items[index].done };
      }
      return { checklists: { ...state.checklists, [categoryId]: items } };
    }),
  getCategoryProgress: (categoryId) => {
    const items = get().checklists[categoryId] || [];
    if (items.length === 0) return 0;
    return Math.round((items.filter((i) => i.done).length / items.length) * 100);
  },
  getOverallProgress: () => {
    const checklists = get().checklists;
    const categories = Object.keys(checklists);
    if (categories.length === 0) return 0;
    const total = categories.reduce((sum, catId) => {
      const items = checklists[catId];
      if (items.length === 0) return sum;
      return sum + (items.filter((i) => i.done).length / items.length) * 100;
    }, 0);
    return Math.round(total / categories.length);
  },
  getCategoryStats: (categoryId) => {
    const items = get().checklists[categoryId] || [];
    return { completed: items.filter((i) => i.done).length, total: items.length };
  },
}));
