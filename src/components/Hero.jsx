import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-white to-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold font-semibold text-lg mb-2">👋 Hello, I'm</p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-dark-navy mb-4">Sonia</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-dark-navy/80 mb-6">Frontend Web Developer</h2>
            <p className="text-lg text-dark-navy/70 mb-8 max-w-lg leading-relaxed">
              I build modern, responsive websites and web applications that help businesses grow. Specializing in React, JavaScript, PHP, and clean UI/UX.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-gold/90 transition-all transform hover:scale-105 shadow-lg shadow-gold/30">
                Hire Me
              </a>
              <a href="#projects" className="border-2 border-dark-navy/20 text-dark-navy px-8 py-3 rounded-full font-semibold hover:border-gold hover:text-gold transition-all">
                View My Work
              </a>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gold/20 transition-colors"><Github size={22} className="text-dark-navy" /></a>
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gold/20 transition-colors"><Linkedin size={22} className="text-dark-navy" /></a>
              <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gold/20 transition-colors"><Mail size={22} className="text-dark-navy" /></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-gold/20 to-gold/10 flex items-center justify-center relative">
              <div className="absolute inset-4 rounded-full border-4 border-gold/30"></div>
              <span className="text-7xl">👩‍💻</span>
              <div className="absolute -bottom-2 -right-2 bg-white shadow-xl rounded-lg px-4 py-2 text-sm font-semibold text-dark-navy border border-gray-100">✨ Available for work</div>
            </div>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex justify-center mt-12">
          <a href="#projects" className="text-dark-navy/40 hover:text-gold transition-colors"><ArrowDown size={32} /></a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;