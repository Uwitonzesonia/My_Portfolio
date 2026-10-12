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

// The admin page only loads when someone opens yoursite.com/#admin
const AdminPanel = lazy(() => import('./admin/AdminPanel'));

const isAdminHash = () => window.location.hash === '#admin';

function App() {
  const [admin, setAdmin] = useState(isAdminHash);

  useEffect(() => {
    const onHashChange = () => setAdmin(isAdminHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (admin) {
    return (
      <Suspense fallback={<div className="min-h-screen grid place-items-center text-gray-400">Loading admin…</div>}>
        <AdminPanel />
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
