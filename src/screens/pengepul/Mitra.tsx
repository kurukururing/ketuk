import { useState } from 'react'
import { motion } from 'framer-motion'
import { openCam } from '../Camera'
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

/** Figma: A1 Daftar Mitra Pengepul (550:6249) / A1c · Terisi (574:8431) — Pindai KTP → A1a; Lanjut → A2 Verifikasi */
export function MitraDaftar({ filled = false }: { filled?: boolean }) {
  const { d, go } = useStore()
  const [veh, setVeh] = useState('Motor roda tiga')
  const [cats, setCats] = useState(['Elektronik', 'Logam', 'Kardus'])
  const toggle = (c: string) => setCats(cs => (cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c]))
  return (
    <div className="screen fit">
      <AppBar title="Daftar Mitra Pengepul" ink trailing={help(go)} />
      <div className="scroll" style={{ top: 116, bottom: 100 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 10 }}>
          <Stepper step={1} />
          <div className="row" style={{ gap: 12, padding: '14px 16px', borderRadius: 16, background: '#fff6e6', border: '1.5px solid var(--amber-500)' }}>
            <div className="col grow" style={{ gap: 2 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary-900)' }}>{filled ? 'Data KTP terisi otomatis' : 'Isi otomatis dari KTP'}</span>
              <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>{filled ? 'Periksa kembali sebelum lanjut' : 'Nama dan alamat terisi sendiri'}</span>
            </div>
            <button onClick={() => openCam(d, go, 'ktp')} className="nowrap" style={{ padding: '8px 14px', borderRadius: 999, background: 'var(--amber-500)', color: 'var(--primary-900)', fontWeight: 600, fontSize: 13 }}>{filled ? 'Pindai Ulang' : 'Pindai KTP'}</button>
          </div>
          {field('Nama lengkap (sesuai KTP)', 'Contoh: Budiman Sekti', filled ? 'Slamet Riyadi' : undefined)}
          {field('Nama lapak', 'Contoh: Maju Jaya')}
          {field('Alamat lapak', 'Contoh: Jl. Rungkut Industri III No. 7', filled ? 'Jl. Rungkut Industri III No. 7' : undefined)}
          <span className="t-body-ms">Kendaraan jemput</span>
          <div className="row" style={{ gap: 8 }}>
            {['Motor roda tiga', 'Pikap', 'Gerobak'].map(c => <button key={c} className={`chip${veh === c ? ' on' : ''}`} onClick={() => setVeh(c)}>{c}</button>)}
          </div>
          {field('Nomor plat kendaraan (sesuai STNK)', 'Contoh: L 1234 AB')}
          <div className="row" style={{ gap: 8, alignItems: 'flex-start' }}>
            <Img src="fi-info-15142b-16.svg" size={16} style={{ marginTop: 2, opacity: 0.6 }} />
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Wajib untuk Motor roda tiga & Pikap. Plat akan dicocokkan dengan STNK dan ditampilkan ke warga saat penjemputan.</span>
          </div>
          <span className="t-body-ms">Barang yang kamu beli</span>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {['Elektronik', 'Logam', 'Kardus', 'Perabot', 'Plastik'].map(c => <button key={c} className={`chip${cats.includes(c) ? ' on' : ''}`} onClick={() => toggle(c)}>{c}</button>)}
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" onClick={() => go('mitra-verifikasi')}><Img src="ic-arrow-right-white.svg" size={20} />Lanjut ke Verifikasi</button>
      </div>
      <StatusBar bg="var(--canvas)" />
    </div>
  )
}

