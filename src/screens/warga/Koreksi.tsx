import { motion } from 'framer-motion'
import { useStore, CORRECTION, rp } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

/** Figma: E1 Koreksi Berbukti (13:796) */
export default function Koreksi() {
  const { s, d, go } = useStore()
  const locked = s.finalPrice ?? 38000
  return (
    <div className="screen">
      <AppBar ink title="Koreksi Berbukti" trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 166 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--coral-100)' }}>
            <div className="row" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#fff', justifyContent: 'center' }}><Img src="ic-alert-coral.svg" size={22} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms" style={{ color: 'var(--coral-700)' }}>Pak Slamet mengajukan koreksi harga</span>
              <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>Kamu boleh menolak. Menolak tidak dikenai denda.</span>
            </div>
          </div>

          <div className="row" style={{ gap: 12, padding: 18, borderRadius: 'var(--radius-lg)', background: '#fff', justifyContent: 'space-between' }}>
            <div className="col nowrap" style={{ gap: 2, color: 'var(--ink-500)' }}>
              <span className="t-body-s">Harga terkunci</span>
              <span className="t-num-m" style={{ textDecoration: 'line-through' }}>{rp(locked)}</span>
            </div>
            <Img src="ic-arrow-right-ink300.svg" size={20} />
            <motion.div className="col" style={{ gap: 2, alignItems: 'flex-end' }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 }}>
              <span className="t-body-s nowrap" style={{ color: 'var(--coral-700)' }}>Usulan koreksi</span>
              <span className="t-num-l nowrap" style={{ color: 'var(--coral-700)' }}>{rp(CORRECTION.price)}</span>
              <span className="tag tag-coral">-{rp(locked - CORRECTION.price)}</span>
            </motion.div>
          </div>

          <div className="col" style={{ gap: 6, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <span className="t-overline" style={{ color: 'var(--ink-500)' }}>Alasan dari pengepul</span>
            <span className="t-body-l">"Baling-baling retak, tidak terlihat di foto awal."</span>
          </div>

          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Bukti foto</span>
            <img src={A('photo-bukti.jpg')} alt="Bukti foto baling-baling retak" style={{ width: 166, height: 118, borderRadius: 14, objectFit: 'cover' }} />
          </div>
        </div>
      </div>
      <div className="bottom-bar" style={{ height: 166 }}>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }}
          onClick={() => { d({ type: 'resolveCorrection', ok: true }); go('selesai', { root: true }) }}>
          Terima Koreksi {rp(CORRECTION.price)}
        </button>
        <button className="btn btn-danger" onClick={() => { d({ type: 'resolveCorrection', ok: false }); go('beranda', { root: true }) }}>
          <Img src="ic-x-coral.svg" size={20} />Tolak & Batalkan, tanpa denda
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
