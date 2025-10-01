"use client";
import {
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Warranty Information
          </h1>
          <p className="text-xl text-gray-600">
            Your purchase is protected with our comprehensive warranty
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
            <Shield className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              2-Year Warranty
            </h3>
            <p className="text-sm text-gray-600">
              All watches include manufacturer warranty
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
            <Clock className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Lifetime Support
            </h3>
            <p className="text-sm text-gray-600">
              We are here to help beyond warranty period
            </p>
          </div>
        </div>

        {/* What is Covered */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            What is Covered
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Manufacturing Defects
                </h3>
                <p className="text-gray-700 text-sm">
                  Defects in materials or workmanship under normal use
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Movement Issues
                </h3>
                <p className="text-gray-700 text-sm">
                  Watch movement failures or inaccuracies beyond normal
                  tolerances
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Case and Crystal
                </h3>
                <p className="text-gray-700 text-sm">
                  Manufacturing defects in watch case or crystal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Water Resistance
                </h3>
                <p className="text-gray-700 text-sm">
                  Failure of water resistance seals under rated conditions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Not Covered */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            What is Not Covered
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Normal Wear and Tear
                </h3>
                <p className="text-gray-700 text-sm">
                  Scratches, scuffs, or general aging from regular use
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Accidental Damage
                </h3>
                <p className="text-gray-700 text-sm">
                  Damage from drops, impacts, or accidents
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Unauthorized Repairs
                </h3>
                <p className="text-gray-700 text-sm">
                  Repairs performed by non-authorized service centers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Battery and Straps
                </h3>
                <p className="text-gray-700 text-sm">
                  Battery replacements and strap wear (consumable items)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Misuse or Neglect
                </h3>
                <p className="text-gray-700 text-sm">
                  Damage from improper use, storage, or maintenance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Claim */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            How to Make a Warranty Claim
          </h2>

          <ol className="space-y-6">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
                <p className="text-gray-700 text-sm">
                  Email info@tiktikwatch.com with your order number and
                  description of the issue
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Assessment</h3>
                <p className="text-gray-700 text-sm">
                  Our team will review your claim and may request photos or
                  additional information
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                3
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Return Authorization
                </h3>
                <p className="text-gray-700 text-sm">
                  If approved, we will provide a return authorization and
                  prepaid shipping label
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                4
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Repair or Replace
                </h3>
                <p className="text-gray-700 text-sm">
                  We will repair or replace your item and return it within 10-15
                  business days
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Important Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Important Information
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3 text-sm">
            <div className="flex gap-2">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Keep Your Proof of Purchase
                </p>
                <p className="text-blue-800">
                  Your original receipt or order confirmation is required for
                  warranty claims
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Register Your Watch
                </p>
                <p className="text-blue-800">
                  Some manufacturers offer extended warranty when you register
                  within 30 days of purchase
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Regular Maintenance
                </p>
                <p className="text-blue-800">
                  We recommend professional servicing every 3-5 years to
                  maintain warranty coverage
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Fixed Links */}
        <section className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-inner">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Questions About Warranty?
          </h2>
          <p className="text-gray-700 mb-6">
            Our customer service team is ready to help with any warranty-related
            questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* FIX APPLIED: Added opening <a> tag for the mailto link */}
            <a
              href="mailto:info@tiktikwatch.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              Contact Support
            </a>

            {/* FIX APPLIED: Added opening <a> tag for the contact page link */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition duration-300 bg-white hover:bg-gray-50"
            >
              Visit Contact Page
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
