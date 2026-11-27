import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store'
import { A, Img, Checkbox, StatusBar } from '../../ui'
import Navigasi from './Navigasi'
import { Page, Card, Hero, Tag, Timeline, Note, KV, Check, Btn, useAfter, C } from '../kit'

/* Pengepul · Lepas Gratis (F1–F4, Figma 562:7145–562:7874) and E-waste Aman (G1–G5, 563:7492–565:8069) */

const lh = 1.4
const FS: [string[], number] = [['Terima', 'Jemput', 'Cek & timbang', 'Selesai'], 0]
const GS: [string[], number] = [['Tawar', 'Jemput', 'Cek & bayar', 'Salurkan'], 0]
const st = (s: [string[], number], i: number): [string[], number] => [s[0], i]

const Kardus = ({ size = 44, r = 12 }: { size?: number; r?: number }) =>
  <img src={A('photo-kardus.jpg')} alt="" style={{ width: size, height: size, borderRadius: r, objectFit: 'cover', flex: 'none' }} />
const HP = ({ size = 44, r = 12 }: { size?: number; r?: number }) => (
  <div className="row" style={{ width: size, height: size, borderRadius: r, background: '#3a3950', justifyContent: 'center', flex: 'none' }}>
    <img src={A('ph-hp.png')} alt="" style={{ width: Math.round(size * 0.29), height: Math.round(size * 0.55), objectFit: 'cover' }} />
  </div>
)

/** Amber item header card (F1 Permintaan / G1 Ajukan) */
function ItemHead({ tile, over, title, sub, tag }: { tile: ReactNode; over: string; title: string; sub?: string; tag: ReactNode }) {
  return (
    <div className="row" style={{ gap: 14, padding: 16, borderRadius: 20, background: '#fff1d6' }}>
      {tile}
      <div className="col grow" style={{ gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.88, color: C.amber7 }}>{over}</span>
        <span style={{ fontSize: 18, fontWeight: 700, lineHeight: lh }}>{title}</span>
        {sub && <span style={{ fontSize: 12, color: C.ink5 }}>{sub}</span>}
        {tag}
      </div>
    </div>
  )
}
const GreyTag = ({ icon, children }: { icon: string; children: ReactNode }) =>
  <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#efeef5', color: C.ink7, alignSelf: 'flex-start' }}><Img src={icon} size={14} />{children}</span>

/** "Masukkan kode dari warga" — 4 outlined digit boxes */
function KodeInput({ code, hint }: { code: string; hint: string }) {
  return (
    <div className="col" style={{ gap: 14, padding: 16, borderRadius: 20, background: '#fff', alignItems: 'center' }}>
      <span style={{ fontSize: 14, fontWeight: 600 }}>Masukkan kode dari warga</span>
      <div className="row" style={{ gap: 10 }}>
        {code.split('').map((c, i) => (
          <motion.div key={i} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 * i }}
            className="row" style={{ width: 52, height: 60, borderRadius: 12, border: '2px solid ' + C.indigo, background: '#fff', justifyContent: 'center', fontWeight: 800, fontSize: 28 }}>{c}</motion.div>
        ))}
      </div>
      <span style={{ fontSize: 12, color: C.ink5, textAlign: 'center' }}>{hint}</span>
    </div>
  )
}

