import React, { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, MapPin, Bot, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import myPhoto from '../assets/picture1.png';
import { openAssistant } from './ChatAssistant';
import { useContent } from '../data/ContentContext';

// Types and deletes each role in turn
const useTypewriter = (words, speed = 80, pause = 1500) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] || '';
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((index + 1) % Math.max(words.length, 1));
      return;
    }
    const t = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  const { profile } = useContent();
  const role = useTypewriter(profile.roles);
  const nameParts = profile.name.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-ink">
      {/* Glowing blue background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-blue-800/30 rounded-full blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-700/20 rounded-full blur-3xl animate-blob [animation-delay:8s]" />
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-brand/40 bg-brand/10 text-xs sm:text-sm text-brand-light">
              <MapPin size={14} /> {profile.heroBadge}
            </motion.div>
            <motion.p variants={item} className="text-brand-light font-semibold text-lg mb-2">👋 Hello, I'm</motion.p>
            <motion.h1 variants={item} className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              {nameParts.join(' ')} <span className="text-gradient">{lastName}</span>
            </motion.h1>
            <motion.h2 variants={item} className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6 h-10">
              {role}
              <span className="inline-block w-0.5 h-7 bg-brand ml-1 align-middle animate-blink" />
            </motion.h2>
            <motion.p variants={item} className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              {profile.heroIntro}
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-shine bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-all transform hover:scale-105 shadow-lg shadow-brand/40">
                Start a Project
              </a>
              <button onClick={() => openAssistant()} className="inline-flex items-center gap-2 border-2 border-brand/60 text-white px-6 py-3 rounded-full font-semibold hover:bg-brand/15 hover:border-brand transition-all">
                <Bot size={18} /> Ask my AI
              </button>
              <a href={profile.cv} download className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:border-brand hover:text-brand-light transition-all">
                <Download size={18} /> Download CV
              </a>
            </motion.div>
            <motion.div variants={item} className="flex gap-4 mt-8">
              {[
                { href: profile.github, Icon: Github, label: 'GitHub' },
                { href: profile.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${profile.email}`, Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="p-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-brand hover:border-brand transition-colors"
                >
                  <Icon size={22} className="text-white" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col items-center">
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} className="relative">
              {/* Spinning blue ring behind the photo */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand via-blue-900 to-brand-light opacity-80 blur-sm animate-gradient-x [background-size:200%_200%]" />
              <div className="relative w-72 h-80 md:w-96 md:h-[28rem] rounded-2xl overflow-hidden bg-ink-800">
                <img src={myPhoto} alt={profile.name} className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 bg-ink-800 rounded-full px-4 py-2 text-sm font-semibold text-white border border-white/10 hover:border-brand hover:text-brand-light transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              Available for work
            </a>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex justify-center mt-12">
          <a href="#projects" className="text-gray-500 hover:text-brand-light transition-colors" aria-label="Scroll to projects"><ArrowDown size={32} /></a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
