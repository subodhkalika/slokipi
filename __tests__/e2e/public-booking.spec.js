import { test, expect } from '@playwright/test'

test.describe('Public Booking Page', () => {
  test('displays host profile info', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await expect(page.getByText('Alex Reed')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Design Consultant')).toBeVisible()
  })

  test('displays strategy session heading', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await expect(page.getByText(/strategy session/i)).toBeVisible({ timeout: 10000 })
  })

  test('calendar is interactive', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await expect(page.getByText('October 2023')).toBeVisible({ timeout: 10000 })
  })

  test('time slots are displayed', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Available Slots')).toBeVisible({ timeout: 10000 })
  })

  test('confirm meeting button exists', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('button', { name: /confirm meeting/i })).toBeVisible({ timeout: 10000 })
  })
})
