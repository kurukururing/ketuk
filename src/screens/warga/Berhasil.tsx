import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore, ITEM, rp } from '../../store'
import { A, Img, StatusBar } from '../../ui'
import { tok } from '../../sound'

const RINGS: [string, number, number, number][] = [
  ['berhasil-ring1.svg', -115, -60, 620], ['berhasil-ring2.svg', -35, 20, 460],
  ['berhasil-ring3.svg', 35, 90, 320], ['berhasil-ring4.svg', 95, 150, 200],
]

/** Figma: B2 Ketuk Palu Berhasil (24:1935) */
export default function Berhasil() {
  const { s, go } = useStore()
  const o = s.session.offers.find(x => x.id === s.session.winner)
  useEffect(() => { const id = setTimeout(() => tok(2), 380); return () => clearTimeout(id) }, [])
  if (!o) return null
  const others = s.session.offers.length - 1
  const rows: [string, string][] = [
    ['Pengepul', `${o.name} | skor ${o.score}%`],
    ['Jemput', o.pickup.replace('Jemput', 'Hari ini')],
    ['Koreksi', 'Hanya dengan bukti foto'],
    ['Tawaran lain', `${others} otomatis ditutup`],
  ]
  return (
    <div className="screen" style={{ background: 'var(--primary-900)' }}>
      {/* Hero shrinks and moves up on short phones so it clears the pinned buttons */}
      <div className="abs" style={{ inset: 0, transformOrigin: '50% 0', transform: 'translateY(calc(var(--short, 0px) * 0.55)) scale(calc(1 + var(--shortn, 0) / 900))' }}>
        {RINGS.map(([src, l, t, sz], i) => (
          <motion.img key={src} src={A(src)} alt="" className="abs" style={{ left: l, top: t, width: sz, height: sz }}
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.45 + (3 - i) * 0.07, duration: 0.6, ease: 'easeOut' }} />
        ))}
        <motion.img src={A('3d-palu.png')} alt="" className="abs" style={{ left: 53, top: 50, width: 302, height: 302, objectFit: 'cover', transformOrigin: '30% 80%' }}
          initial={{ rotate: -38, y: -30, opacity: 0 }}
          animate={{ rotate: [-38, 6, 0], y: [-30, 4, 0], opacity: 1 }}
          transition={{ duration: 0.55, times: [0, 0.65, 1], ease: 'easeIn' }} />

        <motion.div className="abs col" style={{ left: 24, top: 344, width: 342, gap: 10, alignItems: 'center', textAlign: 'center' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <span className="t-overline" style={{ color: 'var(--amber-500)' }}>Tok! Ketuk Palu berhasil</span>
          <span className="t-h1" style={{ color: '#fff', letterSpacing: -0.39 }}>Harga terkunci {rp(o.price)}</span>
          <span className="t-body-l" style={{ color: 'var(--primary-200)' }}>
            {o.name} akan menjemput {ITEM.name.toLowerCase()} {o.pickup.startsWith('Jemput') ? 'hari ini' : 'besok'} pukul {o.pickup.split(' ').at(-1)}.
          </span>
        </motion.div>

        <motion.div className="abs col" style={{ left: 24, top: 500, width: 342, padding: 18, gap: 12, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          {rows.map(([k, v]) => (
            <div key={k} className="row nowrap" style={{ justifyContent: 'space-between' }}>
              <span className="t-body-m" style={{ color: 'var(--primary-200)' }}>{k}</span>
              <span className="t-body-ms" style={{ color: '#fff' }}>{v}</span>
            </div>
          ))}
        </motion.div>

      </div>
      <div className="fix col" style={{ left: 24, bottom: 52, width: 342, gap: 12, alignItems: 'center' }}>
        <button className="btn btn-inverse" onClick={() => go('terkunci', { root: true })}>
          <Img src="ic-truck-indigo900.svg" size={20} />Lihat Status Penjemputan
        </button>
        <button className="t-label-m" style={{ color: 'var(--primary-200)' }} onClick={() => go('beranda', { root: true })}>Kembali ke Beranda</button>
      </div>
      <StatusBar inverse />
    </div>
  )
}
