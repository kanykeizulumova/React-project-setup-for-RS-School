import { create } from 'zustand';

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
  origin: { name: string; url: string };
  episode: string[];
  url: string;
}

interface CheckboxStore {
  unselectAll: () => void;
  selectedIds: string[];
  handleCheckboxChange: (id: string) => void;
  getSelectedCards: () => Promise<Character[]>;
}

const useCheckboxStore = create<CheckboxStore>((set, get) => ({
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

  getSelectedCards: async () => {
    const ids = get().selectedIds;
    if (ids.length === 0) return [];

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${ids.join(',')}`
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Fetch selected cards error:', err);
      return [];
    }
  },
}));

export default useCheckboxStore;
