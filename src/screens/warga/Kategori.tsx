import { useState } from 'react'
import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

const CATS: [string, string, string, string, 'illo' | 'icon'][] = [
  ['Elektronik', 'Kipas, TV, dispenser', 'illo-kipas.svg', 'var(--primary-50)', 'illo'],
  ['Perabot', 'Kasur, lemari, kursi', 'illo-perabot.svg', 'var(--primary-50)', 'illo'],
  ['Kardus & kertas', 'Kardus, koran, buku', 'illo-kardus.svg', 'var(--amber-100)', 'illo'],
  ['Logam', 'Besi, kaleng, panci', 'illo-logam.svg', 'var(--primary-50)', 'illo'],
  ['Pakaian', 'Layak pakai & kain', 'illo-baju.svg', 'var(--primary-50)', 'illo'],
  ['E-waste berbaterai', 'HP, powerbank, laptop', 'ic-battery-amber.svg', 'var(--amber-100)', 'icon'],
  ['Plastik', 'Botol, ember, galon', 'ic-box-ink.svg', 'var(--line-100)', 'icon'],
  ['Lainnya', 'Tulis sendiri', 'ic-plus-ink.svg', 'var(--line-100)', 'icon'],
]

/** Figma: B2 Ubah Kategori (24:1585) / C1 Ubah Kategori (247:4770, 254:5756) — Simpan → Detail */
export default function Kategori() {
  const { s, d, go, back } = useStore()
  const [sel, setSel] = useState('Elektronik')
  const [q, setQ] = useState('')
  const list = CATS.filter(c => !q || (c[0] + c[1]).toLowerCase().includes(q.toLowerCase()))
  // Figma: from the camera, Simpan → Detail. From Detail's Edit: B2 → back to Detail, C1 (247:4770) → C1 Foto Blur.
  const fromEdit = s.v.katFrom === 'edit'
  const save = () => {
    d({ type: 'set', v: { katFrom: '' } })
    if (s.scenario === 'dispenser') { d({ type: 'set', v: { detail: fromEdit ? 'blur' : 'ok' } }); fromEdit ? back() : go('detail', { replace: true }) }
    else fromEdit ? back() : go('detail', { replace: true })
  }
  return (
    <div className="screen fit">
      <AppBar title="Ubah Kategori" />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 12, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
            <div className="row" style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: '#fff', justifyContent: 'center' }}><Img src="ic-spark-indigo.svg" size={18} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">AI mendeteksi: Elektronik</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Keyakinan 91% | dari foto sisi depan</span>
            </div>
          </div>
          <label className="col" style={{ gap: 8 }}>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Cari kategori</span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Contoh: Buku" className="t-body-l"
              style={{ height: 54, padding: '0 16px', borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--line-200)', outline: 0 }} />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {list.map(([t, sub, ic, bg, kind]) => (
              <button key={t} onClick={() => setSel(t)} className="row"
                style={{ gap: 10, padding: 12, textAlign: 'left', borderRadius: 'var(--radius-lg)', background: '#fff', border: sel === t ? '2px solid var(--primary-500)' : '1px solid var(--line-200)' }}>
                <div className="row" style={{ width: 44, height: 44, borderRadius: kind === 'illo' ? 'var(--radius-md)' : 12, background: bg, justifyContent: 'center', flex: 'none' }}>
                  <img src={A(ic)} alt="" style={kind === 'illo' ? { width: 34.8, height: 34.8 } : { width: 22, height: 22 }} />
                </div>
                <div className="col grow" style={{ gap: 2 }}>
                  <span className="t-body-ms">{t}</span>
                  <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{sub}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={save}>
          <Img src="ic-check-white-20.svg" size={20} />Simpan Kategori
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
