import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Copy, Check, Download, Linkedin, Github, FileText } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionHeader from './SectionHeader';
import { useContent } from '../data/ContentContext';

const Contact = () => {
  const { profile } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .send(
        'service_yjbkd1a',      // your Service ID
        'template_uv12ucq',     // your Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        '9dcSVCPATNwWk_60_'     // your Public Key
      )
      .then(() => {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('error');
      });
  };

  return (
    <section id="contact" className="py-20 bg-ink relative overflow-hidden">
      <div className="absolute -right-40 bottom-0 w-96 h-96 bg-brand/15 rounded-full blur-3xl animate-blob" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Let's" highlight="Connect" subtitle="Have a project in mind? Let's work together to bring your ideas to life!" />
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/15 rounded-xl"><Mail className="text-brand-light" size={24} /></div>
              <div className="min-w-0">
                <h4 className="font-semibold text-white">Email</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-brand-light break-all transition-colors">{profile.email}</a>
                  <button onClick={copyEmail} className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/15 text-gray-300 hover:border-brand hover:text-brand-light transition-colors" aria-label="Copy email address">
                    {copied ? <><Check size={13} className="text-green-400" /> Copied</> : <><Copy size={13} /> Copy</>}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/15 rounded-xl"><Phone className="text-brand-light" size={24} /></div>
              <div><h4 className="font-semibold text-white">Phone</h4><a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-brand-light transition-colors">{profile.phone}</a></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/15 rounded-xl"><MapPin className="text-brand-light" size={24} /></div>
              <div><h4 className="font-semibold text-white">Location</h4><p className="text-gray-400">{profile.location} · Available worldwide 🌍</p></div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={profile.cv} download className="btn-shine inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full font-semibold hover:bg-brand-dark transition-colors shadow-lg shadow-brand/30">
                <Download size={18} /> Download CV
              </a>
              <a href="#cv" className="inline-flex items-center gap-2 border border-white/15 text-white px-5 py-2.5 rounded-full font-semibold hover:border-brand hover:text-brand-light transition-colors">
                <FileText size={18} /> View CV online
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/15 text-white px-5 py-2.5 rounded-full font-semibold hover:border-brand hover:text-brand-light transition-colors">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/15 text-white px-5 py-2.5 rounded-full font-semibold hover:border-brand hover:text-brand-light transition-colors">
                <Github size={18} /> GitHub
              </a>
            </div>
            <div className="mt-8 p-6 card">
              <p className="text-gray-300 font-medium">💬 "I value clear communication, attention to detail, and delivering high-quality work on time."</p>
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} onSubmit={handleSubmit} className="space-y-6 card p-8 shadow-2xl shadow-brand/10">
            <div>
              <label className="block text-white font-medium mb-2">Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-ink-900 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-ink-900 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full px-4 py-3 bg-ink-900 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" disabled={status === 'sending'} className="btn-shine w-full bg-brand text-white py-4 rounded-lg font-semibold hover:bg-brand-dark shadow-lg shadow-brand/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              <Send size={20} /> {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && (
              <p className="text-center text-green-400 font-medium">Thank you! Your message has been sent.</p>
            )}
            {status === 'error' && (
              <p className="text-center text-red-400 font-medium">Something went wrong. Please try again or email me directly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;