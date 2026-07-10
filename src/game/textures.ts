import type Phaser from 'phaser'

/**
 * Placeholder pixel-art textures generated at runtime — zero external assets
 * in the POC, everything original by construction. Real 16-bit art replaces
 * these in M2 (see docs/design/visual-language.md).
 */

const P = 3 // pixel scale: 1 art pixel = 3 screen pixels

function px(g: Phaser.GameObjects.Graphics, color: number, x: number, y: number, w = 1, h = 1) {
  g.fillStyle(color, 1)
  g.fillRect(x * P, y * P, w * P, h * P)
}

const SKIN = 0xe8b89a
const HAIR = 0x6b4a2f
const SHIRT = 0x2f6f8f
const PANTS = 0x3d3d52
const SHOE = 0x2a2a2a

/** Draws a 16x24 walker; legPose: 0 = together, 1 = stride A, 2 = stride B. */
function drawFigure(g: Phaser.GameObjects.Graphics, legPose: 0 | 1 | 2) {
  // hair + head
  px(g, HAIR, 5, 0, 6, 2)
  px(g, SKIN, 5, 2, 6, 5)
  px(g, HAIR, 4, 1, 1, 3)
  // torso + arms
  px(g, SHIRT, 4, 7, 8, 7)
  px(g, SKIN, 3, 8, 1, 4)
  px(g, SKIN, 12, 8, 1, 4)
  // legs
  if (legPose === 0) {
    px(g, PANTS, 5, 14, 2, 8)
    px(g, PANTS, 9, 14, 2, 8)
    px(g, SHOE, 5, 22, 3, 2)
    px(g, SHOE, 9, 22, 3, 2)
  } else if (legPose === 1) {
    px(g, PANTS, 4, 14, 2, 7)
    px(g, PANTS, 10, 14, 2, 8)
    px(g, SHOE, 3, 21, 3, 2)
    px(g, SHOE, 10, 22, 3, 2)
  } else {
    px(g, PANTS, 6, 14, 2, 8)
    px(g, PANTS, 8, 14, 2, 7)
    px(g, SHOE, 6, 22, 3, 2)
    px(g, SHOE, 9, 21, 3, 2)
  }
}

export const PLAYER_FRAMES = {
  idle: 'player-idle',
  walk1: 'player-walk1',
  walk2: 'player-walk2',
} as const

export function createPlayerTextures(scene: Phaser.Scene): void {
  const poses: Array<[string, 0 | 1 | 2]> = [
    [PLAYER_FRAMES.idle, 0],
    [PLAYER_FRAMES.walk1, 1],
    [PLAYER_FRAMES.walk2, 2],
  ]
  for (const [key, pose] of poses) {
    if (scene.textures.exists(key)) continue
    const g = scene.add.graphics()
    drawFigure(g, pose)
    g.generateTexture(key, 16 * P, 24 * P)
    g.destroy()
  }
}
