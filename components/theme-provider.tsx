"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    // Force dark theme always for our pub-themed app
    root.classList.add("dark");
  }, []);

  return <>{children}</>;
}