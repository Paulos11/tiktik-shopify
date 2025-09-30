"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import AuthProvider from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-work-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" className={workSans.variable}>
      <head>
        <title>TIKTIK WATCH - Premium Timepieces</title>
        <meta
          name="description"
          content="Discover our collection of premium watches"
        />
      </head>
      <body className={workSans.className}>
        <AuthProvider>
          <AnnouncementBar />
          <Header isScrolled={isScrolled} />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
