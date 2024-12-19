import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  tableDetails: null,
  tableNumber: null,
};

const useTableStore = create(
  persist(
    (set) => ({
      ...initialState,
      setTableDetails: (tableDetails) => set({ tableDetails }),
      setTableNumber: (tableNumber) => set({ tableNumber }),
      resetStore: () => set(initialState),
    }),
    {
      name: 'table-store',
      skipHydration: false,
      version: 1, // For future migrations
      partialize: (state) => ({
        tableNumber: state.tableNumber,
        tableDetails: state.tableDetails,
      }),
    }
  )
);

export default useTableStore;
