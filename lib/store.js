import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartAPI, productAPI, ShopifyAPIError } from "./api";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // Cart state
      cart: null,
      isOpen: false,
      isLoading: false,

      // Cart actions
      setCart: (cart) => set({ cart }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setLoading: (isLoading) => set({ isLoading }),

      // Initialize cart
      initCart: async () => {
        const { cart } = get();
        if (!cart) {
          const newCart = await cartAPI.create();
          set({ cart: newCart });
          return newCart;
        }
        return cart;
      },

      // Add item to cart
      addToCart: async (variantId, quantity = 1) => {
        set({ isLoading: true });

        try {
          let { cart } = get();

          // Create cart if it doesn't exist
          if (!cart) {
            cart = await get().initCart();
          }

          // Add line items to checkout
          const lineItemsToAdd = [
            {
              variantId,
              quantity: parseInt(quantity),
            },
          ];

          const updatedCart = await cartAPI.addLineItems(cart.id, lineItemsToAdd);

          set({ cart: updatedCart });
          return updatedCart;
        } catch (error) {
          console.error("Error adding to cart:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Remove item from cart
      removeFromCart: async (lineItemId) => {
        const { cart } = get();
        if (!cart) return;

        set({ isLoading: true });
        try {
          const updatedCart = await cartAPI.removeLineItems(cart.id, [lineItemId]);
          set({ cart: updatedCart });
          return updatedCart;
        } catch (error) {
          console.error("Error removing from cart:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Update item quantity in cart
      updateCartItem: async (lineItemId, quantity) => {
        const { cart } = get();
        if (!cart) return;

        set({ isLoading: true });
        try {
          const lineItemsToUpdate = [
            {
              id: lineItemId,
              quantity: parseInt(quantity),
            },
          ];

          const updatedCart = await cartAPI.updateLineItems(cart.id, lineItemsToUpdate);
          set({ cart: updatedCart });
          return updatedCart;
        } catch (error) {
          console.error("Error updating cart item:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Get cart total
      getCartTotal: () => {
        const { cart } = get();
        return cart?.totalPriceV2?.amount || "0.00";
      },

      // Get cart items count
      getCartItemsCount: () => {
        const { cart } = get();
        return cart?.lineItems?.reduce((total, item) => total + item.quantity, 0) || 0;
      },

      // Clear cart
      clearCart: async () => {
        const newCart = await cartAPI.create();
        set({ cart: newCart });
        return newCart;
      },
    }),
    {
      name: "tiktik-cart",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

// Products store
export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,

  // Actions
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // Fetch all products
  fetchProducts: async (limit = 20) => {
    set({ loading: true, error: null });
    try {
      const products = await productAPI.fetchAll(limit);

      // If no products found, load demo products for testing
      if (products.length === 0) {
        const demoResponse = await fetch('/api/products/demo');
        if (demoResponse.ok) {
          const demoData = await demoResponse.json();
          const demoProducts = demoData.data.products.slice(0, limit);
          set({ products: demoProducts, loading: false });
          return demoProducts;
        }
      }

      set({ products, loading: false });
      return products;
    } catch (error) {
      const errorMessage = error instanceof ShopifyAPIError ? error.message : "Failed to fetch products";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch single product by ID
  fetchProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const product = await productAPI.fetch(productId);
      set({ selectedProduct: product, loading: false });
      return product;
    } catch (error) {
      const errorMessage = error instanceof ShopifyAPIError ? error.message : "Failed to fetch product";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch single product by handle
  fetchProductByHandle: async (handle) => {
    set({ loading: true, error: null });
    try {
      const product = await productAPI.fetchByHandle(handle);
      set({ selectedProduct: product, loading: false });
      return product;
    } catch (error) {
      const errorMessage = error instanceof ShopifyAPIError ? error.message : "Failed to fetch product";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch related products
  fetchRelatedProducts: async (product, limit = 4) => {
    try {
      const related = await productAPI.getRelated(product, limit);
      return related;
    } catch (error) {
      console.error("Failed to fetch related products:", error);
      return [];
    }
  },

  // Search products
  searchProducts: async (query) => {
    set({ loading: true, error: null });
    try {
      const searchResults = await productAPI.search(query, 20);
      set({ products: searchResults, loading: false });
      return searchResults;
    } catch (error) {
      const errorMessage = error instanceof ShopifyAPIError ? error.message : "Failed to search products";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
