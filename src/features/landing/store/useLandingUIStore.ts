import { create } from "zustand";
import type { LandingSectionId } from "../types";

interface LandingUIState {
  mobileNavOpen: boolean;
  activeSection: LandingSectionId;
  setActiveSection: (section: LandingSectionId) => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
}

export const useLandingUIStore = create<LandingUIState>((set) => ({
  mobileNavOpen: false,
  activeSection: "services",
  setActiveSection: (section) => set({ activeSection: section }),
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleMobileNav: () => set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
}));
