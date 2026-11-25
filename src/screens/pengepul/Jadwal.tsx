import { useStore, ITEM, rp } from '../../store'
import { A, Img, StatusBar, BottomNavPengepul } from '../../ui'

/** Figma: D1 Jadwal Jemput Hari Ini (38:2898) — Terkirim/Lihat Tawaranku → here → Navigasi */
export default function Jadwal() {
  const { s, go } = useStore()
  const price = s.finalPrice ?? s.session.offers.find(o => o.id === 'ps')?.price ?? 38000
  const done = s.session.status === 'done'
  const pts = (inset: string, src: string) => (
    <div className="abs" style={{ inset }}><img src={A(src)} alt="" style={{ position: 'absolute', inset: '-9.38%', width: '118.76%', height: '118.76%' }} /></div>
  )
  return (
    <div className="screen">
      <div className="abs col nowrap" style={{ left: 24, top: 60, gap: 2 }}>
        <span className="t-h1" style={{ letterSpacing: -0.39 }}>Jemput Hari Ini</span>
        <span className="t-body-m" style={{ color: 'var(--ink-500)' }}>Sabtu, 1 Nov | 3 titik | 2 terkunci</span>
      </div>
      <div className="abs col" style={{ left: 24, top: 128, width: 342, padding: 16, gap: 12, borderRadius: 24, background: 'var(--primary-900)' }}>
        <div style={{ position: 'relative', height: 96, overflow: 'hidden' }}>
          <img src={A('rute-bg1.svg')} alt="" className="abs" style={{ inset: 0, width: '100%', height: '100%' }} />
          <img src={A('rute-bg2.svg')} alt="" className="abs" style={{ inset: 0, width: '100%', height: '100%' }} />
          <div className="abs" style={{ inset: '27.08% 9.68%' }}><img src={A('rute-line.svg')} alt="" style={{ position: 'absolute', inset: '-4.55% -0.8%', width: '101.6%', height: '109.1%' }} /></div>
          {pts('64.58% 87.74% 18.75% 7.1%', 'rute-p1.svg')}
          {pts('27.08% 49.03% 56.25% 45.81%', 'rute-p2.svg')}
          {pts('18.75% 7.1% 64.58% 87.74%', 'rute-p3.svg')}
        </div>
        <div className="row nowrap" style={{ gap: 8 }}>
          {[['3 titik', 'hari ini'], ['7,4 km', 'total rute'], ['±70 mnt', 'estimasi']].map(([a, b]) => (
            <div key={a} className="col grow"><span className="t-body-ms" style={{ color: '#fff' }}>{a}</span><span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{b}</span></div>
          ))}
        </div>
      </div>

      <div className="abs col" style={{ left: 0, top: 330, width: 390, padding: '0 24px', gap: 10 }}>
        <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <div className="row t-label-s" style={{ width: 56, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--line-100)', justifyContent: 'center', color: 'var(--ink-700)' }}>15.30</div>
          <div className="col grow" style={{ gap: 2, color: 'var(--ink-500)' }}>
            <span className="t-body-ms">Kardus bekas 12 kg</span>
            <span className="t-body-s">Bu Sri | Medokan Ayu | Rp27.000 dibayar</span>
          </div>
          <span className="tag tag-indigo"><Img src="ic-check-indigo14.svg" size={14} />Selesai</span>
        </div>

        <div className="col" style={{ gap: 10, padding: 14, borderRadius: 'var(--radius-lg)', background: '#fff', border: done ? 'none' : '2px solid var(--amber-500)', boxShadow: 'var(--elev-1)' }}>
          <div className="row" style={{ gap: 12 }}>
            <div className="row t-label-s" style={{ width: 56, height: 40, borderRadius: 'var(--radius-sm)', background: done ? 'var(--line-100)' : 'var(--amber-500)', justifyContent: 'center' }}>16.00</div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">{ITEM.name}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{ITEM.warga} | Rungkut Asri | {rp(price)} {done ? 'dibayar' : 'terkunci'}</span>
            </div>
            {done
              ? <span className="tag tag-indigo"><Img src="ic-check-indigo14.svg" size={14} />Selesai</span>
              : <span className="tag tag-amber"><Img src="ic-clock-amber.svg" size={14} />Berikutnya</span>}
          </div>
          {!done && (
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn-primary btn-m grow" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => go('navigasi')}>
                <Img src="ic-nav-white.svg" size={20} />Navigasi
              </button>
              <button className="btn btn-m" style={{ background: 'var(--primary-100)', color: 'var(--primary-500)' }} onClick={() => go('chat')}>
                <Img src="ic-chat-indigo20.svg" size={20} />Chat
              </button>
            </div>
          )}
        </div>

        <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <div className="row t-label-s" style={{ width: 56, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--line-100)', justifyContent: 'center', color: 'var(--ink-700)' }}>17.00</div>
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms">Rak besi 3 susun</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Pak Anwar | Penjaringan | Rp52.000 terkunci</span>
          </div>
          <span className="tag tag-neutral">{done ? 'Berikutnya' : 'Nanti'}</span>
        </div>
      </div>
      <BottomNavPengepul active="jemput" />
      <StatusBar />
    </div>
  )
}
