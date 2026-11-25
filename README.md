# KETUK · Web Demo Prototype

Prototype web interaktif aplikasi **KETUK — "Sekali Ketuk, Harga Pasti."**, dibangun dari desain Hi-Fi Figma untuk demo grand final.
React + Vite + TypeScript, tanpa backend: semua simulasi (timer, tawaran masuk, notifikasi lintas peran) berjalan di browser.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/ (siap untuk Vercel / Netlify)
```

Deploy ke Vercel: import repo → framework **Vite** terdeteksi otomatis → Deploy. Tidak perlu konfigurasi tambahan.

## Tampilan
- **Laptop / proyektor:** HP 390×844 di tengah layar, dengan pengalih peran **Warga | Pengepul** di kanan atas.
- **Dibuka di HP:** otomatis layar penuh seperti aplikasi asli.

## Shortcut presenter (berlaku kapan saja)

| Tombol | Fungsi |
|---|---|
| `D` | Buka/tutup **Panel Demo** (tidak terlihat di layar HP) |
| `Tab` | Ganti peran Warga ⇄ Pengepul |
| `1`–`7` | Lompat ke adegan: Beranda · Sesi baru · Radar Pengepul · Tawaran Pak Slamet masuk · Serah terima · Koreksi · Selesai |
| `O` | Paksa tawaran Pak Slamet Rp38.000 masuk (cadangan) |
| `F` | Timer Sesi Ketuk dipercepat 30× / normal |
| `Shift + R` | Reset demo ke awal |

## Naskah demo 2 menit (saran)

1. **0:00 · Warga** — Splash → Beranda. Ketuk **Foto Barang** → tombol shutter (AI mengenali "Kipas angin | Elektronik") → **Lanjut**.
   *(Tombol galeri kiri bawah bisa memakai foto asli; di HP langsung membuka kamera.)*
2. **0:20** — **Patokan Harga AI Rp25.000–Rp40.000** → **Mulai Sesi Ketuk 60 Menit**. Timer berjalan, tawaran pengepul masuk satu per satu.
3. **0:40 · `Tab` → Pengepul** — notifikasi "Barang baru di radar". Ketuk kartu kipas → **Kirim Tawaran Rp38.000**.
4. **0:55 · `Tab` → Warga** — tawaran Pak Slamet muncul di urutan teratas. **Ketuk Palu** → konfirmasi → animasi *Tok!* **Harga terkunci**.
5. **1:15** — **Lihat Status Penjemputan**: truk bergerak di peta → **Mulai Serah Terima**.
6. **1:30 · Koreksi berbukti (opsional)** — `Tab` → Pengepul: **Mulai Penjemputan** → **Ajukan Koreksi Berbukti** → kirim. `Tab` → Warga: tinjau bukti foto → **Terima Koreksi** (atau tolak tanpa denda).
   *Jalur singkat:* di Serah Terima langsung **Konfirmasi Terima Rp38.000**.
7. **1:50** — **Selesai & Ulasan**: dampak (3,2 kg tidak ke TPA) + jalur barang. Selesai.

Kalau ada yang macet di panggung: tekan angka `1`–`7` untuk langsung ke adegan berikutnya.

## Struktur
```
src/
  store.tsx        state demo (timer, tawaran, koreksi, notifikasi) + preset adegan
  ui.tsx           komponen dari Design System Figma (StatusBar, AppBar, CountdownRing, OfferCard, …)
  index.css        token desain (warna, tipografi, radius, elevation)
  App.tsx          bingkai HP, transisi, notifikasi lintas peran, shortcut
  DemoPanel.tsx    panel presenter
  screens/warga    11 layar Warga
  screens/pengepul 7 layar Pengepul
public/a/          aset yang diekspor dari Figma (ikon, ilustrasi 3D, foto)
scripts/           alat bantu: unduh aset, screenshot, uji end-to-end (Playwright)
```
