import { readFile } from 'node:fs/promises';
import { createRitmeHandler } from '../worker/index.js';

const htmlAsset = [
  'text/html; charset=utf-8',
  await readFile(new URL('../web/index.html', import.meta.url), 'utf8'),
];

const assets = {
  '/': htmlAsset,
  '/index.html': htmlAsset,
  '/app.js': [
    'text/javascript; charset=utf-8',
    await readFile(new URL('../web/app.js', import.meta.url), 'utf8'),
  ],
  '/style.css': [
    'text/css; charset=utf-8',
    await readFile(new URL('../web/style.css', import.meta.url), 'utf8'),
  ],
};

const viewPaths = new Map([
  ['home', '/'],
  ['index', '/'],
  ['script', '/app.js'],
  ['style', '/style.css'],
  ['chat', '/api/chat'],
  ['transcribe', '/api/transcribe'],
]);

const handleRitme = createRitmeHandler(assets);

export default {
  async fetch(request) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname === '/api/ritme'
        ? viewPaths.get(url.searchParams.get('view')) ?? '/api/ritme'
        : url.pathname;

      return await handleRitme(request, process.env, pathname);
    } catch {
      return new Response('Terjadi kesalahan internal pada server.', {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
  },
};