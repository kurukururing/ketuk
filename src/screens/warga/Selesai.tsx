import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, rp } from '../../store'
import { Img, StatusBar } from '../../ui'

const CONFETTI: [number, number, number, string][] = [
  [60, 110, 10, 'var(--amber-500)'], [320, 96, 8, 'var(--coral-500)'], [300, 200, 10, 'var(--primary-500)'],
  [80, 220, 6, 'var(--amber-500)'], [140, 80, 8, 'var(--primary-200)'], [250, 70, 6, 'var(--amber-500)'], [40, 170, 6, 'var(--coral-500)'],
]

/** Figma: E1 Selesai & Ulasan (13:887) */
export default function Selesai() {
  const { s, d, go } = useStore()
  const price = s.finalPrice ?? 38000
  const corrected = s.correction === 'approved'
  const [stars, setStars] = useState(0)
  const [sesuai, setSesuai] = useState<boolean | null>(corrected ? null : true)
  const [tags, setTags] = useState<string[]>(['Harga sesuai'])
  const [sent, setSent] = useState(false)
  const toggleTag = (t: string) => setTags(x => (x.includes(t) ? x.filter(y => y !== t) : [...x, t]))

  return (
    <div className="screen">
      {CONFETTI.map(([x, y, sz, c], i) => (
        <motion.div key={i} className="abs" style={{ left: x, top: y, width: sz, height: sz, borderRadius: sz / 2, background: c }}
          initial={{ y: -140, opacity: 0, rotate: 0 }} animate={{ y: 0, opacity: 1, rotate: 180 }} transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 120, damping: 12 }} />
      ))}

      <div className="scroll" style={{ top: 50, bottom: 102 }}>
        <div className="col" style={{ alignItems: 'center', gap: 8, padding: '36px 24px 0' }}>
          <motion.div className="row" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            style={{ width: 96, height: 96, borderRadius: 999, background: 'var(--primary-500)', justifyContent: 'center', boxShadow: '0 12px 28px -6px rgba(61,46,209,0.35)' }}>
            <Img src="ic-check-white-48.svg" size={48} />
          </motion.div>
          <div style={{ height: 4 }} />
          <span className="t-h1" style={{ letterSpacing: -0.39, textAlign: 'center' }}>{rp(price)} diterima</span>
          <span className="t-body-m" style={{ color: 'var(--ink-500)', textAlign: 'center' }}>
            {corrected ? 'Transaksi selesai dengan koreksi berbukti. Terima kasih sudah memilah!' : 'Transaksi selesai tanpa koreksi. Terima kasih sudah memilah!'}
          </span>
        </div>

        <div className="col" style={{ padding: '20px 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 10, alignItems: 'stretch' }}>
            <div className="col grow" style={{ gap: 2, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--primary-100)' }}>
              <span className="t-num-m">3,2 kg</span>
              <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>tidak berakhir di TPA</span>
            </div>
            <div className="col grow" style={{ gap: 2, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--amber-100)' }}>
              <span className="t-num-m">{rp(88000 + price)}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>total dari 4 barang</span>
            </div>
          </div>

          <div className="col" style={{ gap: 10, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <span className="t-overline" style={{ color: 'var(--ink-500)' }}>Barangmu masuk jalur</span>
            <div className="row" style={{ gap: 12 }}>
              <div className="row" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--amber-100)', justifyContent: 'center' }}><Img src="ic-wrench-amber.svg" size={22} /></div>
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-body-ms">Servis & jual ulang</span>
                <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Kipas diperbaiki lalu dijual kembali oleh mitra servis</span>
              </div>
            </div>
          </div>

          <div className="col" style={{ gap: 12, padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="t-body-ms nowrap">Nilai Pak Slamet</span>
              <div className="row" style={{ gap: 4 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <motion.button key={n} whileTap={{ scale: 1.3 }} onClick={() => { setStars(n); d({ type: 'rate', n }) }} aria-label={`${n} bintang`}>
                    <Img src="ic-star-fill.svg" size={24} style={{ filter: n <= stars ? 'none' : 'grayscale(1) opacity(.3)', transition: 'filter .15s' }} />
                  </motion.button>
                ))}
              </div>
            </div>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{stars ? `${stars} dari 5 bintang` : 'Ketuk bintang untuk menilai'}</span>
            <div style={{ height: 1, background: 'var(--line-200)' }} />
            <span className="t-body-ms">Harga sesuai yang terkunci?</span>
            <div className="row" style={{ gap: 8 }}>
              <button className={`chip${sesuai === true ? ' on' : ''}`} onClick={() => setSesuai(true)}>
                {sesuai === true && <Img src="ic-check-white-chip.svg" size={16} />}Ya, sesuai
              </button>
              <button className={`chip${sesuai === false ? ' on' : ''}`} onClick={() => setSesuai(false)}>Tidak sesuai</button>
            </div>
            <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
              {['Tepat waktu', 'Ramah', 'Harga sesuai'].map(t => (
                <button key={t} onClick={() => toggleTag(t)} style={{ padding: '8px 14px', borderRadius: 999, border: '1px solid #d8d5ee', fontWeight: 600, fontSize: 13, background: tags.includes(t) ? 'var(--primary-900)' : '#fff', color: tags.includes(t) ? '#fff' : 'var(--primary-900)' }}>{t}</button>
              ))}
            </div>
            <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--primary-500)' }}>+ Tambah komentar (opsional)</span>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }}
          onClick={() => { setSent(true); setTimeout(() => go('beranda', { root: true }), 900) }}>
          {sent ? 'Terima kasih! Ulasan terkirim' : <><Img src="ic-send-white.svg" size={20} />Kirim Ulasan</>}
        </button>
      </div>
      <StatusBar bg="var(--canvas)" />
    </div>
  )
}
