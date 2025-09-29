import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Product utility functions
export function getProductPrice(product) {
  if (!product || !product.variants || product.variants.length === 0) {
    return { min: "0.00", max: "0.00", currency: "USD" };
  }

  const prices = product.variants
    .filter(variant => variant.availableForSale)
    .map(variant => parseFloat(variant.priceV2?.amount || "0"));

  if (prices.length === 0) {
    return { min: "0.00", max: "0.00", currency: "USD" };
  }

  const min = Math.min(...prices).toFixed(2);
  const max = Math.max(...prices).toFixed(2);
  const currency = product.variants[0]?.priceV2?.currencyCode || "USD";

  return { min, max, currency };
}

export function getVariantByOptions(product, selectedOptions) {
  if (!product?.variants || !selectedOptions) return null;

  return product.variants.find(variant => {
    if (!variant.selectedOptions) return false;

    return Object.entries(selectedOptions).every(([optionName, optionValue]) => {
      if (Array.isArray(variant.selectedOptions)) {
        return variant.selectedOptions.some(option =>
          option.name?.toLowerCase() === optionName.toLowerCase() &&
          option.value?.toLowerCase() === optionValue.toLowerCase()
        );
      } else if (typeof variant.selectedOptions === 'object') {
        const variantOption = variant.selectedOptions[optionName];
        if (typeof variantOption === 'object' && variantOption.value) {
          return variantOption.value.toLowerCase() === optionValue.toLowerCase();
        }
        return variantOption?.toLowerCase() === optionValue.toLowerCase();
      }
      return false;
    });
  });
}

export function getAvailableOptionsForVariant(product, selectedOptions) {
  if (!product?.variants || !product?.options) return {};

  const availableOptions = {};

  product.options.forEach(option => {
    availableOptions[option.name] = [];

    option.values.forEach(value => {
      const testOptions = { ...selectedOptions, [option.name]: value };
      const hasVariant = product.variants.some(variant => {
        if (!variant.availableForSale || !variant.selectedOptions) return false;

        return Object.entries(testOptions).every(([name, val]) => {
          if (Array.isArray(variant.selectedOptions)) {
            return variant.selectedOptions.some(opt =>
              opt.name?.toLowerCase() === name.toLowerCase() &&
              opt.value?.toLowerCase() === val.toLowerCase()
            );
          } else if (typeof variant.selectedOptions === 'object') {
            const variantOption = variant.selectedOptions[name];
            if (typeof variantOption === 'object' && variantOption.value) {
              return variantOption.value.toLowerCase() === val.toLowerCase();
            }
            return variantOption?.toLowerCase() === val.toLowerCase();
          }
          return false;
        });
      });

      if (hasVariant) {
        availableOptions[option.name].push(value);
      }
    });
  });

  return availableOptions;
}

export function formatProductHandle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function isProductOnSale(variant) {
  if (!variant) return false;
  return variant.compareAtPriceV2 &&
         parseFloat(variant.compareAtPriceV2.amount) > parseFloat(variant.priceV2?.amount || "0");
}

export function getSalePercentage(variant) {
  if (!isProductOnSale(variant)) return 0;

  const originalPrice = parseFloat(variant.compareAtPriceV2.amount);
  const salePrice = parseFloat(variant.priceV2?.amount || "0");

  return Math.round((1 - salePrice / originalPrice) * 100);
}

export function getProductAvailability(product) {
  if (!product?.variants) return { available: false, totalInventory: 0 };

  const availableVariants = product.variants.filter(v => v.availableForSale);
  const totalInventory = product.variants.reduce(
    (sum, variant) => sum + (variant.quantityAvailable || 0),
    0
  );

  return {
    available: availableVariants.length > 0,
    totalInventory,
    hasMultipleVariants: product.variants.length > 1,
    availableVariants: availableVariants.length
  };
}
