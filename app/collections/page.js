"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/collections");

      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }

      const data = await response.json();
      setCollections(data.collections || []);
    } catch (err) {
      console.error("Error fetching collections:", err);
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
          <p className="text-sm text-red-600 mb-3">
            Error loading collections: {error}
          </p>
          <button
            onClick={fetchCollections}
            className="px-6 py-2 text-sm bg-black text-white hover:bg-gray-800 transition-colors rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Hero */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
            Collections
          </h1>
          <p className="text-sm text-gray-500">
            Curated timepieces for every occasion
          </p>
        </div>
      </div>

      {/* Compact Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {collections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400">No collections available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-50 aspect-square mb-3 rounded">
                  {collection.image ? (
                    <Image
                      src={collection.image.src}
                      alt={collection.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <span className="text-3xl font-light text-gray-300">
                        {collection.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h2 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors truncate">
                    {collection.title}
                  </h2>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {collection.productCount}{" "}
                      {collection.productCount === 1 ? "item" : "items"}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
