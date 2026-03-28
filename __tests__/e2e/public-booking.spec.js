import { test, expect } from '@playwright/test'

test.describe('Public Booking Page', () => {
  test('displays host profile info', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await expect(page.getByText('Alex Reed')).toBeVisible()
    await expect(page.getByText('Design Consultant')).toBeVisible()
  })

  test('displays strategy session heading', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await expect(page.getByText(/strategy session/i)).toBeVisible()
  })

  test('calendar is interactive', async ({ page }) => {
    await page.goto('/book/alex-reed')
    // Calendar should be visible
    await expect(page.getByText('October 2023')).toBeVisible()
  })

  test('time slots are displayed', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await expect(page.getByText('Available Slots')).toBeVisible()
  })

  test('confirm meeting button exists', async ({ page }) => {
    await page.goto('/book/alex-reed')
    await expect(page.getByRole('button', { name: /confirm meeting/i })).toBeVisible()
  })
})
