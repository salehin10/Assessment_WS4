import { test as base } from '@playwright/test';
import { Airticketpage } from './airticketpage';
import { FlightListPage } from './flightlistpage';

type PageFixtures = {
  airTicketPage: Airticketpage;
  flightListPage: FlightListPage;
};

export const test = base.extend<PageFixtures>({
  airTicketPage: async ({ page }, use) => {
    await use(new Airticketpage(page));
  },
  
  flightListPage: async ({ page }, use) => {
    await use(new FlightListPage(page));
  },
});

export { expect } from '@playwright/test';