import Phaser from 'phaser'
import { bus, controls } from '../bus'
import {
  INTERACT_RADIUS,
  WORLD,
  buildWorld,
  type WorldLayout,
  type WorldObject,
} from '../worldConfig'
import { createPlayerTextures, PLAYER_FRAMES } from '../textures'

const COLORS = {
  nlSky: 0xb7d9ec,
  nlGrass: 0x5a9e4b,
  nlDirt: 0x8a6444,
  canal: 0x4a7fa8,
  windmill: 0x8f3a20,
  blade: 0xf4f1de,
  brick: 0xa04a35,
  roof: 0x5c3a2e,
  tulipA: 0xd94f4f,
  tulipB: 0xe8b83a,
  transitionSky: 0x51789e,
  sea: 0x2f5d80,
  gate: 0x1d3557,
  techSky: 0x232a45,
  techGround: 0x3a415e,
  building: 0x161b30,
  window: 0x7de08a,
  accent: 0xe07a5f,
  cream: 0xf4f1de,
} as const

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private keys!: Record<'a' | 'd' | 'w' | 'e', Phaser.Input.Keyboard.Key>
  private layout!: WorldLayout
  private nearId: string | null = null
  private sectionId = ''
  private unsubscribers: Array<() => void> = []

  constructor() {
    super('world')
  }

  create() {
    this.layout = buildWorld(this.registry.get('resume'))
    createPlayerTextures(this)

    this.physics.world.setBounds(0, 0, WORLD.width, WORLD.height)
    this.cameras.main.setBounds(0, 0, WORLD.width, WORLD.height)

    this.paintBackdrop()
    const ground = this.buildGround()
    this.paintDecorations()
    this.buildObjects()

    this.player = this.physics.add.sprite(120, WORLD.groundY - 40, PLAYER_FRAMES.idle)
    this.player.setCollideWorldBounds(true)
    this.player.setSize(36, 70).setOffset(6, 2)
    this.physics.add.collider(this.player, ground)
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12)

    this.anims.create({
      key: 'walk',
      frames: [
        { key: PLAYER_FRAMES.walk1 },
        { key: PLAYER_FRAMES.idle },
        { key: PLAYER_FRAMES.walk2 },
      ],
      frameRate: 8,
      repeat: -1,
    })

    const keyboard = this.input.keyboard!
    this.cursors = keyboard.createCursorKeys()
    this.keys = {
      a: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      d: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      w: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      e: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    }

    this.unsubscribers.push(
      bus.on('overlay', ({ open }) => (open ? this.scene.pause() : this.scene.resume())),
      bus.on('minigame', ({ active }) => {
        if (active) this.scene.switch('minigame')
      }),
    )
    this.events.on(Phaser.Scenes.Events.DESTROY, () => this.unsubscribers.forEach((off) => off()))
  }

  update() {
    const left = this.cursors.left.isDown || this.keys.a.isDown || controls.left
    const right = this.cursors.right.isDown || this.keys.d.isDown || controls.right
    const jump =
      this.cursors.up.isDown || this.cursors.space.isDown || this.keys.w.isDown || controls.jump

    const speed = 250
    if (left && !right) {
      this.player.setVelocityX(-speed)
      this.player.setFlipX(true)
    } else if (right && !left) {
      this.player.setVelocityX(speed)
      this.player.setFlipX(false)
    } else {
      this.player.setVelocityX(0)
    }

    const onGround = this.player.body!.blocked.down
    if (jump && onGround) this.player.setVelocityY(-520)

    if (onGround && (left || right)) this.player.anims.play('walk', true)
    else {
      this.player.anims.stop()
      this.player.setTexture(onGround ? PLAYER_FRAMES.idle : PLAYER_FRAMES.walk1)
    }

    this.trackNearObject()
    this.trackSection()

    const interactPressed = Phaser.Input.Keyboard.JustDown(this.keys.e) || controls.interact
    controls.interact = false
    if (interactPressed && this.nearId) bus.emit('interact', { id: this.nearId })
  }

  private trackNearObject() {
    let nearest: WorldObject | null = null
    let best = INTERACT_RADIUS
    for (const object of this.layout.objects) {
      const distance = Math.abs(object.x - this.player.x)
      if (distance < best) {
        best = distance
        nearest = object
      }
    }
    const id = nearest?.id ?? null
    if (id !== this.nearId) {
      this.nearId = id
      bus.emit('near', { id })
    }
  }

  private trackSection() {
    const section = this.layout.sections.find(
      (s) => this.player.x >= s.from && this.player.x < s.to,
    )
    if (section && section.id !== this.sectionId) {
      this.sectionId = section.id
      bus.emit('section', { id: section.id })
    }
  }

  private buildGround() {
    const ground = this.physics.add.staticGroup()
    const g = this.add.rectangle(
      WORLD.width / 2,
      WORLD.groundY + 32,
      WORLD.width,
      64,
      COLORS.nlDirt,
    )
    ground.add(g)
    // a few floating platforms so jumping has a point
    for (const [x, y, w] of [
      [700, 360, 140],
      [1380, 340, 140],
      [2420, 350, 150],
      [3100, 330, 150],
    ]) {
      ground.add(this.add.rectangle(x, y, w, 22, COLORS.gate))
    }
    return ground
  }

  private paintBackdrop() {
    const skyFor = (theme: string) =>
      theme === 'netherlands'
        ? COLORS.nlSky
        : theme === 'transition'
          ? COLORS.transitionSky
          : COLORS.techSky
    for (const section of this.layout.sections) {
      this.add
        .rectangle(section.from, 0, section.to - section.from, WORLD.height, skyFor(section.theme))
        .setOrigin(0, 0)
        .setDepth(-20)
      const grass = section.theme === 'tech' ? COLORS.techGround : COLORS.nlGrass
      this.add
        .rectangle(section.from, WORLD.groundY - 6, section.to - section.from, 14, grass)
        .setOrigin(0, 0)
        .setDepth(-2)
    }
  }

  private paintDecorations() {
    const d = (depth = -10) => this.add.graphics().setDepth(depth)

    // — Netherlands: windmill, houses, tulips, canal —
    const wm = d()
    wm.fillStyle(COLORS.windmill).fillRect(480, 250, 70, 220)
    wm.fillStyle(COLORS.blade)
    wm.fillRect(505, 130, 16, 130)
    wm.fillRect(450, 190, 130, 16)
    for (const hx of [1000, 1120]) {
      const house = d()
      house.fillStyle(COLORS.brick).fillRect(hx, 380, 90, 90)
      house.fillStyle(COLORS.roof).fillTriangle(hx - 8, 380, hx + 98, 380, hx + 45, 320)
      house.fillStyle(COLORS.cream).fillRect(hx + 30, 410, 28, 60)
    }
    const tulips = d(-3)
    for (let x = 180; x < 1500; x += 46) {
      tulips.fillStyle(x % 92 === 0 ? COLORS.tulipA : COLORS.tulipB)
      tulips.fillRect(x, WORLD.groundY - 14, 8, 8)
    }
    const canal = d(-1)
    canal.fillStyle(COLORS.canal).fillRect(1340, WORLD.groundY - 4, 120, 40)

    // — Transition: harbor gate + sea —
    const sea = d(-5)
    sea.fillStyle(COLORS.sea).fillRect(1560, WORLD.groundY - 30, 400, 100)
    const gate = d(-4)
    gate.fillStyle(COLORS.gate)
    gate.fillRect(1690, 220, 30, 260)
    gate.fillRect(1810, 220, 30, 260)
    gate.fillRect(1690, 190, 150, 34)
    this.add
      .text(1765, 207, '2003', { fontFamily: 'Courier New', fontSize: '22px', color: '#f4f1de' })
      .setOrigin(0.5)
      .setDepth(-3)

    // — Tech: skyline with lit windows, big terminal —
    for (const [bx, bw, bh] of [
      [2100, 110, 220],
      [2350, 90, 300],
      [2700, 130, 260],
      [3050, 100, 320],
      [3300, 140, 240],
    ]) {
      const b = d(-8)
      b.fillStyle(COLORS.building).fillRect(bx, WORLD.groundY - bh, bw, bh)
      b.fillStyle(COLORS.window)
      for (let wy = WORLD.groundY - bh + 18; wy < WORLD.groundY - 24; wy += 34) {
        for (let wx = bx + 14; wx < bx + bw - 18; wx += 30) {
          if ((wx + wy) % 3 !== 0) b.fillRect(wx, wy, 12, 16)
        }
      }
    }
  }

  private buildObjects() {
    for (const object of this.layout.objects) {
      const baseY = WORLD.groundY - 6
      const g = this.add.graphics().setDepth(-1)

      if (object.kind === 'door') {
        g.fillStyle(COLORS.roof).fillRect(object.x - 26, baseY - 84, 52, 84)
        g.fillStyle(COLORS.accent).fillRect(object.x - 18, baseY - 74, 36, 74)
        g.fillStyle(COLORS.cream).fillCircle(object.x + 10, baseY - 38, 3)
      } else if (object.kind === 'gate') {
        // decorative pillars are painted in paintDecorations; just a plinth here
        g.fillStyle(COLORS.gate).fillRect(object.x - 30, baseY - 12, 60, 12)
      } else if (object.kind === 'beacon') {
        g.fillStyle(COLORS.gate).fillRect(object.x - 6, baseY - 46, 12, 46)
        g.fillStyle(COLORS.window).fillRect(object.x - 16, baseY - 74, 32, 28)
      } else {
        g.fillStyle(COLORS.roof).fillRect(object.x - 4, baseY - 52, 8, 52)
        g.fillStyle(COLORS.cream).fillRect(object.x - 34, baseY - 78, 68, 30)
      }

      const marker = this.add
        .text(object.x, baseY - 108, '!', {
          fontFamily: 'Courier New',
          fontSize: '28px',
          color: '#e07a5f',
          fontStyle: 'bold',
        })
        .setOrigin(0.5)
      if (!this.registry.get('reducedMotion')) {
        this.tweens.add({
          targets: marker,
          y: marker.y - 10,
          duration: 700,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inout',
        })
      }

      this.add
        .text(object.x, baseY + 26, object.label, {
          fontFamily: 'Courier New',
          fontSize: '15px',
          color: '#f4f1de',
          backgroundColor: '#1d3557',
          padding: { x: 6, y: 2 },
        })
        .setOrigin(0.5, 0)
    }
  }
}
