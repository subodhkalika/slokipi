import { test, expect } from '@playwright/test'

test.describe('Public Booking Page', () => {
  test('booking page loads without error', async ({ page }) => {
    const response = await page.goto('/book/alex-reed')
    // Should not 500 — either shows profile or empty state
    expect(response.status()).toBeLessThan(500)
  })

  test('booking page shows header with host info', async ({ page }) => {
    await page.goto('/book/alex-reed')
    // Header renders from layout with host info
    await expect(page.getByRole('heading', { name: 'Alex Reed' })).toBeVisible({ timeout: 10000 })
  })

  test('calendar component renders', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await page.waitForLoadState('networkidle')
    // Calendar renders even without DB data (uses static October 2023)
    await expect(page.getByText('October 2023')).toBeVisible({ timeout: 10000 })
  })

  test('time slots section renders', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Available Slots')).toBeVisible({ timeout: 10000 })
  })

  test('continue button exists', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('button', { name: /continue to book/i })).toBeVisible({ timeout: 10000 })
  })
})
