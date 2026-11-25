import { useState } from 'react'
import { useStore, ITEM, rp, mmss, PAK_SLAMET } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

const SLOTS = ['15.30', '16.00', '17.00', '17.30']
const fmt = (n: number) => (n ? n.toLocaleString('id-ID') : '')

/** Figma: B2 Ajukan Tawaran (15:1021) */
export default function Ajukan() {
  const { s, d, go } = useStore()
  const top = s.session.offers[0]?.price ?? 0
  const [price, setPrice] = useState(PAK_SLAMET.price)
  const [slot, setSlot] = useState('16.00')
  const quick: [number, string][] = [
    [top + 1000, `${rp(top + 1000)} · +1rb dari tertinggi`],
    [32500, `${rp(32500)} · tengah patokan`],
  ]
  const live = s.session.status === 'running'

  return (
    <div className="screen">
      <AppBar ink title="Ajukan Tawaran" trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 12 }}>
            <img src={s.photo ?? A('photo-kipas.jpg')} alt="" style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover' }} />
            <div className="col grow" style={{ gap: 4 }}>
              <span className="t-body-ms">{ITEM.name}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>1,2 km | AI {rp(ITEM.aiLow)}–{rp(ITEM.aiHigh)}</span>
              <div className="row" style={{ gap: 6 }}>
                <span className="tag tag-amber" style={{ fontVariantNumeric: 'tabular-nums' }}><Img src="ic-clock-amber.svg" size={14} />sisa {mmss(s.session.remaining)}</span>
                <span className="tag tag-neutral">{s.session.offers.length} tawaran</span>
              </div>
            </div>
          </div>

          <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
            <div className="row" style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: '#fff', justifyContent: 'center' }}><Img src="ic-spark-indigo20.svg" size={20} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-ms">Patokan Harga AI {rp(ITEM.aiLow)}–{rp(ITEM.aiHigh)}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Tawaran tertinggi saat ini <b style={{ color: 'var(--amber-700)' }}>{top ? rp(top) : '—'}</b></span>
            </div>
          </div>

          <label className="col" style={{ gap: 8 }}>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Tawaranmu</span>
            <div className="row" style={{ height: 54, gap: 12, padding: '0 16px', borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--primary-500)', boxShadow: '0 0 0 4px var(--primary-100)' }}>
              <span className="t-body-ms" style={{ color: 'rgba(21,20,43,0.6)' }}>Rp</span>
              <div style={{ width: 1.5, height: 22, background: 'var(--line-200)' }} />
              <input inputMode="numeric" value={fmt(price)} placeholder="Contoh: 10.000"
                onChange={e => setPrice(Number(e.target.value.replace(/\D/g, '')) || 0)}
                style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', fontWeight: 700, fontSize: 18, lineHeight: '24px', color: 'var(--ink-900)' }} />
            </div>
          </label>

          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {quick.map(([v, label]) => (
              <button key={label} onClick={() => setPrice(v)}
                style={{ padding: '8px 14px', borderRadius: 999, fontWeight: 600, fontSize: 13, border: price === v ? '1px solid #3d2fd0' : '1px solid #d8d5ee', background: price === v ? '#3d2fd0' : '#fff', color: price === v ? '#fff' : '#1b1760' }}>
                {label}
              </button>
            ))}
          </div>

          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms nowrap">Slot jemput | <span style={{ fontWeight: 500, color: 'var(--ink-500)' }}>Jendela 15.00–18.00</span></span>
            <div className="row" style={{ gap: 8 }}>
              {SLOTS.map(t => <button key={t} className={`chip${slot === t ? ' on' : ''}`} onClick={() => setSlot(t)}>{t}</button>)}
            </div>
          </div>

          <div className="row" style={{ gap: 8 }}>
            <Img src="ic-lock-indigo18.svg" size={18} />
            <span className="t-body-s grow" style={{ color: 'var(--ink-700)' }}>Harga terkunci bila dipilih warga. Koreksi hanya dengan bukti foto.</span>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} disabled={!price || !live}
          onClick={() => { d({ type: 'offer', id: PAK_SLAMET.id, price, pickup: `Jemput ${slot}` }); go('terkirim', { replace: true }) }}>
          <Img src="ic-send-white.svg" size={20} />{live ? `Kirim Tawaran ${rp(price)}` : 'Sesi sudah ditutup'}
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
