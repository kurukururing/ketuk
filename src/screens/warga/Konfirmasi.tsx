import { motion } from 'framer-motion'
import { useStore, rp } from '../../store'
import { Img } from '../../ui'
import Sesi from './Sesi'

/** Figma: B2 Konfirmasi Ketuk Palu (10:714) — bottom sheet over the live Sesi Ketuk */
export default function Konfirmasi() {
  const { s, d, go, back } = useStore()
  const o = s.session.offers.find(x => x.id === s.session.selected) ?? s.session.offers[0]
  if (!o) return <Sesi />
  const others = s.session.offers.length - 1
  return (
    <div className="screen fit">
      <div style={{ pointerEvents: 'none' }}><Sesi /></div>
      <motion.button aria-label="Batal" onClick={back} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fix" style={{ inset: 0, background: 'rgba(21,20,43,0.6)', zIndex: 40 }} />
      <motion.div initial={{ y: 480 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="fix col" style={{ left: 0, bottom: 0, width: 390, zIndex: 41, background: 'var(--surface)', borderRadius: '28px 28px 0 0', padding: '12px 24px 34px', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: 'var(--line-200)' }} />
        <motion.div initial={{ rotate: -30, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.15 }}
          className="row" style={{ width: 76, height: 76, borderRadius: 999, background: 'var(--amber-500)', justifyContent: 'center', boxShadow: '0 10px 24px -4px rgba(245,166,36,0.35)' }}>
          <Img src="ic-gavel-ink-36.svg" size={36} />
        </motion.div>
        <span className="t-h2" style={{ textAlign: 'center' }}>Ketuk palu untuk {rp(o.price)}?</span>
        <span className="t-body-m" style={{ textAlign: 'center', color: 'var(--ink-500)' }}>
          <b style={{ color: 'var(--ink-900)' }}>{o.name}</b> | {o.pickup.toLowerCase().replace('jemput', 'jemput hari ini')} | Skor Tepat Harga {o.score}%
        </span>
        <div className="row" style={{ width: '100%', gap: 12, padding: 14, alignItems: 'flex-start', borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
          <Img src="ic-lock-indigo.svg" size={22} />
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms" style={{ color: 'var(--primary-900)' }}>Harga ini terkunci. Koreksi hanya dengan bukti foto.</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{others} tawaran lain otomatis ditutup.</span>
          </div>
        </div>
        <button className="btn btn-accent" onClick={() => { d({ type: 'ketukPalu', id: o.id }); go('berhasil', { root: true }) }}>
          <Img src="ic-gavel-ink.svg" size={20} />Ketuk Palu
        </button>
        <button className="btn" style={{ border: '1.5px solid var(--line-200)' }} onClick={back}>Batal</button>
      </motion.div>
    </div>
  )
}
