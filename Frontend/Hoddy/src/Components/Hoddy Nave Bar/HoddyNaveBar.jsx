import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Home", scrollTo: "home" },
  {
    name: "Shop",
    dropdown: [
      { name: "Men", scrollTo: "shop" },
      { name: "Women", scrollTo: "shop" },
      { name: "Home Dec", scrollTo: "shop" },
      { name: "Bags", scrollTo: "shop" },
    ],
  },
  { name: "About Us", scrollTo: "aboutUs" },
  { name: "Contact Us", scrollTo: "contactUs" },
];

const UnderlineLink = ({ children, className = '', as: Component = 'span', ...props }) => (
  <Component className={`relative group ${className}`} {...props}>
    <span className="z-10 relative">{children}</span>
    <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black rounded-full transition-all duration-300 group-hover:w-full"></span>
  </Component>
);

function HoddyNaveBar({
  scrollToHome,
  scrollToShop,
  scrollToAboutUs,
  scrollToContactUs,
  cartItems = [],
  setCartItems,
  cartOpen,
  setCartOpen,
  onShopDropdownNavigate
}) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleScrollTo = (section) => {
    switch(section) {
      case 'home':
        scrollToHome();
        break;
      case 'shop':
        scrollToShop();
        break;
      case 'aboutUs':
        scrollToAboutUs();
        break;
      case 'contactUs':
        scrollToContactUs();
        break;
      default:
        break;
    }
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    }
    
    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  const updateQuantity = (id, color, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id && item.color === color && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeItem = (id, color, size) => {
    setCartItems(cartItems.filter(item =>
      !(item.id === id && item.color === color && item.size === size)
    ));
  };

  const CartPopup = ({ isMobile = false }) => (
    <div className={`absolute ${isMobile ? 'right-0 top-full mt-2' : 'right-3 mt-'} w-96 bg-white border border-gray-100 rounded-xl shadow-xl z-50 animate-dropdown-fade overflow-hidden`}>
      <div className="p-0">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Your Shopping Cart ({cartCount})</h3>
            <button 
              onClick={() => setCartOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="py-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="mt-2 text-gray-500">Your cart is empty</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex p-4 hover:bg-gray-50 transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-20 w-20 flex-shrink-0 rounded-md object-cover border border-gray-200"
                  />
                  <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="ml-4 text-sm font-medium text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{item.color} | {item.size}</p>
                    <div className="mt-2 flex-1 flex items-end justify-between">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>Rs. {cartTotal.toLocaleString()}</p>
            </div>
            <div className="flex flex-col space-y-3">
              <button className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Proceed to Checkout
              </button>
              <button 
                onClick={() => setCartOpen(false)}
                className="w-full text-black py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500 text-center">
              Free shipping on orders over Rs. 5,000
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <nav className="bg-white text-black w-full shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-end text-3xl font-normal select-none h-14" style={{ width: '120px', minWidth: '120px' }}>
            <span
              className="text-black tracking-wider pb-2"
              style={{
                fontFamily: 'Pacifico, cursive',
                fontSize: '2rem',
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '0',
                animation: 'typewriterHoddy 2.5s steps(24, end) 0.2s forwards',
              }}
            >
              Hoddy
              <style>{`
                @keyframes typewriterHoddy {
                  to { width: 6.2ch; }
                }
              `}</style>
            </span>
          </div>
          
          {/* Mobile view buttons - swapped positions */}
          <div className="flex items-center space-x-4 md:hidden ml-auto">
            <button
              onClick={() => navigate("/AuthPage")}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Login/Register
            </button>
            
            <div className="relative" ref={cartDropdownRef}>
              <button
                onClick={handleCartClick}
                className="relative focus:outline-none transition-colors duration-200"
                aria-label="Cart"
              >
                <div className={`relative ${cartAnimation ? 'animate-bounce' : ''}`}>
                  {/* Creative Cart Icon */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-7 h-7"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" 
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md border border-yellow-200">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
              {cartOpen && <CartPopup isMobile />}
            </div>
          </div>
          
          <div className="hidden md:flex space-x-10 items-center">
            {menuItems.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button
                    onClick={scrollToShop}
                    className="focus:outline-none flex items-center px-3 py-1 rounded-lg font-medium transition-colors duration-200"
                  >
                    <UnderlineLink>{item.name}</UnderlineLink>
                    <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute left-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 z-20 py-3 px-2 flex flex-col gap-1 animate-dropdown-fade">
                    {item.dropdown.map((drop, idx) => (
                      <React.Fragment key={drop.name}>
                        <button
                          onClick={() => {
                            if (drop.name === "Men") navigate("/men");
                            else if (drop.name === "Women") navigate("/women");
                            else if (drop.name === "Bags") navigate("/bags");
                            else if (drop.name === "Home Dec") navigate("/homeDec");
                          }}
                          className="block px-6 py-2 text-base font-semibold hover:bg-gray-100 text-black rounded-xl transition-colors duration-200 tracking-wide text-left w-full"
                          style={{ letterSpacing: '0.02em' }}
                        >
                          {drop.name}
                        </button>
                        {idx < item.dropdown.length - 1 && (
                          <div className="mx-4 border-b border-gray-200 opacity-60"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={
                    item.name === "Home"
                      ? scrollToHome
                      : item.name === "Shop"
                      ? scrollToShop
                      : item.name === "About Us"
                      ? () => navigate("/AboutUs")
                      : item.name === "Contact Us"
                      ? scrollToContactUs
                      : undefined
                  }
                  className="px-3 py-1 rounded-lg font-medium transition-colors duration-200"
                >
                  <UnderlineLink>{item.name}</UnderlineLink>
                </button>
              )
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-6 ml-4">
            <div className="relative" ref={cartDropdownRef}>
              <button
                onClick={handleCartClick}
                className="relative focus:outline-none transition-colors duration-200 group"
                aria-label="Cart"
              >
                <div className={`relative ${cartAnimation ? 'animate-bounce' : ''}`}>
                  {/* Creative Cart Icon with hover effect */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-7 h-7 group-hover:stroke-[1.7] transition-all"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.272 1.036M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md border border-yellow-200">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
              {cartOpen && <CartPopup />}
            </div>
            
            {/* Creative Profile Icon */}
            <button
              onClick={() => navigate("/ProfilePage")}
              className="focus:outline-none transition-colors duration-200 group relative"
              aria-label="Profile"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-7 h-7 group-hover:stroke-[1.7] transition-all"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              {/* Hover effect circle */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 group-hover:bg-gray-400 transition-opacity duration-200"></span>
            </button>
            
            <button
              onClick={() => navigate("/AuthPage")}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium group relative overflow-hidden"
            >
              <span className="relative z-10">Login/Register</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 -translate-x-full group-hover:translate-x-full"></span>
            </button>
          </div>
          
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
                      <React.Fragment key={drop.name}>
                        <button
                          onClick={() => {
                            if (drop.name === "Men") navigate("/men");
                            else if (drop.name === "Women") navigate("/women");
                            else if (drop.name === "Bags") navigate("/bags");
                            else if (drop.name === "Home Dec") navigate("/homeDec");
                            setShopDropdownOpen(false);
                            setMobileMenuOpen(false);
                          }}
                          className="block px-5 py-3 text-base font-semibold text-black rounded-xl transition-colors duration-200 tracking-wide active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 text-left w-full"
                          style={{ letterSpacing: '0.02em' }}
                        >
                          {drop.name}
                        </button>
                        {idx < item.dropdown.length - 1 && (
                          <div className="mx-4 border-b border-gray-200 opacity-60"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.name}
                onClick={
                  item.name === "Home"
                    ? () => {
                        scrollToHome();
                        setMobileMenuOpen(false);
                      }
                    : item.name === "Shop"
                    ? () => {
                        scrollToShop();
                        setMobileMenuOpen(false);
                      }
                    : item.name === "About Us"
                    ? () => {
                        navigate("/AboutUs");
                        setMobileMenuOpen(false);
                      }
                    : item.name === "Contact Us"
                    ? () => {
                        scrollToContactUs();
                        setMobileMenuOpen(false);
                      }
                    : undefined
                }
                className="block py-3 text-black rounded-lg font-medium transition-colors duration-200 w-full text-left"
              >
                <UnderlineLink>{item.name}</UnderlineLink>
              </button>
            )
          )}
          
          {/* Mobile Profile Link with creative icon */}
          <button
            onClick={() => {
              navigate("/ProfilePage");
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-3 focus:outline-none font-medium transition-colors duration-200 flex items-center group"
          >
            <div className="relative mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6 group-hover:stroke-[1.7] transition-all"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
                />
              </svg>
            </div>
            <UnderlineLink>Profile</UnderlineLink>
          </button>
        </div>
      )}
    </nav>
  );
}

export default HoddyNaveBar;