// Admin password check. Set ADMIN_PASSWORD in .env.local (locally) and in Vercel environment variables.
import crypto from 'node:crypto';

const hash = (value) => crypto.createHash('sha256').update(String(value)).digest();

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export async function isAdmin(request) {
  const header = request.headers.get('authorization') || '';
  const given = header.startsWith('Bearer ') ? header.slice(7) : '';
  const ok = adminConfigured() && given.length > 0 && crypto.timingSafeEqual(hash(given), hash(process.env.ADMIN_PASSWORD));
  if (!ok) await new Promise((r) => setTimeout(r, 800)); // slow down password guessing
  return ok;
}
