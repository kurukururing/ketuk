import { openCam } from '../Camera'
import { useStore, ITEM, rp } from '../../store'
import { A, Img, StatusBar, CountdownRing, BottomNavWarga, SectionHeader } from '../../ui'

const LAYANAN: [string, string, 'p' | 'a'][][] = [
  [['3d-kamera.png', 'Pasang', 'p'], ['3d-sesi.png', 'Sesi Ketuk', 'a'], ['3d-kardus.png', 'Pindahan', 'a'], ['3d-baterai.png', 'E-waste', 'p']],
  [['3d-hadiah.png', 'Lepas Gratis', 'p'], ['3d-tag.png', 'Harga AI', 'a'], ['3d-dompet.png', 'Dompet', 'a'], ['3d-chat.png', 'Bantuan', 'p']],
]

/** Figma: B1 Beranda (10:148) */
export default function Beranda() {
  const { s, d, go } = useStore()
  const sesi = s.session
  const top = sesi.offers[0]
  const openSesi = () => {
    if (sesi.status === 'running') go('sesi')
    else if (sesi.status === 'won') go('terkunci')
    else if (sesi.status === 'done') go('selesai')
    else pasang()
  }
  const pasang = () => { d({ type: 'scenario', scenario: 'kipas' }); openCam(d, go, 'kipas') }
  // Figma B1 Beranda hotspots
  const TILE_GO: Record<string, () => void> = {
    'Pasang': pasang, 'Harga AI': pasang, 'Sesi Ketuk': () => go('sesi-saya'), 'Pindahan': () => go('pindahan'),
    'E-waste': () => go('ewaste'), 'Lepas Gratis': () => go('lepas'), 'Dompet': () => go('dompet'), 'Bantuan': () => go('bantuan'),
  }
  const tileAction = (label: string) => TILE_GO[label]

  return (
    <div className="screen">
      <img src={A('home-ellipse2.svg')} alt="" className="abs" style={{ left: -479, top: -229, width: 883, height: 883 }} />
      <img src={A('home-header.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 390, height: 250 }} />
      <img src={A('home-ellipse1.svg')} alt="" className="abs" style={{ left: -37, top: -432, width: 883, height: 883 }} />

      {/* Greeting */}
      <div className="abs row" style={{ left: 24, top: 62, width: 342, height: 48, justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 12 }}>
          <button onClick={() => go('akun', { root: true })} aria-label="Akun"><img src={A('avatar-ratna.png')} alt="" style={{ width: 44, height: 44, borderRadius: 999, border: '2px solid #fff', objectFit: 'cover' }} /></button>
          <div className="col nowrap">
            <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>Selamat sore | {ITEM.area}</span>
            <span className="t-h2" style={{ color: '#fff' }}>Halo, {ITEM.warga}</span>
          </div>
        </div>
        <button onClick={() => go('notifikasi')} aria-label="Notifikasi" className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.14)', justifyContent: 'center' }}>
          <Img src="ic-bell-white.svg" size={22} />
        </button>
      </div>
      <Img src="badge-dot.svg" size={10} className="abs" style={{ left: 350, top: 70 }} />

      {/* Hero card: Sekali Ketuk — Pasang Barang */}
      <button onClick={pasang} className="abs row"
        style={{ left: 24, top: 136, width: 342, gap: 12, padding: 20, borderRadius: 'var(--radius-xl)', background: 'var(--surface)', boxShadow: 'var(--elev-2)', textAlign: 'left' }}>
        <div className="col grow" style={{ gap: 6 }}>
          <span className="t-overline" style={{ color: 'var(--amber-700)' }}>Sekali Ketuk</span>
          <span className="t-h2">Pasang Barang</span>
          <span className="t-body-m" style={{ color: 'var(--ink-500)' }}>1 foto, 60 menit, harga pasti</span>
          <div style={{ height: 6 }} />
          <span className="btn btn-primary btn-m" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }}>
            <Img src="ic-camera-white.svg" size={20} />Foto Barang
          </span>
        </div>
        <img src={A('3d-kamera.png')} alt="" style={{ width: 112, height: 112, objectFit: 'cover' }} />
      </button>

      {/* Content */}
      <div className="abs col" style={{ left: 0, top: 350, width: 390, padding: '0 24px', gap: 12 }}>
        <SectionHeader title="Layanan KETUK" color="var(--primary-500)" />
        <div className="col" style={{ gap: 14 }}>
          {LAYANAN.map((row, i) => (
            <div key={i} className="row" style={{ gap: 8, alignItems: 'flex-start' }}>
              {row.map(([img, label, tone]) => (
                <button key={label} onClick={tileAction(label)} className="col grow" style={{ alignItems: 'center', gap: 6 }}>
                  <div className="row" style={{ width: 68, height: 68, borderRadius: 22, justifyContent: 'center', background: tone === 'p' ? 'var(--primary-50)' : 'var(--amber-100)' }}>
                    <img src={A(img)} alt="" style={{ width: 58, height: 58, objectFit: 'cover' }} />
                  </div>
                  <span className="t-label-s" style={{ color: 'var(--ink-700)', textAlign: 'center' }}>{label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <SectionHeader title="Sesi berjalan" action="Lihat semua" color="var(--primary-500)" onAction={() => go('sesi-saya')} />
        {sesi.status === 'idle' ? (
          <button onClick={pasang} className="card row" style={{ gap: 14, padding: 14, textAlign: 'left' }}>
            <div className="row" style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--primary-50)', justifyContent: 'center' }}>
              <img src={A('3d-sesi.png')} alt="" style={{ width: 48, height: 48 }} />
            </div>
            <div className="col grow" style={{ gap: 4 }}>
              <span className="t-body-ms">Belum ada sesi berjalan</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Foto barangmu, pengepul akan bersaing menawar.</span>
            </div>
            <Img src="ic-chevron-right.svg" size={20} />
          </button>
        ) : (
          <button onClick={openSesi} className="card row" style={{ gap: 14, padding: 14, textAlign: 'left' }}>
            <CountdownRing size={64} remaining={sesi.remaining} variant="mini" />
            <div className="col grow" style={{ gap: 4 }}>
              <span className="t-body-ms">{ITEM.name}</span>
              <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>
                {sesi.offers.length} tawaran{top && <> | tertinggi <b style={{ color: 'var(--amber-700)' }}>{rp(top.price)}</b></>}
              </span>
              <span className="tag tag-amber" style={{ alignSelf: 'flex-start' }}>
                <Img src="ic-clock-amber.svg" size={14} />
                {sesi.status === 'running' ? 'Sesi Ketuk berjalan' : sesi.status === 'won' ? 'Harga terkunci' : 'Selesai'}
              </span>
            </div>
            <Img src="ic-chevron-right.svg" size={20} />
          </button>
        )}
      </div>

      <BottomNavWarga active="beranda" />
      <StatusBar inverse />
    </div>
  )
}
