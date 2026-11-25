import { useState } from 'react'
import { useStore, rp } from '../../store'
import { Img, StatusBar, AppBar } from '../../ui'

export let TARIK = 80000
const SALDO = 83000

/** Figma: G1 Tarik Saldo (29:2505) — Tarik → G1 Berhasil Tarik */
export default function Tarik() {
  const { go } = useStore()
  const [amt, setAmt] = useState(80000)
  const [dest, setDest] = useState(-1)
  const fee = dest === 1 ? 2500 : 0
  const chips: [string, number][] = [['Rp20.000', 20000], ['Rp50.000', 50000], ['Rp80.000', 80000], ['Semua', SALDO]]
  const dests = [['E-wallet', '0812 **** 7890 | tanpa biaya | instan'], ['Rekening bank', '**** 2210 | biaya Rp2.500 | 1 hari kerja']]
  const rows: [string, string][] = [['Saldo', rp(SALDO)], ['Ditarik', rp(amt)], ['Biaya', rp(fee)]]
  return (
    <div className="screen">
      <AppBar title="Tarik Saldo" ink />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <label className="col" style={{ gap: 8 }}>
          <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Jumlah penarikan</span>
          <div className="row" style={{ height: 54, gap: 12, padding: '0 16px', borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--line-200)' }}>
            <span className="t-body-ms" style={{ color: 'rgba(21,20,43,0.6)' }}>Rp</span>
            <div style={{ width: 1.5, height: 22, background: 'var(--line-200)' }} />
            <input inputMode="numeric" placeholder="Minimal 20.000" value={amt ? amt.toLocaleString('id-ID') : ''}
              onChange={e => setAmt(Math.min(SALDO, Number(e.target.value.replace(/\D/g, '')) || 0))}
              className="t-body-l" style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', color: 'var(--ink-900)' }} />
          </div>
        </label>
        <div className="row scroll" style={{ position: 'relative', gap: 8, margin: '0 -24px', padding: '0 24px' }}>
          {chips.map(([l, v]) => <button key={l} className={`chip${amt === v ? ' on' : ''}`} onClick={() => setAmt(v)}>{l}</button>)}
        </div>
        <span className="t-body-ms">Tarik ke</span>
        <div className="col" style={{ gap: 12 }}>
          {dests.map(([t, s], i) => (
            <button key={t} onClick={() => setDest(i)} className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: '#fff', textAlign: 'left', border: dest === i ? '2px solid var(--primary-500)' : i === 0 ? '2px solid var(--line-200)' : '1px solid var(--line-200)' }}>
              <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--line-100)', justifyContent: 'center', flex: 'none' }}><Img src="ic-wallet-ink20.svg" size={20} /></div>
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-body-ms">{t}</span>
                <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{s}</span>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: 999, flex: 'none', border: dest === i ? '6px solid var(--primary-500)' : '1.5px solid var(--ink-300)', background: '#fff' }} />
            </button>
          ))}
        </div>
        <div className="col" style={{ gap: 10, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          {rows.map(([k, v]) => (
            <div key={k} className="row" style={{ justifyContent: 'space-between' }}><span className="t-body-m" style={{ color: 'var(--ink-500)' }}>{k}</span><span className="t-body-ms">{v}</span></div>
          ))}
          <div className="row t-body-ms" style={{ justifyContent: 'space-between' }}><span>Sisa saldo</span><span>{rp(SALDO - amt - fee < 0 ? 0 : SALDO - amt)}</span></div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" disabled={amt < 20000} onClick={() => { TARIK = amt; go('tarik-ok', { replace: true }) }}><Img src="ic-arrow-right-white.svg" size={20} />Tarik {rp(amt)}</button>
      </div>
      <StatusBar />
    </div>
  )
}
