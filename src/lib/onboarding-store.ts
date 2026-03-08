import { create } from 'zustand';

export interface UserProfile {
  city: string;
  familyStatus: string;
  age: string;
  hasChildren: boolean;
  childrenCount: number;
  profession: string;
  interests: string[];
  priorities: string[];
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
