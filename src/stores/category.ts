import { create } from 'zustand'

type Categories = 'All' | 'Asian' | 'African' | 'European'

interface CategoryState {
  selectedCategory: Categories
}

interface CategoryActions {
  setCategory: (category: Categories) => void
  resetCategory: () => void
}

export const useCategoryStore = create<CategoryState & CategoryActions>((set) => ({
  selectedCategory: 'All',
  setCategory: (category: Categories) => set({ selectedCategory: category }),
  resetCategory: () => set({ selectedCategory: 'All' }),
}))
