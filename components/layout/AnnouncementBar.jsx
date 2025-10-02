"use client";
import { useState, useEffect } from "react";

export default function AnnouncementBar() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after the component mounts
    setIsLoaded(true);
  }, []);

  const announcements = [
    "FREE SHIPPING WORLDWIDE",
    "RACING COLLECTION BACK IN STOCK",
    "INDEPENDENT SWISS WATCHMAKER",
  ];

  return (
    <>
      <div
        className={`bg-black text-white h-9 flex items-center overflow-hidden transition-all duration-500 ease-out transform ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex animate-scroll whitespace-nowrap">
          {[...announcements, ...announcements].map((announcement, index) => (
            <div key={index} className="flex items-center">
              <span className="px-8 text-[10px] font-medium tracking-[0.25em] uppercase">
                {announcement}
              </span>
              <span className="text-gray-600 text-xs">•</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </>
  );
}
