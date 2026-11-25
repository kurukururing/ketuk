import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar, BottomNavWarga } from '../../ui'

type Item = { ic: string; tile: string; title: string; sub?: string; on: () => void; danger?: boolean }

/** Figma: G1 Akun Warga (27:2406) + dialog Keluar (95:6845) */
export default function Akun() {
  const { d, go } = useStore()
  const [logout, setLogout] = useState(false)
  const items: Item[] = [
    { ic: 'ic-pin-indigo18.svg', tile: 'var(--primary-100)', title: 'Alamat Jemput', sub: 'Jl. Rungkut Asri Tengah 12', on: () => go('alamat') },
    { ic: 'ic-wallet-amber18.svg', tile: 'var(--amber-100)', title: 'Dompet & Pembayaran', sub: 'Saldo Rp83.000', on: () => go('dompet') },
    { ic: 'ic-users-indigo18.svg', tile: 'var(--primary-100)', title: 'Mode Dibantu Keluarga', sub: 'Aktif | Dimas (anak)', on: () => go('dibantu') },
    { ic: 'ic-truck-amber18.svg', tile: 'var(--amber-100)', title: 'Ganti ke Pengepul', sub: 'Daftar sebagai mitra', on: () => d({ type: 'switchToPengepul', screen: 'splash' }) },
    { ic: 'ic-bell-ink18.svg', tile: 'var(--line-100)', title: 'Notifikasi', sub: '3 belum dibaca', on: () => go('notifikasi') },
    { ic: 'ic-help-ink18.svg', tile: 'var(--line-100)', title: 'Pusat Bantuan', sub: 'FAQ & chat CS', on: () => go('bantuan') },
    { ic: 'ic-logout-coral.svg', tile: 'var(--coral-100)', title: 'Keluar', on: () => setLogout(true), danger: true },
  ]
  return (
    <div className="screen">
      <img src={A('akun-header.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 390, height: 240 }} />
      <div className="abs row" style={{ left: 24, top: 70, gap: 14 }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, border: '2px solid #fff', background: 'var(--amber-100)', overflow: 'hidden' }}>
          <img src={A('avatar-ratna.png')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="col nowrap" style={{ gap: 2 }}>
          <span className="t-h2" style={{ color: '#fff' }}>Ratna Wulandari</span>
          <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>+62 812 3456 7890 | Rungkut, Surabaya</span>
        </div>
      </div>
      <button className="abs row" aria-label="Ubah profil" onClick={() => go('daftar')}
        style={{ left: 326, top: 82, width: 40, height: 40, borderRadius: 999, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }}>
        <Img src="ic-edit-white18.svg" size={18} />
      </button>
      <div className="abs row" style={{ left: 24, top: 182, width: 342, padding: 18, gap: 12, borderRadius: 'var(--radius-xl)', background: '#fff', boxShadow: '0 12px 32px rgba(27,23,96,0.14)', alignItems: 'flex-start' }}>
        {[['14', 'barang tersalur', 'var(--ink-900)'], ['41 kg', 'tidak ke TPA', 'var(--primary-500)'], ['Rp412rb', 'diterima', 'var(--amber-700)']].map(([a, b, c]) => (
          <div key={b} className="col grow" style={{ gap: 2, flexBasis: 0 }}><span className="t-num-m nowrap" style={{ color: c }}>{a}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{b}</span></div>
        ))}
      </div>
      <div className="abs col" style={{ left: 24, top: 272, width: 342, padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
        {items.map((it, i) => (
          <button key={it.title} onClick={it.on} className="row" style={{ gap: 12, padding: '10px 0', textAlign: 'left', borderBottom: i < items.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
            <div className="row" style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: it.tile, justifyContent: 'center', flex: 'none' }}><Img src={it.ic} size={18} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms" style={{ color: it.danger ? 'var(--coral-700)' : undefined }}>{it.title}</span>
              {it.sub && <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{it.sub}</span>}
            </div>
            <Img src="ic-chevron-right18.svg" size={18} />
          </button>
        ))}
      </div>
      <BottomNavWarga active="akun" />
      <StatusBar inverse />

      <AnimatePresence>
        {logout && (
          <motion.div key="scrim" className="abs row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLogout(false)}
            style={{ inset: 0, background: 'rgba(21,20,43,0.6)', justifyContent: 'center', zIndex: 30 }}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={e => e.stopPropagation()}
              className="col" style={{ width: 342, padding: 24, gap: 14, borderRadius: 28, background: '#fff', boxShadow: '0 12px 32px rgba(27,23,96,0.14)' }}>
              <div className="row" style={{ justifyContent: 'center' }}>
                <div className="row" style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}>
                  <img src={A('ic-logout-ink.svg')} alt="" style={{ width: 29.5, height: 29.5 }} />
                </div>
              </div>
              <span className="t-h3" style={{ textAlign: 'center' }}>Keluar dari Akun?</span>
              <span style={{ fontSize: 12, lineHeight: '18px', textAlign: 'center', color: '#000' }}>Yakin ingin mengakhiri sesi Anda saat ini?</span>
              <div className="row" style={{ gap: 14 }}>
                <button className="btn btn-m grow" style={{ border: '1.5px solid var(--line-200)', color: 'var(--ink-900)' }} onClick={() => setLogout(false)}>Batal</button>
                <button className="btn btn-m grow" style={{ background: 'var(--coral-700)', color: 'var(--coral-100)' }} onClick={() => go('masuk', { root: true })}>Keluar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