/** Photo-evidence form shared by F3 Tolak and G3 Ajukan Koreksi */
function BuktiForm({ warn, label, tile, reasons, note, children }: { warn: string; label: string; tile: ReactNode; reasons: string[]; note: string; children?: ReactNode }) {
  const [r, setR] = useState(reasons[0])
  const [t, setT] = useState(note)
  return (<>
    <Note tone="alert" icon="ic-alert-coral20.svg">{warn}</Note>
    <div className="col" style={{ gap: 8 }}>
      <span className="t-body-ms">{label}</span>
      <div className="row" style={{ gap: 10 }}>
        {tile}
        <button className="col" style={{ width: 84, height: 84, borderRadius: 14, border: '1.5px dashed #e5484d', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <Img src="ic-camera-coral20.svg" size={20} /><span className="t-body-s" style={{ color: '#c4282d' }}>Tambah</span>
        </button>
      </div>
    </div>
    <div className="col" style={{ gap: 8 }}>
      <span className="t-body-ms">Alasan</span>
      <div className="row scroll" style={{ position: 'relative', gap: 8, margin: '0 -24px', padding: '0 24px' }}>
        {reasons.map(x => <button key={x} className={`chip${r === x ? ' on' : ''}`} onClick={() => setR(x)}>{x}</button>)}
      </div>
    </div>
    <div className="col" style={{ gap: 6, padding: 14, borderRadius: 16, background: '#fff', border: '1.5px solid ' + C.line }}>
      <textarea value={t} maxLength={200} rows={2} onChange={e => setT(e.target.value)} className="t-body-m" style={{ border: 0, outline: 0, resize: 'none', background: 'transparent', fontFamily: 'inherit' }} />
      <span className="t-body-s" style={{ alignSelf: 'flex-end', color: C.ink5 }}>{t.length}/200</span>
    </div>
    {children}
  </>)
}

/** Amber "Menunggu …" card + timeline + summary (F3 Penolakan Terkirim / G3 Menunggu) */
function Waiting({ title, body, steps, over, tile, name, tag, note, foot }: { title: string; body: string; steps: [string, string][]; over: string; tile: ReactNode; name: string; tag: string; note: string; foot?: ReactNode }) {
  return (<>
    <div className="col" style={{ gap: 10, padding: 20, borderRadius: 24, background: '#fff1d6' }}>
      <div className="row" style={{ gap: 14 }}>
        <img src={A('3d-sesi.png')} alt="" style={{ width: 72, height: 72, objectFit: 'cover' }} />
        <div className="col grow" style={{ gap: 6 }}>
          <span className="t-h2">{title}</span>
          <span className="t-body-m" style={{ color: C.ink7 }}>Respons dalam 29:40</span>
        </div>
      </div>
      <span className="t-body-m" style={{ color: C.ink7 }}>{body}</span>
    </div>
    <Card><Timeline steps={[[steps[0][0], steps[0][1], 'done'], [steps[1][0], steps[1][1], 'current'], [steps[2][0], steps[2][1], 'todo']]} /></Card>
    <Card gap={10}>
      <span className="t-body-ms" style={{ color: C.ink5 }}>{over}</span>
      <div className="row" style={{ gap: 8, alignItems: 'flex-start' }}>
        {tile}
        <div className="col" style={{ gap: 4 }}><span className="t-body-ms">{name}</span><Tag>{tag}</Tag></div>
      </div>
      <span className="t-body-s" style={{ color: C.ink5 }}>{note}</span>
      {foot}
    </Card>
  </>)
}

/** Amber wallet card "… disetujui" + detail rows (F3 Penolakan Disetujui / G3 Koreksi Disetujui) */
function Approved({ title, sub, strike, price, rows }: { title: string; sub: string; strike: string; price: string; rows: [string, string][] }) {
  return (<>
    <motion.div className="col" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      style={{ padding: 20, gap: 10, borderRadius: 24, background: '#fff1d6', alignItems: 'center', textAlign: 'center' }}>
      <motion.img src={A('3d-dompet.png')} alt="" initial={{ y: -10, rotate: -10 }} animate={{ y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 10 }} style={{ width: 72, height: 72 }} />
      <span className="t-h2" style={{ color: C.ink5 }}>{title}</span>
      <span className="t-body-m" style={{ color: C.ink7, marginTop: -6 }}>{sub}</span>
      <span className="t-body-m" style={{ color: C.ink7, textDecoration: 'line-through' }}>{strike}</span>
      <span className="t-num-l" style={{ color: C.indigo, marginTop: -6 }}>{price}</span>
    </motion.div>
    <div className="col" style={{ padding: '4px 16px', borderRadius: 20, background: '#fff' }}>
      {rows.map(([k, v], i) => (
        <div key={k} className="row" style={{ gap: 12, padding: '12px 0', borderBottom: i < rows.length - 1 ? '1px solid #efeef5' : 'none' }}>
          <span className="t-body-m grow" style={{ color: C.ink5 }}>{k}</span><span className="t-body-ms nowrap">{v}</span>
        </div>
      ))}
    </div>
  </>)
}

/** Big indigo check + title (F4 / G4 Selesai) */
const Done = ({ title, sub, card }: { title: string; sub: string; card?: boolean }) => {
  const inner = (<>
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
      className="row" style={{ width: card ? 64 : 96, height: card ? 64 : 96, borderRadius: 999, background: C.indigo, justifyContent: 'center', boxShadow: '0 12px 28px -6px rgba(61,46,209,0.35)' }}>
      <Img src={card ? 'fi-check-ffffff-30.svg' : 'ic-check-white-48.svg'} size={card ? 30 : 48} />
    </motion.div>
    <span className={card ? 't-h2' : 't-h1'} style={{ letterSpacing: card ? 0 : -0.39 }}>{title}</span>
    <span className={card ? 't-body-s' : 't-body-l'} style={{ color: C.ink5 }}>{sub}</span>
  </>)
  return card
    ? <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>{inner}</div>
    : <div className="col" style={{ gap: 8, padding: '0 0 8px', alignItems: 'center', textAlign: 'center' }}>{inner}</div>
}

/** Radio list "Salurkan barang ke jalur" (G4 Selesai) */
function Jalur() {
  const J: [string, string, string, string][] = [
    ['ewaste', 'Pengolah e-waste berizin', 'Wajib untuk HP & baterai | segel EW-0931', 'fi-wrench-3d2fd0-18.svg'],
    ['daur', 'Daur ulang material', 'Dipilah ke pengolah plastik & logam', 'fi-refresh-3a3950-18.svg'],
    ['servis', 'Servis & jual ulang', 'Tidak tersedia di jalur E-waste Aman', 'fi-battery-3a3950-18.svg'],
  ]
  const [on, setOn] = useState('ewaste')
  return (
    <Card title="Salurkan barang ke jalur" gap={10}>
      {J.map(([k, t, sub, ic]) => {
        const sel = on === k
        return (
          <button key={k} onClick={() => k !== 'servis' && setOn(k)} className="row"
            style={{ gap: 12, padding: 12, borderRadius: 16, textAlign: 'left', background: sel ? '#f4f3ff' : '#fff', border: sel ? '2px solid ' + C.indigo : '1px solid ' + C.line }}>
            <div className="row" style={{ width: 36, height: 36, borderRadius: 10, justifyContent: 'center', background: sel ? '#eceafe' : '#efeef5' }}><Img src={ic} size={18} /></div>
            <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{t}</span><span className="t-body-s" style={{ color: C.ink5 }}>{sub}</span></div>
            {sel ? <div className="row" style={{ width: 22, height: 22, borderRadius: 999, background: C.indigo, justifyContent: 'center' }}><Img src="ic-check-white-12.svg" size={12} /></div>
              : <div style={{ width: 22, height: 22, borderRadius: 999, background: '#fff', border: '1.5px solid #a9a7ba' }} />}
          </button>
        )
      })}
    </Card>
  )
}
const Titik = ({ amount }: { amount: string }) => (
  <div className="row" style={{ gap: 12, padding: 14, borderRadius: 20, background: '#fff1d6' }}>
    <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: C.amber, justifyContent: 'center' }}><Img src="ic-truck-ink20.svg" size={20} /></div>
    <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">2 dari 3 titik selesai</span><span className="t-body-s" style={{ color: C.ink7 }}>{amount} dibayar hari ini | 1 titik lagi</span></div>
  </div>
)
const Checks = ({ items }: { items: string[] }) => {
  const [v, setV] = useState(items.map(() => true))
  return <>{items.map((t, i) => <div key={t} className="row" style={{ gap: 12 }}><Checkbox on={v[i]} onChange={x => setV(p => p.map((y, j) => (j === i ? x : y)))} /><span className="t-body-m grow">{t}</span></div>)}</>
}
const Input = ({ label, value, prefix }: { label?: string; value: string; prefix?: string }) => (
  <label className="col" style={{ gap: 8 }}>
    {label && <span className="t-body-s" style={{ color: C.ink5 }}>{label}</span>}
    <div className="row" style={{ height: 54, gap: 12, padding: '0 16px', borderRadius: 14, border: '1.5px solid ' + C.line, background: '#fff' }}>
      {prefix && <><span className="t-body-ms" style={{ color: 'rgba(21,20,43,.6)' }}>{prefix}</span><div style={{ width: 1.5, height: 22, background: C.line }} /></>}
      <input defaultValue={value} className="t-body-l grow" style={{ border: 0, outline: 0, background: 'transparent', minWidth: 0, color: 'rgba(21,20,43,.6)', fontFamily: 'inherit' }} />
    </div>
  </label>
)

