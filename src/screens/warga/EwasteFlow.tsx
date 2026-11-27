import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, StatusBar, AppBar, Checkbox } from '../../ui'
import { openCam } from '../Camera'
import { Page, Card, Hero, Tag, Timeline, Note, KV, Check, CodeBox, Btn, Over, useAfter, SessionShell, RadarRings, C } from '../kit'

const STEPS = ['Cek kondisi', 'Tawaran', 'Serah terima', 'Disalurkan']
const lh = 1.4
const battTile = <div className="row" style={{ width: 48, height: 48, borderRadius: 14, background: '#fff1d6', justifyContent: 'center' }}><Img src="fi-battery-a35a05-28.svg" size={28} /></div>
const ITEM = { tile: battTile, name: 'HP Android, layar pecah', sub: 'Patokan AI Rp60.000–Rp95.000' }

/** Figma: B2 Jalur E-waste Aman (557:6579) / C1 Jalur E-waste Aman (557:6675) — Mengerti → I1 Cek Kondisi E-waste */
export function JalurEwaste() {
  const { go } = useStore()
  return (
    <div className="screen fit">
      <AppBar title="Jalur E-waste Aman" trailing={<button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button>} bg="transparent" />
      <div className="scroll" style={{ top: 110, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="col" style={{ gap: 10, padding: 20, borderRadius: 28, background: C.navy }}>
            <img src={A('3d-baterai.png')} alt="" style={{ width: 72, height: 72, borderRadius: 16 }} />
            <span style={{ fontSize: 20, fontWeight: 700, lineHeight: lh, color: '#fff' }}>Khusus elektronik kecil berbaterai</span>
            <span style={{ fontSize: 14, lineHeight: lh, color: C.lav }}>Saat ini jalur E-waste Aman hanya menerima 3 jenis barang di bawah, dan hanya ditawar pengepul berlencana E-waste Aman.</span>
            <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 10, background: 'rgba(255,255,255,.16)', color: '#fff', alignSelf: 'flex-start' }}><Img src="ic-shield-white14.svg" size={14} />8 pengepul E-waste Aman di radius 3 km</span>
          </div>
          <div className="col" style={{ gap: 8 }}>
            <span className="t-body-ms">Diterima (3 jenis)</span>
            <div className="row" style={{ gap: 8 }}>{['HP & tablet', 'Powerbank', 'Baterai lepas'].map(c => <span key={c} className="chip on">{c}</span>)}</div>
          </div>
          <Card title="Belum diterima di jalur ini">
            <Check icon="fi-x-c2412d-20.svg" t="Elektronik besar" sub="TV, kulkas, AC, laptop, PC, mesin cuci" />
            <Check icon="fi-alert-c2412d-20.svg" t="Baterai menggembung, bocor, atau panas" sub="Jangan dikirim. Simpan di tempat sejuk, bawa ke drop point limbah B3." />
          </Card>
          <Note>Dibatasi agar pengepul bisa menangani dengan standar yang sama & aman.</Note>
        </div>
      </div>
      <div className="bottom-bar"><Btn icon="ic-arrow-right-white.svg" onClick={() => go('i1-cek')}>Mengerti, Cek Kondisi Barang</Btn></div>
      <StatusBar />
    </div>
  )
}

