// GET /api/content — the current portfolio content (what was saved in the admin page, or the defaults).
import { loadContent } from './_lib/store.js';

export async function GET() {
  const content = await loadContent();
  return Response.json(content, {
    // Vercel's CDN may serve this for a few seconds, then refreshes in the background
    headers: { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=60' },
  });
}
