import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';

// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
    // Arrange
    const order = 'VLO-MM4DYL';

    await page.goto('http://localhost:5173/');

    // Checkpoint 1: Página inicial carregada
    await expect(
        page.getByTestId('hero-section').getByRole('heading')
    ).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();

    // Checkpoint 2: Página de consulta carregada
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    // Act
    const input = page.getByTestId('search-order-id');
    await expect(input).toBeVisible();
    await input.fill(order);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    // Assert
    const containerPedido = page
        .getByRole('paragraph')
        .filter({ hasText: /^Pedido$/ })
        .locator('..');

    await expect(containerPedido).toContainText(order, { timeout: 10_000 });
    await expect(page.getByText('APROVADO')).toBeVisible();
});

test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    // Arrange
    const order = generateOrderCode();

    await page.goto('http://localhost:5173/');

    // Checkpoint 1: Página inicial carregada
    await expect(
        page.getByTestId('hero-section').getByRole('heading')
    ).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();

    // Checkpoint 2: Página de consulta carregada
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    // Act
    const input = page.getByTestId('search-order-id');
    await expect(input).toBeVisible();
    await input.fill(order);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
    `);
});
