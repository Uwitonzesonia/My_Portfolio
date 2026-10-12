import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Code2, Smartphone, Lightbulb } from 'lucide-react';
import SectionHeader from './SectionHeader';

// Counts up from 0 when it scrolls into view
const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.5, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}{suffix}</span>;
};

const stats = [
  { value: 12, suffix: '+', label: 'Projects built' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 2, suffix: '', label: 'Trainings & internships' },
];

const highlights = [
  { icon: Code2, title: 'Web Development', text: 'Responsive websites and dashboards with React, Next.js, TypeScript and Tailwind.' },
  { icon: Smartphone, title: 'Mobile Apps', text: 'Cross-platform apps with React Native and Expo for Android and iOS.' },
  { icon: Lightbulb, title: 'Problem Solving', text: 'Turning real problems — health, school, business — into working software.' },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-ink-900 relative overflow-hidden">
      <div className="absolute -left-40 top-1/2 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="About" highlight="Me" subtitle="A bit about who I am and how I work." />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-5 text-gray-300 leading-relaxed">
            <p>
              I'm <span className="text-white font-semibold">Sonia Uwitonze</span>, a developer from Rwanda who loves building clean, useful products for the web and mobile.
            </p>
            <p>
              I've trained at <span className="text-brand-light font-medium">Gym Rwanda</span> and <span className="text-brand-light font-medium">Solvit Africa</span>, where I worked on real team projects with Git, pull requests and Figma designs. I'm also studying, building Java desktop systems alongside my web work.
            </p>
            <p>
              Right now I'm building <span className="text-white font-medium">Ubuzima</span>, a health support app that helps people with mild illness find guidance, pharmacies and doctors.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((s) => (
                <div key={s.label} className="card p-4 text-center">
                  <div className="text-3xl font-extrabold text-gradient"><Counter to={s.value} suffix={s.suffix} /></div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ x: 8 }}
                className="card p-5 flex gap-4 items-start hover:border-brand/60 transition-colors"
              >
                <div className="p-3 bg-brand/15 rounded-xl"><h.icon className="text-brand-light" size={24} /></div>
                <div>
                  <h3 className="font-bold text-white mb-1">{h.title}</h3>
                  <p className="text-sm text-gray-400">{h.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
