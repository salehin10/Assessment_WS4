import { test, expect } from './pages/page_fixture';

test.describe('Air Ticket Booking Flow', () => {
  test('Complete booking flow with validation', async ({ airTicketPage, flightListPage }) => {
    await test.step('Navigate to air tickets page', async () => {
      await airTicketPage.goto();
    });

    await test.step('Validate page title', async () => {
      await airTicketPage.validateTitle();
    });

    await test.step('Select one way trip', async () => {
      await airTicketPage.selectOneWayTrip();
    });

    await test.step('Select tomorrow journey date', async () => {
      await airTicketPage.selectJourneyDate();
    });

    await test.step('Search for flights', async () => {
      await airTicketPage.clickSearchButton();
    });

    await test.step('Book first available flight', async () => {
      await flightListPage.bookFirstFlight();
    });

    await test.step('Validate total price', async () => {
      await flightListPage.validateTotalPrice();
    });

    await test.step('Click on the Continue', async () => {
      await flightListPage.clickContinueButton();
    })
  });
});





