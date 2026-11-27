import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useStore, ITEM, rp, mmss } from '../../store'
import { Img } from '../../ui'
import { Page, Card, Hero, Timeline, Note, KV, Btn, useAfter, C } from '../kit'

/* Pengepul payments D1a–D1f (Figma 576:8640–576:9064) and Saldo KETUK E2–E2f (581:8822–581:9345) */

const lh = 1.4
const PS: [string[], number] = [['Metode', 'Transfer', 'Dicek', 'Selesai'], 0]
const st = (i: number): [string[], number] => [PS[0], i]
const SALDO = 512000

function usePrice() { const { s } = useStore(); return s.finalPrice ?? 38000 }
/** Pay & finish: same as the old direct "bayar" step */
function usePaid() {
  const { d, go } = useStore()
  return () => { d({ type: 'complete' }); go('bayar', { root: true }) }
}

const Ava = ({ t, bg = '#eceafe', color = C.indigo, size = 44 }: { t: string; bg?: string; color?: string; size?: number }) =>
  <div className="row" style={{ width: size, height: size, borderRadius: 999, background: bg, color, justifyContent: 'center', fontWeight: 700, fontSize: 14, flex: 'none' }}>{t}</div>
const Radio = ({ on }: { on: boolean }) => on
  ? <div className="row" style={{ width: 22, height: 22, borderRadius: 999, background: C.indigo, justifyContent: 'center', flex: 'none' }}><div style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }} /></div>
  : <div style={{ width: 22, height: 22, borderRadius: 999, border: '1.5px solid #a9a7ba', background: '#fff', flex: 'none' }} />
function Option({ icon, t, sub, on, onClick }: { icon: string; t: string; sub: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="row" style={{ gap: 12, padding: 14, borderRadius: 16, textAlign: 'left', background: on ? '#f4f3ff' : '#fff', border: on ? '2px solid ' + C.indigo : '1.5px solid ' + C.line }}>
      <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: on ? C.indigo : '#eceafe', justifyContent: 'center', flex: 'none' }}><Img src={on ? icon.replace('3d2fd0', 'ffffff') : icon} size={20} /></div>
      <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{t}</span><span className="t-body-s" style={{ color: C.ink5 }}>{sub}</span></div>
      <Radio on={on} />
    </button>
  )
}
const Chips = ({ items, init = 0 }: { items: string[]; init?: number }) => {
  const [on, setOn] = useState(init)
  return <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>{items.map((x, i) => <button key={x} className={`chip${on === i ? ' on' : ''}`} onClick={() => setOn(i)}>{x}</button>)}</div>
}
const AmberTag = ({ icon, children }: { icon: string; children: ReactNode }) =>
  <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#fff1d6', color: C.amber7, alignSelf: 'flex-start' }}><Img src={icon} size={14} />{children}</span>

/** Navy VA number card */
function VaCard({ no, name }: { no: string; name: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="col" style={{ gap: 8, padding: 20, borderRadius: 20, background: C.navy }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: C.lav }}>NOMOR VIRTUAL ACCOUNT BCA</span>
      <div className="row" style={{ gap: 10 }}>
        <span className="nowrap" style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 0.3 }}>{no}</span>
        <button onClick={() => { navigator.clipboard?.writeText(no.replace(/\s/g, '')).catch(() => {}); setCopied(true) }}
          className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#fff1d6', color: C.amber7 }}>
          <Img src="fi-list-a35a05-26.svg" size={14} />{copied ? 'Tersalin' : 'Salin'}
        </button>
      </div>
      <span className="t-body-s" style={{ color: C.lav }}>Atas nama: {name}</span>
    </div>
  )
}
const Steps4 = ({ title, items }: { title: string; items: string[] }) => (
  <Card title={title}>
    {items.map((t, i) => (
      <div key={t} className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
        <div className="row" style={{ width: 24, height: 24, borderRadius: 999, background: '#eceafe', color: C.indigo, fontSize: 12, fontWeight: 700, justifyContent: 'center', flex: 'none' }}>{i + 1}</div>
        <span className="t-body-m grow">{t}</span>
      </div>
    ))}
  </Card>
)
function useCountdown(start: number, onEnd?: () => void) {
  const [t, setT] = useState(start)
  useEffect(() => { const id = setInterval(() => setT(x => Math.max(0, x - 1)), 1000); return () => clearInterval(id) }, [])
  useEffect(() => { if (t === 0) onEnd?.() }, [t]) // eslint-disable-line react-hooks/exhaustive-deps
  return t
}
const Timer = ({ t, until }: { t: number; until: string }) => (
  <div className="row" style={{ gap: 10, padding: 14, borderRadius: 16, background: '#fff1d6' }}>
    <Img src="fi-clock-a35a05-18.svg" size={18} />
    <span style={{ fontSize: 12, fontWeight: 500, color: C.amber7, fontVariantNumeric: 'tabular-nums' }}>Selesaikan dalam {mmss(t)} | berlaku s.d. {until}</span>
  </div>
)

