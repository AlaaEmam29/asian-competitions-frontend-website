import { create } from 'zustand'

 
interface CategoryState {
  selectedCategory: number
}

interface CategoryActions {
  setCategory: (category: number) => void
  resetCategory: () => void
}

export const useCategoryStore = create<CategoryState & CategoryActions>((set) => ({
  selectedCategory: 0,
  setCategory: (category: number) => set({ selectedCategory: category }),
  resetCategory: () => set({ selectedCategory: 0 }),
}))
