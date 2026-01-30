import { test, expect } from '@playwright/test'


/// AAA - Arrange, Act, Assert


test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  
  // Checkpoint (faz parte da preparação)
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  // Act
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()

  // checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByTestId('search-order-id').fill('VLO-MM4DYL')

  // Act
  await page.getByTestId('search-order-button').click()
  
  // Assert
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-MM4DYL')
  
  // Assert
  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})