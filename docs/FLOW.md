# Alur Prototype KETUK (dibaca dari Figma)

Sumber: semua *prototype reactions* di halaman **High Fidelity KETUK** (pembaruan 27 Nov 2026:
209 frame, 1.115 koneksi) dan *flow starting points*. Peta koneksi mentah: `docs/figma/edges-warga.txt`
dan `docs/figma/edges-pengepul.txt`. Kode layar = nama frame di Figma. Kolom **route** = nama layar di web.

Flow starting points di Figma: Alur Utama (Splash Screen_1), Warga | Beranda, Warga Sesi,
Warga Status, Warga Riwayat, Warga Profil, Alur Pengepul (Radar), Pengepul | Daftar Mitra,
Pengepul Jadwal, Pengepul Profil, ditambah alur baru: Lepas Gratis (Skenario 1 & 2), E-waste Aman,
Koreksi E-waste, Keluarga | Kerabat membantu (K4), Flow 2 (K7), Pengepul | Lepas Gratis (F1),
E-waste Aman (G1), Transfer kedaluwarsa (D1f), Saldo KETUK (E2). Semua titik mulai ini ada di
Panel Demo → **Alur lain (Figma)**.

---

## 1. Warga

### 1.1 Onboarding & autentikasi
| Dari | Pemicu | Ke |
|---|---|---|
| Splash Screen_1 → _8 | otomatis (smart animate 0,1–0,4 dtk) | A1 Splash Screen (55:3609) |
| A1 Splash (55:3609) | 0,8 dtk | A1 Splash loader (125:6603) |
| A1 Splash loader | 1,6 dtk | A2 Onboarding `onboarding` |
| A2 Onboarding 1 → 2 → 3 | Lanjut | slide berikut |
| A2 Onboarding (semua) | Lewati / Mulai Sekarang | A3 Masuk `masuk` |
| A3 Masuk | Kirim Kode OTP | A4 Verifikasi OTP `otp` |
| A3 Masuk | Lanjut dengan Google | A5 Pilih Peran `peran` |
| A3 Masuk | Daftar | A4 Daftar `daftar` |
| A4 Daftar | Daftar & Kirim OTP | A4 Verifikasi OTP |
| A4 Daftar | Masuk | A3 Masuk |
| A4 Verifikasi OTP | 0,8 dtk → kode terisi; Verifikasi | A5 Pilih Peran |
| A5 Pilih Peran | Lanjut sebagai Warga | A6 Alamat Jemput `alamat` |
| A5 Pilih Peran | Mode Dibantu Keluarga | G1 Mode Dibantu Keluarga |
| A6 Alamat Jemput | Simpan Alamat | B1 Beranda |

### 1.2 Beranda & navigasi utama
| Dari | Pemicu | Ke |
|---|---|---|
| B1 Beranda | Foto Barang / Pasang / Harga AI / kartu harga | B2 Ambil Foto `foto` (skenario kipas) |
| B1 Beranda | tombol **+** (Pasang) di nav | C1 Ambil Foto Blur (skenario dispenser) |
| B1 Beranda | Sesi berjalan (kartu) | B2 Sesi Ketuk |
| B1 Beranda | Sesi Ketuk (ikon) / Lihat semua / Nav Sesi | D1 Sesi Saya `sesi-saya` |
| B1 Beranda | Pindahan | D4 Mode Pindahan `pindahan` |
| B1 Beranda | E-waste | B2 Jalur E-waste Aman `ewaste` |
| B1 Beranda | Lepas Gratis | D3 Lepas Gratis + Jemput `lepas` |
| B1 Beranda | Dompet | G1 Dompet & Pembayaran `dompet` |
| B1 Beranda | Bantuan | G1 Pusat Bantuan `bantuan` |
| B1 Beranda | Lonceng | B1 Notifikasi `notifikasi` |
| B1 Beranda | Avatar / Nav Akun | G1 Akun Warga `akun` |
| B1 Beranda | Nav Riwayat | F1 Riwayat Transaksi `riwayat` |
| B1 Notifikasi | tab Semua / Sesi / Transaksi | tab terkait |
| B1 Notifikasi | Tawaran baru / Sesi tersisa 15 menit | B2 Sesi Ketuk |
| B1 Notifikasi | Harga terkunci | E1 Harga Terkunci |
| B1 Notifikasi | Koreksi diajukan | E1 Koreksi Berbukti |
| B1 Notifikasi | Rp45.000 diterima | F1 Bukti Transaksi |
| B1 Notifikasi | Dimas memasang barang | G1 Mode Dibantu Keluarga |

