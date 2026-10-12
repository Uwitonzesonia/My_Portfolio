// Offline answers used when the AI API isn't reachable (no API key, offline, error).
// Simple keyword matching over the portfolio content so the assistant always replies with real info.

const has = (q, words) => words.some((w) => q.includes(w));
const generic = new Set(['website', 'management', 'system', 'service', 'landing', 'information', 'support', 'dashboard', 'manager']);

export function answerLocally(question, content) {
  const { profile, projects, skillCategories, experiences } = content;
  const q = question.toLowerCase();

  // A specific project mentioned by name
  const project = projects.find((p) => {
    const key = p.title.toLowerCase().split(/[—(]/)[0].trim();
    if (!key) return false;
    return q.includes(key) || key.split(' ').some((w) => w.length > 4 && !generic.has(w) && q.includes(w));
  });
  if (project) {
    const links = [project.demoLink && `Live: ${project.demoLink}`, project.codeLink && `Code: ${project.codeLink}`].filter(Boolean).join('\n');
    return `${project.title} (${project.status}) — ${project.description}\nBuilt with ${project.tags.join(', ')}.${links ? `\n${links}` : ''}`;
  }

  if (has(q, ['cv', 'resume', 'résumé', 'curriculum'])) {
    return `You can download Sonia's CV here: ${profile.cv} — or use the "Download CV" button on the page.`;
  }
  if (has(q, ['contact', 'email', 'mail', 'reach', 'hire', 'phone', 'call', 'linkedin', 'talk'])) {
    return `You can reach Sonia at:\n- Email: ${profile.email}\n- Phone: ${profile.phone}\n- LinkedIn: ${profile.linkedin}\n- GitHub: ${profile.github}`;
  }
  if (has(q, ['project', 'work', 'built', 'build', 'portfolio', 'example', 'app'])) {
    return `Sonia has built ${projects.length} projects, including:\n${projects.slice(0, 6).map((p) => `- ${p.title} (${p.status})`).join('\n')}\nScroll to the Projects section to see them all, or ask me about one.`;
  }
  if (has(q, ['skill', 'tech', 'stack', 'language', 'know', 'react', 'java', 'python', 'php'])) {
    return skillCategories.map((c) => `- ${c.title}: ${c.skills.join(', ')}`).join('\n');
  }
  if (has(q, ['experience', 'intern', 'training', 'job', 'solvit', 'journey'])) {
    return experiences.map((e) => `- ${e.title} (${e.date})`).join('\n');
  }
  if (has(q, ['study', 'school', 'university', 'education', 'degree', 'student'])) {
    return profile.education.map((e) => `- ${e.school}: ${e.degree} (${e.date})`).join('\n');
  }
  if (has(q, ['available', 'freelance', 'open to', 'opportunit'])) {
    return `${profile.availability} Email ${profile.email} to get started.`;
  }
  if (has(q, ['where', 'location', 'based', 'live', 'country'])) {
    return `Sonia is based in ${profile.location} and works with clients remotely worldwide.`;
  }
  if (has(q, ['who', 'about', 'yourself', 'sonia', 'introduce'])) {
    return profile.summary;
  }
  if (has(q, ['hello', 'hi', 'hey', 'muraho', 'bonjour', 'habari'])) {
    return `Hi! 👋 I'm Sonia's assistant. Ask me about her projects, skills, experience, or how to contact her.`;
  }
  return `I'm not sure about that one. I can tell you about Sonia's projects, skills, experience, education or how to contact her — or email her directly at ${profile.email}.`;
}
