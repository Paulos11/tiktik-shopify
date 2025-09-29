"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "RACING COLLECTION",
    subtitle: "Speed Meets Precision",
    image: "/banners/1.jpeg",
    href: "/collections/racing",
    badge: "NEW",
  },
  {
    id: 2,
    title: "CLASSIC ELEGANCE",
    subtitle: "Timeless Design",
    image: "/banners/2.jpeg",
    href: "/collections/classic",
    badge: "BESTSELLER",
  },
  {
    id: 3,
    title: "SPORT SERIES",
    subtitle: "Built for Action",
    image: "/banners/3.jpeg",
    href: "/collections/sport",
    badge: "LIMITED",
  },
  {
    id: 4,
    title: "DRESS WATCHES",
    subtitle: "Refined Sophistication",
    image: "/banners/4.jpeg",
    href: "/collections/dress",
    badge: "EXCLUSIVE",
  },
];

export default function BannerGridSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="group relative h-64 lg:h-80 overflow-hidden bg-black"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
                {/* Badge */}
                <div className="flex justify-end">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[9px] font-semibold tracking-[0.2em] uppercase">
                    {banner.badge}
                  </span>
                </div>

                {/* Title & CTA */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">
                    {banner.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 font-light">
                    {banner.subtitle}
                  </p>
                  <div className="inline-flex items-center text-white text-xs font-semibold tracking-[0.15em] uppercase group-hover:gap-2 transition-all duration-300">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
