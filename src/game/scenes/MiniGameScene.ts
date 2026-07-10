import Phaser from 'phaser'
import { bus } from '../bus'

/**
 * M1 mini-game *shell*: proves the architecture (scene transfer, pause state,
 * return-to-position — the world scene sleeps, so the player wakes up exactly
 * where they entered). The real Paper Route game lands here in M3.
 */
export class MiniGameScene extends Phaser.Scene {
  private unsubscribers: Array<() => void> = []

  constructor() {
    super('minigame')
  }

  create() {
    const { width, height } = this.scale
    this.add.rectangle(0, 0, width, height, 0x14263f).setOrigin(0)

    this.add
      .text(width / 2, height / 2 - 60, 'PAPER ROUTE', {
        fontFamily: 'Courier New',
        fontSize: '42px',
        color: '#e07a5f',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
    this.add
      .text(
        width / 2,
        height / 2 + 4,
        'The playable mini-game arrives in a future build.\nFor now this doorway proves you can step out of the story —\nand back into it, right where you left.',
        { fontFamily: 'Courier New', fontSize: '18px', color: '#f4f1de', align: 'center' },
      )
      .setOrigin(0.5)

    this.unsubscribers.push(
      bus.on('minigame', ({ active }) => {
        if (!active) this.scene.switch('world')
      }),
      bus.on('overlay', ({ open }) => (open ? this.scene.pause() : this.scene.resume())),
    )
    this.events.on(Phaser.Scenes.Events.DESTROY, () => this.unsubscribers.forEach((off) => off()))
  }
}
