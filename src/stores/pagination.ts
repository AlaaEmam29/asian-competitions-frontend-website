import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  setHasPreviousPage: (hasPrevious: boolean) => void;
  setHasNextPage: (hasNext: boolean) => void;
  reset: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  hasPreviousPage: false,
  hasNextPage: true,
  setPage: (page: number) => set({ currentPage: page }),
  incrementPage: () =>
    set((state) => ({
      currentPage: state.currentPage + 1,
      hasPreviousPage: true,
    })),
  decrementPage: () =>
    set((state) => ({
      currentPage: Math.max(1, state.currentPage - 1),
      hasNextPage: true,
    })),
  setHasPreviousPage: (hasPrevious: boolean) => set({ hasPreviousPage: hasPrevious }),
  setHasNextPage: (hasNext: boolean) => set({ hasNextPage: hasNext }),
  reset: () =>
    set({
      currentPage: 1,
      hasPreviousPage: false,
      hasNextPage: true,
    }),
}));
