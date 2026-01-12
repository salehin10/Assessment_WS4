import { Page, expect, Locator } from '@playwright/test';

export class Airticketpage {
  private currentDate = new Date().toLocaleDateString('en-GB');
  private cookieButton: Locator;
  private pageHeading: Locator;
  private oneWayTab: Locator;
  private journeyDateInput: Locator;
  private datePicker: Locator;
  private searchButton: Locator;
  
  constructor(private page: Page) {
    this.cookieButton = this.page.getByRole('button', { name: /don't allow/i });
    this.pageHeading = this.page.getByRole('heading', { name: 'Popular Packages' }).first();
    this.oneWayTab = this.page.getByRole('tab', { name: 'One Way' }).first();
    this.journeyDateInput = this.page.locator('//input[@type=\'text\']').nth(4);
    this.datePicker = this.page.locator('//div[@class="react-datepicker"]').nth(0);
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('/air-tickets');
    await this.handleCookieConsent();
  }

  async handleCookieConsent() {
    await this.cookieButton.click().catch(() => {});
  }

  async validateTitle() {
    await expect(this.pageHeading).toBeVisible();
  }

  async selectOneWayTrip() {
    const currentDay = new Date().getDate();
    await this.oneWayTab.click();
  }

  async selectJourneyDate(){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrowDay = tomorrow.getDate();
    await this.journeyDateInput.click();
    await this.datePicker.focus();
    await this.page.getByRole('option', { name: `${tomorrowDay}th,` }).click();
  }

  async clickSearchButton(){
    await this.searchButton.click();
  }
}