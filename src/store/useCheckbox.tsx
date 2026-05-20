import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckboxStore {
  unselectAll: () => void;
  selectedIds: string[];
  handleCheckboxChange: (id: string) => void;
}

const useCheckboxStore = create<CheckboxStore>()(
  persist(
    (set) => ({
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
    }),
    { name: 'chechbox-storage' }
  )
);

export default useCheckboxStore;
