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
  website: '', // your live portfolio address, e.g. https://sonia-uwitonze.vercel.app (shown on the CV)
  availability: 'Open to internships, junior developer roles and freelance web/mobile projects.',
  summary:
    'Software Engineering student at AUCA and full-stack developer who builds web and mobile products end to end — ' +
    'from Figma designs to working React, Next.js and React Native apps backed by Node.js, PHP, Firebase and SQL databases. ' +
    'Currently building Ubuzima, a health-support mobile app, and developing the frontend of a restaurant management SaaS in a team at Solvit Africa. ' +
    'Learns fast, writes clean responsive UI, and turns real-world problems into software people can use.',
  education: [
    { school: 'AUCA (Adventist University of Central Africa)', degree: "Bachelor's in Software Engineering (in progress)", date: 'September 2024 – Present' },
    { school: 'Ecole Secondaire Gikondo', degree: 'High School Diploma (A1) — Mathematics, Computer Science & Economics (71.61%)', date: '2019 – 2023' },
  ],
  languages: ['Kinyarwanda (native)', 'English (B2 Upper Intermediate, EF SET)', 'Swahili (good)', 'French (intermediate)'],
  certifications: [
    { name: 'EF SET English Certificate — 52/100, B2 Upper Intermediate (CEFR)', issuer: 'EF Standard English Test', date: 'July 2026', link: 'https://cert.efset.org/DSLBfv' },
  ],
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
    title: 'Solvit Africa — Software Development Program (Trainee Developer)',
    date: '2026 – Present',
    description: 'Develop the frontend of Bara, a restaurant management SaaS (Next.js, TypeScript, Tailwind CSS, shadcn/ui), turning Figma designs into dashboard, inventory, billing and reports pages. Integrated a REST API into a team-built movie & series platform (React, TypeScript). Work in agile teams with Git branching, pull requests and code review.',
  },
  {
    icon: 'briefcase',
    title: 'Gym Rwanda Programming Training',
    date: 'April 2025 – September 2025',
    description: 'Completed a six-month intensive programming training focused on problem solving and real-world coding. Built hands-on projects including a Tailwind CSS gaming landing page and JavaScript applications.',
  },
  {
    icon: 'award',
    title: 'NetBrain — Network Operations Intern',
    date: '2025',
    description: 'Practised network troubleshooting, protocols and topology design. Built foundations in network security and cybersecurity.',
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
    description: 'Building a cross-platform health app that guides people with mild illness from a symptom check to care advice, the nearest pharmacy, and a doctor. Reads body vitals from smartwatches and phones through Health Connect (Android) and HealthKit (iOS).',
    tags: ['React Native', 'Expo', 'TypeScript', 'Health Connect'],
    image: '🩺',
    category: 'Mobile',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/health-support-app',
  },
  {
    title: 'Bara — Restaurant Management Dashboard',
    description: 'Developing, in a team at Solvit Africa, the frontend of a restaurant management SaaS: operations dashboard, inventory, menu, billing, transactions, reports and AI-insights pages built from Figma designs.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    image: '🍽️',
    category: 'Web',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Solvit-Africa-Training-Center/bara-frontend',
  },
  {
    title: 'Movie & Series Website',
    description: 'Built with a team a responsive streaming-style platform with movies, series, trends, collections, pricing plans and FAQ, powered by a REST API and React Router.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'React Router'],
    image: '🎬',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: 'https://github.com/Solvit-Africa-Training-Center/react-typescript-learning-material-vite',
  },
  {
    title: 'Netflix — Movie Ticket Booking App',
    description: 'Building a cross-platform cinema app where users browse movies, view details, pick seats, sign up and keep their tickets, with file-based navigation and a responsive layout.',
    tags: ['React Native', 'Expo Router', 'TypeScript'],
    image: '🎟️',
    category: 'Mobile',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/Netflix',
  },
  {
    title: 'Solvit Student Portal',
    description: 'Building a role-based school portal with Firebase authentication: student and lecturer dashboards for courses, assignments, attendance, class rosters and grading.',
    tags: ['React', 'TypeScript', 'Firebase', 'React Router'],
    image: '🎓',
    category: 'Web',
    status: 'In Progress',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/SOLVIT-APP',
  },
  {
    title: 'Weather App',
    description: 'Built a weather app that shows live conditions for any city from the OpenWeatherMap API, with Firebase login and protected routes.',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    image: '🌦️',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'Paul & Rebecca Wedding Website',
    description: 'Designed and launched a responsive wedding website for a real client, with event details, photo galleries and RSVP information.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: '💍',
    category: 'Web',
    status: 'Live',
    demoLink: 'https://rebecca-paul.netlify.app/',
    codeLink: null,
  },
  {
    title: 'Clean Lady — Cleaning Service Website',
    description: 'Built a cleaning company website whose booking form saves customer requests automatically to Google Sheets through Google Apps Script.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Google Apps Script'],
    image: '🧹',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'LUGX Gaming Landing Page',
    description: 'Built a gaming store landing page with Tailwind CSS: hero banner, top games and categories sections.',
    tags: ['HTML', 'Tailwind CSS'],
    image: '🎮',
    category: 'Web',
    status: 'Completed',
    demoLink: null,
    codeLink: 'https://github.com/Uwitonzesonia/tailwind',
  },
  {
    title: 'Task Manager',
    description: 'Building a task manager to add, track and organise daily tasks.',
    tags: ['React', 'TypeScript', 'Vite'],
    image: '✅',
    category: 'Web',
    status: 'In Progress',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'Banking Management System',
    description: 'Built a Java Swing desktop banking system to manage customers and accounts, using a layered model / DAO / view architecture with JDBC and PostgreSQL.',
    tags: ['Java', 'Swing', 'JDBC', 'PostgreSQL'],
    image: '🏦',
    category: 'Java',
    status: 'Completed',
    demoLink: null,
    codeLink: null,
  },
  {
    title: 'Patient Management Information System',
    description: 'Built a Java desktop system to register and manage patient records, using Hibernate ORM with PostgreSQL.',
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
    `CV: visitors can download it with the "Download CV" button (file ${p.cv}) or view it online at /#cv.`,
    ...(p.website ? [`PORTFOLIO WEBSITE: ${p.website}`] : []),
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
    `CERTIFICATIONS: ${(p.certifications || []).map((c) => `${c.name} (${c.issuer}, ${c.date})${c.link ? ` ${c.link}` : ''}`).join('; ') || 'none listed'}`,
    `LANGUAGES: ${p.languages.join(', ')}`,
    `STRENGTHS: ${p.strengths.join(', ')}`,
    `INTERESTS: ${p.interests.join(', ')}`,
  ];
  return lines.join('\n');
}
