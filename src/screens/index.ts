import type { ComponentType } from 'react'
import type { WargaScreen, PengepulScreen } from '../store'
import Beranda from './warga/Beranda'
import Detail from './warga/Detail'
import Sesi from './warga/Sesi'
import Foto from './warga/Foto'
import Konfirmasi from './warga/Konfirmasi'
import Berhasil from './warga/Berhasil'
import Terkunci from './warga/Terkunci'
import Serah from './warga/Serah'
import Koreksi from './warga/Koreksi'
import Selesai from './warga/Selesai'
import Splash from './warga/Splash'
import Onboarding from './warga/Onboarding'
import Masuk from './warga/Masuk'
import Otp from './warga/Otp'
import Peran from './warga/Peran'
import Alamat from './warga/Alamat'
import Tawaran from './warga/Tawaran'
import ChatPengepul from './warga/ChatPengepul'
import Batal from './warga/Batal'
import Radar from './pengepul/Radar'
import Ajukan from './pengepul/Ajukan'
import Terkirim from './pengepul/Terkirim'
import Cek from './pengepul/Cek'
import AjukanKoreksi from './pengepul/AjukanKoreksi'
import Menunggu from './pengepul/Menunggu'
import Bayar from './pengepul/Bayar'
import Jadwal from './pengepul/Jadwal'
import Navigasi from './pengepul/Navigasi'
import ChatWarga from './pengepul/ChatWarga'
import Disetujui from './pengepul/Disetujui'

export const wargaScreens: Record<WargaScreen, ComponentType> = {
  splash: Splash,
  onboarding: Onboarding,
  masuk: Masuk,
  otp: Otp,
  peran: Peran,
  alamat: Alamat,
  beranda: Beranda,
  foto: Foto,
  detail: Detail,
  sesi: Sesi,
  tawaran: Tawaran,
  konfirmasi: Konfirmasi,
  berhasil: Berhasil,
  terkunci: Terkunci,
  chat: ChatPengepul,
  serah: Serah,
  koreksi: Koreksi,
  batal: Batal,
  selesai: Selesai,
}

export const pengepulScreens: Record<PengepulScreen, ComponentType> = {
  radar: Radar,
  ajukan: Ajukan,
  terkirim: Terkirim,
  jadwal: Jadwal,
  navigasi: Navigasi,
  cek: Cek,
  'ajukan-koreksi': AjukanKoreksi,
  menunggu: Menunggu,
  chat: ChatWarga,
  disetujui: Disetujui,
  bayar: Bayar,
}
