import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';  // <-- New import
import About from './components/About';
import TechSkills from './components/TechSkills'; // <-- New import
import Experience from './components/Experience'; // <-- New import
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Services />        {/* <-- Added */}
      <About />
      <TechSkills />      {/* <-- Added */}
      <Experience />      {/* <-- Added */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;