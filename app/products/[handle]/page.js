"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductStore, useCartStore } from "@/lib/store";
import { productAPI } from "@/lib/api";
import ProductDetails from "@/components/product/ProductDetails";
import ProductGallery from "@/components/product/ProductGallery";
import ProductRecommendations from "@/components/product/ProductRecommendations";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { handle } = params;

  const {
    products,
    loading,
    error,
    selectedProduct,
    setSelectedProduct,
    fetchProducts,
    fetchRelatedProducts,
    clearError
  } = useProductStore();

  const [productData, setProductData] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productError, setProductError] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Fetch product by handle
  useEffect(() => {
    const fetchProductByHandle = async () => {
      if (!handle) return;

      setLoadingProduct(true);
      setProductError(null);

      try {
        // First try to find in existing products
        const existingProduct = products.find(p => p.handle === handle);

        if (existingProduct) {
          setProductData(existingProduct);
          setSelectedProduct(existingProduct);
          setLoadingProduct(false);
          return;
        }

        // If not found, fetch all products and find the one with matching handle
        const allProducts = await productAPI.fetchAll(100);
        const product = allProducts.find(p => p.handle === handle);

        if (product) {
          setProductData(product);
          setSelectedProduct(product);

          // Fetch related products
          try {
            const related = await fetchRelatedProducts(product, 4);
            setRecommendedProducts(related);
          } catch (error) {
            console.error("Failed to fetch related products:", error);
            // Fall back to general products if related fetch fails
            if (products.length > 0) {
              const fallbackProducts = products.filter(p => p.id !== product.id).slice(0, 4);
              setRecommendedProducts(fallbackProducts);
            }
          }
        } else {
          setProductError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProductError("Failed to load product. Please try again.");
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProductByHandle();
  }, [handle, products, setSelectedProduct, fetchRelatedProducts]);

  // Fetch products for recommendations if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(8);
    }
  }, [products.length, fetchProducts]);

  if (loadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (productError || !productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-4">
            <h2 className="font-bold text-lg mb-2">Product Not Found</h2>
            <p className="text-sm">
              {productError || "The product you're looking for doesn't exist."}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            <Button
              onClick={() => router.push("/products")}
              className="bg-black text-white hover:bg-gray-800"
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button
              onClick={() => router.push("/products")}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Products
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{productData.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <ProductGallery product={productData} />

          {/* Product Details */}
          <ProductDetails product={productData} />
        </div>
      </div>

      {/* Product Recommendations */}
      {recommendedProducts.length > 0 && (
        <ProductRecommendations
          products={recommendedProducts}
          currentProductId={productData.id}
        />
      )}
    </div>
  );
}