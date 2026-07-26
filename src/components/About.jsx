import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'PHP', 'Python', 'Figma'];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center relative">
              <span className="text-8xl">👩‍💻</span>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/5 rounded-full"></div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark-navy mb-6">About <span className="text-gold">Me</span></h2>
            <p className="text-lg text-dark-navy/70 leading-relaxed mb-6">
              Hi, I'm Sonia, a passionate Frontend Web Developer dedicated to building modern, responsive, and user-friendly websites. I specialize in creating clean, functional, and visually appealing web experiences using HTML, CSS, JavaScript, React, Tailwind CSS, PHP, Python, and Figma.
            </p>
            <p className="text-lg text-dark-navy/70 leading-relaxed mb-8">
              I've developed projects including a wedding website and a cleaning service website, focusing on responsive design, performance, and intuitive user experiences. I enjoy transforming ideas into professional websites that are both attractive and easy to use.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }} className="flex items-center gap-2 text-dark-navy/80">
                  <CheckCircle size={18} className="text-gold flex-shrink-0" />
                  <span className="font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;