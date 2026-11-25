import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore, ITEM, rp } from '../../store'
import { Img, StatusBar, AppBar, Checkbox, ItemPhoto } from '../../ui'

/** Figma: E1 Serah Terima (13:695) */
export default function Serah() {
  const { s, d, go } = useStore()
  const price = s.finalPrice ?? 38000
  const [checks, setChecks] = useState([true, true, false])
  const [method, setMethod] = useState<'tunai' | 'ewallet'>('tunai')
  const set = (i: number, v: boolean) => setChecks(c => c.map((x, j) => (j === i ? v : x)))
  const items = ['Barang sesuai foto saat dipasang', 'Kondisi sama, masih menyala', `Uang diterima ${rp(price)}`]

  const confirm = () => {
    setChecks([true, true, true])
    setTimeout(() => { d({ type: 'complete' }); go('selesai', { root: true }) }, 350)
  }

  return (
    <div className="screen">
      <AppBar ink title="Serah Terima" />
      <div className="scroll" style={{ top: 116, bottom: 130 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <AnimatePresence>
            {s.correction === 'pending' && (
              <motion.button initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onClick={() => go('koreksi')}
                className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--coral-100)', border: '1px solid var(--coral-500)', textAlign: 'left' }}>
                <div className="col grow" style={{ gap: 2 }}>
                  <span className="t-body-ms" style={{ color: 'var(--coral-700)' }}>Pak Slamet mengajukan koreksi harga</span>
                  <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>Dengan bukti foto | ketuk untuk meninjau</span>
                </div>
                <Img src="ic-chevron-right.svg" size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--amber-100)', border: '1px solid var(--amber-500)' }}>
            <div className="row" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--amber-500)', justifyContent: 'center' }}><Img src="ic-truck-ink.svg" size={22} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">Pak Slamet sudah tiba</span>
              <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>Tiba 15.58 | 2 menit lebih awal</span>
            </div>
          </div>

          <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--surface)' }}>
            <ItemPhoto size={60} />
            <div className="col grow" style={{ gap: 6 }}>
              <span className="t-body-ms nowrap">{ITEM.name}</span>
              <span className="tag tag-indigo" style={{ alignSelf: 'flex-start' }}><Img src="ic-lock-indigo14.svg" size={14} />Harga Terkunci</span>
            </div>
            <span className="t-num-m nowrap">{rp(price)}</span>
          </div>

          <div className="col" style={{ gap: 12, padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--surface)' }}>
            <span className="t-body-ms">Cek bersama pengepul</span>
            {items.map((t, i) => (
              <label key={t} className="row" style={{ gap: 12, cursor: 'pointer' }}>
                <Checkbox on={checks[i]} onChange={v => set(i, v)} />
                <span className="t-body-m grow" style={{ color: checks[i] ? 'var(--ink-900)' : 'var(--ink-500)' }}>{t}</span>
              </label>
            ))}
          </div>

          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Metode pembayaran</span>
            <div className="row" style={{ gap: 10, alignItems: 'stretch' }}>
              {([['tunai', 'Tunai', 'Dibayar di tempat', 'ic-cash-indigo.svg'], ['ewallet', 'E-wallet', 'Masuk ke saldo', 'ic-wallet-ink.svg']] as const).map(([k, t, sub, ic]) => (
                <button key={k} onClick={() => setMethod(k)} className="row grow"
                  style={{ gap: 10, padding: 12, borderRadius: 'var(--radius-lg)', background: '#fff', textAlign: 'left', border: method === k ? '2px solid var(--primary-500)' : '1.5px solid var(--line-200)' }}>
                  <div className="row" style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', justifyContent: 'center', background: method === k ? 'var(--primary-100)' : 'var(--line-100)' }}><Img src={ic} size={18} /></div>
                  <div className="col grow" style={{ gap: 2 }}>
                    <span className="t-body-ms">{t}</span>
                    <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{sub}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-bar" style={{ height: 130 }}>
        {/* Hidden hotspot (as in Figma): simulates the pengepul raising a correction */}
        <button className="t-label-s" style={{ color: 'transparent', height: 16 }}
          onClick={() => { if (s.correction === 'none') d({ type: 'requestCorrection' }); go('koreksi') }}>
          Pengepul ajukan koreksi harga?
        </button>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={confirm} disabled={s.correction === 'pending'}>
          <Img src="ic-check-white-20.svg" size={20} />Konfirmasi Terima {rp(price)}
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
