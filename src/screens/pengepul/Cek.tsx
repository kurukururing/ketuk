import { useStore, rp, PAK_SLAMET } from '../../store'
import { Img, StatusBar, AppBar, ItemPhoto } from '../../ui'

/** Figma: D1 Serah Terima Pengepul (15:1274) — "Cocokkan Barang" */
export default function Cek() {
  const { s, d, go } = useStore()
  const price = s.finalPrice ?? PAK_SLAMET.price
  return (
    <div className="screen">
      <AppBar ink title="Cocokkan Barang" onBack={() => go('radar', { root: true })} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <span className="t-body-m" style={{ color: 'var(--ink-500)' }}>Bandingkan barang di lokasi dengan foto saat warga memasang.</span>
        <ItemPhoto size={118} style={{ width: 166 }} />
        <div className="col" style={{ gap: 10, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          {['Bentuk & warna sesuai foto', 'Masih menyala, sudah dites di lokasi'].map(t => (
            <div key={t} className="row" style={{ gap: 10 }}><Img src="ic-check-circle-indigo.svg" size={22} /><span className="t-body-m grow">{t}</span></div>
          ))}
        </div>
        <div className="row" style={{ gap: 12, padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--primary-900)' }}>
          <div className="row" style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--amber-500)', justifyContent: 'center' }}><Img src="ic-lock-ink24.svg" size={20} /></div>
          <div className="col grow nowrap">
            <span className="t-overline" style={{ color: 'var(--amber-500)' }}>Harga Terkunci</span>
            <span className="t-num-l" style={{ color: '#fff' }}>{rp(price)}</span>
          </div>
          <span className="tag tag-glass">Ketuk palu 15.21</span>
        </div>
      </div>
      <div className="bottom-bar" style={{ height: 166 }}>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }}
          onClick={() => { d({ type: 'complete' }); go('bayar', { root: true }) }}>
          <Img src="ic-check-white-20.svg" size={20} />Barang sesuai, bayar {rp(price)}
        </button>
        <button className="btn btn-danger" onClick={() => go('ajukan-koreksi')}>
          <Img src="ic-camera-coral.svg" size={20} />Ajukan Koreksi Berbukti
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
