import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../store'
import { A, Img, StatusBar } from '../ui'

/**
 * One camera layout used by every "Ambil Foto" frame in Figma. Each mode = one pair of frames:
 * a blurred one ("Foto buram · ketuk layar untuk fokus") and a sharp one ("Terdeteksi: …").
 * Tapping the viewfinder (Figma: the "Langkah 1 dari 3" hotspot) focuses; Shutter/Lanjut go on.
 */
type Cam = {
  title: string; steps: [string, string, string]; step?: number; guide: string
  photo: string; box?: [number, number, number, number]; blur?: boolean
  detect: string; blurText?: string; blurColor?: string
  doc?: boolean; noSteps?: boolean
  hint: string; hint2: string; hint2Color?: string; buramHint2?: string; buramHint2Color?: string
  accentNext?: boolean // C1: amber "Lanjut" while blurred
  next: string; gallery?: string
}

export const CAMS: Record<string, Cam> = {
  /** B2 Ambil Foto (Buram) 552:5888 → B2 Ambil Foto 10:351 → B2 Ubah Kategori; Galeri → B2 Detail */
  kipas: { title: 'Foto Barang', steps: ['1  Sisi depan', '2  Sisi rusak', '3  Label'], guide: 'Langkah 1 dari 3 | arahkan ke sisi depan',
    photo: 'cam-kipas.jpg', blur: true, detect: 'Terdeteksi: Kipas angin | Elektronik', blurColor: '#d93b2b',
    hint: '1 dari 3 foto', hint2: 'Minimal 1 foto', next: 'kategori', gallery: 'detail' },
  /** C1 Ambil Foto 550:6355 (buram) → C1 Ambil Foto 254:5681 → C1 Ubah Kategori; Galeri → C1 Gambar Tidak Dikenali */
  dispenser: { title: 'Foto Barang', steps: ['1  Sisi depan', '2  Sisi rusak', '3  Label'], guide: 'Langkah 1 dari 3 | arahkan ke sisi depan',
    photo: 'photo-dispenser-c1.jpg', blur: true, detect: 'Terdeteksi: Dispenser | Elektronik', blurColor: '#c62828',
    hint: '1 dari 3 foto', hint2: 'Minimal 1 foto', buramHint2: 'Cukup 1 foto untuk mulai', buramHint2Color: '#c97800', accentNext: true,
    next: 'kategori', gallery: 'detail' },
  /** D4 Foto Barang Pindahan (Buram) 552:6125 → 552:6171 → D4 Mode Pindahan */
  pindahan: { title: 'Foto Barang', steps: ['1  Sisi depan', '2  Sisi rusak', '3  Label'], guide: 'Langkah 1 dari 3 | arahkan ke sisi depan',
    photo: 'cam-kipas.jpg', blur: true, detect: 'Terdeteksi: Kipas angin | Elektronik', blurColor: '#d93b2b',
    hint: '1 dari 3 foto', hint2: 'Minimal 1 foto', next: 'pindahan', gallery: 'pindahan' },
  /** H1 Foto Kondisi Barang (Buram) 555:6385 → 555:6316 → H2 Mencari Pengepul */
  lepas: { title: 'Foto Kondisi', steps: ['1  Tampak depan', '2  Tampak atas', '3  Tumpukan'], guide: 'Langkah 1 dari 3 | foto seluruh tumpukan',
    photo: 'cam-kardus.png', blur: true, detect: 'Terdeteksi: Kardus | ±12 kg | kering', blurColor: '#d93b2b',
    hint: '1 dari 3 foto', hint2: 'Min. 2 foto | ≤ 24 jam', next: 'h2-mencari' },
  /** I1 Foto E-waste (Buram) 557:6894 → 557:6809 → I2 Sesi Ketuk E-waste Radar */
  ewaste: { title: 'Foto E-waste', steps: ['1  Depan', '2  Belakang', '3  Layar IMEI'], guide: 'Langkah 1 dari 3 | foto layar & bodi depan',
    photo: 'cam-hp.png', box: [96, 54, 150, 290], blur: true, detect: 'Terdeteksi: HP | layar pecah | baterai normal', blurColor: '#d93b2b',
    hint: '1 dari 3 foto', hint2: 'Wajib 3 foto', next: 'i2-radar' },
  /** Pengepul A1a Pindai KTP 574:8289 → A1b Konfirmasi Data KTP */
  ktp: { title: 'Pindai KTP', steps: ['1  Sisi depan', '2  Sisi rusak', '3  Label'], guide: 'Posisikan KTP di dalam bingkai',
    photo: 'cam-ktp.png', box: [1, 96, 341, 221], detect: 'KTP terdeteksi · tahan sebentar',
    hint: '1 dari 3 foto', hint2: 'Minimal 1 foto', next: 'a1b-ktp', doc: true, noSteps: true },
  /** Pengepul A2a Foto Lapak / Gudang 574:8539 → A2b Pratinjau */
  lapak: { title: 'Foto Lapak', steps: ['1  Lapak', '2  Kendaraan', '3  STNK'], guide: 'Langkah 1 dari 3 | tampak depan lapak / gudang',
    photo: 'cam-gudang.png', box: [26, 90, 290, 230], detect: 'Terdeteksi: Gudang barang bekas',
    hint: '1 dari 3 foto', hint2: 'Minimal 1 foto', next: 'a2b-pratinjau', doc: true },
  /** Pengepul A2c Foto Kendaraan 574:8675 → A2d Pratinjau */
  kendaraan: { title: 'Foto Kendaraan', steps: ['1  Lapak', '2  Kendaraan', '3  STNK'], step: 1, guide: 'Langkah 2 dari 3 | plat nomor harus terlihat',
    photo: 'cam-truk.png', detect: 'Plat terbaca: L 1234 AB',
    hint: '1 dari 3 foto', hint2: 'Minimal 1 foto', next: 'a2d-pratinjau', doc: true },
  /** Pengepul A2e Foto STNK 574:8822 → A2f Pratinjau */
  stnk: { title: 'Foto STNK', steps: ['1  Lapak', '2  Kendaraan', '3  STNK'], step: 2, guide: 'Langkah 3 dari 3 | sisi depan STNK, tanpa pantulan',
    photo: 'cam-stnk.png', box: [21, 98, 300, 214], detect: 'STNK terdeteksi · tahan sebentar',
    hint: '1 dari 3 foto', hint2: 'Minimal 1 foto', next: 'a2f-pratinjau', doc: true },
}

