import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import useCartStore from "../store/cartStore";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const handleLogin = () => {
    // Navigate to login page
    navigate("/login");
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    setIsLoggedIn(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xl"
          : "bg-white shadow-lg"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with animation - Left side */}
          <Link
            to="/"
            className="flex items-center space-x-3 group relative flex-shrink-0"
            aria-label="Home"
          >
            <div className="relative">
              <img
                src={Logo}
                alt="Beast Burger Logo"
                className="h-12 w-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-active:scale-95"
              />
              <div className="absolute inset-0 bg-orange-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            </div>
            <span className="text-2xl font-bold text-orange-600 hidden sm:block transition-all duration-300 group-hover:text-orange-700 group-hover:translate-x-1">
              Beast Burger
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 group ${
                  isActive(link.path)
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                }`}
                style={{
                  animation: `fadeInDown 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Active indicator - Underline with animation */}
                <span 
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-orange-600 rounded-full transition-all duration-300 ${
                    isActive(link.path) ? "w-8 opacity-100" : "w-0 opacity-0"
                  }`}
                  style={{
                    animation: isActive(link.path) ? "slideIn 0.3s ease-out" : "none",
                  }}
                ></span>
                {/* Hover background */}
                <span className="absolute inset-0 bg-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
              </Link>
            ))}
            <button
              className="relative bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold overflow-hidden group transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 ml-2"
              style={{
                animation: `fadeInDown 0.5s ease-out ${navLinks.length * 0.1}s both`,
              }}
            >
              <span className="relative z-10 flex items-center gap-2" onClick ={() =>{navigate("/checkout");}}>
                Order Now
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              {/* Ripple effect background */}
              <span className="absolute inset-0 bg-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          </div>
            
          {/* Cart and Login/Logout Button - Right side */}
          <div className="hidden md:flex items-center flex-shrink-0 gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
              aria-label="Shopping Cart"
            >
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="relative px-5 py-2.5 rounded-lg font-semibold overflow-hidden group transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-white border-2 border-black text-black hover:border-orange-600 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                style={{
                  animation: `fadeInDown 0.5s ease-out ${(navLinks.length + 1) * 0.1}s both`,
                }}
                aria-label="Logout"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </span>
                <span className="absolute inset-0 bg-orange-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="relative px-5 py-2.5 rounded-lg font-semibold overflow-hidden group transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-black text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                style={{
                  animation: `fadeInDown 0.5s ease-out ${(navLinks.length + 1) * 0.1}s both`,
                }}
                aria-label="Login"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </span>
                <span className="absolute inset-0 bg-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation with slide animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 border-t border-gray-200"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  isActive(link.path)
                    ? "text-orange-600 bg-orange-50 scale-105"
                    : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                }`}
                style={{
                  animation: isMenuOpen
                    ? `slideInLeft 0.4s ease-out ${index * 0.1}s both`
                    : "none",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/menu"
              className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-2 text-center block"
              style={{
                animation: isMenuOpen
                  ? `slideInLeft 0.4s ease-out ${navLinks.length * 0.1}s both`
                  : "none",
              }}
            >
              Order Now
            </Link>
            {/* Mobile Cart Link */}
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="relative w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-2 bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center gap-2"
              style={{
                animation: isMenuOpen
                  ? `slideInLeft 0.4s ease-out ${(navLinks.length + 1) * 0.1}s both`
                  : "none",
              }}
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart
              {totalItems > 0 && (
                <span className="bg-orange-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-2 bg-white border-2 border-black text-black hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50 flex items-center justify-center gap-2"
                style={{
                  animation: isMenuOpen
                    ? `slideInLeft 0.4s ease-out ${(navLinks.length + 1) * 0.1}s both`
                    : "none",
                }}
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-black text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-2 flex items-center justify-center gap-2"
                style={{
                  animation: isMenuOpen
                    ? `slideInLeft 0.4s ease-out ${(navLinks.length + 1) * 0.1}s both`
                    : "none",
                }}
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
