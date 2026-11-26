import { useState } from 'react'
import { useStore } from '../../store'
import { Img, StatusBar, AppBar } from '../../ui'

type N = { k: string; icon: string; bg: string; title: string; sub: string; time: string; unread?: boolean; go: () => void }

/** Figma: B1 Notifikasi (23:1691) + tab Sesi (92:3717) + tab Transaksi (92:3817) */
export default function Notifikasi() {
  const { d, go } = useStore()
  const [tab, setTab] = useState<'Semua' | 'Sesi' | 'Transaksi'>('Semua')
  const [read, setRead] = useState(false)
  // Dispenser lock in the notification: Rp35.000, jemput besok 09.00 (Figma B1 Notifikasi / D1 Sesi Saya)
  const sesi = (sc: 'kipas' | 'dispenser', phase: 'running' | 'won', to: 'sesi' | 'terkunci') => () => {
    d({ type: 'demoState', scenario: sc, phase, ...(sc === 'dispenser' && phase === 'won' ? { lock: { id: 'ub', price: 35000, pickup: 'Besok 09.00' } } : {}) }); go(to)
  }
  const today: N[] = [
    { k: 'a', icon: 'ic-tag-indigo20.svg', bg: 'var(--primary-100)', title: 'Tawaran baru Rp38.000', sub: 'Pak Slamet | kipas angin | jemput 16.00', time: '2 mnt', unread: true, go: sesi('kipas', 'running', 'sesi') },
    { k: 'b', icon: 'ic-clock-amber20.svg', bg: 'var(--amber-100)', title: 'Sesi tersisa 15 menit', sub: 'Kipas angin berdiri | 5 tawaran masuk', time: '18 mnt', unread: true, go: sesi('kipas', 'running', 'sesi') },
    { k: 'c', icon: 'ic-lock-indigo20.svg', bg: 'var(--primary-100)', title: 'Harga terkunci Rp35.000', sub: 'Dispenser | jemput besok 09.00', time: '1 jam', go: sesi('dispenser', 'won', 'terkunci') },
  ]
  const yesterday: N[] = [
    { k: 'd', icon: 'ic-alert-coral20.svg', bg: 'var(--coral-100)', title: 'Koreksi diajukan', sub: 'Kasur busa | usulan Rp50.000 dengan bukti foto', time: 'Kmr', go: () => { d({ type: 'demoState', scenario: 'kipas', phase: 'won', correction: true }); go('koreksi') } },
    { k: 'e', icon: 'ic-cash-amber.svg', bg: 'var(--amber-100)', title: 'Rp45.000 diterima', sub: 'Rak besi 3 susun | tanpa koreksi', time: 'Kmr', go: () => go('bukti') },
    { k: 'f', icon: 'ic-users-indigo20.svg', bg: 'var(--primary-100)', title: 'Dimas memasang barang', sub: 'Mode Dibantu Keluarga | kardus 12 kg', time: 'Kmr', go: () => go('dibantu') },
  ]
  const groups: [string, N[]][] = tab === 'Semua' ? [['Hari ini', today], ['Kemarin', yesterday]] : tab === 'Sesi' ? [['Hari ini', today]] : [['Hari ini', today.slice(0, 2)]]
  return (
    <div className="screen fit">
      <AppBar ink title="Notifikasi"
        trailing={<button className="icon-btn" onClick={() => setRead(true)} aria-label="Tandai dibaca"><Img src="ic-checkmark-ink.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 0 }}>
        <div className="col" style={{ padding: '0 24px 40px', gap: 10 }}>
          <div className="row" style={{ gap: 4, padding: 4, borderRadius: 'var(--radius-md)', background: 'var(--line-100)' }}>
            {(['Semua', 'Sesi', 'Transaksi'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className="row grow t-label-m"
                style={{ height: 40, justifyContent: 'center', borderRadius: 'var(--radius-sm)', background: tab === t ? '#fff' : 'transparent', color: tab === t ? 'var(--primary-500)' : 'var(--ink-500)', boxShadow: tab === t ? 'var(--elev-1)' : 'none' }}>{t}</button>
            ))}
          </div>
          {groups.map(([g, items]) => (
            <div key={g} className="col" style={{ gap: 10 }}>
              <span className="t-overline" style={{ color: 'var(--ink-500)' }}>{g}</span>
              <div className="col" style={{ padding: '4px 14px', borderRadius: 'var(--radius-lg)', background: '#fff' }}>
                {items.map((n, i) => (
                  <button key={n.k} onClick={n.go} className="row" style={{ gap: 12, padding: '12px 0', alignItems: 'flex-start', textAlign: 'left', borderBottom: i < items.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
                    <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: n.bg, justifyContent: 'center', flex: 'none' }}><Img src={n.icon} size={20} /></div>
                    <div className="col grow" style={{ gap: 2 }}>
                      <span className="t-body-ms">{n.title}</span>
                      <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{n.sub}</span>
                    </div>
                    <div className="col" style={{ gap: 6, alignItems: 'flex-end' }}>
                      <span className="t-body-s nowrap" style={{ color: 'var(--ink-500)' }}>{n.time}</span>
                      {n.unread && !read && <Img src="unread-dot.svg" size={8} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}