/** PIN confirmation screen (D1b / E2e): fills the PIN by itself, then continues after 2.5 s */
function PinScreen({ title, to, amount, from, after, right, hint, next }: { title: string; to: ReactNode; amount: string; from: string; after: string; right: string; hint: string; next: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => { const id = setInterval(() => setN(x => Math.min(6, x + 1)), 380); return () => clearInterval(id) }, [])
  useAfter(2500, next)
  const keys: [string, string][] = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ']]
  return (
    <Page title={title}>
      <div className="col" style={{ gap: 14, padding: 20, borderRadius: 24, background: C.navy }}>
        {to}
        <span style={{ fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{amount}</span>
        <div className="row" style={{ gap: 10, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,.1)' }}>
          <Img src="fi-wallet-d6d2fd-18.svg" size={18} />
          <div className="col grow" style={{ gap: 2 }}><span style={{ fontSize: 11, color: C.lav }}>Saldo KETUK</span><span className="nowrap" style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{from} → {after}</span></div>
          <span style={{ fontSize: 11, color: C.lav }}>{right}</span>
        </div>
      </div>
      <div className="col" style={{ gap: 10, padding: 16, borderRadius: 20, background: '#fff', alignItems: 'center' }}>
        <span className="t-h3">Masukkan PIN KETUK</span>
        <span className="t-body-s" style={{ color: C.ink5 }}>{hint}</span>
        <div className="row" style={{ gap: 8 }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="row" style={{ width: 42, height: 48, borderRadius: 12, justifyContent: 'center', background: i < n ? '#eceafe' : '#f6f5fb', border: i === n ? '2px solid ' + C.indigo : '1px solid ' + C.line }}>
              {i < n ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 12, height: 12, borderRadius: 999, background: C.indigo }} /> : i === n ? <div style={{ width: 2, height: 20, background: C.indigo }} /> : null}
            </div>
          ))}
        </div>
        <span className="row t-body-s" style={{ gap: 4, color: '#1b7a4b' }}><Img src="fi-lock-1f8a5b-14.svg" size={14} />PIN terenkripsi · tidak dibagikan ke warga</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {keys.map(([k, l]) => (
          <button key={k} onClick={() => setN(x => Math.min(6, x + 1))} className="col" style={{ height: 50, borderRadius: 12, background: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.1 }}>{k}</span>{l && <span style={{ fontSize: 9, color: C.ink5 }}>{l}</span>}
          </button>
        ))}
        <button className="col" style={{ height: 50, alignItems: 'center', justifyContent: 'center', gap: 2 }}><Img src="fi-shield-3d2fd0-22.svg" size={22} /><span style={{ fontSize: 10, color: C.indigo }}>Sidik jari</span></button>
        <button onClick={() => setN(x => Math.min(6, x + 1))} className="row" style={{ height: 50, borderRadius: 12, background: '#fff', justifyContent: 'center', fontSize: 22, fontWeight: 600 }}>0</button>
        <button onClick={() => setN(x => Math.max(0, x - 1))} className="row" style={{ height: 50, justifyContent: 'center' }} aria-label="Hapus"><Img src="fi-x-15142b-22.svg" size={22} /></button>
      </div>
      <span className="t-label-m" style={{ color: C.indigo, textAlign: 'center' }}>Lupa PIN?</span>
    </Page>
  )
}
const PayTo = ({ name }: { name: string }) => (
  <div className="row" style={{ gap: 12 }}>
    <Ava t="BR" bg="rgba(255,255,255,.12)" color="#fff" />
    <div className="col grow"><span style={{ fontSize: 12, color: C.lav }}>Bayar ke</span><span style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: lh }}>{name}</span></div>
    <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,.14)', color: '#fff' }}><Img src="fi-shield-ffffff-14.svg" size={14} />Aman</span>
  </div>
)

