// Full demo walkthrough following the Figma prototype flow, via real clicks. Saves a screenshot per step.
import { createRequire } from 'module'
const { chromium, devices } = createRequire(import.meta.url)('playwright')
// DEVICE="iPhone SE" (any Playwright device name) runs the walk in phone emulation with touch
const DEVICE = process.env.DEVICE
const out = process.argv[2]
const b = await chromium.launch()
const p = await (await b.newContext(DEVICE ? { ...devices[DEVICE], deviceScaleFactor: 1 } : { viewport: { width: 390, height: 844 } })).newPage()
const errs = []
p.on('pageerror', e => errs.push(e.message))
p.on('console', m => m.type() === 'error' && errs.push(m.text()))
let n = 0
const shot = async (name, wait = 700) => { await p.waitForTimeout(wait); await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` }) }
const click = async t => { await p.getByText(t, { exact: false }).first().click() }
const role = async t => { await p.getByRole('button', { name: t }).last().click() }
const key = async k => { await p.keyboard.press(k) }
await p.goto('http://localhost:5173/')
await shot('splash-1', 300); await shot('splash-tiles', 1000); await shot('splash-knock', 500); await shot('splash-sparks', 1300)
await shot('splash-logo', 1100); await shot('splash-loader', 1500)
await p.waitForTimeout(1600); await shot('onboarding-1')
await click('Lanjut'); await shot('onboarding-2'); await click('Lanjut'); await shot('onboarding-3')
await click('Mulai Sekarang'); await shot('masuk')
await click('Kirim Kode OTP'); await shot('otp', 1900)
await role('Verifikasi'); await shot('peran')
await click('Lanjut sebagai Warga'); await shot('alamat')
await click('Simpan Alamat'); await shot('beranda')
await click('Foto Barang'); await shot('foto')
await p.getByLabel('Ambil foto').click(); await p.waitForTimeout(400); if (await p.getByLabel('Ambil foto').count()) await p.getByLabel('Ambil foto').click(); await shot('kategori', 1500); await click('Simpan Kategori'); await shot('detail', 900)
await click('Mulai Sesi Ketuk'); await shot('sesi', 9000)
await key('Tab'); await shot('p-radar')
await click('Kipas angin berdiri'); await shot('p-ajukan')
await click('Kirim Tawaran'); await shot('p-terkirim')
await key('Tab'); await shot('sesi-4')
await click('Pak Slamet'); await shot('tawaran')
await click('Ketuk Palu Rp'); await shot('konfirmasi')
await role('Ketuk Palu'); await shot('berhasil', 1200)
await click('Lihat Status Penjemputan'); await shot('terkunci', 7500)
await p.getByLabel('Chat').click(); await shot('w-chat', 1200)
await key('Tab'); await shot('p-terkirim-won')
await click('Lihat Tawaranku'); await shot('p-jadwal')
await role('Navigasi'); await shot('p-navigasi', 6500)
await click('Saya Sudah Tiba'); await shot('p-cek')
await click('Ajukan Koreksi Berbukti'); await shot('p-ajukan-koreksi')
await click('Kirim Koreksi ke Warga'); await shot('p-menunggu')
await key('Tab'); await shot('w-chat-koreksi', 1200)
await click('Pengajuan Koreksi Harga'); await shot('koreksi')
await click('Terima Koreksi'); await shot('selesai')
await key('Tab'); await shot('p-menunggu-ok')
await click('Buka chat dengan warga'); await shot('p-chat', 1200)
await click('Lanjut ke pembayaran'); await shot('p-disetujui')
await click('Barang sesuai, bayar'); await shot('p-bayar')
await click('Lanjut ke Titik Berikutnya'); await shot('p-jadwal-done')
console.log('errors:', errs.length ? errs : 'none')
await b.close()
