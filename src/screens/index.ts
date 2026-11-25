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
import Radar from './pengepul/Radar'
import Ajukan from './pengepul/Ajukan'
import Terkirim from './pengepul/Terkirim'
import Cek from './pengepul/Cek'
import AjukanKoreksi from './pengepul/AjukanKoreksi'
import Menunggu from './pengepul/Menunggu'
import Bayar from './pengepul/Bayar'

export const wargaScreens: Record<WargaScreen, ComponentType> = {
  splash: Splash,
  beranda: Beranda,
  foto: Foto,
  detail: Detail,
  sesi: Sesi,
  konfirmasi: Konfirmasi,
  berhasil: Berhasil,
  terkunci: Terkunci,
  serah: Serah,
  koreksi: Koreksi,
  selesai: Selesai,
}

export const pengepulScreens: Record<PengepulScreen, ComponentType> = {
  radar: Radar,
  ajukan: Ajukan,
  terkirim: Terkirim,
  cek: Cek,
  'ajukan-koreksi': AjukanKoreksi,
  menunggu: Menunggu,
  bayar: Bayar,
}
