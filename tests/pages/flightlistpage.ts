import { Page ,expect } from '@playwright/test';

export class FlightListPage {
  constructor(private page: Page) {}

  async bookFirstFlight() {
   await this.page.getByRole('button', {name: 'BOOK TICKET'}).first().click();
  }

  async validateTotalPrice(){
      const priceRows = this.page.locator(
          '.Flight_fareDetails__iZg1d .d-flex.justify-content-between:not(.total_p)'
      );

      let calculatedTotal = 0;
      const rowCount = await priceRows.count();

      for (let i = 0; i < rowCount; i++) {
          const row = priceRows.nth(i);

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
      const displayedTotalText = await this.page.locator('.total_a').innerText();
      const displayedTotal = Number(displayedTotalText.replace('৳', '').replace(/,/g, '').trim());
      expect(calculatedTotal).toBe(displayedTotal);
  }

  async clickContinueButton() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }


}