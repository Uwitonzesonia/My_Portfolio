// Cleans content coming from the admin page before it is saved:
// keeps only known fields, trims text, limits sizes, and only allows safe links.

const str = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const list = (v, max = 50) => (Array.isArray(v) ? v.slice(0, max) : []);
const strList = (v, maxItems = 30, maxLen = 200) => list(v, maxItems).map((s) => str(s, maxLen)).filter(Boolean);

// Allow http(s) links, mailto, and paths on this site; anything else (e.g. "javascript:") becomes empty
const link = (v) => {
  const s = str(v, 1000);
  return /^(https?:\/\/|mailto:|\/(?!\/))/i.test(s) ? s : '';
};
const linkOrNull = (v) => link(v) || null;
const oneOf = (v, options, fallback) => (options.includes(v) ? v : fallback);

export function cleanContent(input) {
  if (!input || typeof input !== 'object') throw new Error('Content must be an object');
  const p = input.profile || {};

  return {
    profile: {
      name: str(p.name, 100),
      title: str(p.title, 200),
      heroBadge: str(p.heroBadge, 150),
      roles: strList(p.roles, 10, 60),
      heroIntro: str(p.heroIntro, 600),
      about: strList(p.about, 10, 1500),
      location: str(p.location, 150),
      email: str(p.email, 150),
      phone: str(p.phone, 40),
      linkedin: link(p.linkedin),
      github: link(p.github),
      cv: link(p.cv),
      website: link(p.website),
      availability: str(p.availability, 300),
      summary: str(p.summary, 2000),
      education: list(p.education, 10).map((e) => ({ school: str(e?.school, 150), degree: str(e?.degree, 200), date: str(e?.date, 60) })),
      languages: strList(p.languages, 15, 60),
      strengths: strList(p.strengths, 20, 60),
      interests: strList(p.interests, 20, 60),
      certifications: list(p.certifications, 15).map((c) => ({ name: str(c?.name, 200), issuer: str(c?.issuer, 120), date: str(c?.date, 60), link: link(c?.link) })),
    },
    services: list(input.services, 20).map((s) => ({
      icon: oneOf(s?.icon, ['layout', 'smartphone', 'code', 'server', 'database', 'brush', 'wrench', 'users'], 'code'),
      title: str(s?.title, 80),
      description: str(s?.description, 300),
    })),
    experiences: list(input.experiences, 20).map((e) => ({
      icon: oneOf(e?.icon, ['rocket', 'briefcase', 'award', 'graduation'], 'briefcase'),
      title: str(e?.title, 150),
      date: str(e?.date, 60),
      description: str(e?.description, 800),
    })),
    skillCategories: list(input.skillCategories, 15).map((c) => ({ title: str(c?.title, 60), skills: strList(c?.skills, 40, 50) })),
    projects: list(input.projects, 50).map((pr) => ({
      title: str(pr?.title, 120),
      description: str(pr?.description, 800),
      tags: strList(pr?.tags, 12, 40),
      image: str(pr?.image, 8) || '💻',
      category: str(pr?.category, 30) || 'Web',
      status: oneOf(pr?.status, ['Live', 'In Progress', 'Completed'], 'Completed'),
      demoLink: linkOrNull(pr?.demoLink),
      codeLink: linkOrNull(pr?.codeLink),
    })),
  };
}