### 1.3 Pasang barang — skenario **kipas** (B2/E1)
B2 Ambil Foto → (Shutter/Galeri/Lanjut) → B2 Detail & Patokan Harga AI → Mulai Sesi →
B2 Sesi Ketuk → kartu Pak Slamet → B2 Detail Tawaran Pengepul → Ketuk palu →
B2 Konfirmasi Ketuk Palu (sheet) → B2 Ketuk Palu Berhasil → Lihat status →
E1 Harga Terkunci & Status → Chat/Telepon → E1 Chat dengan Pengepul →
"Pengajuan Koreksi Harga" → E1 Koreksi Berbukti → Terima → E1 Selesai & Ulasan (dengan koreksi)
/ Tolak → E1 Transaksi Dibatalkan.
E1 Serah Terima → Konfirmasi → E1 Selesai & Ulasan; "Ada koreksi" → E1 Koreksi Berbukti.
Selesai → Kirim ulasan → B1 Beranda. Dibatalkan → Pasang ulang → B2 Detail / Beranda.
Detail: Edit → B2 Ubah Kategori → Simpan → Detail; Ada baterai → B2 Jalur E-waste Aman → Lanjut → Detail.

### 1.4 Pasang barang — skenario **dispenser** (C1/D1, foto blur & radius diperluas)
C1 Ambil Foto Blur → Shutter/Lanjut → C1 Ubah Kategori → Simpan → C1 Foto Blur (Detail dengan
peringatan foto blur) → Ambil ulang → C1 Ambil Foto → Shutter → C1 Ubah Kategori → Simpan →
C1 Detail & Patokan Harga AI → Mulai Sesi → D1 Tidak Ada Pengepul → Perluas radius →
D1 Perluasan Radius → 3 dtk → D1 Sesi Ketuk → Pak Slamet → D1 Detail Tawaran → Ketuk palu →
D1 Konfirmasi → D1 Ketuk Palu Berhasil → D1 Harga Terkunci → Chat → D1 Chat →
"Barang Sesuai" → D1 Serah Terima → Konfirmasi → D1 Selesai & Ulasan → Beranda.
C1 Ambil Foto Blur → Galeri → C1 Detail. C1 Gambar Tidak Dikenali (varian Detail).

### 1.5 Mode Pindahan — skenario **borongan** (D4/D5)
D4 Mode Pindahan → Tambah barang (→ Ambil Foto) / Mulai sesi pindahan → D5 Sesi Borongan →
pilih UD Berkah → D5 Detail Tawaran → Ketuk palu → D5 Ketuk Palu Berhasil → Lihat status →
D5 Harga Terkunci → Chat → D5 Chat → Konfirmasi → D5 Koreksi Berbukti → Terima → D5 Selesai
/ Tolak → D5 Transaksi Dibatalkan. D5 Serah Terima → D5 Selesai.

### 1.6 Sesi, riwayat & akun
| Dari | Pemicu | Ke |
|---|---|---|
| D1 Sesi Saya | Kipas angin berdiri | B2 Sesi Ketuk |
| D1 Sesi Saya | Kardus bekas 12 kg | D2 Sesi Tanpa Tawaran `sesi-kosong` |
| D1 Sesi Saya | Dispenser / tab Terkunci | E1 Harga Terkunci |
| D1 Sesi Saya | 3 barang · Mode Pindahan | D5 Sesi Borongan |
| D1 Sesi Saya | tab Selesai | F1 Riwayat Transaksi |
| D2 Sesi Tanpa Tawaran | Perluas | D1 Sesi Saya |
| D2 Sesi Tanpa Tawaran | Lepas Gratis + Jemput | D3 Lepas Gratis |
| D2 Sesi Tanpa Tawaran | Ubah foto & detail | B2 Detail |
| D3 Lepas Gratis | Lepas gratis | E1 Harga Terkunci |
| F1 Riwayat | kipas / kardus / rak | F1 Bukti Transaksi `bukti` |
| F1 Riwayat | Kasur busa | E1 Transaksi Dibatalkan |
| F1 Bukti Transaksi | Unduh | F1 Riwayat; Lapor/Bantuan → Pusat Bantuan |
| G1 Akun Warga | Dompet / Pusat Bantuan / Mode Dibantu / Notifikasi / Alamat / Ubah profil | layar terkait |
| G1 Akun Warga | Ganti ke Pengepul | Splash Pengepul (alur 2.1) |
| G1 Akun Warga | Keluar | dialog → Batal / Keluar → A3 Masuk |
| G1 Dompet | Tarik / E-wallet / Rekening / Tunai | G1 Tarik Saldo `tarik` |
| G1 Dompet | Riwayat / item | F1 Riwayat / F1 Bukti |
| G1 Tarik Saldo | Tarik | G1 Berhasil Tarik `tarik-ok` → Akun |
| G1 Mode Dibantu | Simpan | G1 Akun Warga |
| G1 Pusat Bantuan | Bagaimana Mode Dibantu | G1 Mode Dibantu |

