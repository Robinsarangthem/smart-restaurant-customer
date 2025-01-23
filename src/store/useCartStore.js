import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getItemCount = (cart) => {
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  // return cart.reduce((total, item) => total + 1, 0);
};

// Zustand store with persistence middleware
// persist middleware allows the store data to be saved to localStorage
// and rehydrated on page reload
const useCartStore = create(
  persist(
    // Store configuration function receives set (to update state) and get (to read state)
    (set, get) => ({
      // Initial state
      cart: [], // Array to store cart items
      itemCount: 0, // Total count of items in cart

      // Add item to cart
      addToCart: (item) => {
        // Validate item has an _id
        if (!item?._id) {
          console.error('Invalid item: missing _id');
          return;
        }
        // Update state using set function
        set((state) => {
          // Check if item already exists in cart
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id
          );

          // If item exists, increment quantity, otherwise add new item
          const newCart = existingItem
            ? state.cart.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                  : cartItem
              )
            : [...state.cart, { ...item, quantity: 1 }];

          // Calculate new total item count by summing all quantities
          return { cart: newCart, itemCount: getItemCount(newCart) };
        });
      },

      // Remove item from cart by ID
      removeFromCart: (itemId) => {
        if (!itemId) {
          console.error('Invalid item: missing _id');
          return;
        }
        set((state) => {
          // Filter out item with matching ID
          const newCart = state.cart.filter((item) => item._id !== itemId);
          // Recalculate total item count
          return { cart: newCart, itemCount: getItemCount(newCart) };
        });
      },

      // increase quantity of specific item
      increaseQuantity: (itemId) => {
        set((state) => {
          const newCart = state.cart.map((item) =>
            item._id === itemId
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
          return { cart: newCart, itemCount: getItemCount(newCart) };
        });
      },

      // decrease quantity of specific item
      decreaseQuantity: (itemId) => {
        set((state) => {
          // if the current quantity is 1, remove the item from cart
          const item = state.cart.find((item) => item._id === itemId);
          if (!item) return;
          if (item.quantity === 1) {
            const newCart = state.cart.filter((item) => item._id !== itemId);
            const newItemCount = getItemCount(newCart);

            return { cart: newCart, itemCount: newItemCount };
          }

          const newCart = state.cart.map((item) =>
            item._id === itemId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );

          return { cart: newCart, itemCount: getItemCount(newCart) };
        });
      },

      // Update quantity of specific item
      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return; // Prevent negative quantities
        set((state) => {
          // Map through cart and update quantity of matching item
          const newCart = state.cart.map((item) =>
            item._id === itemId ? { ...item, quantity } : item
          );
          // Recalculate total item count
          const newItemCount = getItemCount(newCart);
          return { cart: newCart, itemCount: newItemCount };
        });
      },

      // get cart item
      getCartItem: (itemId) => {
        const state = get();
        return state.cart.find((item) => item._id === itemId);
      },

      // Clear entire cart
      clearCart: () => set({ cart: [], itemCount: 0 }),

      // Calculate total price of cart
      getCartTotal: () => {
        const state = get(); // Get current state
        return state.cart.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        );
      },
    }),
    {
      // Configuration for persist middleware
      name: 'cart-storage', // Storage key in localStorage
      skipHydration: false, // Enable automatic rehydration of store on page load
    }
  )
);

export default useCartStore;
