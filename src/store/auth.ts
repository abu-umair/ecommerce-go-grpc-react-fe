import { create } from "zustand";

interface AuthStoreState {
    isLoggedIn: boolean;
    login: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    isLoggedIn: false,
    login: () => set(state => {
        return {
            ...state,
            isLoggedIn: true,
        }
    })
}));