/** Screen without app bar (success pages: G1 Terkirim, G4 Selesai) */
const Bare = ({ children, bottom }: { children: ReactNode; bottom: ReactNode }) => (
  <div className="screen fit" style={{ background: C.canvas }}>
    <div className="scroll" style={{ top: 50, bottom: 166 }}><div className="col" style={{ padding: '40px 24px 24px', gap: 12 }}>{children}</div></div>
    <div className="bottom-bar" style={{ borderTop: 0, padding: '12px 24px 32px', gap: 10 }}>{bottom}</div>
    <StatusBar bg={C.canvas} />
  </div>
)

/* ───────────── F · Lepas Gratis ───────────── */

/** F1 Permintaan Lepas Gratis (562:7282) — Terima → F2 Jadwal; Lewati → F1 Radar */
export function F1Permintaan() {
  const { go, back } = useStore()
  return (
    <Page title="Permintaan Lepas Gratis" bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('f2-jadwal')}>Terima Permintaan</Btn><Btn kind="soft" onClick={back}>Lewati</Btn></>}>
      <ItemHead tile={<Kardus size={84} r={14} />} over="LEPAS GRATIS | RP0" title="Kardus bekas 12 kg" tag={<GreyTag icon="ic-clock-ink14.svg">Terverifikasi sistem</GreyTag>} />
      <Card title="Detail permintaan">
        <KV rows={[['Lokasi', 'Rungkut Asri | 1,2 km'], ['Jendela jemput', 'Besok 08.00–11.00'], ['Perkiraan berat', '5–20 kg'], ['Nilai ke warga', <span style={{ color: C.indigo }}>Rp0</span>], ['Batas menerima', <span style={{ color: C.amber7 }}>1 j 42 m lagi</span>]]} />
      </Card>
      <Card title="Ketentuan untukmu">
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Tidak ada pembayaran ke warga & tanpa biaya jemput" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Timbang di depan warga, lalu minta kode serah terima" />
        <Check icon="fi-alert-a35a05-20.svg" t="Boleh menolak di lokasi bila tidak sesuai foto — wajib unggah foto bukti" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Transaksi masuk riwayat & reputasi mitra" />
      </Card>
    </Page>
  )
}

