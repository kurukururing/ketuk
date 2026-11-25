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

## Alur (mengikuti koneksi prototype di Figma)

**Warga:** Splash (animasi 8 frame) → Onboarding ×3 → Masuk → Verifikasi OTP → Pilih Peran → Alamat Jemput → Beranda → Foto Barang → Detail & Patokan Harga AI → Sesi Ketuk → Detail Tawaran Pengepul → Konfirmasi Ketuk Palu → Ketuk Palu Berhasil → Status Penjemputan → Chat dengan Pengepul → Serah Terima → Selesai & Ulasan.
Cabang koreksi: Chat/Serah Terima → Koreksi Berbukti → Terima (Selesai) atau Tolak (Transaksi Dibatalkan).

**Pengepul:** Radar Barang → Ajukan Tawaran → Tawaran Terkirim → Lihat Tawaranku → Jadwal Jemput Hari Ini → Navigasi → Saya Sudah Tiba → Cocokkan Barang → Ajukan Koreksi Berbukti → Menunggu Konfirmasi → Chat dengan Warga → Koreksi Disetujui → Pembayaran Selesai → Jadwal Jemput.

## Naskah demo 2 menit (saran)

1. **0:00 · Warga** — splash beranimasi (ketuk layar untuk melewati) → onboarding → Masuk → OTP terisi otomatis → Pilih Peran → Alamat → Beranda.
   *Untuk demo singkat, tekan `1` agar langsung ke Beranda.*
2. **0:15** — **Foto Barang** → shutter (AI mengenali kipas) → **Patokan Harga AI** → **Mulai Sesi Ketuk 60 Menit**. Tawaran masuk satu per satu.
3. **0:35 · `Tab` → Pengepul** — Radar Barang → kipas → **Kirim Tawaran Rp38.000**.
4. **0:50 · `Tab` → Warga** — ketuk kartu Pak Slamet → **Detail Tawaran** → **Ketuk Palu** → konfirmasi → *Tok!* harga terkunci.
5. **1:10** — **Lihat Status Penjemputan** → ikon chat → **Chat dengan Pengepul** → **Barang Sesuai →** → Serah Terima → **Konfirmasi Terima** → Selesai & Ulasan.
6. **Cabang koreksi (opsional)** — `Tab` → Pengepul: Lihat Tawaranku → Jadwal → Navigasi → **Saya Sudah Tiba** → **Ajukan Koreksi Berbukti** → kirim. `Tab` → Warga: chat menampilkan **Pengajuan Koreksi Harga →** → Koreksi Berbukti → **Terima** (atau **Tolak** → Transaksi Dibatalkan). Pengepul: **Buka chat dengan warga** → **Lanjut ke pembayaran** → Koreksi Disetujui → bayar.

Kalau ada yang macet di panggung: tekan angka `1`–`7` untuk langsung ke adegan berikutnya, atau `Shift+R` untuk kembali ke splash.

## Struktur
```
src/
  store.tsx        state demo (timer, tawaran, koreksi, notifikasi) + preset adegan
  ui.tsx           komponen dari Design System Figma (StatusBar, AppBar, CountdownRing, OfferCard, …)
  index.css        token desain (warna, tipografi, radius, elevation)
  App.tsx          bingkai HP, transisi, notifikasi lintas peran, shortcut
  DemoPanel.tsx    panel presenter
  screens/warga    20 layar Warga (termasuk splash, onboarding, autentikasi)
  screens/pengepul 11 layar Pengepul
  screens/Chat.tsx layout chat bersama
public/a/          aset yang diekspor dari Figma (ikon, ilustrasi 3D, foto)
scripts/           alat bantu: unduh aset, screenshot, uji end-to-end (Playwright)
```
