"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowLeft, Award } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function LimitedEditionPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLimitedEdition();
  }, []);

  const fetchLimitedEdition = async () => {
    try {
      setLoading(true);
      // Fetch products and filter by "limited-edition" tag
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Filter products with "limited-edition" or similar tags
      // Handle various formats: "Limited Editions", "limited-edition", "limited edition", etc.
      const limitedProducts =
        data.products?.filter((product) =>
          product.tags?.some((tag) => {
            const normalizedTag = tag.toLowerCase().replace(/\s+/g, "-");
            return (
              normalizedTag.includes("limited-edition") ||
              normalizedTag.includes("limited") ||
              normalizedTag.includes("exclusive")
            );
          })
        ) || [];

      setProducts(limitedProducts);
    } catch (err) {
      console.error("Error fetching limited edition products:", err);
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
          <p className="text-red-600 mb-4">Error loading products: {error}</p>
          <button
            onClick={fetchLimitedEdition}
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
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Products
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                Limited Edition
              </h1>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Exclusive timepieces crafted in limited quantities. Own a piece of
              horological excellence.
            </p>
            <p className="text-sm text-yellow-400 mt-4 font-medium">
              Once they&#39;re gone, they&#39;re gone forever
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              No limited edition pieces available right now.
            </p>
            <p className="text-sm text-gray-500">
              Subscribe to our newsletter to be notified when new limited
              editions drop.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {products.length} exclusive{" "}
                {products.length === 1 ? "piece" : "pieces"}
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

                      {/* Limited Edition Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-3 py-1 text-xs font-medium tracking-wide flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          LIMITED
                        </div>
                      </div>

                      {/* Exclusive overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-xs font-medium">
                            Exclusive Edition
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                        {product.title}
                      </h3>

                      {product.vendor && (
                        <p className="text-sm text-gray-500">
                          {product.vendor}
                        </p>
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
                        <p className="text-sm text-red-600 font-medium">
                          Sold Out
                        </p>
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
