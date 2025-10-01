"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function FilterSidebar({
  collections = [],
  tags = [],
  priceRange = { min: 0, max: 10000 },
  activeFilters = {},
  onFilterChange,
  onClearAll,
}) {
  const [expandedSections, setExpandedSections] = useState({
    collections: true,
    tags: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCollectionToggle = (collection) => {
    const current = activeFilters.collections || [];
    const updated = current.includes(collection)
      ? current.filter((c) => c !== collection)
      : [...current, collection];
    onFilterChange("collections", updated);
  };

  const handleTagToggle = (tag) => {
    const current = activeFilters.tags || [];
    const updated = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    onFilterChange("tags", updated);
  };

  const handlePriceChange = (type, value) => {
    onFilterChange("priceRange", {
      ...(activeFilters.priceRange || {}),
      [type]: parseFloat(value) || 0,
    });
  };

  const handleAvailabilityToggle = (value) => {
    onFilterChange("availability", value);
  };

  const activeFilterCount =
    (activeFilters.collections?.length || 0) +
    (activeFilters.tags?.length || 0) +
    (activeFilters.priceRange ? 1 : 0) +
    (activeFilters.availability ? 1 : 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <h2 className="text-lg font-bold tracking-tight">FILTERS</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-gray-600 hover:text-gray-900 underline"
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Collections Filter */}
      <div className="mb-6 pb-6 border-b">
        <button
          onClick={() => toggleSection("collections")}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Collections ({collections.length})
          </h3>
          {expandedSections.collections ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.collections && (
          <div className="space-y-2">
            {collections.length === 0 ? (
              <p className="text-sm text-gray-500 italic p-2">No collections available</p>
            ) : (
              collections.map((collection) => (
                <label
                  key={collection}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.collections?.includes(collection)}
                    onChange={() => handleCollectionToggle(collection)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">{collection}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* Tags Filter */}
      <div className="mb-6 pb-6 border-b">
        <button
          onClick={() => toggleSection("tags")}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Tags ({tags.length})
          </h3>
          {expandedSections.tags ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.tags && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {tags.length === 0 ? (
              <p className="text-sm text-gray-500 italic p-2">No tags available</p>
            ) : (
              tags.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.tags?.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">{tag}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Price Range
          </h3>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Min</label>
              <input
                type="number"
                min="0"
                max={priceRange.max}
                value={activeFilters.priceRange?.min || ""}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                placeholder={`$${priceRange.min}`}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Max</label>
              <input
                type="number"
                min={activeFilters.priceRange?.min || 0}
                max={priceRange.max}
                value={activeFilters.priceRange?.max || ""}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                placeholder={`$${priceRange.max}`}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div>
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Availability
          </h3>
          {expandedSections.availability ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.availability && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <input
                type="radio"
                name="availability"
                checked={!activeFilters.availability}
                onChange={() => handleAvailabilityToggle(null)}
                className="w-4 h-4 border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700">All Products</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <input
                type="radio"
                name="availability"
                checked={activeFilters.availability === "in-stock"}
                onChange={() => handleAvailabilityToggle("in-stock")}
                className="w-4 h-4 border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <input
                type="radio"
                name="availability"
                checked={activeFilters.availability === "out-of-stock"}
                onChange={() => handleAvailabilityToggle("out-of-stock")}
                className="w-4 h-4 border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700">Out of Stock</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
