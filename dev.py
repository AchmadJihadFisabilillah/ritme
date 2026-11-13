import os
import sys
import json
import base64
import urllib.request
import urllib.error
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

PORT = 3000
BASE_DIR = Path(__file__).resolve().parent
WEB_DIR = BASE_DIR / 'web'

# Baca .env jika ada
env_file = BASE_DIR / '.env'
if env_file.exists():
    with open(env_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ.setdefault(k.strip(), v.strip())

API_KEY = os.environ.get('GEMINI_API_KEY', '')

class RitmeHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_GET(self):
        p = self.path.split('?')[0]
        if p in ('/', '/index.html', '/home'):
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            with open(WEB_DIR / 'index.html', 'rb') as f:
                self.wfile.write(f.read())
        elif p == '/app.js':
            self.send_response(200)
            self.send_header('Content-Type', 'text/javascript; charset=utf-8')
            self.end_headers()
            with open(WEB_DIR / 'app.js', 'rb') as f:
                self.wfile.write(f.read())
        elif p == '/style.css':
            self.send_response(200)
            self.send_header('Content-Type', 'text/css; charset=utf-8')
            self.end_headers()
            with open(WEB_DIR / 'style.css', 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Halaman tidak ditemukan.'}).encode())

    def do_POST(self):
        p = self.path.split('?')[0]
        if p in ('/api/chat', '/api/ritme') and ('chat' in self.path or p == '/api/chat'):
            self.handle_chat()
        elif p in ('/api/transcribe', '/api/ritme') and ('transcribe' in self.path or p == '/api/transcribe'):
            self.handle_transcribe()
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Endpoint tidak ditemukan.'}).encode())

    def handle_chat(self):
        if not API_KEY:
            self.send_json({'error': 'GEMINI_API_KEY belum dikonfigurasi. Buat file .env dan isi GEMINI_API_KEY=...'}, 503)
            return

        content_len = int(self.headers.get('Content-Length', 0))
        raw_body = self.rfile.read(content_len).decode('utf-8')
        try:
            data = json.loads(raw_body)
            messages = data.get('messages', [])
            state = data.get('state', {})
        except Exception:
            self.send_json({'error': 'Format pesan tidak sesuai.'}, 400)
            return

        today = '2026-11-13'
        agenda_brief = [{'id': a.get('id'), 'title': a.get('title'), 'date': a.get('date'), 'time': a.get('time'), 'done': a.get('done')} for a in state.get('agenda', [])]
        habits_brief = [{'id': h.get('id'), 'title': h.get('title'), 'type': h.get('type'), 'doneToday': h.get('daysDone')} for h in state.get('habits', [])]
        bills_brief = [{'id': b.get('id'), 'title': b.get('title'), 'amount': b.get('amount'), 'date': b.get('date'), 'paid': b.get('paid')} for b in state.get('bills', [])]

        system_prompt = f"""Kamu adalah Ritme, asisten AI otonom pribadi yang cerdas, ramah, dan solutif. Hari ini di Jakarta adalah {today}.
Kamu memiliki kendali penuh atas data planner pengguna (menambah, menghapus, mengubah, mencentang jadwal/kebiasaan/tagihan, serta navigasi halaman).

Data pengguna saat ini:
- Jadwal ({len(agenda_brief)}): {json.dumps(agenda_brief)}
- Kebiasaan ({len(habits_brief)}): {json.dumps(habits_brief)}
- Tagihan ({len(bills_brief)}): {json.dumps(bills_brief)}

TUGAS UTAMA:
1. Jika pengguna memberikan perintah (seperti: "hapus jadwal X", "tambahkan jadwal besok jam 2", "tandai kebiasaan Y selesai", "buka halaman tagihan", "tambah tagihan Z", "hapus kebiasaan W"), kamu HARUS mengeksekusi aksinya dalam array "actions".
2. Untuk hapus / ubah / centang, cari ID item yang paling cocok dari data di atas.
3. Berikan balasan percakapan ramah dan jelas dalam bahasa Indonesia di kolom "reply".
4. PENTING: Gunakan HANYA tipe aksi: "add_agenda", "delete_agenda", "update_agenda", "toggle_agenda", "add_habit", "delete_habit", "toggle_habit", "add_bill", "delete_bill", "toggle_bill", "navigate", "clear_samples". Letakkan field langsung di objek aksi (bukan di sub-objek "params").

Format balasan WAJIB berupa JSON:
{{
  "reply": "Pesan balasan ramah dalam bahasa Indonesia",
  "actions": [
    {{
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
    }}
  ]
}}"""

        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key={API_KEY}'
        payload = {
            'systemInstruction': {
                'parts': [{'text': system_prompt}]
            },
            'contents': [{'role': 'user' if m['role'] == 'user' else 'model', 'parts': [{'text': m['text']}]} for m in messages],
            'generationConfig': {
                'responseMimeType': 'application/json'
            }
        }
        try:
            req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                result = json.loads(resp.read().decode())
                parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
                raw_text = '\n'.join(p.get('text', '') for p in parts if not p.get('thought')).strip()
                try:
                    parsed = json.loads(raw_text)
                    reply = parsed.get('reply') or parsed.get('message') or parsed.get('text') or ''
                    actions = parsed.get('actions')
                    if isinstance(actions, list):
                        pass
                    elif isinstance(parsed.get('action'), dict):
                        actions = [parsed.get('action')]
                    elif isinstance(parsed.get('action'), str) or isinstance(parsed.get('type'), str):
                        actions = [parsed]
                    else:
                        actions = []
                    if not reply:
                        reply = 'Perintah sudah berhasil dijalankan.' if actions else 'Pesan diproses.'
                    self.send_json({'reply': reply, 'actions': actions})
                except Exception:
                    self.send_json({'reply': raw_text, 'actions': []})
        except Exception as e:
            self.send_json({'error': f'Gemini gagal merespons: {str(e)}'}, 502)

    def handle_transcribe(self):
        if not API_KEY:
            self.send_json({'error': 'GEMINI_API_KEY belum dikonfigurasi. Buat file .env dan isi GEMINI_API_KEY=...'}, 503)
            return

        content_len = int(self.headers.get('Content-Length', 0))
        audio_bytes = self.rfile.read(content_len)
        if len(audio_bytes) <= 44:
            self.send_json({'error': 'Rekaman kosong atau tidak valid.'}, 400)
            return

        b64_audio = base64.b64encode(audio_bytes).decode('utf-8')
        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key={API_KEY}'
        payload = {
            'contents': [{
                'parts': [
                    {'text': 'Transkripsikan rekaman audio berikut secara tepat kata demi kata dalam bahasa Indonesia. Kembalikan HANYA teks ucapan tanpa komentar tambahan.'},
                    {'inlineData': {'mimeType': 'audio/wav', 'data': b64_audio}}
                ]
            }]
        }
        try:
            req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read().decode())
                parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
                transcript = ' '.join(p.get('text', '').strip() for p in parts if not p.get('thought')).strip()
                if not transcript:
                    self.send_json({'error': 'Gemini tidak mendeteksi ucapan. Coba bicara lebih dekat ke mikrofon.'}, 422)
                else:
                    self.send_json({'transcript': transcript})
        except Exception as e:
            self.send_json({'error': f'Gemini gagal memproses audio: {str(e)}'}, 502)

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', PORT), RitmeHandler)
    print(f'Ritme local server berjalan di: http://localhost:{PORT}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer dihentikan.')

