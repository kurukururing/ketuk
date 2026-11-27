import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type Role = 'warga' | 'pengepul'

/** Shared by both apps (same Figma frames, role-aware) */

/** Route names (see docs/FLOW.md). Kept as plain strings: the demo has ~150 screens. */
export type AuthScreen = string
export type WargaScreen = string
export type PengepulScreen = string

export type ScenarioId = 'kipas' | 'dispenser' | 'borongan' | 'kardus'

export type Offer = {
  id: string
  name: string
  initials: string
  score: number
  pickup: string
  price: number
  distance: string
  /** demo-clock ms when it arrived (for the "new" highlight) */
  at: number
}

export type Toast = { id: number; role: Role; title: string; body: string; go?: WargaScreen | PengepulScreen }

export type State = {
  role: Role
  warga: WargaScreen[] // navigation stack
  pengepul: PengepulScreen[]
  photo: string | null // user-taken photo (data URL) — null = use design photo
  session: {
    status: 'idle' | 'running' | 'won' | 'done'
    remaining: number // seconds left of the 60-minute Sesi Ketuk
    offers: Offer[]
    queued: string[] // scripted offers still to arrive
    nextIn: number // seconds (wall clock) until the next scripted offer
    winner: string | null
    selected: string | null
  }
  speed: number
  correction: 'none' | 'pending' | 'approved' | 'rejected'
  finalPrice: number | null
  rating: number
  arrived: boolean
  scenario: ScenarioId
  radius: 3 | 5
  /** dispenser flow: photo retaken after the blur warning */
  retake: boolean
  /** free-form UI variant flags shared by screens (camera mode, detail variant, …) */
  v: Record<string, string | number | boolean>
  toasts: Toast[]
  panel: boolean
}

/* ------------------------------------------------------------------ */
/*  Demo data — mirrors the Figma copy                                 */
/* ------------------------------------------------------------------ */
export const PAK_SLAMET: Omit<Offer, 'at'> = {
  id: 'ps', name: 'Pak Slamet', initials: 'PS', score: 97, pickup: 'Jemput 16.00', price: 38000, distance: '1,2 km',
}

type Scenario = {
  name: string; short: string; category: string; photo: string
  aiLow: number; aiHigh: number; confidence: number; basis: string
  offers: Record<string, Omit<Offer, 'at'>>
  /** offers that stream in automatically, in order */
  auto: string[]
  /** offer sent live from the Pengepul app (null = none) */
  manual: string | null
  startAt: number
  correction: { price: number; reason: string; note: string }
  weight: string; total: number; totalItems: number
  pickupWhen: string; pickupWait: number
  chatPlace: string
}

const BASE_OFFERS = {
  rj: { id: 'rj', name: 'Rosok Jaya', initials: 'RJ', score: 88, pickup: 'Besok 09.00', price: 33000, distance: '2,1 km' },
  lr: { id: 'lr', name: 'Lapak Rungkut', initials: 'LR', score: 90, pickup: 'Besok 08.00', price: 30000, distance: '1,6 km' },
  ub: { id: 'ub', name: 'UD Berkah', initials: 'UB', score: 92, pickup: 'Jemput 15.30', price: 35000, distance: '0,9 km' },
  ps: PAK_SLAMET,
}

