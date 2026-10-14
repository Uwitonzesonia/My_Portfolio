import React, { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import About from './components/About';
import TechSkills from './components/TechSkills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

// These pages only load when someone opens yoursite.com/#admin or yoursite.com/#cv
const AdminPanel = lazy(() => import('./admin/AdminPanel'));
const CvPage = lazy(() => import('./cv/CvPage'));

const pages = { '#admin': AdminPanel, '#cv': CvPage };
const currentPage = () => pages[window.location.hash] || null;

function App() {
  const [Page, setPage] = useState(currentPage);

  useEffect(() => {
    const onHashChange = () => {
      setPage(currentPage);
      if (!window.location.hash) window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (Page) {
    return (
      <Suspense fallback={<div className="min-h-screen grid place-items-center text-gray-400">Loading…</div>}>
        <Page />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <About />
      <TechSkills />
      <Experience />
      <Contact />
      <Footer />
      <ChatAssistant />
    </div>
  );
}

export default App;
