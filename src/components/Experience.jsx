import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Briefcase, Rocket, GraduationCap } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useContent } from '../data/ContentContext';

const icons = { rocket: Rocket, briefcase: Briefcase, award: Award, graduation: GraduationCap };

const Experience = () => {
  const { experiences } = useContent();
  return (
    <section id="experience" className="py-20 bg-ink-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="My" highlight="Journey" subtitle="Training, internships, and hands-on experience that shape who I am today." />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line that draws itself on scroll */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand/50 to-transparent origin-top"
          />
          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const Icon = icons[exp.icon] || Briefcase;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex gap-6 items-start"
              >
                <div className="relative z-10 p-3 bg-ink border-2 border-brand rounded-full flex-shrink-0 shadow-[0_0_16px_rgba(37,99,235,0.6)]">
                  <Icon className="text-brand-light" size={22} />
                </div>
                <motion.div whileHover={{ x: 6 }} className="card p-6 flex-1 hover:border-brand/60 transition-colors">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="flex items-center gap-1 text-sm text-brand-light mb-2">
                    <Calendar size={14} /> {exp.date}
                  </p>
                  <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                </motion.div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
