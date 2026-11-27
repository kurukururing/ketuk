import { useState } from 'react'
import { useStore } from '../../store'
import { Img, Checkbox } from '../../ui'
import { openCam } from '../Camera'
import { Page, Card, Hero, Tag, Timeline, Note, KV, Check, Btn, useAfter, C } from '../kit'

const lh = 1.4
const Num = ({ n, size = 28 }: { n: number; size?: number }) =>
  <div className="row" style={{ width: size, height: size, borderRadius: 999, background: '#eceafe', justifyContent: 'center', flex: 'none', fontWeight: 700, fontSize: size > 30 ? 15 : 13, color: C.indigo }}>{n}</div>
const Ava = ({ t, size = 44, bg = '#eceafe', color = C.indigo, fs = 15 }: { t: string; size?: number; bg?: string; color?: string; fs?: number }) =>
  <div className="row" style={{ width: size, height: size, borderRadius: 999, background: bg, color, justifyContent: 'center', flex: 'none', fontWeight: 700, fontSize: fs }}>{t}</div>
const Field = ({ label, value, prefix }: { label: string; value: string; prefix?: string }) => (
  <label className="col" style={{ gap: 8 }}>
    <span className="t-body-s" style={{ color: C.ink5 }}>{label}</span>
    <div className="row" style={{ height: 54, gap: 12, padding: '0 16px', borderRadius: 14, border: '1.5px solid ' + C.line, background: '#fff' }}>
      {prefix && <><span className="t-body-ms" style={{ color: 'rgba(21,20,43,.6)' }}>{prefix}</span><div style={{ width: 1.5, height: 22, background: C.line }} /></>}
      <input defaultValue={value} className="t-body-l grow" style={{ border: 0, outline: 0, background: 'transparent', minWidth: 0, color: 'rgba(21,20,43,.6)', fontFamily: 'inherit' }} />
    </div>
  </label>
)

/** Figma: K1 Aktifkan Mode Dibantu Keluarga (571:7943) — Undang Kerabat → K2; Nanti Saja → back */
export function K1Aktifkan() {
  const { go, back } = useStore()
  return (
    <Page title="Mode Dibantu Keluarga" bottom={<><Btn icon="fi-users-ffffff-20.svg" onClick={() => go('k2-undang')}>Undang Kerabat</Btn><Btn kind="soft" onClick={back}>Nanti Saja</Btn></>}>
      <Hero title="Biar anak atau kerabat bantu jual barangmu" sub="Cocok untuk orang tua yang belum terbiasa memotret barang atau membalas chat pengepul."
        tag={<div className="row" style={{ width: 52, height: 52, borderRadius: 16, background: C.amber, justifyContent: 'center' }}><Img src="fi-users-1b1760-26.svg" size={26} /></div>} />
      <Card title="Yang bisa dilakukan kerabat">
        {['Foto & pasang barang atas namamu', 'Chat dengan pengepul', 'Ketuk palu, dengan persetujuanmu'].map(t => <Check key={t} icon="fi-check-circle-3d2fd0-20.svg" t={t} />)}
      </Card>
      <Card title="Yang tetap di tanganmu">
        {['Uang selalu masuk ke dompetmu', 'Kode serah terima muncul di ponselmu', 'Akses bisa dicabut kapan saja'].map(t => <Check key={t} icon="fi-lock-a35a05-20.svg" t={t} />)}
      </Card>
    </Page>
  )
}

/** Figma: K2 Undang Kerabat (571:8032) — Kirim Undangan via WhatsApp → K3 */
export function K2Undang() {
  const { go } = useStore()
  const [rel, setRel] = useState(0)
  const [perm, setPerm] = useState([true, true, true])
  return (
    <Page title="Undang Kerabat" steps={[['Undang', 'Kerabat terima', 'Aktif'], 0]} bottom={<Btn icon="ic-send-white.svg" onClick={() => go('k3-terkirim')}>Kirim Undangan via WhatsApp</Btn>}>
      <Field label="Nama kerabat" value="Dimas Pratama" />
      <Field label="Nomor WhatsApp" value="812-3456-7890" prefix="+62" />
      <Card title="Hubungan">
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {['Anak', 'Cucu', 'Saudara', 'Tetangga'].map((c, i) => <button key={c} className={`chip${rel === i ? ' on' : ''}`} onClick={() => setRel(i)}>{c}</button>)}
        </div>
      </Card>
      <Card title="Hak akses">
        {['Pasang barang atas namaku', 'Chat dengan pengepul', 'Ketuk palu perlu persetujuanku'].map((t, i) => (
          <div key={t} className="row" style={{ gap: 12 }}><Checkbox on={perm[i]} onChange={v => setPerm(p => p.map((x, j) => (j === i ? v : x)))} /><span className="t-body-m grow">{t}</span></div>
        ))}
      </Card>
      <div className="row" style={{ gap: 10, padding: 14, borderRadius: 16, background: '#fff1d6', alignItems: 'flex-start' }}>
        <Img src="fi-lock-a35a05-20.svg" size={18} />
        <span className="grow" style={{ fontSize: 12, fontWeight: 500, lineHeight: lh, color: C.amber7 }}>Uang selalu masuk ke dompetmu. Pengaturan ini tidak bisa diubah kerabat.</span>
      </div>
    </Page>
  )
}

