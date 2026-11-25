// Full demo walkthrough via real clicks. Saves a screenshot per step.
import { createRequire } from 'module'
const { chromium } = createRequire(import.meta.url)('playwright')
const out = process.argv[2]
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
const errs = []
p.on('pageerror', e => errs.push(e.message))
p.on('console', m => m.type() === 'error' && errs.push(m.text()))
let n = 0
const shot = async name => { await p.waitForTimeout(700); await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` }) }
const click = async (t, o = {}) => { await p.getByText(t, { exact: false }).first().click(o); }
const key = async k => { await p.keyboard.press(k) }
await p.goto('http://localhost:5173/')
await shot('splash')
await p.waitForTimeout(2600); await shot('beranda')
await click('Foto Barang'); await shot('foto')
await p.getByLabel('Ambil foto').click(); await p.waitForTimeout(1600); await shot('foto-detected')
await click('Lanjut'); await shot('detail')
await click('Mulai Sesi Ketuk'); await p.waitForTimeout(400); await shot('sesi-empty')
await p.waitForTimeout(9000); await shot('sesi-3offers')
await key('Tab'); await shot('p-radar')
await click('Kipas angin berdiri'); await shot('p-ajukan')
await click('Kirim Tawaran'); await shot('p-terkirim')
await key('Tab'); await shot('sesi-4offers')
await p.getByRole('button', { name: 'Ketuk Palu' }).last().click(); await shot('konfirmasi')
await p.getByRole('button', { name: 'Ketuk Palu' }).last().click(); await p.waitForTimeout(800); await shot('berhasil')
await click('Lihat Status Penjemputan'); await shot('terkunci')
await p.waitForTimeout(7200); await shot('terkunci-tiba')
await key('Tab'); await shot('p-terkirim-won')
await click('Mulai Penjemputan'); await shot('p-cek')
await click('Ajukan Koreksi Berbukti'); await shot('p-ajukan-koreksi')
await click('Kirim Koreksi ke Warga'); await shot('p-menunggu')
await key('Tab'); await p.waitForTimeout(300); await shot('w-toast')
await click('Mulai Serah Terima'); await shot('serah')
await click('Pak Slamet mengajukan koreksi harga'); await shot('koreksi')
await click('Terima Koreksi'); await shot('selesai')
await key('Tab'); await shot('p-menunggu-ok')
await click('Bayar Rp30.000'); await shot('p-bayar')
await key('d'); await p.waitForTimeout(500); await shot('panel')
console.log('errors:', errs.length ? errs : 'none')
await b.close()
