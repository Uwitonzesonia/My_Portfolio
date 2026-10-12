import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Server, Database, Brush, Wrench, Smartphone, Users } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useContent } from '../data/ContentContext';

const icons = { layout: Layout, smartphone: Smartphone, code: Code, server: Server, database: Database, brush: Brush, wrench: Wrench, users: Users };

const Services = () => {
  const { services } = useContent();
  return (
    <section id="services" className="py-20 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="What I" highlight="Offer" subtitle="From planning to shipping — here's how I can help you bring your ideas to life." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = icons[service.icon] || Code;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="card p-6 group relative overflow-hidden hover:border-brand/60 transition-colors duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="p-3 bg-brand/15 rounded-xl w-fit mb-4 group-hover:bg-brand group-hover:rotate-6 transition-all duration-300">
                <Icon className="text-brand-light group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
