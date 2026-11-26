import { useEffect, useLayoutEffect, useState, type ComponentType, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StoreProvider, useStore, type Preset, type Role } from './store'
import { A, HomeIndicator } from './ui'
import { wargaScreens, pengepulScreens } from './screens'
import DemoPanel from './DemoPanel'

const W = 390
const H = 844
const BEZEL = 12

type Fit = { mobile: boolean; scale: number; height: number; landscapePhone: boolean; wide: boolean }

/**
 * Phones (< 560 px wide): the 390-wide design is scaled to the screen width and the canvas takes the
 * full screen height (so bottom navs and action bars sit at the real bottom of the phone).
 * Larger screens: the 390×844 phone is shown in a device frame, scaled to fit.
 */
function measure(prev?: Fit): Fit {
  const vw = window.innerWidth, vh = window.innerHeight
  const mobile = vw < 560
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
  const landscapePhone = !mobile && coarse && vh < 560
  if (mobile) {
    const scale = vw / W
    let height = vh / scale
    // On-screen keyboard (Android): keep the layout instead of squashing it while typing
    const typing = document.activeElement?.matches?.('input, textarea')
    if (prev?.mobile && typing && height < prev.height) height = prev.height
    return { mobile, scale, height, landscapePhone, wide: false }
  }
  const margin = landscapePhone ? 16 : 48
  return { mobile, landscapePhone, wide: vw >= 900, height: H, scale: Math.min(1, (vh - margin) / (H + BEZEL * 2), (vw - margin) / (W + BEZEL * 2)) }
}

function useFit() {
  const [fit, setFit] = useState<Fit>(() => measure())
  useLayoutEffect(() => {
    const on = () => setFit(f => measure(f))
    window.addEventListener('resize', on)
    window.addEventListener('orientationchange', on)
    return () => { window.removeEventListener('resize', on); window.removeEventListener('orientationchange', on) }
  }, [])
  return fit
}

/** CSS variables the screens use to adapt to the canvas height */
const canvasVars = (h: number) => ({
  '--vh-c': `${h}px`,
  '--page-h': `${Math.max(H, h)}px`,
  '--short': `${Math.min(0, h - H)}px`,
  '--shortn': `${Math.min(0, h - H)}`,
}) as CSSProperties

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
        <div className="viewport"><Screen /></div>
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
/** Keep overflow:hidden wrappers from being scrolled by the browser (focus, find-in-page, scrollIntoView) */
const pin = (e: React.UIEvent<HTMLElement>) => { const el = e.currentTarget; if (el.scrollTop || el.scrollLeft) { el.scrollTop = 0; el.scrollLeft = 0 } }

function Phone({ island }: { island?: boolean }) {
  const { s } = useStore()
  const cur = (s[s.role] as string[]).at(-1)!
  return (
    <div onScroll={pin} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--canvas)' }}>
      <Screens />
      <Toasts />
      {island && <Island dark={DARK.includes(cur)} />}
      <HomeIndicator inverse={DARK.includes(cur)} />
    </div>
  )
}

/** Phone-only presenter control, drawn like a Dynamic Island in the status bar: shows the active role, opens the demo panel */
function Island({ dark }: { dark: boolean }) {
  const { s, d } = useStore()
  const other = s.role === 'warga' ? 'pengepul' : 'warga'
  const unseen = s.toasts.some(t => t.role === other)
  return (
    <button aria-label="Panel demo" onClick={() => d({ type: 'panel' })} className="row t-label-s"
      style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 120, height: 32, padding: '0 14px', gap: 8,
        borderRadius: 999, background: dark ? 'rgba(255,255,255,.16)' : '#0b0a1f', color: '#fff', whiteSpace: 'nowrap',
      }}>
      <img src={A('logo-mark.png')} alt="" style={{ width: 18, height: 18, borderRadius: 5 }} />
      {s.role === 'warga' ? 'Warga' : 'Pengepul'}
      <span style={{ opacity: .55 }}>⇄</span>
      {unseen && <span style={{ width: 8, height: 8, borderRadius: 9, background: 'var(--amber-500)' }} />}
    </button>
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
  const { mobile, scale, height, landscapePhone, wide } = useFit()

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
      <div onScroll={pin} style={{ position: 'fixed', inset: 0, background: 'var(--canvas)', overflow: 'hidden' }}>
        <div style={{ width: W, height, transform: `scale(${scale})`, transformOrigin: '0 0', position: 'relative', ...canvasVars(height) }}>
          <Phone island />
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

      {wide && !landscapePhone && <div className="col" style={{ position: 'absolute', top: 32, left: 40, gap: 6, color: '#fff' }}>
        <div className="row" style={{ gap: 12 }}>
          <img src={A('logo-mark.png')} alt="" style={{ width: 44, height: 44 }} />
          <span style={{ fontWeight: 800, fontSize: 34, letterSpacing: -1, lineHeight: 1 }}>ketuk</span>
        </div>
        <span className="t-body-m" style={{ color: 'var(--primary-200)' }}>Sekali Ketuk, Harga Pasti.</span>
      </div>}
      <div style={{ position: 'absolute', top: landscapePhone ? 12 : 32, right: landscapePhone ? 12 : 40 }}><RoleSwitch /></div>
      <button onClick={() => d({ type: 'panel' })} className="t-body-s"
        style={{ position: 'absolute', bottom: landscapePhone ? 12 : 24, right: landscapePhone ? 12 : 40, color: 'rgba(255,255,255,.5)' }}>
        {landscapePhone ? 'Panel demo' : <>Panel demo: tekan <b>D</b></>}
      </button>
      {landscapePhone && (
        <span className="t-body-s" style={{ position: 'absolute', left: 12, bottom: 12, maxWidth: 180, color: 'rgba(255,255,255,.6)' }}>
          Putar HP ke posisi tegak untuk tampilan penuh
        </span>
      )}

      <div style={{ width: (W + BEZEL * 2) * scale, height: (H + BEZEL * 2) * scale, position: 'relative' }}>
        <div style={{
          width: W + BEZEL * 2, height: H + BEZEL * 2, padding: BEZEL, transform: `scale(${scale})`, transformOrigin: '0 0',
          borderRadius: 56, background: '#0b0a1f', boxShadow: '0 0 0 2px #2b2950, 0 40px 120px rgba(0,0,0,.55)',
        }}>
          <div style={{ width: W, height: H, borderRadius: 44, overflow: 'hidden', position: 'relative', transform: 'translateZ(0)', ...canvasVars(H) }}>
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
