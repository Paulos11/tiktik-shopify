"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";

// Define which collections to display and their order
const FEATURED_COLLECTIONS = ["men", "women", "collectible", "all-brands"];

// Badge mapping for each collection (Not used in the provided JSX, but kept for context)
const COLLECTION_BADGES = {
  men: "NEW",
  women: "TRENDING",
  collectible: "LIMITED",
  brands: "EXCLUSIVE",
};

export default function BannerGridSection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false); // State for animation control

  useEffect(() => {
    fetchCollections();
    // Set isLoaded after a short delay for animation flow
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const fetchCollections = async () => {
    try {
      // RESTORED: Fetching data from the actual API endpoint
      const response = await fetch("/api/collections");

      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }

      const data = await response.json();

      // Filter and sort collections based on FEATURED_COLLECTIONS array
      const filtered = FEATURED_COLLECTIONS.map((handle) =>
        data.collections?.find((col) => col.handle === handle)
      ).filter(Boolean);

      setCollections(filtered);
    } catch (err) {
      console.error("Error fetching collections:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              // Staggered slide-in-up animation
              className={`transition-all duration-700 ease-out transform ${
                isLoaded
                  ? "opacity-100 translate-y-0 animate-slideInUp"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Link
                href={`/collections/${collection.handle}`}
                className="group relative h-64 lg:h-80 overflow-hidden bg-black block shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {collection.image ? (
                    <>
                      <Image
                        src={collection.image.src}
                        alt={collection.image.alt || collection.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all duration-500"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                  )}
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                  {/* Title & CTA */}
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight uppercase">
                      {collection.title}
                    </h3>
                    {collection.description && (
                      <p className="text-white/80 text-sm mb-4 font-light line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                    <div className="inline-flex items-center text-white text-xs font-semibold tracking-[0.15em] uppercase group-hover:gap-2 transition-all duration-300">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-300 pointer-events-none"></div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out both;
        }
      `}</style>
    </section>
  );
}
