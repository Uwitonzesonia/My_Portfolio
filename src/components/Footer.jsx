import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-navy text-white/80 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 Sonia. All rights reserved.</p>
          <p className="text-sm flex items-center gap-1">Built with <Heart size={16} className="text-gold fill-gold" /> using React & Tailwind</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-gold transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-gold transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;