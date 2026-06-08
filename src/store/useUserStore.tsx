import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserStore {
  users: NewUser[];
  addUser: (newUser?: Partial<Omit<NewUser, 'id'>>) => void;
  removeUser: (id: number) => void;
}
interface NewUser {
  id: number;
  fullName?: string;
  email?: string;
  age?: number;
  gender?: string;
  terms?: boolean;
  image?: string;
  password?: string;
  country?: string;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],

      addUser: (newUser?: Partial<Omit<NewUser, 'id'>>) =>
        set((state) => ({
          users: [...state.users, { ...(newUser ?? {}), id: Date.now() }],
        })),

      removeUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
