import { AnimatePresence, motion } from 'framer-motion'
import { useStore, mmss, type Preset } from './store'

const PRESETS: [Preset, string, string][] = [
  ['awal', '1', 'Beranda Warga'],
  ['sesi', '2', 'Sesi Ketuk baru dimulai'],
  ['pengepul', '3', 'Pengepul: Radar Barang'],
  ['menang', '4', 'Tawaran Pak Slamet masuk'],
  ['serah', '5', 'Serah terima'],
  ['koreksi', '6', 'Koreksi berbukti'],
  ['selesai', '7', 'Transaksi selesai'],
]

/** Presenter-only control panel. Toggle with D (or `). Hidden from the judges' view by default. */
export default function DemoPanel() {
  const { s, d } = useStore()
  const sec = s.session
  return (
    <AnimatePresence>
      {s.panel && (
        <motion.div className="demo-panel"
          initial={{ x: 340, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 340, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          style={{
            position: 'fixed', top: 16, right: 16, bottom: 16, width: 300, zIndex: 1000, overflowY: 'auto',
            background: 'rgba(15,13,51,0.94)', backdropFilter: 'blur(12px)', color: '#fff',
            border: '1px solid rgba(255,255,255,.12)', borderRadius: 20, padding: 18,
            display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13,
          }}
        >
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <b style={{ fontSize: 15 }}>Panel Demo</b>
            <button onClick={() => d({ type: 'panel', open: false })} style={{ color: 'rgba(255,255,255,.6)', padding: '6px 0 6px 12px' }}>Tutup</button>
          </div>

          <Section title="Peran">
            <div className="row" style={{ gap: 6 }}>
              {(['warga', 'pengepul'] as const).map(r => (
                <button key={r} onClick={() => d({ type: 'role', role: r })} className="grow"
                  style={{ padding: '10px 0', borderRadius: 10, fontWeight: 600, background: s.role === r ? '#fff' : 'rgba(255,255,255,.07)', color: s.role === r ? 'var(--primary-900)' : '#fff' }}>
                  {r === 'warga' ? 'Warga' : 'Pengepul'}{s.role !== r && s.toasts.some(t => t.role === r) ? ' •' : ''}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Status">
            <Line k="Peran" v={s.role === 'warga' ? 'Warga' : 'Pengepul'} />
            <Line k="Layar" v={String((s[s.role] as string[]).at(-1))} />
            <Line k="Sesi" v={`${sec.status} · ${mmss(sec.remaining)} · ${sec.offers.length} tawaran`} />
            <Line k="Kecepatan timer" v={`${s.speed}×`} />
          </Section>

          <Section title="Lompat ke adegan">
            {PRESETS.map(([p, key, label]) => (
              <Btn key={p} onClick={() => d({ type: 'jump', preset: p })}><Kbd>{key}</Kbd>{label}</Btn>
            ))}
          </Section>

          <Section title="Kendali">
            <Btn onClick={() => d({ type: 'role', role: s.role === 'warga' ? 'pengepul' : 'warga' })}><Kbd>Tab</Kbd>Ganti peran Warga ⇄ Pengepul</Btn>
            <Btn onClick={() => d({ type: 'offer', id: 'ps' })}><Kbd>O</Kbd>Kirim tawaran Pak Slamet Rp38.000</Btn>
            <Btn onClick={() => d({ type: 'speed', speed: s.speed === 1 ? 30 : 1 })}><Kbd>F</Kbd>Timer {s.speed === 1 ? 'dipercepat 30×' : 'normal 1×'}</Btn>
            <Btn onClick={() => d({ type: 'skip', seconds: 10 * 60 })}>Majukan timer 10 menit</Btn>
            <Btn onClick={() => d({ type: 'photo', photo: null })}>Pakai foto contoh (kipas)</Btn>
            <Btn danger onClick={() => d({ type: 'reset' })}><Kbd>⇧R</Kbd>Reset demo ke awal</Btn>
          </Section>

          <p style={{ color: 'rgba(255,255,255,.45)', lineHeight: 1.5 }}>
            Di laptop: shortcut tetap aktif meski panel tertutup (D buka panel, Tab ganti peran, 1–7 lompat adegan).
            Di HP: buka panel lewat pil di bagian atas layar.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="col" style={{ gap: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.88, textTransform: 'uppercase', color: 'var(--primary-200)' }}>{title}</span>
      {children}
    </div>
  )
}
const Line = ({ k, v }: { k: string; v: string }) => (
  <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}><span style={{ color: 'rgba(255,255,255,.55)' }}>{k}</span><span style={{ textAlign: 'right' }}>{v}</span></div>
)
const Btn = ({ children, onClick, danger }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) => (
  <button onClick={onClick} className="row" style={{ gap: 10, padding: '9px 10px', borderRadius: 10, textAlign: 'left', background: danger ? 'rgba(229,72,77,.18)' : 'rgba(255,255,255,.07)', color: danger ? '#ffb4b6' : '#fff' }}>{children}</button>
)
const Kbd = ({ children }: { children: React.ReactNode }) => (
  <span style={{ minWidth: 30, textAlign: 'center', padding: '2px 6px', borderRadius: 6, background: 'rgba(255,255,255,.14)', fontSize: 11, fontWeight: 700 }}>{children}</span>
)
