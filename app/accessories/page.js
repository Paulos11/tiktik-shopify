"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function AccessoriesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      setLoading(true);
      // Fetch products and filter by "accessories" tag or product type
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Filter products with "accessories" tag or productType
      const accessoryProducts = data.products?.filter((product) => {
        const hasAccessoryTag = product.tags?.some(
          (tag) => {
            const lowerTag = tag.toLowerCase();
            return (
              lowerTag.includes("accessor") ||
              lowerTag.includes("strap") ||
              lowerTag.includes("band") ||
              lowerTag.includes("box") ||
              lowerTag.includes("case") ||
              lowerTag.includes("bracelet") ||
              lowerTag.includes("tools")
            );
          }
        );

        const isAccessoryType =
          product.productType?.toLowerCase().includes("accessor");

        return hasAccessoryTag || isAccessoryType;
      }) || [];

      setProducts(accessoryProducts);
    } catch (err) {
      console.error("Error fetching accessories:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseFloat(price));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading accessories: {error}</p>
          <button
            onClick={fetchAccessories}
            className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Products
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">
              Watch Accessories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elevate your timepiece with our premium straps, boxes, and care products
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-sm font-medium text-gray-900 mb-3">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-400 transition-colors cursor-pointer">
              Watch Straps
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-400 transition-colors cursor-pointer">
              Watch Boxes
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-400 transition-colors cursor-pointer">
              Care Kits
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-400 transition-colors cursor-pointer">
              Tools
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No accessories available at the moment.</p>
            <p className="text-sm text-gray-500">
              Check back soon for premium watch accessories!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/products/${product.handle}`}>
                    <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                      {product.images[0] ? (
                        <>
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            fill
                            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                          {product.images[1] && (
                            <Image
                              src={product.images[1].src}
                              alt={product.images[1].alt}
                              fill
                              className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl font-light text-gray-300">
                            {product.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Product Type Badge */}
                      {product.productType && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 text-xs font-medium tracking-wide rounded">
                          {product.productType}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                        {product.title}
                      </h3>

                      {product.vendor && (
                        <p className="text-sm text-gray-500">{product.vendor}</p>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium text-gray-900">
                          {formatPrice(product.variants[0]?.price || "0")}
                        </span>
                        {product.variants[0]?.compareAtPrice &&
                          parseFloat(product.variants[0].compareAtPrice) >
                            parseFloat(product.variants[0].price) && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.variants[0].compareAtPrice)}
                            </span>
                          )}
                      </div>

                      {!product.availableForSale && (
                        <p className="text-sm text-red-600">Sold Out</p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
