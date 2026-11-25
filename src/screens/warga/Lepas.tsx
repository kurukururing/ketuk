import { useState } from 'react'
import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

/** Figma: D3 Lepas Gratis + Jemput (25:1798) → Lepas gratis → E1 Harga Terkunci & Status */
export default function Lepas() {
  const { d, go } = useStore()
  const [slot, setSlot] = useState(0)
  return (
    <div className="screen">
      <AppBar ink title="Lepas Gratis + Jemput" trailing={<button className="icon-btn" onClick={() => go('bantuan')}><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 14, padding: 18, borderRadius: 'var(--radius-xl)', background: 'var(--amber-100)' }}>
            <img src={A('photo-kardus.jpg')} alt="" style={{ width: 84, height: 84, borderRadius: 14, objectFit: 'cover' }} />
            <div className="col grow" style={{ gap: 6 }}>
              <span className="t-overline" style={{ color: 'var(--amber-700)' }}>Barangmu</span>
              <span className="t-h3">Kardus bekas 12 kg</span>
              <span className="tag tag-neutral" style={{ alignSelf: 'flex-start' }}><Img src="ic-clock-ink14.svg" size={14} />Sesi berakhir tanpa tawaran</span>
            </div>
          </div>
          <div className="col" style={{ gap: 14, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <span className="t-body-ms">Bagaimana cara kerjanya?</span>
            {['Pengepul terdekat menjemput tanpa membayar barang', 'Kamu tidak dikenai biaya jasa jemput', 'Barang tetap tersalurkan ke jalur daur ulang'].map((t, i) => (
              <div key={t} className="row" style={{ gap: 12 }}>
                <div className="row t-label-s" style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--primary-100)', color: 'var(--primary-500)', justifyContent: 'center', flex: 'none' }}>{i + 1}</div>
                <span className="t-body-m grow">{t}</span>
              </div>
            ))}
          </div>
          <div className="row nowrap" style={{ gap: 10 }}>
            <div className="col grow" style={{ gap: 2, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--line-100)', color: 'var(--ink-500)' }}>
              <span className="t-body-s">Jasa jemput biasa</span>
              <span className="t-num-m" style={{ textDecoration: 'line-through' }}>Rp20.000</span>
            </div>
            <div className="col grow" style={{ gap: 2, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--primary-900)' }}>
              <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>Lewat KETUK</span>
              <span className="t-num-m" style={{ color: 'var(--amber-500)' }}>Gratis</span>
            </div>
          </div>
          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Jendela jemput</span>
            <div className="row" style={{ gap: 8 }}>
              {['Besok 08–11', 'Besok 13–16'].map((c, i) => <button key={c} className={`chip${slot === i ? ' on' : ''}`} onClick={() => setSlot(i)}>{c}</button>)}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }}
          onClick={() => { d({ type: 'demoState', scenario: 'kardus', phase: 'won' }); go('terkunci', { root: true }) }}>
          <Img src="ic-gift-white.svg" size={20} />Lepas Gratis + Jemput
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
