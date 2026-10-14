import React, { useEffect } from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { useContent } from '../data/ContentContext';

// A recruiter-friendly CV generated from the portfolio content (yoursite.com/#cv).
// Single column + real text = easy to skim and readable by applicant tracking systems (ATS).
// Edit the content in the admin page and this CV updates automatically.

const MAX_PROJECTS = 6; // the first projects in your list (reorder them in the admin page)

const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const sentences = (text) => text.split(/(?<=[.!?])\s+/).filter(Boolean);

const printStyles = `
  @page { size: A4; margin: 12mm 14mm; }
  @media print {
    html, body { background: #fff !important; }
    .no-print { display: none !important; }
    .cv-wrap { padding: 0 !important; background: #fff !important; }
    .cv-sheet { box-shadow: none !important; margin: 0 !important; padding: 0 !important; width: auto !important; min-height: 0 !important; }
    a { color: inherit !important; text-decoration: none !important; }
  }
  .cv-sheet { font-family: Calibri, 'Segoe UI', Arial, Helvetica, sans-serif; }
  .cv-avoid-break { break-inside: avoid; page-break-inside: avoid; }
`;

const Section = ({ title, children }) => (
  <section className="mt-5">
    <h2 className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8] border-b border-[#1d4ed8]/40 pb-1 mb-2.5">{title}</h2>
    {children}
  </section>
);

const CvPage = () => {
  const { profile, experiences, skillCategories, projects } = useContent();

  // Nice default file name when saving as PDF
  useEffect(() => {
    const previous = document.title;
    document.title = `${profile.name.replace(/\s+/g, '_')}_CV`;
    return () => { document.title = previous; };
  }, [profile.name]);

  const contacts = [
    profile.location,
    profile.phone && { text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    profile.email && { text: profile.email, href: `mailto:${profile.email}` },
    profile.linkedin && { text: shortUrl(profile.linkedin), href: profile.linkedin },
    profile.github && { text: shortUrl(profile.github), href: profile.github },
    profile.website && { text: shortUrl(profile.website), href: profile.website },
  ].filter(Boolean);

  const work = experiences.filter((e) => e.icon !== 'graduation'); // university is listed under Education
  const featured = projects.slice(0, MAX_PROJECTS);
  const moreLink = profile.website || profile.github;

  return (
    <div className="cv-wrap min-h-screen bg-gray-200 py-8 px-3 sm:px-6">
      <style>{printStyles}</style>

      {/* Toolbar (hidden when printing) */}
      <div className="no-print max-w-[210mm] mx-auto mb-4 flex flex-wrap items-center gap-3">
        <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-black">
          <ArrowLeft size={16} /> Back to portfolio
        </a>
        <span className="ml-auto text-xs text-gray-600 hidden sm:inline">Tip: choose “Save as PDF” in the print window</span>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-[#1d4ed8] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#1e40af]">
          <Printer size={16} /> Download PDF
        </button>
      </div>

      {/* The A4 sheet */}
      <article className="cv-sheet max-w-[210mm] min-h-[297mm] mx-auto bg-white text-[#1f2937] shadow-xl px-5 py-6 sm:px-[14mm] sm:py-[12mm] text-[12px] leading-[1.45]">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-[28px] font-bold tracking-wide text-[#0f172a] leading-tight">{profile.name.toUpperCase()}</h1>
          <p className="text-[13px] font-semibold text-[#1d4ed8] mt-0.5">{profile.title}</p>
          <p className="text-[11px] text-gray-600 mt-1.5 flex flex-wrap justify-center gap-y-0.5">
            {contacts.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="mx-1.5 text-gray-400">|</span>}
                <span className="whitespace-nowrap">{typeof c === 'string' ? c : <a href={c.href} className="hover:underline">{c.text}</a>}</span>
              </React.Fragment>
            ))}
          </p>
        </header>

        <Section title="Professional Summary">
          <p className="text-justify">{profile.summary}</p>
        </Section>

        <Section title="Technical Skills">
          <table className="w-full">
            <tbody>
              {skillCategories.map((c, i) => (
                <tr key={i} className="align-top">
                  <td className="font-bold text-[#0f172a] pr-3 py-0.5 whitespace-nowrap w-[1%]">{c.title}:</td>
                  <td className="py-0.5">{c.skills.join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {work.length > 0 && (
          <Section title="Experience & Training">
            <div className="space-y-3">
              {work.map((e, i) => (
                <div key={i} className="cv-avoid-break">
                  <div className="flex justify-between gap-4">
                    <h3 className="font-bold text-[#0f172a] text-[12.5px]">{e.title}</h3>
                    <span className="text-gray-600 whitespace-nowrap">{e.date}</span>
                  </div>
                  <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                    {sentences(e.description).map((s, j) => <li key={j}>{s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="Selected Projects">
          <div className="space-y-2.5">
            {featured.map((p, i) => (
              <div key={i} className="cv-avoid-break">
                <div className="flex justify-between gap-4">
                  <h3 className="font-bold text-[#0f172a] text-[12.5px]">
                    {p.title}
                    {p.status === 'In Progress' && <span className="ml-1.5 font-normal italic text-gray-500 text-[11px]">(in progress)</span>}
                    {p.status === 'Live' && <span className="ml-1.5 font-normal italic text-green-700 text-[11px]">(live)</span>}
                  </h3>
                  <span className="whitespace-nowrap text-[11px]">
                    {p.demoLink && <a href={p.demoLink} className="text-[#1d4ed8] hover:underline">{shortUrl(p.demoLink)}</a>}
                    {p.demoLink && p.codeLink && <span className="mx-1 text-gray-400">|</span>}
                    {p.codeLink && <a href={p.codeLink} className="text-[#1d4ed8] hover:underline">Code</a>}
                  </span>
                </div>
                <p className="mt-0.5">{p.description}</p>
                <p className="text-[11px] text-gray-600 mt-0.5"><span className="font-semibold">Tech:</span> {p.tags.join(', ')}</p>
              </div>
            ))}
          </div>
          {moreLink && projects.length > featured.length && (
            <p className="mt-2 text-[11px] text-gray-600 italic">
              + {projects.length - featured.length} more projects at{' '}
              <a href={moreLink} className="text-[#1d4ed8] not-italic hover:underline">{shortUrl(moreLink)}</a>
            </p>
          )}
        </Section>

        <Section title="Education">
          <div className="space-y-1.5">
            {profile.education.map((e, i) => (
              <div key={i} className="flex justify-between gap-4 cv-avoid-break">
                <p><span className="font-bold text-[#0f172a]">{e.school}</span> — {e.degree}</p>
                <span className="text-gray-600 whitespace-nowrap">{e.date}</span>
              </div>
            ))}
          </div>
        </Section>

        {profile.certifications?.length > 0 && (
          <Section title="Certifications">
            <ul className="space-y-1">
              {profile.certifications.map((c, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span>
                    <span className="font-bold text-[#0f172a]">{c.name}</span>
                    {c.issuer && <> — {c.issuer}</>}
                    {c.link && <> (<a href={c.link} className="text-[#1d4ed8] hover:underline">{shortUrl(c.link)}</a>)</>}
                  </span>
                  <span className="text-gray-600 whitespace-nowrap">{c.date}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Languages & Strengths">
          <p><span className="font-bold text-[#0f172a]">Languages:</span> {profile.languages.join(' · ')}</p>
          <p className="mt-0.5"><span className="font-bold text-[#0f172a]">Strengths:</span> {profile.strengths.join(' · ')}</p>
        </Section>
      </article>
    </div>
  );
};

export default CvPage;
