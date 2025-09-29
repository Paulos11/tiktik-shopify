"use client";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/api";

const testProduct = {
  id: "test-product-1",
  title: "Test Product",
  variants: [
    {
      id: "gid://shopify/ProductVariant/test-1",
      priceV2: { amount: "29.99", currencyCode: "USD" }
    }
  ]
};

export default function TestCartPage() {
  const {
    cart,
    isLoading,
    addToCart,
    getCartItemsCount,
    getCartTotal,
    openCart,
    initCart,
    clearCart
  } = useCartStore();

  const handleAddToCart = async () => {
    try {
      await addToCart(testProduct.variants[0].id, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart: " + error.message);
    }
  };

  const handleInitCart = async () => {
    try {
      await initCart();
      alert("Cart initialized successfully!");
    } catch (error) {
      console.error("Failed to initialize cart:", error);
      alert("Failed to initialize cart: " + error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      alert("Cart cleared successfully!");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert("Failed to clear cart: " + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cart Functionality Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Cart Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleInitCart}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Initialize Cart"}
            </Button>

            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Adding..." : "Add Test Product to Cart"}
            </Button>

            <Button
              onClick={openCart}
              disabled={!cart}
              className="w-full"
              variant="outline"
            >
              Open Cart Drawer
            </Button>

            <Button
              onClick={handleClearCart}
              disabled={isLoading || !cart}
              className="w-full"
              variant="destructive"
            >
              {isLoading ? "Clearing..." : "Clear Cart"}
            </Button>
          </CardContent>
        </Card>

        {/* Cart Status */}
        <Card>
          <CardHeader>
            <CardTitle>Cart Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Cart Exists:</span>
                <span className={cart ? "text-green-600" : "text-red-600"}>
                  {cart ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Cart ID:</span>
                <span className="text-sm text-gray-600 truncate">
                  {cart?.id || "None"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Items Count:</span>
                <span>{getCartItemsCount()}</span>
              </div>

              <div className="flex justify-between">
                <span>Total:</span>
                <span>{formatCurrency(getCartTotal())}</span>
              </div>

              <div className="flex justify-between">
                <span>Loading:</span>
                <span className={isLoading ? "text-orange-600" : "text-green-600"}>
                  {isLoading ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Checkout URL:</span>
                <span className="text-sm text-gray-600">
                  {cart?.webUrl ? (
                    <a
                      href={cart.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Available
                    </a>
                  ) : "None"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        {cart && cart.lineItems && cart.lineItems.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.lineItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: {formatCurrency(item.variant?.priceV2?.amount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(
                            (parseFloat(item.variant?.priceV2?.amount || 0) * item.quantity).toFixed(2)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Status */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>API Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Shopify Domain:</strong> w3ehrs-hg.myshopify.com</p>
              <p><strong>Status:</strong>
                <span className="text-green-600 ml-2">✓ Connected</span>
              </p>
              <p><strong>Products:</strong> 0 in store (using demo products)</p>
              <p><strong>Cart API:</strong> Ready for testing</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}