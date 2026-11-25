// usage: node scripts/shot.mjs out.png '[{"type":"jump","preset":"sesi"}]' [waitMs] [desktop]
import { createRequire } from 'module'
const { chromium } = createRequire(import.meta.url)('playwright')
const [out, actions = '[]', wait = '600', desktop] = process.argv.slice(2)
const b = await chromium.launch()
const p = await b.newPage({ viewport: desktop ? { width: 1440, height: 900 } : { width: 390, height: 844 } })
p.on('pageerror', e => console.log('PAGEERROR', e.message))
p.on('console', m => m.type() === 'error' && console.log('CONSOLE', m.text()))
await p.goto('http://localhost:5173/')
await p.waitForTimeout(300)
for (const a of JSON.parse(actions)) {
  if (a.wait) { await p.waitForTimeout(a.wait); continue }
  if (a.label) { await p.getByLabel(a.label).first().click(); await p.waitForTimeout(300); continue }
  if (a.click) { await p.getByText(a.click, { exact: false }).first().click(); await p.waitForTimeout(400); continue }
  await p.evaluate(x => window.__d(x), a)
  await p.waitForTimeout(80)
}
await p.waitForTimeout(+wait)
await p.screenshot({ path: out })
await b.close()
