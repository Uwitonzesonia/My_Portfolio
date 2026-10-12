// POST /api/admin?action=login | save | cv — used by the admin page (yoursite.com/#admin).
// Every action needs the header  Authorization: Bearer <ADMIN_PASSWORD>.
import { isAdmin, adminConfigured } from './_lib/auth.js';
import { loadContent, saveContent, saveFile, canSave } from './_lib/store.js';
import { cleanContent } from './_lib/validate.js';

const MAX_CV_BYTES = 4 * 1024 * 1024; // Vercel functions accept bodies up to ~4.5 MB

export async function POST(request) {
  if (!adminConfigured()) {
    return Response.json({ error: 'Admin is not set up: add ADMIN_PASSWORD to your environment variables.' }, { status: 503 });
  }
  if (!(await isAdmin(request))) {
    return Response.json({ error: 'Wrong password' }, { status: 401 });
  }

  const action = new URL(request.url).searchParams.get('action');

  if (action === 'login') {
    return Response.json({ ok: true, canSave: canSave() });
  }

  if (!canSave()) {
    return Response.json({ error: 'Storage is not set up: connect a public Vercel Blob store to this project in the Vercel dashboard (Storage → Blob), then redeploy.' }, { status: 503 });
  }

  try {
    if (action === 'save') {
      const content = cleanContent(await request.json());
      await saveContent(content);
      return Response.json({ ok: true, content });
    }

    if (action === 'cv') {
      if (!(request.headers.get('content-type') || '').includes('application/pdf')) {
        return Response.json({ error: 'Please upload a PDF file' }, { status: 400 });
      }
      const bytes = Buffer.from(await request.arrayBuffer());
      if (bytes.length === 0 || bytes.length > MAX_CV_BYTES) {
        return Response.json({ error: 'The PDF must be smaller than 4 MB' }, { status: 400 });
      }
      const url = await saveFile(bytes, { name: 'Uwitonze_Sonia_CV.pdf', contentType: 'application/pdf' });
      // Point the saved content at the new CV straight away
      const content = await loadContent();
      content.profile = { ...content.profile, cv: url };
      await saveContent(cleanContent(content));
      return Response.json({ ok: true, url });
    }
  } catch (error) {
    console.error(`Admin action "${action}" failed:`, error);
    return Response.json({ error: 'Saving failed. Please try again.' }, { status: 500 });
  }

  return Response.json({ error: 'Unknown action' }, { status: 400 });
}
