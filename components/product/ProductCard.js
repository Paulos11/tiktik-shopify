"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/api";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, isLoading } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.variants && product.variants.length > 0) {
      addToCart(product.variants[0].id, 1);
    }
  };

  if (!product) return null;

  const primaryImage = product.images[0]?.src || "/placeholder.jpg";
  const secondaryImage = product.images[1]?.src || primaryImage;
  const price = product.variants[0]?.priceV2?.amount || "0.00";
  const isNew = product.tags?.includes("new") || false;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50 mb-3">
          {/* New Collection Badge */}
          {isNew && (
            <div className="absolute top-3 left-3 z-10 bg-black text-white px-2.5 py-1 text-[9px] font-semibold tracking-[0.2em] uppercase">
              NEW COLLECTION
            </div>
          )}

          {/* Primary Image */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isHovered && secondaryImage !== primaryImage
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100"
            }`}
          >
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Secondary Image */}
          {secondaryImage !== primaryImage && (
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Image
                src={secondaryImage}
                alt={`${product.title} - alternate view`}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Add to Cart Button - Shows on Hover */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`absolute bottom-4 left-4 right-4 bg-black text-white py-3 px-6 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ease-out ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0 pointer-events-none"
            } hover:bg-white hover:text-black hover:border hover:border-black disabled:opacity-50`}
          >
            <ShoppingBag size={16} strokeWidth={2} />
            {isLoading ? "ADDING..." : "ADD TO CART"}
          </button>
        </div>

        {/* Product Info */}
        <div className="text-center space-y-2">
          <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-900 transition-colors duration-300 group-hover:text-gray-600">
            {product.title}
          </h3>

          <div className="flex items-center justify-center gap-2">
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(price)}
            </p>

            {product.variants[0]?.availableForSale === false && (
              <span className="text-[10px] text-red-600 font-semibold uppercase tracking-wider">
                Sold Out
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
