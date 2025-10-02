"use client";
import { Package, Truck, RotateCcw, Clock, CheckCircle } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shipping & Returns
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about delivery and returns
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <Truck className="w-8 h-8 text-gray-900 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over €100</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <Clock className="w-8 h-8 text-gray-900 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">3-5 Days</h3>
            <p className="text-sm text-gray-600">Standard delivery</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <RotateCcw className="w-8 h-8 text-gray-900 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">30 Days</h3>
            <p className="text-sm text-gray-600">Easy returns</p>
          </div>
        </div>

        {/* Shipping Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Shipping Information
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Delivery Times
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Malta</span>
                  <span className="font-semibold text-gray-900">
                    1-2 business days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Europe</span>
                  <span className="font-semibold text-gray-900">
                    3-5 business days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">International</span>
                  <span className="font-semibold text-gray-900">
                    5-10 business days
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Shipping Costs
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Free standard shipping on all orders over €100</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Standard shipping: €5.95 for orders under €100</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Express shipping available at checkout</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Order Processing
              </h3>
              <p className="text-gray-700 mb-3">
                Orders are processed Monday to Friday, excluding public
                holidays. Orders placed after 2:00 PM will be processed the next
                business day.
              </p>
              <p className="text-gray-700">
                You will receive a confirmation email with tracking information
                once your order ships.
              </p>
            </div>
          </div>
        </section>

        {/* Returns & Exchanges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Returns & Exchanges
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                30-Day Return Policy
              </h3>
              <p className="text-gray-700 mb-4">
                We offer a 30-day return policy on all items. If you&#39;re not
                completely satisfied with your purchase, you may return it
                within 30 days of delivery for a full refund or exchange.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Items must be unworn, unused, and in
                  their original packaging with all tags attached.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How to Return
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <span>
                    Contact our customer service at info@tiktikwatch.com with
                    your order number
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <span>
                    We&#39;ll provide you with a return authorization and
                    shipping label
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <span>Pack the item securely in its original packaging</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </span>
                  <span>Ship the item back using the provided label</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    5
                  </span>
                  <span>
                    Refund processed within 5-7 business days of receiving the
                    return
                  </span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Return Shipping
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Free returns on orders over €100</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Return shipping fee of €5.95 applies to orders under €100
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Non-Returnable Items
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Personalized or customized items</li>
                <li>• Items marked as final sale</li>
                <li>• Gift cards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gray-50 rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about shipping or returns, our customer
            service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:info@tiktikwatch.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Email Us
            </a>
            <a
              href="tel:+35699676602"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition"
            >
              Call Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
