import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, ITEM, rp, mmss, CORRECTION, PAK_SLAMET } from '../../store'
import { A, Img, StatusBar, AppBar, TimelineStep } from '../../ui'

/** Figma: D1 Menunggu Konfirmasi (278:6502) — flips when the warga decides */
export default function Menunggu() {
  const { s, go } = useStore()
  const locked = s.finalPrice && s.correction !== 'approved' ? s.finalPrice : PAK_SLAMET.price
  const [t, setT] = useState(29 * 60 + 40)
  useEffect(() => { const id = setInterval(() => setT(x => Math.max(0, x - 1)), 1000); return () => clearInterval(id) }, [])
  const decided = s.correction === 'approved' || s.correction === 'rejected'
  const ok = s.correction === 'approved'

  return (
    <div className="screen">
      <AppBar ink title="Koreksi Warga" onBack={() => go('radar', { root: true })} trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <motion.div key={s.correction} initial={{ scale: 0.96, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}
            className="col" style={{ gap: 10, padding: 20, borderRadius: 'var(--radius-xl)', background: decided ? (ok ? 'var(--primary-100)' : 'var(--coral-100)') : 'var(--amber-100)' }}>
            <div className="row" style={{ gap: 14 }}>
              <img src={A(decided ? (ok ? '3d-gembok.png' : '3d-sesi.png') : '3d-sesi.png')} alt="" style={{ width: 72, height: 72, objectFit: 'cover' }} />
              <div className="col grow" style={{ gap: 6 }}>
                <span className="t-h2">{decided ? (ok ? 'Koreksi disetujui' : 'Koreksi ditolak') : 'Menunggu Konfirmasi Warga'}</span>
                <span className="t-body-m" style={{ color: 'var(--ink-700)', fontVariantNumeric: 'tabular-nums' }}>
                  {decided ? (ok ? `Harga baru terkunci ${rp(CORRECTION.price)}` : 'Transaksi dibatalkan tanpa denda') : `Respons dalam ${mmss(t)}`}
                </span>
              </div>
            </div>
            <span className="t-body-m" style={{ color: 'var(--ink-700)' }}>
              {decided ? (ok ? `${ITEM.warga} menyetujui koreksi berbukti. Lanjutkan pembayaran ${rp(CORRECTION.price)}.` : 'Warga berhak menolak. Barang tidak jadi dijemput.')
                : `Warga sedang melihat foto dan alasanmu. Harga tetap ${rp(locked)} sampai warga menyetujui.`}
            </span>
          </motion.div>

          <div className="col" style={{ padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <TimelineStep state="done" title="Koreksi Terkirim" meta="Foto bukti dan alasan sudah diterima aplikasi" />
            <TimelineStep state={decided ? 'done' : 'current'} title="Warga Meninjau" meta="Warga bisa setuju atau menolak tanpa denda" />
            <TimelineStep state={decided ? 'current' : 'upcoming'} title="Keputusan" meta={decided ? (ok ? `Harga baru terkunci ${rp(CORRECTION.price)}` : 'Ditolak, transaksi dibatalkan') : `Harga baru terkunci atau kembali ke ${rp(locked)}`} line={false} />
          </div>

          <div className="col" style={{ gap: 12, padding: 18, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
            <span className="t-body-ms" style={{ color: 'var(--ink-500)' }}>KOREKSI YANG KAMU KIRIM</span>
            <div className="col" style={{ gap: 4 }}>
              <div className="row" style={{ gap: 8, alignItems: 'flex-start' }}>
                <img src={A('photo-bukti.jpg')} alt="" style={{ width: 54, height: 54, borderRadius: 14, objectFit: 'cover' }} />
                <div className="col" style={{ gap: 4, alignItems: 'flex-start' }}>
                  <span className="t-body-ms">{ITEM.name}</span>
                  <span className="tag tag-amber">{CORRECTION.reason}</span>
                </div>
              </div>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{CORRECTION.note}</span>
            </div>
            <div style={{ height: 1, background: 'var(--line-200)' }} />
            <div className="row" style={{ gap: 12 }}>
              <div className="col nowrap" style={{ gap: 2, color: 'var(--ink-500)' }}>
                <span className="t-body-s">Harga terkunci</span>
                <span className="t-num-m" style={{ textDecoration: 'line-through' }}>{rp(PAK_SLAMET.price)}</span>
              </div>
              <Img src="ic-arrow-right-ink300.svg" size={20} />
              <div className="col grow nowrap" style={{ gap: 2, alignItems: 'flex-end', color: 'var(--coral-700)' }}>
                <span className="t-body-s">Usulan koreksi</span>
                <span className="t-num-l">{rp(CORRECTION.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        {decided ? (
          ok ? <button className="btn btn-primary" onClick={() => go('bayar', { root: true })}><Img src="ic-check-white-20.svg" size={20} />Bayar {rp(CORRECTION.price)} ke {ITEM.warga}</button>
             : <button className="btn btn-secondary" onClick={() => go('radar', { root: true })}><Img src="ic-radar-ink.svg" size={20} />Kembali ke Radar</button>
        ) : (
          <button className="btn btn-primary"><Img src="ic-chat-white.svg" size={20} />Buka chat dengan warga</button>
        )}
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
