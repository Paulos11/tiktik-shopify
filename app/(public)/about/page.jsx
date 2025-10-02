// app/AboutPage.jsx (or whatever your original file is named)
"use client";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Package,
  Store,
} from "lucide-react";

// Import the new reusable component
import HeroHeader from "@/components/layout/HeroHeader";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* REPLACED THE ORIGINAL HEADER SECTION WITH THE REUSABLE COMPONENT
        Passing title, subtitle, and image source as props
      */}
      <HeroHeader
        title="About TikTik"
        subtitle="Swiss timepieces & Bearbrick art toys. Where precision meets creativity."
        bgImageSrc="/head-banner.jpg"
      />

      {/* Main Content (rest of the original component) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* About Text */}
          <div className="space-y-6">
            {/* ... (rest of the content) ... */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <div className="prose prose-gray">
                <p className="text-gray-700 leading-relaxed mb-4">
                  TikTik is a unique destination where the world of precision
                  Swiss timepieces meets the creative universe of collectible
                  art toys. Located in the heart of Malta, we curate a
                  distinctive collection that appeals to both watch enthusiasts
                  and art collectors.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  From iconic Bearbrick collectibles to premium watches, each
                  piece in our collection is carefully selected to represent the
                  perfect blend of craftsmanship, design, and cultural
                  significance.
                </p>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 gap-4 pt-6">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Jewellery & Watches
                  </h3>
                  <p className="text-sm text-gray-600">
                    Premium timepieces and accessories
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Package className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Gift Shop
                  </h3>
                  <p className="text-sm text-gray-600">
                    Unique gifts for every occasion
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Store className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Collectibles Shop
                  </h3>
                  <p className="text-sm text-gray-600">
                    Bearbrick and exclusive art toys
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit Us</h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">
                    Mdina Road
                    <br />
                    Ħaz-Zebbug, Malta
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a
                    href="tel:+35699676602"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    +356 9967 6602
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <div className="space-y-1">
                    <a
                      href="mailto:tiktikshop@icloud.com"
                      className="text-gray-600 hover:text-gray-900 transition block"
                    >
                      tiktikshop@icloud.com
                    </a>
                    <a
                      href="mailto:info@tiktikwatch.com"
                      className="text-gray-600 hover:text-gray-900 transition block"
                    >
                      info@tiktikwatch.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Website</h3>
                  <a
                    href="https://tiktikwatch.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    tiktikwatch.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.8!2d14.4!3d35.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDUyJzQ4LjAiTiAxNMKwMjQnMDAuMCJF!5e0!3m2!1sen!2smt!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TikTik Location Map"
              ></iframe>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Visit Our Store
            </h2>
            {/* FIX: Replaced the unescaped apostrophe (') with the HTML entity (&apos;) */}
            <p className="text-gray-600 mb-8">
              Experience our collection in person. We&apos;re open and ready to
              help you find the perfect timepiece or collectible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Shop Online
              </a>
              <a
                href="tel:+35699676602"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
