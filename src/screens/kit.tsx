/**
 * Building blocks shared by the newer Figma flows (Lepas Gratis H*, E-waste I*, Keluarga K*,
 * Building blocks shared by the newer Figma flows (Lepas Gratis H, E-waste I, Keluarga K,
 * Pengepul F, G, A1a–A2h, D1a–D1f, E2). Values copied from those frames:
 */
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { A, Img, StatusBar, AppBar, CountdownRing } from '../ui'

export const C = {
  ink: '#15142b', ink5: '#6b6982', ink7: '#3a3950', indigo: '#3d2fd0', navy: '#1b1760', lav: '#d6d2fd',
  amber: '#f5a524', amber7: '#a35a05', line: '#e6e4ef', canvas: '#f6f5fb',
}
const lh = 1.4

/** Screen with AppBar (ink title, help button) + optional step bar, scrolling body and bottom bar */
export function Page({ title, children, bottom, steps, help = true, onBack, fit = true, bg }: {
  title: string; children: ReactNode; bottom?: ReactNode; steps?: [string[], number]; help?: boolean; onBack?: () => void; fit?: boolean; bg?: string
}) {
  const { go } = useStore()
  return (
    <div className={`screen${fit ? ' fit' : ''}`} style={{ background: bg ?? C.canvas }}>
      <AppBar ink title={title} onBack={onBack} bg="transparent"
        trailing={help ? <button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button> : undefined} />
      <div className="scroll" style={{ top: 110, bottom: bottom ? 100 : 0 }}>
        <div className="col" style={{ padding: '6px 24px 24px', gap: 12 }}>
          {steps && <Steps labels={steps[0]} active={steps[1]} />}
          {children}
        </div>
      </div>
      {bottom && <div className="bottom-bar" style={{ borderTop: 0, padding: '12px 24px 32px', gap: 10 }}>{bottom}</div>}
      <StatusBar bg={C.canvas} />
    </div>
  )
}

/** Figma "Progress": 4 bars (done = indigo, current = amber, rest = line) with labels */
export function Steps({ labels, active }: { labels: string[]; active: number }) {
  return (
    <div className="row" style={{ gap: 6, alignItems: 'flex-start' }}>
      {labels.map((l, i) => (
        <div key={l} className="col grow" style={{ gap: 6, flexBasis: 0 }}>
          <div style={{ height: 4, borderRadius: 2, background: i < active ? C.indigo : i === active ? C.amber : C.line }} />
          <span className="nowrap" style={{ fontSize: 11, lineHeight: lh, fontWeight: i === active ? 700 : 600, color: i <= active ? C.ink : C.ink5 }}>{l}</span>
        </div>
      ))}
    </div>
  )
}

type TagTone = 'amber' | 'indigo' | 'coral' | 'green' | 'glass'
export function Tag({ icon, children, tone = 'amber' }: { icon?: string; children: ReactNode; tone?: TagTone }) {
  const t = { amber: ['#fff1d6', C.amber7], indigo: ['#eceafe', C.indigo], coral: ['#fde5e5', '#c4282d'], green: ['#e3f6ec', '#1b7a4b'], glass: ['rgba(255,255,255,.16)', '#fff'] }[tone]
  return (
    <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: t[0], color: t[1], alignSelf: 'flex-start' }}>
      {icon && <Img src={icon} size={14} />}{children}
    </span>
  )
}

/** Dark navy hero card */
export function Hero({ tag, title, sub, extra, children, style }: { tag?: ReactNode; title: ReactNode; sub?: ReactNode; extra?: ReactNode; children?: ReactNode; style?: CSSProperties }) {
  return (
    <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: C.navy, ...style }}>
      {tag}
      <span style={{ fontWeight: 800, fontSize: 20, lineHeight: lh, color: '#fff' }}>{title}</span>
      {sub && <span style={{ fontSize: 13, lineHeight: lh, color: C.lav }}>{sub}</span>}
      {extra && <span style={{ fontWeight: 600, fontSize: 12, lineHeight: lh, color: C.amber, whiteSpace: 'pre-wrap' }}>{extra}</span>}
      {children}
    </div>
  )
}

