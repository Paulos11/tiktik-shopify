"use client";
import Image from "next/image";

export default function BrandsSlider() {
  // List of luxury watch brands
  const brands = [
    { name: "Gucci", logo: "/brands/gucci.png" },
    { name: "Versace", logo: "/brands/versache.png" },
    { name: "Philipp Plein", logo: "/brands/philipp-plein.png" },
  ];

  // Duplicate brands multiple times for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-12 md:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
          OUR BRANDS
        </h2>
        <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
          Authorized retailer of the world's finest timepieces
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* Sliding Brands */}
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 w-40 md:w-52 px-6 md:px-10 flex items-center justify-center"
            >
              <div className="relative h-12 md:h-16 w-full grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 192px, 256px"
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
            transform: translateX(calc(-100% / 4));
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
