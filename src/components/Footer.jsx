import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 Sonia. All rights reserved.</p>
          <p className="text-sm flex items-center gap-1">Built with <Heart size={16} className="text-brand fill-brand animate-pulse" /> using React & Tailwind</p>
          <div className="flex gap-4">
            <a href="https://github.com/Uwitonzesonia" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-brand-light hover:-translate-y-1 transition-all"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/uwitonze-sonia/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-brand-light hover:-translate-y-1 transition-all"><Linkedin size={20} /></a>
            <a href="mailto:uwitonzesonia2005@gmail.com" aria-label="Email" className="hover:text-brand-light hover:-translate-y-1 transition-all"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
