import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, ITEM, rp, PAK_SLAMET } from '../../store'
import { Img, StatusBar } from '../../ui'

const JALUR: [string, string, string, string][] = [
  ['servis', 'Servis & jual ulang', 'Kipas diperbaiki lalu dijual kembali', 'ic-wrench-indigo.svg'],
  ['daur', 'Daur ulang material', 'Dipilah ke pengolah plastik & logam', 'ic-refresh-ink.svg'],
  ['ewaste', 'Pengolah e-waste', 'Untuk barang berbaterai', 'ic-battery-ink.svg'],
]

/** Figma: D1 Pembayaran Selesai (39:3042) */
export default function Bayar() {
  const { s, go } = useStore()
  const price = s.finalPrice ?? PAK_SLAMET.price
  const corrected = s.correction === 'approved'
  const [jalur, setJalur] = useState('servis')
  return (
    <div className="screen">
      <div className="scroll" style={{ top: 50, bottom: 166 }}>
        <div className="col" style={{ padding: '40px 24px 0', gap: 8, alignItems: 'center', textAlign: 'center' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            className="row" style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--primary-500)', justifyContent: 'center', boxShadow: '0 12px 28px -6px rgba(61,46,209,0.35)' }}>
            <Img src="ic-check-white-48.svg" size={48} />
          </motion.div>
          <span className="t-h1" style={{ letterSpacing: -0.39 }}>{rp(price)} dibayar ke {ITEM.warga}</span>
          <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>
            {corrected ? 'Transaksi dengan koreksi berbukti. Skor Tepat Harga menjadi 96%.' : 'Transaksi tanpa koreksi. Skor Tepat Harga tetap 97%.'}
          </span>
        </div>
        <div className="col" style={{ padding: '20px 24px 24px', gap: 12 }}>
          <div className="col" style={{ gap: 10, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <span className="t-body-ms">Salurkan barang ke jalur</span>
            {JALUR.map(([k, t, sub, ic]) => {
              const on = jalur === k
              return (
                <button key={k} onClick={() => setJalur(k)} className="row"
                  style={{ gap: 12, padding: 12, borderRadius: 'var(--radius-md)', textAlign: 'left', background: on ? 'var(--primary-50)' : '#fff', border: on ? '2px solid var(--primary-500)' : '1px solid var(--line-200)' }}>
                  <div className="row" style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', justifyContent: 'center', background: on ? 'var(--primary-100)' : 'var(--line-100)' }}><Img src={ic} size={18} /></div>
                  <div className="col grow" style={{ gap: 2 }}>
                    <span className="t-body-ms">{t}</span>
                    <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{sub}</span>
                  </div>
                  {on
                    ? <div className="row" style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--primary-500)', justifyContent: 'center' }}><Img src="ic-check-white-12.svg" size={12} /></div>
                    : <div style={{ width: 22, height: 22, borderRadius: 999, background: '#fff', border: '1.5px solid var(--ink-300)' }} />}
                </button>
              )
            })}
          </div>
          <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--amber-100)' }}>
            <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--amber-500)', justifyContent: 'center' }}><Img src="ic-truck-ink20.svg" size={20} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">2 dari 3 titik selesai</span>
              <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>{rp(27000 + price)} dibayar hari ini | 1 titik lagi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar" style={{ height: 166 }}>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => go('radar', { root: true })}>
          <Img src="ic-arrow-right-white.svg" size={20} />Lanjut ke Titik Berikutnya
        </button>
        <button className="btn" style={{ border: '1.5px solid var(--line-200)' }} onClick={() => go('radar', { root: true })}>
          <Img src="ic-cash-ink.svg" size={20} />Lihat Bukti Transaksi
        </button>
      </div>
      <StatusBar bg="var(--canvas)" />
    </div>
  )
}
