import { motion } from 'framer-motion'
import { useStore, rp } from '../../store'
import { Img, StatusBar } from '../../ui'
import { TARIK } from './Tarik'

const CONFETTI: [number, number, number, string][] = [
  [60, 110, 10, 'var(--amber-500)'], [320, 96, 8, 'var(--coral-500)'], [300, 200, 10, 'var(--primary-500)'], [80, 220, 6, 'var(--amber-500)'],
  [140, 80, 8, 'var(--primary-200)'], [250, 70, 6, 'var(--amber-500)'], [40, 170, 6, 'var(--coral-500)'],
]

/** Figma: G1 Berhasil Tarik (95:6772) — tombol → G1 Akun Warga */
export default function TarikOk() {
  const { go } = useStore()
  return (
    <div className="screen">
      {CONFETTI.map(([x, y, s, c], i) => (
        <motion.div key={i} className="abs" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}
          style={{ left: x, top: y, width: s, height: s, borderRadius: s / 2, background: c }} />
      ))}
      <div className="abs col" style={{ left: 24, top: 86, width: 342, gap: 8, alignItems: 'center' }}>
        <motion.div className="row" initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--primary-500)', justifyContent: 'center', boxShadow: '0 12px 28px -6px rgba(61,46,209,0.35)' }}>
          <Img src="ic-check-white-48.svg" size={48} />
        </motion.div>
        <div style={{ height: 4 }} />
        <span className="t-h1" style={{ textAlign: 'center', letterSpacing: -0.39 }}>{rp(TARIK)} diterima</span>
        <span className="t-body-m" style={{ textAlign: 'center', color: 'var(--ink-500)' }}>Transaksi selesai tanpa koreksi. Terima kasih sudah memilah!</span>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" onClick={() => go('akun', { root: true })}>Kembali ke beranda</button>
      </div>
      <StatusBar />
    </div>
  )
}
