// DEFAULT content for the portfolio.
// You normally don't need to edit this file: open yoursite.com/#admin, log in, and edit there.
// What you save in the admin page replaces these defaults on the website AND in the AI assistant.

export const profile = {
  name: 'Sonia Uwitonze',
  title: 'Software Engineering Undergraduate | Full-Stack Developer | Web & Mobile Developer',
  heroBadge: 'Kigali, Rwanda · Open to internships & freelance work',
  roles: ['Frontend Web Developer', 'React Developer', 'Mobile App Builder', 'UI/UX Enthusiast'],
  heroIntro: 'I build modern, responsive websites, web applications and mobile apps that help businesses grow. Specializing in React, React Native, JavaScript/TypeScript, PHP and clean UI/UX.',
  about: [
    "I'm Sonia Uwitonze, a Software Engineering student at AUCA in Kigali, Rwanda, who loves building clean, useful products for the web and mobile.",
    "I've trained at Gym Rwanda and I'm now in the Solvit Africa software development program, working on real team projects with Git, pull requests and Figma designs. Alongside web and mobile, I build Java desktop systems at university.",
    "Right now I'm building Ubuzima, a health support app that helps people with mild illness find guidance, pharmacies and doctors.",
  ],
  location: 'Kigali City, Gasabo District, Rwanda',
  email: 'uwitonzesonia2005@gmail.com',
  phone: '+250 792 728 289',
  linkedin: 'https://www.linkedin.com/in/uwitonze-sonia/',
  github: 'https://github.com/Uwitonzesonia',
  cv: '/Uwitonze_Sonia_CV.pdf',
  availability: 'Open to internships, junior developer roles and freelance web/mobile projects.',
  summary:
    'Software Engineering undergraduate building practical skills in full-stack, web, and mobile application development. ' +
    'Hands-on experience with JavaScript, TypeScript, React, Next.js, React Native, Node.js, Express.js, PHP, Python, Java, MySQL, PostgreSQL, Firebase, HTML, CSS and Git/GitHub. ' +
    'Experienced with APIs, databases, responsive interfaces and application logic. Currently growing professional and collaborative skills through Solvit Africa. ' +
    'Eager to contribute to software teams, learn quickly, and turn real-world requirements into functional digital solutions.',
  education: [
    { school: 'AUCA (Adventist University of Central Africa)', degree: "Bachelor's in Software Engineering (in progress)", date: 'September 2024 – Present' },
    { school: 'Ecole Secondaire Gikondo', degree: 'High School Diploma (A1) — Mathematics, Computer Science & Economics (71.61%)', date: '2019 – 2023' },
  ],
  languages: ['Kinyarwanda (native)', 'English (very good)', 'Swahili (good)', 'French (intermediate)'],
  strengths: ['Problem solving', 'Team collaboration', 'Communication', 'Adaptability', 'Leadership', 'Time management', 'Willingness to learn'],
  interests: ['Software development', 'Technology', 'Handball', 'Reading', 'Music', 'Movies'],
};

// icon: one of layout | smartphone | code | server | database | brush | wrench | users
export const services = [
  { icon: 'layout', title: 'Frontend Development', description: 'Responsive, accessible interfaces with React, Next.js, HTML, CSS, and Tailwind.' },
  { icon: 'smartphone', title: 'Mobile Apps', description: 'Cross-platform Android and iOS apps with React Native and Expo.' },
  { icon: 'code', title: 'Full-Stack Web Apps', description: 'Complete web applications with PHP, Python, Firebase and modern JavaScript.' },
  { icon: 'server', title: 'Backend & APIs', description: 'Server logic, REST APIs, and data handling with PHP, Python, and Node.js.' },
  { icon: 'database', title: 'Database Design', description: 'Structuring relational databases with SQL, MySQL, and PostgreSQL.' },
  { icon: 'brush', title: 'UI/UX Design', description: 'Clean, user-friendly interfaces from Figma designs to functional code.' },
  { icon: 'wrench', title: 'Bug Fixing & Maintenance', description: 'Debugging, testing, and keeping existing websites healthy and fast.' },
  { icon: 'users', title: 'Collaboration', description: 'Clear communication, teamwork with Git, and delivering quality work on time.' },
];

