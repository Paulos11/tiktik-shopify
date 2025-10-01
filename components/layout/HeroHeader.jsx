// components/HeroHeader.jsx
import React from "react";

/**
 * A reusable hero header component for a page.
 * It features a full-width background image and a content overlay.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The main title text (e.g., "About TikTik").
 * @param {string} props.subtitle - The descriptive tagline (e.g., "Where precision meets creativity.").
 * @param {string} props.bgImageSrc - The source path for the background image (e.g., "/head-banner.jpg").
 * @returns {JSX.Element} The Hero Header component.
 */
export default function HeroHeader({ title, subtitle, bgImageSrc }) {
  return (
    <div className="relative border-b border-gray-200">
      {/* Background Image - FULL RESOLUTION */}
      <div className="absolute inset-0">
        <img
          src={bgImageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content - TEXT COLOR CHANGED | PADDING DECREASED */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Text color changed to #1B1C1D */}
          <h1
            className="text-2xl md:text-2xl lg:text-4xl font-bold mb-3"
            style={{ color: "#1B1C1D" }}
          >
            {title}
          </h1>
          {/* Text color changed to #1B1C1D */}
          <p
            className="text-md md:text-md lg:text-lg leading-relaxed"
            style={{ color: "#1B1C1D" }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
