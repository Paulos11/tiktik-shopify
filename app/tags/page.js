"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Tag as TagIcon } from "lucide-react";

export default function AllTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTags();
  }, []);

  const fetchAllTags = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Extract all unique tags
      const allTags = new Map();

      data.products?.forEach((product) => {
        product.tags?.forEach((tag) => {
          if (tag && tag.trim()) {
            const tagKey = tag.toLowerCase();
            if (allTags.has(tagKey)) {
              allTags.get(tagKey).count++;
            } else {
              allTags.set(tagKey, {
                name: tag,
                count: 1,
              });
            }
          }
        });
      });

      // Convert to array and sort by count
      const tagsArray = Array.from(allTags.values()).sort(
        (a, b) => b.count - a.count
      );

      setTags(tagsArray);
    } catch (err) {
      console.error("Error fetching tags:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <p className="text-red-600 mb-4">Error loading tags: {error}</p>
          <button
            onClick={fetchAllTags}
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
          <div className="flex items-center gap-3 mb-2">
            <TagIcon className="w-6 h-6 text-gray-600" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Browse by Tags
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            {tags.length} unique {tags.length === 1 ? "tag" : "tags"} across all products
          </p>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tags.length === 0 ? (
          <div className="text-center py-12">
            <TagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No tags found</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-3">
                {tags.slice(0, 10).map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/tags/${encodeURIComponent(tag.name)}`}
                    className="group"
                  >
                    <div className="px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{tag.name}</span>
                        <span className="text-xs bg-white text-gray-700 group-hover:bg-gray-100 px-2 py-1 rounded-full">
                          {tag.count}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">All Tags</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/tags/${encodeURIComponent(tag.name)}`}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {tag.name}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag.count}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
