import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar } from '../../ui'

/** Figma: A1 Splash Screen (55:3609). Tap anywhere (or wait) to continue. */
export default function Splash() {
  const { go } = useStore()
  const next = () => go('beranda', { replace: true })
  useEffect(() => { const id = setTimeout(next, 2600); return () => clearTimeout(id) }) // eslint-disable-line
  return (
    <div className="screen" style={{ background: 'var(--primary-900)', cursor: 'pointer' }} onClick={next}>
      <motion.div className="abs" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1 }}
        style={{
          left: -1086.2, top: 3.46, width: 1716.81, height: 966.219,
          WebkitMaskImage: `url(${A('splash-mask.svg')})`, maskImage: `url(${A('splash-mask.svg')})`,
          WebkitMaskPosition: '992.203px -283.457px', maskPosition: '992.203px -283.457px',
          WebkitMaskSize: '833.238px 1145px', maskSize: '833.238px 1145px',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        }}>
        <img src={A('splash-photo.jpg')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
      <Img src="deco-dot-amber.svg" size={12} className="abs" style={{ left: -10.72, top: 448.89 }} />
      <motion.div className="abs" style={{ left: 137, top: 286 }} initial={{ scale: 0.6, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }}>
        <img src={A('logo-mark-group.svg')} alt="" style={{ width: 116, height: 116 }} />
      </motion.div>
      <motion.span className="abs nowrap" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        style={{ left: 0, width: 390, textAlign: 'center', top: 418, fontWeight: 800, fontSize: 52, lineHeight: '56px', letterSpacing: -2.08, color: '#fff' }}>Ketuk</motion.span>
      <motion.span className="abs t-body-l nowrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
        style={{ left: 0, width: 390, textAlign: 'center', top: 490, color: 'var(--primary-200)' }}>Sekali Ketuk, Harga Pasti.</motion.span>
      <div className="abs" style={{ left: 163, top: 700, width: 64, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
        <motion.div initial={{ width: 1 }} animate={{ width: 64 }} transition={{ duration: 2.4, ease: 'easeInOut' }} style={{ height: 4, borderRadius: 999, background: '#fff' }} />
      </div>
      <StatusBar inverse />
    </div>
  )
}
