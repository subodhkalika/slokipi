import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('root redirects to dashboard', async ({ page }) => {
    await page.goto('/')
    // Should redirect to /login (middleware) or /dashboard
    await expect(page).toHaveURL(/\/(dashboard|login)/)
  })

  test('protected routes redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/events')
    await expect(page).toHaveURL(/\/login/)
  })

  test('booking page is publicly accessible', async ({ page }) => {
    await page.goto('/book/alex-reed')
    // Should NOT redirect to login
    await expect(page).not.toHaveURL(/\/login/)
  })

  test('onboarding page loads', async ({ page }) => {
    await page.goto('/onboarding')
    await expect(page.getByText(/Slokipi/i)).toBeVisible()
  })
})
