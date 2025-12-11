import { test, expect } from "@playwright/test"

test("homepage loads successfully", async ({ page }) => {
  await page.goto("/")
  
  // Check for main heading
  await expect(page.locator("h1")).toContainText("WellWave Frontend")
  
  // Check for description
  await expect(page.getByText("Sistema de Anamnese Digital para Emergências")).toBeVisible()
  
  // Check for feature cards
  await expect(page.getByText("Anamnese Digital")).toBeVisible()
  await expect(page.getByText("Red Flags")).toBeVisible()
  await expect(page.getByText("Chat EBM")).toBeVisible()
})
