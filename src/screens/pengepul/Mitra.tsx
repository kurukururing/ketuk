import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar, Checkbox, TimelineStep } from '../../ui'

const help = (go: (s: 'bantuan') => void) => (
  <button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button>
)

function Stepper({ step }: { step: 1 | 2 }) {
  const dot = (n: number, label: string) => {
    const done = n < step, cur = n === step
    return (
      <div className="row nowrap" style={{ gap: 6 }}>
        <div className="row t-label-s" style={{ width: 24, height: 24, borderRadius: 999, justifyContent: 'center', background: done || cur ? 'var(--primary-500)' : 'var(--line-100)', color: done || cur ? '#fff' : 'var(--ink-500)' }}>
          {done ? <Img src="ic-check-white-12.svg" size={12} /> : n}
        </div>
        <span className="t-label-s" style={{ color: done || cur ? 'var(--ink-900)' : 'var(--ink-500)' }}>{label}</span>
      </div>
    )
  }
  const line = (on: boolean) => <div className="grow" style={{ height: 2, background: on ? 'var(--primary-500)' : 'var(--line-200)' }} />
  return <div className="row" style={{ gap: 8 }}>{dot(1, 'Data lapak')}{line(step > 1)}{dot(2, 'Verifikasi')}{line(false)}{dot(3, 'Lencana')}</div>
}

const field = (label: string, ph: string, value?: string) => (
  <label className="col" style={{ gap: 8 }}>
    <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{label}</span>
    <input placeholder={ph} defaultValue={value} key={value} className="t-body-l" style={{ height: 54, padding: '0 16px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--line-200)', background: '#fff', outline: 0, color: 'var(--ink-900)', fontFamily: 'inherit' }} />
  </label>
)

/** Figma: A1 Daftar Mitra Pengepul (30:2400) — Lanjut → A2 Verifikasi Identitas */
export function MitraDaftar() {
  const { go } = useStore()
  const [ktp, setKtp] = useState(false)
  const [veh, setVeh] = useState('Motor roda tiga')
  const [cats, setCats] = useState(['Elektronik', 'Logam', 'Kardus'])
  const toggle = (c: string) => setCats(cs => (cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c]))
  return (
    <div className="screen">
      <AppBar title="Daftar Mitra Pengepul" ink trailing={help(go)} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 10 }}>
        <Stepper step={1} />
        <div className="row" style={{ gap: 12, padding: '14px 16px', borderRadius: 16, background: '#fff6e6', border: '1.5px solid var(--amber-500)' }}>
          <div className="col grow" style={{ gap: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary-900)' }}>{ktp ? 'KTP terbaca' : 'Isi otomatis dari KTP'}</span>
            <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>Nama dan alamat terisi sendiri</span>
          </div>
          <button onClick={() => setKtp(true)} style={{ padding: '8px 14px', borderRadius: 999, background: 'var(--amber-500)', color: 'var(--primary-900)', fontWeight: 600, fontSize: 13 }}>Pindai KTP</button>
        </div>
        {field('Nama lengkap (sesuai KTP)', 'Contoh: Budiman Sekti', ktp ? 'Slamet Riyadi' : undefined)}
        {field('Nama lapak', 'Contoh: Maju Jaya', ktp ? 'Lapak Rungkut' : undefined)}
        {field('Alamat lapak', 'Contoh: Jl. Rungkut Industri III No. 7', ktp ? 'Jl. Rungkut Industri III No. 7' : undefined)}
        <span className="t-body-ms">Kendaraan jemput</span>
        <div className="row" style={{ gap: 8 }}>
          {['Motor roda tiga', 'Pikap', 'Gerobak'].map(c => <button key={c} className={`chip${veh === c ? ' on' : ''}`} onClick={() => setVeh(c)}>{c}</button>)}
        </div>
        <span className="t-body-ms">Barang yang kamu beli</span>
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {['Elektronik', 'Logam', 'Kardus', 'Perabot', 'Plastik'].map(c => <button key={c} className={`chip${cats.includes(c) ? ' on' : ''}`} onClick={() => toggle(c)}>{c}</button>)}
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" onClick={() => go('mitra-verifikasi')}><Img src="ic-arrow-right-white.svg" size={20} />Lanjut ke Verifikasi</button>
      </div>
      <StatusBar />
    </div>
  )
}

