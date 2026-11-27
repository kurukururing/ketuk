import { useState } from 'react'
import { useStore } from '../../store'
import { A, Img, Checkbox } from '../../ui'
import { openCam } from '../Camera'
import { Page, Steps, Card, Hero, Tag, Timeline, Note, KV, Check, CodeBox, Btn, Over, useAfter, SessionShell, RadarRings, C } from '../kit'

const STEPS = ['Ajukan', 'Verifikasi', 'Dijemput', 'Selesai']
const lh = 1.4

/** Figma: D3 Lepas Gratis + Jemput (555:6146) — Ajukan Lepas Gratis → H1 Cek Kondisi Barang */
export function LepasGratis() {
  const { go } = useStore()
  const [slot, setSlot] = useState(0)
  const steps = ['Kamu cek kondisi barang & setujui syarat lepas gratis', 'KETUK verifikasi foto & kategori, lalu tawarkan ke pengepul terdekat (maks. 2 jam)',
    'Pengepul menimbang di depanmu, kamu berikan kode serah terima', 'Bukti serah terima Rp0 tersimpan di Riwayat']
  return (
    <Page title="Lepas Gratis + Jemput" bottom={<Btn icon="ic-gift-white.svg" onClick={() => go('h1-cek')}>Ajukan Lepas Gratis</Btn>}>
      <div className="row" style={{ gap: 14, padding: 18, borderRadius: 28, background: '#fff1d6' }}>
        <img src={A('photo-kardus.jpg')} alt="" style={{ width: 84, height: 84, borderRadius: 14, objectFit: 'cover' }} />
        <div className="col grow" style={{ gap: 6 }}>
          <Over color={C.amber7}>Barangmu</Over>
          <span className="t-h3">Kardus bekas 12 kg</span>
          <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#efeef5', color: C.ink7, alignSelf: 'flex-start' }}><Img src="ic-clock-ink14.svg" size={14} />Sesi berakhir tanpa tawaran</span>
        </div>
      </div>
      <Steps labels={STEPS} active={0} />
      <Card title="Bagaimana alurnya?">
        {steps.map((t, i) => (
          <div key={t} className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <div className="row" style={{ width: 28, height: 28, borderRadius: 999, background: '#eceafe', justifyContent: 'center', flex: 'none', fontWeight: 700, fontSize: 13, color: C.indigo }}>{i + 1}</div>
            <span className="t-body-m grow">{t}</span>
          </div>
        ))}
      </Card>
      <div className="row" style={{ gap: 12, padding: 16, borderRadius: 20, background: C.navy }}>
        <div className="col" style={{ gap: 2, width: 114, flex: 'none' }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: C.lav }}>Total biaya untukmu</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: C.amber }}>Rp0</span>
        </div>
        <span className="grow" style={{ fontSize: 12, fontWeight: 500, lineHeight: lh, color: '#fff' }}>Tanpa biaya jemput, tanpa potongan. Barang diserahkan sukarela.</span>
      </div>
      <div className="col" style={{ gap: 8 }}>
        <span className="t-body-ms">Jendela jemput</span>
        <div className="row" style={{ gap: 8 }}>
          {['Besok 08–11', 'Besok 13–16'].map((c, i) => <button key={c} className={`chip${slot === i ? ' on' : ''}`} onClick={() => setSlot(i)}>{c}</button>)}
        </div>
      </div>
    </Page>
  )
}

