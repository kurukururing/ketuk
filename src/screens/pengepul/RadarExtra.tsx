import { useState } from 'react'
import { motion } from 'framer-motion'
import type { PengepulScreen } from '../../store'
import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar, Toggle, BottomNavPengepul } from '../../ui'
import Radar from './Radar'

type N = { ic: string; tile: string; t: string; s: string; time: string; unread?: boolean; to: PengepulScreen; tab: string }
const TODAY: N[] = [
  { ic: 'ic-radar-indigo20.svg', tile: 'var(--primary-100)', t: 'Barang baru 1,2 km', s: 'Kipas angin berdiri | AI Rp25.000–Rp40.000', time: '1 mnt', unread: true, to: 'ajukan', tab: 'Tawaran' },
  { ic: 'ic-alert-coral20.svg', tile: 'var(--coral-100)', t: 'Tawaranmu terlampaui', s: 'Kardus 12 kg | tertinggi kini Rp28.000', time: '6 mnt', unread: true, to: 'tawaranku', tab: 'Tawaran' },
  { ic: 'ic-trophy-amber20.svg', tile: 'var(--amber-100)', t: 'Kamu menang! Rp38.000', s: 'Kipas angin | jemput hari ini 16.00', time: '15 mnt', to: 'tawaranku-menang', tab: 'Tawaran' },
  { ic: 'ic-clock-indigo20.svg', tile: 'var(--primary-100)', t: 'Pengingat jemput 16.00', s: 'Bu Ratna | Rungkut Asri Tengah', time: '30 mnt', to: 'jadwal', tab: 'Jemput' },
]
const YESTERDAY: N[] = [
  { ic: 'ic-chart-indigo.svg', tile: 'var(--primary-100)', t: 'Skor Tepat Harga 97%', s: 'Naik 1 poin minggu ini', time: 'Kmr', to: 'profil', tab: '' },
  { ic: 'ic-battery-amber20.svg', tile: 'var(--amber-100)', t: 'Modul E-waste Aman selesai', s: 'Lencana aktif sampai Okt 2027', time: 'Kmr', to: 'lencana', tab: '' },
]

