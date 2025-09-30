"use client";
import { useEffect, useState } from "react";
import { useProductStore } from "@/lib/store";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    fetchProducts,
    searchProducts,
    clearError,
  } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProducts(20);
  }, [fetchProducts]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchProducts(20);
      return;
    }

    setIsSearching(true);
    try {
      await searchProducts(searchQuery);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchProducts(20);
  };

  if (loading && !products.length) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-900 border-t-transparent mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !products.length) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-8 mb-6">
              <h2 className="font-bold text-xl text-gray-900 mb-2">
                Unable to Load Products
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button
                onClick={() => {
                  clearError();
                  fetchProducts(20);
                }}
                className="bg-black text-white hover:bg-gray-800"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Collection
          </h1>
          <p className="text-gray-600">
            Premium timepieces crafted for excellence
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-11 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSearching || loading}
                className="bg-black text-white hover:bg-gray-800 h-11 px-6"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>

            {/* Filter button - placeholder for future functionality */}
            <Button
              variant="outline"
              className="h-11 px-4 border-gray-300 hover:border-gray-400"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Active search indicator */}
          {searchQuery && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Searching for:{" "}
                <span className="font-semibold text-gray-900">
                  &quot;{searchQuery}&quot;
                </span>
              </span>
              <button
                onClick={handleClearSearch}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Results Count & Sort */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {products.length}
            </span>{" "}
            {products.length === 1 ? "product" : "products"}
          </p>

          {loading && products.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
              Loading...
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-20">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? "No products found" : "No products available"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Try adjusting your search terms or browse all products."
                  : "Check back soon for new arrivals."}
              </p>
              {searchQuery && (
                <Button
                  onClick={handleClearSearch}
                  variant="outline"
                  className="border-gray-300 hover:border-gray-400"
                >
                  View All Products
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && products.length > 0 && (
          <div className="mt-8 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold text-sm">Search Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