/** Figma: I1 Cek Kondisi E-waste (557:6708) — Lanjut Ambil Foto → I1 Foto E-waste (Buram) */
export function CekEwaste() {
  const { d, go } = useStore()
  const [jenis, setJenis] = useState(0)
  const [bat, setBat] = useState([true, true])
  const [data, setData] = useState([true, true, false])
  const [imei, setImei] = useState('')
  const row = (t: string, on: boolean, set: (v: boolean) => void) => (
    <div key={t} className="row" style={{ gap: 12, alignItems: 'flex-start' }}><Checkbox on={on} onChange={set} /><span className="t-body-m grow">{t}</span></div>
  )
  return (
    <Page title="Cek Kondisi E-waste" steps={[STEPS, 0]} bottom={<Btn icon="ic-camera-white.svg" onClick={() => openCam(d, go, 'ewaste')}>Lanjut Ambil Foto</Btn>}>
      <Card title="Jenis barang">
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {['HP & tablet', 'Powerbank', 'Baterai lepas'].map((c, i) => <button key={c} className={`chip${jenis === i ? ' on' : ''}`} onClick={() => setJenis(i)}>{c}</button>)}
        </div>
      </Card>
      <Card title="Keamanan baterai">
        {['Tidak menggembung, bocor, atau terasa panas', 'Tidak ada bekas terbakar / korsleting'].map((t, i) => row(t, bat[i], v => setBat(b => b.map((x, j) => (j === i ? v : x)))))}
      </Card>
      <Card title="Keamanan data" right={<Tag>Wajib untuk HP</Tag>}>
        {['Data dicadangkan & HP sudah reset pabrik', 'Akun Google / iCloud sudah keluar', 'Kartu SIM & memori sudah dilepas'].map((t, i) => row(t, data[i], v => setData(b => b.map((x, j) => (j === i ? v : x)))))}
      </Card>
      <label className="col" style={{ gap: 8 }}>
        <span className="t-body-s" style={{ color: C.ink5 }}>4 digit terakhir IMEI / nomor seri</span>
        <input value={imei} onChange={e => setImei(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="Contoh: 7219" inputMode="numeric" className="t-body-l"
          style={{ height: 54, padding: '0 16px', borderRadius: 14, border: '1.5px solid ' + C.line, background: '#fff', outline: 0, fontFamily: 'inherit', color: C.ink }} />
      </label>
      <span style={{ fontSize: 12, lineHeight: lh, color: C.ink5 }}>Cek IMEI dengan *#06#. Dicocokkan saat serah terima agar barang tidak tertukar.</span>
    </Page>
  )
}

/** Figma: I2 Sesi Ketuk E-waste Radar (557:6980) — after 2,5 dtk → I2 Sesi Ketuk E-waste Tawaran */
export function EwasteRadar() {
  const { go } = useStore()
  useAfter(2500, () => go('i2-tawaran', { replace: true }))
  return (
    <SessionShell title="Sesi Ketuk E-waste" item={ITEM}
      stats={[['ic-tag-white.svg', '0 tawaran'], ['ic-pin-white.svg', 'Radius 3 → 5 km'], ['ic-shield-white14.svg', 'Khusus E-waste Aman']]}
      bottom={<Btn kind="muted" icon="ic-gavel-ink.svg">Ketuk Palu</Btn>}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="t-h3">Tawaran masuk</span><span className="t-label-s" style={{ color: C.indigo }}>0 Tawaran</span>
      </div>
      <div className="col" style={{ gap: 8, alignItems: 'center' }}>
        <RadarRings />
        <span style={{ fontSize: 16, fontWeight: 500, textAlign: 'center' }}>Mencari pengepul E-waste Aman</span>
        <span style={{ fontSize: 12, fontWeight: 500, textAlign: 'center', color: C.ink5 }}>Hanya 2 pengepul berlencana di radius 3 km, jadi pencarian diperluas ke 5 km. Pengepul biasa tidak bisa menawar barang ini.</span>
      </div>
    </SessionShell>
  )
}

const OFFERS: [string, string, string, string, string, boolean][] = [
  ['PS', 'Pak Slamet', '97%', 'Besok 13.00', 'Rp85.000', true],
  ['UB', 'UD Berkah Elektro', '92%', 'Besok 10.00', 'Rp80.000', false],
  ['RJ', 'Rosok Jaya', '88%', 'Lusa 09.00', 'Rp72.000', false],
]

/** Figma: I2 Sesi Ketuk E-waste Tawaran (557:7059) — Pak Slamet → I2 Detail; Ketuk Palu → I2 Konfirmasi */
export function EwasteTawaran({ confirm }: { confirm?: boolean }) {
  const { go, back } = useStore()
  return (
    <>
      <SessionShell title="Sesi Ketuk E-waste" item={ITEM}
        stats={[['ic-tag-white.svg', '3 tawaran'], ['ic-pin-white.svg', 'Radius 5 km'], ['ic-shield-white14.svg', 'Khusus E-waste Aman']]}
        bottom={<Btn kind="accent" icon="ic-gavel-ink.svg" onClick={() => go('i2-konfirmasi')}>Ketuk Palu</Btn>}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="t-h3">Tawaran masuk</span><span className="t-label-s" style={{ color: C.indigo }}>E-waste Aman</span>
        </div>
        <div className="scroll col" style={{ position: 'relative', gap: 12, flex: 1, paddingBottom: 16 }}>
          {OFFERS.map(([ini, nm, sc, when, price, top], i) => (
            <motion.button key={nm} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              onClick={() => i === 0 && go('i2-detail')} className="row" style={{ gap: 12, padding: '16px 14px 16px 16px', borderRadius: 20, background: '#fff', textAlign: 'left', flex: 'none' }}>
              <div className="row t-body-ms" style={{ width: 44, height: 44, borderRadius: 999, background: '#eceafe', color: C.indigo, justifyContent: 'center', flex: 'none' }}>{ini}</div>
              <div className="col grow" style={{ gap: 4 }}>
                <span className="t-body-ms">{nm}</span>
                <div className="row" style={{ gap: 8 }}>
                  <span className="row t-label-s" style={{ gap: 4, padding: '4px 8px', borderRadius: 999, background: '#fff1d6', color: C.amber7 }}><Img src="ic-star-amber.svg" size={14} />{sc}</span>
                  <span className="t-body-s" style={{ color: C.ink5 }}>{when}</span>
                </div>
              </div>
              <div className="col" style={{ gap: 2, alignItems: 'flex-end' }}>
                <span style={{ fontSize: 18, fontWeight: 800 }}>{price}</span>
                <span className="t-label-s" style={{ color: top ? C.amber7 : C.ink5 }}>{top ? 'Tertinggi' : 'Tawaran'}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </SessionShell>
      {confirm && <Confirm onBack={back} onOk={() => go('i2-berhasil', { root: true })} />}
    </>
  )
}

/** Figma: I2 Konfirmasi Ketuk Palu E-waste (557:7264) — sheet over the offers */
function Confirm({ onBack, onOk }: { onBack: () => void; onOk: () => void }) {
  return (
    <>
      <motion.button aria-label="Batal" onClick={onBack} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fix" style={{ inset: 0, background: 'rgba(21,20,43,0.6)', zIndex: 40 }} />
      <motion.div initial={{ y: 480 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="fix col" style={{ left: 0, bottom: 0, width: 390, zIndex: 41, background: '#fff', borderRadius: '28px 28px 0 0', padding: '12px 24px 34px', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: C.line }} />
        <div className="row" style={{ width: 76, height: 76, borderRadius: 999, background: C.amber, justifyContent: 'center', boxShadow: '0 10px 24px -4px rgba(245,166,36,0.35)' }}><Img src="ic-gavel-ink-36.svg" size={36} /></div>
        <span className="t-h2" style={{ textAlign: 'center' }}>Ketuk palu untuk Rp85.000?</span>
        <span className="t-body-ms" style={{ textAlign: 'center' }}>Pak Slamet | jemput besok 13.00 | E-waste Aman</span>
        <div className="row" style={{ width: '100%', gap: 12, padding: 14, alignItems: 'flex-start', borderRadius: 14, background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
          <Img src="ic-lock-indigo.svg" size={22} />
          <div className="col grow" style={{ gap: 2 }}>
            <span className="t-body-ms" style={{ color: C.navy }}>Harga ini terkunci. Koreksi hanya dengan bukti foto.</span>
            <span className="t-body-s" style={{ color: C.ink5 }}>3 tawaran lain otomatis ditutup.</span>
          </div>
        </div>
        <button className="btn btn-accent" onClick={onOk}><Img src="ic-gavel-ink.svg" size={20} />Ketuk Palu</button>
        <button className="btn" style={{ border: '1.5px solid ' + C.line }} onClick={onBack}>Batal</button>
      </motion.div>
    </>
  )
}

/** Figma: I2 Detail Tawaran E-waste (557:7170) — Ketuk Palu Rp85.000 → I2 Konfirmasi */
export function EwasteDetail() {
  const { go } = useStore()
  const review = (ini: string, nm: string, stars: number, t: string) => (
    <div className="row" style={{ gap: 12, padding: 14, borderRadius: 20, background: '#fff', alignItems: 'flex-start' }}>
      <div className="row t-body-ms" style={{ width: 36, height: 36, borderRadius: 999, background: '#fff1d6', color: C.amber7, justifyContent: 'center', flex: 'none' }}>{ini}</div>
      <div className="col grow" style={{ gap: 4 }}>
        <div className="row" style={{ gap: 8 }}><span className="t-body-ms">{nm}</span>
          <div className="row" style={{ gap: 2 }}>{[0, 1, 2, 3, 4].map(i => <Img key={i} src={i < stars ? 'star-sm-fill.svg' : 'star-sm-empty.svg'} size={12} />)}</div></div>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: lh, color: C.ink7 }}>{t}</span>
      </div>
    </div>
  )
  return (
    <div className="screen fit">
      <AppBar ink title="Detail Tawaran" />
      <div className="scroll" style={{ top: 116, bottom: 102 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 14, padding: 16, borderRadius: 20, background: '#fff' }}>
            <div className="row t-body-ms" style={{ width: 60, height: 60, borderRadius: 999, background: '#eceafe', color: C.indigo, justifyContent: 'center', flex: 'none' }}>PS</div>
            <div className="col grow" style={{ gap: 6 }}>
              <span className="t-h3">Pak Slamet</span>
              <span className="t-body-s" style={{ color: C.ink5 }}>Lapak Rungkut | 1,2 km | 128 transaksi | rating 4,9</span>
              <div className="row" style={{ gap: 6 }}>
                <span className="row t-label-s" style={{ gap: 4, padding: '4px 8px', borderRadius: 999, background: '#fff1d6', color: C.amber7 }}><Img src="ic-star-amber.svg" size={14} />97%</span>
                <Tag tone="indigo" icon="fi-shield-3d2fd0-14.svg">E-waste Aman</Tag>
              </div>
            </div>
          </div>
          <div className="row" style={{ gap: 12, padding: 18, borderRadius: 20, background: C.navy, alignItems: 'flex-end' }}>
            <div className="col grow" style={{ gap: 2 }}>
              <span className="t-body-s" style={{ color: C.lav }}>Tawaran untuk HP Android</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>Rp85.000</span>
            </div>
            <div className="col" style={{ gap: 2, alignItems: 'flex-end' }}>
              <span className="t-body-s" style={{ color: C.lav }}>Jemput</span>
              <span className="t-label-m" style={{ color: C.amber }}>Besok 13.00</span>
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Img src="fi-info-3d2fd0-18.svg" size={18} />
            <span className="grow" style={{ fontSize: 12, fontWeight: 500, color: C.ink7 }}>Skor Tepat Harga 97% artinya 124 dari 128 transaksinya selesai tanpa koreksi.</span>
          </div>
          <div className="row" style={{ justifyContent: 'space-between' }}><span className="t-h3">Ulasan warga</span><span className="t-label-s" style={{ color: C.indigo }}>Lihat semua</span></div>
          {review('BS', 'Bu Sri', 5, 'Datang tepat waktu, harga sama persis dengan yang dikunci.')}
          {review('PA', 'Pak Anwar', 4, 'Sempat koreksi karena ada bagian hilang, tapi fotonya jelas dan sopan.')}
        </div>
      </div>
      <div className="bottom-bar"><Btn kind="accent" icon="ic-gavel-ink.svg" onClick={() => go('i2-konfirmasi')}>Ketuk Palu Rp85.000</Btn></div>
      <StatusBar bg="var(--surface)" />
    </div>
  )
}

const RINGS: [string, number, number, number][] = [['berhasil-ring1.svg', -115, -60, 620], ['berhasil-ring2.svg', -35, 20, 460], ['berhasil-ring3.svg', 35, 90, 320], ['berhasil-ring4.svg', 95, 150, 200]]

/** Figma: I2 Ketuk Palu Berhasil E-waste (557:7408) — Lihat Rincian Transaksi → I3 */
export function EwasteBerhasil() {
  const { go } = useStore()
  const rows: [string, string][] = [['Pengepul', 'Pak Slamet | E-waste Aman'], ['Jemput', 'Besok 13.00'], ['Koreksi', 'Hanya dengan bukti foto'], ['Tawaran lain', '3 otomatis ditutup']]
  return (
    <div className="screen" style={{ background: C.navy }}>
      <div className="abs" style={{ inset: 0, transformOrigin: '50% 0', transform: 'translateY(calc(var(--short, 0px) * 0.55)) scale(calc(1 + var(--shortn, 0) / 900))' }}>
        {RINGS.map(([src, l, t, sz]) => <img key={src} src={A(src)} alt="" className="abs" style={{ left: l, top: t, width: sz, height: sz }} />)}
        <motion.img src={A('3d-palu.png')} alt="" className="abs" style={{ left: 53, top: 50, width: 302, height: 302, objectFit: 'cover', transformOrigin: '70% 80%' }}
          initial={{ rotate: -38, y: -30, opacity: 0 }} animate={{ rotate: [-38, 6, 0], y: [-30, 4, 0], opacity: 1 }} transition={{ duration: 0.55, times: [0, 0.65, 1], ease: 'easeIn' }} />
        <div className="abs col" style={{ left: 24, top: 344, width: 342, gap: 10, alignItems: 'center', textAlign: 'center' }}>
          <span className="t-overline" style={{ color: C.amber }}>Tok! Ketuk Palu berhasil</span>
          <span className="t-h1" style={{ color: '#fff', letterSpacing: -0.39 }}>Harga terkunci Rp85.000</span>
          <span className="t-body-l" style={{ color: C.lav }}>Pak Slamet akan menjemput dispenser berdiri hari ini pukul 16.00.</span>
        </div>
        <div className="abs col" style={{ left: 24, top: 500, width: 342, padding: 18, gap: 12, borderRadius: 20, background: 'rgba(255,255,255,0.08)' }}>
          {rows.map(([k, v]) => <div key={k} className="row nowrap" style={{ justifyContent: 'space-between' }}><span className="t-body-m" style={{ color: C.lav }}>{k}</span><span className="t-body-ms" style={{ color: '#fff' }}>{v}</span></div>)}
        </div>
      </div>
      <div className="fix col" style={{ left: 24, bottom: 52, width: 342, gap: 12, alignItems: 'center' }}>
        <button className="btn btn-inverse" onClick={() => go('i3-rincian')}><Img src="ic-truck-indigo900.svg" size={20} />Lihat Rincian Transaksi</button>
        <button className="t-label-m" style={{ color: C.lav }} onClick={() => go('beranda', { root: true })}>Kembali ke Beranda</button>
      </div>
      <StatusBar inverse />
    </div>
  )
}

/** Figma: I3 Rincian Transaksi E-waste (561:6963) — Lihat Jadwal Jemput → I4 Serah Terima E-waste */
export function EwasteRincian() {
  const { go } = useStore()
  return (
    <Page title="Rincian Transaksi" steps={[STEPS, 1]} bottom={<Btn icon="ic-calendar-white.svg" onClick={() => go('i4-serah')}>Lihat Jadwal Jemput</Btn>}>
      <div className="row" style={{ gap: 14, padding: 16, borderRadius: 20, background: '#fff1d6' }}>
        <div className="row" style={{ width: 64, height: 64, borderRadius: 14, background: C.navy, justifyContent: 'center', flex: 'none' }}><Img src="fi-battery-f5a524-30.svg" size={30} /></div>
        <div className="col grow" style={{ gap: 4 }}>
          <Over color={C.amber7}>E-waste Aman</Over>
          <span style={{ fontSize: 16, fontWeight: 700 }}>HP Android, layar pecah</span>
          <span style={{ fontSize: 12, color: C.ink5 }}>Baterai aman | reset pabrik ✓</span>
          <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#efeef5', color: C.ink7, alignSelf: 'flex-start' }}><Img src="fi-shield-3a3950-14.svg" size={14} />IMEI ••7219</span>
        </div>
      </div>
      <Card title={<span style={{ fontSize: 15, fontWeight: 700 }}>Lapak Rungkut</span>} right={<Tag icon="fi-shield-a35a05-14.svg">E-waste Aman</Tag>}>
        <span style={{ fontSize: 12, color: C.ink5, marginTop: -4 }}>Pak Slamet | Motor roda tiga | L 1234 AB</span>
      </Card>
      <Card title="Rincian harga">
        <KV rows={[['Harga terkunci', 'Rp85.000'], ['Penanganan baterai', 'Rp0'], ['Biaya jemput', 'Rp0']]} total={['Kamu terima', 'Rp85.000']} />
        <KV rows={[['Metode', 'Dompet KETUK']]} />
      </Card>
      <Card title="Alur transaksi">
        <Timeline steps={[
          ['Ketuk palu', '27 Nov, 19.02 | harga terkunci', 'done'],
          ['Penjemputan', 'Besok 13.00–16.00', 'current'],
          ['Cek kondisi & cocokkan IMEI', 'Dilakukan bersama di lokasi', 'todo'],
          ['Pembayaran otomatis', 'Setelah kamu beri kode serah terima', 'todo'],
          ['Disalurkan ke pengolah berizin', 'Bisa dilacak di bukti transaksi', 'todo'],
        ]} />
      </Card>
      <Note>Harga hanya bisa berubah lewat Koreksi Berbukti yang kamu setujui.</Note>
    </Page>
  )
}

/** Figma: I4 Serah Terima E-waste (561:7097) and · Koreksi (561:7360) — Konfirmasi & Terima → I5 */
export function EwasteSerah({ koreksi }: { koreksi?: boolean }) {
  const { go } = useStore()
  const price = koreksi ? 'Rp70.000' : 'Rp85.000'
  return (
    <Page title="Serah Terima E-waste" steps={[STEPS, 2]} bottom={<Btn icon="ic-check-white-20.svg" onClick={() => go(koreksi ? 'i5-bukti-k' : 'i5-bukti', { replace: true })}>Konfirmasi & Terima {price}</Btn>}>
      <Card title={<span style={{ fontSize: 15, fontWeight: 700 }}>Pak Slamet</span>} right={<Tag icon="fi-shield-a35a05-14.svg">E-waste Aman</Tag>}>
        <div className="row" style={{ gap: 10, padding: 12, borderRadius: 14, background: '#fff1d6' }}>
          <Img src="fi-truck-a35a05-20.svg" size={20} /><span className="grow" style={{ fontSize: 13, fontWeight: 600, lineHeight: lh }}>Plat L 1234 AB — cocokkan sebelum menyerahkan barang</span>
        </div>
      </Card>
      <Card title="Dicek bersama di lokasi">
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Kondisi sesuai foto" sub="HP Android, layar pecah" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="4 digit IMEI cocok" sub="••7219 = data di aplikasi" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Baterai aman, tidak menggembung" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Dikemas kantong tahan api & disegel" sub="No. segel EW-0931" />
      </Card>
      <Card><KV rows={[['Harga terkunci', price], ['Dibayar ke', 'Dompet KETUK']]} total={['Kamu terima', price]} /></Card>
      <CodeBox code="5318" sub="Berikan kode setelah semua cek di atas sesuai. Dana masuk otomatis ke dompetmu." />
    </Page>
  )
}

/** Figma: I5 Bukti & Lacak E-waste (561:7206) and · Koreksi (561:7466) — Unduh Bukti → F1 Riwayat */
export function EwasteBukti({ koreksi }: { koreksi?: boolean }) {
  const { go } = useStore()
  return (
    <Page title="Bukti & Lacak" steps={[STEPS, 3]} bottom={<Btn kind="soft" onClick={() => !koreksi && go('riwayat', { root: true })}>Unduh Bukti</Btn>}>
      <Hero tag={<Tag icon="ic-check-ink.svg">Pembayaran berhasil</Tag>} title={`${koreksi ? 'Rp70.000' : 'Rp85.000'} masuk ke dompetmu`}
        sub="Kamu bisa memantau barang sampai diterima pengolah e-waste berizin." />
      <Card title="Lacak penyaluran">
        <Timeline steps={[
          ['Dijemput pengepul', '28 Nov, 13.40 | segel EW-0931', 'done'],
          ['Tiba di gudang pengepul', '28 Nov, 15.10 | disimpan di area aman', 'done'],
          ['Diserahkan ke pengolah berizin', 'Estimasi ≤ 7 hari', 'current'],
          ['Sertifikat daur ulang terbit', 'Dikirim ke notifikasi & Riwayat', 'todo'],
        ]} />
      </Card>
      <Card title="Bukti transaksi">
        <KV rows={[['ID transaksi', 'EW-2611-0177'], ['Barang', 'HP Android | ••7219'], ['Pengepul', 'Pak Slamet | L 1234 AB'], ['Status data', 'Reset pabrik ✓']]} />
      </Card>
    </Page>
  )
}

/** Figma: I4 Koreksi Berbukti E-waste (561:7304) — Terima → I4 Serah Terima · Koreksi; Tolak → E1 Transaksi Dibatalkan */
export function EwasteKoreksi() {
  const { go } = useStore()
  return (
    <div className="screen fit" style={{ background: '#fff' }}>
      <AppBar ink title="Koreksi Berbukti" trailing={<button className="icon-btn" onClick={() => go('bantuan')} aria-label="Bantuan"><Img src="ic-help.svg" size={20} /></button>} />
      <div className="scroll" style={{ top: 116, bottom: 166 }}>
        <div className="col" style={{ padding: '0 24px 24px', gap: 12 }}>
          <div className="row" style={{ gap: 12, padding: 14, borderRadius: 20, background: '#fde5e5' }}>
            <div className="row" style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', justifyContent: 'center', flex: 'none' }}><Img src="fi-alert-c4282d-22.svg" size={22} /></div>
            <div className="col grow" style={{ gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#c4282d' }}>Pak Slamet mengajukan koreksi harga</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.ink7 }}>Kamu boleh menolak. Menolak tidak dikenai denda.</span>
            </div>
          </div>
          <div className="row" style={{ gap: 12, padding: 18, borderRadius: 20, background: '#fff', border: '1px solid ' + C.line }}>
            <div className="col grow" style={{ gap: 2 }}><span className="t-body-s" style={{ color: C.ink5 }}>Harga terkunci</span><span style={{ fontSize: 18, fontWeight: 800, color: C.ink5 }}>Rp85.000</span></div>
            <Img src="fi-arrow-right-a9a7ba-20.svg" size={20} />
            <div className="col" style={{ gap: 2, alignItems: 'flex-end' }}>
              <span className="t-body-s" style={{ color: '#c4282d' }}>Usulan koreksi</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#c4282d' }}>Rp70.000</span>
              <Tag tone="coral">-Rp15.000</Tag>
            </div>
          </div>
          <div className="col" style={{ gap: 6, padding: 16, borderRadius: 20, background: '#fff', border: '1px solid ' + C.line }}>
            <Over>Alasan dari pengepul</Over>
            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: lh }}>"Bodi belakang retak & kamera belakang pecah, tidak terlihat di foto awal."</span>
          </div>
          <span className="t-body-ms">Bukti foto</span>
          <img src={A('ew-bukti.jpg')} alt="" style={{ width: 166, height: 118, borderRadius: 14, objectFit: 'cover' }} />
        </div>
      </div>
      <div className="bottom-bar">
        <Btn onClick={() => go('i4-serah-k')}>Terima Koreksi Rp70.000</Btn>
        <Btn kind="danger" icon="ic-x-coral.svg" onClick={() => go('batal')}>Tolak & Batalkan, tanpa denda</Btn>
      </div>
      <StatusBar bg="#fff" />
    </div>
  )
}
