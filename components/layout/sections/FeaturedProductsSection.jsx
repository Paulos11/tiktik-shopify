"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProductsSection({ products = [] }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-1 md:mb-2">
              FEATURED COLLECTION
            </h2>
            <p className="text-gray-600 text-xs md:text-sm lg:text-base">
              Handpicked timepieces for the discerning collector
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="hidden md:inline-flex border-black text-black hover:bg-black hover:text-white transition-colors duration-300 px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold"
          >
            <Link href="/products">VIEW ALL</Link>
          </Button>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <p className="text-gray-500 text-sm md:text-base">
              No products available at the moment.
            </p>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 md:mt-12 text-center md:hidden">
          <Button
            variant="outline"
            asChild
            className="w-full border-black text-black hover:bg-black hover:text-white transition-colors duration-300 py-3 text-xs tracking-[0.15em] uppercase font-semibold"
          >
            <Link href="/products">VIEW ALL PRODUCTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
