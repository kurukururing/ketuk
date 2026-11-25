import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar, itemPhoto } from '../../ui'

type Phase = 'aim' | 'scan' | 'done'

/** Figma: B2 Ambil Foto (10:351). Shutter = simulated capture + AI detection; gallery = real photo upload/camera. */
export default function Foto() {
  const { s, d, go, back } = useStore()
  const [phase, setPhase] = useState<Phase>('aim')
  const [flash, setFlash] = useState(false)
  const file = useRef<HTMLInputElement>(null)
  const photo = itemPhoto(s)
  // Figma: B2 Shutter → Detail; C1 (dispenser) Shutter → Ubah Kategori → Detail
  const nextScreen = s.scenario === 'dispenser' ? 'kategori' : 'detail'
  const detected = s.scenario === 'dispenser' ? (s.retake ? 'Dispenser | Elektronik' : 'Buram | Elektronik') : 'Kipas angin | Elektronik'

  const capture = () => {
    if (phase === 'scan') return
    setFlash(true)
    setTimeout(() => setFlash(false), 180)
    setPhase('scan')
    setTimeout(() => setPhase('done'), 1400)
    setTimeout(() => go(nextScreen), 2100)
  }
  const onFile = (f?: File) => {
    if (!f) return
    const r = new FileReader()
    r.onload = () => { d({ type: 'photo', photo: String(r.result) }); capture() }
    r.readAsDataURL(f)
  }

  return (
    <div className="screen" style={{ background: 'var(--ink-900)' }}>
      {/* Topbar */}
      <div className="abs row" style={{ left: 24, top: 56, width: 342, height: 44, justifyContent: 'space-between' }}>
        <button onClick={back} className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }} aria-label="Tutup">
          <Img src="ic-x-white.svg" size={20} />
        </button>
        <span className="t-h3" style={{ color: '#fff' }}>Foto Barang</span>
        <div className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }}>
          <Img src="ic-flash-white.svg" size={20} />
        </div>
      </div>

      {/* Panduan foto */}
      <div className="abs row" style={{ left: 24, top: 116, width: 342, height: 34, gap: 8 }}>
        {['1  Sisi depan', '2  Sisi rusak', '3  Label'].map((t, i) => (
          <div key={t} className="row grow t-label-s" style={{ height: 34, borderRadius: 999, justifyContent: 'center', whiteSpace: 'pre', background: i === 0 ? 'var(--amber-500)' : 'rgba(255,255,255,0.12)', color: i === 0 ? 'var(--ink-900)' : '#fff' }}>{t}</div>
        ))}
      </div>

      {/* Viewfinder */}
      <div className="abs" style={{ left: 24, top: 166, width: 342, height: 410, borderRadius: 28, overflow: 'hidden' }}>
        <motion.img src={photo} alt="" animate={phase === 'aim' ? { scale: [1.04, 1.06, 1.04] } : { scale: 1 }}
          transition={phase === 'aim' ? { duration: 4, repeat: Infinity } : { duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <motion.img src={A('bracket.svg')} alt="" className="abs" style={{ left: 30, top: 56, width: 282, height: 282 }}
          animate={phase === 'scan' ? { scale: [1, 0.95, 1] } : { scale: 1 }} transition={{ duration: 0.7, repeat: phase === 'scan' ? Infinity : 0 }} />
        {[114, 228].map(x => <div key={x} className="abs" style={{ left: x, top: 0, width: 1, height: 410, background: 'rgba(255,255,255,0.12)' }} />)}
        {[137, 274].map(y => <div key={y} className="abs" style={{ left: 0, top: y, width: 342, height: 1, background: 'rgba(255,255,255,0.12)' }} />)}
        {phase === 'scan' && (
          <motion.div className="abs" initial={{ top: 56 }} animate={{ top: [56, 330, 56] }} transition={{ duration: 1.4, ease: 'easeInOut' }}
            style={{ left: 30, width: 282, height: 3, borderRadius: 3, background: 'var(--amber-500)', boxShadow: '0 0 18px 4px rgba(245,165,36,.6)' }} />
        )}
        <div className="abs row t-body-s nowrap" style={{ left: '50%', transform: 'translateX(-50%)', top: 16, padding: '6px 12px', borderRadius: 999, background: 'rgba(21,20,43,0.6)', color: '#fff' }}>
          Langkah 1 dari 3 | arahkan ke sisi depan
        </div>
        <AnimatePresence mode="wait">
          {phase !== 'aim' && (
            <motion.div key={phase} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
              className="abs row" style={{ left: '50%', x: '-50%', top: 356, gap: 8, padding: '8px 14px 8px 10px', borderRadius: 999, background: '#fff', boxShadow: 'var(--elev-2)' }}>
              {phase === 'scan'
                ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid var(--primary-100)', borderTopColor: 'var(--primary-500)', animation: 'spin .8s linear infinite' }} />
                : <Img src="ic-spark-indigo.svg" size={18} />}
              <span className="t-label-s nowrap">{phase === 'scan' ? 'AI mengenali barang…' : `Terdeteksi: ${detected}`}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>{flash && <motion.div initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} className="abs" style={{ inset: 0, background: '#fff' }} />}</AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="abs row" style={{ left: 24, top: 576, height: 78, gap: 10 }}>
        <div style={{ position: 'relative', width: 60, height: 60 }}>
          {phase === 'done' ? (
            <motion.img initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={photo} alt="" style={{ width: 60, height: 60, borderRadius: 14, objectFit: 'cover' }} />
          ) : (
            <div className="row" style={{ width: 60, height: 60, borderRadius: 14, border: '1.5px dashed rgba(255,255,255,0.35)', justifyContent: 'center' }}><Img src="ic-plus-white.svg" size={20} /></div>
          )}
          {phase === 'done' && (
            <div className="abs row" style={{ left: 46, top: -8, width: 20, height: 20, borderRadius: 999, background: 'var(--amber-500)', justifyContent: 'center' }}><Img src="ic-check-ink.svg" size={12} /></div>
          )}
        </div>
        {[0, 1].map(i => (
          <div key={i} className="row" style={{ width: 60, height: 60, borderRadius: 14, border: '1.5px dashed rgba(255,255,255,0.35)', justifyContent: 'center' }}><Img src="ic-plus-white.svg" size={20} /></div>
        ))}
        <div className="col nowrap" style={{ gap: 2 }}>
          <span className="t-label-s" style={{ color: '#fff' }}>{phase === 'done' ? 1 : 0} dari 3 foto</span>
          <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>Minimal 1 foto</span>
        </div>
      </div>

      {/* Controls */}
      <div className="abs row" style={{ left: 24, top: 690, width: 342, height: 84, justifyContent: 'space-between' }}>
        <button onClick={() => file.current?.click()} className="row" style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }} aria-label="Galeri">
          <Img src="ic-image-white.svg" size={24} />
        </button>
        <input ref={file} type="file" accept="image/*" capture="environment" hidden onChange={e => onFile(e.target.files?.[0])} />
        <motion.button whileTap={{ scale: 0.9 }} onClick={capture} aria-label="Ambil foto" style={{ width: 84, height: 84 }}>
          <Img src="shutter.svg" size={84} />
        </motion.button>
        <button disabled={phase !== 'done'} onClick={() => go(nextScreen)} className="btn btn-inverse btn-m" style={{ opacity: phase === 'done' ? 1 : 0.4 }}>
          <Img src="ic-arrow-right-indigo.svg" size={20} />Lanjut
        </button>
      </div>
      <StatusBar inverse />
    </div>
  )
}
