import { useState } from 'react'
import { useStore, rp, CORRECTION, PAK_SLAMET } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

const fmt = (n: number) => (n ? n.toLocaleString('id-ID') : '')

/** Figma: D1 Ajukan Koreksi Berbukti (38:3136) */
export default function AjukanKoreksi() {
  const { s, d, go } = useStore()
  const locked = s.finalPrice ?? PAK_SLAMET.price
  const [reason, setReason] = useState(CORRECTION.reason)
  const [note, setNote] = useState('Baling-baling retak di dua sisi, tidak terlihat di foto awal.')
  const [price, setPrice] = useState(CORRECTION.price)
  const drop = locked - price
  const tooMuch = drop > locked * 0.4

  return (
    <div className="screen fit">
      <AppBar ink title="Ajukan Koreksi" trailing={<button className="icon-btn"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 12, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--coral-100)' }}>
            <Img src="ic-alert-coral20.svg" size={20} />
            <span className="t-body-s grow">Koreksi memengaruhi Skor Tepat Harga. Warga boleh menolak tanpa denda.</span>
          </div>

          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Foto bukti (wajib)</span>
            <div className="row" style={{ gap: 10 }}>
              <img src={A('photo-bukti.jpg')} alt="Foto bukti" style={{ width: 84, height: 84, borderRadius: 14, objectFit: 'cover' }} />
              <button className="col" style={{ width: 84, height: 84, borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--coral-500)', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Img src="ic-camera-coral20.svg" size={20} />
                <span className="t-body-s" style={{ color: 'var(--coral-700)' }}>Tambah</span>
              </button>
            </div>
          </div>

          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Alasan</span>
            <div className="row scroll" style={{ position: 'relative', gap: 8, margin: '0 -24px', padding: '0 24px' }}>
              {['Retak / pecah', 'Tidak menyala', 'Bagian hilang'].map(r => (
                <button key={r} className={`chip${reason === r ? ' on' : ''}`} onClick={() => setReason(r)}>{r}</button>
              ))}
            </div>
          </div>

          <div className="col" style={{ gap: 6, padding: 14, borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--line-200)' }}>
            <textarea value={note} maxLength={200} rows={2} onChange={e => setNote(e.target.value)}
              className="t-body-m" style={{ border: 0, outline: 0, resize: 'none', background: 'transparent' }} />
            <span className="t-body-s" style={{ alignSelf: 'flex-end', color: 'var(--ink-500)' }}>{note.length}/200</span>
          </div>

          <label className="col" style={{ gap: 8 }}>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Harga usulan</span>
            <div className="row" style={{ height: 54, gap: 12, padding: '0 16px', borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--line-200)' }}>
              <span className="t-body-ms" style={{ color: 'rgba(21,20,43,0.6)' }}>Rp</span>
              <div style={{ width: 1.5, height: 22, background: 'var(--line-200)' }} />
              <input inputMode="numeric" value={fmt(price)} placeholder="Contoh: 10.000" onChange={e => setPrice(Number(e.target.value.replace(/\D/g, '')) || 0)}
                style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', fontWeight: 700, fontSize: 16, lineHeight: '24px' }} />
            </div>
          </label>
          <span className="t-body-s" style={{ color: 'var(--coral-700)' }}>
            {price ? `Turun ${rp(Math.max(0, drop))} dari harga terkunci ${rp(locked)} | batas maksimal turun 40%` : 'Isi harga usulan'}
          </span>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-danger" disabled={!price || price >= locked || tooMuch}
          onClick={() => { d({ type: 'requestCorrection' }); go('menunggu', { replace: true }) }}>
          <Img src="ic-send-coral.svg" size={20} />Kirim Koreksi ke Warga
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
