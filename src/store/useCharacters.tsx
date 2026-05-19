import { create } from 'zustand';

interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  location: { name: string; url: string };
  image: string;
}

interface CharacterStore {
  characters: Character[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  fetchData: (name: string, pageNumber?: number) => Promise<void>;
}

const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  totalPages: 0,

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
}));

export default useCharacterStore;
