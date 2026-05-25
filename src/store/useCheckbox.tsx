import { create } from 'zustand';

export interface CheckboxStore {
  selectedIds: string[];
  handleCheckboxChange: (id: string) => void;
  unselectAll: () => void;
}

const useCheckboxStore = create<CheckboxStore>((set) => ({
  selectedIds: [],

  unselectAll: () => set({ selectedIds: [] }),

  handleCheckboxChange: (cardId) =>
    set((state) => {
      if (state.selectedIds.includes(cardId)) {
        return {
          selectedIds: state.selectedIds.filter((id) => id !== cardId),
        };
      }
      return { selectedIds: [...state.selectedIds, cardId] };
    }),
}));

export default useCheckboxStore;
