import client from "./shopify";

// API Error handling utility
export class ShopifyAPIError extends Error {
  constructor(message, code = "SHOPIFY_API_ERROR", details = null) {
    super(message);
    this.name = "ShopifyAPIError";
    this.code = code;
    this.details = details;
  }
}

// Wrapper for Shopify API calls with error handling
export const shopifyApiCall = async (apiCall, errorMessage = "API call failed") => {
  try {
    return await apiCall();
  } catch (error) {
    console.error(`${errorMessage}:`, error);

    // Handle different types of errors
    if (error.networkError) {
      throw new ShopifyAPIError(
        "Network error. Please check your connection.",
        "NETWORK_ERROR",
        error
      );
    }

    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const graphQLError = error.graphQLErrors[0];
      throw new ShopifyAPIError(
        graphQLError.message || "GraphQL API error",
        "GRAPHQL_ERROR",
        error
      );
    }

    if (error.message) {
      throw new ShopifyAPIError(error.message, "API_ERROR", error);
    }

    throw new ShopifyAPIError(errorMessage, "UNKNOWN_ERROR", error);
  }
};

// Product API functions
export const productAPI = {
  // Fetch all products with error handling
  fetchAll: async (limit = 20) => {
    return shopifyApiCall(
      () => client.product.fetchAll(limit),
      "Failed to fetch products"
    );
  },

  // Fetch single product with error handling
  fetch: async (productId) => {
    return shopifyApiCall(
      () => client.product.fetch(productId),
      "Failed to fetch product"
    );
  },

  // Fetch product by handle
  fetchByHandle: async (handle) => {
    return shopifyApiCall(
      async () => {
        // Since Shopify Buy SDK doesn't have direct fetchByHandle,
        // we fetch all products and find the one with matching handle
        const products = await client.product.fetchAll(100);
        const product = products.find(p => p.handle === handle);
        if (!product) {
          throw new Error(`Product with handle "${handle}" not found`);
        }
        return product;
      },
      "Failed to fetch product by handle"
    );
  },

  // Fetch products by collection
  fetchByCollection: async (collectionId, limit = 20) => {
    return shopifyApiCall(
      () => client.collection.fetchWithProducts(collectionId, { productsFirst: limit }),
      "Failed to fetch products by collection"
    );
  },

  // Search products
  search: async (query, limit = 20) => {
    return shopifyApiCall(
      async () => {
        const products = await client.product.fetchAll(limit * 2);
        return products.filter(product => {
          const title = product.title || '';
          const description = product.description || '';
          const vendor = product.vendor || '';
          const tags = Array.isArray(product.tags) ? product.tags : [];

          return title.toLowerCase().includes(query.toLowerCase()) ||
                 description.toLowerCase().includes(query.toLowerCase()) ||
                 tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
                 vendor.toLowerCase().includes(query.toLowerCase());
        }).slice(0, limit);
      },
      "Failed to search products"
    );
  },

  // Get related products (by tags, vendor, or product type)
  getRelated: async (product, limit = 4) => {
    return shopifyApiCall(
      async () => {
        const allProducts = await client.product.fetchAll(50);

        // Filter out the current product and find related ones
        const related = allProducts
          .filter(p => p.id !== product.id)
          .map(p => {
            let score = 0;

            // Score by shared tags (safely handle undefined tags)
            const productTags = Array.isArray(product.tags) ? product.tags : [];
            const pTags = Array.isArray(p.tags) ? p.tags : [];
            const sharedTags = productTags.filter(tag => pTags.includes(tag));
            score += sharedTags.length * 3;

            // Score by same vendor
            if (p.vendor && product.vendor && p.vendor === product.vendor) score += 2;

            // Score by same product type
            if (p.productType && product.productType && p.productType === product.productType) score += 1;

            return { product: p, score };
          })
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(item => item.product);

        return related;
      },
      "Failed to fetch related products"
    );
  }
};

// Cart API functions
export const cartAPI = {
  // Create new checkout
  create: async () => {
    return shopifyApiCall(
      () => client.checkout.create(),
      "Failed to create cart"
    );
  },

  // Add items to cart
  addLineItems: async (checkoutId, lineItems) => {
    return shopifyApiCall(
      () => client.checkout.addLineItems(checkoutId, lineItems),
      "Failed to add items to cart"
    );
  },

  // Remove items from cart
  removeLineItems: async (checkoutId, lineItemIds) => {
    return shopifyApiCall(
      () => client.checkout.removeLineItems(checkoutId, lineItemIds),
      "Failed to remove items from cart"
    );
  },

  // Update cart items
  updateLineItems: async (checkoutId, lineItems) => {
    return shopifyApiCall(
      () => client.checkout.updateLineItems(checkoutId, lineItems),
      "Failed to update cart items"
    );
  },

  // Fetch existing checkout
  fetch: async (checkoutId) => {
    return shopifyApiCall(
      () => client.checkout.fetch(checkoutId),
      "Failed to fetch cart"
    );
  }
};

// Collections API functions
export const collectionAPI = {
  // Fetch all collections
  fetchAll: async () => {
    return shopifyApiCall(
      () => client.collection.fetchAll(),
      "Failed to fetch collections"
    );
  },

  // Fetch single collection with products
  fetchWithProducts: async (collectionId, options = {}) => {
    return shopifyApiCall(
      () => client.collection.fetchWithProducts(collectionId, options),
      "Failed to fetch collection with products"
    );
  }
};

// Utility functions for data formatting
export const formatPrice = (priceV2) => {
  if (!priceV2) return "0.00";
  return parseFloat(priceV2.amount).toFixed(2);
};

export const formatCurrency = (amount, currencyCode = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

// Check if environment variables are configured
export const checkShopifyConfig = () => {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new ShopifyAPIError(
      "Shopify configuration missing. Please check environment variables.",
      "CONFIG_ERROR"
    );
  }

  return { domain, token };
};