import type { ReactNode } from 'react'
import { useStore } from '../../store'
import { A, Img } from '../../ui'
import { openCam } from '../Camera'
import { Page, Card, Note, KV, Check, Btn, C } from '../kit'

/* Pengepul onboarding additions: A1b Konfirmasi Data KTP, A2b/A2d/A2f Pratinjau Foto, A2h Surat Kuasa (Figma 574:8358–574:9084) */

const Field = ({ label, value }: { label: string; value: string }) => (
  <label className="col" style={{ gap: 8 }}>
    <span className="t-body-s" style={{ color: C.ink5 }}>{label}</span>
    <input defaultValue={value} className="t-body-l" style={{ height: 54, padding: '0 16px', borderRadius: 14, border: '1.5px solid ' + C.line, background: '#fff', outline: 0, color: C.ink, fontFamily: 'inherit' }} />
  </label>
)
const Shot = ({ src, h = 200 }: { src: string; h?: number }) => (
  <div style={{ padding: 20, borderRadius: 24, background: '#fff' }}>
    <img src={A(src)} alt="" style={{ width: '100%', height: h, borderRadius: 14, objectFit: 'cover', display: 'block' }} />
  </div>
)
const Cocok = () => <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#eceafe', color: C.indigo }}><Img src="ic-check-indigo14.svg" size={14} />Cocok</span>
const G = 'fi-check-circle-1f8a5b-20.svg'

/** A1b Konfirmasi Data KTP (574:8358) — Gunakan Data Ini → A1c Daftar Mitra · Terisi; Pindai Ulang → A1a */
export function KonfirmasiKtp() {
  const { d, go } = useStore()
  return (
    <Page title="Data dari KTP" bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('mitra-daftar-terisi', { replace: true })}>Gunakan Data Ini</Btn><Btn kind="soft" icon="ic-camera-indigo20.svg" onClick={() => openCam(d, go, 'ktp', true)}>Pindai Ulang</Btn></>}>
      <Shot src="cam-ktp.png" />
      <Note icon="fi-info-1b1760-18.svg">Periksa lagi. Data bisa kamu ubah bila ada yang salah terbaca.</Note>
      <Field label="Nama lengkap (sesuai KTP)" value="Slamet Riyadi" />
      <Field label="NIK" value="3578 •••• •••• 0012" />
      <Field label="Alamat" value="Jl. Rungkut Industri III No. 7" />
    </Page>
  )
}

type Prev = { photo: string; h: number; checks: [string, string?][]; data?: [string, string][]; note?: string; ok: string; key: string; next: () => void; mode: string }

/** Shared layout of A2b / A2d / A2f Pratinjau Foto */
function Pratinjau({ p }: { p: Prev }) {
  const { d, go } = useStore()
  return (
    <Page title="Pratinjau Foto" bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => { d({ type: 'set', v: { [p.key]: true } }); p.next() }}>{p.ok}</Btn><Btn kind="soft" icon="ic-camera-indigo20.svg" onClick={() => openCam(d, go, p.mode, true)}>Ulangi Foto</Btn></>}>
      <Shot src={p.photo} h={p.h} />
      <Card title="Cek kualitas otomatis">{p.checks.map(([t, sub]) => <Check key={t} icon={G} t={t} sub={sub} />)}</Card>
      {p.data && <Card title="Data terbaca" right={<Cocok />}><KV rows={p.data} /></Card>}
      {p.note && <Note icon="fi-info-1b1760-18.svg">{p.note}</Note>}
    </Page>
  )
}

/** A2b Pratinjau Foto Lapak (574:8609) — Gunakan → A2c Foto Kendaraan */
export function PratinjauLapak() {
  const { d, go } = useStore()
  return <Pratinjau p={{ photo: 'cam-gudang.png', h: 200, key: 'docLapak', mode: 'lapak', ok: 'Gunakan & Lanjut Foto Kendaraan', next: () => openCam(d, go, 'kendaraan'),
    checks: [['Cukup terang'], ['Tidak buram'], ['Lokasi cocok dengan alamat lapak', 'Rungkut Industri III | GPS 40 m']], note: 'Tim KETUK tetap akan mensurvei lapak sebelum akun aktif.' }} />
}

