import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {
  return {
    elements: {
      alerts: {
        name: page.locator('//label[text()="Nome"]/..//p'),
        lastname: page.locator('//label[text()="Sobrenome"]/..//p'),
        email: page.locator('//label[text()="Email"]/..//p'),
        phone: page.locator('//label[text()="Telefone"]/..//p'),
        document: page.locator('//label[text()="CPF"]/..//p'),
        store: page.locator('//label[text()="Loja para Retirada"]/..//p'),
        terms: page.locator('//label[@for="terms"]/following-sibling::p'),
      },
      terms: page.getByTestId('checkout-terms'),
    },

    async expectLoaded() {
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async expectSummaryTotal(price: string) {
      await expect(page.getByTestId('summary-total-price')).toHaveText(price)
    },

    async fillPersonalData(data: {
      name: string
      surname: string
      email: string
      phone: string
      cpf: string
    }) {
      await page.getByTestId('checkout-name').fill(data.name)
      await page.getByTestId('checkout-lastname').fill(data.surname)
      await page.getByTestId('checkout-email').fill(data.email)
      await page.getByTestId('checkout-phone').fill(data.phone)
      await page.getByTestId('checkout-document').fill(data.cpf)
    },

    async fillCustomerlData(data: {
      name: string
      lastname: string
      email: string
      document: string
      phone: string
    }) {
      await page.getByTestId('checkout-name').fill(data.name)
      await page.getByTestId('checkout-lastname').fill(data.lastname)
      await page.getByTestId('checkout-email').fill(data.email)
      await page.getByTestId('checkout-phone').fill(data.phone)
      await page.getByTestId('checkout-document').fill(data.document)
    },

    async selectStore(storeName: string) {
      await page.getByTestId('checkout-store').click()
      await page.getByRole('option', { name: storeName }).click()
    },

    async selectPaymentMethod(method: string) {
      const normalized = method
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
      if (normalized.includes('avista') || normalized.includes('a vista')) {
        await page.getByTestId('payment-avista').click()
      } else if (normalized.includes('financiamento')) {
        await page.getByTestId('payment-financiamento').click()
      } else {
        throw new Error(`Método de pagamento desconhecido: ${method}`)
      }
    },

    async fillDownPayment(value: string) {
      await page.getByTestId('input-entry-value').fill(value)
    },

    async acceptTerms() {
      await page.getByTestId('checkout-terms').check()
    },

    async submit() {
      await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
    },

    async expectResult(message: string) {
      await expect(page.getByTestId('success-status')).toHaveText(message)
    },
  }
}
