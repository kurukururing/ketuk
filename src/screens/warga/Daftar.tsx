import { useState } from 'react'
import { useStore } from '../../store'
import { A, StatusBar, AppBar, Checkbox } from '../../ui'

/** Figma: A4 Daftar (23:1544) — Daftar & Kirim OTP → A4 Verifikasi OTP; Masuk → A3 Masuk */
export default function Daftar() {
  const { go } = useStore()
  const [ok, setOk] = useState(true)
  const field = (label: string, ph: string, prefix?: string) => (
    <label className="col" style={{ gap: 8 }}>
      <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>{label}</span>
      <div className="row" style={{ height: 54, gap: 12, padding: '0 16px', borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--line-200)' }}>
        {prefix && <><span className="t-body-ms" style={{ color: 'rgba(21,20,43,0.6)' }}>{prefix}</span><div style={{ width: 1.5, height: 22, background: 'var(--line-200)' }} /></>}
        <input placeholder={ph} inputMode={prefix ? 'tel' : undefined} className="t-body-l" style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', color: 'var(--ink-900)' }} />
      </div>
    </label>
  )
  return (
    <div className="screen">
      <img src={A('daftar-ellipse1.svg')} alt="" className="abs" style={{ left: -221, top: -561, width: 883, height: 883 }} />
      <img src={A('daftar-ellipse2.svg')} alt="" className="abs" style={{ left: -466, top: 473, width: 883, height: 883 }} />
      <AppBar title="Daftar Akun" ink bg="transparent" />
      <div className="abs col" style={{ left: 0, top: 124, width: 390, padding: '0 24px', gap: 14 }}>
        <span className="t-h1" style={{ color: 'var(--primary-500)', letterSpacing: -0.39 }}>Buat akun KETUK</span>
        <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>Cukup 1 menit. Data dipakai untuk penjemputan dan pembayaran.</span>
        {field('Nama lengkap', 'Contoh : Budi')}
        {field('Nomor HP', '--- ---- ----', '+62')}
        {field('Kecamatan', 'Contoh : Waru')}
        <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
          <Checkbox on={ok} onChange={setOk} />
          <span className="t-body-m grow" style={{ color: 'var(--ink-700)' }}>Saya setuju dengan <b style={{ color: 'var(--primary-500)', fontWeight: 600 }}>Syarat Layanan</b> dan <b style={{ color: 'var(--primary-500)', fontWeight: 600 }}>Kebijakan Privasi</b> KETUK.</span>
        </div>
        <button className="btn btn-primary" disabled={!ok} style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }} onClick={() => go('otp')}>Daftar & Kirim OTP</button>
        <button className="t-body-m" style={{ color: 'var(--ink-500)' }} onClick={() => go('masuk', { replace: true })}>
          Sudah punya akun? <b style={{ color: 'var(--primary-500)' }}>Masuk</b>
        </button>
      </div>
      <StatusBar />
    </div>
  )
}
