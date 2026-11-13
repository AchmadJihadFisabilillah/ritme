# Deploy Ritme ke Vercel

Paket ini berisi Ritme dengan dashboard gelap dan backend Asisten Gemini. Aplikasi ini memakai login browser dengan username `ritme` dan password yang kamu atur sendiri.

## 1. Siapkan repository

Ekstrak ZIP, lalu unggah isi folder `Ritme_Vercel` ke root repository GitHub. Pastikan `vercel.json`, `package.json`, serta folder `api`, `web`, dan `worker` ikut masuk. Folder `public` hanya berisi `.gitkeep` dan juga perlu ikut masuk.

## 2. Impor ke Vercel

1. Pilih **Add New → Project** di Vercel dan impor repository GitHub tadi.
2. Pakai **Framework Preset → Other**. Kalau folder `Ritme_Vercel` masih berada di dalam repository, pilih folder itu sebagai **Root Directory**.
3. Tambahkan dua variabel di **Environment Variables** untuk **Production**. Tandai keduanya sebagai **Sensitive** jika opsinya tersedia.

| Nama | Isi |
| --- | --- |
| `GEMINI_API_KEY` | API key dari [Google AI Studio](https://aistudio.google.com/apikey). |
| `RITME_PASSWORD` | Password unik minimal 16 karakter untuk membuka Ritme. |

4. Klik **Deploy**. Kalau variabel ditambahkan sesudah deploy, buka **Settings → Environment Variables**, simpan nilainya, lalu **Redeploy**. [Panduan variabel Vercel](https://vercel.com/docs/environment-variables/managing-environment-variables)

Simpan key dan password di pengaturan server. Hindari memasukkannya ke kode, GitHub, atau chat.

## 3. Tes dari domain Vercel

1. Buka domain Vercel. Saat diminta login, isi username `ritme` dan password dari `RITME_PASSWORD`.
2. Buka **Asisten Gemini**, lalu ketik **Besok jam 2 siang jadwalkan review pesanan JStore**. Periksa draf dan tekan **Simpan**.
3. Klik **Rekam suara**, izinkan mikrofon, bicara, lalu klik **Stop dan kirim**.
4. Jika Gemini belum merespons, cek bahwa key dipasang di **Production**, deployment sudah diulang, dan project Gemini punya akses ke model yang dipakai.

Ritme menyimpan jadwal, kebiasaan, dan catatan di browser. Domain baru memakai penyimpanan browser sendiri. Riwayat dari domain lama tidak ikut pindah secara otomatis.
