import { useEffect, useState } from 'react'
import { motion, type Transition } from 'framer-motion'
import { useStore } from '../../store'
import { A, StatusBar } from '../../ui'

/**
 * Figma "Alur Utama": Splash Screen_1 → _8 (smart animate) → A1 Splash Screen (55:3609)
 * → A1 Splash Screen (125:6603, loader) → A2 Onboarding.
 *
 * Phases mirror the Figma frames:
 *  0 _1  empty
 *  1 _2  tiles + amber dot drop in from the top
 *  2 _3  hammer (Union) slides in from the right
 *  3 _4  knock (tilt)      4 _5 back
 *  5 _6  knock (tilt)      6 _7 back + sparks start
 *  7 _8  tiles & dot fly out, sparks + wordmark + photo appear
 *  8 A1 (55:3609) logo mark, loader empty
 *  9 A1 (125:6603) loader full → onboarding
 */
const SCHEDULE: [phase: number, at: number][] = [
  [1, 500], [2, 1200], [3, 1600], [4, 2000], [5, 2400], [6, 2800], [7, 3300], [8, 4850], [9, 5300],
]
const DONE_AT = 7000

const EASE: Transition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
const tr = (p: number): Transition =>
  p === 1 ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  : p === 7 ? { duration: 0.744, ease: [0.4, 0, 0.2, 1] }
  : p === 8 ? { duration: 0.4 }
  : EASE

const TILE = { width: 106, height: 115, borderRadius: 11, background: 'rgba(255,255,255,0.15)' }
// [x, y] in frames _3.._7, and [x, y, w, h] in frame _8
const TILES: [number, number, number, number, number, number][] = [
  [77, 114, -3157, -4155, 3145, 3412],
  [77, 243, -3157, -328, 3145, 3412],
  [198, 114, 433, -4155, 3145, 3412],
  [198, 243, 433, -328, 3145, 3412],
]
// Sparks (Vector 3/4/5 of "Group 1" in Splash Screen_8): x, y, Figma rotation
const SPARKS: [number, number, number][] = [
  [205.49, 305.02, 0], [219.86, 337.19, 111.72], [242.97, 309.4, -126.58],
]

export default function Splash() {
  const { go } = useStore()
  const [p, setP] = useState(0)
  const next = () => go('onboarding', { replace: true })

  useEffect(() => {
    const ids = SCHEDULE.map(([ph, at]) => setTimeout(() => setP(ph), at))
    ids.push(setTimeout(next, DONE_AT))
    return () => ids.forEach(clearTimeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const drop = p === 0 ? -868 : 0
  const knock = p === 3 || p === 5
  const t = tr(p)

  return (
    <div className="screen" style={{ background: 'var(--primary-900)', cursor: 'pointer', transform: 'translateY(calc(var(--short, 0px) / 2))' }} onClick={() => (p >= 7 ? next() : setP(7))}>
      {/* Photo background (Mask group) — appears in _8 */}
      <motion.div className="abs" initial={false} animate={{ opacity: p >= 7 ? 0.5 : 0 }} transition={t}
        style={{
          left: -1086.2, top: 3.46, width: 1716.81, height: 966.219,
          WebkitMaskImage: `url(${A('splash-mask.svg')})`, maskImage: `url(${A('splash-mask.svg')})`,
          WebkitMaskPosition: '992.203px -283.457px', maskPosition: '992.203px -283.457px',
          WebkitMaskSize: '833.238px 1145px', maskSize: '833.238px 1145px',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        }}>
        <img src={A('splash-photo.jpg')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>

      {/* 4 tiles */}
      {TILES.map(([x, y, bx, by, bw, bh], i) => (
        <motion.div key={i} className="abs" initial={false} transition={t}
          animate={p >= 7 ? { left: bx, top: by, width: bw, height: bh } : { left: x, top: y + drop, width: TILE.width, height: TILE.height }}
          style={{ borderRadius: TILE.borderRadius, background: TILE.background }} />
      ))}

      {/* Amber dot */}
      <motion.div className="abs" initial={false} transition={t}
        animate={p >= 7 ? { left: -3691, top: 3855, width: 890, height: 890 } : { left: 59, top: 384 + drop, width: 30, height: 30 }}
        style={{ borderRadius: '50%', background: 'var(--amber-500)' }} />

      {/* Hammer (Union) — slides in, knocks twice */}
      <motion.img src={A('splash-union.svg')} alt="" className="abs" initial={false} transition={t}
        animate={{
          left: p <= 1 ? 414 : knock ? 200.5 : 156.9,
          top: knock ? 281 : 310.6,
          rotate: knock ? 21.5 : 0,
          opacity: p >= 8 ? 0 : 1,
        }}
        style={{ width: 80.85, height: 80.19, transformOrigin: '0 0' }} />

      {/* Sparks */}
      {SPARKS.map(([x, y, rot], i) => (
        <motion.div key={i} className="abs" initial={false} transition={t}
          animate={{ opacity: p >= 6 && p < 8 ? 1 : 0, scale: p >= 7 ? 1 : 0.08 }}
          style={{ left: x, top: y, width: 10.19, height: 24.53, rotate: -rot, transformOrigin: '0 0' }}>
          <img src={A('splash-spark.svg')} alt="" style={{ position: 'absolute', left: -2.5, top: -3.03, width: 15.19, height: 30.6 }} />
        </motion.div>
      ))}

      {/* A1: logo mark replaces Union + sparks */}
      <motion.img src={A('logo-mark-group.svg')} alt="" className="abs" initial={false} animate={{ opacity: p >= 8 ? 1 : 0 }} transition={t}
        style={{ left: 137, top: 286, width: 116, height: 116 }} />
      <motion.div className="abs" initial={false} animate={{ opacity: p >= 8 ? 1 : 0 }} transition={t}
        style={{ left: -10.72, top: 448.89, width: 12, height: 12, borderRadius: '50%', background: 'var(--amber-500)' }} />

      {/* Wordmark + tagline */}
      <motion.span className="abs nowrap" initial={false} animate={{ opacity: p >= 7 ? 1 : 0 }} transition={t}
        style={{ left: 124, top: 418, width: 142, textAlign: 'center', fontWeight: 800, fontSize: 52, lineHeight: '56px', letterSpacing: -2.08, color: '#fff' }}>Ketuk</motion.span>
      <motion.span className="abs t-body-l nowrap" initial={false} animate={{ opacity: p >= 7 ? 1 : 0 }} transition={t}
        style={{ left: 98.5, top: 490, color: 'var(--primary-200)' }}>Sekali Ketuk, Harga Pasti.</motion.span>

      {/* Loader */}
      <motion.div className="abs" initial={false} animate={{ opacity: p >= 8 ? 1 : 0 }} transition={t}
        style={{ left: 163, top: 700, width: 64, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
        <motion.div initial={false} animate={{ width: p >= 9 ? 64 : 1 }} transition={{ duration: 1.6, ease: 'easeInOut' }}
          style={{ height: 4, borderRadius: 999, background: '#fff' }} />
      </motion.div>

      <StatusBar inverse />
    </div>
  )
}
