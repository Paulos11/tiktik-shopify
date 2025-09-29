"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingBag,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus
} from "lucide-react";

export default function ProductDetails({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addToCart, isLoading, getCartItemsCount } = useCartStore();

  // Initialize selected variant and options
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const firstAvailableVariant = product.variants.find(v => v.availableForSale) || product.variants[0];
      setSelectedVariant(firstAvailableVariant);

      // Set initial options based on first variant
      if (firstAvailableVariant && product.options && firstAvailableVariant.selectedOptions) {
        const initialOptions = {};
        if (Array.isArray(firstAvailableVariant.selectedOptions)) {
          firstAvailableVariant.selectedOptions.forEach((option) => {
            initialOptions[option.name] = option.value;
          });
        } else if (typeof firstAvailableVariant.selectedOptions === 'object') {
          // Handle case where selectedOptions might be an object
          Object.entries(firstAvailableVariant.selectedOptions).forEach(([key, value]) => {
            if (typeof value === 'object' && value.value) {
              initialOptions[key] = value.value;
            } else {
              initialOptions[key] = value;
            }
          });
        }
        setSelectedOptions(initialOptions);
      }
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const {
    title,
    description,
    variants = [],
    options = [],
    tags = [],
    vendor,
    productType
  } = product;

  const handleOptionChange = (optionName, value) => {
    const newSelectedOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newSelectedOptions);

    // Find variant that matches all selected options
    const matchingVariant = variants.find(variant => {
      if (!variant.selectedOptions) return false;

      if (Array.isArray(variant.selectedOptions)) {
        return variant.selectedOptions.every(option =>
          newSelectedOptions[option.name] === option.value
        );
      } else if (typeof variant.selectedOptions === 'object') {
        return Object.entries(newSelectedOptions).every(([optName, optValue]) => {
          const variantOption = variant.selectedOptions[optName];
          if (typeof variantOption === 'object' && variantOption.value) {
            return variantOption.value === optValue;
          }
          return variantOption === optValue;
        });
      }
      return false;
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    try {
      await addToCart(selectedVariant.id, quantity);
      // Could show success toast here
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Could show error toast here
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const currentPrice = selectedVariant?.priceV2?.amount || "0.00";
  const compareAtPrice = selectedVariant?.compareAtPriceV2?.amount;
  const isOnSale = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(currentPrice);
  const isAvailable = selectedVariant?.availableForSale !== false;
  const isNew = Array.isArray(tags) && (tags.includes("new") || tags.includes("NEW"));
  const isBestseller = Array.isArray(tags) && (tags.includes("bestseller") || tags.includes("BESTSELLER"));

  return (
    <div className="space-y-6">
      {/* Product Title and Badges */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-bold text-gray-900 pr-4">{title}</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                isWishlisted
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all hover:scale-110"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {isNew && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              New Arrival
            </Badge>
          )}
          {isBestseller && (
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Bestseller
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-red-100 text-red-800 border-red-200">
              Sale
            </Badge>
          )}
          {vendor && (
            <Badge variant="outline" className="text-gray-600">
              {vendor}
            </Badge>
          )}
        </div>

        {/* Product Type and Reviews */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {productType && <span>{productType}</span>}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span>(24 reviews)</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(currentPrice)}
          </span>
          {isOnSale && compareAtPrice && (
            <span className="text-lg text-gray-500 line-through">
              {formatCurrency(compareAtPrice)}
            </span>
          )}
        </div>
        {isOnSale && compareAtPrice && (
          <div className="text-sm text-red-600 font-medium">
            Save {formatCurrency((parseFloat(compareAtPrice) - parseFloat(currentPrice)).toFixed(2))}
            ({Math.round((1 - parseFloat(currentPrice) / parseFloat(compareAtPrice)) * 100)}% off)
          </div>
        )}
      </div>

      <Separator />

      {/* Product Options */}
      {options.map((option) => (
        <div key={option.name} className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {option.name}: <span className="font-normal">
              {typeof selectedOptions[option.name] === 'object'
                ? (selectedOptions[option.name]?.value || selectedOptions[option.name]?.name || 'Not selected')
                : selectedOptions[option.name] || 'Not selected'}
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              // Handle case where value might be an object
              const valueString = typeof value === 'object' ? (value.value || value.name || String(value)) : value;
              const isSelected = selectedOptions[option.name] === valueString;
              const isAvailableForOption = variants.some(variant => {
                if (!variant.availableForSale || !variant.selectedOptions) return false;

                if (Array.isArray(variant.selectedOptions)) {
                  return variant.selectedOptions.some(opt => opt.name === option.name && opt.value === valueString);
                } else if (typeof variant.selectedOptions === 'object') {
                  const variantOption = variant.selectedOptions[option.name];
                  if (typeof variantOption === 'object' && variantOption.value) {
                    return variantOption.value === valueString;
                  }
                  return variantOption === valueString;
                }
                return false;
              });

              return (
                <button
                  key={typeof value === 'object' ? JSON.stringify(value) : value}
                  onClick={() => handleOptionChange(option.name, valueString)}
                  disabled={!isAvailableForOption}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : isAvailableForOption
                      ? "border-gray-300 text-gray-700 hover:border-gray-400"
                      : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                  }`}
                >
                  {valueString}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {selectedVariant?.quantityAvailable ? (
              <span>{selectedVariant.quantityAvailable} in stock</span>
            ) : (
              <span>Stock information unavailable</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            disabled={!isAvailable || isLoading}
            className="w-full bg-black text-white hover:bg-gray-800 py-3 text-sm font-semibold tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            {isLoading ? "Adding..." : !isAvailable ? "Out of Stock" : "Add to Cart"}
          </Button>

          {!isAvailable && (
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Notify When Available
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Product Features */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Free Shipping</p>
              <p className="text-gray-600">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">2 Year Warranty</p>
              <p className="text-gray-600">Full coverage</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RotateCcw className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">30 Day Returns</p>
              <p className="text-gray-600">Hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Product Description */}
      {description && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Description</h3>
          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {selectedVariant?.sku && (
            <>
              <dt className="text-gray-600">SKU:</dt>
              <dd className="text-gray-900">{selectedVariant.sku}</dd>
            </>
          )}
          {selectedVariant?.weight && (
            <>
              <dt className="text-gray-600">Weight:</dt>
              <dd className="text-gray-900">{selectedVariant.weight} {selectedVariant.weightUnit}</dd>
            </>
          )}
          {vendor && (
            <>
              <dt className="text-gray-600">Brand:</dt>
              <dd className="text-gray-900">{vendor}</dd>
            </>
          )}
          {productType && (
            <>
              <dt className="text-gray-600">Type:</dt>
              <dd className="text-gray-900">{productType}</dd>
            </>
          )}
        </div>
      </div>
    </div>
  );
}