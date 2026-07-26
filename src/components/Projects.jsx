import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Paul & Rebecca Wedding Website",
      description: "Built a responsive wedding website featuring event details, photo galleries, RSVP information, and a clean, elegant UI optimized for desktop and mobile.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      image: "💍",
      gradient: "from-rose-400/20 to-amber-200/20"
    },
    {
      title: "Cleaning Service Website",
      description: "Developed a modern, responsive website for a cleaning business with service sections, contact forms, and a user-friendly interface to help customers request services easily.",
      tags: ["React", "JavaScript", "Tailwind CSS", "Vite"],
      image: "🧹",
      gradient: "from-blue-400/20 to-cyan-200/20"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-navy mb-4">My <span className="text-gold">Projects</span></h2>
          <p className="text-lg text-dark-navy/70 max-w-2xl mx-auto">Here are some of the projects I've built to solve real-world problems</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300`}>{project.image}</div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-dark-navy mb-3">{project.title}</h3>
                <p className="text-dark-navy/70 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (<span key={idx} className="px-3 py-1 bg-gray-100 text-sm font-medium text-dark-navy/80 rounded-full">{tag}</span>))}
                </div>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"><ExternalLink size={18} /> Live Demo</a>
                  <a href="#" className="flex items-center gap-2 text-dark-navy/60 font-semibold hover:text-dark-navy transition-all"><Github size={18} /> Code</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;