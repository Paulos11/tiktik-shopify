"use client";
import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { useCartStore } from "@/lib/store";

const COLOR_MAP = {
  black: "#000000",
  white: "#FFFFFF",
  gray: "#808080",
  grey: "#808080",
  brown: "#8B4513",
  red: "#DC2626",
  blue: "#2563EB",
  green: "#16A34A",
  yellow: "#EAB308",
  orange: "#EA580C",
  pink: "#EC4899",
  purple: "#9333EA",
  navy: "#1E3A8A",
  beige: "#D4C5B9",
  cream: "#FFFDD0",
  tan: "#D2B48C",
  gold: "#FFD700",
  silver: "#C0C0C0",
  rose: "#FF007F",
  mint: "#98FF98",
};

const getColorHex = (colorName) => {
  if (!colorName || typeof colorName !== "string") return "#CCCCCC";
  const normalized = colorName.toLowerCase().trim();
  return COLOR_MAP[normalized] || "#CCCCCC";
};

const formatCurrency = (amount, currency = "EUR") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(parseFloat(amount || 0));
};

// This will be imported from your actual store
// import { useCartStore } from "@/lib/store";

export default function ProductDetails({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    details: false,
    shipping: false,
  });

  const { addToCart, isLoading } = useCartStore();

  const variants =
    product?.variants?.edges?.map((e) => e.node) || product?.variants || [];
  const options = (product?.options || []).map((option) => ({
    ...option,
    values: (option.values || []).map((val) => {
      if (typeof val === "object" && val !== null) {
        return val.value || val.name || String(val);
      }
      return String(val);
    }),
  }));

  useEffect(() => {
    if (variants.length > 0) {
      const firstAvailable = variants.find((v) => v.available) || variants[0];
      setSelectedVariant(firstAvailable);

      const initialOptions = {};
      if (firstAvailable?.selectedOptions) {
        firstAvailable.selectedOptions.forEach((opt) => {
          initialOptions[opt.name] = opt.value;
        });
      }
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  if (!product) return null;

  const handleOptionChange = (optionName, value) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const matchingVariant = variants.find((variant) => {
      if (!variant.selectedOptions) return false;
      return variant.selectedOptions.every(
        (opt) => newOptions[opt.name] === opt.value
      );
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    try {
      await addToCart(selectedVariant.id, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const isColorOption = (optionName) => {
    const name = optionName.toLowerCase();
    return name.includes("color") || name.includes("colour");
  };

  const currentPrice =
    selectedVariant?.priceV2?.amount ||
    selectedVariant?.price?.amount ||
    "0.00";
  const compareAtPrice =
    selectedVariant?.compareAtPriceV2?.amount ||
    selectedVariant?.compareAtPrice?.amount;
  const currencyCode =
    selectedVariant?.priceV2?.currencyCode ||
    selectedVariant?.price?.currencyCode ||
    "EUR";
  const isOnSale =
    compareAtPrice && parseFloat(compareAtPrice) > parseFloat(currentPrice);
  const isAvailable = selectedVariant?.available !== false;

  return (
    <>
      {/* Product Info Section - Stays in sidebar */}
      <div className="space-y-6">
        {/* Title & Actions */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full transition ${
                  isWishlisted
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {product.vendor && (
            <p className="text-sm text-gray-600 mb-2">{product.vendor}</p>
          )}

          <div className="flex items-center gap-2 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">(24 reviews)</span>
          </div>
        </div>

        {/* Price */}
        <div className="py-2 border-y border-gray-200">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatCurrency(currentPrice, currencyCode)}
            </span>
            {isOnSale && compareAtPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  {formatCurrency(compareAtPrice, currencyCode)}
                </span>
                <span className="text-sm font-semibold text-red-600">
                  Save{" "}
                  {Math.round(
                    (1 -
                      parseFloat(currentPrice) / parseFloat(compareAtPrice)) *
                      100
                  )}
                  %
                </span>
              </>
            )}
          </div>
        </div>

        {/* Variant Options */}
        {options.map((option) => {
          const optionName = String(option.name || "");
          const firstValue = option.values?.[0];
          const firstValueStr =
            typeof firstValue === "string"
              ? firstValue
              : String(firstValue || "");

          if (optionName === "Title" && firstValueStr === "Default Title")
            return null;

          const isColor = isColorOption(optionName);

          return (
            <div key={optionName} className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                {optionName}:{" "}
                <span className="font-normal text-gray-600">
                  {String(selectedOptions[optionName] || "Select")}
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {option.values.map((value, idx) => {
                  const valueStr =
                    typeof value === "string" ? value : String(value || "");
                  const isSelected = selectedOptions[optionName] === valueStr;
                  const isAvailableOption = variants.some(
                    (v) =>
                      v.available &&
                      v.selectedOptions?.some(
                        (opt) =>
                          opt.name === optionName && opt.value === valueStr
                      )
                  );

                  if (isColor) {
                    const colorHex = getColorHex(valueStr);
                    return (
                      <button
                        key={`${optionName}-${valueStr}-${idx}`}
                        onClick={() => handleOptionChange(optionName, valueStr)}
                        disabled={!isAvailableOption}
                        className="relative group"
                        title={valueStr}
                      >
                        <div
                          className={`w-10 h-10 rounded-full border-2 transition ${
                            isSelected
                              ? "border-black ring-2 ring-offset-2 ring-black"
                              : "border-gray-300"
                          } ${
                            !isAvailableOption
                              ? "opacity-40 cursor-not-allowed"
                              : ""
                          }`}
                          style={{ backgroundColor: colorHex }}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check
                                className={`w-5 h-5 ${
                                  colorHex === "#FFFFFF"
                                    ? "text-black"
                                    : "text-white"
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={`${optionName}-${valueStr}-${idx}`}
                      onClick={() => handleOptionChange(optionName, valueStr)}
                      disabled={!isAvailableOption}
                      className={`px-4 py-2 rounded-md text-sm font-medium border-2 transition ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                      } ${
                        !isAvailableOption
                          ? "opacity-40 line-through cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {valueStr}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Quantity & Add to Cart */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-50"
              >
                −
              </button>
              <span className="px-4 py-2 min-w-[3rem] text-center font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!isAvailable || isLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            {isLoading
              ? "Adding..."
              : !isAvailable
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-200 text-xs">
          <div className="flex flex-col items-center text-center">
            <Truck className="w-5 h-5 text-gray-700 mb-1" />
            <p className="font-semibold text-gray-900">Free Shipping</p>
            <p className="text-gray-600">Over €100</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="w-5 h-5 text-gray-700 mb-1" />
            <p className="font-semibold text-gray-900">Secure</p>
            <p className="text-gray-600">Payment</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <RotateCcw className="w-5 h-5 text-gray-700 mb-1" />
            <p className="font-semibold text-gray-900">30 Days</p>
            <p className="text-gray-600">Returns</p>
          </div>
        </div>
      </div>

      {/* Full Width Sections - Will be placed outside the grid */}
      <div className="lg:col-span-2 mt-12 space-y-0 border-t border-gray-200">
        {/* Description */}
        {product.descriptionHtml && (
          <div className="border-b border-gray-200">
            <button
              onClick={() =>
                setExpandedSections((p) => ({
                  ...p,
                  description: !p.description,
                }))
              }
              className="w-full flex justify-between items-center py-4 text-left font-semibold hover:text-gray-600"
            >
              Description
              {expandedSections.description ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedSections.description && (
              <div
                className="pb-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}
          </div>
        )}

        {/* Details */}
        <div className="border-b border-gray-200">
          <button
            onClick={() =>
              setExpandedSections((p) => ({ ...p, details: !p.details }))
            }
            className="w-full flex justify-between items-center py-4 text-left font-semibold hover:text-gray-600"
          >
            Product Details
            {expandedSections.details ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.details && (
            <div className="pb-6 text-sm space-y-1">
              {selectedVariant?.sku && (
                <p>
                  <span className="text-gray-600">SKU:</span>{" "}
                  {selectedVariant.sku}
                </p>
              )}
              {product.vendor && (
                <p>
                  <span className="text-gray-600">Brand:</span> {product.vendor}
                </p>
              )}
              {product.productType && (
                <p>
                  <span className="text-gray-600">Type:</span>{" "}
                  {product.productType}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Shipping */}
        <div className="border-b border-gray-200">
          <button
            onClick={() =>
              setExpandedSections((p) => ({ ...p, shipping: !p.shipping }))
            }
            className="w-full flex justify-between items-center py-4 text-left font-semibold hover:text-gray-600"
          >
            Shipping & Returns
            {expandedSections.shipping ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.shipping && (
            <div className="pb-6 text-sm space-y-1 text-gray-700">
              <p>• Free shipping on orders over €100</p>
              <p>• Express delivery available</p>
              <p>• 30-day return policy</p>
              <p>• Free returns on orders over €100</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