/** Figma: B2/E1 = kipas, C1/D1 = dispenser (foto blur + radius diperluas), D4/D5 = Mode Pindahan (borongan) */
export const SCENARIOS: Record<ScenarioId, Scenario> = {
  kipas: {
    name: 'Kipas angin berdiri', short: 'kipas angin', category: 'Elektronik', photo: 'photo-kipas.jpg',
    aiLow: 25000, aiHigh: 40000, confidence: 82, basis: 'Dari 214 transaksi kipas angin di Surabaya, 30 hari terakhir.',
    offers: BASE_OFFERS, auto: ['rj', 'lr', 'ub'], manual: 'ps', startAt: 60 * 60,
    correction: { price: 30000, reason: 'Retak / pecah', note: 'Baling-baling retak di dua sisi, tidak terlihat di foto awal.' },
    weight: '3,2 kg', total: 88000, totalItems: 4, pickupWhen: 'hari ini pukul 16.00', pickupWait: 12, chatPlace: 'pagar hitam',
  },
  dispenser: {
    name: 'Dispenser', short: 'dispenser', category: 'Elektronik', photo: 'photo-dispenser-c1.jpg',
    aiLow: 25000, aiHigh: 40000, confidence: 82, basis: 'Dari 214 transaksi dispenser di Surabaya, 30 hari terakhir.',
    offers: BASE_OFFERS, auto: ['ps', 'ub', 'rj', 'lr'], manual: null, startAt: 38 * 60 + 12,
    correction: { price: 30000, reason: 'Retak / pecah', note: 'Tutup galon retak, tidak terlihat di foto awal.' },
    weight: '3,2 kg', total: 88000, totalItems: 4, pickupWhen: 'hari ini pukul 16.00', pickupWait: 12, chatPlace: 'pagar hitam',
  },
  borongan: {
    name: '3 barang borongan', short: '3 barang borongan', category: 'Mode Pindahan', photo: 'item-kasur.jpg',
    aiLow: 135000, aiHigh: 210000, confidence: 80, basis: 'Estimasi gabungan kasur busa, rak besi, dan dispenser.',
    offers: {
      ub: { id: 'ub', name: 'UD Berkah', initials: 'UB', score: 92, pickup: 'Besok 08.00', price: 172000, distance: '2,4 km' },
      ps: { id: 'ps', name: 'Pak Slamet', initials: 'PS', score: 97, pickup: 'Besok 09.00', price: 160000, distance: '1,2 km' },
      rj: { id: 'rj', name: 'Rosok Jaya', initials: 'RJ', score: 88, pickup: 'Besok 10.00', price: 150000, distance: '2,1 km' },
      lr: { id: 'lr', name: 'Lapak Rungkut', initials: 'LR', score: 90, pickup: 'Besok 11.00', price: 140000, distance: '1,6 km' },
    },
    auto: ['ub', 'ps', 'rj', 'lr'], manual: null, startAt: 48 * 60 + 12,
    correction: { price: 110000, reason: 'Retak / pecah', note: 'Baling-baling retak, tidak terlihat di foto awal.' },
    weight: '18,6 kg', total: 0, totalItems: 3, pickupWhen: 'besok pukul 08.00', pickupWait: 20, chatPlace: 'depan warung',
  },
  /** Figma: D2 Sesi Tanpa Tawaran → D3 Lepas Gratis + Jemput → E1 Harga Terkunci */
  kardus: {
    name: 'Kardus bekas 12 kg', short: 'kardus', category: 'Kardus & kertas', photo: 'photo-kardus.jpg',
    aiLow: 24000, aiHigh: 30000, confidence: 80, basis: 'Dari transaksi kardus di Surabaya, 30 hari terakhir.',
    offers: { ps: { ...PAK_SLAMET, pickup: 'Besok 08.00', price: 0 } }, auto: [], manual: null, startAt: 0,
    correction: { price: 0, reason: 'Retak / pecah', note: '' },
    weight: '12 kg', total: 0, totalItems: 1, pickupWhen: 'besok pukul 08.00', pickupWait: 12, chatPlace: 'pagar hitam',
  },
}

/** Live item data for the active scenario (screens read it during render). */
export const ITEM = {
  ...SCENARIOS.kipas,
  warga: 'Bu Ratna',
  area: 'Rungkut, Surabaya',
  address: 'Rungkut Asri Tengah 12',
}
export const CORRECTION = { ...SCENARIOS.kipas.correction }
let CUR: ScenarioId = 'kipas'
const useScenario = (id: ScenarioId) => { CUR = id; Object.assign(ITEM, SCENARIOS[id]); Object.assign(CORRECTION, SCENARIOS[id].correction) }
const OFFERS = () => SCENARIOS[CUR].offers

export const rp = (n: number) => 'Rp' + n.toLocaleString('id-ID')
export const mmss = (s: number) => {
  const t = Math.max(0, Math.ceil(s))
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}
export const SESSION_LEN = 60 * 60

