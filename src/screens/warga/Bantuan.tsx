import { useState } from 'react'
import { useStore } from '../../store'
import { A, StatusBar, AppBar } from '../../ui'

const FAQ: [string, string][] = [
  ['Apa itu Koreksi Berbukti?', 'Pengepul hanya boleh menurunkan harga terkunci dengan foto bukti dan alasan. Kamu bebas menerima atau menolak tanpa denda, dan setiap koreksi memengaruhi Skor Tepat Harga pengepul.'],
  ['Kenapa harga bisa terkunci?', 'Saat kamu mengetuk palu, harga tawaran yang kamu pilih dikunci. Pengepul wajib membayar sesuai harga itu, kecuali ada koreksi berbukti yang kamu setujui.'],
  ['Bagaimana jika tidak ada tawaran?', 'Kamu bisa memperluas radius pencarian, mengubah foto & detail, atau memilih Lepas Gratis + Jemput agar barang tetap tersalur.'],
  ['Apa itu Jalur E-waste Aman?', 'Barang elektronik berbaterai hanya ditawarkan ke pengepul bersertifikat agar baterai dan komponen berbahaya diolah dengan benar.'],
  ['Bagaimana Mode Dibantu Keluarga bekerja?', ''],
]

/** Figma: G1 Pusat Bantuan (29:2344) — "Bagaimana Mode Dibantu…" → K1 Aktifkan Mode Dibantu Keluarga */
export default function Bantuan() {
  const { s, go } = useStore()
  const [open, setOpen] = useState(0)
  const [tab, setTab] = useState(s.role === 'pengepul' ? 1 : 0)
  return (
    <div className="screen">
      <AppBar title="Pusat Bantuan" ink />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <label className="col" style={{ gap: 8 }}>
          <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Cari bantuan</span>
          <input placeholder="Contoh: Pencairan dana" style={{ height: 54, padding: '0 16px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--line-200)', background: '#fff', fontSize: 16, fontWeight: 500, fontFamily: 'inherit', outline: 'none' }} />
        </label>
        <div className="row" style={{ gap: 4, padding: 4, borderRadius: 'var(--radius-md)', background: 'var(--line-100)' }}>
          {['Untuk Warga', 'Untuk Pengepul'].map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className="grow" style={{ height: 40, borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 15, background: tab === i ? '#fff' : 'transparent', color: tab === i ? 'var(--primary-500)' : 'var(--ink-500)', boxShadow: tab === i ? 'var(--elev-1)' : 'none' }}>{t}</button>
          ))}
        </div>
        <div className="col" style={{ padding: '4px 16px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          {FAQ.map(([q, a], i) => (
            <div key={q} className="col" style={{ gap: 8, padding: '14px 0', borderBottom: i < FAQ.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
              <button className="row" style={{ gap: 8, textAlign: 'left' }} onClick={() => (i === FAQ.length - 1 ? go('k1-aktifkan') : setOpen(open === i ? -1 : i))}>
                <span className="t-body-ms grow" style={{ color: open === i ? 'var(--primary-500)' : undefined }}>{q}</span>
                <img src={A(open === i ? 'chev-down-indigo.svg' : 'chev-down.svg')} alt="" style={{ width: 18, height: 18, transform: open === i ? 'rotate(180deg)' : undefined }} />
              </button>
              {open === i && <span className="t-body-m" style={{ color: 'var(--ink-700)' }}>{a}</span>}
            </div>
          ))}
        </div>
        <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
          <img src={A('3d-chat.png')} alt="" style={{ width: 52, height: 52, objectFit: 'cover' }} />
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms">Chat CS KETUK</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>07.00–21.00 | balasan rata-rata 3 menit</span>
          </div>
          <button className="btn btn-primary btn-m">Chat</button>
        </div>
      </div>
      <StatusBar />
    </div>
  )
}
