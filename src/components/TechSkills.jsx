import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const skillCategories = [
  { title: 'Frontend', skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Figma'] },
  { title: 'Mobile', skills: ['React Native', 'Expo', 'Expo Router'] },
  { title: 'Backend', skills: ['PHP', 'Python', 'Node.js', 'Express.js', 'Java', 'Firebase'] },
  { title: 'Database', skills: ['SQL', 'MySQL', 'PostgreSQL', 'Hibernate'] },
  { title: 'Tools & Methods', skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'Responsive Design'] },
];

const chip = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 18 } },
};

const TechSkills = () => {
  return (
    <section id="skills" className="py-20 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="What I" highlight="Work With" subtitle="The languages, tools, and practices I use to build software." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 hover:border-brand/60 transition-colors"
            >
              <h3 className="text-lg font-bold text-white mb-4 text-center border-b border-white/10 pb-2">{category.title}</h3>
              <motion.div
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-2"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={chip}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:bg-brand hover:text-white hover:border-brand transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSkills;