/** F2 Jadwal Jemput Lepas Gratis (562:7369) — Navigasi → F2 Navigasi; Chat Warga → D1 Chat */
export function F2Jadwal() {
  const { go } = useStore()
  return (
    <Page title="Jadwal Jemput" steps={st(FS, 1)} bottom={<><Btn icon="fi-nav-ffffff-20.svg" onClick={() => go('f2-navigasi')}>Navigasi ke Lokasi</Btn><Btn kind="soft" icon="ic-chat-indigo20.svg" onClick={() => go('chat')}>Chat Warga</Btn></>}>
      <Hero tag={<span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: C.amber, color: C.navy, alignSelf: 'flex-start' }}><Img src="ic-check-ink.svg" size={14} />Diterima</span>}
        title="Jemput kardus Bu Ratna" sub="Besok 08.00–11.00 | Lepas gratis, tanpa pembayaran" />
      <Card>
        <div className="row" style={{ gap: 12 }}>
          <div className="row" style={{ width: 44, height: 44, borderRadius: 999, background: '#eceafe', color: C.indigo, fontWeight: 700, justifyContent: 'center' }}>BR</div>
          <div className="col grow"><span className="t-body-ms">Bu Ratna</span><span className="t-body-s" style={{ color: C.ink5 }}>Rungkut Asri Tengah 12 | 1,2 km</span></div>
        </div>
        <KV rows={[['Barang', 'Kardus bekas 12 kg'], ['Perkiraan berat', '5–20 kg'], ['Kendaraanmu', 'Motor roda tiga | L 1234 AB']]} />
      </Card>
      <Note icon="fi-info-1b1760-18.svg">Plat kendaraanmu ditampilkan ke warga. Pastikan datang dengan kendaraan yang terdaftar di STNK.</Note>
    </Page>
  )
}

/** F2 Navigasi Lepas Gratis (562:7445) — Saya Sudah Tiba → F3 Cek & Timbang */
export const F2Navigasi = () => <Navigasi item={{ photo: <Kardus />, name: 'Kardus bekas 12 kg', tag: 'Lepas gratis | Rp0', next: 'f3-cek' }} />

/** F3 Cek & Timbang (562:7526) — Sesuai → F4 Kode; Tolak di Lokasi → F3 Tolak */
export function F3Cek() {
  const { go } = useStore()
  return (
    <Page title="Cek & Timbang" steps={st(FS, 2)} bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('f4-kode')}>Sesuai, Minta Kode Warga</Btn><Btn kind="danger" icon="ic-camera-coral20.svg" onClick={() => go('f3-tolak')}>Tolak di Lokasi (wajib foto bukti)</Btn></>}>
      <span className="t-body-s" style={{ color: C.ink5, marginTop: -4 }}>Bandingkan barang di lokasi dengan foto warga.</span>
      <img src={A('photo-kardus.jpg')} alt="Foto warga" style={{ width: '100%', height: 140, borderRadius: 16, objectFit: 'cover' }} />
      <Card><Checks items={['Kardus kering, tidak bercampur sampah basah', 'Jumlah & kondisi sesuai foto']} /></Card>
      <Input label="Hasil timbang (kg)" value="11,6" />
      <span className="t-body-s" style={{ color: C.ink5, marginTop: -4 }}>Timbang di depan warga. Berat tercatat di bukti serah terima.</span>
    </Page>
  )
}

/** F3 Tolak di Lokasi (562:7596) — Kirim Penolakan → F3 Penolakan Terkirim */
export function F3Tolak() {
  const { go } = useStore()
  return (
    <Page title="Tolak di Lokasi" bottom={<Btn kind="danger" icon="ic-send-coral.svg" onClick={() => go('f3-terkirim', { replace: true })}>Kirim Penolakan ke Warga</Btn>}>
      <BuktiForm warn="Penolakan tanpa bukti menurunkan reputasi mitra. Warga bisa banding ke KETUK." label="Foto bukti (wajib, min. 2)" tile={<Kardus size={84} r={14} />}
        reasons={['Basah / lembap', 'Bercampur sampah', 'Tidak sesuai foto']} note="Kardus bagian bawah basah & berjamur, tidak terlihat di foto awal." />
    </Page>
  )
}

