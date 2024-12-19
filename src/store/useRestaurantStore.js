import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  restaurantDetails: null,
  restaurantSlug: null,
};

const useRestaurantStore = create(
  persist(
    (set) => ({
      ...initialState,
      setRestaurantDetails: (restaurantDetails) => set({ restaurantDetails }),
      setRestaurantSlug: (restaurantSlug) => set({ restaurantSlug }),

      resetStore: () => set(initialState),
    }),
    {
      name: 'restaurant-store',
      skipHydration: false,
      version: 1, // For future migrations
      partialize: (state) => ({
        restaurantDetails: state.restaurantDetails,
      }),
    }
  )
);

export default useRestaurantStore;
