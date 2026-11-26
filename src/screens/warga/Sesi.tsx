import { AnimatePresence, motion } from 'framer-motion'
import { useStore, ITEM, rp } from '../../store'
import { A, Img, StatusBar, CountdownRing, OfferCard, SectionHeader, ItemPhoto } from '../../ui'

/** Figma: B2 Sesi Ketuk (10:576) — live countdown, offers stream in */
export default function Sesi() {
  const { s, d, go } = useStore()
  const { offers, remaining, selected } = s.session
  const pick = selected ?? offers[0]?.id ?? null
  const bor = s.scenario === 'borongan'

  return (
    <div className="screen fit">
      {/* Hero */}
      <div className="abs" style={{ left: 0, top: 0, width: 390, height: 420, background: 'var(--primary-900)', overflow: 'hidden' }}>
        <img src={A('sesi-deco1.svg')} alt="" className="abs" style={{ left: -15, top: 52, width: 420, height: 420 }} />
        <img src={A('sesi-deco2.svg')} alt="" className="abs" style={{ left: 35, top: 102, width: 320, height: 320 }} />
        {offers.length === 0 && (
          <div className="abs" style={{ left: 113, top: 180, width: 164, height: 164, borderRadius: '50%', border: '2px solid var(--amber-500)', animation: 'pulse-ring 1.6s ease-out infinite' }} />
        )}
        <div className="abs" style={{ left: 113, top: 180 }}>
          <CountdownRing size={164} remaining={remaining} variant="large" />
        </div>
      </div>

      {/* AppBar (inverse) */}
      <div className="abs row" style={{ top: 50, left: 0, width: 390, height: 60, padding: '0 20px', gap: 12 }}>
        <button className="icon-btn" onClick={() => go('beranda', { root: true })} aria-label="Kembali"><Img src="ic-back.svg" size={20} /></button>
        <span className="t-h3 grow" style={{ color: '#fff' }}>{bor ? 'Sesi Borongan' : 'Sesi Ketuk'}</span>
        {bor && <button className="icon-btn" style={{ border: 0 }} onClick={() => go('bantuan')}><Img src="ic-help.svg" size={20} /></button>}
      </div>

      {/* Barang */}
      <div className="abs row" style={{ left: 24, top: 114, gap: 12 }}>
        {bor ? (
          <div style={{ position: 'relative', width: 76, height: 48 }}>
            {['item-kasur.jpg', 'item-rak.jpg', 'item-disp.jpg'].map((src, i) => (
              <img key={src} src={A(src)} alt="" style={{ position: 'absolute', left: i * 14, top: 0, width: 48, height: 48, borderRadius: 14, objectFit: 'cover', border: '2px solid #fff', background: '#fff' }} />
            ))}
          </div>
        ) : <ItemPhoto size={48} />}
        <div className="col nowrap" style={{ gap: 2 }}>
          <span className="t-body-ms" style={{ color: '#fff' }}>{bor ? '3 barang | Mode Pindahan' : ITEM.name}</span>
          <span className="t-body-s" style={{ color: 'var(--primary-200)' }}>{bor ? 'Estimasi AI' : 'Patokan AI'} {rp(ITEM.aiLow)}–{rp(ITEM.aiHigh)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="abs row" style={{ left: '50%', top: 369, transform: 'translateX(-50%)', gap: 6.5 }}>
        {[
          ['ic-tag-white.svg', `${offers.length} tawaran`],
          ['ic-pin-white.svg', `Radius ${s.radius} km`],
          ...(bor ? [] : [['ic-lock-white.svg', 'Harga Terkunci saat dipilih']]),
          ...(bor ? [['ic-box-white.svg', 'Borongan']] : []),
        ].map(([ic, t]) => (
          <span key={ic} className="row nowrap" style={{ gap: 3.26, padding: '3.26px 8.15px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', color: '#fff', fontWeight: 600, fontSize: 9.78, lineHeight: '13px' }}>
            <Img src={ic} size={11.4} />{t}
          </span>
        ))}
      </div>

      {/* Daftar tawaran */}
      <div className="abs col" style={{ left: 0, top: 404, width: 390, bottom: 102, background: 'var(--canvas)', borderRadius: '28px 28px 0 0', padding: '20px 24px 0', gap: 12 }}>
        <SectionHeader title={bor ? 'Tawaran borongan' : 'Tawaran masuk'} action={bor ? 'Per barang' : offers.length ? 'Urutkan: harga' : '0 Tawaran'} />
        <div className="scroll col" style={{ position: 'relative', gap: 12, flex: 1, padding: '2px 2px 16px', margin: '0 -2px' }}>
          <AnimatePresence initial={false}>
            {offers.length === 0 ? (
              <motion.div key="empty" exit={{ opacity: 0 }} className="col" style={{ alignItems: 'center', gap: 8, padding: '10px 0', color: 'var(--ink-500)', textAlign: 'center' }}>
                {/* Figma: D1 Tidak Ada Pengepul (258:4915) / D1 Perluasan Radius (260:5633) — radar rings */}
                <div style={{ position: 'relative', width: 110, height: 110 }}>
                  {[110, 78, 46].map((sz, i) => (
                    <div key={sz} style={{ position: 'absolute', left: (110 - sz) / 2, top: (110 - sz) / 2, width: sz, height: sz, borderRadius: '50%', border: '1.5px solid var(--line-200)',
                      animation: s.radius === 5 ? `pulse-ring 1.8s ${i * 0.3}s ease-out infinite` : undefined }} />
                  ))}
                  <div style={{ position: 'absolute', left: 47, top: 47, width: 16, height: 16, borderRadius: '50%', background: 'var(--primary-500)', boxShadow: '0 0 0 6px var(--primary-100)' }} />
                </div>
                {s.scenario === 'dispenser' ? (
                  s.radius === 3 ? (
                    <>
                      <span className="t-label-m" style={{ color: 'var(--ink-900)' }}>Belum ada pengepul diradius 3 km</span>
                      <span className="t-body-s">Sesi tetap berjalan. Tawaran akan masuk otomatis jika ada pengepul aktif.</span>
                      <button className="btn btn-primary" style={{ marginTop: 6, boxShadow: 'none' }} onClick={() => d({ type: 'expandRadius' })}>Perluas Radius</button>
                    </>
                  ) : (
                    <>
                      <span className="t-label-m" style={{ color: 'var(--ink-900)' }}>Mencari pengepul sampai 5 km</span>
                      <span className="t-body-s">Pengepul di jarak lebih jauh bisa menambah ongkos jemput. Kamu tetap yang memilih tawaran.</span>
                    </>
                  )
                ) : (
                  <>
                    <span className="t-label-m" style={{ color: 'var(--ink-900)' }}>Menunggu tawaran pertama…</span>
                    <span className="t-body-s">Pengepul terverifikasi di radius 3 km sudah diberi tahu.</span>
                  </>
                )}
              </motion.div>
            ) : (
              offers.map((o, i) => (
                <OfferCard key={o.id} offer={o} top={i === 0} selected={pick === o.id && selected !== null}
                  onClick={() => { d({ type: 'select', id: o.id }); go('tawaran') }} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bottom-bar">
        <button className="btn btn-accent" disabled={!pick} onClick={() => { d({ type: 'select', id: pick }); go('konfirmasi') }}>
          <Img src="ic-gavel-ink.svg" size={20} />Ketuk Palu
        </button>
      </div>
      <StatusBar inverse />
    </div>
  )
}
