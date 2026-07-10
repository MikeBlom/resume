/**
 * Original ambient loop synthesized with WebAudio — no external audio assets,
 * nothing to license, nothing Nintendo-adjacent. Muted by default; toggled
 * from the cloud layer. Replaced by real chiptune-style tracks in M2+.
 */

const PATTERN = [392, 494, 587, 740, 587, 494, 440, 330] // G major pentatonic-ish, gentle
const STEP_MS = 340
const GAIN = 0.035

class Ambient {
  private ctx: AudioContext | null = null
  private timer: ReturnType<typeof setInterval> | null = null
  private step = 0

  start() {
    if (this.timer) return
    this.ctx ??= new AudioContext()
    void this.ctx.resume()
    this.timer = setInterval(() => this.playStep(), STEP_MS)
  }

  stop() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    void this.ctx?.suspend()
  }

  private playStep() {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = PATTERN[this.step % PATTERN.length]
    gain.gain.setValueAtTime(GAIN, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)
    osc.connect(gain).connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.32)
    this.step += 1
  }
}

export const ambient = new Ambient()
