import { create } from 'zustand';

interface BarStore {
  currentBarId: string | null;
  setCurrentBar: (barId: string) => void;
  leaveBar: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useBarStore = create<BarStore>((set) => ({
  currentBarId: null,
  setCurrentBar: (barId) => {
    if (typeof barId === 'string' && barId !== 'null' && barId !== 'undefined' && barId.trim() !== '') {
      set({ currentBarId: barId });
    }
  },
  leaveBar: () => set({ currentBarId: null }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
})); 