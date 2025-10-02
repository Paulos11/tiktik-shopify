"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function GucciVideoSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger the smooth fade-in animation on mount
    setIsLoaded(true);
  }, []);

  return (
    <section
      className={`relative h-[500px] md:h-[650px] overflow-hidden bg-black flex items-center justify-center 
                  transition-opacity duration-1000 ease-out ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
    >
      {/* Background Video Element */}
      {/* The video must be placed in your 'public' folder, e.g., /public/videos/gucci-video.mp4 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/gucci-video.mp4"
        autoPlay
        loop
        muted
        playsInline // Ensures video plays automatically on iOS
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered Title and Content */}
      <div
        className={`relative z-10 text-center max-w-4xl px-4 transition-all duration-700 delay-500 transform ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tight text-white mb-4 uppercase">
          Gucci Collection
        </h2>

        <p className="text-lg md:text-xl font-light text-white/90 mb-8 max-w-2xl mx-auto">
          The pinnacle of Italian craftsmanship and contemporary horology.
        </p>

        {/* Call to Action */}
        <Link
          href="/collections/gucci"
          className="inline-block px-10 py-3 border-2 border-white text-white text-sm font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          View Collection
        </Link>
      </div>
    </section>
  );
}