/** White card with an optional title row */
export function Card({ title, right, children, gap = 12, style }: { title?: ReactNode; right?: ReactNode; children?: ReactNode; gap?: number; style?: CSSProperties }) {
  return (
    <div className="col" style={{ gap, padding: 16, borderRadius: 20, background: '#fff', ...style }}>
      {(title || right) && (
        <div className="row" style={{ gap: 8, justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, fontSize: 14, lineHeight: lh, color: C.ink }}>{title}</span>{right}
        </div>
      )}
      {children}
    </div>
  )
}

/** Vertical timeline used by the status cards (state per step) */
export type TL = [title: string, sub: string, state: 'done' | 'current' | 'todo' | 'fail']
export function Timeline({ steps }: { steps: TL[] }) {
  return (
    <div className="col">
      {steps.map(([t, sub, st], i) => {
        const last = i === steps.length - 1
        return (
          <div key={t} className="row" style={{ gap: 12, alignItems: 'stretch' }}>
            <div className="col" style={{ alignItems: 'center', flex: 'none' }}>
              {st === 'done' ? <div className="row" style={{ width: 22, height: 22, borderRadius: 999, background: C.indigo, justifyContent: 'center' }}><Img src="tl-check14.svg" size={14} /></div>
                : st === 'current' ? <Img src="tl-dot-current22.svg" size={22} />
                : st === 'fail' ? <div className="row" style={{ width: 22, height: 22, borderRadius: 999, background: '#e5484d', justifyContent: 'center' }}><Img src="ic-x-white.svg" size={12} /></div>
                : <div style={{ width: 22, height: 22, borderRadius: 999, background: '#fff', border: '2px solid #c9c6d9' }} />}
              {!last && <div style={{ flex: 1, width: 2, background: st === 'done' ? C.indigo : C.line }} />}
            </div>
            <div className="col grow" style={{ gap: 2, paddingBottom: last ? 0 : 14 }}>
              <span style={{ fontSize: 14, lineHeight: lh, fontWeight: st === 'todo' ? 500 : 600, color: st === 'todo' ? C.ink5 : st === 'fail' ? '#c4282d' : C.ink }}>{t}</span>
              <span style={{ fontSize: 12, lineHeight: lh, color: C.ink5 }}>{sub}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Info (lavender), warning (amber) or alert (coral) note */
export function Note({ children, tone = 'info', icon }: { children: ReactNode; tone?: 'info' | 'warn' | 'alert' | 'plain'; icon?: string }) {
  const t = { info: ['#eceafe', C.navy, 'ic-info-indigo18b.svg'], warn: ['#fff1d6', '#7a4a00', 'fi-alert-a35a05-18.svg'], alert: ['#fde5e5', '#c4282d', 'ic-alert-coral20.svg'], plain: ['#fff', C.ink7, 'ic-info-indigo18b.svg'] }[tone]
  return (
    <div className="row" style={{ gap: 10, padding: 14, borderRadius: 16, background: t[0], alignItems: 'flex-start' }}>
      <Img src={icon ?? t[2]} size={18} />
      <span className="grow" style={{ fontSize: 12, lineHeight: lh, fontWeight: 500, color: t[1] }}>{children}</span>
    </div>
  )
}

/** Key → value rows */
export function KV({ rows, total }: { rows: [ReactNode, ReactNode][]; total?: [ReactNode, ReactNode] }) {
  return (
    <div className="col" style={{ gap: 10 }}>
      {rows.map(([k, v], i) => (
        <div key={i} className="row" style={{ justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 13, lineHeight: lh, fontWeight: 500, color: C.ink5 }}>{k}</span>
          <span style={{ fontSize: 14, lineHeight: lh, fontWeight: 600, color: C.ink, textAlign: 'right' }}>{v}</span>
        </div>
      ))}
      {total && (<>
        <div style={{ height: 1, background: C.line }} />
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, lineHeight: lh, fontWeight: 700, color: C.ink }}>{total[0]}</span>
          <span style={{ fontSize: 18, lineHeight: lh, fontWeight: 800, color: C.indigo }}>{total[1]}</span>
        </div>
      </>)}
    </div>
  )
}

/** Check list row (indigo check-circle) */
export function Check({ t, sub, icon = 'ic-check-circle-indigo.svg', color }: { t: ReactNode; sub?: ReactNode; icon?: string; color?: string }) {
  return (
    <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
      <Img src={icon} size={20} />
      <div className="col grow" style={{ gap: 2 }}>
        <span style={{ fontSize: 14, lineHeight: lh, color: color ?? C.ink }}>{t}</span>
        {sub && <span style={{ fontSize: 12, lineHeight: lh, color: C.ink5 }}>{sub}</span>}
      </div>
    </div>
  )
}

/** "Kode serah terima" dark box with 4 digit tiles */
export function CodeBox({ label = 'KODE SERAH TERIMA', code, sub }: { label?: string; code: string; sub?: ReactNode }) {
  return (
    <div className="col" style={{ gap: 12, padding: 18, borderRadius: 24, background: C.navy, alignItems: 'center' }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.88, color: C.lav }}>{label}</span>
      <div className="row" style={{ gap: 10 }}>
        {code.split('').map((c, i) => (
          <div key={i} className="row" style={{ width: 52, height: 60, borderRadius: 12, background: '#fff', justifyContent: 'center', fontWeight: 800, fontSize: 28, color: C.navy }}>{c}</div>
        ))}
      </div>
      {sub && <span style={{ fontSize: 12, lineHeight: lh, color: C.lav, textAlign: 'center' }}>{sub}</span>}
    </div>
  )
}

/** Primary / secondary / danger buttons as in the Figma bottom bars */
export function Btn({ children, icon, kind = 'primary', onClick, disabled }: { children: ReactNode; icon?: string; kind?: 'primary' | 'soft' | 'danger' | 'accent' | 'outline' | 'muted'; onClick?: () => void; disabled?: boolean }) {
  const st: Record<string, CSSProperties> = {
    primary: { background: C.indigo, color: '#fff', boxShadow: '0 10px 12px rgba(61,47,208,0.35)' },
    soft: { background: '#eceafe', color: C.indigo },
    danger: { background: '#fde5e5', color: '#c4282d' },
    accent: { background: C.amber, color: C.ink },
    outline: { background: '#fff', color: C.ink, border: '1.5px solid ' + C.line },
    muted: { background: C.line, color: C.ink },
  }
  return <button className="btn" disabled={disabled} onClick={onClick} style={st[kind]}>{icon && <Img src={icon} size={20} />}{children}</button>
}

/** Overline section label */
export const Over = ({ children, color }: { children: ReactNode; color?: string }) =>
  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.88, textTransform: 'uppercase', color: color ?? C.ink5 }}>{children}</span>

/** Auto-advance after `ms` (Figma "After delay" prototype triggers) */
export function useAfter(ms: number, fn: () => void) {
  useEffect(() => { const id = setTimeout(fn, ms); return () => clearTimeout(id) }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

/** Small round image/avatar tile */
export const Photo = ({ src, size = 56, r = 14 }: { src: string; size?: number; r?: number }) =>
  <img src={A(src)} alt="" style={{ width: size, height: size, borderRadius: r, objectFit: 'cover', flex: 'none' }} />

/**
 * Dark session header used by H2 (Lepas Gratis) and I2 (E-waste): deco rings, countdown ring,
 * item row and stat chips — same geometry as B2 Sesi Ketuk (10:576). Children render in the
 * rounded canvas panel that starts at y=404.
 */
export function SessionShell({ title, item, stats, children, bottom, remaining = 38 * 60 + 12, ringLabel = 'menit tersisa', onBack }: {
  title: string; item: { img?: string; tile?: ReactNode; name: string; sub: string }; stats: [string, string][]
  children: ReactNode; bottom?: ReactNode; remaining?: number; ringLabel?: string; onBack?: () => void
}) {
  const { back } = useStore()
  return (
    <div className="screen fit">
      <div className="abs" style={{ left: 0, top: 0, width: 390, height: 420, background: C.navy, overflow: 'hidden' }}>
        <img src={A('sesi-deco1.svg')} alt="" className="abs" style={{ left: -15, top: 52, width: 420, height: 420 }} />
        <img src={A('sesi-deco2.svg')} alt="" className="abs" style={{ left: 35, top: 102, width: 320, height: 320 }} />
        <div className="abs" style={{ left: 113, top: 180 }}><RingInline remaining={remaining} label={ringLabel} /></div>
      </div>
      <div className="abs row" style={{ top: 50, left: 0, width: 390, height: 60, padding: '0 20px', gap: 12 }}>
        <button className="icon-btn" onClick={onBack ?? back} aria-label="Kembali"><Img src="ic-back.svg" size={20} /></button>
        <span className="t-h3 grow" style={{ color: '#fff' }}>{title}</span>
      </div>
      <div className="abs row" style={{ left: 24, top: 114, gap: 12 }}>
        {item.tile ?? <img src={A(item.img!)} alt="" style={{ width: 48, height: 48, borderRadius: 14, objectFit: 'cover' }} />}
        <div className="col nowrap" style={{ gap: 2 }}>
          <span className="t-body-ms" style={{ color: '#fff' }}>{item.name}</span>
          <span className="t-body-s" style={{ color: C.lav }}>{item.sub}</span>
        </div>
      </div>
      <div className="abs row" style={{ left: '50%', top: 369, transform: 'translateX(-50%)', gap: 6.5 }}>
        {stats.map(([ic, t]) => (
          <span key={t} className="row nowrap" style={{ gap: 3.26, padding: '3.26px 8.15px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', color: '#fff', fontWeight: 600, fontSize: 9.78, lineHeight: '13px' }}>
            <Img src={ic} size={11.4} />{t}
          </span>
        ))}
      </div>
      <div className="abs col" style={{ left: 0, top: 404, width: 390, bottom: bottom ? 102 : 0, background: C.canvas, borderRadius: '28px 28px 0 0', padding: '20px 24px 0', gap: 12, overflow: 'hidden' }}>
        {children}
      </div>
      {bottom && <div className="bottom-bar">{bottom}</div>}
      <StatusBar inverse />
    </div>
  )
}

/** Countdown ring that ticks down by itself (H2/I2 frames are not tied to the live session) */
function RingInline({ remaining, label }: { remaining: number; label: string }) {
  const [t, setT] = useState(remaining)
  useEffect(() => { const id = setInterval(() => setT(x => Math.max(0, x - 1)), 1000); return () => clearInterval(id) }, [])
  return <CountdownRing size={164} remaining={t} variant="large" label={label} />
}

/** Radar rings (D1/H2/I2 "mencari pengepul" empty state) */
export function RadarRings({ size = 138 }: { size?: number }) {
  const k = size / 138
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      {[[138, true], [83, true], [41, false]].map(([d, dash]) => (
        <div key={String(d)} className="abs" style={{ left: (size - (d as number) * k) / 2, top: (size - (d as number) * k) / 2, width: (d as number) * k, height: (d as number) * k, borderRadius: '50%', border: `1px ${dash ? 'dashed' : 'solid'} #a9a7ba` }} />
      ))}
      <div className="abs" style={{ left: size / 2 - 7, top: size / 2 - 7, width: 14, height: 14, borderRadius: '50%', background: C.indigo, boxShadow: '0 0 0 6px #eceafe' }} />
      <div className="abs" style={{ left: size / 2 - 20, top: size / 2 - 20, width: 40, height: 40, borderRadius: '50%', border: '1.5px solid ' + C.indigo, animation: 'pulse-ring 1.8s ease-out infinite' }} />
    </div>
  )
}
