const audioLimit = 512 * 1024;

function json(body, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function isSameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  const url = new URL(request.url);
  if (origin === url.origin) return true;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host;
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  return origin === `${proto}://${host}` || origin === `https://${host}` || origin === `http://${host}`;
}

async function transcribe(request, env) {
  if (!isSameOrigin(request)) return json({ error: 'Asal permintaan tidak sesuai.' }, 403);
  if (!env.GEMINI_API_KEY) return json({ error: 'Dikte Gemini menunggu konfigurasi API key.' }, 503);
  if (request.headers.get('Content-Type') !== 'audio/wav') return json({ error: 'Format audio tidak didukung.' }, 415);

  const reader = request.body?.getReader();
  if (!reader) return json({ error: 'Rekaman kosong.' }, 400);
  let binary = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (binary.length + value.length > audioLimit) {
      await reader.cancel();
      return json({ error: 'Rekaman terlalu panjang.' }, 413);
    }
    for (let i = 0; i < value.length; i += 8192) {
      binary += String.fromCharCode(...value.subarray(i, i + 8192));
    }
  }
  if (binary.length <= 44 || !binary.startsWith('RIFF') || binary.slice(8, 12) !== 'WAVE') {
    return json({ error: 'Rekaman kosong atau tidak valid.' }, 400);
  }

  try {
    const result = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-transcribe:generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      signal: AbortSignal.timeout(25000),
      body: JSON.stringify({
        contents: [{ parts: [
          { text: 'Transcribe the speech verbatim in its original language (usually Indonesian). Return only the words spoken, without timestamps, speaker labels, or commentary. If silent, return an empty response.' },
          { inlineData: { mimeType: 'audio/wav', data: btoa(binary) } },
        ] }],
      }),
    });
    if (result.status === 429) return json({ error: 'Kuota Gemini sedang terbatas. Coba lagi nanti.' }, 429);
    if (!result.ok) return json({ error: 'Gemini gagal memproses audio. Cek API key dan akses model.' }, 502);
    const payload = await result.json();
    const transcript = payload.candidates?.[0]?.content?.parts
      ?.filter((part) => !part.thought && typeof part.text === 'string')
      .map((part) => part.text).join(' ').trim();
    if (!transcript) return json({ error: 'Gemini tidak mendeteksi ucapan. Coba rekam lagi.' }, 422);
    return json({ transcript });
  } catch {
    return json({ error: 'Gemini tidak bisa dijangkau. Coba lagi.' }, 502);
  }
}

async function chat(request, env) {
  if (!isSameOrigin(request)) return json({ error: 'Asal permintaan tidak sesuai.' }, 403);
  if (!env.GEMINI_API_KEY) return json({ error: 'Asisten menunggu konfigurasi API key Gemini.' }, 503);
  const reader = request.body?.getReader();
  if (!reader) return json({ error: 'Pesan kosong.' }, 400);
  const decoder = new TextDecoder();
  let body = '';
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 60000) {
      await reader.cancel();
      return json({ error: 'Pesan terlalu panjang.' }, 413);
    }
    body += decoder.decode(value, { stream: true });
  }

  try {
    const { messages } = JSON.parse(body + decoder.decode());
    if (!Array.isArray(messages) || !messages.length || messages.length > 9 ||
        !messages.every((m) => m && ['user', 'model'].includes(m.role) && typeof m.text === 'string' && m.text.length <= 1500) ||
        messages.at(-1).role !== 'user') return json({ error: 'Format pesan tidak sesuai.' }, 400);
    const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    const result = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      signal: AbortSignal.timeout(25000),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'You are Ritme, an Indonesian personal planner. Today in Jakarta is ' + today + '. Speak naturally in Indonesian. When the user shares something worth remembering or asks to note it, propose one concise note preserving all important details. For a future activity with an explicit or inferable date, propose an agenda with ISO date, title and optional 24-hour time. Ask a clarifying question if an essential date is unclear. For casual conversation, reply normally and set kind to none. Never say you already saved anything. The user confirms each proposed record. For notes keep the original meaning and do not invent facts.' }] },
        contents: messages.map(({role, text}) => ({role, parts:[{text}]})),
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: { type: 'OBJECT', required: ['reply', 'kind', 'title', 'note', 'date', 'time'], properties: {
            reply: {type:'STRING'}, kind: {type:'STRING', enum:['none','note','agenda']},
            title: {type:'STRING'}, note: {type:'STRING'}, date: {type:'STRING'}, time: {type:'STRING'},
          } },
        },
      }),
    });
    if (result.status === 429) return json({ error: 'Kuota Gemini sedang terbatas.' }, 429);
    if (!result.ok) return json({ error: 'Gemini gagal merespons. Cek API key dan akses model.' }, 502);
    const response = await result.json();
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const rawText = parts.filter((part) => !part.thought).map((part) => part.text ?? '').join('').trim();
    const cleanedText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleanedText);
    if (typeof parsed.reply !== 'string' || !parsed.reply.trim()) throw new Error('Empty reply');
    const clean = (value, size) => typeof value === 'string' ? value.trim().slice(0, size) : '';
    const title = clean(parsed.title, 100);
    const note = clean(parsed.note, 1500);
    const date = clean(parsed.date, 10);
    const time = clean(parsed.time, 5);
    const validDate = /^20\d{2}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) &&
      new Date(date).toISOString().slice(0, 10) === date;
    const draft = parsed.kind === 'agenda' && title && validDate
      ? { kind: 'agenda', title, date, time: /^([01]\d|2[0-3]):[0-5]\d$/.test(time) ? time : '' }
      : parsed.kind === 'note' && note ? { kind: 'note', title: title || 'Catatan', note } : null;
    return json({ reply: clean(parsed.reply, 1500), draft });
  } catch {
    return json({ error: 'Gemini belum bisa menjawab. Coba lagi.' }, 502);
  }
}

export function createRitmeHandler(assets) {
  return async (request, env, pathname) => {
    if (pathname === '/api/chat') {
      if (request.method !== 'POST') return json({ error: 'Gunakan POST.' }, 405);
      return chat(request, env);
    }
    if (pathname === '/api/transcribe') {
      if (request.method !== 'POST') return json({ error: 'Gunakan POST.' }, 405);
      return transcribe(request, env);
    }
    if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, { status: 405 });
    if (!Object.hasOwn(assets, pathname)) return new Response('Halaman tidak ditemukan.', { status: 404 });
    const [type, body] = assets[pathname];
    return new Response(request.method === 'HEAD' ? null : body, {
      headers: { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Permissions-Policy': 'microphone=(self)' },
    });
  };
}
