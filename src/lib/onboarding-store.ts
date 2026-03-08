import { create } from 'zustand';

export interface QuickInfo {
  address: string;
  bank: string;
  insurance: string;
  doctor: string;
  emergencyContact: string;
  ahvNumber: string;
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
  reset: () => void;
}

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
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 0,
  profile: defaultProfile,
  setStep: (step) => set({ step }),
  updateProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),
  reset: () => set({ step: 0, profile: defaultProfile }),
}));
