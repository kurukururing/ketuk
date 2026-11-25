import { useStore, rp, PAK_SLAMET } from '../../store'
import Chat, { type Msg } from '../Chat'

/** Figma: D1 Chat dengan Warga (278:6692) — Menunggu Konfirmasi → Buka chat → "Lanjut ke pembayaran" → Koreksi Disetujui */
export default function ChatWarga() {
  const { s, go } = useStore()
  const price = s.session.offers.find(o => o.id === PAK_SLAMET.id)?.price ?? PAK_SLAMET.price
  const msgs: Msg[] = [
    { me: true, text: 'Siang Bu Ratna, saya Slamet. Kipas anginnya saya jemput hari ini jam 16.00 ya.', time: '15.46  | dibaca' },
    { me: false, text: 'Siang Pak. Siap, saya di rumah. Alamatnya sesuai di aplikasi.', time: '15.46' },
  ]
  if (s.correction !== 'none') {
    msgs.push({ me: true, text: 'Saya sudah di depan. Setelah saya cek, baling-balingnya retak di dua sisi. Dan saya sudah mengajukan koreksi harga.', time: '15.48  | dibaca' })
  }
  if (s.correction === 'approved') {
    msgs.push({
      me: false, text: 'Oke Pak, saya setuju dengan harga barunya.', time: '15.55',
      action: <button className="btn btn-primary" style={{ width: 'auto', boxShadow: 'none' }} onClick={() => go('disetujui')}>Lanjut ke pembayaran</button>,
    })
  } else if (s.correction === 'rejected') {
    msgs.push({ me: false, text: 'Maaf Pak, saya tidak setuju dengan koreksinya. Transaksi saya batalkan ya.', time: '15.55' })
  }
  return (
    <Chat initials="BR" name="Bu Ratna" status={s.arrived ? 'Kamu sudah di lokasi' : 'Menuju lokasi | tiba 12 menit lagi'}
      banner={`Harga terkunci ${rp(price)} | koreksi wajib foto`}
      quick={['Saya sudah di depan', 'Mohon ditunggu', 'Terima kasih']}
      messages={msgs} />
  )
}
