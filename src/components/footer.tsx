import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#f0fdf4] backdrop-blur-xl border-t border-white/20 shadow-2xl mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-800">
        
        {/* Logo + Description */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src={Logo} alt="Logo" className="h-16 w-auto" />
            <span className="text-xl font-bold leading-tight tracking-wide">
              Natural Disaster <br /> Management System
            </span>
          </Link>
          <p className="text-sm text-gray-600">
            Plateforme intelligente pour anticiper, suivre et agir face aux catastrophes naturelles.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-700">Navigation</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Accueil", path: "/" },
              { name: "Alertes", path: "/alerts" },
              { name: "Volontaires", path: "/volontaire" },
              { name: "Contact", path: "/contact" },
              { name: "À propos", path: "/about" },
            ].map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className="hover:text-green-600 transition duration-300"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-700">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-3">
            Abonnez-vous pour recevoir nos alertes et conseils.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              required
              placeholder="Votre email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              S'abonner
            </button>
          </form>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-700">Suivez-nous</h3>
          <p className="text-sm text-gray-600 mb-3">
            Restez connectés à nos dernières actualités.
          </p>
          <div className="flex gap-4 text-xl text-green-600">
            <a href="#" className="hover:text-green-800 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-green-800 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-green-800 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-green-800 transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs text-gray-600 py-4 border-t border-white/20">
        © {new Date().getFullYear()} Natural Disaster Management System — Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