/** F3 Penolakan Terkirim (562:7666) — after 3 dtk → F3 Penolakan Disetujui; Buka chat → D1 Chat */
export function F3Terkirim() {
  const { go } = useStore()
  useAfter(3000, () => go('f3-disetujui', { replace: true }))
  return (
    <Page title="Penolakan Terkirim" bottom={<Btn icon="ic-chat-white.svg" onClick={() => go('chat')}>Buka chat dengan warga</Btn>}>
      <Waiting title="Menunggu Tanggapan Warga" body="Warga melihat foto & alasan penolakanmu. Bila setuju, permintaan ditutup tanpa penalti untukmu."
        steps={[['Penolakan Terkirim', 'Foto bukti & alasan diterima aplikasi'], ['Warga Meninjau', 'Setuju, atau ajukan banding ke KETUK'], ['Keputusan', 'Ditutup, atau ditinjau tim KETUK ≤ 1×24 jam']]}
        over="PENOLAKAN YANG KAMU KIRIM" tile={<Kardus size={54} r={14} />} name="Kardus bekas 12 kg" tag="Basah / lembap" note="Kardus bagian bawah basah & berjamur, tidak terlihat di foto awal." />
    </Page>
  )
}

/** F3 Penolakan Disetujui (562:7748) — Lanjut → D1 Jadwal */
export function F3Disetujui() {
  const { go } = useStore()
  return (
    <Page title="Status Penolakan" bottom={<Btn icon="ic-check-white-20.svg" onClick={() => go('jadwal', { root: true })}>Lanjut ke Titik Berikutnya</Btn>}>
      <Approved title="Penolakan disetujui" sub="Bu Ratna setuju, permintaan ditutup tanpa penalti" strike="Lepas gratis" price="Rp0"
        rows={[['Warga', 'Bu Ratna'], ['Barang', 'Kardus bekas 12 kg'], ['Alasan penolakan', 'Basah / lembap'], ['Status', 'Ditutup']]} />
    </Page>
  )
}

/** F4 Kode Serah Terima (562:7798) — Selesaikan → F4 Lepas Gratis Selesai */
export function F4Kode() {
  const { go } = useStore()
  return (
    <Page title="Kode Serah Terima" steps={st(FS, 2)} bottom={<Btn icon="ic-check-white-20.svg" onClick={() => go('f4-selesai', { replace: true })}>Selesaikan Serah Terima</Btn>}>
      <KodeInput code="4827" hint="Minta warga menyebutkan 4 digit kode dari aplikasinya." />
      <Card title="Rincian transaksi">
        <KV rows={[['Barang', 'Kardus bekas'], ['Berat ditimbang', '11,6 kg'], ['Dibayar ke warga', 'Rp0'], ['Biaya jemput', 'Rp0']]} total={['Total', 'Rp0']} />
      </Card>
      <Note icon="fi-shield-1b1760-18.svg">Kode cocok = serah terima sah. Tanpa kode, transaksi tidak bisa diselesaikan.</Note>
    </Page>
  )
}

/** F4 Lepas Gratis Selesai (562:7874) — Lanjut → D1 Jadwal; Bukti → F1 Bukti */
export function F4Selesai() {
  const { go } = useStore()
  return (
    <Page title="Serah Terima Selesai" steps={st(FS, 4)} bottom={<><Btn icon="ic-arrow-right-white.svg" onClick={() => go('jadwal', { root: true })}>Lanjut ke Titik Berikutnya</Btn><Btn kind="soft" onClick={() => go('bukti')}>Lihat Bukti Transaksi</Btn></>}>
      <Done card title="11,6 kg kardus diterima" sub="Lepas gratis LG-2611-0482 tercatat di riwayat & reputasi mitra." />
      <Card title="Salurkan barang ke jalur">
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Daur ulang material" sub="Dipilah ke pengolah kertas / kardus" />
        <Check icon="fi-tag-6b6982-20.svg" t="Jual ulang" sub="Kardus layak pakai untuk kemasan" />
      </Card>
    </Page>
  )
}

/* ───────────── G · E-waste Aman ───────────── */

/** G1 Ajukan Tawaran E-waste (563:7492) — Kirim → G1 Terkirim */
export function G1Ajukan() {
  const { go } = useStore()
  return (
    <Page title="Ajukan Tawaran" steps={st(GS, 0)} bottom={<Btn icon="ic-send-white.svg" onClick={() => go('g1-terkirim', { replace: true })}>Kirim Tawaran Rp85.000</Btn>}>
      <ItemHead tile={<div className="row" style={{ width: 64, height: 64, borderRadius: 14, background: C.navy, justifyContent: 'center', flex: 'none' }}><Img src="fi-battery-f5a524-30.svg" size={30} /></div>}
        over="E-WASTE AMAN" title="HP Android, layar pecah" sub="Bu Ratna | 1,2 km | 3 foto" tag={<GreyTag icon="ic-clock-ink14.svg">sisa 38:40</GreyTag>} />
      <Card title="Data dari warga">
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Baterai aman" sub="Tidak menggembung, bocor, atau panas" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Data aman" sub="Reset pabrik & akun sudah keluar" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="IMEI ••7219" sub="Dicocokkan saat serah terima" />
      </Card>
      <div className="col" style={{ gap: 12, padding: 16, borderRadius: 20, background: '#eceafe' }}>
        <KV rows={[['Patokan AI', 'Rp60.000–Rp95.000'], ['Tawaran tertinggi saat ini', <span style={{ color: C.amber7 }}>Rp80.000</span>]]} />
      </div>
      <Input label="Tawaranmu" prefix="Rp" value="85.000" />
      <Note tone="warn" icon="fi-shield-a35a05-18.svg">Kamu bisa menawar karena lencana E-waste Aman aktif (s.d. Okt 2027). Pengepul tanpa lencana tidak melihat barang ini.</Note>
    </Page>
  )
}

