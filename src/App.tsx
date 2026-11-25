import { useEffect, useLayoutEffect, useState, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StoreProvider, useStore, type Preset, type Role } from './store'
import { A, HomeIndicator } from './ui'
import { wargaScreens, pengepulScreens } from './screens'
import DemoPanel from './DemoPanel'

const W = 390
const H = 844
const BEZEL = 12

/** Scale the 390×844 phone to fit the viewport. On a real phone: fill the screen. */
function useFit() {
  const calc = () => {
    const vw = window.innerWidth, vh = window.innerHeight
    const mobile = vw < 560
    if (mobile) return { mobile, scale: vw / W }
    return { mobile, scale: Math.min(1, (vh - 48) / (H + BEZEL * 2), (vw - 48) / (W + BEZEL * 2)) }
  }
  const [fit, setFit] = useState(calc)
  useLayoutEffect(() => {
    const on = () => setFit(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return fit
}

function Screens() {
  const { s } = useStore()
  const stack = s[s.role] as string[]
  const key = `${s.role}:${stack.at(-1)}`
  const map = (s.role === 'warga' ? wargaScreens : pengepulScreens) as Record<string, ComponentType>
  const Screen = map[stack.at(-1)!] ?? (() => <div className="screen row" style={{ justifyContent: 'center' }}>{stack.at(-1)}</div>)
  const [dir, setDir] = useState(1)
  const [prevLen, setPrevLen] = useState(stack.length)
  if (prevLen !== stack.length) { setDir(stack.length >= prevLen ? 1 : -1); setPrevLen(stack.length) }
  return (
    <AnimatePresence initial={false} custom={dir} mode="popLayout">
      <motion.div
        key={key}
        custom={dir}
        variants={{
          enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
        }}
        initial="enter" animate="center" exit="exit"
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Screen />
      </motion.div>
    </AnimatePresence>
  )
}

/** iOS-style push banner for cross-role events (e.g. a new offer while you're on the Pengepul side) */
function Toasts() {
  const { s, d, go } = useStore()
  const cur = (s[s.role] as string[]).at(-1)
  const t = s.toasts.find(x => x.role === s.role && x.go !== cur)
  useEffect(() => {
    if (!t) return
    const id = setTimeout(() => d({ type: 'dismissToast', id: t.id }), 4200)
    return () => clearTimeout(id)
  }, [t, d])
  return (
    <AnimatePresence>
      {t && (
        <motion.button
          key={t.id}
          initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          onClick={() => { d({ type: 'dismissToast', id: t.id }); if (t.go) go(t.go) }}
          className="row"
          style={{
            position: 'absolute', top: 54, left: 12, right: 12, zIndex: 100, gap: 12, padding: 12, textAlign: 'left',
            borderRadius: 22, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
            boxShadow: '0 12px 32px rgba(27,23,96,0.28)',
          }}
        >
          <img src={A('logo-mark.png')} alt="" style={{ width: 38, height: 38, borderRadius: 10, flex: 'none' }} />
          <div className="col grow" style={{ gap: 1 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="t-label-s" style={{ color: 'var(--ink-500)', letterSpacing: 0.4 }}>KETUK{t.role === 'pengepul' ? ' MITRA' : ''}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-300)' }}>sekarang</span>
            </div>
            <span className="t-body-ms">{t.title}</span>
            <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>{t.body}</span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const DARK = ['foto', 'splash', 'berhasil', 'mitra-ok']
function Phone() {
  const { s } = useStore()
  const cur = (s[s.role] as string[]).at(-1)!
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--canvas)' }}>
      <Screens />
      <Toasts />
      <HomeIndicator inverse={DARK.includes(cur)} />
    </div>
  )
}

function RoleSwitch() {
  const { s, d } = useStore()
  const opts: [Role, string][] = [['warga', 'Warga'], ['pengepul', 'Pengepul']]
  return (
    <div className="row" style={{ gap: 4, padding: 4, borderRadius: 999, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)' }}>
      {opts.map(([r, label]) => {
        const unseen = s.role !== r && s.toasts.some(t => t.role === r)
        return (
          <button key={r} onClick={() => d({ type: 'role', role: r })} className="t-label-s row"
            style={{ position: 'relative', gap: 6, padding: '8px 16px', borderRadius: 999, color: s.role === r ? 'var(--primary-900)' : 'rgba(255,255,255,.75)', background: s.role === r ? '#fff' : 'transparent', transition: 'all .2s' }}>
            {label}
            {unseen && <span style={{ width: 8, height: 8, borderRadius: 9, background: 'var(--amber-500)' }} />}
          </button>
        )
      })}
    </div>
  )
}

function Stage() {
  const { s, d } = useStore()
  const { mobile, scale } = useFit()

  // Presenter shortcuts
  useEffect(() => {
    const presets: Preset[] = ['awal', 'sesi', 'pengepul', 'menang', 'serah', 'koreksi', 'selesai']
    const on = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input,textarea')) return
      const k = e.key.toLowerCase()
      if (k === 'd' || k === '`') d({ type: 'panel' })
      else if (k === 'tab') { e.preventDefault(); d({ type: 'role', role: s.role === 'warga' ? 'pengepul' : 'warga' }) }
      else if (k === 'escape') d({ type: 'panel', open: false })
      else if (k === 'r' && e.shiftKey) d({ type: 'reset' })
      else if (k === 'f') d({ type: 'speed', speed: s.speed === 1 ? 30 : 1 })
      else if (k === 'o') d({ type: 'offer', id: 'ps' })
      else if (/^[1-7]$/.test(k)) d({ type: 'jump', preset: presets[+k - 1] })
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [d, s.role, s.speed])

  if (mobile) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'var(--canvas)', overflow: 'hidden' }}>
        <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: '0 0', position: 'relative' }}>
          <Phone />
        </div>
        <DemoPanel />
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(1200px 700px at 70% 20%, #2a1fa8 0%, #1b1760 45%, #0f0d33 100%)',
    }}>
      {/* decorative rings, echoing the Cover page */}
      {[1500, 1150, 820, 520].map((sz, i) => (
        <div key={sz} style={{ position: 'absolute', width: sz, height: sz, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 1 - i * 0.12 }} />
      ))}

      <div className="col" style={{ position: 'absolute', top: 32, left: 40, gap: 6, color: '#fff' }}>
        <div className="row" style={{ gap: 12 }}>
          <img src={A('logo-mark.png')} alt="" style={{ width: 44, height: 44 }} />
          <span style={{ fontWeight: 800, fontSize: 34, letterSpacing: -1, lineHeight: 1 }}>ketuk</span>
        </div>
        <span className="t-body-m" style={{ color: 'var(--primary-200)' }}>Sekali Ketuk, Harga Pasti.</span>
      </div>
      <div style={{ position: 'absolute', top: 32, right: 40 }}><RoleSwitch /></div>
      <button onClick={() => d({ type: 'panel' })} className="t-body-s"
        style={{ position: 'absolute', bottom: 24, right: 40, color: 'rgba(255,255,255,.35)' }}>
        Panel demo: tekan <b>D</b>
      </button>

      <div style={{ width: (W + BEZEL * 2) * scale, height: (H + BEZEL * 2) * scale, position: 'relative' }}>
        <div style={{
          width: W + BEZEL * 2, height: H + BEZEL * 2, padding: BEZEL, transform: `scale(${scale})`, transformOrigin: '0 0',
          borderRadius: 56, background: '#0b0a1f', boxShadow: '0 0 0 2px #2b2950, 0 40px 120px rgba(0,0,0,.55)',
        }}>
          <div style={{ width: W, height: H, borderRadius: 44, overflow: 'hidden', position: 'relative', transform: 'translateZ(0)' }}>
            <Phone />
          </div>
        </div>
      </div>
      <DemoPanel />
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Stage />
    </StoreProvider>
  )
}
