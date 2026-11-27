import { createRequire } from 'module'
const { chromium, devices } = createRequire(import.meta.url)('playwright')
// DEVICE="iPhone SE" (any Playwright device name) runs the walk in phone emulation with touch
const DEVICE = process.env.DEVICE
const out = process.argv[2]
const b = await chromium.launch()
const p = await (await b.newContext(DEVICE ? { ...devices[DEVICE], deviceScaleFactor: 1 } : { viewport: { width: 390, height: 844 } })).newPage()
const errs = []
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()))
let n = 0
const shot = async (name, wait = 700) => { await p.waitForTimeout(wait); await p.screenshot({ path: `${out}/${String(++n).padStart(2, '0')}-${name}.png` }) }
const click = async t => { await p.getByText(t, { exact: false }).first().click() }
const role = async t => { await p.getByRole('button', { name: t }).last().click() }
await p.goto('http://localhost:5173/'); await p.waitForTimeout(300)
await p.keyboard.press('1'); await p.waitForTimeout(500)
// dispenser (C1/D1)
await p.getByLabel('Pasang barang').click(); await shot('c1-foto-blur')
await p.getByLabel('Ambil foto').click(); await p.waitForTimeout(400); if (await p.getByLabel('Ambil foto').count()) await p.getByLabel('Ambil foto').click(); await shot('c1-kategori', 2600)
await click('Simpan Kategori'); await shot('c1-detail')
await click('Mulai Sesi Ketuk'); await shot('d1-tidak-ada')
await role('Perluas Radius'); await shot('d1-perluasan', 600); await shot('d1-sesi', 8000)
await click('Pak Slamet'); await shot('d1-tawaran')
await click('Ketuk Palu Rp'); await role('Ketuk Palu'); await shot('d1-berhasil', 1200)
await click('Lihat Status'); await p.getByLabel('Chat').click(); await shot('d1-chat', 1200)
await click('Barang Sesuai'); await shot('d1-koreksi')
await click('Terima Koreksi'); await shot('d1-selesai')
// borongan (D4/D5)
await p.keyboard.press('1'); await p.waitForTimeout(500)
await click('Pindahan'); await shot('d4')
await click('Mulai Sesi Ketuk'); await shot('d5-sesi', 9000)
await click('UD Berkah'); await shot('d5-tawaran')
await click('Ketuk Palu Rp'); await role('Ketuk Palu'); await shot('d5-berhasil', 1200)
await click('Lihat Status'); await shot('d5-status', 1500)
await p.getByLabel('Chat').click(); await shot('d5-chat', 1200)
await click('Pengajuan Koreksi Harga'); await shot('d5-koreksi')
await click('Tolak'); await shot('d5-batal')
console.log('errors:', errs.length ? errs : 'none')
await b.close()
