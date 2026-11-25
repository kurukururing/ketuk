import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore, ITEM, rp, mmss, PAK_SLAMET } from '../../store'
import { A, Img, StatusBar, BottomNavPengepul } from '../../ui'

function useCountdown(start: number) {
  const [t, setT] = useState(start)
  useEffect(() => { const id = setInterval(() => setT(x => Math.max(0, x - 1)), 1000); return () => clearInterval(id) }, [])
  return t
}

function RadarCard({ photo, title, meta, ai, sisa, extra, onClick, highlight }: {
  photo: string; title: string; meta: string; ai: string; sisa: number; extra: React.ReactNode; onClick?: () => void; highlight?: boolean
}) {
  return (
    <motion.button layout onClick={onClick} initial={{ opacity: 0, y: -20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      className="card row" style={{ width: '100%', gap: 12, padding: 12, textAlign: 'left', cursor: onClick ? 'pointer' : 'default', outline: highlight ? '2px solid var(--amber-500)' : 'none' }}>
      <img src={photo} alt="" style={{ width: 88, height: 88, borderRadius: 14, objectFit: 'cover', flex: 'none' }} />
      <div className="col grow" style={{ gap: 5 }}>
        <span className="t-body-ms">{title}</span>
        <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{meta}</span>
        <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>AI <b style={{ color: 'var(--amber-700)' }}>{ai}</b></span>
        <div className="row" style={{ gap: 6 }}>
          <span className="tag tag-amber" style={{ fontVariantNumeric: 'tabular-nums' }}><Img src="ic-clock-amber.svg" size={14} />sisa {mmss(sisa)}</span>
          {extra}
        </div>
      </div>
    </motion.button>
  )
}

/** Figma: B1 Radar Barang (15:818) — the warga's live item appears here */
export default function Radar() {
  const { s, go } = useStore()
  const kardus = useCountdown(18 * 60 + 5)
  const dispenser = useCountdown(52 * 60 + 40)
  const [cat, setCat] = useState('Elektronik')
  const live = s.session.status === 'running'
  const mine = s.session.offers.find(o => o.id === PAK_SLAMET.id)

  return (
    <div className="screen">
      <img src={A('radar-header.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 390, height: 216 }} />
      <div className="abs row" style={{ left: 24, top: 58, width: 342, height: 52, justifyContent: 'space-between' }}>
        <div className="col nowrap" style={{ gap: 2 }}>
          <span className="t-h1" style={{ color: '#fff', letterSpacing: -0.39 }}>Radar Barang</span>
          <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>radius 3 km | {ITEM.area}</span>
        </div>
        <div className="row" style={{ gap: 8 }}>
          {['ic-map-white.svg', 'ic-filter-white.svg', 'ic-bell-white.svg'].map(ic => (
            <div key={ic} className="row" style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }}><Img src={ic} size={20} /></div>
          ))}
        </div>
      </div>
      <Img src="badge-dot.svg" size={9} className="abs" style={{ left: 354, top: 64 }} />

      <div className="abs row" style={{ left: 24, top: 128, width: 342, height: 60, gap: 10 }}>
        {[[live ? '13' : '12', 'barang aktif'], ['4', 'sesi < 20 menit'], ['97%', 'Skor Harga']].map(([n, l]) => (
          <div key={l} className="col grow nowrap" style={{ padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)' }}>
            <span className="t-num-m" style={{ color: '#fff' }}>{n}</span>
            <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{l}</span>
          </div>
        ))}
      </div>

      <div className="abs row" style={{ left: 24, top: 232, gap: 8 }}>
        {['Elektronik', 'Perabot', 'Kardus', 'Logam'].map(c => (
          <button key={c} className={`chip${cat === c ? ' on' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="scroll" style={{ top: 284, bottom: 97 }}>
        <div className="col" style={{ padding: '2px 24px 24px', gap: 12 }}>
          <AnimatePresence initial={false}>
            {live && (
              <RadarCard key="kipas" photo={s.photo ?? A('photo-kipas.jpg')} title={ITEM.name} meta="1,2 km | Rungkut Kidul"
                ai={`${rp(ITEM.aiLow)}–${rp(ITEM.aiHigh)}`} sisa={s.session.remaining} highlight={!mine}
                onClick={() => go(mine ? 'terkirim' : 'ajukan')}
                extra={mine
                  ? <span className="tag tag-indigo">Tawaranmu {rp(mine.price)}</span>
                  : <span className="tag tag-neutral">{s.session.offers.length} tawaran</span>} />
            )}
          </AnimatePresence>
          <RadarCard photo={A('photo-kardus.jpg')} title="Kardus bekas 12 kg" meta="0,8 km | Medokan Ayu" ai="Rp24.000–Rp30.000" sisa={kardus}
            extra={<span className="tag tag-neutral">1 tawaran</span>} />
          <RadarCard photo={A('photo-dispenser.jpg')} title="Dispenser rusak" meta="2,4 km | Penjaringan Sari" ai="Rp30.000–Rp50.000" sisa={dispenser}
            extra={<span className="tag tag-dark"><Img src="ic-battery-white.svg" size={14} />E-waste</span>} />
        </div>
      </div>

      <BottomNavPengepul active="radar" />
      <StatusBar inverse />
    </div>
  )
}
