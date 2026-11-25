import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, ITEM, rp } from '../../store'
import { A, Img, StatusBar, AppBar, TimelineStep, PengepulCard } from '../../ui'

const TRAVEL = 7 // seconds for the truck to reach the warga on the map

/** Figma: E1 Harga Terkunci & Status (13:573) — truck travels the route, then "Pak Slamet sudah tiba" */
export default function Terkunci() {
  const { s, d, go } = useStore()
  const arrived = s.arrived
  const [eta, setEta] = useState(12)
  useEffect(() => {
    if (s.arrived) return
    const t0 = Date.now()
    const id = setInterval(() => {
      const p = (Date.now() - t0) / 1000 / TRAVEL
      setEta(Math.max(0, Math.ceil(12 * (1 - p))))
      if (p >= 1) { d({ type: 'arrive' }); clearInterval(id) }
    }, 200)
    return () => clearInterval(id)
  }, []) // eslint-disable-line
  const price = s.finalPrice ?? 38000

  return (
    <div className="screen">
      <AppBar ink title="Status Penjemputan" onBack={() => go('beranda', { root: true })}
        trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />

      <div className="scroll" style={{ top: 116, bottom: 0 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          {/* Harga Terkunci */}
          <div className="col" style={{ background: 'var(--primary-900)', borderRadius: 'var(--radius-xl)', padding: 20, gap: 8 }}>
            <div className="row" style={{ gap: 12 }}>
              <motion.img src={A('3d-gembok.png')} alt="" style={{ width: 52, height: 52, objectFit: 'cover' }}
                initial={{ rotate: -12, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 10 }} />
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-overline" style={{ color: 'var(--amber-500)' }}>Harga Terkunci</span>
                <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{ITEM.name} | ketuk palu 15.21</span>
              </div>
            </div>
            <span className="t-num-xl nowrap" style={{ color: '#fff' }}>{rp(price)}</span>
            <span className="row t-label-s nowrap" style={{ alignSelf: 'flex-start', gap: 4, padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.16)', color: '#fff' }}>
              <Img src="ic-shield-white.svg" size={14} />Tidak bisa ditawar ulang saat jemput
            </span>
          </div>

          {/* Peta */}
          <div style={{ position: 'relative', height: 140, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#fff' }}>
            <img src={A('map-art.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 342, height: 140 }} />
            <motion.div className="abs row" style={{ left: 28, top: 52, width: 32, height: 32, borderRadius: 999, background: 'var(--primary-500)', border: '3px solid #fff', justifyContent: 'center' }}
              initial={arrived ? { x: 229, y: 0 } : undefined}
              animate={arrived ? { x: 229, y: 0 } : { x: [0, 53, 53, 165, 165, 229], y: [0, 0, -34, -34, 0, 0] }}
              transition={{ duration: TRAVEL, times: [0, 0.12, 0.2, 0.62, 0.7, 1], ease: 'linear' }}>
              <Img src="ic-truck-white.svg" size={16} />
            </motion.div>
            <div className="abs row" style={{ left: 12, top: 96, gap: 6, padding: '6px 12px 6px 8px', borderRadius: 999, background: arrived ? 'var(--amber-100)' : '#fff', boxShadow: 'var(--elev-2)' }}>
              <Img src="ic-clock-amber16.svg" size={16} />
              <span className="t-label-s nowrap">{arrived ? 'Pak Slamet sudah tiba' : `Pak Slamet | ${eta} menit lagi`}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="col" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
            <TimelineStep state="done" title="Ketuk palu" meta={`15.21 | ${rp(price)} terkunci`} />
            <TimelineStep state={arrived ? 'done' : 'current'} title={arrived ? 'Pengepul tiba' : 'Pengepul menuju lokasi'} meta={arrived ? 'Tiba 15.58 | 2 menit lebih awal' : 'Estimasi tiba 16.00'} />
            <TimelineStep state={arrived ? 'current' : 'upcoming'} title="Serah terima" meta="Cocokkan barang dengan foto" />
            <TimelineStep state="upcoming" title="Selesai" meta="Pembayaran diterima" line={false} />
          </div>

          <PengepulCard onChat={() => go('chat')} />
        </div>
      </div>

      <StatusBar bg="var(--surface)" />
    </div>
  )
}
