import { createRitmeHandler } from '../worker/index.js';

const handler = createRitmeHandler({});

export default {
  async fetch(request) {
    try {
      return await handler(request, process.env, '/api/chat');
    } catch {
      return Response.json({ error: 'Terjadi kesalahan saat memproses chat di server.' }, {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
  },
};

export async function POST(request) {
  try {
    return await handler(request, process.env, '/api/chat');
  } catch {
    return Response.json({ error: 'Terjadi kesalahan saat memproses chat di server.' }, {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}

