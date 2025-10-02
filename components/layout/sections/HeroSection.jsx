"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "PRECISION",
    subtitle: "REDEFINED",
    description:
      "Discover the art of Swiss watchmaking with our exclusive collection of luxury timepieces.",
    image: "/hero/3.png",
    badge: "NEW RACING COLLECTION",
    primaryButton: {
      text: "EXPLORE COLLECTION",
      link: "/collections/racing",
    },
    secondaryButton: {
      text: "WATCH VIDEO",
      link: "https://www.youtube.com/watch?v=fimifzBLqaU",
      showIcon: true,
      isVideo: true,
    },
  },
  {
    id: 2,
    title: "TIMELESS",
    subtitle: "ELEGANCE",
    description:
      "Where traditional craftsmanship meets contemporary design in perfect harmony.",
    image: "/hero/3.png",
    badge: "SWISS MADE",
    primaryButton: {
      text: "SHOP NOW",
      link: "/collections/classic",
    },
    secondaryButton: {
      text: "LEARN MORE",
      link: "/about",
      showIcon: false,
      isVideo: false,
    },
  },
  {
    id: 3,
    title: "LUXURY",
    subtitle: "UNLEASHED",
    description:
      "Experience the pinnacle of horological excellence with our master craftsmen's finest creations.",
    image: "/hero/3.jpeg",
    badge: "LIMITED EDITION",
    primaryButton: {
      text: "VIEW COLLECTION",
      link: "/collections/limited",
    },
    secondaryButton: {
      text: "DISCOVER STORY",
      link: "https://www.youtube.com/watch?v=fimifzBLqaU",
      showIcon: true,
      isVideo: true,
    },
  },
];

// Function to extract YouTube video ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoUrl: "" });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 150);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
      );
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const openVideoModal = (url) => {
    const videoId = getYouTubeId(url);
    if (videoId) {
      setVideoModal({
        isOpen: true,
        videoUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
      });
    }
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoUrl: "" });
  };

  const current = heroSlides[currentSlide];

  return (
    <>
      <section
        className={`relative h-[55vh] sm:h-[65vh] min-h-[550px] bg-black overflow-hidden transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              } ${
                isTransitioning && index === currentSlide ? "blur-sm" : "blur-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          ))}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 transition-opacity duration-300 ${
              isTransitioning ? "opacity-90" : "opacity-100"
            }`}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
            <div
              className={`max-w-2xl transition-all duration-500 transform ${
                isTransitioning
                  ? "opacity-50 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {/* Badge */}
              <div
                className="mb-5 animate-slideInUp"
                key={`badge-${currentSlide}`}
              >
                <span className="inline-block px-3.5 py-1.5 border border-white/25 text-[10px] font-medium tracking-[0.3em] uppercase text-white/90 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-default">
                  {current.badge}
                </span>
              </div>

              {/* Title */}
              <h1
                className="mb-5 animate-slideInUp animation-delay-200"
                key={`title-${currentSlide}`}
              >
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-1.5 hover:text-gray-200 transition-colors duration-300">
                  {current.title}
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white/70 hover:text-white/90 transition-colors duration-300">
                  {current.subtitle}
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-sm sm:text-base font-light leading-relaxed mb-7 max-w-xl text-white/85 animate-slideInUp animation-delay-400"
                key={`desc-${currentSlide}`}
              >
                {current.description}
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-3.5 animate-slideInUp animation-delay-600"
                key={`cta-${currentSlide}`}
              >
                {/* Primary Button */}
                <Link
                  href={current.primaryButton.link}
                  className="group inline-flex items-center justify-center px-7 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {current.primaryButton.text}
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>

                {/* Secondary Button */}
                {current.secondaryButton.isVideo ? (
                  <button
                    onClick={() => openVideoModal(current.secondaryButton.link)}
                    className="group inline-flex items-center justify-center px-7 py-3 border border-white/35 text-white text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:scale-105 hover:shadow-lg"
                  >
                    {current.secondaryButton.showIcon && (
                      <Play className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    )}
                    {current.secondaryButton.text}
                  </button>
                ) : (
                  <Link
                    href={current.secondaryButton.link}
                    className="group inline-flex items-center justify-center px-7 py-3 border border-white/35 text-white text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:scale-105 hover:shadow-lg"
                  >
                    {current.secondaryButton.showIcon && (
                      <Play className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    )}
                    {current.secondaryButton.text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-7 right-5 sm:right-6 lg:right-8 z-20 flex space-x-2 animate-fadeInUp animation-delay-1000">
          <button
            onClick={prevSlide}
            className="w-10 h-10 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm transform hover:scale-110 hover:-rotate-3 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 group-hover:animate-pulse" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm transform hover:scale-110 hover:rotate-3 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 group-hover:animate-pulse" />
          </button>
        </div>
      </section>

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-5xl mx-4 aspect-video animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video iframe */}
            <iframe
              src={videoModal.videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out both;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out both;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out both;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animation-delay-1200 {
          animation-delay: 1200ms;
        }
      `}</style>
    </>
  );
}
