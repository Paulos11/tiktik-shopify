"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { XCircle, ArrowLeft, ShoppingCart, RefreshCw } from "lucide-react";

export default function CheckoutCancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Track cancelled checkout for analytics
    console.log("Checkout cancelled");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cancel Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Checkout Cancelled
          </h1>
          <p className="text-lg text-gray-600">
            Your order was cancelled. No payment has been processed.
          </p>
        </div>

        {/* Information Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Happened?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Your checkout process was cancelled before payment could be
              completed. This could happen for several reasons:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                You clicked the {'"'}Cancel{'"'} or {'"'}Back{'"'} button during
                checkout
              </li>
              <li>You closed the payment window</li>
              <li>The payment session expired</li>
              <li>There was a temporary payment processing issue</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-blue-800 text-sm">
                <strong>Good news:</strong> Your cart items are still saved and
                no payment was charged.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cart">
              <Button size="lg" className="w-full sm:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Checkout Again
              </Button>
            </Link>

            <Link href="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button variant="ghost" className="text-gray-500">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gray-50">
            <CardContent className="py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Need Help Completing Your Order?
              </h3>
              <p className="text-gray-600 mb-4">
                If you&#39;re having trouble with checkout or payment, our
                support team can assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="outline">Contact Support</Button>
                </Link>
                <Link href="/faq">
                  <Button variant="outline">Payment FAQ</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