/** Figma: A2 Verifikasi Identitas (30:2506) + S1 Dialog Sumber Foto (41:3132) — Kirim → A3 Status Verifikasi */
export function MitraVerifikasi() {
  const { go } = useStore()
  const [sheet, setSheet] = useState<number | null>(null)
  const [up, setUp] = useState([false, false])
  const [survei, setSurvei] = useState(true)
  const done = (i: number) => (
    <div className="col" style={{ flex: 1, height: 150, gap: 8, padding: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', border: '1.5px solid var(--primary-200)' }}>
      <div className="row" style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: '#fff', justifyContent: 'center' }}><Img src={i === 0 ? 'ic-user-indigo26.svg' : 'ic-users-indigo26.svg'} size={26} /></div>
      <span className="t-body-ms nowrap">{i === 0 ? 'Foto KTP' : 'Selfie dengan KTP'}</span>
      <span className="tag tag-indigo"><Img src="ic-check-indigo14.svg" size={14} />Terunggah</span>
    </div>
  )
  const slot = (i: number, label: string) => up[i] ? (
    <div className="col" style={{ flex: 1, height: 150, gap: 8, padding: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', border: '1.5px solid var(--primary-200)' }}>
      <div className="row" style={{ width: 52, height: 52, borderRadius: 999, background: '#fff', justifyContent: 'center' }}><Img src="ic-camera-indigo26.svg" size={26} /></div>
      <span className="t-body-ms nowrap">{label}</span>
      <span className="tag tag-indigo"><Img src="ic-check-indigo14.svg" size={14} />Terunggah</span>
    </div>
  ) : (
    <button onClick={() => setSheet(i)} className="col" style={{ flex: 1, height: 150, gap: 8, padding: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', background: '#fff', border: '1.5px dashed var(--ink-300)' }}>
      <div className="row" style={{ width: 52, height: 52, borderRadius: 999, background: 'var(--line-100)', justifyContent: 'center' }}><Img src="ic-camera-ink26.svg" size={26} /></div>
      <span className="t-body-ms nowrap">{label}</span>
      <span className="t-body-s" style={{ color: 'var(--primary-500)' }}>Ketuk untuk unggah</span>
    </button>
  )
  const pick = () => { if (sheet !== null) setUp(u => u.map((x, j) => (j === sheet ? true : x))); setSheet(null) }
  return (
    <div className="screen">
      <AppBar title="Verifikasi Identitas" ink trailing={help(go)} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <Stepper step={2} />
        <div className="row" style={{ gap: 12, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
          <Img src="ic-shield-indigo20.svg" size={20} />
          <span className="t-body-s grow" style={{ color: 'var(--primary-900)' }}>Data dienkripsi dan hanya dipakai untuk verifikasi mitra.</span>
        </div>
        <div className="row" style={{ gap: 10 }}>{done(0)}{done(1)}</div>
        <div className="row" style={{ gap: 10 }}>{slot(0, 'Foto lapak / gudang')}{slot(1, 'Foto kendaraan')}</div>
        <div className="row" style={{ gap: 12 }}>
          <Checkbox on={survei} onChange={setSurvei} />
          <span className="t-body-m grow" style={{ color: 'var(--ink-700)' }}>Saya bersedia lapak disurvei tim KETUK sebelum aktif.</span>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" onClick={() => go('mitra-status')}><Img src="ic-shield-white20.svg" size={20} />Kirim Verifikasi</button>
      </div>
      <StatusBar />

      <AnimatePresence>
        {sheet !== null && (
          <motion.div className="abs row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(null)}
            style={{ inset: 0, background: 'rgba(21,20,43,0.6)', justifyContent: 'center', zIndex: 30 }}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={e => e.stopPropagation()}
              className="col" style={{ width: 342, padding: 24, gap: 14, borderRadius: 28, background: '#fff', boxShadow: '0 12px 32px rgba(27,23,96,0.14)' }}>
              <div className="row" style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}><Img src="ic-camera-indigo26.svg" size={26} /></div>
              <span className="t-h3">Tambah foto</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Foto harus jelas dan diambil langsung di lokasi agar bisa jadi bukti.</span>
              {[['ic-camera-indigo20.svg', 'Ambil foto', 'Kamera langsung | disarankan'], ['ic-image-indigo20.svg', 'Pilih dari galeri', 'Maksimal 3 foto']].map(([ic, t, s]) => (
                <button key={t} onClick={pick} className="row" style={{ gap: 12, padding: 12, borderRadius: 14, border: '1px solid var(--line-200)', textAlign: 'left' }}>
                  <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-50)', justifyContent: 'center' }}><Img src={ic} size={20} /></div>
                  <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{t}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{s}</span></div>
                </button>
              ))}
              <button className="btn btn-m" style={{ width: '100%', border: '1.5px solid var(--line-200)', color: 'var(--ink-900)' }} onClick={() => setSheet(null)}>Batal</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Figma: A3 Status Verifikasi (30:2605) — Lihat Status → A4 Mitra Terverifikasi; Radar → B1 Radar; modul → Lencana */
export function MitraStatus() {
  const { go } = useStore()
  return (
    <div className="screen">
      <AppBar title="Status Verifikasi" ink trailing={help(go)} />
      <div className="abs col" style={{ left: 24, top: 124, width: 342, gap: 8, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 96, height: 96 }}>
          <img src={A('3d-perisai.png')} alt="" style={{ width: 96, height: 96 }} />
          <div className="row abs" style={{ left: 60, top: 60, width: 36, height: 36, borderRadius: 999, background: 'var(--amber-500)', border: '3px solid var(--canvas)', justifyContent: 'center' }}><Img src="ic-clock-ink18.svg" size={18} /></div>
        </div>
        <span className="t-h2" style={{ textAlign: 'center' }}>Verifikasi sedang ditinjau</span>
        <span className="t-body-m" style={{ textAlign: 'center', color: 'var(--ink-500)' }}>Biasanya selesai dalam 1x24 jam. Kabar terbaru dikirim lewat notifikasi dan SMS.</span>
      </div>
      <div className="abs col" style={{ left: 0, top: 330, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="col" style={{ padding: 16, borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          <TimelineStep state="done" title="Data lapak" meta="Terkirim 1 Nov, 10.12" />
          <TimelineStep state="done" title="Dokumen identitas" meta="KTP & selfie valid" />
          <TimelineStep state="current" title="Survei lapak" meta="Dijadwalkan 2 Nov, 09.00" />
          <TimelineStep state="upcoming" title="Mitra aktif" meta="Tampil di Radar warga" line={false} />
        </div>
        <button onClick={() => go('lencana')} className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--amber-100)', textAlign: 'left' }}>
          <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--amber-500)', justifyContent: 'center' }}><Img src="ic-battery-ink20.svg" size={20} /></div>
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms">Ikuti modul E-waste Aman</span>
            <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>15 menit | buka akses barang berbaterai</span>
          </div>
          <Img src="chev-amber.svg" size={18} />
        </button>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" onClick={() => go('mitra-ok')}><Img src="ic-shield-white20.svg" size={20} />Lihat Status Mitra</button>
        <button className="btn" style={{ border: '1.5px solid var(--line-200)', color: 'var(--ink-900)' }} onClick={() => go('radar', { root: true })}><Img src="ic-radar-ink.svg" size={20} />Jelajahi Radar (mode lihat)</button>
      </div>
      <StatusBar />
    </div>
  )
}

/** Figma: A4 Mitra Terverifikasi (30:2701) — Mulai → B1 Radar; Profil → E1 Profil & Skor */
export function MitraOk() {
  const { go } = useStore()
  const rings: [string, number, number, number][] = [['mitra-ring1.svg', -115, -60, 620], ['mitra-ring2.svg', -35, 20, 460], ['mitra-ring3.svg', 35, 90, 320], ['mitra-ring4.svg', 95, 150, 200]]
  return (
    <div className="screen" style={{ background: 'var(--primary-900)' }}>
      {rings.map(([r, x, y, s]) => <img key={r} src={A(r)} alt="" className="abs" style={{ left: x, top: y, width: s, height: s }} />)}
      <motion.img src={A('3d-perisai.png')} alt="" className="abs" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        style={{ left: 120, top: 190, width: 150, height: 150 }} />
      <div className="abs col" style={{ left: 24, top: 344, width: 342, gap: 10, alignItems: 'center', textAlign: 'center' }}>
        <span className="t-overline" style={{ color: 'var(--amber-500)' }}>Verifikasi selesai</span>
        <span className="t-h1" style={{ color: '#fff', letterSpacing: -0.39 }}>Kamu Mitra Terverifikasi</span>
        <span className="t-body-l" style={{ color: 'var(--primary-200)' }}>Lapak Rungkut sekarang tampil di Radar warga dalam radius 3 km.</span>
      </div>
      <div className="abs col" style={{ left: 24, top: 500, width: 342, padding: 18, gap: 12, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.08)' }}>
        {['Tawaranmu bisa dipilih warga', 'Skor Tepat Harga mulai dihitung', 'Lencana tampil di profil dan tawaran'].map(t => (
          <div key={t} className="row" style={{ gap: 10 }}><Img src="ic-check-circle-amber.svg" size={20} /><span className="t-body-m" style={{ color: '#fff' }}>{t}</span></div>
        ))}
      </div>
      <div className="abs col" style={{ left: 24, top: 704, width: 342, gap: 12, alignItems: 'center' }}>
        <button className="btn btn-inverse" onClick={() => go('radar', { root: true })}><Img src="ic-radar-p900.svg" size={20} />Mulai Menawar</button>
        <button className="t-label-m" style={{ color: 'var(--primary-200)' }} onClick={() => go('profil', { root: true })}>Lihat Profil Mitra</button>
      </div>
      <StatusBar inverse />
    </div>
  )
}
