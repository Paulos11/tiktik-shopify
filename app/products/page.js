"use client";
import { useEffect, useState } from "react";
import { useProductStore } from "@/lib/store";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    fetchProducts,
    searchProducts,
    clearError
  } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all products on page load
  useEffect(() => {
    fetchProducts(20); // Fetch up to 20 products
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error && !products.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 max-w-md mx-auto">
            <h2 className="font-bold text-lg mb-2">Error Loading Products</h2>
            <p className="mb-4">{error}</p>
            <Button
              onClick={() => {
                clearError();
                fetchProducts(20);
              }}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-gray-600 text-lg">
          Discover our premium collection of timepieces
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            type="submit"
            disabled={isSearching || loading}
            className="whitespace-nowrap"
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
          {searchQuery && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClearSearch}
              disabled={loading}
            >
              Clear
            </Button>
          )}
        </form>
      </div>

      {/* Results Info */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          {searchQuery ? (
            <>Showing results for &ldquo;{searchQuery}&rdquo; ({products.length} found)</>
          ) : (
            <>Showing all products ({products.length})</>
          )}
        </p>

        {loading && products.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
            Loading...
          </div>
        )}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchQuery ? "No products found" : "No products available"}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? "Try searching with different keywords or clear your search to see all products."
              : "Please check back later for new products."
            }
          </p>
          {searchQuery && (
            <Button onClick={handleClearSearch} variant="outline">
              View All Products
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Error Message (if products exist but error occurred during search) */}
      {error && products.length > 0 && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Search Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}