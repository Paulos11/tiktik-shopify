"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function CollectionPage() {
  const params = useParams();
  const handle = params.handle;

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (handle) {
      fetchCollection();
    }
  }, [handle]);

  const fetchCollection = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/collections/${handle}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Collection not found");
        }
        throw new Error("Failed to fetch collection");
      }

      const data = await response.json();
      setCollection(data);
    } catch (err) {
      console.error("Error fetching collection:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-6 py-2 text-sm bg-black text-white hover:bg-gray-800 transition-colors rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  if (!collection) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Collections
          </Link>
        </div>
      </div>

      {/* Compact Collection Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-3">
              {collection.title}
            </h1>

            {collection.description && (
              <div
                className="text-sm text-gray-600 leading-relaxed mb-3"
                dangerouslySetInnerHTML={{
                  __html: collection.descriptionHtml || collection.description,
                }}
              />
            )}

            <p className="text-xs text-gray-400">
              {collection.productCount}{" "}
              {collection.productCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {collection.products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