/** Figma: H1 Cek Kondisi Barang (555:6224) — Lanjut Ambil Foto → H1 Foto Kondisi Barang (Buram) */
export function CekKondisi() {
  const { d, go } = useStore()
  const reqs = ['Foto sesuai kondisi terbaru (diambil ≤ 24 jam)', 'Kering, bersih & tidak bercampur sampah basah', 'Bukan barang berbahaya (baterai, gas, cairan kimia)', 'Siap diambil di teras / depan rumah']
  const [ok, setOk] = useState([true, true, true, true])
  const [berat, setBerat] = useState(1)
  const [setuju, setSetuju] = useState(true)
  return (
    <Page title="Cek Kondisi Barang" steps={[STEPS, 0]}
      bottom={<Btn icon="ic-camera-white.svg" disabled={!setuju || ok.includes(false)} onClick={() => openCam(d, go, 'lepas')}>Lanjut Ambil Foto</Btn>}>
      <div className="col" style={{ gap: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 700, lineHeight: lh }}>Pastikan barangmu siap dijemput</span>
        <span style={{ fontSize: 13, lineHeight: lh, color: C.ink5 }}>Syarat ini dicek ulang pengepul saat penjemputan. Barang yang tidak sesuai bisa ditolak di lokasi.</span>
      </div>
      <Card title="Syarat barang lepas gratis">
        {reqs.map((r, i) => (
          <div key={r} className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <Checkbox on={ok[i]} onChange={v => setOk(o => o.map((x, j) => (j === i ? v : x)))} />
            <span className="t-body-m grow">{r}</span>
          </div>
        ))}
      </Card>
      <Card title="Perkiraan berat">
        <div className="row" style={{ gap: 8 }}>
          {['< 5 kg', '5–20 kg', '> 20 kg'].map((c, i) => <button key={c} className={`chip${berat === i ? ' on' : ''}`} onClick={() => setBerat(i)}>{c}</button>)}
        </div>
        <span style={{ fontSize: 12, lineHeight: lh, color: C.ink5 }}>Berat pasti ditimbang pengepul di depanmu & tercatat di bukti.</span>
      </Card>
      <div className="row" style={{ gap: 12, padding: 16, borderRadius: 20, background: '#fff1d6', alignItems: 'flex-start' }}>
        <Checkbox on={setuju} onChange={setSetuju} />
        <span className="grow" style={{ fontSize: 13, lineHeight: lh }}>Saya menyerahkan barang secara sukarela dengan nilai Rp0 dan tidak menuntut pembayaran setelah serah terima.</span>
      </div>
    </Page>
  )
}

/** Figma: H2 Mencari Pengepul 3 km (555:6455) / H2 Perluasan Radius 5 km (555:6540) — auto-advance 2,5 dtk */
export function MencariPengepul({ wide }: { wide?: boolean }) {
  const { s, go } = useStore()
  useAfter(2500, () => go(wide ? (s.v.lgTolak ? 'h2-menerima-x' : 'h2-menerima') : 'h2-perluasan', { replace: true }))
  return (
    <SessionShell title="Lepas Gratis" ringLabel="jam tersisa"
      item={{ img: 'photo-kardus.jpg', name: 'Kardus bekas 12 kg', sub: 'Lepas gratis | Rp0, tanpa ongkir' }}
      stats={[['ic-tag-white.svg', wide ? '14 pengepul' : '6 pengepul'], ['ic-pin-white.svg', wide ? 'Radius 5 km' : 'Radius 3 km'], ['ic-lock-white.svg', 'Rp0 | tanpa ongkir']]}
      bottom={<Btn kind="soft" onClick={() => go('beranda', { root: true })}>Batalkan Permintaan</Btn>}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="t-h3">Pengepul menerima</span>
        <span className="t-label-s" style={{ color: C.indigo }}>0 menerima</span>
      </div>
      <div className="col" style={{ gap: 8, alignItems: 'center' }}>
        <RadarRings />
        <span style={{ fontSize: 16, fontWeight: 500, textAlign: 'center' }}>{wide ? 'Diperluas, mencari sampai 5 km' : 'Mencari pengepul dalam 3 km'}</span>
        <span style={{ fontSize: 12, fontWeight: 500, textAlign: 'center', color: C.ink5 }}>
          {wide ? 'Belum ada pengepul dalam 3 km. Tetap gratis untukmu — tidak ada tambahan ongkos jemput.' : 'Permintaan dikirim ke 6 pengepul terverifikasi. Pengepul pertama yang menerima akan menjemput.'}
        </span>
      </div>
    </SessionShell>
  )
}