/** G1 Tawaran Terkirim (563:7593) — Lihat Tawaranku → G2 Persiapan; Kembali → Radar */
export function G1Terkirim() {
  const { go } = useStore()
  const rows: [string, string, boolean][] = [['Tawaranmu', 'Rp85.000', true], ['Pengepul lain', 'Rp80.000', false], ['Pengepul lain', 'Rp72.000', false], ['Pengepul lain', 'Rp60.000', false]]
  return (
    <Bare bottom={<><Btn icon="fi-tag-ffffff-20.svg" onClick={() => go('g2-persiapan', { replace: true })}>Lihat Tawaranku</Btn><Btn kind="outline" icon="fi-radar-15142b-20.svg" onClick={() => go('radar', { root: true })}>Kembali ke Radar</Btn></>}>
      <div className="col" style={{ gap: 8, alignItems: 'center', textAlign: 'center', paddingBottom: 8 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="row" style={{ width: 96, height: 96, borderRadius: 999, background: C.indigo, justifyContent: 'center' }}><Img src="ic-send-white44.svg" size={44} /></motion.div>
        <span className="t-h1" style={{ letterSpacing: -0.39 }}>Tawaran Rp85.000 terkirim</span>
        <span className="t-body-l" style={{ color: C.ink5 }}>Kamu peringkat 1 dari 4 pengepul E-waste Aman. Sesi berakhir dalam 38:40.</span>
      </div>
      <div className="col" style={{ padding: '4px 16px', borderRadius: 20, background: '#fff' }}>
        {rows.map(([n, p, me], i) => (
          <div key={i} className="row" style={{ gap: 12, padding: '14px 0', borderBottom: i < 3 ? '1px solid #efeef5' : 'none' }}>
            <div className="row" style={{ width: 28, height: 28, borderRadius: 999, background: me ? C.amber : '#efeef5', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: me ? C.navy : C.ink5 }}>{i + 1}</div>
            <span className="t-body-m grow" style={{ color: me ? C.indigo : C.ink5, fontWeight: me ? 600 : 400 }}>{n}</span>
            <span className="t-body-ms">{p}</span>
          </div>
        ))}
      </div>
      <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
        <Img src="ic-lock-indigo18.svg" size={18} />
        <span className="t-body-s" style={{ color: C.ink7 }}>Identitas pengepul lain disamarkan. Jika dipilih warga, harga terkunci.</span>
      </div>
    </Bare>
  )
}

/** G2 Persiapan Jemput (563:7651) — Isi Saldo → E1 Pendapatan; Navigasi → G2 Navigasi */
export function G2Persiapan() {
  const { go } = useStore()
  return (
    <Page title="Persiapan Jemput" steps={st(GS, 1)} bottom={<><Btn icon="fi-card-ffffff-20.svg" onClick={() => go('pendapatan')}>Isi Saldo Dompet</Btn><Btn kind="soft" icon="fi-nav-3d2fd0-20.svg" onClick={() => go('g2-navigasi')}>Navigasi ke Lokasi</Btn></>}>
      <Hero tag={<span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: C.amber, color: C.navy, alignSelf: 'flex-start' }}><Img src="fi-gavel-1b1760-14.svg" size={14} />Ketuk palu | harga terkunci</span>}
        title="Rp85.000 — HP Android" sub="Jemput besok 13.00–16.00 di Rungkut Asri Tengah 12" />
      <Card title="Wajib dibawa (standar E-waste Aman)">
        <CheckList items={[['Kantong tahan api', true], ['Segel bernomor (stok: EW-0931 dst.)', true], ['Sarung tangan', true], ['Saldo dompet ≥ Rp85.000', false]]} />
      </Card>
      <Card><KV rows={[['Kendaraan', 'Motor roda tiga | L 1234 AB'], ['Saldo dompet', <span style={{ color: '#c4282d' }}>Rp62.000</span>]]} /></Card>
      <Note tone="warn">Saldo kurang Rp23.000. Isi saldo sebelum berangkat agar pembayaran otomatis berhasil.</Note>
    </Page>
  )
}
function CheckList({ items }: { items: [string, boolean][] }) {
  const [v, setV] = useState(items.map(i => i[1]))
  return <>{items.map(([t], i) => <div key={t} className="row" style={{ gap: 12 }}><Checkbox on={v[i]} onChange={x => setV(p => p.map((y, j) => (j === i ? x : y)))} /><span className="t-body-m grow">{t}</span></div>)}</>
}

