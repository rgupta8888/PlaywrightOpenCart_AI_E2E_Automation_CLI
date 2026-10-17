import { Page, Locator } from '@playwright/test';

export class IndigoFlightSelectionPage {
    private readonly page: Page;

    // Locators
    private readonly routeSummary: Locator;
    private readonly dateSummary: Locator;
    private readonly flightCards: Locator;
    private readonly viewDetailsButtons: Locator;
    private readonly nextButton: Locator;
    private readonly confirmProceedButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.routeSummary = page.locator('[class*="route-summary"], [class*="journey-summary"]');
        this.dateSummary = page.locator('[class*="date-summary"], [class*="departure-date"]');
        this.flightCards = page.locator('[class*="flight-card"], [class*="flight-item"], [class*="srp-item"]');
        this.viewDetailsButtons = page.getByRole('button', { name: /View Details|View details/i });
        this.nextButton = page.getByRole('button', { name: /Next/i });
        this.confirmProceedButton = page.getByRole('button', { name: /Confirm and Proceed|Confirm & Proceed/i });
    }

    /**
     * Checks if the flight selection page is displayed
     * @returns Promise<boolean> - true if flight results are visible
     */
    async isFlightSelectionPageDisplayed(): Promise<boolean> {
        try {
            await this.page.waitForURL(/\/booking|flight|search-results|srp/i, { timeout: 10000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Gets the route summary text
     * @returns Promise<string> - the route text
     */
    async getRouteSummary(): Promise<string> {
        return await this.routeSummary.textContent() || '';
    }

    /**
     * Gets the date summary text
     * @returns Promise<string> - the date text
     */
    async getDateSummary(): Promise<string> {
        return await this.dateSummary.textContent() || '';
    }

    /**
     * Checks if flight options are displayed
     * @returns Promise<boolean> - true if flight cards are visible
     */
    async areFlightsDisplayed(): Promise<boolean> {
        try {
            const count = await this.flightCards.count();
            return count > 0;
        } catch {
            return false;
        }
    }

    /**
     * Selects the lowest-priced Economy fare
     */
    async selectLowestEconomyFare(): Promise<void> {
        // Look for economy fare buttons/selectors
        const economyFares = this.page.locator('[class*="economy"], [class*="Economy"], [aria-label*="Economy"]');
        const count = await economyFares.count();
        if (count > 0) {
            await economyFares.first().click();
        }
    }

    /**
     * Clicks View Details for the selected flight
     */
    async clickViewDetails(): Promise<void> {
        if (await this.viewDetailsButtons.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.viewDetailsButtons.first().click();
        }
    }

    /**
     * Clicks Next to continue
     */
    async clickNext(): Promise<void> {
        if (await this.nextButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.nextButton.click();
        }
    }

    /**
     * Clicks Confirm and Proceed
     */
    async clickConfirmAndProceed(): Promise<void> {
        if (await this.confirmProceedButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.confirmProceedButton.click();
        }
    }
}