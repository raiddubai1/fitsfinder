"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-teal-600">PackSmart</span>
          </div>
          
          <nav className="flex flex-wrap justify-center items-center space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                  pathname === link.href ? "text-teal-600" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PackSmart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}