/** G2 Navigasi E-waste (563:7745) — Saya Sudah Tiba → G3 Cek E-waste */
export const G2Navigasi = () => <Navigasi item={{ photo: <HP />, name: 'HP Android, layar pecah', tag: 'Rp85.000', next: 'g3-cek' }} />

/** G3 Cek E-waste (563:7826) — Sesuai → G4 Kode & Pembayaran; Ajukan Koreksi → G3 Ajukan Koreksi */
export function G3Cek() {
  const { go } = useStore()
  return (
    <Page title="Cek E-waste" steps={st(GS, 2)} bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('g4-kode')}>Sesuai, Minta Kode Warga</Btn><Btn kind="danger" icon="ic-camera-coral20.svg" onClick={() => go('g3-koreksi')}>Ajukan Koreksi Berbukti</Btn></>}>
      <Card title="Cek bersama warga"><Checks items={['Kondisi sesuai 3 foto warga', 'Baterai tidak menggembung / panas']} /></Card>
      <Input label="4 digit terakhir IMEI (cek *#06#)" value="7219" />
      <div className="row" style={{ gap: 8, marginTop: -4 }}><Img src="fi-check-circle-1f8a5b-18.svg" size={16} /><span className="t-body-s" style={{ color: '#1b7a4b', fontWeight: 600 }}>Cocok dengan data warga (••7219)</span></div>
      <Card title="Kemas & segel">
        <Checks items={['Dimasukkan ke kantong tahan api']} />
        <Input label="Nomor segel" value="EW-0931" />
      </Card>
    </Page>
  )
}

/** G3 Ajukan Koreksi (563:7913) — Kirim → G3 Menunggu */
export function G3Koreksi() {
  const { go } = useStore()
  return (
    <Page title="Ajukan Koreksi" bottom={<Btn kind="danger" icon="ic-send-coral.svg" onClick={() => go('g3-menunggu', { replace: true })}>Kirim Koreksi ke Warga</Btn>}>
      <BuktiForm warn="Koreksi memengaruhi Skor Tepat Harga. Warga boleh menolak tanpa denda." label="Foto bukti (wajib)" tile={<HP size={84} r={14} />}
        reasons={['Bodi & kamera retak', 'Tidak menyala', 'Baterai bermasalah']} note="Bodi belakang retak & kamera belakang pecah, tidak terlihat di foto warga.">
        <Input label="Harga usulan" prefix="Rp" value="70.000" />
        <span className="t-body-s" style={{ color: '#c4282d', marginTop: -4 }}>Turun Rp15.000 dari harga terkunci Rp85.000 | batas maksimal turun 40%</span>
        <span className="t-body-s" style={{ color: C.amber7 }}>Baterai menggembung atau IMEI tidak cocok bukan koreksi harga → transaksi dibatalkan & warga diarahkan ke drop point B3.</span>
      </BuktiForm>
    </Page>
  )
}

/** G3 Menunggu Konfirmasi (563:7991) — after 3 dtk → G3 Koreksi Disetujui */
export function G3Menunggu() {
  const { go } = useStore()
  useAfter(3000, () => go('g3-disetujui', { replace: true }))
  return (
    <Page title="Koreksi Warga" bottom={<Btn icon="ic-chat-white.svg" onClick={() => go('chat')}>Buka chat dengan warga</Btn>}>
      <Waiting title="Menunggu Konfirmasi Warga" body="Warga sedang melihat foto dan alasanmu. Harga tetap Rp85.000 sampai warga menyetujui."
        steps={[['Koreksi Terkirim', 'Foto bukti dan alasan sudah diterima aplikasi'], ['Warga Meninjau', 'Warga bisa setuju atau menolak tanpa denda'], ['Keputusan', 'Harga baru terkunci atau kembali ke Rp85.000']]}
        over="KOREKSI YANG KAMU KIRIM" tile={<HP size={54} r={14} />} name="HP Android, layar pecah" tag="Bodi & kamera retak" note="Bodi belakang retak & kamera belakang pecah, tidak terlihat di foto warga."
        foot={<>
          <div style={{ height: 1, background: C.line }} />
          <div className="row" style={{ gap: 12 }}>
            <div className="col nowrap" style={{ gap: 2, color: C.ink5 }}><span className="t-body-s">Harga terkunci</span><span className="t-num-m" style={{ textDecoration: 'line-through' }}>Rp85.000</span></div>
            <Img src="fi-arrow-right-a9a7ba-20.svg" size={20} />
            <div className="col grow nowrap" style={{ gap: 2, alignItems: 'flex-end', color: '#c4282d' }}><span className="t-body-s">Usulan koreksi</span><span className="t-num-l">Rp70.000</span></div>
          </div>
        </>} />
    </Page>
  )
}