/* ------------------------------------------------------------------ */
/*  Reducer                                                            */
/* ------------------------------------------------------------------ */
type Action =
  | { type: 'go'; role?: Role; screen: string; replace?: boolean; root?: boolean }
  | { type: 'back' }
  | { type: 'role'; role: Role }
  | { type: 'photo'; photo: string | null }
  | { type: 'startSession'; scenario?: ScenarioId }
  | { type: 'scenario'; scenario: ScenarioId }
  | { type: 'expandRadius' }
  | { type: 'retake' }
  | { type: 'set'; v: Record<string, string | number | boolean> }
  | { type: 'demoState'; scenario: ScenarioId; phase: 'running' | 'won'; correction?: boolean; lock?: { id: string; price: number; pickup: string } }
  | { type: 'switchToPengepul'; screen: PengepulScreen }
  | { type: 'tick'; dt: number }
  | { type: 'offer'; id: string; price?: number; pickup?: string }
  | { type: 'select'; id: string | null }
  | { type: 'ketukPalu'; id: string }
  | { type: 'requestCorrection' }
  | { type: 'resolveCorrection'; ok: boolean }
  | { type: 'complete' }
  | { type: 'rate'; n: number }
  | { type: 'arrive' }
  | { type: 'speed'; speed: number }
  | { type: 'skip'; seconds: number }
  | { type: 'dismissToast'; id: number }
  | { type: 'panel'; open?: boolean }
  | { type: 'jump'; preset: Preset }
  | { type: 'reset' }

export type Preset = 'awal' | 'sesi' | 'pengepul' | 'menang' | 'serah' | 'koreksi' | 'selesai'

const initial = (): State => ({
  role: 'warga',
  warga: ['splash'],
  pengepul: ['radar'],
  photo: null,
  session: { status: 'idle', remaining: SESSION_LEN, offers: [], queued: [], nextIn: 0, winner: null, selected: null },
  speed: 1,
  correction: 'none',
  finalPrice: null,
  rating: 0,
  arrived: false,
  scenario: 'kipas',
  radius: 3,
  retake: false,
  v: {},
  toasts: [],
  panel: false,
})

export const winner = (s: State): Omit<Offer, 'at'> =>
  s.session.offers.find(o => o.id === (s.session.winner ?? s.session.selected)) ?? SCENARIOS[s.scenario].offers.ps ?? PAK_SLAMET
export const winnerName = (s: State) => winner(s).name
/** "Jemput 16.00" / "Besok 08.00" → "16.00"; arrival is 2 minutes early, as in Figma */
export const pickupTime = (o: { pickup: string }) => o.pickup.split(' ').at(-1)!
export const arrivalTime = (o: { pickup: string }) => {
  const [h, m] = pickupTime(o).split('.').map(Number); const t = h * 60 + m - 2
  return `${String(Math.floor(t / 60)).padStart(2, '0')}.${String(t % 60).padStart(2, '0')}`
}

let toastId = 1
const toast = (s: State, role: Role, title: string, body: string, go?: Toast['go']): Toast[] =>
  [...s.toasts.filter(t => t.role !== role), { id: toastId++, role, title, body, go }]

const addOffer = (s: State, id: string, price?: number, pickup?: string): State => {
  const src = OFFERS()
  if (s.session.status !== 'running' || s.session.offers.some(o => o.id === id) || !src[id]) return s
  const o = { ...src[id], ...(price ? { price } : {}), ...(pickup ? { pickup } : {}) }
  const offers = [...s.session.offers, { ...o, at: Date.now() }].sort((a, b) => b.price - a.price)
  return {
    ...s,
    session: { ...s.session, offers, queued: s.session.queued.filter(q => q !== id) },
    toasts: s.role === 'warga' ? s.toasts : toast(s, 'warga', 'Tawaran baru masuk', `${o.name} menawar ${rp(o.price)}`, 'sesi'),
  }
}

