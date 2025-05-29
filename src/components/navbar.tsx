import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Alerts", path: "/Alerte" },
    { name: "Volontaire", path: "/Volontaire" },
    { name: "Contact Us", path: "/contactUs" },
    { name: "About", path: "/About" },
  ];

  React.useEffect(() => setMenuOpen(false), [location.pathname]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("#navbar-menu") && !t.closest("#navbar-toggle")) setMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* keep navbar height 80px */}
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 -my-2"> {/* negative margin lets bigger logo overflow without stretching navbar */}
            <img src={Logo} alt="Logo" className="h-24 w-auto" /> {/* bigger logo */}
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map(({ name, path }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={name}
                  to={path}
                  className={`relative group text-lg font-medium transition-colors duration-300 ${
                    active ? "text-green-600" : "text-gray-800"
                  }`}
                >
                  {name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-green-600 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile burger icon */}
          <button
            id="navbar-toggle"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="navbar-menu"
        className={`md:hidden fixed top-20 inset-x-0 bg-white shadow-lg transition-transform duration-300 origin-top ${
          menuOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <div className="flex flex-col space-y-6 px-6 py-6">
          {navLinks.map(({ name, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`text-base font-medium transition-colors duration-300 ${
                  active ? "text-green-600" : "text-gray-800"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