// icon: one of rocket | briefcase | award | graduation
export const experiences = [
  {
    icon: 'rocket',
    title: 'Solvit Africa — Software Development Program',
    date: '2026 – Present',
    description: 'Building real products in teams — a restaurant management dashboard (Next.js) and a movie & series website (React + TypeScript) — using Git branches, pull requests and Figma designs.',
  },
  {
    icon: 'briefcase',
    title: 'Gym Rwanda Programming Training',
    date: 'April 2025 – September 2025',
    description: 'Intensive programming training focused on problem-solving, coding skills, and real-world application. Built mini tech projects and improved hands-on coding experience.',
  },
  {
    icon: 'award',
    title: 'NetBrain — Introduction to Network Operations (Internship)',
    date: '2025',
    description: 'Practical exposure to networking concepts, cybersecurity basics, troubleshooting, network protocols and topology design.',
  },
  {
    icon: 'graduation',
    title: 'AUCA — BSc Software Engineering',
    date: 'September 2024 – Present',
    description: 'Studying software engineering: OOP, data structures & algorithms, operating systems, databases and Java desktop development.',
  },
];

export const skillCategories = [
  { title: 'Languages', skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'PHP', 'Java', 'C', 'C++'] },
  { title: 'Frontend', skills: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Figma'] },
  { title: 'Mobile', skills: ['React Native', 'Expo', 'Expo Router'] },
  { title: 'Backend & Data', skills: ['Node.js', 'Express.js', 'REST APIs', 'MySQL', 'PostgreSQL', 'Firebase', 'Hibernate', 'Google Apps Script'] },
  { title: 'Tools & Methods', skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'OOP', 'Data Structures', 'Responsive Design'] },
];

// status: 'Live' | 'In Progress' | 'Completed'
// category: 'Web' | 'Mobile' | 'Java'
export const projects = [
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
    title: 'Clean Lady — Cleaning Service Website',
    description: 'Cleaning company website with service sections and a booking workflow that saves requests to Google Sheets through Google Apps Script.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Google Apps Script'],
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
    description: 'Java desktop banking application to manage customers and accounts, built with a layered model / DAO / view structure.',
    tags: ['Java', 'Swing', 'JDBC', 'PostgreSQL'],
    image: '🏦',
    category: 'Java',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'Patient Management Information System',
    description: 'Java desktop system to register and manage patient records using Hibernate ORM with a relational database.',
    tags: ['Java', 'Hibernate', 'PostgreSQL'],
    image: '🏥',
    category: 'Java',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
];

export const defaultContent = { profile, services, experiences, skillCategories, projects };

// Turns the content into plain text the AI uses as its knowledge base.
export function buildKnowledgeBase(content = defaultContent) {
  const { profile: p, services, experiences, skillCategories, projects } = content;
  const lines = [
    `NAME: ${p.name}`,
    `TITLE: ${p.title}`,
    `LOCATION: ${p.location}`,
    `AVAILABILITY: ${p.availability}`,
    `CONTACT: email ${p.email} | phone ${p.phone} | LinkedIn ${p.linkedin} | GitHub ${p.github}`,
    `CV: visitors can download it with the "Download CV" button (file ${p.cv}).`,
    '',
    `SUMMARY: ${p.summary}`,
    '',
    `ABOUT: ${p.about.join(' ')}`,
    '',
    'SERVICES OFFERED:',
    ...services.map((s) => `- ${s.title}: ${s.description}`),
    '',
    'EDUCATION:',
    ...p.education.map((e) => `- ${e.school}: ${e.degree} (${e.date})`),
    '',
    'EXPERIENCE & TRAINING:',
    ...experiences.map((e) => `- ${e.title} (${e.date}): ${e.description}`),
    '',
    'SKILLS:',
    ...skillCategories.map((c) => `- ${c.title}: ${c.skills.join(', ')}`),
    '',
    'PROJECTS:',
    ...projects.map((pr) => {
      const links = [pr.demoLink && `live: ${pr.demoLink}`, pr.codeLink && `code: ${pr.codeLink}`].filter(Boolean).join(', ');
      return `- ${pr.title} [${pr.category}, ${pr.status}] — ${pr.description} Tech: ${pr.tags.join(', ')}.${links ? ` Links: ${links}.` : ''}`;
    }),
    '',
    `LANGUAGES: ${p.languages.join(', ')}`,
    `STRENGTHS: ${p.strengths.join(', ')}`,
    `INTERESTS: ${p.interests.join(', ')}`,
  ];
  return lines.join('\n');
}