/** Figma: B1 Notifikasi Pengepul (32:2593) */
export function NotifPengepul() {
  const { go } = useStore()
  const [tab, setTab] = useState('Semua')
  const [read, setRead] = useState(false)
  const group = (label: string, list: N[]) => {
    const items = list.filter(n => tab === 'Semua' || n.tab === tab)
    if (!items.length) return null
    return (
      <>
        <span className="t-overline" style={{ color: 'var(--ink-500)' }}>{label}</span>
        <div className="col" style={{ padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
          {items.map((n, i) => (
            <button key={n.t} onClick={() => go(n.to)} className="row" style={{ gap: 12, padding: '12px 0', alignItems: 'flex-start', textAlign: 'left', borderBottom: i < items.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
              <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: n.tile, justifyContent: 'center', flex: 'none' }}><Img src={n.ic} size={20} /></div>
              <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{n.t}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{n.s}</span></div>
              <div className="col" style={{ gap: 6, alignItems: 'flex-end' }}>
                <span className="t-body-s nowrap" style={{ color: 'var(--ink-500)' }}>{n.time}</span>
                {n.unread && !read && <Img src="notif-dot.svg" size={8} />}
              </div>
            </button>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className="screen fit">
      <AppBar title="Notifikasi" ink trailing={<button className="icon-btn" aria-label="Tandai dibaca" onClick={() => setRead(true)}><Img src="ic-checkmark-ink.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 34 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 10 }}>
          <div className="row" style={{ gap: 4, padding: 4, borderRadius: 'var(--radius-md)', background: 'var(--line-100)' }}>
            {['Semua', 'Tawaran', 'Jemput'].map(t => (
              <button key={t} onClick={() => setTab(t)} className="grow" style={{ height: 40, borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 15, background: tab === t ? '#fff' : 'transparent', color: tab === t ? 'var(--primary-500)' : 'var(--ink-500)', boxShadow: tab === t ? 'var(--elev-1)' : 'none' }}>{t}</button>
            ))}
          </div>
          {group('Hari ini', TODAY)}
          {tab === 'Semua' && group('Kemarin', YESTERDAY)}
        </div>
      </div>
      <StatusBar />
    </div>
  )
}

/** Figma: B1 Filter Radar (32:2695) — sheet di atas Radar; Terapkan / Reset / scrim → B1 Radar */
export function FilterRadar() {
  const { back } = useStore()
  const [radius, setRadius] = useState(3)
  const [cats, setCats] = useState(['Elektronik', 'Kardus', 'Logam'])
  const [urgent, setUrgent] = useState(false)
  const [ewaste, setEwaste] = useState(false)
  const [sort, setSort] = useState('Terdekat')
  const reset = () => { setRadius(3); setCats(['Elektronik', 'Kardus', 'Logam']); setUrgent(false); setEwaste(false); setSort('Terdekat') }
  const pct = ((radius - 1) / 4) * 100
  return (
    <div className="screen fit">
      <Radar />
      <motion.button aria-label="Tutup filter" className="fix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={back}
        style={{ inset: 0, background: 'rgba(21,20,43,0.55)', zIndex: 20 }} />
      <motion.div className="fix col" initial={{ y: 600 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        style={{ left: 0, maxHeight: 'calc(100% - 24px)', overflowY: 'auto', width: 390, bottom: 0, zIndex: 21, padding: '12px 24px 34px', gap: 16, borderRadius: '28px 28px 0 0', background: '#fff' }}>
        <div className="row" style={{ justifyContent: 'center' }}><div style={{ width: 40, height: 5, borderRadius: 3, background: 'var(--line-200)' }} /></div>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="t-h2">Filter Radar</span>
          <button className="t-label-m" style={{ color: 'var(--primary-500)' }} onClick={reset}>Reset</button>
        </div>
        <div className="col" style={{ gap: 10 }}>
          <div className="row t-body-ms" style={{ justifyContent: 'space-between' }}><span>Radius</span><span style={{ color: 'var(--amber-700)' }}>{radius} km</span></div>
          <div style={{ position: 'relative', height: 24 }}>
            <div className="abs" style={{ left: 0, right: 0, top: 9, height: 6, borderRadius: 3, background: 'var(--line-200)' }} />
            <div className="abs" style={{ left: 0, width: `${pct}%`, top: 9, height: 6, borderRadius: 3, background: 'var(--primary-500)' }} />
            <img src={A('slider-thumb.svg')} alt="" className="abs" style={{ left: `calc(${pct}% - 12px)`, top: 0, width: 24, height: 24, pointerEvents: 'none' }} />
            <input type="range" min={1} max={5} step={1} value={radius} onChange={e => setRadius(+e.target.value)} aria-label="Radius"
              className="abs" style={{ inset: 0, width: '100%', opacity: 0, cursor: 'pointer' }} />
          </div>
          <div className="row t-body-s" style={{ justifyContent: 'space-between', color: 'var(--ink-500)' }}><span>1 km</span><span>5 km</span></div>
        </div>
        <div className="col" style={{ gap: 8 }}>
          <span className="t-body-ms">Kategori</span>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {['Elektronik', 'Perabot', 'Kardus', 'Logam', 'Plastik'].map(c => (
              <button key={c} className={`chip${cats.includes(c) ? ' on' : ''}`} onClick={() => setCats(cs => (cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c]))}>{c}</button>
            ))}
          </div>
        </div>
        {([['Sisa waktu < 20 menit', 'Fokus sesi yang hampir berakhir', urgent, setUrgent], ['Hanya Jalur E-waste Aman', 'Butuh lencana E-waste Aman', ewaste, setEwaste]] as const).map(([t, s, v, set]) => (
          <div key={t} className="row" style={{ gap: 12 }}>
            <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{t}</span><span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{s}</span></div>
            <Toggle on={v} onChange={set} />
          </div>
        ))}
        <div className="col" style={{ gap: 8 }}>
          <span className="t-body-ms">Urutkan</span>
          <div className="row" style={{ gap: 8 }}>
            {['Terdekat', 'Sisa waktu', 'AI tertinggi'].map(c => <button key={c} className={`chip${sort === c ? ' on' : ''}`} onClick={() => setSort(c)}>{c}</button>)}
          </div>
        </div>
        <button className="btn btn-primary" onClick={back}><Img src="ic-filter-white20.svg" size={20} />Terapkan Filter ({urgent ? 4 : 12} barang)</button>
      </motion.div>
    </div>
  )
}

const PINS: [string, number, number, boolean][] = [['Rp45–70rb', 110, 250, false], ['Rp25–40rb', 230, 300, true], ['Rp24–30rb', 60, 420, false], ['Rp30–50rb', 230, 470, false]]

/** Figma: B2 Peta Radar (32:2927) — pin / Ajukan → B2 Ajukan; Daftar → B1 Radar; filter → Filter */
export function PetaRadar() {
  const { go, back } = useStore()
  return (
    <div className="screen">
      <img src={A('peta-radar.svg')} alt="" className="abs" style={{ left: 0, top: 0, width: 390, height: 844 }} />
      <img src={A('peta-radius.png')} alt="" className="abs" style={{ left: 25, top: 215, width: 340, height: 340, animation: 'spin 40s linear infinite' }} />
      <div className="abs" style={{ left: 184, top: 374, width: 22, height: 22, borderRadius: 999, border: '2px solid var(--primary-500)', animation: 'pulse-ring 1.8s ease-out infinite' }} />
      <img src={A('peta-me.svg')} alt="" className="abs" style={{ left: 184, top: 374, width: 22, height: 22 }} />
      {PINS.map(([l, x, y, hot]) => (
        <button key={l} onClick={() => go('ajukan')} className="abs row t-label-s" style={{ left: x, top: y, gap: 4, padding: '6px 10px 6px 8px', borderRadius: 999, background: hot ? 'var(--amber-500)' : '#fff', color: 'var(--ink-900)', boxShadow: 'var(--elev-2)' }}>
          <Img src={hot ? 'ic-tag-ink14.svg' : 'ic-tag-indigo14.svg'} size={14} />{l}
        </button>
      ))}
      <div className="abs row" style={{ left: 24, top: 56, width: 342, height: 48, gap: 10 }}>
        <button aria-label="Kembali" onClick={back} className="row" style={{ width: 44, height: 44, borderRadius: 999, background: '#fff', justifyContent: 'center', boxShadow: 'var(--elev-1)' }}><Img src="ic-chevron-left-ink.svg" size={20} /></button>
        <div className="row grow" style={{ gap: 4, padding: 4, borderRadius: 999, background: '#fff', boxShadow: 'var(--elev-1)' }}>
          <button className="grow t-label-m" style={{ height: 36, borderRadius: 999, color: 'var(--ink-500)' }} onClick={() => go('radar', { root: true })}>Daftar</button>
          <div className="grow row t-label-m" style={{ height: 36, borderRadius: 999, background: 'var(--primary-900)', color: '#fff', justifyContent: 'center' }}>Peta</div>
        </div>
        <button aria-label="Filter" onClick={() => go('filter')} className="row" style={{ width: 44, height: 44, borderRadius: 999, background: '#fff', justifyContent: 'center', boxShadow: 'var(--elev-1)' }}><Img src="ic-filter-ink20.svg" size={20} /></button>
      </div>
      <div className="fix col" style={{ left: 24, bottom: 115, width: 342, padding: 16, gap: 12, borderRadius: 'var(--radius-xl)', background: '#fff', boxShadow: 'var(--elev-2)' }}>
        <div className="row" style={{ gap: 12 }}>
          <img src={A('peta-kipas.jpg')} alt="" style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover' }} />
          <div className="col grow" style={{ gap: 4 }}>
            <span className="t-body-ms">Kipas angin berdiri</span>
            <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>1,2 km | AI Rp25.000–Rp40.000</span>
            <div className="row" style={{ gap: 6 }}><span className="tag tag-amber"><Img src="ic-clock-amber14b.svg" size={14} />sisa 41:20</span><span className="tag tag-neutral">3 tawaran</span></div>
          </div>
        </div>
        <button className="btn btn-primary btn-m" style={{ width: '100%' }} onClick={() => go('ajukan')}><Img src="ic-tag-white20.svg" size={20} />Ajukan Tawaran</button>
      </div>
      <BottomNavPengepul active="radar" />
      <StatusBar />
    </div>
  )
}
