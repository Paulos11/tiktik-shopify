import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/white-logo.png"
                alt="TIKTIK"
                width={160}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Independent Swiss watchmaker crafting exceptional timepieces since
              2024. Precision, elegance, and innovation in every detail.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-sm tracking-[0.2em] uppercase mb-5 text-white">
              SHOP
            </h3>
            <ul className="space-y-3">
              {[
                { name: "All Watches", href: "/products" },
                { name: "Collections", href: "/collections" },
                { name: "New Arrivals", href: "/new-arrivals" },
                { name: "Limited Edition", href: "/limited-edition" },
                { name: "Accessories", href: "/accessories" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="font-semibold text-sm tracking-[0.2em] uppercase mb-5 text-white">
              INFORMATION
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Shipping & Returns", href: "/shipping" },
                { name: "Warranty", href: "/warranty" },
                { name: "Care Guide", href: "/care-guide" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm tracking-[0.2em] uppercase mb-5 text-white">
              NEWSLETTER
            </h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-zinc-900 border border-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <Mail size={18} />
                </button>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                By subscribing you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2024 TIKTIK. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Badge */}
      <div className="bg-zinc-900 border-t border-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 text-xs font-medium tracking-[0.15em] uppercase">
            <span className="text-white">Swiss Made</span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span className="text-white">5 Year Warranty</span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span className="text-white">Free Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
