import type { ComponentType } from 'react'
import type { WargaScreen, PengepulScreen } from '../store'
import Beranda from './warga/Beranda'
import Detail from './warga/Detail'
import Sesi from './warga/Sesi'
import Camera from './Camera'
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
import { JalurEwaste, CekEwaste, EwasteRadar, EwasteTawaran, EwasteDetail, EwasteBerhasil, EwasteRincian, EwasteSerah, EwasteBukti, EwasteKoreksi } from './warga/EwasteFlow'
import { K1Aktifkan, K2Undang, K3Terkirim, K4Undangan, K5Bantu, K6Menunggu, K7Setujui, K8Disetujui, K9Akses, K10Dicabut } from './warga/Keluarga'
import Pindahan from './warga/Pindahan'
import SesiSaya from './warga/SesiSaya'
import SesiKosong from './warga/SesiKosong'
import { LepasGratis, CekKondisi, MencariPengepul, PengepulMenerima, PengepulMengecek, SerahLepas, BuktiLepas, HasilTidakSesuai, BarangDitolak, BandingDiajukan } from './warga/LepasGratis'
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
  foto: Camera,
  detail: Detail,
  kategori: Kategori,
  ewaste: JalurEwaste,
  'i1-cek': CekEwaste,
  'i2-radar': EwasteRadar,
  'i2-tawaran': () => EwasteTawaran({}),
  'i2-konfirmasi': () => EwasteTawaran({ confirm: true }),
  'i2-detail': EwasteDetail,
  'i2-berhasil': EwasteBerhasil,
  'i3-rincian': EwasteRincian,
  'i4-serah': () => EwasteSerah({}),
  'i4-serah-k': () => EwasteSerah({ koreksi: true }),
  'i5-bukti': () => EwasteBukti({}),
  'i5-bukti-k': () => EwasteBukti({ koreksi: true }),
  'k1-aktifkan': K1Aktifkan, 'k2-undang': K2Undang, 'k3-terkirim': K3Terkirim, 'k4-undangan': K4Undangan, 'k5-bantu': K5Bantu,
  'k6-menunggu': K6Menunggu, 'k7-setujui': K7Setujui, 'k8-disetujui': K8Disetujui, 'k9-akses': K9Akses, 'k10-dicabut': K10Dicabut,
  'i4-koreksi': EwasteKoreksi,
  pindahan: Pindahan,
  'sesi-saya': SesiSaya,
  'sesi-kosong': SesiKosong,
  lepas: LepasGratis,
  'h1-cek': CekKondisi,
  'h2-mencari': () => MencariPengepul({}),
  'h2-perluasan': () => MencariPengepul({ wide: true }),
  'h2-menerima': () => PengepulMenerima({}),
  'h2-menerima-x': () => PengepulMenerima({ tolak: true }),
  'h3-mengecek': () => PengepulMengecek({}),
  'h3-mengecek-x': () => PengepulMengecek({ tolak: true }),
  'h3-serah': SerahLepas,
  'h4-bukti': BuktiLepas,
  'h3-hasil': HasilTidakSesuai,
  'h3-ditolak': BarangDitolak,
  'h3-banding': BandingDiajukan,
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

import * as K from './pengepul/Khusus'
import * as MB from './pengepul/MitraBaru'
import * as PB from './pengepul/Pembayaran'

export const pengepulScreens: Partial<Record<PengepulScreen, ComponentType>> = {
  splash: Splash,
  onboarding: Onboarding,
  masuk: Masuk,
  otp: Otp,
  peran: Peran,
  daftar: Daftar,
  foto: Camera,
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
  'mitra-daftar': () => MitraDaftar({}), 'mitra-daftar-terisi': () => MitraDaftar({ filled: true }), 'a1b-ktp': MB.KonfirmasiKtp,
  'a2b-pratinjau': MB.PratinjauLapak, 'a2d-pratinjau': MB.PratinjauKendaraan, 'a2f-pratinjau': MB.PratinjauStnk, 'a2h-kuasa': MB.SuratKuasa,
  'mitra-verifikasi': () => MitraVerifikasi({}), 'a2g-lengkap': () => MitraVerifikasi({ lengkap: true }),
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
  'f1-radar': () => Radar({ lg: true }), 'f1-permintaan': K.F1Permintaan, 'f2-jadwal': K.F2Jadwal, 'f2-navigasi': K.F2Navigasi,
  'f3-cek': K.F3Cek, 'f3-tolak': K.F3Tolak, 'f3-terkirim': K.F3Terkirim, 'f3-disetujui': K.F3Disetujui, 'f4-kode': K.F4Kode, 'f4-selesai': K.F4Selesai,
  'g1-ajukan': K.G1Ajukan, 'g1-terkirim': K.G1Terkirim, 'g2-persiapan': K.G2Persiapan, 'g2-navigasi': K.G2Navigasi, 'g3-cek': K.G3Cek,
  'g3-koreksi': K.G3Koreksi, 'g3-menunggu': K.G3Menunggu, 'g3-disetujui': K.G3Disetujui,
  'd1a-metode': PB.PilihMetode, 'd1b-pin': PB.PinSaldo, 'd1c-va': PB.TransferVa, 'd1d-cek': PB.CekTransfer, 'd1e-berhasil': PB.TransferBerhasil, 'd1f-kedaluwarsa': PB.TransferKedaluwarsa,
  'e2-saldo': PB.Saldo, 'e2a-isi': PB.IsiSaldo, 'e2b-va': PB.IsiVa, 'e2c-berhasil': PB.IsiBerhasil, 'e2d-tarik': PB.TarikSaldo, 'e2e-pin': PB.PinTarik, 'e2f-diproses': PB.TarikDiproses,
  'g4-kode': () => K.G4Kode({}), 'g4-kode-k': () => K.G4Kode({ koreksi: true }), 'g4-selesai': () => K.G4Selesai({}), 'g4-selesai-k': () => K.G4Selesai({ koreksi: true }), 'g5-salurkan': K.G5Salurkan,
}
