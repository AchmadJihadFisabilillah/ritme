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
  if (origin === `${proto}://${host}` || origin === `https://${host}` || origin === `http://${host}`) return true;
  try {
    const originHost = new URL(origin).hostname;
    const reqHost = (host.split(':')[0] || url.hostname);
    if (originHost === reqHost) return true;
    if (originHost === 'localhost' || originHost === '127.0.0.1') return true;
  } catch {}
  return false;
}

async function transcribe(request, env) {
  if (!isSameOrigin(request)) return json({ error: 'Asal permintaan tidak sesuai.' }, 403);
  if (!env.GEMINI_API_KEY) return json({ error: 'Dikte Gemini menunggu konfigurasi API key.' }, 503);
  if (request.headers.get('Content-Type') !== 'audio/wav') return json({ error: 'Format audio tidak didukung.' }, 415);

  const reader = request.body?.getReader();
  if (!reader) return json({ error: 'Rekaman kosong.' }, 400);
  const chunks = [];
  let totalLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalLength += value.length;
    if (totalLength > audioLimit) {
      await reader.cancel();
      return json({ error: 'Rekaman terlalu panjang.' }, 413);
    }
    chunks.push(value);
  }
  if (totalLength <= 44) return json({ error: 'Rekaman kosong atau tidak valid.' }, 400);

  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  const header = String.fromCharCode(...combined.subarray(0, 12));
  if (!header.startsWith('RIFF') || header.slice(8, 12) !== 'WAVE') {
    return json({ error: 'Rekaman kosong atau tidak valid.' }, 400);
  }

  let base64Audio;
  if (typeof Buffer !== 'undefined') {
    base64Audio = Buffer.from(combined.buffer, combined.byteOffset, combined.byteLength).toString('base64');
  } else {
    let binary = '';
    for (let i = 0; i < combined.length; i += 8192) {
      binary += String.fromCharCode(...combined.subarray(i, i + 8192));
    }
    base64Audio = btoa(binary);
  }

  try {
    const promptText = 'Transkripsikan rekaman audio berikut secara tepat dan lengkap sesuai kata yang diucapkan penutur dalam bahasa Indonesia. Kembalikan HANYA teks ucapan tanpa tanda kutip, tanpa penjelasan, dan tanpa komentar apa pun.';
    const requestBody = JSON.stringify({
      contents: [{ parts: [
        { text: promptText },
        { inlineData: { mimeType: 'audio/wav', data: base64Audio } },
      ] }],
    });

    const transcribeModels = [
      'gemini-flash-lite-latest',
      'gemini-3.5-flash',
      'gemini-3.8-flash',
    ];

    let transcript = '';
    for (const model of transcribeModels) {
      try {
        const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
          signal: AbortSignal.timeout(12000),
          body: requestBody,
        });
        if (result.ok) {
          const payload = await result.json();
          transcript = payload.candidates?.[0]?.content?.parts
            ?.filter((part) => !part.thought && typeof part.text === 'string')
            .map((part) => part.text).join(' ').trim();
          if (transcript) break;
        }
      } catch {}
    }

    if (!transcript) {
      return json({ error: 'Suara tidak terdeteksi. Silakan coba bicara lebih jelas atau ketik pesan langsung.' }, 422);
    }
    return json({ transcript });
  } catch {
    return json({ error: 'Gemini tidak bisa dijangkau. Coba lagi.' }, 502);
  }
}

function detectDraft(userText, replyText, today) {
  const combined = (userText + ' ' + replyText).toLowerCase();
  const isAgenda = /(?:jadwal|besok|lusa|jam|pukul|minggu|senin|selasa|rabu|kamis|jumat|sabtu|hari|review|meeting|kuliah|tugas|rapat|jalan|makan)/.test(userText.toLowerCase());

  if (isAgenda) {
    let date = today;
    if (userText.toLowerCase().includes('besok')) {
      const d = new Date(today + 'T00:00:00Z');
      d.setUTCDate(d.getUTCDate() + 1);
      date = d.toISOString().slice(0, 10);
    } else if (userText.toLowerCase().includes('lusa')) {
      const d = new Date(today + 'T00:00:00Z');
      d.setUTCDate(d.getUTCDate() + 2);
      date = d.toISOString().slice(0, 10);
    }

    let time = '';
    const timeMatch = userText.match(/(?:jam|pukul)\s*(\d{1,2})(?::(\d{2}))?\s*(pagi|siang|sore|malam)?/i);
    if (timeMatch) {
      let h = parseInt(timeMatch[1], 10);
      const m = timeMatch[2] || '00';
      const p = (timeMatch[3] || '').toLowerCase();
      if ((p === 'siang' || p === 'sore' || p === 'malam') && h < 12) h += 12;
      time = `${String(h).padStart(2, '0')}:${m}`;
    }

    let title = userText
      .replace(/(?:tolong|coba|bantu|jadwalkan|buatkan jadwal|jadwal|besok|lusa|hari ini|pukul\s*\d{1,2}(?::\d{2})?|jam\s*\d{1,2}(?::\d{2})?|siang|pagi|sore|malam|wib)/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!title || title.length < 3) title = userText.slice(0, 50);
    title = title.charAt(0).toUpperCase() + title.slice(1);

    return { kind: 'agenda', title, date, time };
  }
  return null;
}

