// Walks every flow added in the latest Figma prototype (Lepas Gratis, E-waste, Mode Dibantu Keluarga,
// pengepul Lepas Gratis / E-waste / pembayaran / saldo / onboarding) via real clicks, asserting the screen text.
import { createRequire } from 'module'
const { chromium, devices } = createRequire(import.meta.url)('playwright')
const DEVICE = process.env.DEVICE
const b = await chromium.launch()
const p = await (await b.newContext(DEVICE ? { ...devices[DEVICE], deviceScaleFactor: 1 } : { viewport: { width: 390, height: 844 } })).newPage()
const errs = []
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()))
let fails = 0
const click = async t => { await p.getByText(t, { exact: false }).first().click() }
const shutter = async () => { await p.getByLabel('Ambil foto').click(); await p.waitForTimeout(300); if (await p.getByLabel('Ambil foto').count()) await p.getByLabel('Ambil foto').click() }
const see = async (t, name, timeout = 5000) => {
  try { await p.getByText(t, { exact: false }).first().waitFor({ timeout }); console.log('ok  ', name) }
  catch { fails++; console.log('FAIL', name, '— expected', JSON.stringify(t)) }
}
const start = async (role, screen, v) => {
  await p.evaluate(([role, screen, v]) => {
    window.__d({ type: 'jump', preset: role === 'pengepul' ? 'pengepul' : 'awal' })
    if (role === 'pengepul') window.__d({ type: 'role', role })
    if (v) window.__d({ type: 'set', v })
    window.__d({ type: 'go', screen, role, root: true })
  }, [role, screen, v ?? null])
  await p.waitForTimeout(400)
}
await p.goto('http://localhost:5173/'); await p.waitForTimeout(500)

// Warga · Lepas Gratis (H1–H4)
await start('warga', 'lepas', { lgTolak: false }); await see('Lepas Gratis', 'h-lepas')
await click('Ajukan Lepas Gratis'); await see('Syarat barang lepas gratis', 'h1-cek')
await click('Lanjut Ambil Foto'); await see('Foto Kondisi', 'h-foto')
await shutter(); await see('Batalkan Permintaan', 'h2-mencari')
await see('Pak Slamet menerima permintaanmu', 'h2-menerima', 6000)
await see('Konfirmasi Serah Terima', 'h3-serah', 12000)
await click('Konfirmasi Serah Terima'); await see('Beri Ulasan Pengepul', 'h4-bukti')
// Warga · Lepas Gratis, barang ditolak
await start('warga', 'lepas', { lgTolak: true }); await click('Ajukan Lepas Gratis'); await click('Lanjut Ambil Foto'); await shutter()
await see('Lihat Alasan & Foto Bukti', 'h3-hasil', 14000)
await click('Lihat Alasan & Foto Bukti'); await see('Ajukan Banding ke KETUK', 'h3-ditolak')
await p.getByRole('button', { name: 'Ajukan Banding ke KETUK' }).click(); await see('Pilah & Ajukan Ulang', 'h3-banding')

// Warga · E-waste (I1–I5)
await start('warga', 'ewaste'); await see('E-waste', 'i-jalur')
await start('warga', 'i1-cek'); await click('Lanjut Ambil Foto'); await shutter(); await see('Sesi Ketuk E-waste', 'i2-radar', 4000)
await start('warga', 'i3-rincian'); await click('Lihat Jadwal Jemput'); await see('Serah Terima E-waste', 'i4-serah')
await start('warga', 'i4-koreksi'); await see('Koreksi', 'i4-koreksi')

// Mode Dibantu Keluarga (K1–K10)
await start('warga', 'k1-aktifkan'); await see('Biar anak atau kerabat', 'k1')
await click('Undang Kerabat'); await see('Kirim Undangan via WhatsApp', 'k2')
await click('Kirim Undangan via WhatsApp'); await see('Undangan terkirim ke Dimas', 'k3')
await click('Selesai'); await see('Kerabat terhubung', 'g1-dibantu')
await start('warga', 'k4-undangan'); await see('Bu Ratna mengundangmu', 'k4')
await click('Terima & Hubungkan'); await see('Kamu bertindak atas nama Bu Ratna', 'k5')
await click('Ajukan Ketuk Palu'); await see('Bu Ratna sedang meninjau', 'k6')
await see('Ketuk Palu Berhasil', 'k6→berhasil', 6000)
await start('warga', 'k7-setujui'); await see('Dimas ingin menjual', 'k7')
await click('Setujui, Jual'); await see('Yang perlu Ibu lakukan', 'k8')
await start('warga', 'k9-akses'); await see('Aktivitas terbaru', 'k9')
await click('Cabut Akses Dimas'); await see('Akses Dimas dicabut', 'k10')

