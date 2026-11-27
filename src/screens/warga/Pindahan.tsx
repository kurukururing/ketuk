import { openCam } from '../Camera'
import { useState } from 'react'
import { useStore, rp } from '../../store'
import { A, Img, StatusBar, AppBar, Checkbox } from '../../ui'

const ITEMS: [string, string, string, number, number][] = [
  ['Kasur busa', 'Perabot', 'item-kasur.jpg', 60000, 90000],
  ['Rak besi 3 susun', 'Logam', 'item-rak.jpg', 45000, 70000],
  ['Dispenser', 'Elektronik', 'item-disp.jpg', 30000, 50000],
  ['Kipas angin berdiri', 'Elektronik', 'item-kip.jpg', 25000, 40000],
]

/** Figma: D4 Mode Pindahan (13:963) → Mulai sesi pindahan → D5 Sesi Borongan */
export default function Pindahan() {
  const { d, go } = useStore()
  const [on, setOn] = useState([true, true, true, false])
  const [mode, setMode] = useState<'borongan' | 'per'>('borongan')
  const picked = ITEMS.filter((_, i) => on[i])
  const lo = picked.reduce((a, x) => a + x[3], 0), hi = picked.reduce((a, x) => a + x[4], 0)
  return (
    <div className="screen fit">
      <AppBar ink title="Mode Pindahan" trailing={<button className="icon-btn" onClick={() => go('bantuan')}><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--amber-100)' }}>
            <div className="row" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--amber-500)', justifyContent: 'center' }}><img src={A('3d-truk.png')} alt="" style={{ width: 37, height: 37 }} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">Pindahan rumah?</span>
              <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>Pasang banyak barang sekaligus. Pengepul menawar borongan atau per barang.</span>
            </div>
          </div>
          <div className="col" style={{ padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            {ITEMS.map(([n, cat, img, a, b], i) => (
              <label key={n} className="row" style={{ gap: 12, padding: '12px 0', cursor: 'pointer', borderBottom: i < ITEMS.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
                <Checkbox on={on[i]} onChange={v => setOn(o => o.map((x, j) => (j === i ? v : x)))} />
                <img src={A(img)} alt="" style={{ width: 48, height: 48, borderRadius: 14, objectFit: 'cover' }} />
                <div className="col grow" style={{ gap: 2, color: on[i] ? undefined : 'var(--ink-500)' }}>
                  <span className="t-body-ms">{n}</span>
                  <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{cat} | AI {rp(a)}–{rp(b)}</span>
                </div>
              </label>
            ))}
          </div>
          <button onClick={() => openCam(d, go, 'pindahan')} className="row" style={{ gap: 8, padding: 14, justifyContent: 'center', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--primary-200)' }}>
            <Img src="ic-plus-indigo.svg" size={18} /><span className="t-label-m" style={{ color: 'var(--primary-500)' }}>Tambah barang</span>
          </button>
          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Jenis tawaran</span>
            <div className="row" style={{ gap: 4, padding: 4, borderRadius: 'var(--radius-md)', background: 'var(--line-100)' }}>
              {([['borongan', 'Tawaran borongan'], ['per', 'Per barang']] as const).map(([k, t]) => (
                <button key={k} onClick={() => setMode(k)} className="row grow t-label-m"
                  style={{ height: 40, justifyContent: 'center', borderRadius: 'var(--radius-sm)', background: mode === k ? '#fff' : 'transparent', color: mode === k ? 'var(--ink-900)' : 'var(--ink-500)', boxShadow: mode === k ? 'var(--elev-1)' : 'none' }}>{t}</button>
              ))}
            </div>
          </div>
          <div className="row t-body-ms nowrap" style={{ justifyContent: 'space-between' }}>
            <span>{picked.length} barang dipilih</span>
            <span style={{ color: 'var(--amber-700)' }}>Estimasi AI {rp(lo)}–{rp(hi)}</span>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} disabled={!picked.length}
          onClick={() => { d({ type: 'startSession', scenario: 'borongan' }); go('sesi', { root: true }) }}>
          <Img src="ic-clock-white.svg" size={20} />Mulai Sesi Ketuk 60 Menit
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
