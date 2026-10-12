import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SectionHeader from './SectionHeader';

// status: 'Live' | 'In Progress' | 'Completed'
// category: 'Web' | 'Mobile' | 'Java'
const projects = [
  {
    title: 'Ubuzima — Health Support App',
    description: 'Mobile app for mild illness: symptom check → guidance → nearest pharmacy → doctor, with body readings from a smartwatch or phone (Health Connect / HealthKit).',
    tags: ['React Native', 'Expo', 'TypeScript', 'Health Connect'],
    image: '🩺',
    category: 'Mobile',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/health-support-app',
  },
  {
    title: 'Bara — Restaurant Management Dashboard',
    description: 'Team project at Solvit Africa: a SaaS dashboard for restaurants with inventory, menu, billing, transactions, reports and AI insights pages.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    image: '🍽️',
    category: 'Web',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Solvit-Africa-Training-Center/bara-frontend',
  },
  {
    title: 'Movie & Series Website',
    description: 'Streaming-style website with movies, series, trends, collections, Golden Globe picks, pricing plans and FAQ, connected to an API.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'React Router'],
    image: '🎬',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: 'https://github.com/Solvit-Africa-Training-Center/react-typescript-learning-material-vite',
  },
  {
    title: 'Netflix — Movie Ticket Booking App',
    description: 'Cross-platform mobile app to browse movies, view details, book seats, sign up and keep your tickets, with a responsive layout.',
    tags: ['React Native', 'Expo Router', 'TypeScript'],
    image: '🎟️',
    category: 'Mobile',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/Netflix',
  },
  {
    title: 'Solvit Student Portal',
    description: 'School portal with login, student and lecturer pages, enrolled courses, assignments, attendance, class roster and grading.',
    tags: ['React', 'TypeScript', 'Firebase', 'React Router'],
    image: '🎓',
    category: 'Web',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/SOLVIT-APP',
  },
  {
    title: 'Weather App',
    description: 'Search any city for live weather from the OpenWeatherMap API, with Firebase login and protected routes.',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    image: '🌦️',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'Paul & Rebecca Wedding Website',
    description: 'Responsive wedding website featuring event details, photo galleries, RSVP information, and a clean, elegant UI for desktop and mobile.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: '💍',
    category: 'Web',
    status: 'Live',
    demoLink: 'https://rebecca-paul.netlify.app/',
    codeLink: null,
  },
  {
    title: 'Cleaning Service Website',
    description: 'Modern, responsive website for a cleaning business with service sections, contact forms, and an easy way for customers to request services.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    image: '🧹',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'LUGX Gaming Landing Page',
    description: 'My first Tailwind project: a gaming store landing page with banner, top games and categories sections.',
    tags: ['HTML', 'Tailwind CSS'],
    image: '🎮',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/tailwind',
  },
  {
    title: 'Task Manager',
    description: 'A simple task manager to add, track and organise daily tasks.',
    tags: ['React', 'TypeScript', 'Vite'],
    image: '✅',
    category: 'Web',
    status: 'In Progress',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'Banking Management System',
    description: 'Desktop banking application to manage customers and accounts, built with a layered model / DAO / view structure.',
    tags: ['Java', 'Swing', 'JDBC', 'PostgreSQL'],
    image: '🏦',
    category: 'Java',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'Patient Management Information System',
    description: 'Desktop system to register and manage patient records using Hibernate ORM with a relational database.',
    tags: ['Java', 'Hibernate', 'PostgreSQL'],
    image: '🏥',
    category: 'Java',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
];

const filters = ['All', 'Web', 'Mobile', 'Java'];

const statusStyles = {
  Live: 'bg-green-500/15 text-green-400 border-green-500/30',
  'In Progress': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Completed: 'bg-brand/15 text-brand-light border-brand/30',
};

const Projects = () => {
  const [active, setActive] = useState('All');
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
                key={project.title}
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
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs font-medium text-gray-300 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-5">
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-light font-semibold hover:gap-3 transition-all"><ExternalLink size={18} /> Live Demo</a>
                    )}
                    {project.codeLink && (
                      <a href={project.codeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 font-semibold hover:text-white hover:gap-3 transition-all"><Github size={18} /> Code</a>
                    )}
                    {!project.demoLink && !project.codeLink && (
                      <span className="text-sm text-gray-500 italic">Demo coming soon</span>
                    )}
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