/** Figma: K3 Undangan Terkirim (571:8128) — Selesai → G1 Mode Dibantu; Batalkan → K1 */
export function K3Terkirim() {
  const { go } = useStore()
  return (
    <Page title="Undang Kerabat" steps={[['Undang', 'Kerabat terima', 'Aktif'], 1]}
      bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('dibantu', { root: true })}>Selesai</Btn><Btn kind="soft" onClick={() => go('k1-aktifkan', { replace: true })}>Batalkan Undangan</Btn></>}>
      <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>
        <div className="row" style={{ width: 64, height: 64, borderRadius: 999, background: '#eceafe', justifyContent: 'center' }}><Img src="fi-send-3d2fd0-30.svg" size={30} /></div>
        <span style={{ fontSize: 20, fontWeight: 800, lineHeight: lh }}>Undangan terkirim ke Dimas</span>
        <span style={{ fontSize: 13, lineHeight: lh, color: C.ink5 }}>Dimas cukup membuka tautan di WhatsApp lalu memasukkan kode di bawah.</span>
      </div>
      <div className="col" style={{ gap: 8, padding: 18, borderRadius: 20, background: C.navy, alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.88, color: C.lav }}>KODE UNDANGAN</span>
        <span style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: 1 }}>482 615</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.lav }}>Berlaku 24 jam</span>
      </div>
      <Card title="Status">
        <Timeline steps={[
          ['Undangan dikirim', '27 Nov, 20.10 | via WhatsApp', 'done'],
          ['Dimas memverifikasi nomor', 'Menunggu Dimas membuka tautan', 'current'],
          ['Akses aktif', 'Kamu dapat notifikasi saat terhubung', 'todo'],
        ]} />
      </Card>
    </Page>
  )
}

/** Figma: K4 Kerabat · Undangan Masuk (571:8206) — Terima & Hubungkan → K5; Tolak → Beranda */
export function K4Undangan() {
  const { go } = useStore()
  return (
    <Page title="Undangan Keluarga" bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('k5-bantu')}>Terima & Hubungkan</Btn><Btn kind="soft" onClick={() => go('beranda', { root: true })}>Tolak Undangan</Btn></>}>
      <Hero tag={<Ava t="BR" size={52} bg={C.amber} color={C.navy} fs={18} />} title="Bu Ratna mengundangmu membantu jual barang" sub="Hubungan: Anak | Rungkut Asri Tengah 12" style={{ gap: 10 }} />
      <Card title="Yang bisa kamu lakukan">
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Pasang barang atas nama Bu Ratna" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Chat dengan pengepul" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Ajukan ketuk palu" sub="Harga baru terkunci setelah Bu Ratna menyetujui" />
      </Card>
      <Card title="Aturan">
        <Check icon="fi-lock-a35a05-20.svg" t="Uang masuk ke dompet Bu Ratna, bukan ke kamu" />
        <Check icon="fi-eye-a35a05-20.svg" t="Semua aksimu tercatat & bisa dilihat Bu Ratna" />
      </Card>
      <Field label="Kode undangan" value="482 615" />
    </Page>
  )
}

