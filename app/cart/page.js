"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  ShoppingBag
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    isLoading,
    updateCartItem,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
    checkout
  } = useCartStore();

  const { isAuthenticated, user } = useAuthStore();
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const cartItems = cart?.lineItems || [];
  const cartTotal = getCartTotal();
  const cartItemsCount = getCartItemsCount();

  const handleQuantityUpdate = async (lineItemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingItems(prev => new Set([...prev, lineItemId]));

    try {
      await updateCartItem(lineItemId, newQuantity);
      toast({
        title: "Cart Updated",
        description: "Item quantity has been updated",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update cart",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(lineItemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (lineItemId) => {
    setUpdatingItems(prev => new Set([...prev, lineItemId]));

    try {
      await removeFromCart(lineItemId);
      toast({
        title: "Item Removed",
        description: "Item has been removed from cart",
      });
    } catch (error) {
      toast({
        title: "Remove Failed",
        description: error.message || "Failed to remove item",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(lineItemId);
        return newSet;
      });
    }
  };

  const handleCheckout = async () => {
    try {
      // Checkout works for both authenticated and guest users
      // Shopify will handle guest checkout automatically
      await checkout();
      // The checkout function will redirect to Shopify checkout
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: error.message || "Failed to start checkout",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2" />
                Shopping Cart ({cartItemsCount})
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">
                Add some amazing watches to get started!
              </p>
              <Link href="/products">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const isUpdating = updatingItems.has(item.id);
                const product = item.variant;

                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        {product.image && (
                          <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={product.image.url}
                              alt={product.image.altText || item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.title}
                          </h3>
                          {product.title !== 'Default Title' && (
                            <p className="text-sm text-gray-500 mt-1">
                              {product.title}
                            </p>
                          )}
                          <p className="text-lg font-semibold text-gray-900 mt-2">
                            {product.priceV2.currencyCode} {product.priceV2.amount}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                            disabled={isUpdating || item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 text-center min-w-[50px]">
                            {isUpdating ? "..." : item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                            disabled={isUpdating}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isUpdating}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        {cart?.subtotalPriceV2?.currencyCode || 'USD'} {cartTotal}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-gray-600">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="text-gray-600">Calculated at checkout</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>
                      {cart?.totalPriceV2?.currencyCode || 'USD'} {cartTotal}
                    </span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                    disabled={isLoading || cartItems.length === 0}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                  </Button>

                  {!isAuthenticated && (
                    <div className="text-xs text-center text-gray-500 mt-2 space-y-1">
                      <p>✅ Guest checkout available</p>
                      <p>
                        <Link href="/login?redirect=/cart" className="text-blue-600 hover:underline">
                          Sign in
                        </Link> for faster checkout & order tracking
                      </p>
                    </div>
                  )}

                  {isAuthenticated && (
                    <p className="text-xs text-center text-green-600 mt-2">
                      ✅ Signed in as {user?.firstName || user?.email}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}