import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar } from '../../ui'

type Slide = {
  title: string; body: string; img: string
  box: { left: number; top: number; width: number; height: number }
  crop: { left: string; top: string; width: string; height: string }
}

/** Figma: A2 Onboarding (9:34) → A2 OnBoarding (23:1444) → A2 OnBoarding (23:1494) */
const SLIDES: Slide[] = [
  {
    title: 'Barangmu diperebutkan, harganya dikunci',
    body: 'Foto barang bekasmu tanpa pasang harga. Pengepul terverifikasi di sekitarmu bersaing menawar selama 60 menit, lalu harga yang kamu pilih terkunci.',
    img: 'onb-1.webp', box: { left: 31, top: 168, width: 328, height: 319 },
    crop: { left: '-0.9%', top: '-13.54%', width: '101.8%', height: '130.77%' },
  },
  {
    title: 'Tahu harga wajar sebelum menjual',
    body: 'Patokan Harga AI membaca fotomu dan transaksi serupa di Surabaya, jadi kamu tidak perlu menebak atau memasang harga sendiri.',
    img: 'onb-2.webp', box: { left: -15, top: 154, width: 420, height: 351 },
    crop: { left: '4.48%', top: '-15.95%', width: '91.05%', height: '136.18%' },
  },
  {
    title: 'Harga terkunci, koreksi wajib bukti',
    body: 'Setelah Ketuk Palu, harga tidak bisa ditawar ulang di depan pintu. Pengepul hanya bisa mengoreksi dengan foto bukti, dan kamu bebas menolak.',
    img: 'onb-3.webp', box: { left: 11, top: 189, width: 368, height: 302 },
    crop: { left: '0', top: '-22.66%', width: '100%', height: '152.34%' },
  },
]

export default function Onboarding() {
  const { go } = useStore()
  const [i, setI] = useState(0)
  const s = SLIDES[i]
  const last = i === SLIDES.length - 1
  const toMasuk = () => go('masuk', { replace: true })

  return (
    <div className="screen">
      <img src={A('onb-ellipse1.svg')} alt="" className="abs" style={{ left: -52, top: -432, width: 883, height: 883 }} />
      <img src={A('onb-ellipse2.svg')} alt="" className="abs" style={{ left: -478, top: 0, width: 883, height: 883 }} />
      <button className="abs t-label-m nowrap" style={{ left: 317, top: 64, color: 'var(--primary-500)', zIndex: 5 }} onClick={toMasuk}>Lewati</button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={i} className="abs" style={{ inset: 0 }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="abs" style={{ ...s.box, overflow: 'hidden' }}>
            <img src={A(s.img)} alt="" style={{ position: 'absolute', maxWidth: 'none', ...s.crop }} />
          </div>
          <div className="abs col" style={{ left: 0, top: 540, width: 390, padding: '0 24px', gap: 12 }}>
            <span className="t-h1" style={{ color: 'var(--primary-500)', letterSpacing: -0.39 }}>{s.title}</span>
            <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>{s.body}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="abs row" style={{ left: 24, top: 738, width: 342, height: 56, justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 8 }}>
          {SLIDES.map((_, k) => (
            <motion.div key={k} animate={{ width: k === i ? 28 : 8, backgroundColor: k === i ? '#3d2fd0' : '#d6d2fd' }}
              style={{ height: 8, borderRadius: 4 }} />
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: 'auto', boxShadow: 'none' }} onClick={() => (last ? toMasuk() : setI(i + 1))}>
          <Img src="ic-arrow-right-white.svg" size={20} />{last ? 'Mulai Sekarang' : 'Lanjut'}
        </button>
      </div>
      <StatusBar />
    </div>
  )
}
