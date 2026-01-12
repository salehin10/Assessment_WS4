import { Page, expect, Locator } from '@playwright/test';

export class FlightListPage {
  private bookTicketButton: Locator;
  private priceRows: Locator;
  private totalAmount: Locator;
  private continueButton: Locator;

  constructor(private page: Page) {
    this.bookTicketButton = this.page.getByRole('button', {name: 'BOOK TICKET'}).first();
    this.priceRows = this.page.locator('.Flight_fareDetails__iZg1d .d-flex.justify-content-between:not(.total_p)');
    this.totalAmount = this.page.locator('.total_a');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async bookFirstFlight() {
    await this.bookTicketButton.click();
  }

  async validateTotalPrice(){
    let calculatedTotal = 0;
    const rowCount = await this.priceRows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = this.priceRows.nth(i);

      const description = (await row.locator('div').first().innerText())
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
      const amountText = await row.locator('div').last().innerText();
      const amount = Number(amountText.replace('৳', '').replace(/,/g, '').trim());

      if (isNaN(amount)) continue;
      if (description.includes('discount')) {
        calculatedTotal -= amount;
      } else {
        calculatedTotal += amount;
      }
    }
    const displayedTotalText = await this.totalAmount.innerText();
    const displayedTotal = Number(displayedTotalText.replace('৳', '').replace(/,/g, '').trim());
    expect(calculatedTotal).toBe(displayedTotal);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}