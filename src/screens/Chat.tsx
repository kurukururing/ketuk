import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store'
import { A, Img, StatusBar, Avatar } from '../ui'

export type Msg = { me: boolean; text?: string; time: string; img?: string; action?: ReactNode }

/** Shared chat layout — Figma: E1/D1 Chat dengan Pengepul (25:2045) and D1 Chat dengan Warga (278:6692) */
export default function Chat({ initials, name, status, banner, messages, quick, onCall }: {
  initials: string; name: string; status: string; banner: string; messages: Msg[]; quick: string[]; onCall?: () => void
}) {
  const { back } = useStore()
  const [extra, setExtra] = useState<Msg[]>([])
  const [draft, setDraft] = useState('')
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [extra.length])
  const send = (text: string) => { if (text.trim()) { setExtra(x => [...x, { me: true, text, time: '15.49  | terkirim' }]); setDraft('') } }
  const all = [...messages, ...extra]

  return (
    <div className="screen">
      <div className="abs row" style={{ left: 0, top: 46, width: 390, height: 64, padding: '0 20px', gap: 12, background: '#fff', borderBottom: '1px solid var(--line-200)', zIndex: 5 }}>
        <button className="icon-btn" style={{ width: 40, height: 40 }} onClick={back} aria-label="Kembali"><Img src="ic-chevron-left-ink.svg" size={20} /></button>
        <Avatar initials={initials} size={40} />
        <div className="col grow" style={{ gap: 2 }}>
          <span className="t-body-ms">{name}</span>
          <span className="t-body-s" style={{ color: 'var(--amber-700)' }}>{status}</span>
        </div>
        <button onClick={onCall} className="row" style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--primary-100)', justifyContent: 'center' }}><Img src="ic-call-indigo.svg" size={20} /></button>
      </div>

      <div className="scroll" style={{ top: 110, bottom: 140 }}>
        <div className="col" style={{ padding: '14px 24px 12px', gap: 10 }}>
          <div className="row" style={{ gap: 6, justifyContent: 'center', padding: '8px 12px', borderRadius: 999, background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
            <Img src="ic-lock-indigo14.svg" size={14} /><span className="t-label-s nowrap" style={{ color: 'var(--primary-900)' }}>{banner}</span>
          </div>
          {all.map((m, i) => (
            <motion.div key={i} className="row" style={{ justifyContent: m.me ? 'flex-end' : 'flex-start' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i < messages.length ? i * 0.12 : 0 }}>
              <div className="col" style={{ gap: 6, padding: '10px 14px 8px', maxWidth: 278, background: m.me ? 'var(--primary-500)' : '#fff',
                borderRadius: m.me ? '18px 18px 4px 18px' : '18px 18px 18px 4px' }}>
                {m.img && <img src={m.img} alt="" style={{ width: 120, height: 120, borderRadius: 14, objectFit: 'cover' }} />}
                {m.text && <span className="t-body-m" style={{ color: m.me ? '#fff' : 'var(--ink-900)' }}>{m.text}</span>}
                {m.action}
                <span className="t-body-s" style={{ whiteSpace: 'pre', color: m.me ? 'var(--primary-200)' : 'var(--ink-500)' }}>{m.time}</span>
              </div>
            </motion.div>
          ))}
          <div ref={end} />
        </div>
      </div>

      <div className="abs row scroll" style={{ left: 0, right: 0, top: 754, height: 40, padding: '0 46px', gap: 8 }}>
        {quick.map(q => <button key={q} className="chip" onClick={() => send(q)}>{q}</button>)}
      </div>
      <div className="abs row" style={{ left: 0, bottom: 0, width: 390, height: 90, padding: '10px 16px 34px', gap: 10, background: '#fff', borderTop: '1px solid var(--line-200)', alignItems: 'flex-start' }}>
        <button className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--line-100)', justifyContent: 'center' }}><Img src="ic-camera-ink.svg" size={20} /></button>
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(draft)} placeholder="Tulis pesan..."
          className="t-body-m grow" style={{ height: 44, padding: '0 16px', borderRadius: 999, background: 'var(--line-100)', border: 0, outline: 0 }} />
        <button onClick={() => send(draft)} className="row" style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--primary-500)', justifyContent: 'center' }}><Img src="ic-send-white.svg" size={20} /></button>
      </div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}

export const kipasPhoto = (photo: string | null) => photo ?? A('photo-kipas.jpg')
