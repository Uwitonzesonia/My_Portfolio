import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-navy mb-4">Let's <span className="text-gold">Connect</span></h2>
          <p className="text-lg text-dark-navy/70 max-w-2xl mx-auto">Have a project in mind? Let's work together to bring your ideas to life!</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 rounded-lg"><Mail className="text-gold" size={24} /></div>
              <div><h4 className="font-semibold text-dark-navy">Email</h4><p className="text-dark-navy/70">uwitonzesonia2005@gmail.com</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 rounded-lg"><Phone className="text-gold" size={24} /></div>
              <div><h4 className="font-semibold text-dark-navy">Phone</h4><p className="text-dark-navy/70">0787400972</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 rounded-lg"><MapPin className="text-gold" size={24} /></div>
              <div><h4 className="font-semibold text-dark-navy">Location</h4><p className="text-dark-navy/70">Available Worldwide 🌍</p></div>
            </div>
            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
              <p className="text-dark-navy/80 font-medium">💬 "I value clear communication, attention to detail, and delivering high-quality work on time."</p>
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
            <div>
              <label className="block text-dark-navy font-medium mb-2">Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-dark-navy font-medium mb-2">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-dark-navy font-medium mb-2">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="w-full bg-gold text-white py-4 rounded-lg font-semibold hover:bg-gold/90 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
              <Send size={20} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;