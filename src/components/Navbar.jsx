import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Home', 'Projects', 'About', 'Contact'];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="text-2xl font-bold text-dark-navy">
            Sonia<span className="text-gold">.</span>
          </a>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-dark-navy/80 hover:text-gold transition-colors duration-300 font-medium">
                {link}
              </a>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-dark-navy">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block text-dark-navy/80 hover:text-gold transition-colors font-medium">
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;