/* ───────────── D1 · Pembayaran ───────────── */

/** D1a Pilih Metode Pembayaran (576:8640) — Saldo → D1b; Tunai → Pembayaran Selesai; Lanjut → D1c VA */
export function PilihMetode() {
  const { go } = useStore()
  const price = usePrice()
  const paid = usePaid()
  return (
    <Page title="Pembayaran" steps={st(0)} bottom={<Btn icon="ic-arrow-right-white.svg" onClick={() => go('d1c-va')}>Lanjut Bayar {rp(price)}</Btn>}>
      <Card>
        <div className="row" style={{ gap: 12 }}>
          <Ava t="BR" />
          <div className="col grow"><span className="t-body-ms">{ITEM.warga}</span><span className="t-body-s" style={{ color: C.ink5 }}>{ITEM.name} | ketuk palu 15.21</span></div>
        </div>
        <KV rows={[['Harga terkunci', rp(price)], ['Biaya layanan', 'Rp0']]} total={['Total dibayar', rp(price)]} />
      </Card>
      <Note icon="fi-wallet-1b1760-18.svg">Uang diteruskan ke Dompet KETUK {ITEM.warga}, sesuai pilihan warga.</Note>
      <Card title="Bayar dengan" gap={10}>
        <Option icon="fi-wallet-3d2fd0-20.svg" t="Saldo KETUK" sub={`Saldo ${rp(SALDO)} | langsung terkirim`} on={false} onClick={() => go('d1b-pin')} />
        <Option icon="fi-cash-3d2fd0-20.svg" t="Transfer bank (Virtual Account)" sub="BCA, BRI, Mandiri, BNI | dicek otomatis" on onClick={() => go('d1c-va')} />
        <Option icon="fi-house-3d2fd0-20.svg" t="Tunai" sub="Warga konfirmasi uang diterima di aplikasi" on={false} onClick={paid} />
      </Card>
    </Page>
  )
}

/** D1b Konfirmasi PIN Saldo (576:8736) — after 2.5 dtk → D1 Pembayaran Selesai */
export function PinSaldo() {
  const price = usePrice()
  const paid = usePaid()
  return <PinScreen title="Konfirmasi Pembayaran" to={<PayTo name={`${ITEM.warga} · Dompet KETUK`} />} amount={rp(price)} from={rp(SALDO)} after={rp(SALDO - price)}
    right={ITEM.name.split(' ').slice(0, 2).join(' ')} hint="6 digit PIN untuk mengonfirmasi pembayaran" next={paid} />
}

/** D1c Transfer VA (576:8796) — countdown ends → D1f; Saya Sudah Transfer → D1d; Ganti Metode → back */
export function TransferVa() {
  const { go, back } = useStore()
  const price = usePrice()
  const t = useCountdown(14 * 60 + 52, () => go('d1f-kedaluwarsa', { replace: true }))
  return (
    <Page title="Transfer Bank" steps={st(1)} bottom={<><Btn icon="ic-check-white-20.svg" onClick={() => go('d1d-cek', { replace: true })}>Saya Sudah Transfer</Btn><Btn kind="soft" onClick={back}>Ganti Metode</Btn></>}>
      <Card title="Pilih bank"><Chips items={['BCA', 'BRI', 'Mandiri', 'BNI']} /></Card>
      <VaCard no="3901 0812 3456 7890" name={`KETUK - ${ITEM.warga}`} />
      <Card gap={8}>
        <div className="row" style={{ justifyContent: 'space-between' }}><span className="t-body-ms">Total transfer</span><span style={{ fontSize: 18, fontWeight: 800, color: C.indigo }}>{rp(price)}</span></div>
        <span className="t-body-s" style={{ color: C.ink5 }}>Nominal harus sama persis agar terdeteksi otomatis.</span>
      </Card>
      <Timer t={t} until="16.18" />
      <Steps4 title="Cara bayar lewat m-banking BCA" items={['Buka m-BCA, pilih m-Transfer → BCA Virtual Account', 'Masukkan nomor VA di atas', `Pastikan nama tujuan "KETUK - ${ITEM.warga}" dan nominal ${rp(price)}`, 'Masukkan PIN, lalu simpan bukti transfer']} />
    </Page>
  )
}

