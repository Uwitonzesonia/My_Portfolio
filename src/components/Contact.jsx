import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionHeader from './SectionHeader';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

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
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/15 rounded-xl"><Mail className="text-brand-light" size={24} /></div>
              <div><h4 className="font-semibold text-white">Email</h4><p className="text-gray-400">uwitonzesonia2005@gmail.com</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/15 rounded-xl"><Phone className="text-brand-light" size={24} /></div>
              <div><h4 className="font-semibold text-white">Phone</h4><p className="text-gray-400">0792728289</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand/15 rounded-xl"><MapPin className="text-brand-light" size={24} /></div>
              <div><h4 className="font-semibold text-white">Location</h4><p className="text-gray-400">Available Worldwide 🌍</p></div>
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