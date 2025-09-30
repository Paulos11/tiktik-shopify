"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Star
} from "lucide-react";

export default function AddressesPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/account/addresses");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || (!isAuthenticated && isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading addresses...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  const addresses = user.addresses?.edges?.map(edge => edge.node) || [];
  const defaultAddress = user.defaultAddress;

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
                <MapPin className="h-6 w-6 mr-2" />
                Address Book
              </h1>
              <p className="text-gray-600">Manage your shipping and billing addresses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Saved Addresses</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>

        {addresses.length > 0 || defaultAddress ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Address */}
            {defaultAddress && (
              <Card className="border-2 border-blue-200 bg-blue-50/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center">
                      <Star className="h-4 w-4 mr-2 text-blue-600" />
                      Default Address
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">Primary</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">
                      {defaultAddress.firstName} {defaultAddress.lastName}
                    </p>
                    {defaultAddress.company && (
                      <p className="text-gray-600">{defaultAddress.company}</p>
                    )}
                    <p className="text-gray-600">{defaultAddress.address1}</p>
                    {defaultAddress.address2 && (
                      <p className="text-gray-600">{defaultAddress.address2}</p>
                    )}
                    <p className="text-gray-600">
                      {defaultAddress.city}, {defaultAddress.province} {defaultAddress.zip}
                    </p>
                    <p className="text-gray-600">{defaultAddress.country}</p>
                    {defaultAddress.phone && (
                      <p className="text-gray-600">Phone: {defaultAddress.phone}</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other Addresses */}
            {addresses
              .filter(addr => addr.id !== defaultAddress?.id)
              .map((address) => (
                <Card key={address.id}>
                  <CardHeader>
                    <CardTitle className="text-base">Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">
                        {address.firstName} {address.lastName}
                      </p>
                      {address.company && (
                        <p className="text-gray-600">{address.company}</p>
                      )}
                      <p className="text-gray-600">{address.address1}</p>
                      {address.address2 && (
                        <p className="text-gray-600">{address.address2}</p>
                      )}
                      <p className="text-gray-600">
                        {address.city}, {address.province} {address.zip}
                      </p>
                      <p className="text-gray-600">{address.country}</p>
                      {address.phone && (
                        <p className="text-gray-600">Phone: {address.phone}</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-1" />
                        Set Default
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
              <p className="text-gray-600 mb-6">
                Add your shipping and billing addresses to make checkout faster.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Address
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">Address Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Note:</strong> Address management through the Shopify Storefront API has limited capabilities.
              </p>
              <p>
                • You can view existing addresses saved to your account
              </p>
              <p>
                • Adding, editing, and deleting addresses require additional implementation
              </p>
              <p>
                • For full address management, please contact our support team
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}