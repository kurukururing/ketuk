import { useState } from 'react'
import { useStore } from '../../store'
import { Img, StatusBar, AppBar, Toggle, Avatar, Checkbox, SectionHeader } from '../../ui'

/** Figma: G1 Mode Dibantu Keluarga (29:2256) — Simpan → G1 Akun Warga */
export default function Dibantu() {
  const { go } = useStore()
  const [on, setOn] = useState(true)
  const [perm, setPerm] = useState([true, true, true])
  const labels = ['Bisa memasang barang atas namaku', 'Bisa chat dengan pengepul', 'Kirim notifikasi ke ponselku']
  return (
    <div className="screen">
      <AppBar title="Mode Dibantu Keluarga" ink trailing={<button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="row" style={{ gap: 14, padding: 18, borderRadius: 24, background: 'var(--primary-900)' }}>
          <div className="row" style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--amber-500)', justifyContent: 'center', flex: 'none' }}><Img src="ic-users-ink24.svg" size={24} /></div>
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms" style={{ color: '#fff' }}>Mode Dibantu Keluarga</span>
            <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>Kerabat membantu memasang barang, uang tetap masuk ke kamu.</span>
          </div>
          <Toggle on={on} onChange={setOn} />
        </div>
        <SectionHeader title="Kerabat terhubung" />
        <div className="col" style={{ padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <div className="row" style={{ gap: 12, padding: '12px 0', borderBottom: '1px solid var(--line-100)' }}>
            <Avatar initials="DP" tone="amber" />
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">Dimas Pratama</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Anak | memasang barang & chat pengepul</span>
            </div>
            <span className="tag tag-indigo">{on ? 'Aktif' : 'Nonaktif'}</span>
          </div>
          <a className="row" href="https://wa.me/?text=Gabung%20Mode%20Dibantu%20Keluarga%20KETUK" target="_blank" rel="noreferrer" style={{ gap: 12, padding: '12px 0', textDecoration: 'none' }}>
            <div className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center', flex: 'none' }}><Img src="ic-plus-indigo22.svg" size={22} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms" style={{ color: 'var(--primary-500)' }}>Undang kerabat</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Kirim tautan undangan lewat WhatsApp</span>
            </div>
            <Img src="ic-chevron-right18.svg" size={18} />
          </a>
        </div>
        <div className="col" style={{ padding: 16, gap: 12, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <span className="t-body-ms">Hak akses kerabat</span>
          {labels.map((l, i) => (
            <div key={l} className="row" style={{ gap: 12 }}>
              <Checkbox on={perm[i]} onChange={v => setPerm(p => p.map((x, j) => (j === i ? v : x)))} />
              <span className="t-body-m grow">{l}</span>
            </div>
          ))}
          <div className="row" style={{ gap: 12 }}>
            <Checkbox on={false} />
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-m" style={{ color: 'var(--ink-500)' }}>Uang masuk ke rekening kerabat</span>
              <span className="t-body-s" style={{ color: 'var(--coral-700)' }}>Dikunci: uang selalu ke pemilik</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" onClick={() => go('akun', { root: true })}><Img src="ic-check-white-20.svg" size={20} />Simpan Pengaturan</button>
      </div>
      <StatusBar />
    </div>
  )
}
