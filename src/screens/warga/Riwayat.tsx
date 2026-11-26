import { useState } from 'react'
import { useStore } from '../../store'
import { A, StatusBar, BottomNavWarga } from '../../ui'
import { setBukti, TX, type Tx } from './Bukti'

/** Figma: F1 Riwayat Transaksi (27:2139) — item → F1 Bukti Transaksi, Kasur busa → E1 Transaksi Dibatalkan */
export default function Riwayat() {
  const { d, go } = useStore()
  const [f, setF] = useState('Semua')
  const open = (t: Tx) => {
    if (t.status === 'Dibatalkan') { d({ type: 'demoState', scenario: 'borongan', phase: 'won' }); go('batal') }
    else { setBukti(t); go('bukti') }
  }
  const filt = (t: Tx) => f === 'Semua' || (f === 'Bulan ini' && t.month === 'November 2026') || (f === 'Elektronik' && t.cat === 'Elektronik') || (f === 'Dibatalkan' && t.status === 'Dibatalkan')
  const months = ['November 2026', 'Oktober 2026']
  return (
    <div className="screen fit">
      <span className="abs t-h1" style={{ left: 24, top: 60, letterSpacing: -0.39 }}>Riwayat</span>
      <div className="scroll" style={{ top: 112, bottom: 97 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row nowrap" style={{ gap: 12, padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--primary-900)', alignItems: 'flex-start' }}>
            {[['Rp412rb', 'total diterima', 'var(--amber-500)'], ['14', 'barang tersalur', '#fff'], ['41 kg', 'tidak ke TPA', '#fff']].map(([a, b, c]) => (
              <div key={b} className="col grow" style={{ gap: 2 }}><span className="t-num-m" style={{ color: c }}>{a}</span><span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{b}</span></div>
            ))}
          </div>
          <div className="row scroll" style={{ position: 'relative', gap: 8, margin: '0 -24px', padding: '0 24px' }}>
            {['Semua', 'Bulan ini', 'Elektronik', 'Dibatalkan'].map(c => <button key={c} className={`chip${f === c ? ' on' : ''}`} onClick={() => setF(c)}>{c}</button>)}
          </div>
          {months.map(m => {
            const list = TX.filter(t => t.month === m && filt(t))
            if (!list.length) return null
            return (
              <div key={m} className="col" style={{ gap: 12 }}>
                <span className="t-overline" style={{ color: 'var(--ink-500)' }}>{m}</span>
                <div className="col" style={{ padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
                  {list.map((t, i) => (
                    <button key={t.name} onClick={() => open(t)} className="row" style={{ gap: 12, padding: '12px 0', textAlign: 'left', borderBottom: i < list.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
                      <img src={A(t.img)} alt="" style={{ width: 44, height: 44, borderRadius: 14, objectFit: 'cover' }} />
                      <div className="col grow" style={{ gap: 2 }}>
                        <span className="t-body-ms">{t.name}</span>
                        <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{t.date} | {t.by}</span>
                      </div>
                      <div className="col" style={{ gap: 4, alignItems: 'flex-end' }}>
                        <span className="t-body-ms nowrap" style={{ color: t.status === 'Dibatalkan' ? 'var(--ink-500)' : undefined }}>{t.amount}</span>
                        <span className={`tag ${t.status === 'Selesai' ? 'tag-indigo' : t.status === 'Gratis' ? 'tag-amber' : 'tag-coral'}`}>{t.status}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <BottomNavWarga active="riwayat" />
      <StatusBar />
    </div>
  )
}
