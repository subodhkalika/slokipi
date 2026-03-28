import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Welcome back')).toBeVisible()
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible()
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('signup page renders correctly', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.getByText('Create your account')).toBeVisible()
    await expect(page.getByPlaceholder('Alexander Pierce')).toBeVisible()
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible()
  })

  test('login page has link to signup', async ({ page }) => {
    await page.goto('/login')
    const signupLink = page.getByRole('link', { name: /sign up/i })
    await expect(signupLink).toBeVisible()
    await signupLink.click()
    await expect(page).toHaveURL(/\/signup/)
  })

  test('signup page has link to login', async ({ page }) => {
    await page.goto('/signup')
    const loginLink = page.getByRole('link', { name: /sign in/i })
    await expect(loginLink).toBeVisible()
    await loginLink.click()
    await expect(page).toHaveURL(/\/login/)
  })

  test('forgot password page renders', async ({ page }) => {
    await page.goto('/forgot-password')
    await expect(page.getByText('Forgot your password?')).toBeVisible()
    await expect(page.getByRole('button', { name: /send reset link/i })).toBeVisible()
  })

  test('login shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('you@example.com').fill('fake@test.com')
    await page.getByPlaceholder('Enter your password').fill('wrongpassword')
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByText(/invalid/i)).toBeVisible({ timeout: 10000 })
  })

  test('password visibility toggle works', async ({ page }) => {
    await page.goto('/login')
    const passwordInput = page.getByPlaceholder('Enter your password')
    await expect(passwordInput).toHaveAttribute('type', 'password')
    await page.getByText('visibility').click()
    await expect(passwordInput).toHaveAttribute('type', 'text')
  })
})
