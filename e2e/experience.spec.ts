import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('the interactive experience', () => {
  test('intro offers the world, the resume, and story mode', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: 'Mike Blom' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Enter the world' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View resume' })).toBeVisible()
    await expect(page.getByRole('button', { name: /story mode/i })).toBeVisible()
  })

  test('entering the world loads the canvas and the cloud layer opens with Esc', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Enter the world' }).click()
    await expect(page.locator('.game-canvas canvas')).toBeVisible({ timeout: 15000 })

    await page.keyboard.press('Escape')
    const cloud = page.getByRole('dialog', { name: /above the world/i })
    await expect(cloud).toBeVisible()
    await expect(cloud.getByRole('link', { name: /traditional resume/i })).toBeVisible()
  })

  test('world index opens content panels without playing (DOM source of record)', async ({
    page,
  }) => {
    await page.goto('/?mode=game')
    await expect(page.locator('.game-canvas canvas')).toBeVisible({ timeout: 15000 })
    await page.getByRole('button', { name: /clouds/i }).click()
    await page.getByRole('button', { name: 'The Paper Route' }).click()

    const panel = page.getByRole('dialog', { name: 'The Paper Route' })
    await expect(panel).toBeVisible()
    await expect(panel.getByText(/delivering newspapers/i)).toBeVisible()
    // the door object exposes the mini-game entrance
    await expect(panel.getByRole('button', { name: 'Step through the door' })).toBeVisible()
    await panel.getByRole('button', { name: 'Back to the world' }).click()
    await expect(panel).not.toBeVisible()
  })

  test('mini-game shell: enter through the door and leave again', async ({ page }) => {
    await page.goto('/?mode=game')
    await expect(page.locator('.game-canvas canvas')).toBeVisible({ timeout: 15000 })
    await page.getByRole('button', { name: /clouds/i }).click()
    await page.getByRole('button', { name: 'The Paper Route' }).click()
    await page.getByRole('button', { name: 'Step through the door' }).click()

    const leave = page.getByRole('button', { name: 'Leave the mini-game' })
    await expect(leave).toBeVisible()
    await leave.click()
    await expect(leave).not.toBeVisible()
  })

  test('story mode presents the full journey as accessible HTML', async ({ page }) => {
    await page.goto('/?mode=story')
    await expect(page.getByRole('heading', { name: /the journey/i })).toBeVisible()
    await expect(
      page.getByRole('heading', { level: 2, name: 'Youth in the Netherlands' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: '2003 — Leaving for America' })).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Director of Engineering · Instructure/ }),
    ).toBeVisible()

    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})
