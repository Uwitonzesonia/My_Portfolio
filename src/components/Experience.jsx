import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
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

  return (
    <section id="experience" className="py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-navy mb-4">
            My <span className="text-gold">Journey</span>
          </h2>
          <p className="text-lg text-dark-navy/70 max-w-2xl mx-auto">
            Training, internships, and hands-on experience that shape who I am today.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="space-y-8 max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-gold/10 rounded-full flex-shrink-0 mt-1">
                <exp.icon className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-navy">{exp.title}</h3>
                <p className="flex items-center gap-1 text-sm text-dark-navy/60 mb-2">
                  <Calendar size={14} /> {exp.date}
                </p>
                <p className="text-dark-navy/70 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;