import { test, expect } from '@playwright/test';

test.describe('Checkout - validações', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/order');
    await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible();
  });

  test('deve validar obrigatoriedade de todos os campos em branco', async ({ page }) => {
    const submit = page.getByRole('button', { name: 'Confirmar Pedido' });

    const nameAlert = page.getByTestId('error-name');
    const surnameAlert = page.getByTestId('error-lastname');
    const emailAlert = page.getByTestId('error-email');
    const phoneAlert = page.getByTestId('error-phone');
    const cpfAlert = page.getByTestId('error-document');
    const storeAlert = page.getByTestId('error-store');
    const termsAlert = page.getByTestId('error-terms');

    // Act
    await submit.click();

    // Assert
    await expect(nameAlert).toHaveText('Nome deve ter pelo menos 2 caracteres');
    await expect(surnameAlert).toHaveText('Sobrenome deve ter pelo menos 2 caracteres');
    await expect(emailAlert).toHaveText('Email inválido');
    await expect(phoneAlert).toHaveText('Telefone inválido');
    await expect(cpfAlert).toHaveText('CPF inválido');
    await expect(storeAlert).toHaveText('Selecione uma loja');
    await expect(termsAlert).toHaveText('Aceite os termos');
  });

  test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ page }) => {
    const nome = page.getByTestId('checkout-name');
    const sobrenome = page.getByTestId('checkout-lastname');
    const submit = page.getByRole('button', { name: 'Confirmar Pedido' });

    const nameAlert = page.getByTestId('error-name');
    const surnameAlert = page.getByTestId('error-lastname');

    // Arrange
    await nome.fill('A');
    await sobrenome.fill('B');

    // Act
    await submit.click();

    // Assert
    await expect(nameAlert).toHaveText('Nome deve ter pelo menos 2 caracteres');
    await expect(surnameAlert).toHaveText('Sobrenome deve ter pelo menos 2 caracteres');
  });

  test('deve exibir erro para e-mail com formato inválido', async ({ page }) => {
    const nome = page.getByTestId('checkout-name');
    const sobrenome = page.getByTestId('checkout-lastname');
    const email = page.getByTestId('checkout-email');
    const submit = page.getByRole('button', { name: 'Confirmar Pedido' });

    const emailAlert = page.getByTestId('error-email');

    // Arrange
    await nome.fill('João');
    await sobrenome.fill('Silva');
    await email.fill('cliente@.com');

    // Act
    await submit.click();

    // Assert
    await expect(emailAlert).toHaveText('Email inválido');
  });

  test('deve exibir erro para CPF inválido', async ({ page }) => {
    const cpf = page.getByTestId('checkout-document');
    const submit = page.getByRole('button', { name: 'Confirmar Pedido' });

    const cpfAlert = page.getByTestId('error-document');

    // Arrange
    await cpf.fill('123');

    // Act
    await submit.click();

    // Assert
    await expect(cpfAlert).toHaveText('CPF inválido');
  });

  test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ page }) => {
    const email = page.getByTestId('checkout-email');
    const telefone = page.getByTestId('checkout-phone');
    const cpf = page.getByTestId('checkout-document');
    const loja = page.getByTestId('checkout-store');
    const termos = page.getByTestId('checkout-terms');
    const submit = page.getByRole('button', { name: 'Confirmar Pedido' });

    const termsAlert = page.getByTestId('error-terms');

    // Arrange
    await email.fill('joao.silva@email.com');
    await telefone.fill('(11) 99999-9999');
    await cpf.fill('529.982.247-25');
    await loja.click();
    await page.getByRole('option', { name: /Velô Paulista/ }).click();

    await expect(termos).not.toBeChecked(); // Premissa inicial

    // Act
    await submit.click();

    // Assert
    await expect(termsAlert).toHaveText('Aceite os termos');
  });
});
