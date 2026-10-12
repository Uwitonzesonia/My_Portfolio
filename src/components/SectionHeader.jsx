import React from 'react';
import { motion } from 'framer-motion';

// Shared animated heading used by every section
const SectionHeader = ({ title, highlight, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 className="section-title">
      {title} <span className="text-gradient">{highlight}</span>
    </h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 96 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="h-1 bg-brand mx-auto mt-4 rounded-full shadow-[0_0_12px_#2563eb]"
    />
  </motion.div>
);

export default SectionHeader;
