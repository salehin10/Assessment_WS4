import { test, expect } from './pages/page_fixture';

test('has title', async ({ airTicketPage }) => {
  await airTicketPage.goto();
  await airTicketPage.validateTitle();
});

test('Select one way air trip', async ({ airTicketPage }) => {
  await airTicketPage.goto();
  await airTicketPage.selectOneWayTrip();
});

test('Select tomorrow journey date and search for available list', async({ airTicketPage,flightListPage }) => {
  await airTicketPage.goto();
  await airTicketPage.selectOneWayTrip();
  await airTicketPage.selectJourneyDate();
  await airTicketPage.clickSearchButton()
  await flightListPage.bookFirstFlight();
  await flightListPage.validateTotalPrice();
});





