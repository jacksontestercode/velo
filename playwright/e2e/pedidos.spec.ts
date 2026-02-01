import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

// Test Data
const order = 'VLO-MM4DYL';

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  await expect(page.getByText(order)).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText('APROVADO')).toBeVisible();
});

test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
  const order = 'VLO-ABC123'

  await page.goto('http://localhost:5173/')
  await expect(
    page.getByTestId('hero-section').getByRole('heading')
  ).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
  `)
})
