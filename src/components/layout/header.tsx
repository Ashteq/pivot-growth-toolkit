// src/components/layout/header.tsx
"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  // Clean up the pathname to display as a title (e.g., /headline-hero -> Headline Hero)
  const title = pathname
    .replace("/", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Dashboard";

  return (
    <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center px-8">
      <div className="flex items-center text-sm">
        <span className="text-gray-400 font-medium mr-2">Workspace</span>
        <span className="text-gray-300 mr-2">/</span>
        <span className="text-gray-900 font-medium">{title}</span>
      </div>
    </header>
  );
}