import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

/** Figma: B2 Jalur E-waste Aman (24:1741) / C1 (247:4784) — Mengerti, Lanjutkan → Detail */
export default function Ewaste() {
  const { go } = useStore()
  return (
    <div className="screen fit">
      <AppBar title="Jalur E-waste Aman" bg="transparent" trailing={<button className="icon-btn" onClick={() => go('bantuan')}><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="col" style={{ gap: 10, padding: 20, borderRadius: 'var(--radius-xl)', background: 'var(--primary-900)' }}>
            <img src={A('3d-baterai.png')} alt="" style={{ width: 72, height: 72, objectFit: 'cover' }} />
            <span className="t-h2" style={{ color: '#fff' }}>Barang berbaterai butuh jalur khusus</span>
            <span className="t-body-m" style={{ color: 'var(--primary-200)' }}>HP rusak, powerbank, atau elektronik berbaterai hanya ditawar pengepul berlencana E-waste Aman.</span>
            <span className="row t-label-s nowrap" style={{ alignSelf: 'flex-start', gap: 4, padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.16)', color: '#fff' }}>
              <Img src="ic-shield-white.svg" size={14} />8 pengepul E-waste Aman di radius 3 km
            </span>
          </div>
          <div className="col" style={{ gap: 12, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <span className="t-body-ms">Kenapa penting?</span>
            {['Baterai tidak dibongkar sembarangan di lapak', 'Disalurkan ke pengolah e-waste berizin', 'Kamu dapat bukti serah terima digital'].map(t => (
              <div key={t} className="row" style={{ gap: 10 }}><Img src="ic-check-circle-indigo.svg" size={20} /><span className="t-body-m grow">{t}</span></div>
            ))}
          </div>
          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Contoh barang</span>
            <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
              {['HP rusak', 'Powerbank', 'Laptop', 'Lampu LED', 'Mainan baterai'].map(c => <span key={c} className="chip on">{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => go('detail', { replace: true })}>
          <Img src="ic-arrow-right-white.svg" size={20} />Mengerti, Lanjutkan
        </button>
      </div>
      <StatusBar />
    </div>
  )
}
