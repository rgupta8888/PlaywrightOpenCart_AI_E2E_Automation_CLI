import { expect, APIResponse } from '@playwright/test';

/**
 * Asserts an HTTP response status code.
 * Logs the response body on failure for easier CI debugging.
 *
 * @param resp - The Playwright APIResponse object
 * @param expected - The expected HTTP status code
 */
export async function expectStatus(resp: APIResponse, expected: number): Promise<void> {
    const actual = resp.status();
    if (actual !== expected) {
        const body = await resp.text();
        console.error(`\n❌ Expected status ${expected} but got ${actual}`);
        console.error(`   URL: ${resp.url()}`);
        console.error(`   Response body: ${body}\n`);
    }
    expect(actual).toBe(expected);
}