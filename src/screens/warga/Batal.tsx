import { motion } from 'framer-motion'
import { useStore, rp, CORRECTION } from '../../store'
import { Img, StatusBar } from '../../ui'

/** Figma: E1 Transaksi Dibatalkan (25:2129) — reached from Koreksi Berbukti → Tolak & Batalkan */
export default function Batal() {
  const { go } = useStore()
  return (
    <div className="screen">
      <div className="abs col" style={{ left: 24, top: 100, width: 342, gap: 10, alignItems: 'center', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="row" style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--coral-100)', justifyContent: 'center' }}>
          <Img src="ic-x-coral44.svg" size={44} />
        </motion.div>
        <div style={{ height: 4 }} />
        <span className="t-h1" style={{ letterSpacing: -0.39 }}>Transaksi dibatalkan</span>
        <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>Kamu menolak koreksi {rp(CORRECTION.price)}. Tidak ada denda, dan kipas angin tetap milikmu.</span>
      </div>
      <div className="abs col" style={{ left: 0, top: 330, width: 390, padding: '0 24px' }}>
        <div className="col" style={{ gap: 14, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <span className="t-body-ms">Yang terjadi selanjutnya</span>
          {([
            ['ic-chart-indigo.svg', 'var(--primary-100)', 'Koreksi tercatat', 'Masuk ke Skor Tepat Harga Pak Slamet', null],
            ['ic-refresh-amber.svg', 'var(--amber-100)', 'Pasang ulang kapan saja', 'Patokan Harga AI menyesuaikan foto baru', () => go('detail', { root: true })],
            ['ic-alert-coral20.svg', 'var(--coral-100)', 'Ada paksaan saat jemput?', 'Laporkan, tim KETUK menindaklanjuti 1x24 jam', null],
          ] as const).map(([ic, bg, t, sub, on]) => (
            <button key={t} className="row" style={{ gap: 12, textAlign: 'left', cursor: on ? 'pointer' : 'default' }} onClick={on ?? undefined}>
              <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: bg, justifyContent: 'center' }}><Img src={ic} size={20} /></div>
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-body-ms">{t}</span>
                <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{sub}</span>
              </div>
              {t !== 'Koreksi tercatat' && <Img src="ic-chevron-right18.svg" size={18} />}
            </button>
          ))}
        </div>
      </div>
      <div className="bottom-bar" style={{ height: 166 }}>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => go('detail', { root: true })}>
          <Img src="ic-refresh-white.svg" size={20} />Pasang Ulang Barang
        </button>
        <button className="btn" style={{ border: '1.5px solid var(--line-200)' }} onClick={() => go('beranda', { root: true })}>
          <Img src="ic-house-ink20.svg" size={20} />Kembali ke Beranda
        </button>
      </div>
      <StatusBar bg="var(--canvas)" />
    </div>
  )
}
