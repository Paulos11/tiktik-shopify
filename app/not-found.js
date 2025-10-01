import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-gray-900 leading-none">
            404
          </h1>
          <div className="h-1 w-24 bg-gray-900 mx-auto mt-4"></div>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm font-semibold text-gray-900 mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Products
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              About Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Contact
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/shipping"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
