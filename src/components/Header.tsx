"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-100/20 bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container flex h-16 items-center justify-between px-6 md:px-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
              PackSmart
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-teal-600 ${
              pathname === "/" ? "text-teal-600 font-semibold" : "text-gray-600 hover:text-teal-600"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/blog" 
            className={`text-sm font-medium transition-colors hover:text-teal-600 ${
              pathname === "/blog" ? "text-teal-600 font-semibold" : "text-gray-600 hover:text-teal-600"
            }`}
          >
            Blog
          </Link>
          <Link 
            href="/trip-details" 
            className={`text-sm font-medium transition-colors hover:text-teal-600 ${
              pathname === "/trip-details" ? "text-teal-600 font-semibold" : "text-gray-600 hover:text-teal-600"
            }`}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}