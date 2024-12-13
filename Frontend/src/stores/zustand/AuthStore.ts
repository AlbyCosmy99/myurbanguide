import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStoreState = {
    isLoggedIn: boolean;
    user: {
        username: string;
        email: string;
    } | null
};

type AuthStoreAction = {
    setIsLoggedIn: (isLoggedIn: AuthStoreState['isLoggedIn']) => void;
    updateUsername: (username: string) => void;
    updateEmail: (email: string) => void;
}

const useAuthStore = create<AuthStoreState & AuthStoreAction>(
    (persist as any)(
        //@ts-ignore
        set => ({
            isLoggedIn: false,
            user: {
                username: '',
                email: ''
            },
            setIsLoggedIn: (isLoggedIn: boolean) => set(({ isLoggedIn })),
            updateUsername: (username: String) => set((state: AuthStoreState) => ({ user: { ...state.user, username } })),
            updateEmail: (email: String) => set((state: AuthStoreState) => ({ user: { ...state.user, email } })),
        }),
        { name: 'authStore' },
    ),
);

export default useAuthStore;
