import { Page, expect } from '@playwright/test';

export class Airticketpage {
  private currentDate = new Date().toLocaleDateString('en-GB');
  
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/air-tickets');
    await this.handleCookieConsent();
  }

  async handleCookieConsent() {
    await this.page.getByRole('button', { name: /don't allow/i }).click().catch(() => {});
  }

  async validateTitle() {
 await expect(this.page.getByRole('heading', { name: 'Popular Packages' }).first()).toBeVisible();
  }
  async selectOneWayTrip() {
     const currentDay = new Date().getDate();
     await this.page.getByRole('tab', { name: 'One Way' }).first().click();
  }

  async selectJourneyDate(){
   let tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);
   let tomorrowDay = tomorrow.getDate();
    await this.page.locator('//input[@type=\'text\']').nth(4).click();
    await this.page.locator('//div[@class="react-datepicker"]').nth(0).focus();
    await this.page.getByRole('option', { name: `${tomorrowDay}th,` }).click();
  }

  async clickSearchButton(){
    await this.page.getByRole('button', { name: 'Search' }).click();
  }
}