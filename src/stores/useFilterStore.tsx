'use client';

import { create } from 'zustand';

type FilterStoreProps = {
  filters: {
    info: boolean;
    error: boolean;
    warn: boolean;
    debug: boolean;
  };
  setFilters: (filters: FilterStoreProps['filters']) => void;
  resetFilters: () => void;
};

const useFilterStore = create<FilterStoreProps>((set, get) => ({
  filters: {
    info: false,
    error: false,
    warn: false,
    debug: false,
  },
  setFilters: filters => set({ filters }),
  resetFilters: () =>
    set({
      filters: { info: false, error: false, warn: false, debug: false },
    }),
}));

export { useFilterStore };
export type { FilterStoreProps };
