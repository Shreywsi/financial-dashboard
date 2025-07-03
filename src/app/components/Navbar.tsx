"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator as CalculatorIcon, Home, FileText, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const navLinks = [
    { href: "/", label: "Calculators", icon: <CalculatorIcon className="h-4 w-4 mr-1" /> },
    { href: "/calculators/credit-card-comparison", label: "Compare Cards", icon: <CreditCard className="h-4 w-4 mr-1" /> },
    { href: "/calculators/privacy-policy", label: "Privacy Policy", icon: <FileText className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 text-black shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <CalculatorIcon className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-black">
              Financial<span className="text-blue-600">Tools</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === href
                        ? "border-blue-600 text-black font-semibold"
                        : "border-transparent text-gray-600 hover:text-black hover:border-blue-400"
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className={`block h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`hidden h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === href ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <div className="flex items-center">
                {icon}
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
