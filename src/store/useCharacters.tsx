import { create } from 'zustand';

interface Character {
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

interface CharacterStore {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  fetchData: (name: string, pageNumber?: number) => Promise<void>;
  selectedCharacter: Character | null;
  isDetailsLoading: boolean;
  detailsError: string | null;
  fetchCharacterDetails: (id: string) => Promise<void>;
  clearSelectedCharacter: () => void;
}

const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  isLoading: false,
  error: null,
  totalPages: 0,
  selectedCharacter: null,
  isDetailsLoading: false,
  detailsError: null,

  fetchData: async (name: string, pageNumber = 1) => {
    set({ isLoading: true, error: null });

    const trimmedName = name.trim();

    try {
      localStorage.setItem('searchQuery', trimmedName);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${trimmedName}&page=${pageNumber}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          set({ characters: [], isLoading: false });
          return;
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      set({
        characters: data.results,
        isLoading: false,
        totalPages: data.info.pages,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      // eslint-disable-next-line no-console
      console.error('Fetch Error:', errorMessage);
    }
  },

  fetchCharacterDetails: async (id: string) => {
    set({ isDetailsLoading: true, detailsError: null });
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      set({ selectedCharacter: data, isDetailsLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ detailsError: errorMessage, isDetailsLoading: false });
    }
  },

  clearSelectedCharacter: () =>
    set({ selectedCharacter: null, detailsError: null }),
}));

export default useCharacterStore;
