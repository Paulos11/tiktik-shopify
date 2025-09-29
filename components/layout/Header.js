"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Heart, ShoppingBag, Menu, X } from "lucide-react";

export default function Header({ isScrolled }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out transform ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${
          isScrolled
            ? "bg-zinc-900/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 animate-slideDown">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 group transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setIsHovering("logo")}
              onMouseLeave={() => setIsHovering(null)}
            >
              <Image
                src={isScrolled ? "/white-logo.png" : "/black-logo.png"}
                alt="TIKTIK"
                width={180}
                height={60}
                className={`h-14 w-auto transition-all duration-500 ${
                  isHovering === "logo" ? "filter brightness-110" : ""
                }`}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {[
                { name: "Home", href: "/" },
                { name: "Watches", href: "/products" },
                { name: "Collections", href: "/collections" },
                { name: "About", href: "/about" },
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 relative group transform hover:scale-110 ${
                    isScrolled
                      ? "text-white hover:text-gray-200"
                      : "text-black hover:text-gray-700"
                  } animate-slideDown`}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                  onMouseEnter={() => setIsHovering(`nav-${index}`)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                      isHovering === `nav-${index}` ? "w-full" : "w-0"
                    } ${isScrolled ? "bg-white" : "bg-black"}`}
                  ></span>
                  <span
                    className={`absolute inset-0 rounded-md opacity-0 transition-all duration-300 ${
                      isHovering === `nav-${index}` ? "opacity-10" : "opacity-0"
                    } ${isScrolled ? "bg-white" : "bg-black"}`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div
              className="flex items-center space-x-2 sm:space-x-3 animate-slideDown"
              style={{ animationDelay: "600ms" }}
            >
              <button
                className={`hidden sm:flex p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${
                  isScrolled
                    ? "text-white hover:bg-white/20 hover:shadow-lg"
                    : "text-black hover:bg-black/10 hover:shadow-md"
                }`}
                aria-label="Account"
                onMouseEnter={() => setIsHovering("account")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <User
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${
                    isHovering === "account" ? "stroke-2" : "stroke-1.5"
                  }`}
                />
              </button>

              <button
                className={`p-2 rounded-full transition-all duration-300 relative transform hover:scale-110 hover:-rotate-6 group ${
                  isScrolled
                    ? "text-white hover:bg-white/20 hover:shadow-lg"
                    : "text-black hover:bg-black/10 hover:shadow-md"
                }`}
                aria-label="Wishlist"
                onMouseEnter={() => setIsHovering("wishlist")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${
                    isHovering === "wishlist"
                      ? "fill-current stroke-2"
                      : "stroke-1.5"
                  }`}
                />
              </button>

              <button
                className={`p-2 rounded-full transition-all duration-300 relative transform hover:scale-110 hover:rotate-6 group ${
                  isScrolled
                    ? "text-white hover:bg-white/20 hover:shadow-lg"
                    : "text-black hover:bg-black/10 hover:shadow-md"
                }`}
                aria-label="Cart"
                onMouseEnter={() => setIsHovering("cart")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${
                    isHovering === "cart" ? "stroke-2" : "stroke-1.5"
                  }`}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                } ${
                  isScrolled
                    ? "text-white hover:bg-white/20 hover:shadow-lg"
                    : "text-black hover:bg-black/10 hover:shadow-md"
                }`}
                aria-label="Menu"
              >
                <div className="relative w-5 h-5">
                  <Menu
                    size={20}
                    className={`absolute inset-0 transition-all duration-300 transform ${
                      isMobileMenuOpen
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={20}
                    className={`absolute inset-0 transition-all duration-300 transform ${
                      isMobileMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } border-t ${
            isScrolled
              ? "bg-zinc-900/95 backdrop-blur-md border-zinc-800"
              : "bg-white/95 backdrop-blur-md border-gray-100"
          }`}
        >
          <nav className="px-4 py-6 space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "Watches", href: "/products" },
              { name: "Collections", href: "/collections" },
              { name: "About", href: "/about" },
            ].map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                  isScrolled
                    ? "text-white hover:text-gray-300"
                    : "text-black hover:text-gray-600"
                } animate-slideInLeft`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div
              className={`pt-4 border-t animate-slideInLeft ${
                isScrolled ? "border-zinc-800" : "border-gray-100"
              }`}
              style={{ animationDelay: "400ms" }}
            >
              <Link
                href="/account"
                className={`flex items-center space-x-3 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                  isScrolled
                    ? "text-white hover:text-gray-300"
                    : "text-black hover:text-gray-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User
                  size={18}
                  className="transition-transform duration-300 hover:rotate-12"
                />
                <span>Account</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
