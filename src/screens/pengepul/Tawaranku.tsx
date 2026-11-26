import type { ReactNode } from 'react'
import { useStore } from '../../store'
import { A, Img, StatusBar, BottomNavPengepul } from '../../ui'

function Shell({ tab, stats, children }: { tab: 'berjalan' | 'menang'; stats: [string, string, boolean?][]; children: ReactNode }) {
  const { go } = useStore()
  const tabs: [string, 'berjalan' | 'menang' | 'kalah'][] = [['Berjalan 6', 'berjalan'], ['Menang 2', 'menang'], ['Kalah 9', 'kalah']]
  return (
    <div className="screen fit">
      <span className="abs t-h1" style={{ left: 24, top: 62, letterSpacing: -0.39 }}>Tawaranku</span>
      <div className="abs row" style={{ left: 24, top: 108, width: 342, padding: 16, gap: 12, borderRadius: 'var(--radius-lg)', background: 'var(--primary-900)', alignItems: 'flex-start' }}>
        {stats.map(([a, b, amber]) => (
          <div key={b} className="col grow" style={{ gap: 2, flexBasis: 0 }}><span className="t-num-m nowrap" style={{ color: amber ? 'var(--amber-500)' : '#fff' }}>{a}</span><span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{b}</span></div>
        ))}
      </div>
      <div className="abs row" style={{ left: 24, top: 204, width: 342, gap: 4, padding: 4, borderRadius: 'var(--radius-md)', background: 'var(--line-100)' }}>
        {tabs.map(([l, k]) => (
          <button key={k} className="grow" onClick={() => k !== tab && go(k === 'menang' ? 'tawaranku-menang' : 'tawaranku', { replace: true })}
            style={{ height: 40, borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 15, background: tab === k ? '#fff' : 'transparent', color: tab === k ? 'var(--primary-500)' : 'var(--ink-500)', boxShadow: tab === k ? 'var(--elev-1)' : 'none' }}>{l}</button>
        ))}
      </div>
      <div className="scroll" style={{ top: 268, bottom: 97 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>{children}</div>
      </div>
      <BottomNavPengepul active="tawaranku" />
      <StatusBar />
    </div>
  )
}

/** Figma: C1 Tawaranku Berjalan (32:3120) — Lihat/Naikkan → B2 Tawaran Terkirim / Ajukan; tab Menang → C1 Tawaranku */
export function TawarankuBerjalan() {
  const { go } = useStore()
  const rows: { img: string; t: string; s: string; tag: ReactNode; price: ReactNode; btn: ReactNode; warn?: boolean }[] = [
    { img: 'peta-kipas.jpg', t: 'Kipas angin berdiri', s: 'Bu Ratna | 1,2 km', tag: <span className="tag tag-amber"><Img src="ic-trophy-amber14.svg" size={14} />Peringkat 1</span>,
      price: <>Tawaranmu <b style={{ color: 'var(--ink-900)' }}>Rp38.000</b> | sisa 41:20</>, btn: <button className="btn btn-m" style={{ background: 'var(--primary-100)', color: 'var(--primary-500)' }} onClick={() => go('terkirim')}>Lihat</button> },
    { img: 'tw-kardus.jpg', t: 'Kardus bekas 12 kg', s: 'Bu Sri | 0,8 km', warn: true, tag: <span className="tag tag-coral"><Img src="ic-alert-coral14.svg" size={14} />Terlampaui</span>,
      price: <>Tawaranmu <b style={{ color: 'var(--ink-900)' }}>Rp27.000</b> | tertinggi <b style={{ color: 'var(--coral-700)' }}>Rp28.000</b></>, btn: <button className="btn btn-m btn-primary" onClick={() => go('ajukan')}>Naikkan</button> },
    { img: 'tw-rak.jpg', t: 'Rak besi 3 susun', s: 'Pak Anwar | 2,1 km', tag: <span className="tag tag-neutral">Peringkat 2</span>,
      price: <>Tawaranmu <b style={{ color: 'var(--ink-900)' }}>Rp52.000</b> | sisa 12:40</>, btn: <button className="btn btn-m" style={{ background: 'var(--primary-100)', color: 'var(--primary-500)' }} onClick={() => go('ajukan')}>Lihat</button> },
  ]
  return (
    <Shell tab="berjalan" stats={[['6', 'tawaran berjalan'], ['Rp512rb', 'nilai terkunci'], ['97%', 'Skor Tepat Harga', true]]}>
      {rows.map(r => (
        <div key={r.t} className="card col" style={{ padding: 14, gap: 12, border: r.warn ? '1.5px solid var(--coral-500)' : undefined }}>
          <div className="row" style={{ gap: 12 }}>
            <img src={A(r.img)} alt="" style={{ width: 48, height: 48, borderRadius: 14, objectFit: 'cover' }} />
            <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{r.t}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{r.s}</span></div>
            {r.tag}
          </div>
          <div className="row" style={{ gap: 10 }}>
            <span className="t-body-s grow" style={{ color: 'var(--ink-700)' }}>{r.price}</span>
            {r.btn}
          </div>
        </div>
      ))}
    </Shell>
  )
}

/** Figma: C1 Tawaranku (15:1114, tab Menang) — Mulai Jemput → D1 Navigasi; Chat → Chat; Lihat Detail → Ajukan */
export function TawarankuMenang() {
  const { go } = useStore()
  const card = (img: string, t: string, s: string, price: string, when: string, primary: boolean) => (
    <div className="col" style={{ padding: 16, gap: 12, borderRadius: 'var(--radius-lg)', background: '#fff', border: primary ? '1.5px solid var(--primary-500)' : '1px solid var(--line-200)', boxShadow: primary ? 'var(--elev-1)' : 'none' }}>
      <div className="row" style={{ gap: 12 }}>
        <img src={A(img)} alt="" style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover' }} />
        <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{t}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{s}</span></div>
        <span className="tag tag-indigo"><Img src="ic-trophy-indigo14.svg" size={14} />Menang</span>
      </div>
      <div className="row" style={{ gap: 8, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)' }}>
        <Img src="ic-lock-indigo18.svg" size={18} />
        <span className="t-body-ms grow" style={{ color: 'var(--primary-900)' }}>{price} terkunci</span>
        <span className="t-body-ms nowrap" style={{ color: 'var(--amber-700)' }}>{when}</span>
      </div>
      {primary ? (
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-m btn-primary grow" onClick={() => go('navigasi')}><Img src="ic-truck-white20.svg" size={20} />Mulai Jemput</button>
          <button className="btn btn-m" style={{ background: 'var(--primary-100)', color: 'var(--primary-500)' }} onClick={() => go('chat')}><Img src="ic-chat-indigo20.svg" size={20} />Chat</button>
        </div>
      ) : (
        <button className="btn btn-m" style={{ width: '100%', background: 'var(--primary-100)', color: 'var(--primary-500)' }} onClick={() => go('ajukan')}>Lihat Detail</button>
      )}
    </div>
  )
  return (
    <Shell tab="menang" stats={[['14', 'menang minggu ini'], ['Rp512rb', 'nilai terkunci'], ['97%', 'Skor Tepat Harga', true]]}>
      {card('peta-kipas.jpg', 'Kipas angin berdiri', 'Bu Ratna | 1,2 km | Rungkut Kidul', 'Rp38.000', 'jemput 16.00', true)}
      {card('tw-kardus.jpg', 'Kardus bekas 12 kg', 'Bu Sri | 0,8 km | Medokan Ayu', 'Rp27.000', 'besok 09.00', false)}
    </Shell>
  )
}
