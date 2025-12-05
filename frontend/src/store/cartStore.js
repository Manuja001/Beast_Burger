import { create } from "zustand";
import { persist } from "zustand/middleware";

// Frontend-only cart store using Zustand with localStorage persistence
// Backend integration will be added later
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to cart
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            // If item already exists, increase quantity
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          } else {
            // If item doesn't exist, add it with quantity 1
            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }
        });
      },
      
      // Remove item from cart
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },
      
      // Update item quantity
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== itemId),
          }));
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          }));
        }
      },
      
      // Clear entire cart
      clearCart: () => {
        set({ items: [] });
      },
      
      // Get total number of items in cart
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
      
      // Get total price of all items in cart
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "beast-burger-cart", // localStorage key
    }
  )
);

export default useCartStore;
