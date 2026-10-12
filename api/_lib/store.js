// Where the editable portfolio content lives.
// - On Vercel: Vercel Blob (connect a *public* Blob store to the project; it sets BLOB_READ_WRITE_TOKEN).
// - Locally (npm run dev) without Blob: a content.local.json file in the project folder.
// Files in api/_lib are helpers, not API routes (Vercel ignores names starting with "_").
import { put, get } from '@vercel/blob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { defaultContent } from '../../src/data/profile.js';

const CONTENT_PATH = 'content.json';
const LOCAL_FILE = path.join(process.cwd(), 'content.local.json');
const LOCAL_UPLOADS = path.join(process.cwd(), 'public', 'uploads');

const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

// Saving is possible with Blob, or locally on disk (not on Vercel, whose disk is read-only)
export const canSave = () => hasBlob() || !process.env.VERCEL;

// Fill in anything missing from saved content with defaults (e.g. a field added in a later version)
const withDefaults = (saved) => ({
  ...defaultContent,
  ...saved,
  profile: { ...defaultContent.profile, ...(saved?.profile || {}) },
});

export async function loadContent() {
  try {
    if (hasBlob()) {
      const result = await get(CONTENT_PATH, { access: 'public', useCache: false });
      if (result?.statusCode === 200) return withDefaults(JSON.parse(await new Response(result.stream).text()));
    } else if (!process.env.VERCEL) {
      return withDefaults(JSON.parse(await fs.readFile(LOCAL_FILE, 'utf8')));
    }
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('loadContent failed, using defaults:', error);
  }
  return defaultContent;
}

export async function saveContent(content) {
  const json = JSON.stringify(content, null, 2);
  if (hasBlob()) {
    await put(CONTENT_PATH, json, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60,
    });
  } else {
    await fs.writeFile(LOCAL_FILE, json);
  }
}

// Stores an uploaded file and returns its public URL
export async function saveFile(bytes, { name, contentType }) {
  if (hasBlob()) {
    // Random suffix gives every upload a fresh URL, so visitors never get a cached old copy
    const blob = await put(`uploads/${name}`, bytes, { access: 'public', addRandomSuffix: true, contentType });
    return blob.url;
  }
  await fs.mkdir(LOCAL_UPLOADS, { recursive: true });
  await fs.writeFile(path.join(LOCAL_UPLOADS, name), bytes);
  return `/uploads/${name}?v=${Date.now()}`;
}
