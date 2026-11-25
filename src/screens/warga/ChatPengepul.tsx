import { useStore, rp, ITEM, winner } from '../../store'
import Chat from '../Chat'
import { itemPhoto } from '../../ui'

/** Figma: E1 Chat dengan Pengepul (25:2045) / D1 Chat dengan Pengepul (260:7348)
 *  Status → Chat → "Barang Sesuai →" → Serah Terima, or (if correction raised) "Pengajuan Koreksi Harga →" → Koreksi Berbukti */
export default function ChatPengepul() {
  const { s, d, go } = useStore()
  const price = s.finalPrice ?? 38000
  // Figma: E1/D5 chat carry the correction request; D1 (dispenser) chat → Barang Sesuai
  const koreksi = s.correction === 'pending' || s.scenario === 'borongan'
  const w = winner(s)
  return (
    <Chat initials={w.initials} name={w.name} status={s.arrived ? 'Sudah tiba di lokasi' : 'Menuju lokasi | tiba 12 menit lagi'}
      banner={`Harga terkunci ${rp(price)} | koreksi wajib foto`}
      onCall={() => go('terkunci')}
      quick={['Sudah di depan?', 'Pagar hitam', 'Terima kasih']}
      messages={[
        { me: false, text: `${ITEM.warga}, saya berangkat dari lapak ya. Sekitar 12 menit.`, time: '15.46' },
        { me: true, text: s.scenario === 'kipas' ? 'Siap Pak, kipasnya sudah saya taruh di teras.' : s.scenario === 'dispenser' ? 'Siap Pak, dispensernya sudah saya taruh di teras.' : 'Siap Pak, barangnya sudah saya taruh di teras.', time: '15.47  | dibaca' },
        { me: false, text: 'Baik Bu. Nanti saya tes nyala dulu di lokasi ya.', time: '15.47' },
        { me: true, img: itemPhoto(s), text: `Ini posisinya Pak, ${ITEM.chatPlace}.`, time: '15.48  | dibaca' },
        {
          me: false, time: '15.55',
          action: koreksi
            ? <button className="btn" style={{ width: 'auto', background: 'var(--coral-700)', color: '#fff' }} onClick={() => { if (s.correction === 'none') d({ type: 'requestCorrection' }); go('koreksi') }}>Pengajuan Koreksi Harga →</button>
            : <button className="btn btn-primary" style={{ width: 'auto', boxShadow: 'none' }} onClick={() => go('serah')}>Barang Sesuai →</button>,
        },
      ]}
    />
  )
}
