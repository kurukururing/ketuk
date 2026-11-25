import { useStore } from '../../store'
import { Img, StatusBar, AppBar, CountdownRing } from '../../ui'

/** Figma: D2 Sesi Tanpa Tawaran (24:1987) */
export default function SesiKosong() {
  const { go } = useStore()
  const opts: [string, string, string, string, () => void, boolean][] = [
    ['ic-refresh-indigo.svg', 'var(--primary-100)', 'Perluas radius ke 5 km', 'Sesi diperpanjang 30 menit, gratis', () => go('sesi-saya', { replace: true }), true],
    ['ic-gift-amber.svg', 'var(--amber-100)', 'Lepas Gratis + Jemput', 'Barang dijemput tanpa biaya, tetap tersalurkan', () => go('lepas'), false],
    ['ic-edit-ink.svg', 'var(--line-100)', 'Ubah foto & detail', 'Tambah foto sisi rusak agar AI lebih yakin', () => go('detail'), false],
  ]
  return (
    <div className="screen">
      <AppBar ink title="Sesi Ketuk" trailing={<button className="icon-btn" onClick={() => go('bantuan')}><Img src="ic-help.svg" size={20} /></button>} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="col" style={{ gap: 10, padding: 22, alignItems: 'center', textAlign: 'center', borderRadius: 'var(--radius-xl)', background: 'var(--primary-900)' }}>
          <CountdownRing size={140} remaining={0} variant="large" label="sesi berakhir" />
          <span className="t-h2" style={{ color: '#fff' }}>Belum ada tawaran</span>
          <span className="t-body-m" style={{ color: 'var(--primary-200)' }}>Kardus bekas 12 kg | pengepul di radius 3 km sedang penuh jadwal.</span>
        </div>
        <span className="t-body-ms">Pilih langkah berikutnya</span>
        {opts.map(([ic, bg, t, sub, on, sel]) => (
          <button key={t} onClick={on} className="row" style={{ gap: 12, padding: 14, textAlign: 'left', borderRadius: 'var(--radius-lg)', background: '#fff', border: sel ? '2px solid var(--primary-500)' : '1px solid var(--line-200)' }}>
            <div className="row" style={{ width: 44, height: 44, borderRadius: 12, background: bg, justifyContent: 'center' }}><Img src={ic} size={22} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">{t}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{sub}</span>
            </div>
            <Img src="ic-chevron-right.svg" size={20} />
          </button>
        ))}
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => go('sesi-saya', { replace: true })}>
          <Img src="ic-refresh-white.svg" size={20} />Perluas Radius +30 Menit
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