/** Open the camera in a given mode (sharp = skip the blurred first frame, e.g. "Foto Ulang") */
export const openCam = (d: (a: { type: 'set'; v: Record<string, string | number | boolean> }) => void, go: (s: string) => void, mode: string, sharp = false) => {
  d({ type: 'set', v: { cam: mode, camSharp: sharp } }); go('foto')
}

export default function Camera() {
  const { s, d, go, back } = useStore()
  const mode = String(s.v.cam ?? (s.scenario === 'dispenser' ? 'dispenser' : 'kipas'))
  const c = CAMS[mode] ?? CAMS.kipas
  const [sharp, setSharp] = useState(!c.blur || !!s.v.camSharp)
  const [scan, setScan] = useState(false)
  const [flash, setFlash] = useState(false)
  const file = useRef<HTMLInputElement>(null)
  const userPhoto = (mode === 'kipas' || mode === 'dispenser') && s.photo
  const photo = userPhoto || A(c.photo)
  const [bx, by, bw, bh] = c.box ?? [0, 0, 342, 410]

  const shoot = () => {
    if (!sharp) { setSharp(true); return }
    if (scan) return
    setFlash(true); setTimeout(() => setFlash(false), 180)
    setScan(true); setTimeout(() => go(c.next), 650)
  }
  const gallery = () => {
    if (mode === 'dispenser') { d({ type: 'set', v: { detail: 'unknown' } }); go('detail'); return } // C1 Galeri → Gambar Tidak Dikenali
    if (mode === 'kipas') { file.current?.click(); return }
    if (c.gallery) go(c.gallery)
  }
  const onFile = (f?: File) => {
    if (!f) return
    const r = new FileReader()
    r.onload = () => { d({ type: 'photo', photo: String(r.result) }); go(c.gallery ?? c.next) }
    r.readAsDataURL(f)
  }

  return (
    <div className="screen" style={{ background: 'var(--ink-900)' }}>
      <div className="abs row" style={{ left: 24, top: 56, width: 342, height: 44, justifyContent: 'space-between' }}>
        <button onClick={back} className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }} aria-label="Tutup">
          <Img src="ic-x-white.svg" size={20} />
        </button>
        <span className="t-h3" style={{ color: '#fff' }}>{c.title}</span>
        <div className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }}>
          <Img src="ic-flash-white.svg" size={20} />
        </div>
      </div>

      {!c.noSteps && <div className="abs row" style={{ left: 24, top: 116, width: 342, height: 34, gap: 8 }}>
        {c.steps.map((t, i) => (
          <div key={t} className="row grow t-label-s" style={{ height: 34, borderRadius: 999, justifyContent: 'center', whiteSpace: 'pre', background: i === (c.step ?? 0) ? 'var(--amber-500)' : 'rgba(255,255,255,0.12)', color: i === (c.step ?? 0) ? 'var(--ink-900)' : '#fff' }}>{t}</div>
        ))}
      </div>}

      {/* Viewfinder — tap to focus */}
      <button aria-label="Fokuskan kamera" onClick={() => setSharp(true)} className="abs" style={{ left: 24, top: 166, width: 342, height: 410, borderRadius: 28, overflow: 'hidden', background: c.box ? 'rgba(255,255,255,0.06)' : undefined }}>
        <motion.img src={photo} alt="" initial={false} animate={{ filter: sharp ? 'blur(0px)' : 'blur(7px)' }} transition={{ duration: 0.35 }}
          style={{ position: 'absolute', left: bx, top: by, width: bw, height: bh, objectFit: 'cover', borderRadius: c.box ? 14 : 28 }} />
        <img src={A('bracket.svg')} alt="" className="abs" style={{ left: 30, top: 56, width: 282, height: 282 }} />
        {[114, 228].map(x => <div key={x} className="abs" style={{ left: x, top: 0, width: 1, height: 410, background: 'rgba(255,255,255,0.12)' }} />)}
        {[137, 274].map(y => <div key={y} className="abs" style={{ left: 0, top: y, width: 342, height: 1, background: 'rgba(255,255,255,0.12)' }} />)}
        <div className="abs row t-body-s nowrap" style={{ left: '50%', transform: 'translateX(-50%)', top: 16, padding: '6px 12px', borderRadius: 999, background: 'rgba(21,20,43,0.6)', color: '#fff' }}>{c.guide}</div>
        <AnimatePresence mode="wait">
          <motion.div key={String(sharp)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="abs row" style={{ left: '50%', x: '-50%', top: 356, gap: 8, padding: '8px 14px 8px 10px', borderRadius: 999, background: '#fff', boxShadow: 'var(--elev-2)' }}>
            {scan ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid var(--primary-100)', borderTopColor: 'var(--primary-500)', animation: 'spin .8s linear infinite' }} />
              : <Img src="ic-spark-indigo.svg" size={18} />}
            <span className="t-label-s nowrap" style={{ color: sharp ? 'var(--ink-900)' : c.blurColor }}>{sharp ? c.detect : (c.blurText ?? 'Foto buram · ketuk layar untuk fokus')}</span>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>{flash && <motion.div initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} className="abs" style={{ inset: 0, background: '#fff' }} />}</AnimatePresence>
      </button>

      {!c.doc && <div className="abs row" style={{ left: 24, top: 576, height: 78, gap: 10 }}>
        <div style={{ position: 'relative', width: 60, height: 60 }}>
          <img src={photo} alt="" style={{ width: 60, height: 60, borderRadius: 14, objectFit: c.box ? 'contain' : 'cover', background: c.box ? 'rgba(255,255,255,0.08)' : undefined }} />
          <div className="abs row" style={{ left: 46, top: -8, width: 20, height: 20, borderRadius: 999, background: 'var(--amber-500)', justifyContent: 'center' }}><Img src="ic-check-ink.svg" size={12} /></div>
        </div>
        {[0, 1].map(i => (
          <div key={i} className="row" style={{ width: 60, height: 60, borderRadius: 14, border: '1.5px dashed rgba(255,255,255,0.35)', justifyContent: 'center' }}><Img src="ic-plus-white.svg" size={20} /></div>
        ))}
        <div className="col nowrap" style={{ gap: 2 }}>
          <span className="t-label-s" style={{ color: '#fff' }}>{c.hint}</span>
          <span className="t-body-s" style={{ color: !sharp && c.buramHint2Color ? c.buramHint2Color : (c.hint2Color ?? 'var(--primary-200)') }}>{!sharp && c.buramHint2 ? c.buramHint2 : c.hint2}</span>
        </div>
      </div>}

      <div className="fix row" style={{ left: 24, bottom: 70, width: 342, height: 84, justifyContent: 'space-between' }}>
        <button onClick={gallery} className="row" style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }} aria-label="Galeri">
          <Img src="ic-image-white.svg" size={24} />
        </button>
        <input ref={file} type="file" accept="image/*" capture="environment" hidden onChange={e => onFile(e.target.files?.[0])} />
        <motion.button whileTap={{ scale: 0.9 }} onClick={shoot} aria-label="Ambil foto" style={{ width: 84, height: 84 }}>
          <Img src="shutter.svg" size={84} />
        </motion.button>
        <button onClick={() => (sharp ? go(c.next) : setSharp(true))} className="btn btn-m"
          style={{ background: !sharp && c.accentNext ? 'var(--amber-500)' : '#fff', color: 'var(--primary-900)' }}>
          <Img src="ic-arrow-right-indigo.svg" size={20} />Lanjut
        </button>
      </div>
      <StatusBar inverse />
    </div>
  )
}
