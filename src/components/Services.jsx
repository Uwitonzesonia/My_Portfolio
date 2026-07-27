import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Server, Database, Brush, Wrench, GitBranch, Users } from 'lucide-react';

const services = [
  { icon: Layout, title: 'Frontend Development', description: 'Responsive, accessible interfaces with React, HTML, CSS, and Tailwind.' },
  { icon: Code, title: 'Full-Stack Web Apps', description: 'Complete web applications with PHP, Python, and modern JavaScript.' },
  { icon: Server, title: 'Backend & APIs', description: 'Server logic, REST APIs, and data handling with PHP, Python, and Node.js.' },
  { icon: Database, title: 'Database Design', description: 'Structuring relational databases with SQL, MySQL, and PostgreSQL.' },
  { icon: Brush, title: 'UI/UX Design', description: 'Clean, user-friendly interfaces from Figma designs to functional code.' },
  { icon: Wrench, title: 'Bug Fixing & Maintenance', description: 'Debugging, testing, and keeping existing websites healthy and fast.' },
  { icon: GitBranch, title: 'Project Planning', description: 'Turning your ideas into clear technical requirements and roadmaps.' },
  { icon: Users, title: 'Collaboration', description: 'Clear communication, teamwork, and delivering quality work on time.' },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-navy mb-4">
            What I <span className="text-gold">Offer</span>
          </h2>
          <p className="text-lg text-dark-navy/70 max-w-2xl mx-auto">
            From planning to shipping — here's how I can help you bring your ideas to life.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-3 bg-gold/10 rounded-lg w-fit mb-4 group-hover:bg-gold/20 transition-colors">
                <service.icon className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark-navy mb-2">{service.title}</h3>
              <p className="text-dark-navy/70 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;