"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/layout/sections/HeroSection";
import FeaturedProductsSection from "@/components/layout/sections/FeaturedProductsSection";
import { useProductStore } from "@/lib/store";
import BannerGridSection from "@/components/layout/sections/BannerGridSection";

export default function HomePage() {
  const { products, loading, error, fetchProducts, clearError } =
    useProductStore();

  useEffect(() => {
    fetchProducts(8);
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-lg font-medium">
            Loading products...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-4">
            <h2 className="font-bold text-lg mb-2">Error loading products</h2>
            <p className="text-sm">{error}</p>
          </div>
          <Button
            onClick={() => {
              clearError();
              fetchProducts(8);
            }}
            className="bg-black text-white hover:bg-gray-800"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <BannerGridSection />
      <FeaturedProductsSection products={products} />
    </>
  );
}
