import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'Figma'],
  },
  {
    title: 'Backend',
    skills: ['PHP', 'Python', 'Node.js', 'Express.js'],
  },
  {
    title: 'Database',
    skills: ['SQL', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Tools & Methods',
    skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'Responsive Design'],
  },
];

const TechSkills = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-navy mb-4">
            What I <span className="text-gold">Work With</span>
          </h2>
          <p className="text-lg text-dark-navy/70 max-w-2xl mx-auto">
            The languages, tools, and practices I use to build software.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50/50 p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-dark-navy mb-4 text-center border-b border-gray-200 pb-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-dark-navy/80 shadow-sm border border-gray-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSkills;