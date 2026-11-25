import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useStore, mmss, rp, type Offer, SESSION_LEN } from './store'

/** Static design asset exported from Figma (public/a/*) */
export const A = (name: string) => `${import.meta.env.BASE_URL}a/${name}`

export function Img({ src, size, w, h, style, className, alt = '' }: {
  src: string; size?: number; w?: number; h?: number; style?: CSSProperties; className?: string; alt?: string
}) {
  return <img src={A(src)} alt={alt} className={className} style={{ width: w ?? size, height: h ?? size, flex: 'none', ...style }} />
}

/* ---------------- StatusBar / HomeIndicator (Figma › Navigasi & Kerangka) ---------------- */
export function StatusBar({ inverse = false, bg }: { inverse?: boolean; bg?: string }) {
  return (
    <div className="abs row" style={{ top: 0, left: 0, width: 390, height: 50, padding: '8px 26px 0 34px', justifyContent: 'space-between', background: bg, zIndex: 20 }}>
      <span className="t-label-m" style={{ color: inverse ? '#fff' : 'var(--ink-900)' }}>9:41</span>
      <Img src={inverse ? 'sb-indicators-light.svg' : 'sb-indicators-dark.svg'} w={68} h={13} />
    </div>
  )
}

export function HomeIndicator({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="abs row" style={{ bottom: 0, left: 0, width: 390, height: 34, justifyContent: 'center', zIndex: 30, pointerEvents: 'none' }}>
      <div style={{ width: 134, height: 5, borderRadius: 3, background: inverse ? '#fff' : 'var(--ink-900)' }} />
    </div>
  )
}

/* ---------------- AppBar ---------------- */
export function AppBar({ title, inverse = false, trailing, onBack, bg, ink }: {
  title: string; inverse?: boolean; trailing?: ReactNode; onBack?: () => void; bg?: string; ink?: boolean
}) {
  const { back } = useStore()
  return (
    <div className="abs row" style={{ top: 50, left: 0, width: 390, height: 60, padding: '0 20px', gap: 12, background: bg ?? (inverse ? 'transparent' : 'var(--surface)'), zIndex: 10 }}>
      <button className="icon-btn" style={inverse ? { border: 0 } : undefined} onClick={onBack ?? back} aria-label="Kembali">
        <Img src="ic-back.svg" size={20} />
      </button>
      <span className="t-h3 grow" style={{ color: inverse ? '#fff' : ink ? 'var(--ink-900)' : 'var(--primary-500)' }}>{title}</span>
      {trailing}
    </div>
  )
}

export function SectionHeader({ title, action, color = 'var(--ink-900)', onAction }: { title: string; action?: string; color?: string; onAction?: () => void }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between', width: '100%' }}>
      <span className="t-h3 nowrap" style={{ color }}>{title}</span>
      {action && <button className="t-label-s nowrap" style={{ color: 'var(--primary-500)' }} onClick={onAction}>{action}</button>}
    </div>
  )
}

export function Toggle({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange?.(!on)} style={{ width: 48, height: 28, flex: 'none', position: 'relative' }} aria-pressed={on}>
      <img src={A(on ? 'toggle-on.svg' : 'toggle-off.svg')} alt="" style={{ position: 'absolute', inset: '0 0 -3.57% 0', width: '100%', height: '103.57%' }} />
    </button>
  )
}

/* ---------------- CountdownRing (Figma › CountdownRing; progress driven by remaining time) ---------------- */
export function CountdownRing({ size, remaining, variant, label }: {
  size: number; remaining: number; variant: 'large' | 'mini'; label?: string
}) {
  const stroke = variant === 'large' ? size * 0.07 : size * (6 / 64)
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const frac = Math.max(0, Math.min(1, remaining / SESSION_LEN))
  return (
    <div style={{ width: size, height: size, position: 'relative', flex: 'none' }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={variant === 'large' ? '#fff' : 'var(--primary-100)'} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--amber-500)" strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c * (1 - frac)} style={{ transition: 'stroke-dashoffset .25s linear' }} />
      </svg>
      <div className="col" style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', gap: size * 0.01 }}>
        {variant === 'large' ? (
          <>
            <span className="nowrap" style={{ fontWeight: 800, fontSize: size * 0.2, lineHeight: 1.1, letterSpacing: -size * 0.004, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{mmss(remaining)}</span>
            <span className="nowrap" style={{ fontWeight: 500, fontSize: size * 0.06, lineHeight: 1.33, color: 'var(--primary-200)' }}>{label ?? 'menit tersisa'}</span>
          </>
        ) : (
          <span className="t-label-s" style={{ fontVariantNumeric: 'tabular-nums' }}>{mmss(remaining)}</span>
        )}
      </div>
    </div>
  )
}

/* ---------------- Avatar / ScoreBadge / OfferCard ---------------- */
export function Avatar({ initials, size = 44, tone = 'indigo' }: { initials: string; size?: number; tone?: 'indigo' | 'amber' | 'dark' }) {
  const bg = tone === 'indigo' ? 'var(--primary-100)' : tone === 'amber' ? 'var(--amber-100)' : 'var(--primary-900)'
  const fg = tone === 'indigo' ? 'var(--primary-500)' : tone === 'amber' ? 'var(--amber-700)' : '#fff'
  return (
    <div className="row t-body-ms" style={{ width: size, height: size, borderRadius: 999, background: bg, color: fg, justifyContent: 'center', flex: 'none' }}>
      {initials}
    </div>
  )
}

export function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="tag tag-amber" style={{ padding: '4px 8px' }}>
      <Img src="ic-star-amber.svg" size={14} />{score}%
    </span>
  )
}

