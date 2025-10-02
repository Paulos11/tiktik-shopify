"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BrandsSlider() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Enable the main component animation after mounting
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // List of luxury watch brands
  const brands = [
    { name: "Gucci", logo: "/brands/gucci.png" },
    { name: "Versace", logo: "/brands/versache.png" },
    { name: "Philipp Plein", logo: "/brands/philipp-plein.png" },
    { name: "Rolex", logo: "/brands/rolex.png" }, // Added a brand for better visual flow
    { name: "Omega", logo: "/brands/omega.png" }, // Added a brand for better visual flow
  ];

  // Duplicate brands multiple times for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];
  const numOriginalBrands = brands.length;

  // Calculate the correct translation distance for the seamless loop
  const scrollDuration = brands.length * 5; // e.g., 5 brands * 5s = 25s scroll time

  return (
    <section
      className={`py-12 md:py-16 bg-white transition-opacity duration-700 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      } overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-gray-900">
          AUTHORIZED BRANDS
        </h2>
        <p className="text-gray-500 text-center mt-3 text-base md:text-lg max-w-2xl mx-auto">
          We proudly represent the world&#39;s most **prestigious timepieces**,
          ensuring every watch is an authentic masterpiece.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative border-y border-gray-200 py-6 md:py-8">
        {/* Gradient Overlays for seamless loop effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Sliding Brands */}
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className={`flex-shrink-0 w-40 md:w-52 px-6 md:px-10 flex items-center justify-center transition-all duration-500 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              // Stagger the animation of the first set of logos
              style={{
                animationDelay:
                  index < numOriginalBrands ? `${index * 100 + 300}ms` : "0ms",
                minWidth: "160px", // Tailwind w-40
              }}
            >
              <div className="relative h-12 md:h-16 w-full opacity-30 hover:opacity-100 transition-all duration-500 group">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain filter grayscale group-hover:filter-none transition-filter duration-500"
                  sizes="(max-width: 768px) 160px, 208px"
                  priority={index < numOriginalBrands}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Scroll by the width of one set of original brands (100% / 4 sets) */
            transform: translateX(calc(-100% / 4));
          }
        }

        .animate-scroll {
          animation: scroll ${scrollDuration}s linear infinite;
          will-change: transform;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
