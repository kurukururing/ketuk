import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar } from '../../ui'

export type Tx = {
  name: string; date: string; by: string; amount: string; status: 'Selesai' | 'Gratis' | 'Dibatalkan'
  month: string; cat: string; img: string
  received: string; pengepul: string; palu: string; serah: string; jalur: string; id: string; kg: string; tag: string
}

export const TX: Tx[] = [
  { name: 'Kipas angin berdiri', date: '1 Nov', by: 'Pak Slamet', amount: 'Rp38.000', status: 'Selesai', month: 'November 2026', cat: 'Elektronik', img: 'item-kip.jpg',
    received: 'Diterima 1 Nov 2026, 16.02 | tunai', pengepul: 'Pak Slamet | skor 97%', palu: '1 Nov, 15.21', serah: '1 Nov, 16.02', jalur: 'Servis & jual ulang', id: 'KTK-2611-0381', kg: '3,2 kg', tag: 'Selesai tanpa koreksi' },
  { name: 'Rak besi 3 susun', date: '28 Okt', by: 'UD Berkah', amount: 'Rp45.000', status: 'Selesai', month: 'Oktober 2026', cat: 'Perabot', img: 'item-rak.jpg',
    received: 'Diterima 28 Okt 2026, 10.40 | e-wallet', pengepul: 'UD Berkah | skor 92%', palu: '28 Okt, 09.12', serah: '28 Okt, 10.40', jalur: 'Lebur logam', id: 'KTK-2810-0217', kg: '9,5 kg', tag: 'Selesai tanpa koreksi' },
  { name: 'Kardus bekas 12 kg', date: '21 Okt', by: 'Lepas gratis', amount: 'Rp0', status: 'Gratis', month: 'Oktober 2026', cat: 'Kertas', img: 'item-kardus.jpg',
    received: 'Dijemput 21 Okt 2026, 08.15 | gratis', pengepul: 'Pak Slamet | skor 97%', palu: '20 Okt, 19.30', serah: '21 Okt, 08.15', jalur: 'Daur ulang kertas', id: 'KTK-2110-0144', kg: '12 kg', tag: 'Lepas gratis' },
  { name: 'Kasur busa', date: '15 Okt', by: 'koreksi ditolak', amount: '-', status: 'Dibatalkan', month: 'Oktober 2026', cat: 'Perabot', img: 'item-kasur.jpg',
    received: '', pengepul: '', palu: '', serah: '', jalur: '', id: '', kg: '', tag: '' },
]

let CUR_TX: Tx = TX[0]
export const setBukti = (t: Tx) => { CUR_TX = t }

/** Figma: F1 Bukti Transaksi (27:2323) — Unduh → F1 Riwayat; Lapor / bantuan → G1 Pusat Bantuan */
export default function Bukti() {
  const { s, go, back } = useStore()
  const t = CUR_TX
  const rows: [string, string][] = [['Barang', t.name], ['Pengepul', t.pengepul], ['Ketuk palu', t.palu], ['Serah terima', t.serah], ['Jalur barang', t.jalur], ['ID transaksi', t.id]]
  return (
    <div className="screen">
      <AppBar title="Bukti Transaksi" ink trailing={<button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="abs col" style={{ left: 0, top: 116, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="card col" style={{ padding: 20, gap: 14, borderRadius: 'var(--radius-xl)' }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="row" style={{ gap: 8 }}>
              <img src={A('logo-mark-bukti.svg')} alt="" style={{ width: 28, height: 28 }} />
              <span className="t-h3" style={{ color: 'var(--primary-900)' }}>ketuk</span>
            </div>
            <span className={`tag ${t.status === 'Gratis' ? 'tag-amber' : 'tag-indigo'}`}><Img src="ic-check-indigo14.svg" size={14} />{t.tag}</span>
          </div>
          <div className="col" style={{ gap: 2 }}>
            <span className="t-num-xl">{t.amount}</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{t.received}</span>
          </div>
          <div style={{ height: 1.5, background: 'var(--line-200)' }} />
          {rows.map(([k, v]) => (
            <div key={k} className="row nowrap" style={{ justifyContent: 'space-between' }}>
              <span className="t-body-m" style={{ color: 'var(--ink-500)' }}>{k}</span>
              <span className="t-body-ms">{v}</span>
            </div>
          ))}
        </div>
        <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-lg)', background: 'var(--amber-100)' }}>
          <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', justifyContent: 'center' }}><Img src="ic-box-bukti.svg" size={20} /></div>
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms">{t.kg} tidak berakhir di TPA</span>
            <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>Tercatat di laporan dampakmu</span>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn" style={{ background: 'var(--primary-100)', color: 'var(--primary-500)' }} onClick={() => (s.role === 'warga' ? go('riwayat', { root: true }) : back())}><Img src="ic-arrow-right-indigo.svg" size={20} />Unduh Bukti</button>
        <button className="btn" style={{ border: '1.5px solid var(--line-200)', color: 'var(--ink-900)' }} onClick={() => go('bantuan')}><Img src="ic-warning-ink.svg" size={20} />Laporkan Masalah</button>
      </div>
      <StatusBar />
    </div>
  )
}