function withPreset(p: Preset): State {
  useScenario('kipas')
  const s = initial()
  const SCRIPTED = OFFERS()
  const running = (offers: string[]): State['session'] => ({
    status: 'running', remaining: 38 * 60 + 12,
    offers: offers.map(id => ({ ...SCRIPTED[id], at: 0 })).sort((a, b) => b.price - a.price),
    queued: ['rj', 'lr', 'ub'].filter(id => !offers.includes(id)), nextIn: 3, winner: null, selected: null,
  })
  switch (p) {
    case 'awal': return { ...s, warga: ['beranda'] }
    case 'sesi': return { ...s, warga: ['beranda', 'sesi'], session: { ...running([]), remaining: SESSION_LEN, nextIn: 2 } }
    case 'pengepul': return { ...s, role: 'pengepul', warga: ['beranda', 'sesi'], pengepul: ['radar'], session: running(['rj', 'lr', 'ub']) }
    case 'menang': {
      const r = running(['rj', 'lr', 'ub', 'ps'])
      return { ...s, warga: ['beranda', 'sesi'], pengepul: ['radar', 'terkirim'], session: r }
    }
    case 'serah':
    case 'koreksi':
    case 'selesai': {
      const r = { ...running(['rj', 'lr', 'ub', 'ps']), status: 'won' as const, winner: 'ps', queued: [] }
      if (p === 'serah') return { ...s, arrived: true, warga: ['beranda', 'terkunci', 'chat', 'serah'], pengepul: ['radar', 'jadwal', 'navigasi', 'cek'], session: r, finalPrice: 38000 }
      if (p === 'koreksi') return { ...s, arrived: true, warga: ['beranda', 'terkunci', 'chat', 'koreksi'], pengepul: ['radar', 'cek', 'menunggu'], session: r, correction: 'pending', finalPrice: 38000 }
      return { ...s, warga: ['beranda', 'selesai'], pengepul: ['radar', 'bayar'], session: { ...r, status: 'done' }, finalPrice: 38000 }
    }
  }
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'go': {
      const role = a.role ?? s.role
      s = { ...s, toasts: s.toasts.filter(t => !(t.role === role && t.go === a.screen)) }
      const stack = s[role] as string[]
      const next = a.root ? [...new Set([role === 'warga' ? 'beranda' : 'radar', a.screen])]
        : a.replace ? [...stack.slice(0, -1), a.screen] : stack.at(-1) === a.screen ? stack : [...stack, a.screen]
      return { ...s, [role]: next }
    }
    case 'back': {
      const stack = s[s.role] as string[]
      return stack.length > 1 ? { ...s, [s.role]: stack.slice(0, -1) } : s
    }
    case 'role':
      return { ...s, role: a.role, toasts: s.toasts }
    case 'photo':
      return { ...s, photo: a.photo }
    case 'scenario':
      useScenario(a.scenario)
      return { ...s, scenario: a.scenario, retake: false, photo: null }
    case 'startSession': {
      const sc = a.scenario ?? s.scenario
      useScenario(sc)
      const S = SCENARIOS[sc]
      const base = { ...s, scenario: sc, radius: 3 as const, correction: 'none' as const, finalPrice: null, arrived: false }
      return {
        ...base,
        session: {
          status: 'running', remaining: S.startAt, offers: [],
          // dispenser: nobody in 3 km until the warga widens the radius (Figma: D1 Tidak Ada Pengepul)
          queued: sc === 'dispenser' ? [] : S.auto, nextIn: 2.5, winner: null, selected: null,
        },
        toasts: sc === 'kipas' ? toast(s, 'pengepul', 'Barang baru di radar', `${ITEM.name} | 1,2 km | Rungkut Kidul`, 'radar') : s.toasts,
      }
    }
    case 'expandRadius':
      return { ...s, radius: 5, session: { ...s.session, queued: SCENARIOS[s.scenario].auto, nextIn: 3.4 } }
    case 'demoState': {
      // Open a prepared session (Figma static frames reached from Sesi Saya / Notifikasi)
      useScenario(a.scenario)
      const S = SCENARIOS[a.scenario]
      const lk = a.lock
      const offers = Object.values(S.offers).map(o => ({ ...o, at: 0, ...(lk && o.id === lk.id ? { price: lk.price, pickup: lk.pickup } : {}) })).sort((x, y) => y.price - x.price)
      const win = (lk && offers.find(o => o.id === lk.id)) || offers[0]
      return {
        ...s, scenario: a.scenario, retake: true, radius: a.scenario === 'dispenser' ? 5 : 3, correction: a.correction ? 'pending' : 'none', arrived: !!a.correction,
        finalPrice: a.phase === 'won' ? win.price : null,
        session: { status: a.phase, remaining: a.scenario === 'kipas' ? 38 * 60 + 12 : S.startAt, offers, queued: [], nextIn: 0, winner: a.phase === 'won' ? win.id : null, selected: null },
      }
    }
    case 'retake':
      return { ...s, retake: true }
    case 'set':
      return { ...s, v: { ...s.v, ...a.v } }
    case 'switchToPengepul':
      return { ...s, role: 'pengepul', pengepul: [a.screen] }
    case 'tick': {
      if (s.session.status !== 'running') return s
      const remaining = Math.max(0, s.session.remaining - a.dt * s.speed)
      let next: State = { ...s, session: { ...s.session, remaining } }
      if (s.session.queued.length) {
        const nextIn = s.session.nextIn - a.dt
        if (nextIn <= 0) {
          next = addOffer(next, s.session.queued[0])
          next = { ...next, session: { ...next.session, nextIn: 3.2 } }
        } else next = { ...next, session: { ...next.session, nextIn } }
      }
      return next
    }
    case 'offer':
      return addOffer(s, a.id, a.price, a.pickup)
    case 'select':
      return { ...s, session: { ...s.session, selected: a.id } }
    case 'ketukPalu':
      return {
        ...s,
        session: { ...s.session, status: 'won', winner: a.id, queued: [] },
        finalPrice: s.session.offers.find(o => o.id === a.id)?.price ?? null,
        toasts: a.id === 'ps' && s.scenario === 'kipas' ? toast(s, 'pengepul', 'Tok! Tawaranmu dipilih', `Harga terkunci ${rp(s.session.offers.find(o => o.id === 'ps')!.price)} | jemput hari ini`, 'jadwal') : s.toasts,
      }
    case 'requestCorrection':
      return {
        ...s, correction: 'pending',
        toasts: toast(s, 'warga', `${winnerName(s)} mengajukan koreksi`, `${rp(s.finalPrice ?? 38000)} → ${rp(CORRECTION.price)} | dengan bukti foto`, 'koreksi'),
      }
    case 'resolveCorrection':
      return a.ok ? {
        ...s, correction: 'approved', finalPrice: CORRECTION.price,
        session: { ...s.session, status: 'done' },
        toasts: s.scenario !== 'kipas' ? s.toasts : toast(s, 'pengepul', 'Koreksi disetujui warga', `Bayar ${rp(CORRECTION.price)} ke ${ITEM.warga}`, 'bayar'),
      } : {
        ...s, correction: 'rejected', finalPrice: null,
        session: { ...s.session, status: 'idle', queued: [] },
        toasts: s.scenario !== 'kipas' ? s.toasts : toast(s, 'pengepul', 'Warga menolak koreksi', 'Transaksi dibatalkan, tanpa denda untuk warga', 'radar'),
      }
    case 'complete':
      return {
        ...s, session: { ...s.session, status: 'done' },
        toasts: s.role === 'pengepul'
          ? toast(s, 'warga', 'Uang diterima', `${rp(s.finalPrice ?? 38000)} dari ${winnerName(s)}`, 'selesai')
          : s.scenario !== 'kipas' ? s.toasts : toast(s, 'pengepul', 'Serah terima selesai', `${rp(s.finalPrice ?? 38000)} dibayar ke ${ITEM.warga}`, 'bayar'),
      }
    case 'arrive':
      return { ...s, arrived: true }
    case 'rate':
      return { ...s, rating: a.n }
    case 'speed':
      return { ...s, speed: a.speed }
    case 'skip':
      return { ...s, session: { ...s.session, remaining: Math.max(0, s.session.remaining - a.seconds) } }
    case 'dismissToast':
      return { ...s, toasts: s.toasts.filter(t => t.id !== a.id) }
    case 'panel':
      return { ...s, panel: a.open ?? !s.panel }
    case 'jump':
      return { ...withPreset(a.preset), photo: s.photo, panel: s.panel, speed: s.speed }
    case 'reset':
      useScenario('kipas')
      return { ...initial(), panel: false }
  }
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
const Ctx = createContext<{ s: State; d: React.Dispatch<Action> } | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, d] = useReducer(reducer, undefined, initial)
  const last = useRef(performance.now())
  if (import.meta.env.DEV) (window as unknown as { __d: typeof d }).__d = d
  useEffect(() => {
    const id = setInterval(() => {
      const now = performance.now()
      const dt = (now - last.current) / 1000
      last.current = now
      d({ type: 'tick', dt })
    }, 200)
    return () => clearInterval(id)
  }, [])
  return <Ctx.Provider value={{ s, d }}>{children}</Ctx.Provider>
}

export function useStore() {
  const c = useContext(Ctx)
  if (!c) throw new Error('StoreProvider missing')
  const { s, d } = c
  return {
    s,
    d,
    go: (screen: WargaScreen | PengepulScreen, opts?: { replace?: boolean; role?: Role; root?: boolean }) =>
      d({ type: 'go', screen, replace: opts?.replace, role: opts?.role, root: opts?.root }),
    back: () => d({ type: 'back' }),
  }
}
