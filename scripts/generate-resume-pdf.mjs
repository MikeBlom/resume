/**
 * Generates the downloadable resume PDF from the site's /resume print view,
 * so the PDF always matches the single content source (ADR-0003) and never
 * contains private contact details (public contact is LinkedIn-only).
 *
 * Usage: npm run build && node scripts/generate-resume-pdf.mjs
 * Output: public/Mike-Blom-Resume.pdf (rebuild afterwards to include it in dist/)
 */
import { chromium } from 'playwright'
import { preview } from 'vite'

const server = await preview({ preview: { port: 4199, open: false } })
const browser = await chromium.launch()

try {
  const page = await browser.newPage()
  await page.goto('http://localhost:4199/resume', { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.pdf({
    path: 'public/Mike-Blom-Resume.pdf',
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.6in', bottom: '0.6in', left: '0.7in', right: '0.7in' },
  })
  console.log('Wrote public/Mike-Blom-Resume.pdf')
} finally {
  await browser.close()
  await server.close()
}
