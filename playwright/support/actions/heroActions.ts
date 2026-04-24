import { Page, expect } from '@playwright/test'

export function createHeroActions(page: Page) {
  return {
    async open() {
      await page.goto('/')
      await expect(page.getByTestId('hero-section')).toBeVisible()
      await page.getByTestId('hero-cta-primary').click()
      await expect(page).toHaveURL(/\/configure/)
    },
  }
}