/** D1d Mengecek Transfer (576:8905) — after 3 dtk → D1e; Hubungi Bantuan → Bantuan */
export function CekTransfer() {
  const { go } = useStore()
  const price = usePrice()
  useAfter(3000, () => go('d1e-berhasil', { replace: true }))
  return (
    <Page title="Transfer Bank" steps={st(2)} bottom={<Btn kind="soft" icon="fi-help-3d2fd0-20.svg" onClick={() => go('bantuan')}>Hubungi Bantuan</Btn>}>
      <Hero tag={<AmberTag icon="ic-clock-amber14.svg">Sedang dicek</AmberTag>} title="Mengecek transfermu" sub={`Biasanya kurang dari 1 menit. Tetap di lokasi sampai ${ITEM.warga} menerima notifikasi.`} />
      <Card title="Status pembayaran">
        <Timeline steps={[['Transfer dari BCA terdeteksi', '27 Nov, 16.04', 'done'], ['Dicocokkan dengan VA & nominal', `${rp(price)} | 3901 •••• 7890`, 'current'], [`Diteruskan ke Dompet KETUK ${ITEM.warga}`, `${ITEM.warga} menerima notifikasi`, 'todo']]} />
      </Card>
      <Note icon="fi-info-1b1760-18.svg">Belum terdeteksi setelah 10 menit? Hubungi Pusat Bantuan dengan bukti transfer.</Note>
    </Page>
  )
}

/** D1e Transfer Berhasil (576:8987) — Lanjut, Salurkan Barang → D1 Pembayaran Selesai */
export function TransferBerhasil() {
  const price = usePrice()
  const paid = usePaid()
  return (
    <Page title="Pembayaran Berhasil" steps={st(4)} bottom={<><Btn icon="ic-arrow-right-white.svg" onClick={paid}>Lanjut, Salurkan Barang</Btn><Btn kind="soft">Unduh Bukti Transfer</Btn></>}>
      <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="row" style={{ width: 64, height: 64, borderRadius: 999, background: C.indigo, justifyContent: 'center' }}><Img src="fi-check-ffffff-30.svg" size={30} /></motion.div>
        <span className="t-h2">{rp(price)} diterima {ITEM.warga}</span>
        <span className="t-body-s" style={{ color: C.ink5 }}>Transaksi tanpa koreksi. Skor Tepat Harga tetap 97%.</span>
      </div>
      <Card title="Bukti pembayaran">
        <KV rows={[['ID transaksi', 'TRX-2711-3821'], ['Metode', 'Transfer BCA (VA)'], ['No. VA', '3901 •••• 7890'], ['Waktu', '27 Nov 2026, 16.04'], ['Penerima', `${ITEM.warga} | Dompet KETUK`]]} total={['Total', rp(price)]} />
      </Card>
      <Note icon="fi-bell-1b1760-18.svg">{ITEM.warga} sudah menerima notifikasi uang masuk.</Note>
    </Page>
  )
}

/** D1f Transfer Kedaluwarsa (576:9064) — Buat VA Baru → D1c; Bayar dengan Saldo → D1b */
export function TransferKedaluwarsa() {
  const { go } = useStore()
  return (
    <Page title="Transfer Bank" bottom={<><Btn icon="ic-refresh-white.svg" onClick={() => go('d1c-va', { replace: true })}>Buat VA Baru</Btn><Btn kind="soft" icon="fi-wallet-3d2fd0-20.svg" onClick={() => go('d1b-pin', { replace: true })}>Bayar dengan Saldo KETUK</Btn></>}>
      <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>
        <div className="row" style={{ width: 64, height: 64, borderRadius: 999, background: '#fde8e4', justifyContent: 'center' }}><Img src="fi-alert-c2412d-30.svg" size={30} /></div>
        <span className="t-h2">Waktu transfer habis</span>
        <span className="t-body-s" style={{ color: C.ink5 }}>VA 3901 •••• 7890 sudah tidak berlaku. Jangan transfer ke nomor ini lagi.</span>
      </div>
      <Card title="Sudah terlanjur transfer?"><span className="t-body-m" style={{ color: C.ink5 }}>Dana otomatis dikembalikan ke rekeningmu maks. 1×24 jam. Simpan bukti transfer untuk Pusat Bantuan.</span></Card>
      <Note tone="warn" icon="fi-info-a35a05-18.svg">Barang belum boleh dibawa sebelum pembayaran berhasil.</Note>
    </Page>
  )
}

/* ───────────── E2 · Saldo KETUK ───────────── */

