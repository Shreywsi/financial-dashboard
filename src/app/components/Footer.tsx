"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info Section */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
              FINANCIAL TOOLS
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-md">
              Find the perfect financial solutions in India by comparing 
              the most rewarding options in one place!
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <a 
                href="/about" 
                className="block text-blue-100 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 transform transition-transform"
              >
                About
              </a>
              <a 
                href="/contact" 
                className="block text-blue-100 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 transform transition-transform"
              >
                Contact
              </a>
              <a 
                href="/blog" 
                className="block text-blue-100 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 transform transition-transform"
              >
                Blog
              </a>
              <a 
                href="/terms" 
                className="block text-blue-100 hover:text-white transition-colors duration-200 text-lg hover:translate-x-1 transform transition-transform"
              >
                Terms & Conditions
              </a>
            </nav>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Info
            </h3>
            <div className="text-blue-100 space-y-2">
              <p className="text-lg leading-relaxed">
                SCO 208, 1st Floor, Sector 14, Panchkula, Haryana 134109
              </p>
              <p className="text-lg">
                Email: info@financialtools.in
              </p>
              <p className="text-lg">
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-100 text-sm md:text-base">
              © Copyright 2025 Financial Tools™
            </div>
            <div className="flex items-center space-x-2 text-sm md:text-base">
              <span className="text-blue-100">Made With</span>
              <span className="text-red-500 text-lg">❤</span>
              <span className="text-blue-100">in India.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Scroll to top"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </footer>
  );
}
