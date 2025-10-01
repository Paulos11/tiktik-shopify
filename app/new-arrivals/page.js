"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      // Fetch products and filter by "new-arrivals" tag
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Filter products with "new-arrivals" or "new arrivals" tag
      // Handle various formats: "new-arrivals", "new arrivals", "new", "new-arriavals" (typo)
      const newProducts = data.products?.filter((product) =>
        product.tags?.some(
          (tag) => {
            const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
            return (
              normalizedTag.includes('new-arrival') ||
              normalizedTag.includes('new-arriaval') || // handle typo
              tag.toLowerCase() === "new"
            );
          }
        )
      ) || [];

      // Sort by newest first (if you have createdAt field)
      newProducts.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });

      setProducts(newProducts);
    } catch (err) {
      console.error("Error fetching new arrivals:", err);
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
          <p className="text-red-600 mb-4">Error loading new arrivals: {error}</p>
          <button
            onClick={fetchNewArrivals}
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
              New Arrivals
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our latest timepieces. Fresh designs and innovative craftsmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No new arrivals at the moment.</p>
            <p className="text-sm text-gray-500">
              Check back soon for our latest timepieces!
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

                      {/* New Badge */}
                      <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium tracking-wide">
                        NEW
                      </div>
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