/** Figma: H2 Pengepul Menerima (555:6623 / varian 556:6612) — after 4 dtk → H3 Pengepul Mengecek Barang */
export function PengepulMenerima({ tolak }: { tolak?: boolean }) {
  const { go } = useStore()
  useAfter(4000, () => go(tolak ? 'h3-mengecek-x' : 'h3-mengecek', { replace: true }))
  return (
    <Page title="Pengepul Menerima" steps={[STEPS, 2]} bottom={<Btn icon="ic-chat-white20.svg" onClick={() => go('chat')}>Chat Pengepul</Btn>}>
      <Hero tag={<Tag icon="ic-check-amber14.svg">Diterima</Tag>} title="Pak Slamet menerima permintaanmu"
        sub="Dijemput besok 08.00–11.00 dengan Motor roda tiga, plat L 1234 AB." extra={'ID permintaan  LG-2611-0482'} />
      <Card title="Proses verifikasi">
        <Timeline steps={[
          ['Permintaan terkirim', '27 Nov, 18.50', 'done'],
          ['Verifikasi sistem', 'Foto valid | kategori Kardus | tidak berbahaya', 'done'],
          ['Pengepul menerima', 'Diterima Pak Slamet | radius 5 km, 1,2 km dari rumahmu', 'done'],
          ['Jadwal jemput dikonfirmasi', 'Besok, 08.00–11.00', 'current'],
          ['Serah terima & bukti Rp0', 'Timbang + kode serah terima', 'todo'],
        ]} />
      </Card>
      <Note>Cocokkan plat L 1234 AB saat penjemputan. Pembatalan sekarang tetap gratis, tapi beri kabar lewat chat.</Note>
    </Page>
  )
}

/** Figma: H3 Pengepul Mengecek Barang (556:6342 / varian 556:6680) — after 3 dtk → Serah Terima / Hasil Cek Tidak Sesuai */
export function PengepulMengecek({ tolak }: { tolak?: boolean }) {
  const { go } = useStore()
  useAfter(3000, () => go(tolak ? 'h3-hasil' : 'h3-serah', { replace: true }))
  return <CekShell state="checking" bottom={<Btn kind="soft" icon="ic-chat-indigo20.svg" onClick={() => go('chat')}>Chat Pengepul</Btn>} />
}

function CekShell({ state, bottom }: { state: 'checking' | 'fail'; bottom: React.ReactNode }) {
  const fail = state === 'fail'
  return (
    <Page title="Serah Terima" steps={[STEPS, 2]} bottom={bottom}>
      <Hero tag={fail ? <Tag tone="coral" icon="ic-alert-coral14.svg">Hasil cek masuk</Tag> : <Tag icon="fi-truck-a35a05-14.svg">Pengepul sudah tiba</Tag>}
        title={fail ? 'Pak Slamet selesai mengecek barangmu' : 'Pak Slamet sedang mengecek barangmu'}
        sub={fail ? 'Ada bagian yang tidak sesuai dengan foto. Lihat detail di bawah.' : 'Tetap di dekat barang. Hasil cek muncul otomatis di layar ini.'} />
      <Card title="Hasil cek pengepul">
        <Timeline steps={[
          ['Plat kendaraan cocok', 'L 1234 AB', 'done'],
          ['Kondisi dibandingkan dengan foto', fail ? 'Kardus bagian bawah basah & berjamur' : 'Sedang dicek…', fail ? 'fail' : 'current'],
          ['Ditimbang', fail ? 'Dihentikan' : 'Menunggu', 'todo'],
        ]} />
      </Card>
    </Page>
  )
}

