import React, { useState, useRef, useEffect } from "react";

const menuItems = [
  { name: "Home", link: "#" },
  {
    name: "Shop",
    dropdown: [
      { name: "Men", link: "#" },
      { name: "Women", link: "#" },
      { name: "Home Dec", link: "#" },
      { name: "Bags", link: "#" },
    ],
  },
  { name: "About Us", link: "#" },
  { name: "Contact Us", link: "#" },
];

// Add this helper function for menu item underline
const UnderlineLink = ({ children, className = '', as: Component = 'span', ...props }) => (
  <Component className={`relative group ${className}`} {...props}>
    <span className="z-10 relative">{children}</span>
    <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black rounded-full transition-all duration-300 group-hover:w-full"></span>
  </Component>
);

function HoddyNaveBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const closeTimeoutRef = useRef();

  // Placeholder for cart click
  const handleCartClick = () => {
    alert("Cart clicked! (Implement cart functionality)");
  };

  // Placeholder for cart item count
  const cartCount = 2;

  // Auto-close profile dropdown on outside click
  useEffect(() => {
    if (!profileDropdownOpen) return;
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropdownOpen]);
  // Cleanup timeout on unmount
  useEffect(() => () => clearTimeout(closeTimeoutRef.current), []);

  return (
    <nav className="bg-white text-black w-full shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-3xl font-normal select-none">
            <span className="text-black font-[cursive]" style={{ fontFamily: 'cursive' }}>Hoddy</span>
          </div>
          {/* Mobile Cart and Profile Icons */}
          <div className="flex items-center space-x-4 md:hidden ml-auto">
            {/* Cart Icon */}
            <button
              onClick={handleCartClick}
              className="relative focus:outline-none transition-colors duration-200"
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.272 1.017m0 0l1.357 5.086m-.001 0A2.25 2.25 0 008.25 12.75h7.5a2.25 2.25 0 002.2-1.817l1.2-6A1.125 1.125 0 0018.825 3H5.25m0 0L3.977 8.938m1.273-5.938L5.25 3" />
                <circle cx="9" cy="20" r="1.25" />
                <circle cx="17" cy="20" r="1.25" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md border border-yellow-200">{cartCount}</span>
            </button>
            {/* Profile Icon */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen((open) => !open)}
                className="focus:outline-none flex items-center transition-colors duration-200"
                aria-label="Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                </svg>
              </button>
              {profileDropdownOpen && (
                <div className="md:hidden absolute right-0 mt-2 top-full w-64 max-w-xs bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 py-6 px-4 flex flex-col gap-3 animate-dropdown-fade">
                  <a href="#" className="block py-3 text-lg font-normal hover:bg-gray-100 text-black rounded-xl transition-colors duration-200 tracking-wide text-center" style={{ letterSpacing: '0.02em' }}>Login</a>
                  <div className="mx-4 border-b border-gray-200 opacity-60"></div>
                  <a href="#" className="block py-3 text-lg font-normal hover:bg-gray-100 text-black rounded-xl transition-colors duration-200 tracking-wide text-center" style={{ letterSpacing: '0.02em' }}>Register</a>
                </div>
              )}
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {menuItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative group"
                >
                  <button
                    className="focus:outline-none flex items-center px-3 py-1 rounded-lg font-medium transition-colors duration-200"
                  >
                    <UnderlineLink>{item.name}</UnderlineLink>
                    <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {/* Dropdown container */}
                  <div className="absolute left-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 z-20 py-3 px-2 flex flex-col gap-1 animate-dropdown-fade">
                    {item.dropdown.map((drop, idx) => (
                      <>
                        <a
                          key={drop.name}
                          href={drop.link}
                          className="block px-6 py-2 text-base font-semibold hover:bg-gray-100 text-black rounded-xl transition-colors duration-200 tracking-wide"
                          style={{ letterSpacing: '0.02em' }}
                        >
                          {drop.name}
                        </a>
                        {idx < item.dropdown.length - 1 && (
                          <div className="mx-4 border-b border-gray-200 opacity-60"></div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.link}
                  className="px-3 py-1 rounded-lg font-medium transition-colors duration-200"
                >
                  <UnderlineLink>{item.name}</UnderlineLink>
                </a>
              )
            )}
          </div>
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6 ml-4">
            {/* Cart Icon */}
            <button
              onClick={handleCartClick}
              className="relative focus:outline-none transition-colors duration-200"
              aria-label="Cart"
            >
              {/* Heroicons Shopping Cart */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.272 1.017m0 0l1.357 5.086m-.001 0A2.25 2.25 0 008.25 12.75h7.5a2.25 2.25 0 002.2-1.817l1.2-6A1.125 1.125 0 0018.825 3H5.25m0 0L3.977 8.938m1.273-5.938L5.25 3" />
                <circle cx="9" cy="20" r="1.25" />
                <circle cx="17" cy="20" r="1.25" />
              </svg>
              {/* Cart badge */}
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md border border-yellow-200">{cartCount}</span>
            </button>
            {/* Profile Icon */}
            <div
              className="relative"
              ref={profileDropdownRef}
              onMouseLeave={() => {
                closeTimeoutRef.current = setTimeout(() => setProfileDropdownOpen(false), 200);
              }}
              onMouseEnter={() => {
                clearTimeout(closeTimeoutRef.current);
              }}
            >
              <button
                onClick={() => setProfileDropdownOpen((open) => !open)}
                className="focus:outline-none flex items-center transition-colors duration-200"
                aria-label="Profile"
              >
                {/* Heroicons User Circle */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                </svg>
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-30 py-3 px-2 flex flex-col gap-1 animate-dropdown-fade">
                  <a href="#" className="block px-6 py-2 text-base font-semibold hover:bg-gray-100 text-black rounded-xl transition-colors duration-200 tracking-wide" style={{ letterSpacing: '0.02em' }}>Login</a>
                  <div className="mx-4 border-b border-gray-200 opacity-60"></div>
                  <a href="#" className="block px-6 py-2 text-base font-semibold hover:bg-gray-100 text-black rounded-xl transition-colors duration-200 tracking-wide" style={{ letterSpacing: '0.02em' }}>Register</a>
                </div>
              )}
            </div>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 rounded-b-2xl shadow-2xl">
          {menuItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="relative">
                <button
                  onClick={() => setShopDropdownOpen((open) => !open)}
                  className="w-full text-left flex items-center justify-between py-3 focus:outline-none font-medium transition-colors duration-200"
                >
                  <UnderlineLink>{item.name}</UnderlineLink>
                  <svg className="ml-1 w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {shopDropdownOpen && (
                  <div className="ml-2 mt-1 w-11/12 bg-white rounded-2xl shadow-xl py-2 px-1 flex flex-col gap-1 animate-mobile-dropdown">
                    {item.dropdown.map((drop, idx) => (
                      <>
                        <a
                          key={drop.name}
                          href={drop.link}
                          className="block px-5 py-3 text-base font-semibold text-black rounded-xl transition-colors duration-200 tracking-wide active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100"
                          style={{ letterSpacing: '0.02em' }}
                        >
                          {drop.name}
                        </a>
                        {idx < item.dropdown.length - 1 && (
                          <div className="mx-4 border-b border-gray-200 opacity-60"></div>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.name}
                href={item.link}
                className="block py-3 text-black rounded-lg font-medium transition-colors duration-200"
              >
                <UnderlineLink>{item.name}</UnderlineLink>
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default HoddyNaveBar;
