import { useState } from 'react'
import { useStore } from '../../store'
import { A, Img, StatusBar } from '../../ui'

/** Figma: A3 Masuk (9:106) — Kirim OTP → A4 Verifikasi OTP, Google → A5 Pilih Peran, Daftar → A4 Daftar */
export default function Masuk() {
  const { go } = useStore()
  const [hp, setHp] = useState('')
  const fmt = (v: string) => v.replace(/\D/g, '').slice(0, 12).replace(/^(\d{3})(\d{0,4})(\d{0,5}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' '))
  return (
    <div className="screen">
      <img src={A('masuk-ellipse1.svg')} alt="" className="abs" style={{ left: -221, top: -561, width: 883, height: 883 }} />
      <img src={A('masuk-ellipse2.svg')} alt="" className="abs" style={{ left: -466, top: 473, width: 883, height: 883 }} />

      <div className="abs row" style={{ left: 24, top: 72, gap: 8 }}>
        <img src={A('logo-lockup-mark.svg')} alt="" style={{ width: 38, height: 38 }} />
        <span style={{ fontWeight: 800, fontSize: 30, letterSpacing: -1.2, color: 'var(--primary-900)' }}>Ketuk</span>
      </div>

      <div className="abs col" style={{ left: 0, top: 140, width: 390, padding: '0 24px', gap: 16 }}>
        <span className="t-h1" style={{ color: 'var(--primary-500)', letterSpacing: -0.39 }}>Masuk ke KETUK</span>
        <span className="t-body-l" style={{ color: 'var(--ink-500)' }}>Pakai nomor HP aktif. Kode OTP dikirim lewat SMS.</span>
        <div className="row" style={{ gap: 12, padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
          <Img src="ic-lock-indigo.svg" size={22} />
          <span className="t-body-ms grow" style={{ color: 'var(--primary-900)' }}>Harga pasti, tidak ada tawar-menawar ulang di depan pintu.</span>
        </div>
        <label className="col" style={{ gap: 8 }}>
          <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>Nomor HP</span>
          <div className="row" style={{ height: 54, gap: 12, padding: '0 16px', borderRadius: 'var(--radius-md)', background: '#fff', border: '1.5px solid var(--line-200)' }}>
            <span className="t-body-ms" style={{ color: 'rgba(21,20,43,0.6)' }}>+62</span>
            <div style={{ width: 1.5, height: 22, background: 'var(--line-200)' }} />
            <input inputMode="tel" placeholder="--- ---- ----" value={hp} onChange={e => setHp(fmt(e.target.value))}
              className="t-body-l" style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', color: 'var(--ink-900)' }} />
          </div>
        </label>
        <button className="btn btn-primary" style={{ boxShadow: '0 10px 12px rgba(61,47,208,0.35)' }}
          onClick={() => { if (!hp) setHp('812 3456 7890'); go('otp') }}>Kirim Kode OTP</button>
        <div className="row" style={{ gap: 12 }}>
          <div className="grow" style={{ height: 1, background: 'var(--line-200)' }} />
          <span className="t-body-s" style={{ color: 'var(--ink-500)' }}>atau</span>
          <div className="grow" style={{ height: 1, background: 'var(--line-200)' }} />
        </div>
        <button className="btn" style={{ border: '1.5px solid var(--line-200)' }} onClick={() => go('peran')}>
          <Img src="ic-google.svg" size={20} />Lanjut dengan Google
        </button>
        <button className="t-body-m" style={{ color: 'var(--ink-500)' }} onClick={() => go('daftar')}>
          Belum punya akun? <b style={{ color: 'var(--primary-500)' }}>Daftar</b>
        </button>
      </div>
      <span className="abs t-body-s" style={{ left: 45, top: 760, width: 300, textAlign: 'center', color: 'var(--ink-500)' }}>
        Dengan melanjutkan, kamu menyetujui Syarat Layanan dan Kebijakan Privasi KETUK.
      </span>
      <StatusBar />
    </div>
  )
}