/** Figma: K5 Kerabat · Bantu Bu Ratna (571:8286) — Pasang barang → B2 Ambil Foto (Buram); Ajukan Ketuk Palu → K6 */
export function K5Bantu() {
  const { d, go } = useStore()
  const pasang = () => { d({ type: 'scenario', scenario: 'kipas' }); openCam(d, go, 'kipas') }
  return (
    <Page title="Bantu Bu Ratna" bottom={<><Btn icon="fi-gavel-ffffff-20.svg" onClick={() => go('k6-menunggu')}>Ajukan Ketuk Palu Rp38.000</Btn><Btn kind="soft" icon="fi-camera-3d2fd0-20.svg" onClick={pasang}>Pasang Barang Baru</Btn></>}>
      <div className="row" style={{ gap: 10, padding: 14, borderRadius: 16, background: '#fff1d6' }}>
        <Ava t="BR" size={36} bg="#fff" color={C.amber7} fs={12} />
        <div className="col grow" style={{ gap: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, lineHeight: lh }}>Kamu bertindak atas nama Bu Ratna</span>
          <span style={{ fontSize: 12, color: C.amber7 }}>Uang masuk ke dompet Bu Ratna</span>
        </div>
        <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#efeef5', color: C.ink7 }}><Img src="ic-refresh-ink.svg" size={14} />Ganti</span>
      </div>
      <button onClick={pasang} className="row" style={{ gap: 14, padding: 18, borderRadius: 20, background: C.navy, textAlign: 'left' }}>
        <div className="row" style={{ width: 48, height: 48, borderRadius: 14, background: C.amber, justifyContent: 'center', flex: 'none' }}><Img src="fi-camera-1b1760-24.svg" size={24} /></div>
        <div className="col grow" style={{ gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Pasang barang untuk Bu Ratna</span>
          <span style={{ fontSize: 12, color: C.lav }}>Foto barang di rumah Bu Ratna</span>
        </div>
      </button>
      <Card title="Sesi berjalan" right={<span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#efeef5', color: C.ink7 }}><Img src="ic-clock-ink14.svg" size={14} />sisa 41:20</span>}>
        <KV rows={[['Barang', 'Kipas angin berdiri'], ['Tawaran', '3 tawaran'], ['Tertinggi', <span style={{ color: C.indigo }}>Rp38.000 | Pak Slamet</span>]]} />
      </Card>
      <Note>Ketuk palu yang kamu ajukan perlu persetujuan Bu Ratna di ponselnya.</Note>
    </Page>
  )
}

/** Figma: K6 Kerabat · Menunggu Persetujuan (571:8372) — after 3 dtk → B2 Ketuk Palu Berhasil */
export function K6Menunggu() {
  const { d, go } = useStore()
  useAfter(3000, () => { d({ type: 'demoState', scenario: 'kipas', phase: 'won' }); go('berhasil', { root: true }) })
  return (
    <Page title="Ketuk Palu" bottom={<Btn kind="soft" icon="ic-call-indigo.svg">Telepon Bu Ratna</Btn>}>
      <Hero tag={<Tag icon="ic-clock-amber14.svg">Menunggu persetujuan</Tag>} title="Bu Ratna sedang meninjau"
        sub="Notifikasi dikirim ke ponsel Bu Ratna. Harga belum terkunci sampai disetujui (maks. 15 menit)." style={{ gap: 6 }} />
      <Card title="Status">
        <Timeline steps={[
          ['Ketuk palu diajukan', 'Kipas angin | Rp38.000 | Pak Slamet', 'done'],
          ['Bu Ratna meninjau', 'Bisa setuju atau tolak', 'current'],
          ['Harga terkunci', 'Pengepul dijadwalkan menjemput', 'todo'],
        ]} />
      </Card>
      <Note>Sesi tetap berjalan. Bila Bu Ratna tidak merespons dalam 15 menit, pengajuan dibatalkan otomatis.</Note>
    </Page>
  )
}

/** Figma: K7 Pemilik · Setujui Ketuk Palu (571:8441) — Setujui → K8; Tolak → Beranda */
export function K7Setujui() {
  const { go } = useStore()
  return (
    <Page title="Persetujuan" bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('k8-disetujui')}>Setujui, Jual Rp38.000</Btn><Btn kind="soft" onClick={() => go('beranda', { root: true })}>Tolak</Btn></>}>
      <span style={{ fontSize: 24, fontWeight: 800, lineHeight: lh }}>Dimas ingin menjual kipas angin Ibu</span>
      <div className="col" style={{ gap: 14, padding: 20, borderRadius: 20, background: '#fff' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: C.ink5 }}>Harga</span>
        <span style={{ fontSize: 40, fontWeight: 800, color: C.indigo, lineHeight: 1.1 }}>Rp38.000</span>
        <div className="row" style={{ gap: 12 }}>
          <Ava t="PS" size={48} fs={16} />
          <div className="col grow" style={{ gap: 2 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Pak Slamet</span>
            <span style={{ fontSize: 13, lineHeight: lh, color: C.ink5 }}>Skor Tepat Harga 97% | Jemput hari ini 16.00</span>
          </div>
        </div>
        <div className="row" style={{ gap: 10, padding: 14, borderRadius: 16, background: '#fff1d6' }}>
          <Img src="fi-lock-a35a05-20.svg" size={18} /><span style={{ fontSize: 12, fontWeight: 500, color: C.amber7 }}>Uang masuk ke dompet Ibu.</span>
        </div>
      </div>
    </Page>
  )
}

/** Figma: K8 Pemilik · Penjualan Disetujui (571:8489) — Lihat Status → E1 Harga Terkunci; Beranda */
export function K8Disetujui() {
  const { d, go } = useStore()
  const steps = ['Siapkan kipas di teras sebelum pukul 16.00', 'Saat Pak Slamet datang, sebutkan kode serah terima yang muncul di ponsel Ibu', 'Uang Rp38.000 otomatis masuk ke dompet Ibu']
  return (
    <Page title="Persetujuan" bottom={<><Btn icon="ic-truck-white.svg" onClick={() => { d({ type: 'demoState', scenario: 'kipas', phase: 'won' }); go('terkunci', { root: true }) }}>Lihat Status Penjemputan</Btn><Btn kind="soft" onClick={() => go('beranda', { root: true })}>Kembali ke Beranda</Btn></>}>
      <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>
        <div className="row" style={{ width: 64, height: 64, borderRadius: 999, background: '#eceafe', justifyContent: 'center' }}><Img src="fi-check-3d2fd0-30.svg" size={30} /></div>
        <span style={{ fontSize: 20, fontWeight: 800, lineHeight: lh }}>Kipas angin terjual Rp38.000</span>
        <span style={{ fontSize: 13, lineHeight: lh, color: C.ink5 }}>Harga sudah terkunci. Dimas akan membantu mengatur penjemputan.</span>
      </div>
      <Card title={<span style={{ fontSize: 16, fontWeight: 700 }}>Yang perlu Ibu lakukan</span>} gap={14}>
        {steps.map((t, i) => <div key={t} className="row" style={{ gap: 12, alignItems: 'flex-start' }}><Num n={i + 1} size={32} /><span className="grow" style={{ fontSize: 16, lineHeight: lh }}>{t}</span></div>)}
      </Card>
    </Page>
  )
}

/** Figma: K9 Akses & Aktivitas Kerabat (571:8544) — Ubah Hak Akses → G1 Mode Dibantu; Cabut → K10 */
export function K9Akses() {
  const { go } = useStore()
  return (
    <Page title="Akses Kerabat" bottom={<><Btn kind="soft" icon="ic-edit-indigo.svg" onClick={() => go('dibantu')}>Ubah Hak Akses</Btn><Btn kind="danger" icon="ic-x-coral.svg" onClick={() => go('k10-dicabut', { replace: true })}>Cabut Akses Dimas</Btn></>}>
      <Card>
        <div className="row" style={{ gap: 12 }}>
          <Ava t="DP" />
          <div className="col grow" style={{ gap: 4 }}><span style={{ fontSize: 15, fontWeight: 700 }}>Dimas Pratama</span><span style={{ fontSize: 12, color: C.ink5 }}>Anak | terhubung sejak 27 Nov</span></div>
          <Tag tone="indigo">Aktif</Tag>
        </div>
      </Card>
      <Card title="Aktivitas terbaru">
        <Timeline steps={[
          ['Memasang kipas angin berdiri', '27 Nov, 14.02', 'done'],
          ['Chat dengan Pak Slamet', '27 Nov, 15.10', 'done'],
          ['Ketuk palu Rp38.000', 'Disetujui Ibu | 27 Nov, 15.21', 'done'],
        ]} />
      </Card>
      <Card title="Hak akses">
        <KV rows={[['Pasang barang', 'Boleh'], ['Chat pengepul', 'Boleh'], ['Ketuk palu', <span style={{ color: C.amber7 }}>Perlu persetujuanmu</span>], ['Tujuan uang', <span style={{ color: C.indigo }}>Selalu ke kamu</span>]]} />
      </Card>
    </Page>
  )
}

/** Figma: K10 Akses Kerabat Dicabut (571:8634) — Kembali ke Akun → G1 Akun Warga */
export function K10Dicabut() {
  const { go } = useStore()
  return (
    <Page title="Akses Kerabat" bottom={<Btn icon="fi-user-ffffff-22.svg" onClick={() => go('akun', { root: true })}>Kembali ke Akun</Btn>}>
      <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>
        <div className="row" style={{ width: 64, height: 64, borderRadius: 999, background: '#fde8e4', justifyContent: 'center' }}><Img src="fi-lock-c2412d-30.svg" size={30} /></div>
        <span style={{ fontSize: 20, fontWeight: 800, lineHeight: lh }}>Akses Dimas dicabut</span>
        <span style={{ fontSize: 13, lineHeight: lh, color: C.ink5 }}>Dimas tidak bisa lagi memasang barang atau chat atas nama Ibu. Sesi yang sedang berjalan tetap milik Ibu.</span>
      </div>
      <Card>
        <Check icon="fi-bell-6b6982-20.svg" t="Dimas mendapat pemberitahuan" />
        <Check icon="fi-history-6b6982-20.svg" t="Riwayat aktivitas tetap tersimpan" />
        <Check icon="fi-users-6b6982-20.svg" t="Bisa mengundang ulang kapan saja" />
      </Card>
    </Page>
  )
}
