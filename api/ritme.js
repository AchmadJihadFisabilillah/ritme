import { Buffer } from 'node:buffer';
import { createHash, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createRitmeHandler } from '../worker/index.js';

const htmlAsset = ['text/html; charset=utf-8', await readFile(new URL('../web/index.html', import.meta.url), 'utf8')];
const assets = {
  '/': htmlAsset,
  '/index.html': htmlAsset,
  '/app.js': ['text/javascript; charset=utf-8', await readFile(new URL('../web/app.js', import.meta.url), 'utf8')],
  '/style.css': ['text/css; charset=utf-8', await readFile(new URL('../web/style.css', import.meta.url), 'utf8')],
};
const viewPaths = new Map([
  ['home', '/'], ['index', '/'], ['script', '/app.js'], ['style', '/style.css'],
  ['chat', '/api/chat'], ['transcribe', '/api/transcribe'],
]);
const handleRitme = createRitmeHandler(assets);
const digest = (value) => createHash('sha256').update(value).digest();
const privateHeaders = { 'Cache-Control': 'private, no-store', 'Vary': 'Authorization' };

function authorized(request, password) {
  const match = request.headers.get('Authorization')?.match(/^Basic ([A-Za-z0-9+/]+={0,2})$/i);
  if (!match || match[1].length > 4096) return false;
  const credentials = Buffer.from(match[1], 'base64');
  return timingSafeEqual(digest(credentials), digest('ritme:' + password));
}

export default {
  async fetch(request) {
    const password = process.env.RITME_PASSWORD;
    if (!password || password.length < 16) {
      return new Response('Ritme menunggu RITME_PASSWORD dengan minimal 16 karakter di Vercel.', {
        status: 503, headers: privateHeaders,
      });
    }
    if (!authorized(request, password)) {
      return new Response('Masuk dengan username ritme dan password Ritme.', {
        status: 401,
        headers: { ...privateHeaders, 'WWW-Authenticate': 'Basic realm="Ritme", charset="UTF-8"' },
      });
    }
    try {
      const url = new URL(request.url);
      const pathname = url.pathname === '/api/ritme'
        ? viewPaths.get(url.searchParams.get('view')) ?? '/api/ritme'
        : url.pathname;
      const result = await handleRitme(request, process.env, pathname);
      const headers = new Headers(result.headers);
      Object.entries(privateHeaders).forEach(([name, value]) => headers.set(name, value));
      return new Response(result.body, { status: result.status, headers });
    } catch {
      return new Response('Terjadi kesalahan internal pada server.', {
        status: 500, headers: privateHeaders,
      });
    }
  },
};
