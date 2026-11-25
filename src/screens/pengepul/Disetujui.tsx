import { motion } from 'framer-motion'
import { useStore, ITEM, rp, CORRECTION, PAK_SLAMET } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

/** Figma: D1 Koreksi Disetujui (278:6575) — Chat dengan Warga → Lanjut → here → Bayar → Pembayaran Selesai */
export default function Disetujui() {
  const { d, go } = useStore()
  const rows: [string, string][] = [['Warga', ITEM.warga], ['Barang', ITEM.name], ['Alasan koreksi', CORRECTION.reason], ['Jadwal jemput', 'Hari ini 16.00']]
  return (
    <div className="screen">
      <AppBar ink title="Koreksi Warga" trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />
      <motion.div className="abs col" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ left: 24, top: 131, width: 342, padding: 20, gap: 10, borderRadius: 'var(--radius-xl)', background: 'var(--amber-100)', alignItems: 'center', textAlign: 'center' }}>
        <motion.img src={A('3d-dompet.png')} alt="" initial={{ y: -10, rotate: -10 }} animate={{ y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 10 }} style={{ width: 72, height: 72 }} />
        <span className="t-h2" style={{ color: 'var(--ink-500)' }}>Koreksi disetujui</span>
        <span className="t-body-m" style={{ color: 'var(--ink-700)', marginTop: -6 }}>{ITEM.warga} menyetujui harga baru</span>
        <span className="t-body-m" style={{ color: 'var(--ink-700)', textDecoration: 'line-through' }}>{rp(PAK_SLAMET.price)}</span>
        <span className="t-num-l" style={{ color: 'var(--primary-500)', marginTop: -6 }}>{rp(CORRECTION.price)}</span>
      </motion.div>
      <div className="abs col" style={{ left: 24, top: 368, width: 342, padding: '4px 16px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
        {rows.map(([k, v], i) => (
          <div key={k} className="row" style={{ gap: 12, padding: '12px 0', borderBottom: i < rows.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
            <span className="t-body-m grow" style={{ color: 'var(--ink-500)' }}>{k}</span>
            <span className="t-body-ms nowrap">{v}</span>
          </div>
        ))}
      </div>
      <div className="bottom-bar" style={{ height: 97 }}>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => { d({ type: 'complete' }); go('bayar', { root: true }) }}>
          <Img src="ic-check-white-20.svg" size={20} />Barang sesuai, bayar {rp(CORRECTION.price)}
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