const backToSaldo = (go: ReturnType<typeof useStore>['go']) => { go('profil', { root: true }); go('e2-saldo') }

/** E2 Saldo KETUK (581:8822) — Isi → E2a; Tarik → E2d; "Bayar ke Bu Ratna" → D1e */
export function Saldo() {
  const { go } = useStore()
  const [hide, setHide] = useState(false)
  const mut: [string, string, string, string, string, string, string][] = [
    ['fi-arrow-right-3d2fd0-18.svg', '#eceafe', 'Bayar ke Bu Ratna', 'Kipas angin · 27 Nov, 15.24', '-Rp38.000', C.ink, 'd1e-berhasil'],
    ['fi-cash-1f8a5b-18.svg', '#e3f6ec', 'Isi saldo · BCA VA', '27 Nov, 08.10', '+Rp300.000', '#1b7a4b', ''],
    ['fi-box-1f8a5b-18.svg', '#e3f6ec', 'Setor ke Bank Sampah Rungkut', 'Kardus & logam 32 kg · 26 Nov', '+Rp146.000', '#1b7a4b', ''],
    ['fi-arrow-right-3d2fd0-18.svg', '#eceafe', 'Bayar ke Pak Hadi', 'Kulkas 2 pintu · 26 Nov', '-Rp120.000', C.ink, ''],
  ]
  return (
    <Page title="Saldo KETUK">
      <div className="col" style={{ gap: 6, padding: 20, borderRadius: 24, background: C.navy }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="t-body-s" style={{ color: C.lav }}>Saldo tersedia</span>
          <button onClick={() => setHide(h => !h)} aria-label="Sembunyikan saldo"><Img src="fi-eye-d6d2fd-18.svg" size={18} /></button>
        </div>
        <span style={{ fontSize: 34, fontWeight: 800, color: '#fff' }}>{hide ? 'Rp•••••••' : rp(SALDO)}</span>
        <span className="t-body-s" style={{ color: C.lav }}>Dana tertahan Rp0 | Batas saldo Rp10.000.000</span>
        <div className="row" style={{ gap: 10, marginTop: 8 }}>
          {([['fi-cash-3d2fd0-18.svg', 'Isi Saldo', 'e2a-isi'], ['fi-wallet-3d2fd0-18.svg', 'Tarik', 'e2d-tarik'], ['fi-history-3d2fd0-18.svg', 'Riwayat', '']] as const).map(([ic, t, to]) => (
            <button key={t} onClick={() => to && go(to)} className="col grow" style={{ flexBasis: 0, gap: 8, padding: '12px 0', borderRadius: 14, background: 'rgba(255,255,255,.1)', alignItems: 'center' }}>
              <div className="row" style={{ width: 36, height: 36, borderRadius: 999, background: '#fff', justifyContent: 'center' }}><Img src={ic} size={18} /></div>
              <span className="t-label-s" style={{ color: '#fff' }}>{t}</span>
            </button>
          ))}
        </div>
      </div>
      <Card>
        <div className="row" style={{ gap: 12 }}>
          <div className="row" style={{ width: 40, height: 40, borderRadius: 12, background: '#eceafe', color: C.indigo, fontSize: 11, fontWeight: 800, justifyContent: 'center' }}>BCA</div>
          <div className="col grow"><span className="t-body-s" style={{ color: C.ink5 }}>Rekening penarikan</span><span className="t-body-ms">BCA •••• 4521 · Slamet Riyadi</span></div>
          <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: '#eceafe', color: C.indigo }}><Img src="ic-check-indigo14.svg" size={14} />Terverifikasi</span>
        </div>
      </Card>
      <Note icon="fi-info-1b1760-18.svg">Pakai saldo untuk bayar warga tanpa transfer tiap transaksi. Saldo hanya untuk transaksi di KETUK.</Note>
      <Card title="Mutasi terbaru" right={<span className="t-label-s" style={{ color: C.indigo }}>Lihat semua</span>} gap={0}>
        {mut.map(([ic, bg, t, sub, amt, col, to], i) => (
          <button key={t} onClick={() => to && go(to)} className="row" style={{ gap: 12, padding: '12px 0', textAlign: 'left', borderBottom: i < mut.length - 1 ? '1px solid #efeef5' : 'none' }}>
            <div className="row" style={{ width: 36, height: 36, borderRadius: 10, background: bg, justifyContent: 'center', flex: 'none' }}><Img src={ic} size={18} /></div>
            <div className="col grow" style={{ gap: 2 }}><span className="t-body-ms">{t}</span><span className="t-body-s" style={{ color: C.ink5 }}>{sub}</span></div>
            <span className="t-body-ms nowrap" style={{ color: col }}>{amt}</span>
          </button>
        ))}
      </Card>
    </Page>
  )
}

