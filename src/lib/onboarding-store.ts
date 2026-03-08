import { create } from 'zustand';

export interface AddressInfo {
  street: string;
  postalCode: string;
  city: string;
}

export interface BankInfo {
  bankName: string;
  iban: string;
  accountType: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  plan: string;
}

export interface DoctorInfo {
  name: string;
  phone: string;
  clinic: string;
}

export interface EmergencyContactInfo {
  name: string;
  phone: string;
  relationship: string;
}

export interface AhvInfo {
  number: string;
}

export interface PetInfo {
  name: string;
  species: string;
  breed: string;
  chipNumber: string;
  vetName: string;
  vetPhone: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
}

export interface QuickInfo {
  address: AddressInfo;
  bank: BankInfo;
  insurance: InsuranceInfo;
  doctor: DoctorInfo;
  emergencyContact: EmergencyContactInfo;
  ahvNumber: AhvInfo;
}

export type FamilyMemberType = 'self' | 'spouse' | 'child' | 'pet';

export interface FamilyMember {
  id: string;
  type: FamilyMemberType;
  name: string;
  age?: string;
  quickInfo: QuickInfo;
  petInfo?: PetInfo;
}

export interface UserProfile {
  city: string;
  familyStatus: string;
  age: string;
  hasChildren: boolean;
  childrenCount: number;
  hasPets: boolean;
  petsCount: number;
  profession: string;
  gender: string;
  genderCustom: string;
  orientation: string;
  orientationCustom: string;
  nationality: string;
  languages: string[];
  moveReason: string;
  interests: string[];
  priorities: string[];
  quickInfo: QuickInfo;
  familyMembers: FamilyMember[];
}

interface OnboardingStore {
  step: number;
  profile: UserProfile;
  setStep: (step: number) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateQuickInfo: (data: Partial<QuickInfo>) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  removeFamilyMember: (id: string) => void;
  updateFamilyMember: (id: string, data: Partial<FamilyMember>) => void;
  updateFamilyMemberQuickInfo: (id: string, data: Partial<QuickInfo>) => void;
  updateFamilyMemberPetInfo: (id: string, data: Partial<PetInfo>) => void;
  reset: () => void;
}

const defaultQuickInfo: QuickInfo = {
  address: { street: '', postalCode: '', city: '' },
  bank: { bankName: '', iban: '', accountType: '' },
  insurance: { provider: '', policyNumber: '', plan: '' },
  doctor: { name: '', phone: '', clinic: '' },
  emergencyContact: { name: '', phone: '', relationship: '' },
  ahvNumber: { number: '' },
};

export const defaultPetInfo: PetInfo = {
  name: '',
  species: '',
  breed: '',
  chipNumber: '',
  vetName: '',
  vetPhone: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
};

const defaultProfile: UserProfile = {
  city: '',
  familyStatus: '',
  age: '',
  hasChildren: false,
  childrenCount: 0,
  hasPets: false,
  petsCount: 0,
  profession: '',
  gender: '',
  genderCustom: '',
  orientation: '',
  orientationCustom: '',
  nationality: '',
  languages: [],
  moveReason: '',
  interests: [],
  priorities: [],
  quickInfo: defaultQuickInfo,
  familyMembers: [],
};

let memberIdCounter = 0;
function generateId() {
  memberIdCounter++;
  return `member-${Date.now()}-${memberIdCounter}`;
}

export { defaultQuickInfo };

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 0,
  profile: defaultProfile,
  setStep: (step) => set({ step }),
  updateProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),
  updateQuickInfo: (data) =>
    set((state) => ({ profile: { ...state.profile, quickInfo: { ...state.profile.quickInfo, ...data } } })),
  addFamilyMember: (member) =>
    set((state) => ({
      profile: {
        ...state.profile,
        familyMembers: [...state.profile.familyMembers, { ...member, id: generateId() }],
      },
    })),
  removeFamilyMember: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        familyMembers: state.profile.familyMembers.filter((m) => m.id !== id),
      },
    })),
  updateFamilyMember: (id, data) =>
    set((state) => ({
      profile: {
        ...state.profile,
        familyMembers: state.profile.familyMembers.map((m) =>
          m.id === id ? { ...m, ...data } : m
        ),
      },
    })),
  updateFamilyMemberQuickInfo: (id, data) =>
    set((state) => ({
      profile: {
        ...state.profile,
        familyMembers: state.profile.familyMembers.map((m) =>
          m.id === id ? { ...m, quickInfo: { ...m.quickInfo, ...data } } : m
        ),
      },
    })),
  updateFamilyMemberPetInfo: (id, data) =>
    set((state) => ({
      profile: {
        ...state.profile,
        familyMembers: state.profile.familyMembers.map((m) =>
          m.id === id ? { ...m, petInfo: { ...(m.petInfo || defaultPetInfo), ...data } } : m
        ),
      },
    })),
  reset: () => set({ step: 0, profile: defaultProfile }),
}));
