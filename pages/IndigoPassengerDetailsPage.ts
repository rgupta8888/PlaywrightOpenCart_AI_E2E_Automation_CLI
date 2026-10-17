import { Page, Locator } from '@playwright/test';

export class IndigoPassengerDetailsPage {
    private readonly page: Page;

    // Locators
    private readonly adultFirstName: Locator;
    private readonly adultLastName: Locator;
    private readonly seniorFirstName: Locator;
    private readonly seniorLastName: Locator;
    private readonly termsCheckbox: Locator;
    private readonly proceedButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.adultFirstName = page.locator('#passenger-first-name-0, input[placeholder*="First Name"]').first();
        this.adultLastName = page.locator('#passenger-last-name-0, input[placeholder*="Last Name"]').first();
        this.seniorFirstName = page.locator('#passenger-first-name-1, input[placeholder*="First Name"]').nth(1);
        this.seniorLastName = page.locator('#passenger-last-name-1, input[placeholder*="Last Name"]').nth(1);
        this.termsCheckbox = page.locator('[class*="terms"] input[type="checkbox"], [class*="terms"] label, #termsCheckbox');
        this.proceedButton = page.getByRole('button', { name: /Proceed|Continue/i });
    }

    /**
     * Checks if the passenger details page is displayed
     * @returns Promise<boolean> - true if passenger form is visible
     */
    async isPassengerDetailsPageDisplayed(): Promise<boolean> {
        try {
            await this.page.waitForURL(/\/booking|passenger|review/i, { timeout: 10000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Fills adult passenger details
     * @param firstName - Adult first name
     * @param lastName - Adult last name
     */
    async fillAdultDetails(firstName: string, lastName: string): Promise<void> {
        if (await this.adultFirstName.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.adultFirstName.fill(firstName);
        }
        if (await this.adultLastName.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.adultLastName.fill(lastName);
        }
    }

    /**
     * Fills senior citizen passenger details
     * @param firstName - Senior first name
     * @param lastName - Senior last name
     */
    async fillSeniorDetails(firstName: string, lastName: string): Promise<void> {
        if (await this.seniorFirstName.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.seniorFirstName.fill(firstName);
        }
        if (await this.seniorLastName.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.seniorLastName.fill(lastName);
        }
    }

    /**
     * Accepts the terms and conditions checkbox
     */
    async acceptTerms(): Promise<void> {
        if (await this.termsCheckbox.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.termsCheckbox.check();
        }
    }

    /**
     * Clicks Proceed to continue
     */
    async clickProceed(): Promise<void> {
        if (await this.proceedButton.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.proceedButton.click();
        }
    }
}