import { useStore, rp, SCENARIOS, type ScenarioId } from '../../store'
import { Img, StatusBar, CountdownRing, BottomNavWarga } from '../../ui'

/** Figma: D1 Sesi Saya (27:1997) — Nav Sesi / Lihat semua / ikon Sesi Ketuk */
export default function SesiSaya() {
  const { s, d, go } = useStore()
  const live = (sc: ScenarioId) => s.scenario === sc && s.session.status === 'running'
  const open = (sc: ScenarioId) => { if (!live(sc)) d({ type: 'demoState', scenario: sc, phase: 'running' }); go('sesi') }
  const top = (sc: ScenarioId) => (live(sc) ? s.session.offers[0]?.price : Math.max(...Object.values(SCENARIOS[sc].offers).map(o => o.price)))
  const remain = (sc: ScenarioId) => (live(sc) ? s.session.remaining : 38 * 60 + 12)
  const n = (sc: ScenarioId) => (live(sc) ? s.session.offers.length : 4)
  const card = (onClick: () => void, left: React.ReactNode, title: string, sub: string, tag: React.ReactNode, label: string) => (
    <button key={title} onClick={onClick} aria-label={label} className="card row" style={{ gap: 14, padding: 14, textAlign: 'left', width: '100%' }}>
      {left}
      <div className="col grow" style={{ gap: 4 }}>
        <span className="t-body-ms">{title}</span>
        <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{sub}</span>
        <span style={{ alignSelf: 'flex-start' }}>{tag}</span>
      </div>
      <Img src="ic-chevron-right.svg" size={20} />
    </button>
  )
  const over = (t: string, c = 'var(--ink-500)') => <span className="t-overline" style={{ color: c }}>{t}</span>
  return (
    <div className="screen">
      <div className="abs col nowrap" style={{ left: 24, top: 60, gap: 2 }}>
        <span className="t-h1" style={{ letterSpacing: -0.39 }}>Sesi Saya</span>
        <span className="t-body-m" style={{ color: 'var(--ink-500)' }}>2 berjalan | 1 perlu tindakan | 1 terkunci</span>
      </div>
      <div className="scroll" style={{ top: 132, bottom: 97 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 10 }}>
          <div className="row" style={{ gap: 4, padding: 4, borderRadius: 'var(--radius-md)', background: 'var(--line-100)' }}>
            <span className="row grow t-label-m" style={{ height: 40, justifyContent: 'center', borderRadius: 'var(--radius-sm)', background: '#fff', color: 'var(--primary-500)', boxShadow: 'var(--elev-1)' }}>Berjalan 2</span>
            <button className="row grow t-label-m" style={{ height: 40, justifyContent: 'center', color: 'var(--ink-500)' }} onClick={() => { d({ type: 'demoState', scenario: 'dispenser', phase: 'won' }); go('terkunci') }}>Terkunci 1</button>
            <button className="row grow t-label-m" style={{ height: 40, justifyContent: 'center', color: 'var(--ink-500)' }} onClick={() => go('riwayat', { root: true })}>Selesai 14</button>
          </div>
          {over('Berjalan')}
          {card(() => open('kipas'), <CountdownRing size={64} remaining={remain('kipas')} variant="mini" />, 'Kipas angin berdiri',
            `${n('kipas')} tawaran | tertinggi ${rp(top('kipas') ?? 0)}`,
            <span className="tag tag-amber"><Img src="ic-clock-amber.svg" size={14} />Sesi Ketuk berjalan</span>, 'Sesi kipas')}
          {card(() => open('borongan'), <CountdownRing size={64} remaining={remain('borongan')} variant="mini" />, '3 barang | Mode Pindahan',
            `${n('borongan')} tawaran borongan | tertinggi ${rp(top('borongan') ?? 0)}`,
            <span className="tag tag-indigo"><Img src="ic-box-indigo.svg" size={14} />Borongan</span>, 'Sesi borongan')}
          {over('Perlu tindakan', 'var(--coral-700)')}
          {card(() => go('sesi-kosong'), <CountdownRing size={64} remaining={0} variant="mini" />, 'Kardus bekas 12 kg', 'Sesi berakhir tanpa tawaran',
            <span className="tag tag-coral"><Img src="ic-alert-coral14.svg" size={14} />Pilih langkah</span>, 'Sesi kardus')}
          {over('Terkunci')}
          {card(() => { d({ type: 'demoState', scenario: 'dispenser', phase: 'won' }); go('terkunci') },
            <div className="row" style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--primary-900)', justifyContent: 'center', flex: 'none' }}><Img src="ic-lock-white28.svg" size={28} /></div>,
            'Dispenser', 'Rp38.000 terkunci | jemput hari ini 16.00',
            <span className="tag tag-indigo"><Img src="ic-lock-indigo14.svg" size={14} />Harga Terkunci</span>, 'Sesi dispenser')}
        </div>
      </div>
      <BottomNavWarga active="sesi" />
      <StatusBar />
    </div>
  )
}
