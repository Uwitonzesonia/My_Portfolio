# Sonia Uwitonze — Portfolio

React + Vite + Tailwind + framer-motion portfolio with:
- an **AI assistant** that answers visitors' questions about my CV, projects, skills and contact details
- an **admin page** to edit everything without touching code

## ✏️ Editing my portfolio (no code)

1. Go to **`yoursite.com/#admin`** (locally: `http://localhost:5173/#admin`).
2. Log in with the admin password.
3. Edit any tab — **Profile, Projects, Services, Skills, Experience, CV** — add, delete or reorder items.
4. Press **Save changes**. The website and the AI assistant update straight away.

Tips:
- **Upload a new CV** in the CV tab — it replaces the old one immediately.
- **Download backup** saves all your content as a file, just in case.
- Technologies / languages / job titles: type one, press **Enter** to add it, click **×** to remove.

## One-time setup

### Locally

```bash
npm install
cp .env.example .env.local   # then fill in ADMIN_PASSWORD (and GEMINI_API_KEY for the AI)
npm run dev
```

Locally, admin changes are saved to `content.local.json` and uploads to `public/uploads/` (both git-ignored).

### On Vercel

1. Push this repo to GitHub and import it at vercel.com (framework: Vite).
2. **Storage → Create → Blob**, choose **Public** access, and connect it to this project. (This adds `BLOB_READ_WRITE_TOKEN` automatically.)
3. **Settings → Environment Variables**, add:
   - `ADMIN_PASSWORD` — a long password only you know
   - `GEMINI_API_KEY` — for the AI assistant (free key from aistudio.google.com/apikey)
4. Redeploy.

Without `GEMINI_API_KEY` the assistant still works, using built-in answers from your content.

## How it works (for developers)

| Part | File |
| --- | --- |
| Default content (used until you save from the admin page) | `src/data/profile.js` |
| Loads saved content for every section | `src/data/ContentContext.jsx` → `GET /api/content` |
| Admin page (`#admin`) | `src/admin/AdminPanel.jsx` → `POST /api/admin?action=login\|save\|cv` |
| Storage (Vercel Blob, or a local file in dev) | `api/_lib/store.js` |
| Password check / input cleaning | `api/_lib/auth.js`, `api/_lib/validate.js` |
| AI assistant | `api/chat.js` (Google Gemini, grounded in the saved content), `src/components/ChatAssistant.jsx` |
| Offline AI fallback | `src/data/localAnswers.js` |
