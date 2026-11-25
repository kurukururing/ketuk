import { AnimatePresence, motion } from 'framer-motion'
import { useStore, rp, mmss, PAK_SLAMET } from '../../store'
import { A, Img, StatusBar } from '../../ui'

/** Figma: B2 Tawaran Terkirim (32:3059) — live ranking; turns into "dipilih" when the warga ketuk palu */
export default function Terkirim() {
  const { s, go } = useStore()
  const offers = s.session.offers
  const mine = offers.find(o => o.id === PAK_SLAMET.id)
  const rank = offers.findIndex(o => o.id === PAK_SLAMET.id) + 1
  const won = s.session.winner === PAK_SLAMET.id

  return (
    <div className="screen">
      <div className="abs col" style={{ left: 24, top: 96, width: 342, gap: 8, alignItems: 'center', textAlign: 'center' }}>
        <motion.div key={won ? 'won' : 'sent'} initial={{ scale: 0.5, rotate: won ? -25 : 0 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 13 }}
          className="row" style={{ width: 96, height: 96, borderRadius: 999, justifyContent: 'center', background: won ? 'var(--amber-500)' : 'var(--primary-500)', boxShadow: '0 12px 28px -6px rgba(61,46,209,0.35)' }}>
          {won ? <img src={A('3d-palu.png')} alt="" style={{ width: 84, height: 84 }} /> : <Img src="ic-send-white44.svg" size={44} />}
        </motion.div>
        <span className="t-h1" style={{ letterSpacing: -0.39 }}>{won ? 'Tok! Tawaranmu dipilih' : `Tawaran ${rp(mine?.price ?? 0)} terkirim`}</span>
        <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>
          {won
            ? <>Harga terkunci <b style={{ color: 'var(--primary-500)' }}>{rp(mine?.price ?? 0)}</b>. Jemput Bu Ratna {mine?.pickup.replace('Jemput', 'pukul')}.</>
            : <>Kamu <b style={{ color: 'var(--primary-500)' }}>peringkat {rank}</b> dari {offers.length} tawaran. Sesi berakhir dalam {mmss(s.session.remaining)}.</>}
        </span>
      </div>

      <div className="abs col" style={{ left: 0, top: 330, width: 390, padding: '0 24px', gap: 12 }}>
        <div className="col" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '4px 16px' }}>
          <AnimatePresence initial={false}>
            {offers.map((o, i) => {
              const me = o.id === PAK_SLAMET.id
              return (
                <motion.div layout key={o.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="row" style={{ gap: 12, padding: '12px 0', borderBottom: i < offers.length - 1 ? '1px solid var(--line-100)' : 'none' }}>
                  <div className="row t-label-s" style={{ width: 28, height: 28, borderRadius: 999, justifyContent: 'center', background: me ? 'var(--amber-500)' : 'var(--line-100)', color: me ? 'var(--ink-900)' : 'var(--ink-500)' }}>{i + 1}</div>
                  <span className={me ? 't-body-ms grow' : 't-body-m grow'} style={{ color: me ? 'var(--primary-500)' : 'var(--ink-500)' }}>{me ? 'Tawaranmu' : 'Pengepul lain'}</span>
                  <span className="t-body-ms nowrap" style={{ color: me ? 'var(--ink-900)' : 'var(--ink-500)' }}>{rp(o.price)}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Img src="ic-lock-indigo18.svg" size={18} />
          <span className="t-body-s grow" style={{ color: 'var(--ink-700)' }}>Identitas pengepul lain disamarkan. Jika dipilih warga, harga terkunci.</span>
        </div>
      </div>

      <div className="bottom-bar" style={{ height: 166 }}>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => go('jadwal')}>
          <Img src="ic-tag-white20.svg" size={20} />Lihat Tawaranku
        </button>
        <button className="btn" style={{ border: '1.5px solid var(--line-200)' }} onClick={() => go('radar', { root: true })}>
          <Img src="ic-radar-ink.svg" size={20} />Kembali ke Radar
        </button>
      </div>
      <StatusBar bg="var(--canvas)" />
    </div>
  )
}
