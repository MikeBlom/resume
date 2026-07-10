import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('/resume — the fast path', () => {
  test('shows the real resume with PDF download and no placeholder banner', async ({ page }) => {
    await page.goto('/resume')
    await expect(page.getByRole('heading', { level: 1, name: 'Mike Blom' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
    await expect(page.getByText('Director of Engineering · Instructure')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
      'href',
      '/Mike-Blom-Resume.pdf',
    )
    await expect(page.getByRole('note')).toHaveCount(0)
  })

  test('has no axe accessibility violations', async ({ page }) => {
    await page.goto('/resume')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})
