import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, ITEM, rp } from '../../store'
import { A, Img, StatusBar, Avatar, ItemPhoto } from '../../ui'

const TRIP = 6 // seconds; mirrors "6 menit"

/** Figma: D1 Navigasi ke Lokasi (38:3038) — truck drives the route; "Saya Sudah Tiba" → Serah Terima Pengepul */
export default function Navigasi() {
  const { s, d, go, back } = useStore()
  const [min, setMin] = useState(6)
  useEffect(() => {
    const t0 = Date.now()
    const id = setInterval(() => {
      const p = (Date.now() - t0) / 1000 / TRIP
      setMin(Math.max(0, Math.ceil(6 * (1 - p))))
      if (p >= 1) clearInterval(id)
    }, 250)
    return () => clearInterval(id)
  }, [])
  const price = s.finalPrice ?? 38000
  return (
    <div className="screen">
      <img src={A('peta-navigasi.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 390, height: 844 }} />
      <div className="abs row" style={{ left: 242, top: 272, width: 44, height: 44, borderRadius: 999, background: 'var(--amber-500)', border: '3px solid #fff', justifyContent: 'center' }}>
        <Img src="ic-house-ink.svg" size={22} />
      </div>
      <motion.div className="abs row" style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--primary-500)', border: '3px solid #fff', justifyContent: 'center', zIndex: 2 }}
        initial={{ left: 124, top: 498 }} animate={{ left: [124, 124, 242, 242], top: [498, 474, 474, 318] }} transition={{ duration: TRIP, times: [0, 0.12, 0.6, 1], ease: 'linear' }}>
        <Img src="ic-truck-white22.svg" size={22} />
      </motion.div>

      <button onClick={back} aria-label="Kembali" className="abs row" style={{ left: 24, top: 58, width: 48, height: 48, borderRadius: 999, background: '#fff', justifyContent: 'center', boxShadow: 'var(--elev-2)' }}>
        <Img src="ic-chevron-left-ink.svg" size={20} />
      </button>
      <div className="abs row" style={{ left: 84, top: 54, width: 282, padding: 14, gap: 12, borderRadius: 'var(--radius-lg)', background: 'var(--primary-900)', boxShadow: 'var(--elev-2)' }}>
        <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--amber-500)', justifyContent: 'center' }}><Img src="ic-nav-ink.svg" size={20} /></div>
        <div className="col grow" style={{ gap: 2 }}>
          <span className="t-body-ms" style={{ color: '#fff' }}>{min > 0 ? 'Belok kiri ke Jl. Rungkut Asri' : 'Kamu sudah sampai'}</span>
          <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{min > 0 ? '350 m | tiba 15.58' : 'Rungkut Asri Tengah 12 | pagar hitam'}</span>
        </div>
      </div>

      <div className="abs col" style={{ left: 0, top: 531, width: 390, padding: '12px 24px 34px', gap: 14, borderRadius: '28px 28px 0 0', background: '#fff', boxShadow: 'var(--elev-2)', zIndex: 3 }}>
        <div className="row" style={{ justifyContent: 'center' }}><div style={{ width: 40, height: 5, borderRadius: 3, background: 'var(--line-200)' }} /></div>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="t-num-l nowrap">{min > 0 ? `${min} menit` : 'Tiba'}</span>
          <span className="tag tag-amber"><Img src="ic-clock-amber.svg" size={14} />1,1 km | 15.58</span>
        </div>
        <div className="row" style={{ gap: 12 }}>
          <Avatar initials="R" tone="amber" />
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms">{ITEM.warga}</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{ITEM.address} | pagar hitam</span>
          </div>
          <button onClick={() => go('chat')} className="row" style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}><Img src="ic-chat-indigo.svg" size={20} /></button>
          <button onClick={() => go('chat')} className="row" style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}><Img src="ic-call-indigo.svg" size={20} /></button>
        </div>
        <div className="row" style={{ gap: 12, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)' }}>
          <ItemPhoto size={44} />
          <span className="t-body-ms grow">{ITEM.name}</span>
          <span className="tag tag-indigo"><Img src="ic-lock-indigo14.svg" size={14} />{rp(price)}</span>
        </div>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => { d({ type: 'arrive' }); go('cek') }}>
          <Img src="ic-pin-white20.svg" size={20} />Saya Sudah Tiba
        </button>
      </div>
      <StatusBar />
    </div>
  )
}