export function OfferCard({ offer, top, onClick, selected }: { offer: Offer; top: boolean; onClick?: () => void; selected?: boolean }) {
  const fresh = Date.now() - offer.at < 2500
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: -16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      onClick={onClick}
      className="row"
      style={{
        width: '100%', gap: 12, padding: '16px 16px 16px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--surface)', textAlign: 'left',
        boxShadow: '0 4px 6px rgba(21,20,43,0.06), 0 1px 1px rgba(21,20,43,0.05)',
        outline: selected ? '2px solid var(--primary-500)' : fresh ? '2px solid var(--amber-500)' : '2px solid transparent',
        transition: 'outline-color .6s',
      }}
    >
      <Avatar initials={offer.initials} />
      <div className="col grow" style={{ gap: 4 }}>
        <span className="t-body-ms">{offer.name}</span>
        <div className="row" style={{ gap: 8 }}>
          <ScoreBadge score={offer.score} />
          <span className="t-body-s nowrap" style={{ color: 'var(--ink-500)' }}>{offer.pickup}</span>
        </div>
      </div>
      <div className="col" style={{ alignItems: 'flex-end', gap: 2 }}>
        <span className="t-num-m nowrap">{rp(offer.price)}</span>
        <span className="t-label-s" style={{ color: top ? 'var(--amber-700)' : 'var(--ink-500)' }}>{top ? 'Tertinggi' : 'Tawaran'}</span>
      </div>
    </motion.button>
  )
}

/* ---------------- Bottom navs ---------------- */
function NavItem({ icon, label, active, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button className="col grow" style={{ alignItems: 'center', gap: 4 }} onClick={onClick}>
      <div className="row" style={{ width: 56, height: 32, borderRadius: 999, justifyContent: 'center', background: active ? 'var(--primary-100)' : 'transparent' }}>
        <Img src={icon} size={22} />
      </div>
      <span className="t-body-s nowrap" style={{ color: active ? 'var(--primary-500)' : 'var(--ink-500)', fontWeight: active ? 600 : 500 }}>{label}</span>
    </button>
  )
}

export function BottomNavWarga({ onPasang, onSesi }: { onPasang: () => void; onSesi: () => void }) {
  return (
    <div className="abs" style={{ left: 0, top: 747, width: 390, background: 'var(--surface)', borderTop: '1px solid var(--line-200)', zIndex: 10 }}>
      <button onClick={onPasang} className="abs row" aria-label="Pasang barang"
        style={{ left: 169, top: -12, width: 52, height: 52, borderRadius: 100, background: 'var(--primary-500)', justifyContent: 'center', boxShadow: 'var(--elev-primary)' }}>
        <Img src="ic-add-white.svg" size={22} />
      </button>
      <div className="row" style={{ padding: '10px 12px 0', alignItems: 'flex-start' }}>
        <NavItem icon="nav-house-active.svg" label="Beranda" active />
        <NavItem icon="nav-sesi.svg" label="Sesi" onClick={onSesi} />
        <div className="col grow" style={{ alignItems: 'center', gap: 4 }}>
          <div style={{ height: 32 }} />
          <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Pasang</span>
        </div>
        <NavItem icon="nav-riwayat.svg" label="Riwayat" />
        <NavItem icon="nav-akun.svg" label="Akun" />
      </div>
      <div style={{ height: 34 }} />
    </div>
  )
}

