import React, { useState } from "react";

// Home page component for a food delivery website
// Uses Tailwind CSS for styling — make sure Tailwind is configured in your project.
// Default export is a single-file React component you can drop into src/components or src/pages.

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="#" aria-label="Go to homepage" className="flex items-center gap-2">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="6" fill="#F97316" />
                    <path d="M7 12c1.2-2.5 4.8-3 6.5-1.2 1.7 1.8 1 4.6-1.2 6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-semibold text-lg">QuickBite</span>
                </a>
              </div>

              {/* Desktop nav links */}
              <nav className="hidden md:flex md:items-center md:space-x-6">
                <a href="#features" className="text-sm hover:text-orange-500">Features</a>
                <a href="#how-it-works" className="text-sm hover:text-orange-500">How it works</a>
                <a href="#partners" className="text-sm hover:text-orange-500">Partners</a>
                <a href="#contact" className="text-sm hover:text-orange-500">Contact</a>
              </nav>
            </div>

            {/* Right-side actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex">
                <a href="#login" className="px-3 py-2 text-sm rounded-md hover:bg-gray-100">Log in</a>
                <a href="#signup" className="ml-2 px-3 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600">Sign up</a>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(v => !v)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 rounded-md text-base">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base">How it works</a>
              <a href="#partners" className="block px-3 py-2 rounded-md text-base">Partners</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base">Contact</a>
              <div className="pt-2 border-t mt-2">
                <a href="#login" className="block px-3 py-2">Log in</a>
                <a href="#signup" className="block px-3 py-2 text-orange-600 font-medium">Sign up</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <main className="flex-1">
        <section className="bg-gradient-to-r from-orange-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">Fast, reliable food delivery — for everyone.</h1>
                <p className="mt-4 text-gray-700 max-w-2xl text-base sm:text-lg">QuickBite connects local restaurants, delivery partners and hungry customers on a single easy-to-use platform. Order in minutes or manage orders for your restaurant — tailored experiences for each user type.</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#user" className="inline-flex items-center px-4 py-2 rounded-md shadow-sm bg-white border text-sm">Order Food</a>
                  <a href="#owner" className="inline-flex items-center px-4 py-2 rounded-md bg-orange-500 text-white text-sm">For Restaurant Owners</a>
                  <a href="#partner" className="inline-flex items-center px-4 py-2 rounded-md border text-sm">Become a Partner</a>
                </div>

                <div className="mt-8 text-sm text-gray-600">
                  <strong>Available:</strong> Web & Mobile • <strong>Coverage:</strong> Your city (expandable)
                </div>
              </div>

              <div>
                {/* Illustration / mock phone */}
                <div className="mx-auto max-w-md">
                  <div className="rounded-xl shadow-lg bg-white p-6">
                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect rx='16' width='400' height='300' fill='%23FEEBC8'/><text x='50' y='150' font-size='18' fill='%234A4A4A'>App preview placeholder</text></svg>" alt="App preview" className="w-full rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE USER OPTIONS - central part of the page */}
        <section id="three-options" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center">Choose how you want to use QuickBite</h2>
            <p className="text-center mt-2 text-gray-600 max-w-2xl mx-auto">Whether you're ordering, running a kitchen, or delivering — we have a tailored experience for you.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card: User */}
              <article className="bg-white rounded-xl shadow p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-md bg-orange-100">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Hungry Customer</h3>
                    <p className="text-sm text-gray-600">Browse menus, place orders, track delivery in real-time and save favorites.</p>
                  </div>
                </div>

                <div className="mt-4 mt-auto">
                  <a href="#user" className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md bg-orange-500 text-white">Order Now</a>
                </div>
              </article>

              {/* Card: Restaurant Owner */}
              <article className="bg-white rounded-xl shadow p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-md bg-green-100">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Restaurant Owner</h3>
                    <p className="text-sm text-gray-600">Manage your menu, accept orders, view analytics and grow sales.</p>
                  </div>
                </div>

                <div className="mt-4 mt-auto">
                  <a href="#owner" className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md border">For Owners</a>
                </div>
              </article>

              {/* Card: Delivery Partner */}
              <article className="bg-white rounded-xl shadow p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-md bg-blue-100">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M3 7h3l3 6h6l3-6h3" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 20a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Delivery Partner</h3>
                    <p className="text-sm text-gray-600">Pick up orders, optimize routes and earn on every delivery.</p>
                  </div>
                </div>

                <div className="mt-4 mt-auto">
                  <a href="#partner" className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md border">Join as Partner</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* FEATURES / DESCRIPTION */}
        <section id="features" className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6">
                <h4 className="font-semibold">Simple Ordering</h4>
                <p className="text-sm text-gray-600 mt-2">Clean menu UI, saved addresses, multiple payment options and quick reorders.</p>
              </div>
              <div className="p-6">
                <h4 className="font-semibold">Restaurant Tools</h4>
                <p className="text-sm text-gray-600 mt-2">Menu management, order dashboard, promo tools and performance insights.</p>
              </div>
              <div className="p-6">
                <h4 className="font-semibold">Partner Friendly</h4>
                <p className="text-sm text-gray-600 mt-2">Flexible shifts, clear payouts, and an easy-to-use partner app for faster deliveries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-bold">How QuickBite works</h3>
            <p className="text-gray-600 mt-2">Order flow simplified: choose a restaurant → place your order → track till delivery.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h5 className="font-semibold">Browse</h5>
                <p className="text-sm text-gray-600 mt-2">Pick cuisine, filter by ratings and view popular dishes.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h5 className="font-semibold">Order</h5>
                <p className="text-sm text-gray-600 mt-2">Choose delivery or pickup and checkout with secure payments.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h5 className="font-semibold">Track</h5>
                <p className="text-sm text-gray-600 mt-2">Real-time tracking, ETA, and contactless delivery options.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="py-10 bg-gradient-to-r from-white to-orange-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold">Ready to get started?</h4>
              <p className="text-sm text-gray-600">Sign up to manage orders, or place your first order in minutes.</p>
            </div>
            <div className="flex gap-3">
              <a href="#signup" className="px-4 py-2 bg-orange-500 text-white rounded-md">Sign up</a>
              <a href="#learn" className="px-4 py-2 border rounded-md">Learn more</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#F97316"/></svg>
                <span className="font-semibold">QuickBite</span>
              </div>
              <p className="text-sm text-gray-600 mt-3">Local restaurants. Faster delivery. Happy customers.</p>
            </div>

            <div>
              <h5 className="font-semibold">Resources</h5>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-500">Blog</a></li>
                <li><a href="#" className="hover:text-orange-500">Developers</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold">Contact</h5>
              <p className="text-sm text-gray-600 mt-3">support@quickbite.example</p>
              <p className="text-sm text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} QuickBite. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