/** Figma: H3 Serah Terima Lepas Gratis (556:6423) — Konfirmasi Serah Terima → H4 Bukti */
export function SerahLepas() {
  const { go } = useStore()
  return (
    <Page title="Serah Terima" steps={[STEPS, 2]} bottom={<Btn icon="ic-check-white-20.svg" onClick={() => go('h4-bukti', { replace: true })}>Konfirmasi Serah Terima</Btn>}>
      <Card>
        <div className="row" style={{ gap: 12 }}>
          <div className="row" style={{ width: 44, height: 44, borderRadius: 999, background: '#eceafe', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: C.indigo }}>PS</div>
          <div className="col" style={{ gap: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Pak Slamet</span>
            <span style={{ fontSize: 12, color: C.ink5 }}>Lapak Rungkut | 1,2 km dari rumahmu</span>
          </div>
        </div>
        <div className="row" style={{ gap: 10, padding: 12, borderRadius: 14, background: '#fff1d6', alignItems: 'flex-start' }}>
          <Img src="fi-truck-a35a05-20.svg" size={20} />
          <div className="col grow" style={{ gap: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Motor roda tiga | Plat L 1234 AB</span>
            <span style={{ fontSize: 12, color: C.amber7 }}>Cocokkan plat sebelum menyerahkan barang</span>
          </div>
        </div>
      </Card>
      <Card title="Dicek bersama di lokasi">
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Kondisi sesuai foto" sub="Kardus kering, tidak basah" />
        <Check icon="fi-check-circle-3d2fd0-20.svg" t="Ditimbang di depanmu" sub="Hasil timbang 11,6 kg" />
      </Card>
      <Card title="Rincian transaksi">
        <KV rows={[['Barang', 'Kardus bekas'], ['Berat ditimbang', '11,6 kg'], ['Nilai barang', 'Rp0'], ['Biaya jemput', 'Rp0']]} total={['Total', 'Rp0']} />
      </Card>
      <CodeBox code="4827" sub="Sebutkan kode ke pengepul hanya setelah kamu setuju dengan hasil cek & timbang." />
    </Page>
  )
}

/** Figma: H4 Bukti Lepas Gratis (556:6527) — Beri Ulasan → E1 Selesai & Ulasan; Lihat di Riwayat → F1 */
export function BuktiLepas() {
  const { go } = useStore()
  return (
    <Page title="Bukti Serah Terima" steps={[STEPS, 4]}
      bottom={<><Btn icon="ic-star-white.svg" onClick={() => go('selesai')}>Beri Ulasan Pengepul</Btn><Btn kind="soft" onClick={() => go('riwayat', { root: true })}>Lihat di Riwayat</Btn></>}>
      <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>
        <div className="row" style={{ width: 64, height: 64, borderRadius: 999, background: '#eceafe', justifyContent: 'center' }}><Img src="fi-check-circle-3d2fd0-32.svg" size={32} /></div>
        <span style={{ fontSize: 20, fontWeight: 800, lineHeight: lh }}>Barang berhasil disalurkan</span>
        <span style={{ fontSize: 13, lineHeight: lh, color: C.ink5 }}>11,6 kg kardus masuk jalur daur ulang, bukan TPA. Terima kasih!</span>
      </div>
      <Card title="Ringkasan transaksi" right={<Tag tone="indigo" icon="ic-check-indigo14.svg">Selesai</Tag>}>
        <KV rows={[['ID transaksi', 'LG-2611-0482'], ['Waktu', '28 Nov 2026, 09.14'], ['Pengepul', 'Pak Slamet | L 1234 AB'], ['Barang', 'Kardus bekas 11,6 kg'], ['Kode serah terima', 'Terverifikasi']]} total={['Nilai transaksi', 'Rp0']} />
      </Card>
      <Note>Bukti tersimpan di Riwayat Transaksi. Ada masalah? Laporkan maksimal 1×24 jam.</Note>
    </Page>
  )
}

/** Figma: H3 Hasil Cek Tidak Sesuai (556:6759) — Lihat Alasan & Foto Bukti → H3 Barang Ditolak */
export function HasilTidakSesuai() {
  const { go } = useStore()
  return <CekShell state="fail" bottom={<Btn kind="soft" icon="fi-eye-3d2fd0-20.svg" onClick={() => go('h3-ditolak')}>Lihat Alasan & Foto Bukti</Btn>} />
}

/** Figma: H3 Barang Ditolak (556:6838) — Setuju → Beranda; Ajukan Banding → H3 Banding Diajukan */
export function BarangDitolak() {
  const { go } = useStore()
  return (
    <Page title="Barang Ditolak" bg="#fff"
      bottom={<><Btn onClick={() => go('beranda', { root: true })}>Setuju, Tutup Permintaan</Btn><Btn kind="danger" icon="ic-x-coral.svg" onClick={() => go('h3-banding')}>Ajukan Banding ke KETUK</Btn></>}>
      <div className="row" style={{ gap: 12, padding: 14, borderRadius: 20, background: '#fde5e5' }}>
        <div className="row" style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', justifyContent: 'center', flex: 'none' }}><Img src="fi-alert-c4282d-22.svg" size={22} /></div>
        <div className="col grow" style={{ gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#c4282d' }}>Pak Slamet menolak barang di lokasi</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: C.ink7 }}>Kamu bisa setuju atau ajukan banding ke KETUK. Tanpa denda.</span>
        </div>
      </div>
      <div className="col" style={{ gap: 6, padding: 16, borderRadius: 20, background: '#fff' }}>
        <Over>Alasan: basah / lembap</Over>
        <span style={{ fontSize: 16, fontWeight: 500, lineHeight: lh }}>"Kardus bagian bawah basah & berjamur, tidak terlihat di foto awal."</span>
      </div>
      <div className="col" style={{ gap: 8 }}>
        <span className="t-body-ms">Bukti foto</span>
        <img src={A('cam-kardus.png')} alt="" style={{ width: 166, height: 118, borderRadius: 14, objectFit: 'cover' }} />
      </div>
    </Page>
  )
}

/** Figma: H3 Banding Diajukan (556:6895) — Pilah & Ajukan Ulang → H1 Foto Kondisi Barang (Buram) */
export function BandingDiajukan() {
  const { d, go } = useStore()
  return (
    <Page title="Banding Diajukan" bottom={<Btn icon="ic-refresh-white.svg" onClick={() => openCam(d, go, 'lepas')}>Pilah & Ajukan Ulang</Btn>}>
      <div className="col" style={{ gap: 10, padding: 20, borderRadius: 28, background: '#fff1d6' }}>
        <div className="row" style={{ gap: 14 }}>
          <img src={A('3d-sesi.png')} alt="" style={{ width: 72, height: 72 }} />
          <div className="col grow" style={{ gap: 6 }}>
            <span className="t-h2">Banding sedang ditinjau</span>
            <span style={{ fontSize: 14, color: C.ink7 }}>Maks. 1×24 jam</span>
          </div>
        </div>
        <span style={{ fontSize: 14, lineHeight: lh, color: C.ink7 }}>Tim KETUK membandingkan foto awalmu dengan foto bukti pengepul. Sambil menunggu, kamu bisa memilah barang.</span>
      </div>
      <Card>
        <Timeline steps={[
          ['Banding Terkirim', 'Foto awal & catatanmu diterima', 'done'],
          ['Tim KETUK Meninjau', 'Membandingkan foto warga & pengepul', 'current'],
          ['Keputusan', 'Dijadwalkan ulang, atau permintaan ditutup', 'todo'],
        ]} />
      </Card>
      <div className="col" style={{ gap: 12, padding: 18, borderRadius: 20, background: '#fff' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.ink5 }}>PENOLAKAN DARI PENGEPUL</span>
        <div className="row" style={{ gap: 8 }}>
          <img src={A('cam-kardus.png')} alt="" style={{ width: 54, height: 54, borderRadius: 14, objectFit: 'cover' }} />
          <div className="col" style={{ gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>Kardus bekas 12 kg</span>
            <Tag>Basah / lembap</Tag>
          </div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: lh, color: C.ink5 }}>Kardus bagian bawah basah & berjamur, tidak terlihat di foto awal.</span>
      </div>
    </Page>
  )
}
