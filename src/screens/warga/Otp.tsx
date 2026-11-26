import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, mmss } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

const CODE = '482913'

/** Figma: A4 Verifikasi OTP (9:165). OTP auto-fills after 0.8s (Figma: OTP → Variant2), keypad works too. */
export default function Otp() {
  const { go } = useStore()
  const [code, setCode] = useState('')
  const [left, setLeft] = useState(45)
  useEffect(() => {
    const t0 = setTimeout(() => {
      let k = 0
      const id = setInterval(() => { k++; setCode(c => (c.length >= k ? c : CODE.slice(0, k))); if (k >= 6) clearInterval(id) }, 110)
    }, 800)
    const cd = setInterval(() => setLeft(x => Math.max(0, x - 1)), 1000)
    return () => { clearTimeout(t0); clearInterval(cd) }
  }, [])
  const press = (k: string) => setCode(c => (k === 'del' ? c.slice(0, -1) : (c + k).slice(0, 6)))

  return (
    <div className="screen">
      <img src={A('masuk-ellipse1.svg')} alt="" className="abs" style={{ left: -221, top: -561, width: 883, height: 883 }} />
      <img src={A('masuk-ellipse2.svg')} alt="" className="abs" style={{ left: -466, top: 473, width: 883, height: 883 }} />
      <AppBar ink title="Verifikasi" bg="transparent" />

      <div className="abs col" style={{ left: 0, top: 128, width: 390, padding: '0 24px', gap: 12 }}>
        <span className="t-h1" style={{ color: 'var(--primary-500)', letterSpacing: -0.39 }}>Masukkan kode OTP</span>
        <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>Kode 6 digit sudah dikirim ke <b style={{ color: 'var(--ink-900)' }}>+62 812 3456 7890</b></span>
        <div className="row" style={{ gap: 10 }}>
          {Array.from({ length: 6 }, (_, i) => {
            const d = code[i]
            const active = i === code.length
            return (
              <div key={i} className="row grow" style={{ height: 60, borderRadius: 'var(--radius-md)', background: '#fff', justifyContent: 'center',
                border: `1.5px solid ${active || d ? 'var(--primary-500)' : i < 5 ? 'var(--primary-200)' : 'var(--line-200)'}` }}>
                {d ? <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="t-h2">{d}</motion.span>
                  : active && <div style={{ width: 2, height: 26, background: 'var(--primary-500)', animation: 'pulse-ring 1s steps(2) infinite' }} />}
              </div>
            )
          })}
        </div>
        <div style={{ height: 8 }} />
        <div className="row" style={{ gap: 6 }}>
          <span className="t-body-m" style={{ color: 'var(--ink-500)' }}>Tidak menerima kode?</span>
          <Img src="ic-clock-amber16.svg" size={16} />
          <span className="t-body-ms" style={{ color: 'var(--amber-700)' }}>Kirim ulang {mmss(left)}</span>
        </div>
        <div style={{ height: 8 }} />
        <button className="btn btn-primary" style={{ boxShadow: 'none' }} disabled={code.length < 6} onClick={() => go('peran')}>Verifikasi</button>
      </div>

      {/* Keypad pinned to the bottom; on short phones its keys get shorter so the Verifikasi button stays visible */}
      <div className="fix col" style={{ left: 0, bottom: 0, width: 390, height: 'calc(290px + var(--short, 0px) * 0.4)', background: 'var(--line-100)', padding: '12px 8px 40px', gap: 8 }}>
        {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', 'del']].map((row, r) => (
          <div key={r} className="row grow" style={{ gap: 8, alignItems: 'stretch' }}>
            {row.map((k, i) => k === '' ? <div key={i} className="grow" /> : (
              <button key={i} onClick={() => press(k)} className="row grow t-h2"
                style={{ borderRadius: 'var(--radius-sm)', justifyContent: 'center', background: k === 'del' ? 'transparent' : '#fff', boxShadow: k === 'del' ? 'none' : '0 1px 0 rgba(0,0,0,0.08)' }}>
                {k === 'del' ? <Img src="ic-chevron-left-ink.svg" size={24} /> : k}
              </button>
            ))}
          </div>
        ))}
      </div>
      <StatusBar />
    </div>
  )
}
