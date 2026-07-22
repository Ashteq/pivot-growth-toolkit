// src/components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Type, Activity, Users, Settings } from "lucide-react";

const NAV_ITEMS = [
  { name: "Headline Hero", href: "/headline-hero", icon: Type },
  { name: "MetaMorphosis", href: "/metamorphosis", icon: Activity },
  { name: "Persona Builder", href: "/persona-builder", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50 h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="font-semibold text-gray-900 tracking-tight flex items-center">
          <div className="w-6 h-6 bg-gray-900 rounded-md mr-2 flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          Pivot
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Growth Tools
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? "bg-gray-200 text-gray-900" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className={`mr-3 h-4 w-4 ${isActive ? "text-gray-900" : "text-gray-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
          <Settings className="mr-3 h-4 w-4 text-gray-400" />
          Settings
        </button>
      </div>
    </div>
  );
}