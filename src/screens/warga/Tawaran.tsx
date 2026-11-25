import { useStore, rp, ITEM } from '../../store'
import { Img, StatusBar, AppBar, Avatar, ScoreBadge, SectionHeader } from '../../ui'

const REVIEWS: [string, string, number, string][] = [
  ['BS', 'Bu Sri', 5, 'Datang tepat waktu, harga sama persis dengan yang dikunci.'],
  ['PA', 'Pak Anwar', 4, 'Sempat koreksi karena ada bagian hilang, tapi fotonya jelas dan sopan.'],
]

/** Figma: B2 Detail Tawaran Pengepul (24:1826) — Sesi Ketuk → tap offer → here → Ketuk Palu → Konfirmasi */
export default function Tawaran() {
  const { s, d, go } = useStore()
  const o = s.session.offers.find(x => x.id === s.session.selected) ?? s.session.offers[0]
  if (!o) return null
  const isPs = o.id === 'ps'
  const tx = isPs ? 128 : o.id === 'ub' ? 86 : 64
  return (
    <div className="screen">
      <AppBar ink title="Detail Tawaran" />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="card row" style={{ gap: 14, padding: 16 }}>
            <Avatar initials={o.initials} size={60} />
            <div className="col grow" style={{ gap: 6 }}>
              <span className="t-h3">{o.name}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{isPs ? 'Lapak Rungkut | 1,6 km' : o.id === 'ub' ? 'Gunung Anyar | 2,4 km' : `Mitra KETUK | ${o.distance}`} | {tx} transaksi | rating {isPs ? '4,9' : '4,7'}</span>
              <div className="row" style={{ gap: 6 }}>
                <ScoreBadge score={o.score} />
                <span className="tag tag-indigo"><Img src="ic-shield-indigo.svg" size={14} />Terverifikasi</span>
              </div>
            </div>
          </div>
          <div className="row nowrap" style={{ gap: 12, padding: 18, borderRadius: 'var(--radius-lg)', background: 'var(--primary-900)' }}>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{s.scenario === 'borongan' ? 'Tawaran borongan 3 barang' : `Tawaran untuk ${ITEM.short}`}</span>
              <span className="t-num-l" style={{ color: '#fff' }}>{rp(o.price)}</span>
            </div>
            <div className="col" style={{ gap: 2, alignItems: 'flex-end' }}>
              <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>Jemput</span>
              <span className="t-label-m" style={{ color: 'var(--amber-500)' }}>{o.pickup.replace('Jemput', 'Hari ini')}</span>
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Img src="ic-info-indigo.svg" size={18} />
            <span className="t-body-s grow" style={{ color: 'var(--ink-700)' }}>
              Skor Tepat Harga {o.score}% artinya {Math.round((tx * o.score) / 100)} dari {tx} transaksinya selesai tanpa koreksi.
            </span>
          </div>
          <SectionHeader title="Ulasan warga" action="Lihat semua" />
          {REVIEWS.map(([ini, name, stars, text]) => (
            <div key={name} className="row" style={{ gap: 12, padding: 14, alignItems: 'flex-start', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
              <Avatar initials={ini} size={36} tone="amber" />
              <div className="col grow" style={{ gap: 4 }}>
                <div className="row" style={{ gap: 8 }}>
                  <span className="t-body-ms">{name}</span>
                  <div className="row" style={{ gap: 2 }}>
                    {[1, 2, 3, 4, 5].map(k => <Img key={k} src={k <= stars ? 'star-sm-fill.svg' : 'star-sm-empty.svg'} size={12} />)}
                  </div>
                </div>
                <span className="t-body-s" style={{ color: 'var(--ink-700)' }}>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-bar">
        <button className="btn btn-accent" onClick={() => { d({ type: 'select', id: o.id }); go('konfirmasi') }}>
          <Img src="ic-gavel-ink.svg" size={20} />Ketuk Palu {rp(o.price)}
        </button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