async function chat(request, env) {
  if (!isSameOrigin(request)) return json({ error: 'Asal permintaan tidak sesuai.' }, 403);
  if (!env.GEMINI_API_KEY) return json({ error: 'Asisten menunggu konfigurasi API key Gemini.' }, 503);

  let rawBody = '';
  try {
    rawBody = await request.text();
  } catch {
    return json({ error: 'Gagal membaca pesan.' }, 400);
  }

  try {
    const { messages } = JSON.parse(rawBody);
    if (!Array.isArray(messages) || !messages.length) return json({ error: 'Pesan kosong.' }, 400);

    const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

    const payloadStr = JSON.stringify({
      systemInstruction: {
        parts: [{
          text: 'Kamu adalah Ritme, asisten perencana pribadi berbasis AI yang ramah, ringkas, dan solutif. Hari ini di Jakarta adalah ' + today + '. Balas setiap pesan pengguna secara langsung, akrab, dan jelas dalam bahasa Indonesia layaknya obrolan pesan chat. Jika pengguna menyebutkan rencana jadwal atau kegiatan, responlah dengan antusias dan sebutkan rincian kegiatan beserta waktunya.'
        }]
      },
      contents: messages.map(({ role, text }) => ({
        role: role === 'user' ? 'user' : 'model',
        parts: [{ text: text || '' }]
      }))
    });

    const modelsToTry = [
      'gemini-flash-lite-latest',
      'gemini-3.5-flash',
      'gemini-3.8-flash',
    ];

    let result = null;
    for (const model of modelsToTry) {
      try {
        result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
          signal: AbortSignal.timeout(12000),
          body: payloadStr,
        });
        if (result.ok || result.status === 429) break;
      } catch {}
    }

    if (result.status === 429) return json({ error: 'Kuota Gemini sedang terbatas.' }, 429);
    if (!result.ok) {
      const errData = await result.json().catch(() => ({}));
      return json({ error: errData?.error?.message || 'Gemini gagal merespons. Cek API key.' }, 502);
    }

    const response = await result.json();
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const replyText = parts
      .filter((part) => !part.thought && typeof part.text === 'string')
      .map((part) => part.text)
      .join('\n')
      .trim();

    if (!replyText) throw new Error('Empty reply');

    const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.text || '';
    const draft = detectDraft(lastUserMsg, replyText, today);

    return json({ reply: replyText, draft });
  } catch (err) {
    return json({ error: err.message || 'Gemini belum bisa menjawab. Coba lagi.' }, 502);
  }
}

export function createRitmeHandler(assets) {
  return async (request, env, pathname) => {
    const url = new URL(request.url);
    const resolved = pathname || url.pathname;
    const view = url.searchParams.get('view');

    if (resolved === '/api/chat' || view === 'chat' || url.pathname === '/api/chat') {
      if (request.method !== 'POST') return json({ error: 'Gunakan POST.' }, 405);
      return chat(request, env);
    }
    if (resolved === '/api/transcribe' || view === 'transcribe' || url.pathname === '/api/transcribe') {
      if (request.method !== 'POST') return json({ error: 'Gunakan POST.' }, 405);
      return transcribe(request, env);
    }
    if (!['GET', 'HEAD'].includes(request.method)) return json({ error: 'Metode tidak diizinkan.' }, 405);
    if (!Object.hasOwn(assets, resolved)) return new Response('Halaman tidak ditemukan.', { status: 404 });
    const [type, body] = assets[resolved];
    return new Response(request.method === 'HEAD' ? null : body, {
      headers: { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Permissions-Policy': 'microphone=(self)' },
    });
  };
}
