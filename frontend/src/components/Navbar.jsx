import React from 'react'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
  return (
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
  )
}

export default Navbar
