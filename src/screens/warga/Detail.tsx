import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, ITEM, rp } from '../../store'
import { Img, StatusBar, AppBar, Toggle, ItemPhoto } from '../../ui'

/** Figma: B2 Detail & Patokan Harga AI (10:442) */
export default function Detail() {
  const { d, go } = useStore()
  const [menyala, setMenyala] = useState(true)
  const [baterai, setBaterai] = useState(false)
  const [slot, setSlot] = useState(0)

  return (
    <div className="screen">
      <AppBar title="Detail Barang" trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />

      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          {/* Foto */}
          <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
            <ItemPhoto size={84} />
            <button onClick={() => go('foto')} className="col" style={{ width: 84, height: 84, borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--primary-200)', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Img src="ic-plus-indigo.svg" size={20} />
              <span className="t-body-s" style={{ color: 'var(--primary-500)' }}>Label</span>
            </button>
          </div>

          {/* Nama */}
          <div className="col" style={{ gap: 8 }}>
            <div className="row" style={{ gap: 8 }}>
              <span className="t-h2 nowrap" style={{ color: 'var(--primary-600)' }}>{ITEM.name}</span>
              <Img src="ic-edit-indigo.svg" size={18} />
            </div>
            <div className="row" style={{ gap: 8 }}>
              <span className="tag tag-indigo"><Img src="ic-tag-indigo.svg" size={14} />{ITEM.category}</span>
              <span className="tag tag-neutral"><Img src="ic-spark-ink.svg" size={14} />Dikenali AI</span>
            </div>
          </div>

          {/* Kondisi */}
          <div className="col" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 16, gap: 12 }}>
            <div className="row" style={{ gap: 12 }}>
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-body-ms">Masih menyala?</span>
                <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Bantu pengepul menaksir lebih tepat</span>
              </div>
              <Toggle on={menyala} onChange={setMenyala} />
            </div>
            <div style={{ height: 1, background: 'var(--line-200)' }} />
            <div className="row" style={{ gap: 12 }}>
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-body-ms">Ada baterai?</span>
                <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Jika ya, masuk Jalur E-waste Aman</span>
              </div>
              <Toggle on={baterai} onChange={setBaterai} />
            </div>
          </div>

          {/* Patokan Harga AI */}
          <div className="col" style={{ background: 'var(--primary-900)', borderRadius: 'var(--radius-lg)', padding: 18, gap: 10 }}>
            <div className="row" style={{ gap: 8 }}>
              <Img src="ic-spark-amber.svg" size={18} />
              <span className="t-overline grow" style={{ color: 'var(--primary-200)' }}>Patokan Harga AI</span>
              <span className="tag tag-glass">keyakinan {ITEM.confidence}%</span>
            </div>
            <span className="t-num-l nowrap" style={{ color: '#fff' }}>{rp(ITEM.aiLow)}–{rp(ITEM.aiHigh)}</span>
            <div style={{ position: 'relative', height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.14)' }}>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                style={{ position: 'absolute', left: 91.8, width: 137.7, top: 0, height: 10, borderRadius: 5, background: 'var(--amber-500)', transformOrigin: 'left' }} />
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} style={{ position: 'absolute', left: 176.6, top: -2 }}>
                <Img src="range-thumb.svg" size={14} />
              </motion.div>
            </div>
            <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{ITEM.basis} Kamu tidak perlu memasang harga.</span>
            <div className="row" style={{ gap: 4, padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.16)' }}>
              <Img src="ic-shield-white.svg" size={14} />
              <span className="t-label-s grow" style={{ color: '#fff' }}>Perkiraan, bukan jaminan. Harga akhir mengikuti tawaran pengepul</span>
            </div>
          </div>

          {/* Jendela jemput */}
          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Jendela jemput</span>
            <div className="row" style={{ gap: 8 }}>
              {['Hari ini 15–18', 'Besok 08–11'].map((c, i) => (
                <button key={c} className={`chip${slot === i ? ' on' : ''}`} onClick={() => setSlot(i)}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }}
          onClick={() => { d({ type: 'startSession' }); go('sesi', { root: true }) }}>
          <Img src="ic-clock-white.svg" size={20} />Mulai Sesi Ketuk 60 Menit
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
