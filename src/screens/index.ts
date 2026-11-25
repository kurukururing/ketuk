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
import Kategori from './warga/Kategori'
import Ewaste from './warga/Ewaste'
import Pindahan from './warga/Pindahan'
import SesiSaya from './warga/SesiSaya'
import SesiKosong from './warga/SesiKosong'
import Lepas from './warga/Lepas'
import Notifikasi from './warga/Notifikasi'
import Riwayat from './warga/Riwayat'
import Bukti from './warga/Bukti'
import Akun from './warga/Akun'
import Dibantu from './warga/Dibantu'
import Bantuan from './warga/Bantuan'
import Dompet from './warga/Dompet'
import Tarik from './warga/Tarik'
import TarikOk from './warga/TarikOk'
import Daftar from './warga/Daftar'
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
import { MitraDaftar, MitraVerifikasi, MitraStatus, MitraOk } from './pengepul/Mitra'
import { NotifPengepul, FilterRadar, PetaRadar } from './pengepul/RadarExtra'
import { TawarankuBerjalan, TawarankuMenang } from './pengepul/Tawaranku'
import { Profil, Pendapatan, Lencana } from './pengepul/Akun'

export const wargaScreens: Partial<Record<WargaScreen, ComponentType>> = {
  splash: Splash,
  onboarding: Onboarding,
  masuk: Masuk,
  otp: Otp,
  peran: Peran,
  alamat: Alamat,
  beranda: Beranda,
  foto: Foto,
  detail: Detail,
  kategori: Kategori,
  ewaste: Ewaste,
  pindahan: Pindahan,
  'sesi-saya': SesiSaya,
  'sesi-kosong': SesiKosong,
  lepas: Lepas,
  notifikasi: Notifikasi,
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
  riwayat: Riwayat,
  bukti: Bukti,
  akun: Akun,
  dibantu: Dibantu,
  bantuan: Bantuan,
  dompet: Dompet,
  tarik: Tarik,
  'tarik-ok': TarikOk,
  daftar: Daftar,
}

export const pengepulScreens: Partial<Record<PengepulScreen, ComponentType>> = {
  splash: Splash,
  onboarding: Onboarding,
  masuk: Masuk,
  otp: Otp,
  peran: Peran,
  daftar: Daftar,
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
  'mitra-daftar': MitraDaftar,
  'mitra-verifikasi': MitraVerifikasi,
  'mitra-status': MitraStatus,
  'mitra-ok': MitraOk,
  notif: NotifPengepul,
  filter: FilterRadar,
  peta: PetaRadar,
  tawaranku: TawarankuBerjalan,
  'tawaranku-menang': TawarankuMenang,
  profil: Profil,
  pendapatan: Pendapatan,
  lencana: Lencana,
  bukti: Bukti,
  bantuan: Bantuan,
}
