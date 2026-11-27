// Walks the account / history / pengepul-onboarding / radar edges and asserts each target screen.
import { createRequire } from 'module'
const { chromium, devices } = createRequire(import.meta.url)('playwright')
// DEVICE="iPhone SE" (any Playwright device name) runs the walk in phone emulation with touch
const DEVICE = process.env.DEVICE
const out = process.argv[2]
const b = await chromium.launch()
const p = await (await b.newContext(DEVICE ? { ...devices[DEVICE], deviceScaleFactor: 1 } : { viewport: { width: 390, height: 844 } })).newPage()
const errs = [], fails = []
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()))
let n = 0
const shot = async name => { if (out) await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` }) }
const see = async (t, name) => {
  try { await p.getByText(t, { exact: false }).first().waitFor({ state: 'visible', timeout: 4000 }); console.log('ok  ', name) }
  catch { fails.push(name); console.log('FAIL', name, '— expected', JSON.stringify(t)) }
  await p.waitForTimeout(350); await shot(name)
}
const click = async t => p.getByText(t, { exact: false }).first().click()
const btn = async t => p.getByRole('button', { name: t }).first().click()
const label = async t => p.getByLabel(t).first().click()
await p.goto('http://localhost:5173/'); await p.waitForTimeout(300)
await p.evaluate(() => window.__d({ type: 'jump', preset: 'awal' })); await p.waitForTimeout(400)

// Warga: nav bawah → Riwayat → Bukti → Unduh → Riwayat; Kasur → Batal
await btn('Riwayat'); await see('total diterima', 'riwayat')
await click('Rak besi 3 susun'); await see('KTK-2810-0217', 'bukti-rak')
await click('Laporkan Masalah'); await see('Apa itu Koreksi Berbukti', 'bantuan')
await label('Kembali'); await click('Unduh Bukti'); await see('total diterima', 'riwayat-lagi')
await click('Kasur busa'); await see('Dibatalkan', 'batal')
// Akun → Dompet → Tarik → Berhasil → Akun
await p.evaluate(() => window.__d({ type: 'jump', preset: 'awal' })); await p.waitForTimeout(400)
await btn('Akun'); await see('Ratna Wulandari', 'akun')
await click('Dompet & Pembayaran'); await see('Saldo KETUK', 'dompet')
await click('Kipas angin berdiri | Hari ini'); await see('KTK-2611-0381', 'dompet-bukti')
await label('Kembali'); await click('Tarik Saldo'); await see('Tarik ke', 'tarik')
await click('Rp50.000'); await btn('Tarik Rp50.000'); await see('Rp50.000 diterima', 'tarik-ok')
await click('Kembali ke beranda'); await see('Ratna Wulandari', 'akun-lagi')
await click('Mode Dibantu Keluarga'); await see('Kerabat terhubung', 'dibantu')
await click('Simpan Pengaturan'); await see('Ratna Wulandari', 'akun-simpan')
await click('Pusat Bantuan'); await click('Bagaimana Mode Dibantu'); await see('Biar anak atau kerabat', 'bantuan-k1')
await label('Kembali'); await label('Kembali')
await click('Notifikasi'); await see('Semua', 'notifikasi')
await label('Kembali'); await click('Alamat Jemput'); await see('Simpan Alamat', 'alamat')
await label('Kembali'); await label('Ubah profil'); await see('Buat akun KETUK', 'daftar')
await click('Masuk'); await see('Masuk ke KETUK', 'masuk')
await click('Daftar'); await see('Buat akun KETUK', 'daftar2')
await click('Daftar & Kirim OTP'); await see('Verifikasi', 'otp')
// Akun → Keluar dialog
await p.evaluate(() => window.__d({ type: 'jump', preset: 'awal' })); await p.waitForTimeout(400)
await btn('Akun'); await p.getByText('Keluar', { exact: true }).click(); await see('Keluar dari Akun?', 'dialog-keluar')
await btn('Batal'); await p.getByText('Keluar', { exact: true }).first().click(); await p.getByRole('button', { name: 'Keluar' }).last().click(); await see('Masuk ke KETUK', 'keluar-masuk')
// Ganti ke Pengepul → splash → onboarding → masuk → otp → peran → mitra
await p.evaluate(() => window.__d({ type: 'jump', preset: 'awal' })); await p.waitForTimeout(400)
await btn('Akun'); await click('Ganti ke Pengepul'); await p.waitForTimeout(7500); await see('Lewati', 'p-onboarding')
await click('Lewati'); await see('Masuk ke KETUK', 'p-masuk')
await click('Kirim Kode OTP'); await p.waitForTimeout(1500); await see('Verifikasi', 'p-otp')
await btn('Verifikasi'); await see('Lanjut sebagai Pengepul', 'p-peran')
await click('Lanjut sebagai Pengepul'); await see('Daftar Mitra Pengepul', 'mitra-daftar')
await click('Pindai KTP'); await see('Pindai KTP', 'a1a-ktp')
await p.getByLabel('Ambil foto').click(); await see('Data dari KTP', 'a1b-ktp')
await click('Gunakan Data Ini'); await see('Data KTP terisi otomatis', 'a1c-terisi')
await click('Lanjut ke Verifikasi'); await see('Verifikasi Identitas', 'mitra-verifikasi')
await click('Foto lapak / gudang'); await see('Foto Lapak', 'a2a-lapak')
await p.getByLabel('Ambil foto').click(); await see('Pratinjau Foto', 'a2b')
await click('Gunakan & Lanjut Foto Kendaraan'); await p.getByLabel('Ambil foto').click(); await see('Plat terlihat jelas', 'a2d')
await click('Gunakan & Lanjut Foto STNK'); await p.getByLabel('Ambil foto').click(); await see('Tidak ada pantulan', 'a2f')
await click('Gunakan Foto'); await see('Tidak diperlukan', 'a2g')
await click('Kirim Verifikasi'); await see('Verifikasi sedang ditinjau', 'mitra-status')
await click('Ikuti modul E-waste'); await see('Syarat terpenuhi', 'lencana')
await label('Kembali'); await click('Lihat Status Mitra'); await see('Kamu Mitra Terverifikasi', 'mitra-ok')
await click('Lihat Profil Mitra'); await see('128 transaksi', 'profil')
await click('Boleh menawar elektronik'); await see('Syarat terpenuhi', 'lencana2')
await click('Lihat di Profil Mitra'); await click('Skor Tepat Harga'); await see('7 hari terakhir', 'pendapatan')
await label('Kembali'); await click('KTP, lapak, dan kendaraan'); await see('Mulai Menawar', 'mitra-ok2')
await click('Mulai Menawar'); await see('Radar Barang', 'radar')
await label('Peta'); await see('Ajukan Tawaran', 'peta')
await label('Filter'); await see('Filter Radar', 'filter')
await click('Terapkan Filter'); await see('Ajukan Tawaran', 'peta-lagi')
await click('Daftar'); await see('Radar Barang', 'radar2')
await label('Notifikasi'); await see('Barang baru 1,2 km', 'notif')
await click('Kamu menang!'); await see('Mulai Jemput', 'tawaranku-menang')
await click('Berjalan 6'); await see('Terlampaui', 'tawaranku')
await click('Lihat'); await see('terkirim', 'terkirim')
await click('Kembali ke Radar'); await btn('Jemput'); await see('Jemput Hari Ini', 'jadwal')
await btn('Akun'); await see('128 transaksi', 'profil-nav')
await btn('Radar'); await label('Statistik'); await see('7 hari terakhir', 'statistik')

console.log('fails:', fails.length ? fails : 'none')
console.log('errors:', errs.length ? errs : 'none')
await b.close()
