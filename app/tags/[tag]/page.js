"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Tag as TagIcon } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function TagPage() {
  const params = useParams();
  const tag = params.tag;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tag) {
      fetchProductsByTag();
    }
  }, [tag]);

  const fetchProductsByTag = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Decode URL-encoded tag
      const decodedTag = decodeURIComponent(tag);

      console.log("Searching for tag:", decodedTag);
      console.log("Total products:", data.products?.length);

      // Filter products by tag (more flexible matching)
      const taggedProducts = data.products?.filter((product) => {
        console.log("Product:", product.title, "Tags:", product.tags);
        return product.tags?.some((productTag) => {
          const normalizedProductTag = productTag.toLowerCase().replace(/\s+/g, '-');
          const normalizedSearchTag = decodedTag.toLowerCase().replace(/\s+/g, '-');

          // Match exact or partial
          return (
            normalizedProductTag === normalizedSearchTag ||
            normalizedProductTag.includes(normalizedSearchTag) ||
            normalizedSearchTag.includes(normalizedProductTag) ||
            productTag.toLowerCase() === decodedTag.toLowerCase()
          );
        });
      }) || [];

      console.log("Filtered products:", taggedProducts.length);

      setProducts(taggedProducts);
    } catch (err) {
      console.error("Error fetching products by tag:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format tag name for display
  const formatTagName = (tagName) => {
    return decodeURIComponent(tagName)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
            onClick={fetchProductsByTag}
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
      {/* Header Section */}
      <div className="bg-gray-50 border-b py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Products
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <TagIcon className="w-6 h-6 text-gray-600" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              {formatTagName(tag)}
            </h1>
          </div>

          <p className="text-gray-600 text-sm md:text-base">
            {products.length} {products.length === 1 ? "product" : "products"} tagged with "{formatTagName(tag)}"
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <TagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              No products found with tag "{formatTagName(tag)}"
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* All Tags Section */}
      {products.length > 0 && (
        <div className="bg-gray-50 py-12 px-4 mt-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Browse by Tags</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                new Set(
                  products.flatMap((product) =>
                    product.tags?.filter((t) => t) || []
                  )
                )
              ).map((productTag) => (
                <Link
                  key={productTag}
                  href={`/tags/${encodeURIComponent(productTag)}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  {productTag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
