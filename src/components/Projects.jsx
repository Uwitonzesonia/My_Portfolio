import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Bot } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { openAssistant } from './ChatAssistant';
import { useContent } from '../data/ContentContext';

const statusStyles = {
  Live: 'bg-green-500/15 text-green-400 border-green-500/30',
  'In Progress': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Completed: 'bg-brand/15 text-brand-light border-brand/30',
};

const Projects = () => {
  const { projects } = useContent();
  const [active, setActive] = useState('All');
  const filters = ['All', ...new Set(projects.map((p) => p.category))];
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-20 bg-ink-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="My" highlight="Projects" subtitle="Things I've built and things I'm still building — web, mobile and desktop." />

        {/* Filter tabs with a sliding blue pill */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors ${active === f ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {active === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 bg-brand rounded-full shadow-lg shadow-brand/40" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                layout
                key={`${index}-${project.title}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="card overflow-hidden group flex flex-col hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/20 transition-[border-color,box-shadow] duration-300"
              >
                <div className="relative h-40 bg-gradient-to-br from-brand/25 via-ink-800 to-black flex items-center justify-center text-6xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.35),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">{project.image}</span>
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs font-medium text-gray-300 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-light font-semibold hover:gap-3 transition-all"><ExternalLink size={18} /> Live Demo</a>
                    )}
                    {project.codeLink && (
                      <a href={project.codeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 font-semibold hover:text-white hover:gap-3 transition-all"><Github size={18} /> Code</a>
                    )}
                    {!project.demoLink && !project.codeLink && (
                      <span className="text-sm text-gray-500 italic">Demo coming soon</span>
                    )}
                    <button
                      onClick={() => openAssistant(`Tell me about the ${project.title} project`)}
                      className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-brand-light border border-brand/40 px-3 py-1 rounded-full hover:bg-brand hover:text-white hover:border-brand transition-colors"
                    >
                      <Bot size={15} /> Ask AI
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