/** A2d Pratinjau Foto Kendaraan (574:8748) — Gunakan → A2e Foto STNK */
export function PratinjauKendaraan() {
  const { d, go } = useStore()
  return <Pratinjau p={{ photo: 'cam-truk.png', h: 214, key: 'docKendaraan', mode: 'kendaraan', ok: 'Gunakan & Lanjut Foto STNK', next: () => openCam(d, go, 'stnk'),
    checks: [['Cukup terang'], ['Plat terlihat jelas']], data: [['Jenis', 'Motor roda tiga'], ['Nomor plat', 'L 1234 AB']] }} />
}

/** A2f Pratinjau STNK (574:8900) — Gunakan Foto → A2g Verifikasi · Dokumen Lengkap */
export function PratinjauStnk() {
  const { go } = useStore()
  return <Pratinjau p={{ photo: 'cam-stnk.png', h: 214, key: 'docStnk', mode: 'stnk', ok: 'Gunakan Foto', next: () => go('a2g-lengkap', { root: true }),
    checks: [['Teks terbaca jelas'], ['Tidak ada pantulan cahaya']], data: [['Nama pemilik', 'Slamet Riyadi'], ['Nomor plat', 'L 1234 AB'], ['Berlaku s.d.', '12 / 2028']],
    note: 'Nama & plat di STNK cocok dengan data lapak, surat kuasa tidak diperlukan.' }} />
}

const Paper = () => (
  <div className="col" style={{ width: 150, height: 200, padding: '14px 14px', gap: 8, borderRadius: 8, background: '#fff', border: '1px solid ' + C.line, boxShadow: '0 4px 12px rgba(27,23,96,.06)' }}>
    <span style={{ fontSize: 11, fontWeight: 800, textAlign: 'center', letterSpacing: 0.3 }}>SURAT KUASA</span>
    {[100, 82, 100, 90, 100, 76, 100, 88].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: '#d9d7e6' }} />)}
    <div className="row" style={{ marginTop: 'auto', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div style={{ width: 32, height: 32, background: '#f8d9a4' }} />
      <svg width="54" height="16" viewBox="0 0 54 16" fill="none"><path d="M2 10c6-10 10 6 16-2s8 6 14 0 8-8 12 0 6 4 8 0" stroke="#1b1760" strokeWidth="1.5" strokeLinecap="round" /></svg>
    </div>
  </div>
)

/** A2h Unggah Surat Kuasa (574:9084) — Simpan Dokumen → A2g; Kembali → back */
export function SuratKuasa() {
  const { go, back } = useStore()
  const row = (t: ReactNode) => <Check icon={G} t={t} />
  return (
    <Page title="Surat Kuasa" bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('a2g-lengkap', { root: true })}>Simpan Dokumen</Btn><Btn kind="soft" onClick={back}>Kembali</Btn></>}>
      <Note icon="fi-info-1b1760-18.svg">Wajib hanya bila STNK bukan atas namamu, misalnya kendaraan milik keluarga.</Note>
      <div className="row" style={{ gap: 12, padding: 16, borderRadius: 20, background: '#fff' }}>
        <Img src="fi-list-3d2fd0-22.svg" size={22} />
        <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">Unduh template surat kuasa</span><span className="t-body-s" style={{ color: C.ink5 }}>Isi, tanda tangani, lalu foto atau unggah</span></div>
        <span className="t-label-s" style={{ padding: '4px 10px', borderRadius: 999, background: '#efeef5', color: C.ink7 }}>PDF</span>
      </div>
      <button className="col" style={{ gap: 10, padding: 20, borderRadius: 20, border: '1.5px dashed #c9c6d9', background: 'transparent', alignItems: 'center' }}>
        <Paper />
        <span className="t-body-ms" style={{ color: C.indigo }}>Ketuk untuk foto atau pilih berkas</span>
        <span className="t-body-s" style={{ color: C.ink5 }}>JPG, PNG, atau PDF | maks. 5 MB</span>
      </button>
      <Card title="Syarat surat kuasa">
        {row('Ditandatangani pemilik STNK')}{row('Bermaterai Rp10.000')}{row('Lampirkan foto KTP pemilik STNK')}
      </Card>
    </Page>
  )
}