---

## 2. Pengepul

### 2.1 Onboarding mitra
Splash (353:5150, foto gelap) → 0,8 dtk → Splash (353:5162) → 1,6 dtk → Onboarding ×3 → Masuk → OTP
(atau Google) → Pilih Peran (Pengepul) → A1 Daftar Mitra Pengepul `mitra-daftar` → Pindai KTP →
A1a kamera KTP → A1b Data dari KTP `a1b-ktp` → Gunakan Data Ini → A1c Daftar Mitra · Terisi
`mitra-daftar-terisi` → Lanjut → A2 Verifikasi Identitas `mitra-verifikasi`:
Foto lapak → A2a kamera → A2b Pratinjau `a2b-pratinjau` → A2c kamera kendaraan → A2d `a2d-pratinjau`
→ A2e kamera STNK → A2f `a2f-pratinjau` → Gunakan Foto → A2g Dokumen Lengkap `a2g-lengkap`;
Surat kuasa → A2h `a2h-kuasa` (Simpan → A2g). Kirim Verifikasi → A3 Status → A4 Mitra Terverifikasi.

### 2.5 Pembayaran (D1a–D1f)
D1 Serah Terima → Barang sesuai, bayar → D1a Pilih Metode `d1a-metode`: Saldo KETUK → D1b PIN
`d1b-pin` (2,5 dtk) → D1 Pembayaran Selesai; Tunai → Pembayaran Selesai; Lanjut Bayar → D1c VA
`d1c-va` (hitung mundur habis → D1f `d1f-kedaluwarsa`; Saya Sudah Transfer → D1d `d1d-cek` (3 dtk) →
D1e `d1e-berhasil` → Lanjut → Pembayaran Selesai). D1f: Buat VA Baru → D1c; Bayar dengan Saldo → D1b.
Koreksi Disetujui → D1 Pembayaran Selesai · Koreksi.

### 2.6 Saldo KETUK (E2)
E1 Profil → kartu Saldo KETUK → E2 `e2-saldo`: Isi Saldo → E2a `e2a-isi` → E2b VA `e2b-va` →
E2c `e2c-berhasil` → Kembali ke Saldo; Tarik → E2d `e2d-tarik` → E2e PIN `e2e-pin` (2,5 dtk) →
E2f `e2f-diproses`. Mutasi "Bayar ke Bu Ratna" → D1e.

### 2.7 Lepas Gratis (F1–F4) & E-waste Aman (G1–G5)
F1 Radar LG `f1-radar` → kartu Kardus → F1 Permintaan `f1-permintaan` → Terima → F2 Jadwal `f2-jadwal`
→ Navigasi `f2-navigasi` → Tiba → F3 Cek & Timbang `f3-cek` → Sesuai → F4 Kode `f4-kode` → F4 Selesai
`f4-selesai`; Tolak di Lokasi → F3 Tolak `f3-tolak` → F3 Terkirim `f3-terkirim` (3 dtk) → F3 Disetujui
`f3-disetujui` → Jadwal.
G1 Ajukan `g1-ajukan` → G1 Terkirim → G2 Persiapan `g2-persiapan` → Navigasi `g2-navigasi` → G3 Cek
`g3-cek` → Sesuai → G4 Kode `g4-kode` → G4 Selesai `g4-selesai`; Ajukan Koreksi → G3 Koreksi →
G3 Menunggu (3 dtk) → G3 Disetujui → G4 Kode · Koreksi `g4-kode-k` → G4 Selesai · Koreksi
`g4-selesai-k` → Salurkan → G5 `g5-salurkan` → Kirim Bukti → Radar.

