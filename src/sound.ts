/** Tiny synthesized "tok" (wood knock) for the Ketuk Palu moment — no audio files needed. */
let ctx: AudioContext | null = null
export function tok(times = 1) {
  try {
    ctx ??= new AudioContext()
    for (let i = 0; i < times; i++) {
      const t = ctx.currentTime + i * 0.16
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.setValueAtTime(520, t)
      o.frequency.exponentialRampToValueAtTime(140, t + 0.09)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.005)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
      o.connect(g).connect(ctx.destination)
      o.start(t); o.stop(t + 0.15)
    }
  } catch { /* audio not available */ }
}
