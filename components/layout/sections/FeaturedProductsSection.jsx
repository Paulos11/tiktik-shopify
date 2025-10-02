"use client";
import { useState, useEffect } from "react";
import ProductSection from "./ProductSection"; // Assuming ProductSection is in the same directory as NewArrivalsSection

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      // Use the same API endpoint as new arrivals
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // --- KEY CHANGE: Filter products with "featured" tag ---
      const featuredProducts =
        data.products?.filter((product) =>
          product.tags?.some((tag) => {
            const normalizedTag = tag.toLowerCase().replace(/\s+/g, "-");
            return normalizedTag.includes("featured");
          })
        ) || [];

      // Optional: Sort by a specific 'featured' order if available, or just take the first 8
      // For simplicity, we'll just take the first 8 that match the tag.

      // Take only first 8 products for the section
      setProducts(featuredProducts.slice(0, 8));
    } catch (err) {
      console.error("Error fetching featured products:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- LOADING STATE (reusing the same structure as NewArrivalsSection) ---
  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mb-12"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no featured products
  if (products.length === 0) {
    return null;
  }

  // --- FINAL RENDER using the shared ProductSection component ---
  return (
    <ProductSection
      title="FEATURED TIMEPIECES"
      description="Handpicked watches that define our commitment to craftsmanship and style."
      products={products}
      viewAllLink="/collections/featured" // Use a more specific link for a featured collection
      viewAllText="SHOP FEATURED COLLECTION"
    />
  );
}
