"use client";
import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "@/lib/store";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/product/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function ProductsPage() {
  const {
    products: allProducts,
    loading,
    error,
    fetchProducts,
    searchProducts,
    clearError,
  } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [activeFilters, setActiveFilters] = useState({
    collections: [],
    tags: [],
    priceRange: null,
    availability: null,
  });

  useEffect(() => {
    fetchProducts(100); // Fetch more products for filtering
  }, [fetchProducts]);

  // Extract unique collections and tags from products
  const { collections, tags, priceRange } = useMemo(() => {
    const collectionsSet = new Set();
    const tagsSet = new Set();
    let minPrice = Infinity;
    let maxPrice = 0;

    console.log("Extracting filters from products:", allProducts.length);

    allProducts.forEach((product) => {
      console.log("Product:", product.title, {
        productType: product.productType,
        tags: product.tags,
        price: product.variants?.[0]?.price,
      });

      // Extract collections (you may need to adjust based on your data structure)
      if (product.productType) {
        collectionsSet.add(product.productType);
      }

      // Extract tags
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach((tag) => {
          if (tag && tag.trim()) tagsSet.add(tag);
        });
      }

      // Calculate price range
      const price = parseFloat(
        product.variants?.[0]?.price || product.priceRange?.minVariantPrice || 0
      );
      if (price > 0) {
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
      }
    });

    const extractedCollections = Array.from(collectionsSet).sort();
    const extractedTags = Array.from(tagsSet).sort();

    console.log("Extracted Collections:", extractedCollections);
    console.log("Extracted Tags:", extractedTags);
    console.log("Price Range:", { min: minPrice, max: maxPrice });

    return {
      collections: extractedCollections,
      tags: extractedTags,
      priceRange: {
        min: minPrice === Infinity ? 0 : Math.floor(minPrice),
        max: Math.ceil(maxPrice),
      },
    };
  }, [allProducts]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply collection filter
    if (activeFilters.collections.length > 0) {
      filtered = filtered.filter((product) =>
        activeFilters.collections.includes(product.productType)
      );
    }

    // Apply tags filter
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter((product) =>
        product.tags?.some((tag) => activeFilters.tags.includes(tag))
      );
    }

    // Apply price range filter
    if (activeFilters.priceRange) {
      const { min, max } = activeFilters.priceRange;
      filtered = filtered.filter((product) => {
        const price = parseFloat(
          product.variants?.[0]?.price ||
            product.priceRange?.minVariantPrice ||
            0
        );
        return (!min || price >= min) && (!max || price <= max);
      });
    }

    // Apply availability filter
    if (activeFilters.availability === "in-stock") {
      filtered = filtered.filter(
        (product) => product.availableForSale !== false
      );
    } else if (activeFilters.availability === "out-of-stock") {
      filtered = filtered.filter(
        (product) => product.availableForSale === false
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat(
            a.variants?.[0]?.price || a.priceRange?.minVariantPrice || 0
          );
          const priceB = parseFloat(
            b.variants?.[0]?.price || b.priceRange?.minVariantPrice || 0
          );
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat(
            a.variants?.[0]?.price || a.priceRange?.minVariantPrice || 0
          );
          const priceB = parseFloat(
            b.variants?.[0]?.price || b.priceRange?.minVariantPrice || 0
          );
          return priceB - priceA;
        });
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      default: // featured
        break;
    }

    return filtered;
  }, [allProducts, activeFilters, sortBy]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchProducts(100);
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
    fetchProducts(100);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleClearAllFilters = () => {
    setActiveFilters({
      collections: [],
      tags: [],
      priceRange: null,
      availability: null,
    });
  };

  if (loading && !allProducts.length) {
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

  if (error && !allProducts.length) {
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
                  fetchProducts(100);
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

            {/* Filter toggle button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-11 px-4 border-gray-300 hover:border-gray-400"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {(activeFilters.collections.length + activeFilters.tags.length >
                0 ||
                activeFilters.priceRange ||
                activeFilters.availability) && (
                <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFilters.collections.length +
                    activeFilters.tags.length +
                    (activeFilters.priceRange ? 1 : 0) +
                    (activeFilters.availability ? 1 : 0)}
                </span>
              )}
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

        {/* Main Content Grid */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filter Sidebar - Desktop */}
          {showFilters && (
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <FilterSidebar
                  collections={collections}
                  tags={tags}
                  priceRange={priceRange}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearAllFilters}
                />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            {/* Results Count & Sort */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:ring-1 focus:ring-black focus:border-black"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Filter Sidebar - Mobile */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <FilterSidebar
                  collections={collections}
                  tags={tags}
                  priceRange={priceRange}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearAllFilters}
                />
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20">
                <div className="max-w-md mx-auto text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button
                    onClick={handleClearAllFilters}
                    variant="outline"
                    className="border-gray-300 hover:border-gray-400"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Error Message */}
        {error && allProducts.length > 0 && (
          <div className="mt-8 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold text-sm">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
