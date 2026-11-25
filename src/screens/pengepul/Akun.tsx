import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar, BottomNavPengepul, SectionHeader } from '../../ui'

const help = (go: (s: 'bantuan') => void) => (
  <button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button>
)

/** Figma: E1 Profil & Skor Tepat Harga (15:1364) — Skor/statistik → Pendapatan; Mitra Terverifikasi → A4; E-waste → Lencana; Keluar → A3 Masuk */
export function Profil() {
  const { go } = useStore()
  const [logout, setLogout] = useState(false)
  const rows: [string, string, string, string, () => void, boolean?][] = [
    ['ic-shield-indigo22.svg', 'var(--primary-100)', 'Mitra Terverifikasi', 'KTP, lapak, dan kendaraan sudah diverifikasi', () => go('mitra-ok')],
    ['ic-battery-amber22.svg', 'var(--amber-100)', 'E-waste Aman', 'Boleh menawar elektronik rusak & berbaterai', () => go('lencana')],
    ['ic-logout-coral22.svg', 'var(--coral-100)', 'Keluar', '', () => setLogout(true), true],
  ]
  return (
    <div className="screen">
      <img src={A('profil-ellipse2.svg')} alt="" className="abs" style={{ left: -479, top: -229, width: 883, height: 883 }} />
      <img src={A('profil-header.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 390, height: 280 }} />
      <img src={A('profil-ellipse1.svg')} alt="" className="abs" style={{ left: -37, top: -432, width: 883, height: 883 }} />
      <div className="abs row" style={{ left: 24, top: 66, gap: 14 }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, border: '2px solid #fff', background: 'var(--amber-100)', overflow: 'hidden' }}>
          <img src={A('avatar-slamet.png')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="col nowrap" style={{ gap: 2 }}>
          <span className="t-h2" style={{ color: '#fff' }}>Pak Slamet</span>
          <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>Pengepul | Lapak Rungkut, Surabaya</span>
        </div>
      </div>
      <div className="abs row" style={{ left: 24, top: 148, gap: 8 }}>
        <span className="tag tag-glass"><Img src="ic-shield-white14.svg" size={14} />Mitra Terverifikasi</span>
        <span className="tag tag-amber"><Img src="ic-battery-amber14.svg" size={14} />E-waste Aman</span>
      </div>
      <div className="scroll" style={{ top: 196, bottom: 97 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <button onClick={() => go('pendapatan')} className="col" style={{ padding: 20, gap: 12, borderRadius: 'var(--radius-xl)', background: '#fff', boxShadow: 'var(--elev-2)', textAlign: 'left', marginBottom: 32 }}>
            <div className="row" style={{ gap: 6 }}><span className="t-overline grow" style={{ color: 'var(--primary-500)' }}>Skor Tepat Harga</span><Img src="ic-info-indigo18.svg" size={18} /></div>
            <div className="row" style={{ gap: 12 }}>
              <div className="col grow nowrap"><span className="t-num-xl" style={{ color: 'var(--primary-500)' }}>97%</span><span className="t-body-ms" style={{ color: 'var(--ink-700)' }}>128 transaksi | 4 koreksi</span></div>
              <img src={A('3d-medali.png')} alt="" style={{ width: 76, height: 76 }} />
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--primary-100)', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: '97%' }} transition={{ duration: 0.9, ease: 'easeOut' }} style={{ height: 8, borderRadius: 4, background: 'var(--primary-500)' }} />
            </div>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Persentase transaksi tanpa koreksi harga. Skor tinggi membuat tawaranmu tampil lebih atas di layar warga.</span>
          </button>
          <div className="row" style={{ gap: 10 }}>
            {[['Rp4,2 jt', 'bulan ini'], ['4,9', 'rating warga'], ['98%', 'tepat waktu']].map(([a, b]) => (
              <button key={b} onClick={() => go('pendapatan')} className="col grow nowrap" style={{ flexBasis: 0, gap: 2, padding: 12, borderRadius: 'var(--radius-md)', background: '#fff', textAlign: 'left' }}>
                <span className="t-num-m">{a}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{b}</span>
              </button>
            ))}
          </div>
          <SectionHeader title="Lencana" />
          {rows.map(([ic, tile, t, s, on, danger]) => (
            <button key={t} onClick={on} className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: '#fff', textAlign: 'left' }}>
              <div className="row" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: tile, justifyContent: 'center', flex: 'none' }}><Img src={ic} size={22} /></div>
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-body-ms" style={{ color: danger ? 'var(--coral-700)' : undefined }}>{t}</span>
                {s && <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{s}</span>}
              </div>
              <Img src="ic-chevron-right20.svg" size={20} />
            </button>
          ))}
        </div>
      </div>
      <BottomNavPengepul active="akun" />
      <StatusBar inverse />
      <AnimatePresence>
        {logout && (
          <motion.div className="abs row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLogout(false)}
            style={{ inset: 0, background: 'rgba(21,20,43,0.6)', justifyContent: 'center', zIndex: 30 }}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={e => e.stopPropagation()}
              className="col" style={{ width: 342, padding: 24, gap: 14, borderRadius: 28, background: '#fff', boxShadow: 'var(--elev-2)' }}>
              <div className="row" style={{ justifyContent: 'center' }}>
                <div className="row" style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}><img src={A('ic-logout-ink.svg')} alt="" style={{ width: 29.5, height: 29.5 }} /></div>
              </div>
              <span className="t-h3" style={{ textAlign: 'center' }}>Keluar dari Akun?</span>
              <span style={{ fontSize: 12, lineHeight: '18px', textAlign: 'center' }}>Yakin ingin mengakhiri sesi Anda saat ini?</span>
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

/** Figma: E1 Pendapatan (39:3118) */
export function Pendapatan() {
  const { go } = useStore()
  const bars: [string, string, number][] = [['Min', '92rb', 67.5], ['Sen', '128rb', 90], ['Sel', '75rb', 52.5], ['Rab', '151rb', 105], ['Kam', '118rb', 82.5], ['Jum', '176rb', 120], ['Sab', '140rb', 97.5]]
  const cats: [string, string, number, string][] = [['Elektronik', 'Rp1,6 jt | 38%', 279, 'var(--primary-500)'], ['Logam', 'Rp1,1 jt | 26%', 190.9, 'var(--amber-500)'], ['Kardus', 'Rp0,9 jt | 21%', 154.2, 'var(--primary-200)'], ['Perabot', 'Rp0,6 jt | 15%', 110.1, 'var(--ink-300)']]
  return (
    <div className="screen">
      <AppBar title="Pendapatan" ink trailing={help(go)} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="col" style={{ padding: 20, gap: 6, borderRadius: 24, background: 'var(--primary-900)' }}>
          <span className="t-overline" style={{ color: 'var(--primary-200)' }}>Pendapatan kotor November</span>
          <span className="t-num-xl" style={{ color: '#fff' }}>Rp4,2 jt</span>
          <span className="tag tag-glass" style={{ alignSelf: 'flex-start' }}><Img src="ic-chart-white14.svg" size={14} />naik 12% dari Oktober</span>
        </div>
        <div className="col" style={{ padding: 16, gap: 12, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <div className="row t-body-ms" style={{ justifyContent: 'space-between' }}><span>7 hari terakhir</span><span style={{ color: 'var(--primary-500)' }}>Rp1,1 jt</span></div>
          <div className="row" style={{ gap: 8, alignItems: 'flex-end' }}>
            {bars.map(([d, v, h], i) => {
              const today = i === 6, max = i === 5
              return (
                <div key={d} className="col grow" style={{ gap: 6, alignItems: 'center', flexBasis: 0 }}>
                  <span className="t-body-s" style={{ color: today ? 'var(--amber-700)' : 'var(--ink-500)' }}>{v}</span>
                  <motion.div initial={{ height: 0 }} animate={{ height: h }} transition={{ delay: i * 0.05, duration: 0.5 }}
                    style={{ width: 28, borderRadius: 8, background: today ? 'var(--amber-500)' : max ? 'var(--primary-500)' : 'var(--primary-200)' }} />
                  <span className="t-label-s" style={{ color: today ? 'var(--ink-900)' : 'var(--ink-500)' }}>{d}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col" style={{ padding: 16, gap: 12, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <span className="t-body-ms">Per kategori</span>
          {cats.map(([c, v, w, color]) => (
            <div key={c} className="col" style={{ gap: 6 }}>
              <div className="row" style={{ justifyContent: 'space-between' }}><span className="t-body-m">{c}</span><span className="t-body-ms">{v}</span></div>
              <div style={{ height: 8, borderRadius: 999, background: 'var(--line-100)', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: w }} transition={{ duration: 0.7 }} style={{ height: 8, borderRadius: 4, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <StatusBar />
    </div>
  )
}

/** Figma: E1 Lencana E-waste Aman (39:3213) — Lihat di Profil → E1 Profil */
export function Lencana() {
  const { go } = useStore()
  const reqs: [string, string][] = [['Modul penanganan baterai', 'Lulus 92/100 | 1 Nov 2026'], ['Mitra pengolah e-waste berizin', 'Kontrak terverifikasi'], ['Tempat penyimpanan aman', 'Disurvei tim KETUK 2 Nov']]
  return (
    <div className="screen">
      <AppBar title="Lencana E-waste Aman" ink trailing={help(go)} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="col" style={{ padding: 20, gap: 10, borderRadius: 'var(--radius-xl)', background: 'var(--amber-100)', border: '1.5px solid var(--amber-500)' }}>
          <div className="row" style={{ gap: 14 }}>
            <img src={A('3d-baterai.png')} alt="" style={{ width: 72, height: 72, objectFit: 'cover' }} />
            <div className="col grow" style={{ gap: 6 }}>
              <span className="t-h2">E-waste Aman</span>
              <span className="tag tag-dark" style={{ alignSelf: 'flex-start' }}><Img src="ic-shield-white14.svg" size={14} />Aktif | berlaku s.d. Okt 2027</span>
            </div>
          </div>
          <span className="t-body-m" style={{ color: 'var(--ink-700)' }}>Kamu boleh menawar elektronik rusak dan barang berbaterai di Radar Barang.</span>
        </div>
        <div className="col" style={{ padding: 16, gap: 12, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <span className="t-body-ms">Syarat terpenuhi</span>
          {reqs.map(([t, s]) => (
            <div key={t} className="row" style={{ gap: 10 }}>
              <Img src="ic-check-circle-indigo22.svg" size={22} />
              <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{t}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{s}</span></div>
            </div>
          ))}
        </div>
        <div className="row" style={{ gap: 10 }}>
          {[['23', 'barang e-waste tersalur'], ['0', 'insiden baterai']].map(([a, b]) => (
            <div key={b} className="col grow" style={{ flexBasis: 0, gap: 2, padding: 14, borderRadius: 'var(--radius-lg)', background: '#fff' }}><span className="t-num-m">{a}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{b}</span></div>
          ))}
        </div>
        <span className="t-body-ms">Bisa kamu tawar</span>
        <div className="row scroll" style={{ position: 'relative', gap: 8, margin: '0 -24px', padding: '0 24px' }}>
          {['HP rusak', 'Powerbank', 'Laptop', 'Lampu'].map(c => <span key={c} className="chip">{c}</span>)}
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn" style={{ background: 'var(--primary-100)', color: 'var(--primary-500)' }} onClick={() => go('profil', { root: true })}><Img src="ic-shield-indigo20b.svg" size={20} />Lihat di Profil Mitra</button>
      </div>
      <StatusBar />
    </div>
  )
}
