import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Lock, LogOut, Save, Eye, Plus, Trash2, ChevronUp, ChevronDown, X, Upload, FileText,
  User, FolderKanban, Briefcase, Wrench, Layers, Download, RotateCcw, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { defaultContent } from '../data/profile';
import { useSetContent } from '../data/ContentContext';

const PW_KEY = 'portfolio-admin-pw';

const readPw = () => { try { return sessionStorage.getItem(PW_KEY) || ''; } catch { return ''; } };
const writePw = (v) => {
  try {
    if (v) sessionStorage.setItem(PW_KEY, v);
    else sessionStorage.removeItem(PW_KEY);
  } catch { /* private mode */ }
};

// Immutable "set value at path" helper: setIn(obj, ['projects', 2, 'title'], 'New')
const setIn = (obj, [key, ...rest], value) => {
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[key] = rest.length ? setIn(obj[key], rest, value) : value;
  return copy;
};

const move = (arr, from, to) => {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
};

async function api(action, password, { body, contentType = 'application/json' } = {}) {
  const res = await fetch(`/api/admin?action=${action}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${password}`, 'Content-Type': contentType },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

/* ---------- Small form building blocks ---------- */

const inputClass =
  'w-full bg-ink border border-white/10 text-white placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30';

const Field = ({ label, hint, value, onChange, textarea, rows = 3, type = 'text', placeholder }) => (
  <label className="block">
    <span className="block text-sm font-medium text-gray-300 mb-1">{label}</span>
    {textarea ? (
      <textarea rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${inputClass} resize-y`} />
    ) : (
      <input type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
    )}
    {hint && <span className="block text-xs text-gray-500 mt-1">{hint}</span>}
  </label>
);

const Select = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="block text-sm font-medium text-gray-300 mb-1">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>
);

// Chips editor: type and press Enter (or comma) to add, click × to remove
const TagInput = ({ label, values, onChange, placeholder = 'Type and press Enter' }) => {
  const [text, setText] = useState('');
  const add = () => {
    const parts = text.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) onChange([...values, ...parts]);
    setText('');
  };
  return (
    <div>
      <span className="block text-sm font-medium text-gray-300 mb-1">{label}</span>
      <div className="flex flex-wrap gap-2 p-2 bg-ink border border-white/10 rounded-lg focus-within:border-brand">
        {values.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-brand/20 text-brand-light text-xs font-medium pl-2.5 pr-1 py-1 rounded-full">
            {v}
            <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))} className="p-0.5 rounded-full hover:bg-white/10" aria-label={`Remove ${v}`}>
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }
            if (e.key === 'Backspace' && !text && values.length) onChange(values.slice(0, -1));
          }}
          onBlur={add}
          placeholder={placeholder}
          className="flex-1 min-w-[140px] bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none px-1"
        />
      </div>
    </div>
  );
};

// Card around one item of a list, with move up / move down / delete buttons
const ItemCard = ({ title, index, total, onMove, onDelete, children }) => (
  <div className="bg-ink-800 border border-white/10 rounded-xl p-4 space-y-3">
    <div className="flex items-center justify-between gap-2">
      <p className="font-semibold text-white truncate">{title || <span className="text-gray-500 italic">Untitled</span>}</p>
      <div className="flex items-center gap-1 shrink-0">
        <button type="button" disabled={index === 0} onClick={() => onMove(index - 1)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30" aria-label="Move up"><ChevronUp size={16} /></button>
        <button type="button" disabled={index === total - 1} onClick={() => onMove(index + 1)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30" aria-label="Move down"><ChevronDown size={16} /></button>
        <button type="button" onClick={() => window.confirm(`Delete "${title || 'this item'}"?`) && onDelete()} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/15" aria-label="Delete"><Trash2 size={16} /></button>
      </div>
    </div>
    {children}
  </div>
);

const AddButton = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-white/15 text-gray-400 hover:border-brand hover:text-brand-light transition-colors">
    <Plus size={18} /> {children}
  </button>
);

// Generic editor for a list section (projects, services, …)
const ListEditor = ({ items, onChange, itemTitle, renderFields, newItem, addLabel }) => (
  <div className="space-y-4">
    {items.map((item, i) => (
      <ItemCard
        key={i}
        title={itemTitle(item)}
        index={i}
        total={items.length}
        onMove={(to) => onChange(move(items, i, to))}
        onDelete={() => onChange(items.filter((_, j) => j !== i))}
      >
        {renderFields(item, (field, value) => onChange(setIn(items, [i, field], value)))}
      </ItemCard>
    ))}
    <AddButton onClick={() => onChange([...items, newItem()])}>{addLabel}</AddButton>
  </div>
);

/* ---------- Tabs ---------- */

const ProfileTab = ({ draft, set }) => {
  const p = draft.profile;
  const setP = (field) => (value) => set(['profile', field], value);
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white">Top of the page</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name" value={p.name} onChange={setP('name')} />
          <Field label="Badge above your name" value={p.heroBadge} onChange={setP('heroBadge')} />
        </div>
        <TagInput label="Job titles (they type out one after another)" values={p.roles} onChange={setP('roles')} />
        <Field label="Short introduction" textarea value={p.heroIntro} onChange={setP('heroIntro')} />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white">Contact & links</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" type="email" value={p.email} onChange={setP('email')} />
          <Field label="Phone" value={p.phone} onChange={setP('phone')} />
          <Field label="LinkedIn URL" value={p.linkedin} onChange={setP('linkedin')} placeholder="https://www.linkedin.com/in/…" />
          <Field label="GitHub URL" value={p.github} onChange={setP('github')} placeholder="https://github.com/…" />
          <Field label="Portfolio website (shown on your CV)" value={p.website} onChange={setP('website')} placeholder="https://your-portfolio.vercel.app" />
          <Field label="Location" value={p.location} onChange={setP('location')} />
          <Field label="Availability" value={p.availability} onChange={setP('availability')} />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white">About me</h3>
        <Field label="Professional title" value={p.title} onChange={setP('title')} />
        <Field label="Professional summary (used by the AI assistant)" textarea rows={4} value={p.summary} onChange={setP('summary')} />
        <div className="space-y-3">
          <span className="block text-sm font-medium text-gray-300">“About Me” paragraphs</span>
          {p.about.map((para, i) => (
            <div key={i} className="flex gap-2">
              <textarea rows={3} value={para} onChange={(e) => set(['profile', 'about', i], e.target.value)} className={`${inputClass} resize-y`} />
              <button type="button" onClick={() => setP('about')(p.about.filter((_, j) => j !== i))} className="self-start p-2 text-red-400 hover:bg-red-500/15 rounded-lg" aria-label="Remove paragraph"><Trash2 size={16} /></button>
            </div>
          ))}
          <AddButton onClick={() => setP('about')([...p.about, ''])}>Add paragraph</AddButton>
        </div>
        <TagInput label="Languages you speak" values={p.languages} onChange={setP('languages')} />
        <TagInput label="Strengths" values={p.strengths} onChange={setP('strengths')} />
        <TagInput label="Interests" values={p.interests} onChange={setP('interests')} />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white">Certifications</h3>
        <ListEditor
          items={p.certifications || []}
          onChange={setP('certifications')}
          itemTitle={(c) => c.name}
          newItem={() => ({ name: '', issuer: '', date: '', link: '' })}
          addLabel="Add certification"
          renderFields={(c, setF) => (
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Certificate name" value={c.name} onChange={(v) => setF('name', v)} />
              <Field label="Issued by" value={c.issuer} onChange={(v) => setF('issuer', v)} />
              <Field label="Date" value={c.date} onChange={(v) => setF('date', v)} placeholder="July 2026" />
              <Field label="Verification link (optional)" value={c.link} onChange={(v) => setF('link', v)} placeholder="https://…" />
            </div>
          )}
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white">Education</h3>
        <ListEditor
          items={p.education}
          onChange={setP('education')}
          itemTitle={(e) => e.school}
          newItem={() => ({ school: '', degree: '', date: '' })}
          addLabel="Add education"
          renderFields={(e, setF) => (
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="School" value={e.school} onChange={(v) => setF('school', v)} />
              <Field label="Degree / diploma" value={e.degree} onChange={(v) => setF('degree', v)} />
              <Field label="Dates" value={e.date} onChange={(v) => setF('date', v)} placeholder="2024 – Present" />
            </div>
          )}
        />
      </section>
    </div>
  );
};

const ProjectsTab = ({ draft, set }) => {
  const categories = [...new Set(['Web', 'Mobile', 'Java', ...draft.projects.map((p) => p.category)])];
  return (
    <>
      <datalist id="project-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
      <ListEditor
        items={draft.projects}
        onChange={(v) => set(['projects'], v)}
        itemTitle={(pr) => `${pr.image} ${pr.title}`}
        newItem={() => ({ title: '', description: '', tags: [], image: '💻', category: 'Web', status: 'In Progress', demoLink: null, codeLink: null })}
        addLabel="Add project"
        renderFields={(pr, setF) => (
          <>
            <div className="grid sm:grid-cols-[1fr_90px] gap-3">
              <Field label="Project name" value={pr.title} onChange={(v) => setF('title', v)} />
              <Field label="Emoji" value={pr.image} onChange={(v) => setF('image', v)} />
            </div>
            <Field label="Description" textarea value={pr.description} onChange={(v) => setF('description', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-sm font-medium text-gray-300 mb-1">Category (filter tab)</span>
                <input list="project-categories" value={pr.category} onChange={(e) => setF('category', e.target.value)} className={inputClass} />
              </label>
              <Select label="Status" value={pr.status} onChange={(v) => setF('status', v)} options={['Live', 'In Progress', 'Completed']} />
            </div>
            <TagInput label="Technologies" values={pr.tags} onChange={(v) => setF('tags', v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Live demo link (optional)" value={pr.demoLink} onChange={(v) => setF('demoLink', v || null)} placeholder="https://…" />
              <Field label="Code link (optional)" value={pr.codeLink} onChange={(v) => setF('codeLink', v || null)} placeholder="https://github.com/…" />
            </div>
          </>
        )}
      />
    </>
  );
};

const ServicesTab = ({ draft, set }) => (
  <ListEditor
    items={draft.services}
    onChange={(v) => set(['services'], v)}
    itemTitle={(s) => s.title}
    newItem={() => ({ icon: 'code', title: '', description: '' })}
    addLabel="Add service"
    renderFields={(s, setF) => (
      <>
        <div className="grid sm:grid-cols-[1fr_160px] gap-3">
          <Field label="Service name" value={s.title} onChange={(v) => setF('title', v)} />
          <Select label="Icon" value={s.icon} onChange={(v) => setF('icon', v)} options={['layout', 'smartphone', 'code', 'server', 'database', 'brush', 'wrench', 'users']} />
        </div>
        <Field label="Description" textarea rows={2} value={s.description} onChange={(v) => setF('description', v)} />
      </>
    )}
  />
);

const SkillsTab = ({ draft, set }) => (
  <ListEditor
    items={draft.skillCategories}
    onChange={(v) => set(['skillCategories'], v)}
    itemTitle={(c) => c.title}
    newItem={() => ({ title: '', skills: [] })}
    addLabel="Add skill group"
    renderFields={(c, setF) => (
      <>
        <Field label="Group name" value={c.title} onChange={(v) => setF('title', v)} />
        <TagInput label="Skills" values={c.skills} onChange={(v) => setF('skills', v)} />
      </>
    )}
  />
);

const ExperienceTab = ({ draft, set }) => (
  <ListEditor
    items={draft.experiences}
    onChange={(v) => set(['experiences'], v)}
    itemTitle={(e) => e.title}
    newItem={() => ({ icon: 'briefcase', title: '', date: '', description: '' })}
    addLabel="Add experience"
    renderFields={(e, setF) => (
      <>
        <div className="grid sm:grid-cols-[1fr_180px_150px] gap-3">
          <Field label="Title / organisation" value={e.title} onChange={(v) => setF('title', v)} />
          <Field label="Dates" value={e.date} onChange={(v) => setF('date', v)} placeholder="2025 – Present" />
          <Select label="Icon" value={e.icon} onChange={(v) => setF('icon', v)} options={['rocket', 'briefcase', 'award', 'graduation']} />
        </div>
        <Field label="Description" textarea value={e.description} onChange={(v) => setF('description', v)} />
      </>
    )}
  />
);

const CvTab = ({ draft, onUpload, uploading }) => {
  const fileRef = useRef(null);
  return (
    <div className="space-y-6">
      <div className="bg-ink-800 border border-white/10 rounded-xl p-5 flex flex-wrap items-center gap-4">
        <div className="p-3 bg-brand/15 rounded-xl"><FileText className="text-brand-light" size={28} /></div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white">Current CV</p>
          <a href={draft.profile.cv} target="_blank" rel="noreferrer" className="text-sm text-brand-light underline break-all">{draft.profile.cv}</a>
        </div>
      </div>
      <div className="bg-brand/10 border border-brand/30 rounded-xl p-5 space-y-2">
        <p className="font-semibold text-white">Your online CV updates by itself</p>
        <p className="text-sm text-gray-300">
          The CV page at <a href="#cv" target="_blank" rel="noreferrer" className="text-brand-light underline">yoursite.com/#cv</a> is built from everything you edit here.
          To refresh the downloadable PDF too: open it, click <b>Download PDF</b>, choose “Save as PDF”, then upload that file below.
        </p>
      </div>
      <div className="bg-ink-800 border border-white/10 rounded-xl p-5 space-y-3">
        <p className="font-semibold text-white">Upload a new CV</p>
        <p className="text-sm text-gray-400">Choose a PDF (max 4 MB). It replaces the CV everywhere on the site straight away — no need to press Save.</p>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = '';
          }}
        />
        <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full font-semibold hover:bg-brand-dark disabled:opacity-50">
          <Upload size={18} /> {uploading ? 'Uploading…' : 'Choose PDF'}
        </button>
      </div>
    </div>
  );
};

const tabs = [
  { id: 'profile', label: 'Profile', icon: User, Component: ProfileTab },
  { id: 'projects', label: 'Projects', icon: FolderKanban, Component: ProjectsTab },
  { id: 'services', label: 'Services', icon: Wrench, Component: ServicesTab },
  { id: 'skills', label: 'Skills', icon: Layers, Component: SkillsTab },
  { id: 'experience', label: 'Experience', icon: Briefcase, Component: ExperienceTab },
  { id: 'cv', label: 'CV', icon: FileText, Component: CvTab },
];

/* ---------- Login ---------- */

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { canSave } = await api('login', password);
      onLogin(password, canSave);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-ink">
      <form onSubmit={submit} className="w-full max-w-sm bg-ink-900 border border-white/10 rounded-2xl p-8 space-y-5 shadow-2xl shadow-brand/10">
        <div className="text-center">
          <div className="inline-flex p-3 bg-brand/15 rounded-full mb-3"><Lock className="text-brand-light" size={26} /></div>
          <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Log in to edit your portfolio</p>
        </div>
        <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" className={inputClass} />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={busy || !password} className="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand-dark disabled:opacity-50">
          {busy ? 'Checking…' : 'Log in'}
        </button>
        <a href="#" className="block text-center text-sm text-gray-500 hover:text-gray-300">← Back to site</a>
      </form>
    </div>
  );
};

/* ---------- Main panel ---------- */

const AdminPanel = () => {
  const setSiteContent = useSetContent();
  const [password, setPassword] = useState('');
  const [canSave, setCanSave] = useState(true);
  const [draft, setDraft] = useState(null);
  const [savedJson, setSavedJson] = useState('');
  const [tab, setTab] = useState('profile');
  const [status, setStatus] = useState(null); // { type: 'ok' | 'error', text }
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dirty = useMemo(() => draft && JSON.stringify(draft) !== savedJson, [draft, savedJson]);

  const loadDraft = async () => {
    // Query string skips any CDN cache so the editor always starts from the latest save
    const res = await fetch(`/api/content?t=${Date.now()}`);
    const content = res.ok ? await res.json() : defaultContent;
    setDraft(content);
    setSavedJson(JSON.stringify(content));
  };

  const login = async (pw, saveAllowed) => {
    writePw(pw);
    setPassword(pw);
    setCanSave(saveAllowed);
    await loadDraft();
  };

  // Stay logged in for this browser tab
  useEffect(() => {
    const pw = readPw();
    if (pw) api('login', pw).then(({ canSave }) => login(pw, canSave)).catch(() => writePw(''));
  }, []);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  useEffect(() => {
    if (status?.type !== 'ok') return;
    const t = setTimeout(() => setStatus(null), 3000);
    return () => clearTimeout(t);
  }, [status]);

  if (!password || !draft) return <Login onLogin={login} />;

  const set = (path, value) => setDraft((d) => setIn(d, path, value));

  const save = async () => {
    setSaving(true);
    try {
      const { content } = await api('save', password, { body: JSON.stringify(draft) });
      setDraft(content);
      setSavedJson(JSON.stringify(content));
      setSiteContent(content);
      setStatus({ type: 'ok', text: 'Saved! Your website and AI assistant are updated.' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
    setSaving(false);
  };

  const uploadCv = async (file) => {
    if (file.type !== 'application/pdf') return setStatus({ type: 'error', text: 'Please choose a PDF file.' });
    if (file.size > 4 * 1024 * 1024) return setStatus({ type: 'error', text: 'The PDF must be smaller than 4 MB.' });
    setUploading(true);
    try {
      const { url } = await api('cv', password, { body: file, contentType: 'application/pdf' });
      setDraft((d) => setIn(d, ['profile', 'cv'], url));
      setSavedJson((json) => JSON.stringify(setIn(JSON.parse(json), ['profile', 'cv'], url)));
      setSiteContent((c) => setIn(c, ['profile', 'cv'], url));
      setStatus({ type: 'ok', text: 'New CV uploaded.' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
    setUploading(false);
  };

  const downloadBackup = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json` });
    a.click();
    URL.revokeObjectURL(url);
  };

  const logout = () => {
    if (dirty && !window.confirm('You have unsaved changes. Log out anyway?')) return;
    writePw('');
    setPassword('');
    setDraft(null);
  };

  const { Component } = tabs.find((t) => t.id === tab);

  return (
    <div className="min-h-screen bg-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-ink-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <p className="text-lg font-bold text-white mr-auto">Portfolio Admin<span className="text-brand">.</span></p>
          <a
            href="#"
            onClick={(e) => { if (dirty && !window.confirm('You have unsaved changes. Leave anyway?')) e.preventDefault(); }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-3 py-2"
          >
            <Eye size={16} /> View site
          </a>
          <button onClick={logout} className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-3 py-2"><LogOut size={16} /> Log out</button>
          <button
            onClick={save}
            disabled={!dirty || saving || !canSave}
            className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2 rounded-full font-semibold hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand/30"
          >
            <Save size={16} /> {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
          </button>
        </div>
        {/* Tabs */}
        <nav className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                tab === id ? 'border-brand text-white' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {!canSave && (
          <div className="flex gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            Saving is not set up yet. In the Vercel dashboard, open your project → Storage → create a <b>public Blob store</b> and connect it, then redeploy.
          </div>
        )}
        {status && (
          <div className={`flex items-center gap-3 p-4 rounded-xl border text-sm ${status.type === 'ok' ? 'border-green-500/30 bg-green-500/10 text-green-300' : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>
            {status.type === 'ok' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="flex-1">{status.text}</span>
            <button onClick={() => setStatus(null)} aria-label="Dismiss"><X size={16} /></button>
          </div>
        )}

        <Component draft={draft} set={set} onUpload={uploadCv} uploading={uploading} />

        <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
          <button onClick={downloadBackup} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg border border-white/10">
            <Download size={16} /> Download backup
          </button>
          <button
            onClick={() => window.confirm('Replace everything in the editor with the original built-in content? (Nothing is saved until you press Save.)') && setDraft(defaultContent)}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg border border-white/10"
          >
            <RotateCcw size={16} /> Reset to original content
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