const Amount = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="col" style={{ gap: 10, padding: 16, borderRadius: 20, background: '#fff' }}>
    <span className="t-body-s" style={{ color: C.ink5 }}>{label}</span>
    <div className="row" style={{ gap: 8, paddingBottom: 10, borderBottom: '2px solid ' + C.indigo, alignItems: 'baseline' }}>
      <span style={{ fontSize: 20, color: C.ink5 }}>Rp</span><span style={{ fontSize: 32, fontWeight: 800 }}>{value}</span>
    </div>
    <span className="t-body-s" style={{ color: C.ink5 }}>{sub}</span>
  </div>
)

/** E2a Isi Saldo (581:8934) — Lanjut → E2b VA */
export function IsiSaldo() {
  const { go } = useStore()
  return (
    <Page title="Isi Saldo" bottom={<Btn icon="ic-arrow-right-white.svg" onClick={() => go('e2b-va')}>Lanjut</Btn>}>
      <Amount label="Mau isi berapa?" value="300.000" sub="Saldo sekarang Rp512.000 → jadi Rp812.000" />
      <Chips items={['Rp100.000', 'Rp200.000', 'Rp300.000', 'Rp500.000']} init={2} />
      <Card title="Isi lewat" gap={10}>
        <Option icon="fi-cash-3d2fd0-20.svg" t="Transfer bank (Virtual Account)" sub="BCA, BRI, Mandiri, BNI | gratis" on onClick={() => {}} />
        <Option icon="fi-house-3d2fd0-20.svg" t="Setor tunai di minimarket" sub="Alfamart / Indomaret | biaya Rp2.500" on={false} onClick={() => {}} />
      </Card>
      <Card><KV rows={[['Nominal isi', 'Rp300.000'], ['Biaya', 'Rp0']]} total={['Total bayar', 'Rp300.000']} /></Card>
    </Page>
  )
}

/** E2b Isi Saldo · VA (581:9021) — Saya Sudah Transfer → E2c */
export function IsiVa() {
  const { go } = useStore()
  const t = useCountdown(23 * 60 + 41)
  return (
    <Page title="Isi Saldo" bottom={<Btn icon="ic-check-white-20.svg" onClick={() => go('e2c-berhasil', { replace: true })}>Saya Sudah Transfer</Btn>}>
      <Card title="Pilih bank"><Chips items={['BCA', 'BRI', 'Mandiri', 'BNI']} /></Card>
      <VaCard no="3901 0855 1234 0021" name="KETUK - Pak Slamet" />
      <Card gap={8}>
        <div className="row" style={{ justifyContent: 'space-between' }}><span className="t-body-ms">Total transfer</span><span style={{ fontSize: 18, fontWeight: 800, color: C.indigo }}>Rp300.000</span></div>
        <span className="t-body-s" style={{ color: C.ink5 }}>Saldo masuk otomatis setelah transfer terdeteksi.</span>
      </Card>
      <Timer t={t} until="09.10" />
      <Steps4 title="Cara isi lewat m-banking BCA" items={['Buka m-BCA → m-Transfer → BCA Virtual Account', 'Masukkan nomor VA di atas', 'Cek nama "KETUK - Pak Slamet" dan nominal Rp300.000', 'Masukkan PIN m-BCA']} />
    </Page>
  )
}

