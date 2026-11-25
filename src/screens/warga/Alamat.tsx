import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

/** Figma: A6 Alamat Jemput (23:1600) → Simpan Alamat → B1 Beranda */
export default function Alamat() {
  const { s, go, back } = useStore()
  const [label, setLabel] = useState('Rumah')
  const [q, setQ] = useState('')
  return (
    <div className="screen">
      <img src={A('masuk-ellipse1.svg')} alt="" className="abs" style={{ left: -221, top: -561, width: 883, height: 883 }} />
      <img src={A('masuk-ellipse2.svg')} alt="" className="abs" style={{ left: -466, top: 473, width: 883, height: 883 }} />
      <AppBar ink title="Alamat Jemput" bg="transparent" trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <div style={{ position: 'relative', height: 210, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#fff' }}>
          <img src={A('map-art-alamat.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 342, height: 210 }} />
          <motion.div className="abs row" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.2 }}
            style={{ left: 149, top: 80, width: 44, height: 44, borderRadius: 999, background: 'var(--amber-500)', border: '3px solid #fff', justifyContent: 'center' }}>
            <Img src="ic-house-ink.svg" size={22} />
          </motion.div>
          <div className="abs row" style={{ left: 12, top: 168, gap: 6, padding: '6px 12px 6px 10px', borderRadius: 999, background: '#fff' }}>
            <Img src="ic-map-ink.svg" size={14} /><span className="t-label-s nowrap" style={{ color: 'var(--ink-700)' }}>Geser peta untuk menyesuaikan titik</span>
          </div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          {['Rumah', 'Kos', 'Kantor'].map(c => <button key={c} className={`chip${label === c ? ' on' : ''}`} onClick={() => setLabel(c)}>{c}</button>)}
        </div>
        <label className="col" style={{ gap: 8 }}>
          <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Cari alamat</span>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Contoh: Rungkut Asri" className="t-body-l"
            style={{ height: 54, padding: '0 16px', borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--line-200)', outline: 0 }} />
        </label>
        <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <div className="row" style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--primary-100)', justifyContent: 'center' }}><Img src="ic-pin-indigo.svg" size={20} /></div>
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms">Jl. Rungkut Asri Tengah No. 12</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Rungkut, Surabaya 60293 | patokan pagar hitam</span>
          </div>
          <Img src="ic-edit-indigo18.svg" size={18} />
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Img src="ic-lock-indigo18.svg" size={18} />
          <span className="t-body-s grow" style={{ color: 'var(--ink-700)' }}>Alamat lengkap hanya terlihat oleh pengepul setelah Ketuk Palu.</span>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => (s.warga.includes('akun') ? back() : go('beranda', { root: true }))}>
          <Img src="ic-check-white-20.svg" size={20} />Simpan Alamat
        </button>
      </div>
      <StatusBar />
    </div>
  )
}
