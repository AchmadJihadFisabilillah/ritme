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
        except Exception:
            self.send_json({'error': 'Format pesan tidak sesuai.'}, 400)
            return

        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key={API_KEY}'
        payload = {
            'systemInstruction': {
                'parts': [{'text': 'Kamu adalah Ritme, asisten perencana pribadi berbasis AI yang ramah, ringkas, dan solutif. Balas setiap pesan pengguna secara langsung dan akrab dalam bahasa Indonesia layaknya percakapan chat. Jika pengguna menyebutkan rencana jadwal atau kegiatan, responlah dengan antusias dan sebutkan rincian kegiatan beserta waktunya.'}]
            },
            'contents': [{'role': 'user' if m['role'] == 'user' else 'model', 'parts': [{'text': m['text']}]} for m in messages],
        }
        try:
            req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = json.loads(resp.read().decode())
                parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
                reply_text = '\n'.join(p.get('text', '') for p in parts if not p.get('thought')).strip()
                last_user = next((m['text'] for m in reversed(messages) if m['role'] == 'user'), '')
                draft = None
                if any(k in last_user.lower() for k in ['jadwal', 'besok', 'lusa', 'jam', 'pukul', 'minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'review', 'meeting', 'rapat']):
                    draft = {'kind': 'agenda', 'title': last_user[:50], 'date': '2026-11-14', 'time': '14:00'}
                self.send_json({'reply': reply_text, 'draft': draft})
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
        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-transcribe:generateContent?key={API_KEY}'
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

