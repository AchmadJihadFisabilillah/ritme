import { createRitmeHandler } from '../worker/index.js';

const handler = createRitmeHandler({});

export default {
  async fetch(request) {
    try {
      return await handler(request, process.env, '/api/transcribe');
    } catch {
      return Response.json({ error: 'Terjadi kesalahan saat memproses audio di server.' }, {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
  },
};

export async function POST(request) {
  try {
    return await handler(request, process.env, '/api/transcribe');
  } catch {
    return Response.json({ error: 'Terjadi kesalahan saat memproses audio di server.' }, {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}

