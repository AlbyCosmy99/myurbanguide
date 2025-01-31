import { create } from 'zustand';

interface SearchState {
    isSearchFocused: boolean;
    setIsSearchFocused: (value: boolean) => void;
}

const useSearchStore = create<SearchState>((set) => ({
    isSearchFocused: false,
    setIsSearchFocused: (value) => set({ isSearchFocused: value }),
}));

export default useSearchStore;