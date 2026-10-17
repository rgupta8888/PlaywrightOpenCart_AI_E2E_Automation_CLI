import { test as base } from '@playwright/test';
import { IndigoHomePage } from '../pages/IndigoHomePage';
import { IndigoFlightSelectionPage } from '../pages/IndigoFlightSelectionPage';
import { IndigoPassengerDetailsPage } from '../pages/IndigoPassengerDetailsPage';

type IndigoFixtures = {
    indigoHomePage: IndigoHomePage;
    indigoFlightSelectionPage: IndigoFlightSelectionPage;
    indigoPassengerDetailsPage: IndigoPassengerDetailsPage;
};

export const test = base.extend<IndigoFixtures>({
    indigoHomePage: async ({ page }, use) => {
        await use(new IndigoHomePage(page));
    },
    indigoFlightSelectionPage: async ({ page }, use) => {
        await use(new IndigoFlightSelectionPage(page));
    },
    indigoPassengerDetailsPage: async ({ page }, use) => {
        await use(new IndigoPassengerDetailsPage(page));
    },
});

export { expect } from '@playwright/test';