export function BottomNavPengepul({ active, onNav }: { active: 'radar' | 'tawaranku' | 'jemput' | 'akun'; onNav?: (k: 'radar' | 'tawaranku' | 'jemput' | 'akun') => void }) {
  const items: [typeof active, string, string][] = [
    ['radar', 'Radar', active === 'radar' ? 'nav-radar-active.svg' : 'nav-radar.svg'],
    ['tawaranku', 'Tawaranku', 'nav-tawaranku.svg'],
    ['jemput', 'Jemput', active === 'jemput' ? 'nav-jemput-active.svg' : 'nav-jemput.svg'],
    ['akun', 'Akun', 'nav-akun.svg'],
  ]
  return (
    <div className="abs" style={{ left: 0, top: 747, width: 390, background: 'var(--surface)', borderTop: '1px solid var(--line-200)', zIndex: 10 }}>
      <div className="row" style={{ padding: '10px 12px 0', alignItems: 'flex-start' }}>
        {items.map(([k, label, icon]) => <NavItem key={k} icon={icon} label={label} active={k === active} onClick={() => onNav?.(k)} />)}
      </div>
      <div style={{ height: 34 }} />
    </div>
  )
}

/** Item photo: the warga's real photo if one was taken, else the design photo */
export function ItemPhoto({ size, radius = 14, style }: { size: number; radius?: number; style?: CSSProperties }) {
  const { s } = useStore()
  return (
    <img src={s.photo ?? A('photo-kipas.jpg')} alt="Foto barang"
      style={{ width: size, height: size, borderRadius: radius, objectFit: 'cover', flex: 'none', ...style }} />
  )
}

export { rp, mmss }

/* ---------------- TimelineStep (Figma › TimelineStep: Done / Current / Upcoming) ---------------- */
export function TimelineStep({ state, title, meta, line = true }: { state: 'done' | 'current' | 'upcoming'; title: string; meta: string; line?: boolean }) {
  return (
    <div className="row" style={{ gap: 12, alignItems: 'flex-start', width: '100%' }}>
      <div className="col" style={{ gap: 4, alignItems: 'center', flex: 'none' }}>
        {state === 'done' ? (
          <div className="row" style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--primary-500)', justifyContent: 'center' }}><Img src="ic-check-white-14.svg" size={14} /></div>
        ) : state === 'current' ? (
          <Img src="tl-dot-current.svg" size={24} />
        ) : (
          <div style={{ width: 24, height: 24, borderRadius: 999, background: '#fff', border: '1.5px solid var(--ink-300)' }} />
        )}
        {line && <div style={{ width: 2, height: 26, background: state === 'done' ? 'var(--primary-500)' : 'var(--line-200)' }} />}
      </div>
      <div className="col grow" style={{ gap: 2, color: state === 'upcoming' ? 'var(--ink-500)' : undefined }}>
        <span className="t-body-ms" style={{ color: state === 'upcoming' ? 'inherit' : 'var(--ink-900)' }}>{title}</span>
        <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{meta}</span>
      </div>
    </div>
  )
}

/** Pak Slamet contact card (Figma: go:C2 Pengepul tiba) */
export function PengepulCard({ onChat }: { onChat?: () => void }) {
  return (
    <div className="card row" style={{ gap: 12, padding: 14, width: '100%' }}>
      <img src={A('avatar-slamet.png')} alt="" style={{ width: 44, height: 44, borderRadius: 999, objectFit: 'cover', background: 'var(--primary-100)' }} />
      <div className="col grow" style={{ gap: 4 }}>
        <span className="t-body-ms nowrap">Pak Slamet</span>
        <div className="row" style={{ gap: 6 }}>
          <ScoreBadge score={97} />
          <span className="tag tag-indigo"><Img src="ic-shield-indigo.svg" size={14} />Mitra</span>
        </div>
      </div>
      <button onClick={onChat} aria-label="Chat" className="row" style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}><Img src="ic-chat-indigo.svg" size={20} /></button>
      <button onClick={onChat} aria-label="Telepon" className="row" style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}><Img src="ic-call-indigo.svg" size={20} /></button>
    </div>
  )
}

/* ---------------- Checkbox (Figma › Checkbox) ---------------- */
export function Checkbox({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange?.(!on)} aria-pressed={on} className="row"
      style={{ width: 24, height: 24, borderRadius: 8, flex: 'none', justifyContent: 'center', background: on ? 'var(--primary-500)' : '#fff', border: on ? 'none' : '1.5px solid var(--ink-300)', transition: 'background .15s' }}>
      {on && <Img src="ic-check-white-16.svg" size={16} />}
    </button>
  )
}
