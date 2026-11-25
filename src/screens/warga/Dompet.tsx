import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar, SectionHeader } from '../../ui'
import { setBukti, TX } from './Bukti'

/** Figma: G1 Dompet & Pembayaran (29:2414) — Tarik / metode → G1 Tarik Saldo; Riwayat → F1; mutasi → F1 Bukti */
export default function Dompet() {
  const { go } = useStore()
  const methods = [
    { ic: 'ic-cash-amber.svg', tile: 'var(--amber-100)', t: 'Tunai', s: 'Dibayar langsung saat serah terima', main: true },
    { ic: 'ic-wallet-indigo20.svg', tile: 'var(--primary-100)', t: 'E-wallet', s: '0812 **** 7890' },
    { ic: 'ic-wallet-ink20.svg', tile: 'var(--line-100)', t: 'Rekening bank', s: '**** 2210' },
  ]
  const mut: [string, string, number][] = [['Kipas angin berdiri | Hari ini', '+Rp38.000', 0], ['Rak besi 3 susun | 28 Okt', '+Rp45.000', 1]]
  return (
    <div className="screen">
      <AppBar title="Dompet" ink trailing={<button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="col" style={{ position: 'relative', gap: 6, padding: 20, borderRadius: 'var(--radius-xl)', background: 'var(--primary-900)', overflow: 'hidden' }}>
          <img src={A('3d-dompet.png')} alt="" className="abs" style={{ left: 232, top: 10, width: 96, height: 96, objectFit: 'cover' }} />
          <span className="t-overline" style={{ color: 'var(--primary-200)' }}>Saldo KETUK</span>
          <span className="t-num-xl" style={{ color: '#fff' }}>Rp83.000</span>
          <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>Dari pembayaran e-wallet | bisa ditarik kapan saja</span>
          <div className="row" style={{ gap: 10, paddingTop: 8 }}>
            <button className="btn btn-m grow" style={{ background: '#fff', color: 'var(--primary-900)' }} onClick={() => go('tarik')}><Img src="ic-arrow-right-p900.svg" size={20} />Tarik Saldo</button>
            <button className="btn btn-m grow" style={{ background: '#fff', color: 'var(--primary-900)' }} onClick={() => go('riwayat', { root: true })}><Img src="ic-history-p900.svg" size={20} />Riwayat</button>
          </div>
        </div>
        <SectionHeader title="Metode pembayaran" action="Tambah" />
        <div className="col" style={{ padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          {methods.map((m, i) => (
            <button key={m.t} onClick={() => go('tarik')} className="row" style={{ gap: 12, padding: '12px 0', textAlign: 'left', borderBottom: i < 2 ? '1px solid var(--line-100)' : 'none' }}>
              <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: m.tile, justifyContent: 'center', flex: 'none' }}><Img src={m.ic} size={20} /></div>
              <div className="col grow" style={{ gap: 2 }}>
                <span className="t-body-ms">{m.t}</span>
                <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{m.s}</span>
              </div>
              {m.main ? <span className="tag tag-amber">Utama</span> : <Img src="ic-chevron-right18.svg" size={18} />}
            </button>
          ))}
        </div>
        <span className="t-overline" style={{ color: 'var(--ink-500)' }}>Mutasi terakhir</span>
        <div className="col" style={{ padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          {mut.map(([a, b, i]) => (
            <button key={a} onClick={() => { setBukti(TX[i]); go('bukti') }} className="row" style={{ gap: 12, padding: '12px 0', textAlign: 'left', borderBottom: i === 0 ? '1px solid var(--line-100)' : 'none' }}>
              <span className="t-body-m grow">{a}</span>
              <span className="t-body-ms nowrap" style={{ color: 'var(--primary-500)' }}>{b}</span>
            </button>
          ))}
        </div>
      </div>
      <StatusBar />
    </div>
  )
}