/** G3 Koreksi Disetujui (563:8073) — bayar Rp70.000 → G4 Kode · Koreksi */
export function G3Disetujui() {
  const { go } = useStore()
  return (
    <Page title="Koreksi Warga" bottom={<Btn icon="ic-check-white-20.svg" onClick={() => go('g4-kode-k', { replace: true })}>Barang sesuai, bayar Rp70.000</Btn>}>
      <Approved title="Koreksi disetujui" sub="Bu Ratna menyetujui harga baru" strike="Rp85.000" price="Rp70.000"
        rows={[['Warga', 'Bu Ratna'], ['Barang', 'HP Android, layar pecah'], ['Alasan koreksi', 'Bodi & kamera retak'], ['Jadwal jemput', 'Besok 13.00–16.00']]} />
    </Page>
  )
}

/** G4 Kode & Pembayaran (565:7773 / · Koreksi 565:8001) — Bayar → G4 Selesai */
export function G4Kode({ koreksi = false }: { koreksi?: boolean }) {
  const { go } = useStore()
  const p = koreksi ? 'Rp70.000' : 'Rp85.000'
  return (
    <Page title="Kode & Pembayaran" steps={st(GS, 2)} bottom={<Btn icon="fi-cash-ffffff-20.svg" onClick={() => go(koreksi ? 'g4-selesai-k' : 'g4-selesai', { replace: true })}>Bayar {p}</Btn>}>
      <KodeInput code="5318" hint="Kode benar = pembayaran otomatis ke dompet warga." />
      <Card title="Rincian pembayaran">
        <KV rows={[['Harga terkunci', p], ['Penanganan baterai', 'Rp0'], ['No. segel', 'EW-0931']]} total={['Dibayar dari dompetmu', p]} />
      </Card>
    </Page>
  )
}

/** G4 Selesai (565:7844 / · Koreksi 565:8069) — Salurkan → G5; Bukti → F1 Bukti */
export function G4Selesai({ koreksi = false }: { koreksi?: boolean }) {
  const { go } = useStore()
  return (
    <Bare bottom={<><Btn icon="ic-arrow-right-white.svg" onClick={() => go('g5-salurkan')}>Salurkan ke Pengolah Berizin</Btn><Btn kind="outline" icon="ic-cash-ink.svg" onClick={() => go('bukti')}>Lihat Bukti Transaksi</Btn></>}>
      <div>
        <Done title={`${koreksi ? 'Rp70.000' : 'Rp85.000'} dibayar ke Bu Ratna`} sub={koreksi ? 'Transaksi dengan koreksi berbukti yang disetujui warga.' : 'Transaksi tanpa koreksi. Skor Tepat Harga tetap 97%.'} />
      </div>
      <Jalur />
      <Titik amount={koreksi ? 'Rp135.000' : 'Rp150.000'} />
    </Bare>
  )
}

/** G5 Serahkan ke Pengolah (565:7916) — Kirim Bukti Penyaluran → Radar */
export function G5Salurkan() {
  const { go } = useStore()
  const [p, setP] = useState(0)
  return (
    <Page title="Salurkan E-waste" steps={st(GS, 3)} bottom={<Btn icon="ic-send-white.svg" onClick={() => go('radar', { root: true })}>Kirim Bukti Penyaluran</Btn>}>
      <Card title="Batch di gudang" right={<GreyTag icon="fi-box-3a3950-14.svg">3 segel</GreyTag>}>
        <div className="col" style={{ gap: 10 }}>
          {[['EW-0931', 'HP Android'], ['EW-0928', 'Powerbank'], ['EW-0925', 'Baterai lepas ×4']].map(([k, v]) => (
            <div key={k} className="row" style={{ justifyContent: 'space-between' }}><span className="t-body-s" style={{ color: C.ink5 }}>{k}</span><span className="t-body-m">{v}</span></div>
          ))}
        </div>
      </Card>
      <Card title="Mitra pengolah berizin">
        <div className="col" style={{ gap: 8, alignItems: 'flex-start' }}>
          {['Pengolah A — Sidoarjo', 'Pengolah B — Gresik'].map((x, i) => <button key={x} className={`chip${p === i ? ' on' : ''}`} onClick={() => setP(i)}>{x}</button>)}
        </div>
      </Card>
      <button className="col" style={{ gap: 6, padding: 20, borderRadius: 20, border: '1.5px dashed #c9c6d9', background: 'transparent', alignItems: 'center' }}>
        <Img src="fi-camera-3d2fd0-24.svg" size={24} />
        <span className="t-body-ms">Foto berita acara / manifest</span>
        <span className="t-body-s" style={{ color: C.ink5 }}>Wajib | nomor segel harus terlihat</span>
      </button>
      <Note>Setelah diunggah, status di aplikasi warga berubah jadi "Diserahkan ke pengolah berizin". Lencana tetap aktif bila penyaluran ≤ 7 hari.</Note>
    </Page>
  )
}