### 2.2 Radar & tawaran
| Dari | Pemicu | Ke |
|---|---|---|
| B1 Radar Barang | kartu kipas / kardus / dispenser | B2 Ajukan Tawaran |
| B1 Radar Barang | ikon peta | B2 Peta Radar `peta` |
| B1 Radar Barang | ikon filter | B1 Filter Radar `filter` (sheet) |
| B1 Radar Barang | lonceng | B1 Notifikasi Pengepul `notif` |
| B1 Radar Barang | statistik | E1 Pendapatan |
| B1 Filter Radar | Terapkan / Reset / scrim | B1 Radar |
| B2 Peta Radar | pin / Ajukan | B2 Ajukan Tawaran; Daftar → Radar |
| B2 Ajukan Tawaran | Kirim tawaran | B2 Tawaran Terkirim |
| B2 Tawaran Terkirim | Lihat Tawaranku | D1 Jadwal Jemput Hari Ini |
| B2 Tawaran Terkirim | Kembali ke Radar | B1 Radar |
| Nav Tawaranku | — | C1 Tawaranku Berjalan `tawaranku` |
| C1 Tawaranku Berjalan | Lihat kipas | B2 Tawaran Terkirim |
| C1 Tawaranku Berjalan | tab Menang | C1 Tawaranku `tawaranku-menang` |
| C1 Tawaranku | Mulai jemput | D1 Navigasi; Lihat detail → Ajukan; Chat |
| B1 Notifikasi Pengepul | Barang baru → Ajukan; Kamu menang → Tawaranku; Pengingat → Jadwal; Terlampaui → Tawaranku Berjalan; Skor → Profil; Modul → Lencana | |

### 2.3 Penjemputan & pembayaran
D1 Jadwal Jemput → Navigasi → D1 Navigasi ke Lokasi → Saya Sudah Tiba → D1 Serah Terima
Pengepul (Cocokkan Barang) → Ajukan Koreksi → D1 Ajukan Koreksi Berbukti → Kirim →
D1 Menunggu Konfirmasi → Buka chat → D1 Chat dengan Warga → Lanjut → D1 Koreksi Disetujui →
Bayar → D1 Pembayaran Selesai → Lanjut → D1 Jadwal Jemput; Bukti → F1 Bukti Transaksi.
Jadwal/Navigasi: Chat → Chat dengan Warga.

### 2.4 Akun
Nav Akun → E1 Profil & Skor Tepat Harga → Pendapatan / Lencana E-waste Aman / Mitra
Terverifikasi / Bantuan. Lencana → Profil.

---

## 1b. Warga — alur baru

- **Kamera (B2/C1 Ambil Foto)** `foto`: mulai buram ("Foto buram · ketuk layar untuk fokus"); ketuk
  layar/rana untuk fokus, rana lagi → Kategori → Detail. Galeri dispenser → Barang Tidak Dikenali.
- **Lepas Gratis (H1–H4):** `lepas` → `h1-cek` → kamera → `h2-mencari` → `h2-menerima` →
  `h3-mengecek` → `h3-serah` → `h4-bukti`. Skenario 2 (barang ditolak): `h3-hasil` → `h3-ditolak` →
  `h3-banding`.
- **E-waste Aman (I1–I5):** `ewaste` → `i1-cek` → kamera → `i2-radar` → `i2-tawaran` → `i2-konfirmasi` →
  `i2-berhasil` → `i3-rincian` → `i4-serah` → `i5-bukti`; koreksi `i4-koreksi` → `i4-serah-k` → `i5-bukti-k`.
- **Mode Dibantu Keluarga (K1–K10):** Pilih Peran/Pusat Bantuan → `k1-aktifkan` → `k2-undang` →
  `k3-terkirim` → Mode Dibantu. Kerabat: `k4-undangan` → `k5-bantu` → `k6-menunggu` (3 dtk) → Ketuk
  Palu Berhasil. Pemilik: `k7-setujui` → `k8-disetujui` → Harga Terkunci. Akses: `k9-akses` → `k10-dicabut`.

---

## 3. Peran ganda di demo web
Web demo menjalankan kedua aplikasi sekaligus (tombol **Warga | Pengepul**, `Tab`). Aksi di satu
sisi (pasang barang, kirim tawaran, ketuk palu, ajukan/terima koreksi, bayar) muncul di sisi lain
sebagai notifikasi dan data hidup, tanpa mengubah urutan layar di atas.

---

## 4. Status implementasi web
Semua layar dan koneksi di atas sudah ada di web (route di kolom **route**). Layar varian (C1/D1 dispenser,
D5 borongan, Lepas Gratis) memakai komponen layar yang sama dengan data skenario berbeda. Layar statis yang
dibuka dari daftar/notifikasi (mis. Harga Terkunci dispenser, Koreksi dari notifikasi) disiapkan lewat
`demoState`. Rute yang diuji otomatis: `scripts/e2e.mjs`, `scripts/e2e-scen.mjs`, `scripts/e2e-nav.mjs`, `scripts/e2e-baru.mjs` (alur baru).
