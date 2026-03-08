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

export interface QuickInfo {
  address: AddressInfo;
  bank: BankInfo;
  insurance: InsuranceInfo;
  doctor: DoctorInfo;
  emergencyContact: EmergencyContactInfo;
  ahvNumber: AhvInfo;
}

export interface UserProfile {
  city: string;
  familyStatus: string;
  age: string;
  hasChildren: boolean;
  childrenCount: number;
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
}

interface OnboardingStore {
  step: number;
  profile: UserProfile;
  setStep: (step: number) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateQuickInfo: (data: Partial<QuickInfo>) => void;
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

const defaultProfile: UserProfile = {
  city: '',
  familyStatus: '',
  age: '',
  hasChildren: false,
  childrenCount: 0,
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
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 0,
  profile: defaultProfile,
  setStep: (step) => set({ step }),
  updateProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),
  updateQuickInfo: (data) =>
    set((state) => ({ profile: { ...state.profile, quickInfo: { ...state.profile.quickInfo, ...data } } })),
  reset: () => set({ step: 0, profile: defaultProfile }),
}));