// Pengepul · Lepas Gratis (F1–F4)
await start('pengepul', 'f1-radar'); await see('Lepas gratis | Rp0', 'f1-radar')
await click('Kardus bekas 12 kg'); await see('Permintaan Lepas Gratis', 'f1-permintaan')
await click('Terima Permintaan'); await see('Jemput kardus Bu Ratna', 'f2-jadwal')
await click('Navigasi ke Lokasi'); await click('Saya Sudah Tiba'); await see('Cek & Timbang', 'f3-cek')
await click('Tolak di Lokasi'); await see('Kirim Penolakan ke Warga', 'f3-tolak')
await click('Kirim Penolakan ke Warga'); await see('Menunggu Tanggapan Warga', 'f3-terkirim')
await see('Penolakan disetujui', 'f3-disetujui', 6000)
await start('pengepul', 'f3-cek'); await click('Sesuai, Minta Kode Warga'); await see('Masukkan kode dari warga', 'f4-kode')
await click('Selesaikan Serah Terima'); await see('11,6 kg kardus diterima', 'f4-selesai')

// Pengepul · E-waste (G1–G5)
await start('pengepul', 'g1-ajukan'); await click('Kirim Tawaran Rp85.000'); await see('Tawaran Rp85.000 terkirim', 'g1-terkirim')
await click('Lihat Tawaranku'); await see('Wajib dibawa', 'g2-persiapan')
await click('Navigasi ke Lokasi'); await click('Saya Sudah Tiba'); await see('Cek E-waste', 'g3-cek')
await click('Ajukan Koreksi Berbukti'); await click('Kirim Koreksi ke Warga'); await see('Menunggu Konfirmasi Warga', 'g3-menunggu')
await see('Koreksi disetujui', 'g3-disetujui', 6000)
await click('Barang sesuai, bayar Rp70.000'); await click('Bayar Rp70.000'); await see('Rp70.000 dibayar ke Bu Ratna', 'g4-selesai-k')
await click('Salurkan ke Pengolah Berizin'); await see('Batch di gudang', 'g5')
await click('Kirim Bukti Penyaluran'); await see('Radar Barang', 'g5→radar')

// Pengepul · Pembayaran (D1a–D1f)
await start('pengepul', 'cek'); await click('Barang sesuai, bayar'); await see('Bayar dengan', 'd1a')
await click('Lanjut Bayar'); await see('NOMOR VIRTUAL ACCOUNT BCA', 'd1c')
await click('Saya Sudah Transfer'); await see('Mengecek transfermu', 'd1d')
await see('Bukti pembayaran', 'd1e', 6000)
await click('Lanjut, Salurkan Barang'); await see('Salurkan barang ke jalur', 'd1-selesai')
await start('pengepul', 'd1a-metode'); await click('Saldo KETUK'); await see('Masukkan PIN KETUK', 'd1b')
await see('Salurkan barang ke jalur', 'd1b→selesai', 6000)
await start('pengepul', 'd1f-kedaluwarsa'); await click('Buat VA Baru'); await see('NOMOR VIRTUAL ACCOUNT BCA', 'd1f→d1c')

// Pengepul · Saldo KETUK (E2)
await start('pengepul', 'profil'); await click('Isi / Tarik'); await see('Saldo tersedia', 'e2')
await click('Isi Saldo'); await see('Mau isi berapa?', 'e2a')
await click('Lanjut'); await click('Saya Sudah Transfer'); await see('Saldo bertambah Rp300.000', 'e2c')
await click('Kembali ke Saldo'); await see('Saldo tersedia', 'e2c→e2')
await p.getByText('Tarik', { exact: true }).first().click(); await see('Mau tarik berapa?', 'e2d')
await click('Tarik Rp400.000'); await see('Konfirmasi Penarikan', 'e2e')
await see('Rp400.000 sedang dikirim', 'e2f', 6000)

console.log(fails ? `${fails} gagal` : 'semua lolos', '| errors:', errs.length ? errs : 'none')
await b.close()
process.exit(fails || errs.length ? 1 : 0)
