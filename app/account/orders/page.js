"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download
} from "lucide-react";

export default function OrdersPage() {
  const { user, isAuthenticated, isLoading, getOrders } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/account/orders");
    }
  }, [isAuthenticated, isLoading, router]);

  // Fetch orders
  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const orderData = await getOrders(20); // Get up to 20 orders
          setOrders(orderData);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoadingOrders(false);
        }
      };

      fetchOrders();
    }
  }, [isAuthenticated, user, getOrders]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "fulfilled":
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
      case "authorized":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "partially_fulfilled":
        return <Truck className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "fulfilled":
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
      case "authorized":
        return "bg-yellow-100 text-yellow-800";
      case "partially_fulfilled":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || (!isAuthenticated && isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Link href="/account">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Account
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Package className="h-6 w-6 mr-2" />
                Order History
              </h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingOrders ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.processedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {order.totalPriceV2.currencyCode} {order.totalPriceV2.amount}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(order.fulfillmentStatus || order.financialStatus)}
                        <Badge className={getStatusColor(order.fulfillmentStatus || order.financialStatus)}>
                          {(order.fulfillmentStatus || order.financialStatus || 'Processing').replace(/_/g, ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Order Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Items:</span>
                        <p className="font-medium">{order.lineItems.edges.length}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Subtotal:</span>
                        <p className="font-medium">
                          {order.subtotalPriceV2.currencyCode} {order.subtotalPriceV2.amount}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Shipping:</span>
                        <p className="font-medium">
                          {order.totalShippingPriceV2?.amount > 0
                            ? `${order.totalShippingPriceV2.currencyCode} ${order.totalShippingPriceV2.amount}`
                            : 'Free'
                          }
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Tax:</span>
                        <p className="font-medium">
                          {order.totalTaxV2?.amount > 0
                            ? `${order.totalTaxV2.currencyCode} ${order.totalTaxV2.amount}`
                            : '-'
                          }
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Items Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Order Items</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedOrder(
                            expandedOrder === order.id ? null : order.id
                          )}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {expandedOrder === order.id ? 'Hide' : 'View'} Details
                        </Button>
                      </div>

                      {/* Collapsed view - show first few items */}
                      {expandedOrder !== order.id && (
                        <div className="space-y-2">
                          {order.lineItems.edges.slice(0, 2).map(({ node: item }) => (
                            <div key={item.variant.id} className="flex items-center space-x-3">
                              {item.variant.image && (
                                <div className="relative w-12 h-12 bg-gray-100 rounded">
                                  <Image
                                    src={item.variant.image.url}
                                    alt={item.variant.image.altText || item.title}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.title}
                                </p>
                                {item.variant.title !== 'Default Title' && (
                                  <p className="text-xs text-gray-500">{item.variant.title}</p>
                                )}
                              </div>
                              <div className="text-sm text-gray-900">
                                Qty: {item.quantity}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.variant.priceV2.currencyCode} {item.variant.priceV2.amount}
                              </div>
                            </div>
                          ))}
                          {order.lineItems.edges.length > 2 && (
                            <p className="text-sm text-gray-500">
                              +{order.lineItems.edges.length - 2} more items
                            </p>
                          )}
                        </div>
                      )}

                      {/* Expanded view - show all items */}
                      {expandedOrder === order.id && (
                        <div className="space-y-3">
                          {order.lineItems.edges.map(({ node: item }) => (
                            <div key={item.variant.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              {item.variant.image && (
                                <div className="relative w-16 h-16 bg-white rounded">
                                  <Image
                                    src={item.variant.image.url}
                                    alt={item.variant.image.altText || item.title}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/products/${item.variant.product.handle}`}
                                  className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                >
                                  {item.title}
                                </Link>
                                {item.variant.title !== 'Default Title' && (
                                  <p className="text-xs text-gray-500 mt-1">{item.variant.title}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-900">Qty: {item.quantity}</p>
                                <p className="text-sm font-medium text-gray-900">
                                  {item.variant.priceV2.currencyCode} {item.variant.priceV2.amount}
                                </p>
                              </div>
                            </div>
                          ))}

                          {/* Shipping Address */}
                          {order.shippingAddress && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <h5 className="font-medium mb-2">Shipping Address</h5>
                              <div className="text-sm text-gray-600">
                                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                <p>{order.shippingAddress.address1}</p>
                                {order.shippingAddress.address2 && (
                                  <p>{order.shippingAddress.address2}</p>
                                )}
                                <p>
                                  {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                                {order.shippingAddress.phone && (
                                  <p>Phone: {order.shippingAddress.phone}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                      {(order.fulfillmentStatus === 'fulfilled' || order.fulfillmentStatus === 'partially_fulfilled') && (
                        <Button variant="outline" size="sm">
                          <Truck className="h-4 w-4 mr-1" />
                          Track Package
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">
                When you place your first order, it will appear here.
              </p>
              <Link href="/products">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}