/** Figma: A2 Verifikasi Identitas (30:2506) / A2g · Dokumen Lengkap (574:8972) — slots open the camera (A2a/A2c/A2e) or A2h Surat Kuasa */
export function MitraVerifikasi({ lengkap = false }: { lengkap?: boolean }) {
  const { s, d, go } = useStore()
  const [survei, setSurvei] = useState(true)
  const has = (k: string) => lengkap || !!s.v[k]
  const box = (on: boolean, dashed: boolean): React.CSSProperties => ({ flex: 1, flexBasis: 0, height: 126, gap: 6, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)',
    background: on ? 'var(--primary-50)' : dashed ? 'transparent' : '#fff', border: on ? '1.5px solid var(--primary-200)' : '1.5px dashed var(--ink-300)' })
  const circle = (ic: string, on: boolean, sq = false) => <div className="row" style={{ width: 52, height: 52, borderRadius: sq ? 'var(--radius-md)' : 999, background: on ? '#fff' : 'var(--line-100)', justifyContent: 'center' }}><Img src={ic} size={26} /></div>
  const ok = <span className="row nowrap t-body-s" style={{ gap: 4, color: 'var(--primary-500)' }}><Img src="ic-check-indigo14.svg" size={14} />Terunggah</span>
  const slot = (k: string, ic: string, label: string, hint: string, onClick: () => void) => {
    const on = has(k)
    return (
      <button key={k} onClick={onClick} className="col" style={box(on, true)}>
        {circle(ic, on)}<span className="t-body-ms nowrap">{label}</span>
        {on ? ok : <span className="t-body-s nowrap" style={{ color: 'var(--primary-500)' }}>{hint}</span>}
      </button>
    )
  }
  const id = (i: number) => (
    <div className="col" style={box(true, false)}>
      {circle(i === 0 ? 'ic-user-indigo26.svg' : 'ic-users-indigo26.svg', true, true)}
      <span className="t-body-ms nowrap">{i === 0 ? 'Foto KTP' : 'Selfie dengan KTP'}</span>
      <span className="tag tag-indigo"><Img src="ic-check-indigo14.svg" size={14} />Terunggah</span>
    </div>
  )
  return (
    <div className="screen fit">
      <AppBar title="Verifikasi Identitas" ink trailing={help(go)} />
      <div className="scroll" style={{ top: 116, bottom: 100 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <Stepper step={2} />
          <div className="row" style={{ gap: 12, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
            <Img src="ic-shield-indigo20.svg" size={20} />
            <span className="t-body-s grow" style={{ color: 'var(--primary-900)' }}>Data dienkripsi. Nama di STNK & nomor plat dicocokkan otomatis dengan data lapak.</span>
          </div>
          <div className="row" style={{ gap: 10 }}>{id(0)}{id(1)}</div>
          <div className="row" style={{ gap: 10 }}>
            {slot('docLapak', has('docLapak') ? 'ic-camera-indigo26.svg' : 'fi-camera-3a3950-26.svg', 'Foto lapak / gudang', 'Ketuk untuk unggah', () => openCam(d, go, 'lapak'))}
            {slot('docKendaraan', has('docKendaraan') ? 'ic-camera-indigo26.svg' : 'fi-camera-3a3950-26.svg', 'Foto kendaraan', 'Plat harus terlihat jelas', () => openCam(d, go, 'kendaraan'))}
          </div>
          <div className="row" style={{ gap: 10 }}>
            {slot('docStnk', 'fi-list-3a3950-26.svg', 'Foto STNK', 'Wajib | masih berlaku', () => openCam(d, go, 'stnk'))}
            {has('docStnk')
              ? <button onClick={() => go('a2h-kuasa')} className="col" style={{ ...box(false, true), opacity: 0.6 }}>{circle('fi-list-3a3950-26.svg', false)}<span className="t-body-ms nowrap">Surat kuasa</span><span className="t-body-s" style={{ color: 'var(--primary-500)' }}>Tidak diperlukan</span></button>
              : slot('docKuasa', 'fi-list-3a3950-26.svg', 'Surat kuasa', 'Opsional | STNK a.n. lain', () => go('a2h-kuasa'))}
          </div>
          <div className="row" style={{ gap: 12 }}>
            <Checkbox on={survei} onChange={setSurvei} />
            <span className="t-body-m grow" style={{ color: 'var(--ink-700)' }}>Saya bersedia lapak disurvei tim KETUK sebelum aktif.</span>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-primary" onClick={() => go('mitra-status')}><Img src="ic-shield-white20.svg" size={20} />Kirim Verifikasi</button>
      </div>
      <StatusBar bg="var(--canvas)" />
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
          <TimelineStep state="done" title="Dokumen identitas" meta="KTP, selfie, STNK & plat valid" />
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
      {/* Hero shrinks and moves up on short phones so it clears the pinned buttons */}
      <div className="abs" style={{ inset: 0, transformOrigin: '50% 0', transform: 'translateY(calc(var(--short, 0px) * 0.55)) scale(calc(1 + var(--shortn, 0) / 900))' }}>
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
      </div>
      <div className="fix col" style={{ left: 24, bottom: 52, width: 342, gap: 12, alignItems: 'center' }}>
        <button className="btn btn-inverse" onClick={() => go('radar', { root: true })}><Img src="ic-radar-p900.svg" size={20} />Mulai Menawar</button>
        <button className="t-label-m" style={{ color: 'var(--primary-200)' }} onClick={() => go('profil', { root: true })}>Lihat Profil Mitra</button>
      </div>
      <StatusBar inverse />
    </div>
  )
}
