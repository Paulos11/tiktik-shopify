"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartSheet() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, openCart } = useCartStore();

  const cartItemsCount = cart?.lineItems?.length || 0;

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50"></header>
  );
}
