"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = product?.images?.edges
    ? product.images.edges.map((e) => e.node)
    : product?.images || [];

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-sm text-gray-400">No image available</p>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-2">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-gray-50 rounded overflow-hidden group">
        <Image
          src={currentImage.src}
          alt={currentImage.altText || product.title || "Product image"}
          fill
          className="object-contain"
          priority
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/95 hover:bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/95 hover:bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs">
            {selectedImageIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div
          className={`grid gap-1.5 ${
            images.length > 4 ? "grid-cols-5" : "grid-cols-4"
          }`}
        >
          {images.slice(0, 5).map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square rounded overflow-hidden border-2 transition ${
                index === selectedImageIndex
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image.src}
                alt={image.altText || `View ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
          {images.length > 5 && (
            <button
              onClick={() => setSelectedImageIndex(5)}
              className="relative aspect-square rounded overflow-hidden border-2 border-gray-200 hover:border-gray-300 bg-gray-100 flex items-center justify-center"
            >
              <span className="text-xs font-semibold text-gray-600">
                +{images.length - 5}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
