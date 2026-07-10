import Phaser from 'phaser'
import type { Resume } from '../content/schema'
import { MiniGameScene } from './scenes/MiniGameScene'
import { WorldScene } from './scenes/WorldScene'

/**
 * Game factory — the only entry point the React shell touches. This module
 * (and Phaser with it) is loaded via dynamic import so /resume never pays
 * for the engine bundle (ADR-0001).
 */
export function createGame(
  parent: HTMLElement,
  resume: Resume,
  options: { reducedMotion: boolean },
): Phaser.Game {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 540,
    pixelArt: true,
    backgroundColor: '#b7d9ec',
    physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 1100 } } },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [WorldScene, MiniGameScene],
  })
  game.registry.set('resume', resume)
  game.registry.set('reducedMotion', options.reducedMotion)
  return game
}
