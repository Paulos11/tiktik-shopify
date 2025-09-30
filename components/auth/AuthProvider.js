"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";

export default function AuthProvider({ children }) {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth state when the app loads
    initAuth();
  }, [initAuth]);

  return <>{children}</>;
}