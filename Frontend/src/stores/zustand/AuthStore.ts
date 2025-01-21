import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import User from '../../types/User';

type AuthStoreState = {
  isLoggedIn: boolean;
  user: User | null;
};

type AuthStoreAction = {
  setIsLoggedIn: (isLoggedIn: AuthStoreState['isLoggedIn']) => void;
  updateUser: (user: User | null) => void;
};

const useAuthStore = create<AuthStoreState & AuthStoreAction>(
  (persist as any)(
    //@ts-ignore
    set => ({
      isLoggedIn: false,
      user: null,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      updateUser: (user: User | null) => set({ user }),
      updateUsername: (username: String) =>
        set((state: AuthStoreState) => ({ user: { ...state.user, username } })),
      updateEmail: (email: String) =>
        set((state: AuthStoreState) => ({ user: { ...state.user, email } })),
    }),
    { name: 'authStore' },
  ),
);

export default useAuthStore;