/** E2c Saldo Bertambah (581:9110) — Kembali ke Saldo → E2 */
export function IsiBerhasil() {
  const { go } = useStore()
  return (
    <Page title="Isi Saldo" bottom={<Btn icon="fi-wallet-ffffff-20.svg" onClick={() => backToSaldo(go)}>Kembali ke Saldo</Btn>}>
      <div className="col" style={{ gap: 8, padding: 20, borderRadius: 24, background: '#fff', alignItems: 'center', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="row" style={{ width: 64, height: 64, borderRadius: 999, background: C.indigo, justifyContent: 'center' }}><Img src="fi-check-ffffff-30.svg" size={30} /></motion.div>
        <span className="t-h2">Saldo bertambah Rp300.000</span>
        <span className="t-body-s" style={{ color: C.ink5 }}>Transfer BCA terdeteksi 08.10. Saldo siap dipakai untuk bayar warga.</span>
      </div>
      <Card><KV rows={[['ID transaksi', 'TOP-2711-0912'], ['Metode', 'BCA Virtual Account'], ['Saldo sebelumnya', 'Rp512.000']]} total={['Saldo sekarang', 'Rp812.000']} /></Card>
    </Page>
  )
}

/** E2d Tarik Saldo (581:9160) — Tarik Rp400.000 → E2e PIN */
export function TarikSaldo() {
  const { go } = useStore()
  return (
    <Page title="Tarik Saldo" bottom={<Btn icon="ic-arrow-right-white.svg" onClick={() => go('e2e-pin')}>Tarik Rp400.000</Btn>}>
      <Amount label="Mau tarik berapa?" value="400.000" sub="Maks. Rp512.000 | min. Rp50.000" />
      <Chips items={['Rp100.000', 'Rp400.000', 'Semua saldo']} init={1} />
      <Card title="Tarik ke"><Option icon="fi-wallet-3d2fd0-20.svg" t="BCA •••• 4521" sub="Slamet Riyadi | rekening terverifikasi" on onClick={() => {}} /></Card>
      <Card>
        <KV rows={[['Nominal tarik', 'Rp400.000'], ['Biaya', 'Rp0']]} total={['Masuk rekening', 'Rp400.000']} />
        <div className="row" style={{ justifyContent: 'space-between' }}><span style={{ fontSize: 13, color: C.ink5 }}>Sisa saldo</span><span className="t-body-ms">Rp112.000</span></div>
      </Card>
      <Note tone="warn" icon="fi-info-a35a05-18.svg">Sisakan saldo secukupnya untuk bayar warga di titik jemput berikutnya.</Note>
    </Page>
  )
}

/** E2e Konfirmasi Penarikan (581:9239) — after 2.5 dtk → E2f */
export function PinTarik() {
  const { go } = useStore()
  return <PinScreen title="Konfirmasi Penarikan" amount="Rp400.000" from="Rp512.000" after="Rp112.000" right="Tarik saldo" hint="6 digit PIN untuk mengonfirmasi penarikan"
    to={<div className="row" style={{ gap: 12 }}>
      <Ava t="BCA" bg="rgba(255,255,255,.12)" color="#fff" />
      <div className="col grow"><span style={{ fontSize: 12, color: C.lav }}>Tarik ke</span><span style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: lh }}>BCA •••• 4521 · Slamet Riyadi</span></div>
      <span className="row nowrap t-label-s" style={{ gap: 4, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,.14)', color: '#fff' }}><Img src="fi-shield-ffffff-14.svg" size={14} />Aman</span>
    </div>}
    next={() => go('e2f-diproses', { replace: true })} />
}

/** E2f Penarikan Diproses (581:9345) — Kembali ke Saldo → E2; Hubungi Bantuan → Bantuan */
export function TarikDiproses() {
  const { go } = useStore()
  return (
    <Page title="Tarik Saldo" bottom={<><Btn icon="fi-wallet-ffffff-20.svg" onClick={() => backToSaldo(go)}>Kembali ke Saldo</Btn><Btn kind="soft" icon="fi-help-3d2fd0-20.svg" onClick={() => go('bantuan')}>Hubungi Bantuan</Btn></>}>
      <Hero tag={<AmberTag icon="ic-clock-amber14.svg">Sedang diproses</AmberTag>} title="Rp400.000 sedang dikirim" sub="Biasanya masuk kurang dari 30 menit, paling lama 1×24 jam hari kerja." />
      <Card title="Status penarikan">
        <Timeline steps={[['Penarikan diajukan', '27 Nov, 16.40 · saldo dipotong', 'done'], ['Diproses ke BCA', 'Kode WD-2711-5530', 'current'], ['Masuk rekening BCA •••• 4521', 'Kamu dapat notifikasi', 'todo']]} />
      </Card>
      <Card><div className="row" style={{ justifyContent: 'space-between' }}><span className="t-body-ms">Sisa saldo KETUK</span><span style={{ fontSize: 18, fontWeight: 800, color: C.indigo }}>Rp112.000</span></div></Card>
      <Note icon="fi-info-1b1760-18.svg">Belum masuk setelah 1×24 jam? Hubungi Pusat Bantuan dengan kode penarikan.</Note>
    </Page>
  )
}
