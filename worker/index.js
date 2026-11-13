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
  if (!request.headers.get('Content-Type')?.startsWith('audio/wav')) return json({ error: 'Format audio tidak didukung.' }, 415);

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
    const { messages, state } = JSON.parse(rawBody);
    if (!Array.isArray(messages) || !messages.length) return json({ error: 'Pesan kosong.' }, 400);

    const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

    const agendaBrief = (state?.agenda || []).map((a) => ({ id: a.id, title: a.title, date: a.date, time: a.time, done: a.done }));
    const habitsBrief = (state?.habits || []).map((h) => ({ id: h.id, title: h.title, type: h.type, doneToday: h.daysDone }));
    const billsBrief = (state?.bills || []).map((b) => ({ id: b.id, title: b.title, amount: b.amount, date: b.date, paid: b.paid }));

    const systemPrompt = `Kamu adalah Ritme, asisten AI otonom pribadi yang cerdas, ramah, dan solutif. Hari ini di Jakarta adalah ${today}.
Kamu memiliki kendali penuh atas data planner pengguna (menambah, menghapus, mengubah, mencentang jadwal/kebiasaan/tagihan, serta navigasi halaman).

Data pengguna saat ini:
- Jadwal (${agendaBrief.length}): ${JSON.stringify(agendaBrief)}
- Kebiasaan (${habitsBrief.length}): ${JSON.stringify(habitsBrief)}
- Tagihan (${billsBrief.length}): ${JSON.stringify(billsBrief)}

TUGAS UTAMA:
1. Jika pengguna memberikan perintah (seperti: "hapus jadwal X", "tambahkan jadwal besok jam 2", "tandai kebiasaan Y selesai", "buka halaman tagihan", "tambah tagihan Z", "hapus kebiasaan W"), kamu HARUS mengeksekusi aksinya dalam array "actions".
2. Untuk hapus / ubah / centang, cari ID item yang paling cocok dari data di atas.
3. Berikan balasan percakapan ramah dan jelas dalam bahasa Indonesia di kolom "reply".
4. PENTING: Gunakan HANYA tipe aksi: "add_agenda", "delete_agenda", "update_agenda", "toggle_agenda", "add_habit", "delete_habit", "toggle_habit", "add_bill", "delete_bill", "toggle_bill", "navigate", "clear_samples". Letakkan field langsung di objek aksi (bukan di sub-objek "params").

Format balasan WAJIB berupa JSON:
{
  "reply": "Pesan balasan ramah dalam bahasa Indonesia yang menjelaskan apa yang sudah kamu lakukan atau menjawab pengguna",
  "actions": [
    {
      "type": "add_agenda" | "delete_agenda" | "update_agenda" | "toggle_agenda" | "add_habit" | "delete_habit" | "toggle_habit" | "add_bill" | "delete_bill" | "toggle_bill" | "navigate" | "clear_samples",
      "id": "id-item-yang-cocok",
      "title": "nama item",
      "date": "YYYY-MM-DD",
      "time": "HH:MM",
      "amount": 100000,
      "category": "pribadi"|"kuliah"|"bisnis"|"kesehatan"|"belajar"|"aktivitas"|"internet"|"listrik",
      "done": true|false,
      "paid": true|false,
      "route": "ringkasan"|"jadwal"|"kebiasaan"|"tagihan"
    }
  ]
}`;

    const payloadStr = JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: messages.map(({ role, text }) => ({
        role: role === 'user' ? 'user' : 'model',
        parts: [{ text: text || '' }]
      })),
      generationConfig: {
        responseMimeType: 'application/json'
      }
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
    const rawText = parts
      .filter((part) => !part.thought && typeof part.text === 'string')
      .map((part) => part.text)
      .join('\n')
      .trim();

    if (!rawText) throw new Error('Empty reply');

    let reply = 'Pesan telah diproses.';
    let actions = [];
    try {
      const parsed = JSON.parse(rawText);
      reply = parsed.reply || parsed.message || parsed.text || '';
      if (Array.isArray(parsed.actions)) {
        actions = parsed.actions;
      } else if (parsed.action && typeof parsed.action === 'object') {
        actions = [parsed.action];
      } else if (typeof parsed.action === 'string' || typeof parsed.type === 'string') {
        actions = [parsed];
      }
      if (!reply) {
        reply = actions.length ? 'Perintah sudah berhasil dijalankan.' : 'Pesan telah diproses.';
      }
    } catch {
      reply = rawText || reply;
    }

    return json({ reply, actions });
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
