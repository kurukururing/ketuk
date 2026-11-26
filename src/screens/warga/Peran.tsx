import { useState } from 'react'
import { useStore } from '../../store'
import { A, Img, StatusBar, Toggle } from '../../ui'

type Role = 'warga' | 'pengepul'
const OPTS: { k: Role; img: string; over: string; overColor: string; title: string; sub: string; body: string }[] = [
  { k: 'warga', img: '3d-kardus.png', over: 'Warga', overColor: 'var(--primary-500)', title: 'Saya Warga', sub: 'Jual barang bekas', body: 'Foto barang, pengepul datang menawar, kamu pilih harga terbaik.' },
  { k: 'pengepul', img: '3d-truk.png', over: 'Pengepul', overColor: 'var(--amber-700)', title: 'Saya Pengepul', sub: 'Beli barang bekas', body: 'Pantau Radar Barang radius 3 km, ajukan tawaran, menangkan, jemput.' },
]

/** Figma: A5 Pilih Peran (9:246) — Warga → A6 Alamat Jemput; Pengepul → A1 Daftar Mitra; Mode Dibantu → G1 */
export default function Peran() {
  const { s, d, go } = useStore()
  const [role, setRole] = useState<Role>(s.role)
  const [dibantu, setDibantu] = useState(false)
  const next = () => {
    if (role === 'warga') {
      if (s.role === 'warga') go('alamat')
      else { go('alamat', { role: 'warga' }); d({ type: 'role', role: 'warga' }) }
    } else if (s.role === 'pengepul') go('mitra-daftar')
    else d({ type: 'switchToPengepul', screen: 'mitra-daftar' })
  }
  return (
    <div className="screen">
      <img src={A('masuk-ellipse1.svg')} alt="" className="abs" style={{ left: -221, top: -561, width: 883, height: 883 }} />
      <img src={A('masuk-ellipse2.svg')} alt="" className="abs" style={{ left: -466, top: 473, width: 883, height: 883 }} />
      <div className="abs col" style={{ left: 0, top: 76, width: 390, padding: '0 24px', gap: 16 }}>
        <span className="t-h1" style={{ color: 'var(--primary-500)', letterSpacing: -0.39 }}>Kamu ingin masuk sebagai?</span>
        <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>Peran bisa diganti kapan saja dari menu Akun.</span>
        {OPTS.map(o => {
          const on = role === o.k
          return (
            <button key={o.k} onClick={() => setRole(o.k)} className="row"
              style={{ gap: 14, padding: 18, alignItems: 'flex-start', textAlign: 'left', borderRadius: 'var(--radius-lg)', background: '#fff',
                border: on ? '2px solid var(--primary-500)' : '1.5px solid var(--line-200)', boxShadow: on ? 'var(--elev-2)' : 'none', transition: 'all .2s' }}>
              <img src={A(o.img)} alt="" style={{ width: 68, height: 68, objectFit: 'cover' }} />
              <div className="col grow" style={{ gap: 4 }}>
                <span className="t-overline" style={{ color: o.overColor }}>{o.over}</span>
                <span className="t-h3">{o.title}</span>
                <span className="t-body-ms" style={{ color: 'var(--ink-700)' }}>{o.sub}</span>
                <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{o.body}</span>
              </div>
              <div className="row" style={{ width: 24, height: 24, borderRadius: 999, justifyContent: 'center', flex: 'none',
                background: on ? 'var(--primary-500)' : '#fff', border: on ? 'none' : '1.5px solid var(--ink-300)' }}>
                {on && <div style={{ width: 10, height: 10, borderRadius: 999, background: '#fff' }} />}
              </div>
            </button>
          )
        })}
        <div className="row" style={{ gap: 12, padding: 16, borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
          <div className="row" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#fff', justifyContent: 'center' }}><Img src="ic-users-indigo.svg" size={22} /></div>
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms">Mode Dibantu Keluarga</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Kerabat bisa memasang barang untuk orang tua. Uang tetap masuk ke pemilik.</span>
          </div>
          <Toggle on={dibantu} onChange={v => { setDibantu(v); if (v && s.role === 'warga') go('dibantu') }} />
        </div>
      </div>
      <div className="fix" style={{ left: 24, bottom: 50, width: 342 }}>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={next}>
          <Img src="ic-arrow-right-white.svg" size={20} />Lanjut sebagai {role === 'warga' ? 'Warga' : 'Pengepul'}
        </button>
      </div>
      <StatusBar />
    </div>
  )
}
