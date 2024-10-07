import { create } from 'zustand'

interface SearchState {
  search: string
}

interface SearchActions {
  setSearch: (search: string) => void
}

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
}))
