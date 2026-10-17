import { Page, Locator } from '@playwright/test';

export class IndigoHomePage {
    private readonly page: Page;

    // Locators
    private readonly acceptCookiesButton: Locator;
    private readonly dismissButton: Locator;
    private readonly oneWayRadio: Locator;
    private readonly fromField: Locator;
    private readonly toField: Locator;
    private readonly departureDateField: Locator;
    private readonly passengerField: Locator;
    private readonly searchButton: Locator;
    private readonly flightsTab: Locator;
    private readonly indigoCardsTab: Locator;
    private readonly hotelsTab: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All' });
        this.dismissButton = page.getByRole('button', { name: 'Dismiss' });
        this.oneWayRadio = page.locator('#radio-input-triptype-oneWay');
        this.fromField = page.locator('[aria-label*="sourceCity"] input');
        this.toField = page.locator('[aria-label*="destinationCity"] input');
        this.departureDateField = page.locator('[aria-label*="departureDate"]');
        this.passengerField = page.locator('[aria-label="Pax Selection"]');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.flightsTab = page.locator('.bookingmf-container__tabs--item').filter({ hasText: 'Flights' });
        this.indigoCardsTab = page.locator('.bookingmf-container__tabs--item').filter({ hasText: 'IndiGo Cards' });
        this.hotelsTab = page.locator('.bookingmf-container__tabs--item').filter({ hasText: 'Hotels' });
    }

    /**
     * Navigates to the IndiGo homepage and handles overlays
     */
    async navigate(): Promise<void> {
        await this.page.goto('https://www.goindigo.in/');
        await this.page.waitForTimeout(3000);
        // Accept cookies if visible - the cookie dialog is a modal overlay
        try {
            const cookieDialog = this.page.locator('[role="dialog"][aria-label="cookieconsent"]');
            if (await cookieDialog.isVisible({ timeout: 5000 })) {
                const acceptBtn = cookieDialog.getByRole('button', { name: 'Accept All' });
                if (await acceptBtn.isVisible({ timeout: 2000 })) {
                    await acceptBtn.click();
                    await this.page.waitForTimeout(1500);
                }
            }
        } catch {
            // Cookie banner not present
        }
        // Dismiss promo banner if visible
        try {
            if (await this.dismissButton.isVisible({ timeout: 2000 })) {
                await this.dismissButton.click();
                await this.page.waitForTimeout(500);
            }
        } catch {
            // Promo not present
        }
    }

    /**
     * Accepts the cookie consent banner if visible
     */
    async acceptCookies(): Promise<void> {
        try {
            if (await this.acceptCookiesButton.isVisible({ timeout: 3000 })) {
                await this.acceptCookiesButton.click();
                await this.page.waitForTimeout(500);
            }
        } catch {
            // Cookie banner not present
        }
    }

    /**
     * Dismisses any promo banner if visible
     */
    async dismissPromo(): Promise<void> {
        try {
            if (await this.dismissButton.isVisible({ timeout: 2000 })) {
                await this.dismissButton.click();
                await this.page.waitForTimeout(500);
            }
        } catch {
            // Promo not present
        }
    }

    /**
     * Checks if the main menu options are displayed
     * @returns Promise<boolean> - true if Flights, IndiGo Cards, and Hotels tabs are visible
     */
    async areMenuOptionsDisplayed(): Promise<boolean> {
        try {
            const flightsVisible = await this.flightsTab.isVisible();
            const cardsVisible = await this.indigoCardsTab.isVisible();
            const hotelsVisible = await this.hotelsTab.isVisible();
            console.log(`Menu visibility - Flights: ${flightsVisible}, Cards: ${cardsVisible}, Hotels: ${hotelsVisible}`);
            return flightsVisible && cardsVisible && hotelsVisible;
        } catch (error) {
            console.log(`Error checking menu options: ${error}`);
            return false;
        }
    }

    /**
     * Selects One Way as the trip type
     */
    async selectOneWay(): Promise<void> {
        await this.oneWayRadio.click();
    }

    /**
     * Sets the departure city
     * @param city - The city name to search for
     */
    async setFromCity(city: string): Promise<void> {
        await this.fromField.click();
        await this.fromField.fill(city);
        await this.page.waitForTimeout(1000);
        // Select the first suggestion
        const suggestion = this.page.locator('.popover__wrapper .search-suggestion-item, [class*="suggestion"]').first();
        if (await suggestion.isVisible({ timeout: 3000 }).catch(() => false)) {
            await suggestion.click();
        }
        await this.page.waitForTimeout(500);
    }

    /**
     * Sets the arrival city
     * @param city - The city name to search for
     */
    async setToCity(city: string): Promise<void> {
        await this.toField.click();
        await this.toField.fill(city);
        await this.page.waitForTimeout(1000);
        const suggestion = this.page.locator('.popover__wrapper .search-suggestion-item, [class*="suggestion"]').first();
        if (await suggestion.isVisible({ timeout: 3000 }).catch(() => false)) {
            await suggestion.click();
        }
        await this.page.waitForTimeout(500);
    }

    /**
     * Gets the selected departure city text
     * @returns Promise<string> - the selected from city
     */
    async getFromCity(): Promise<string> {
        return await this.fromField.inputValue() || '';
    }

    /**
     * Gets the selected arrival city text
     * @returns Promise<string> - the selected to city
     */
    async getToCity(): Promise<string> {
        return await this.toField.inputValue() || '';
    }

    /**
     * Selects a departure date within the next 7 days
     * @param daysFromNow - Number of days from today (1-7)
     */
    async selectDepartureDate(daysFromNow: number): Promise<void> {
        await this.departureDateField.click();
        await this.page.waitForTimeout(500);

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysFromNow);
        const day = targetDate.getDate().toString();
        const month = targetDate.toLocaleString('en-GB', { month: 'long' });
        const year = targetDate.getFullYear().toString();

        // Click the date in the calendar
        const dateCell = this.page.locator('[aria-label*="' + day + ' ' + month + ' ' + year + '"], .calendar-cell:has-text("' + day + '")').first();
        if (await dateCell.isVisible({ timeout: 3000 }).catch(() => false)) {
            await dateCell.click();
        }
        await this.page.waitForTimeout(500);
    }

    /**
     * Opens the passenger selector
     */
    async openPassengerSelector(): Promise<void> {
        await this.passengerField.click();
        await this.page.waitForTimeout(500);
    }

    /**
     * Gets the passenger count text
     * @returns Promise<string> - the passenger summary text
     */
    async getPassengerText(): Promise<string> {
        const text = await this.passengerField.textContent();
        return text?.trim() || '';
    }

    /**
     * Clicks the Search Flights button
     */
    async clickSearchFlights(): Promise<void> {
        await this.searchButton.click();
    }
}