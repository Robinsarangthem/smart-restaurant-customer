import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  customerId: null,
  restaurantId: null,
  tableId: null,
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Setters
      setCustomerId: (customerId) => set({ customerId }),
      setRestaurantId: (restaurantId) => set({ restaurantId }),
      setTableId: (tableId) => set({ tableId }),

      // Reset state
      reset: () => set(initialState),

      // Check if authenticated
      isAuthenticated: () => {
        const { customerId, restaurantId, tableId } = get();
        return Boolean(customerId && restaurantId && tableId);
      },

      // Update multiple fields
      updateAuth: (fields) => {
        set((state) => ({
          ...state,
          ...fields,
        }));
      },
    }),
    {
      name: 'user',
      skipHydration: false,
      version: 1, // For migrations
      partialize: (state) => ({
        customerId: state.customerId,
        restaurantId: state.restaurantId,
        tableId: state.tableId,
      }),
    }
  )
);

export default useAuthStore;
