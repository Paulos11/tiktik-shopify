import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartAPI, productAPI, ShopifyAPIError } from "./api";
import { authAPI } from "./shopify-auth";
import { initiateCheckout } from "./checkout";

// Helper to normalize Shopify Buy SDK product data
const normalizeProduct = (product) => {
  if (!product) return null;

  return {
    ...product,
    // Ensure images array exists
    images: product.images?.edges
      ? product.images.edges.map((e) => e.node)
      : product.images || [],
    // Ensure variants array exists
    variants: product.variants?.edges
      ? product.variants.edges.map((e) => e.node)
      : product.variants || [],
    // Ensure options array exists
    options: product.options || [],
    // Ensure other fields
    tags: product.tags || [],
    vendor: product.vendor || "",
    productType: product.productType || "",
  };
};

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

          const updatedCart = await cartAPI.addLineItems(
            cart.id,
            lineItemsToAdd
          );

          set({ cart: updatedCart, isOpen: true });
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
          const updatedCart = await cartAPI.removeLineItems(cart.id, [
            lineItemId,
          ]);
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

          const updatedCart = await cartAPI.updateLineItems(
            cart.id,
            lineItemsToUpdate
          );
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
        return (
          cart?.lineItems?.reduce((total, item) => total + item.quantity, 0) ||
          0
        );
      },

      // Clear cart
      clearCart: async () => {
        const newCart = await cartAPI.create();
        set({ cart: newCart });
        return newCart;
      },

      // Checkout
      checkout: async () => {
        const { cart } = get();
        const { accessToken } = useAuthStore.getState();

        set({ isLoading: true });

        try {
          if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
            throw new Error('Cart is empty');
          }

          // Initiate checkout with Shopify
          await initiateCheckout(cart, accessToken);

          // The function above will redirect to Shopify checkout
          // So we don't need to do anything else here
        } catch (error) {
          console.error('Checkout error:', error);
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "tiktik-cart",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

// Products store
export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,

  // Actions
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedProduct: (product) =>
    set({ selectedProduct: normalizeProduct(product) }),

  // Fetch all products
  fetchProducts: async (limit = 20) => {
    set({ loading: true, error: null });
    try {
      console.log("Fetching products from Shopify...");
      const rawProducts = await productAPI.fetchAll(limit);

      console.log("Raw products from API:", rawProducts);
      console.log("Products count:", rawProducts?.length);

      // Normalize products
      const normalizedProducts = rawProducts.map(normalizeProduct);

      console.log("Normalized products:", normalizedProducts);

      set({ products: normalizedProducts, loading: false });
      return normalizedProducts;
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      const errorMessage =
        error instanceof ShopifyAPIError
          ? error.message
          : "Failed to fetch products";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch single product by ID
  fetchProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const product = await productAPI.fetch(productId);
      const normalized = normalizeProduct(product);
      set({ selectedProduct: normalized, loading: false });
      return normalized;
    } catch (error) {
      const errorMessage =
        error instanceof ShopifyAPIError
          ? error.message
          : "Failed to fetch product";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch single product by handle
  fetchProductByHandle: async (handle) => {
    set({ loading: true, error: null });
    try {
      const product = await productAPI.fetchByHandle(handle);
      const normalized = normalizeProduct(product);
      set({ selectedProduct: normalized, loading: false });
      return normalized;
    } catch (error) {
      const errorMessage =
        error instanceof ShopifyAPIError
          ? error.message
          : "Failed to fetch product";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Fetch related products
  fetchRelatedProducts: async (product, limit = 4) => {
    try {
      const related = await productAPI.getRelated(product, limit);
      return related.map(normalizeProduct);
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
      const normalized = searchResults.map(normalizeProduct);
      set({ products: normalized, loading: false });
      return normalized;
    } catch (error) {
      const errorMessage =
        error instanceof ShopifyAPIError
          ? error.message
          : "Failed to search products";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

// Authentication store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTokens: (accessToken, refreshToken = null) =>
        set({ accessToken, refreshToken }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Login with email and password (Storefront API)
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          // Create customer access token
          const result = await authAPI.createAccessToken(email, password);

          if (result?.customerUserErrors?.length > 0) {
            throw new Error(result.customerUserErrors[0].message);
          }

          if (!result?.customerAccessToken) {
            throw new Error('Failed to authenticate');
          }

          const accessToken = result.customerAccessToken.accessToken;

          // Get customer details
          const customer = await authAPI.getCustomer(accessToken);

          if (!customer) {
            throw new Error('Failed to fetch customer data');
          }

          set({
            user: customer,
            accessToken,
            isAuthenticated: true,
            isLoading: false
          });

          return customer;
        } catch (error) {
          console.error('Login error:', error);
          set({
            error: error.message || 'Login failed',
            isLoading: false,
            isAuthenticated: false,
            user: null,
            accessToken: null
          });
          throw error;
        }
      },

      // Register new customer
      register: async (firstName, lastName, email, password) => {
        set({ isLoading: true, error: null });

        try {
          // Create customer account
          const result = await authAPI.createCustomer(firstName, lastName, email, password);

          if (result?.customerUserErrors?.length > 0) {
            throw new Error(result.customerUserErrors[0].message);
          }

          if (!result?.customer) {
            throw new Error('Failed to create account');
          }

          // Auto-login after successful registration
          await get().login(email, password);

          return result.customer;
        } catch (error) {
          console.error('Registration error:', error);
          set({
            error: error.message || 'Registration failed',
            isLoading: false
          });
          throw error;
        }
      },

      // Get customer orders
      getOrders: async (first = 10) => {
        const { accessToken } = get();
        if (!accessToken) {
          throw new Error('Not authenticated');
        }

        try {
          return await authAPI.getCustomerOrders(accessToken, first);
        } catch (error) {
          console.error('Error fetching orders:', error);
          throw new Error('Failed to fetch orders');
        }
      },

      // Update customer profile
      updateProfile: async (input) => {
        const { accessToken } = get();
        if (!accessToken) {
          throw new Error('Not authenticated');
        }

        set({ isLoading: true, error: null });

        try {
          const result = await authAPI.updateCustomer(accessToken, input);

          if (result?.customerUserErrors?.length > 0) {
            throw new Error(result.customerUserErrors[0].message);
          }

          if (!result?.customer) {
            throw new Error('Failed to update profile');
          }

          set({
            user: result.customer,
            isLoading: false
          });

          return result.customer;
        } catch (error) {
          console.error('Profile update error:', error);
          set({
            error: error.message || 'Failed to update profile',
            isLoading: false
          });
          throw error;
        }
      },

      // Reset password
      resetPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
          const result = await authAPI.recoverPassword(email);

          if (result?.customerUserErrors?.length > 0) {
            throw new Error(result.customerUserErrors[0].message);
          }

          set({ isLoading: false });
          return true;
        } catch (error) {
          console.error('Password reset error:', error);
          set({
            error: error.message || 'Failed to send reset email',
            isLoading: false
          });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        const { accessToken } = get();

        if (accessToken) {
          try {
            // Revoke the access token
            await authAPI.deleteAccessToken(accessToken);
          } catch (error) {
            console.error('Error revoking token:', error);
          }
        }

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      },

      // Check if token is still valid
      validateToken: async () => {
        const { accessToken } = get();
        if (!accessToken) return false;

        try {
          const customer = await authAPI.getCustomer(accessToken);
          return !!customer;
        } catch (error) {
          console.error('Token validation error:', error);
          // If token is invalid, logout
          get().logout();
          return false;
        }
      },

      // Initialize auth state (check for existing valid tokens)
      initAuth: async () => {
        const { accessToken } = get();
        if (accessToken) {
          const isValid = await get().validateToken();
          if (!isValid) {
            get().logout();
          }
        }
      },
    }),
    {
      name: "tiktik-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
