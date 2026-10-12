import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Briefcase, Rocket } from 'lucide-react';
import SectionHeader from './SectionHeader';

const experiences = [
  {
    icon: Rocket,
    title: 'Solvit Africa Training Center',
    date: '2025 – Present',
    description: 'Building real products in teams — a restaurant management dashboard (Next.js) and a movie & series website (React + TypeScript) — using Git branches, pull requests and Figma designs.',
  },
  {
    icon: Briefcase,
    title: 'Gym Rwanda Programming Training',
    date: 'April 2025 – September 2025',
    description: 'Intensive programming training focused on problem-solving, coding skills, and real-world application. Built mini tech projects and improved hands-on coding experience.',
  },
  {
    icon: Award,
    title: 'NetBrain Networking Practical Internship',
    date: '2025',
    description: 'Gained practical exposure to networking concepts, troubleshooting, and understanding network protocols and topology design.',
  },
];

const Experience = () => {
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
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex gap-6 items-start"
              >
                <div className="relative z-10 p-3 bg-ink border-2 border-brand rounded-full flex-shrink-0 shadow-[0_0_16px_rgba(37,99,235,0.6)]">
                  <exp.icon className="text-brand-light" size={22} />
                </div>
                <motion.div whileHover={{ x: 6 }} className="card p-6 flex-1 hover:border-brand/60 transition-colors">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="flex items-center gap-1 text-sm text-brand-light mb-2">
                    <Calendar size={14} /> {exp.date}
                  </p>
                  <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
