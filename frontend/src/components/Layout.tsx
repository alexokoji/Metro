import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import SocialActionButton from './SocialActionButton';
import AnnouncementPopup from './AnnouncementPopup';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <FaShieldAlt className="text-sky-600 text-2xl" />
          <span className="text-xl font-bold text-navy-600">Metro Cracks</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-sky-600 transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-sky-600 transition">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-sky-600 transition">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-sky-600 transition">Contact</Link>
          <Link to="/faq" className="text-gray-700 hover:text-sky-600 transition">FAQ</Link>
        </div>
        <button className="md:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block px-6 py-3 border-b border-gray-200">Home</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="block px-6 py-3 border-b border-gray-200">About</Link>
          <Link to="/services" onClick={() => setMobileOpen(false)} className="block px-6 py-3 border-b border-gray-200">Services</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="block px-6 py-3 border-b border-gray-200">Contact</Link>
          <Link to="/faq" onClick={() => setMobileOpen(false)} className="block px-6 py-3">FAQ</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gradient-to-r from-navy-600 to-navy-700 text-white pt-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <FaShieldAlt className="text-sky-400 text-2xl" />
            <span className="text-lg font-bold">Metro Cracks</span>
          </Link>
          <p className="text-gray-300">Professional crypto recovery and security solutions.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sky-300">Quick Links</h4>
          <div className="space-y-2">
            <Link to="/about" className="text-gray-300 hover:text-sky-300 transition">About</Link><br/>
            <Link to="/services" className="text-gray-300 hover:text-sky-300 transition">Services</Link><br/>
            <Link to="/faq" className="text-gray-300 hover:text-sky-300 transition">FAQ</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sky-300">Support</h4>
          <div className="space-y-2">
            <Link to="/contact" className="text-gray-300 hover:text-sky-300 transition">Contact</Link><br/>
            <a href="#" className="text-gray-300 hover:text-sky-300 transition">Privacy Policy</a><br/>
            <a href="#" className="text-gray-300 hover:text-sky-300 transition">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-500 pt-8 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Metro Cracks. All rights reserved.
      </div>
    </div>
  </footer>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow pt-16">{children}</main>
    <Footer />
    <SocialActionButton />
    <AnnouncementPopup />
  </div>
);

export default Layout;
