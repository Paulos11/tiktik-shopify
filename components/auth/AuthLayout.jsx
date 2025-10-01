// AuthLayout.jsx - Reusable layout component
"use client";
import Image from "next/image";

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <Image
          src="/hero/3.png"
          alt="Luxury Watches"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        {/* <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-light tracking-tight mb-4">
            TIMELESS
            <span className="block font-bold">ELEGANCE</span>
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Discover the art of Swiss watchmaking with our exclusive collection
            of luxury timepieces.
          </p>
        </div> */}
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/auth-banner.jpg"
            alt="Luxury Watches"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md">
          <div className="border-0 shadow-2xl lg:shadow-lg bg-white/95 lg:bg-white backdrop-blur-sm rounded-lg">
            <div className="space-y-1 text-center p-6 pb-4">
              <h2 className="text-3xl font-light tracking-tight">{title}</h2>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
            <div className="px-6 pb-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
