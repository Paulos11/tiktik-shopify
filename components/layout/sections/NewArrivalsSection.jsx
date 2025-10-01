"use client";
import { useState, useEffect } from "react";
import ProductSection from "./ProductSection";

export default function NewArrivalsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Filter products with "new-arrivals" or similar tags
      const newProducts = data.products?.filter((product) =>
        product.tags?.some((tag) => {
          const normalizedTag = tag.toLowerCase().replace(/\s+/g, "-");
          return (
            normalizedTag.includes("new-arrival") ||
            normalizedTag.includes("new-arriaval") ||
            tag.toLowerCase() === "new"
          );
        })
      ) || [];

      // Sort by newest first
      newProducts.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });

      // Take only first 8 products for homepage
      setProducts(newProducts.slice(0, 8));
    } catch (err) {
      console.error("Error fetching new arrivals:", err);
    } finally {
      setLoading(false);
    }
  };

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

  // Don't render if no new arrivals
  if (products.length === 0) {
    return null;
  }

  return (
    <ProductSection
      title="NEW ARRIVALS"
      description="Discover our latest timepieces. Fresh designs and innovative craftsmanship."
      products={products}
      viewAllLink="/new-arrivals"
      viewAllText="VIEW ALL NEW ARRIVALS"
    />
  );
}
