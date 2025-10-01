"use client";
import { useState, useEffect } from "react";

export default function TestTagsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Tags Debug</h1>
      <p className="mb-4">Total products: {products.length}</p>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-600">Handle:</p>
                <p className="text-gray-900">{product.handle}</p>
              </div>

              <div>
                <p className="font-medium text-gray-600">Product Type:</p>
                <p className="text-gray-900">{product.productType || "None"}</p>
              </div>

              <div className="col-span-2">
                <p className="font-medium text-gray-600">Tags:</p>
                {product.tags && product.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No tags</p>
                )}
              </div>

              <div className="col-span-2">
                <p className="font-medium text-gray-600">Raw Tags Data:</p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(product.tags, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
