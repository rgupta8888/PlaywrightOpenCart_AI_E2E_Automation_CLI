import { test, expect } from "@playwright/test";
import { Routes } from "../../api/endpoints/routes";
import { RandomDataUtil } from "../../utils/dataGenerator";
import { expectStatus } from "../../utils/apiHelpers";
import { fakeStoreData } from "../../testdata/api/apiTestData";

function buildUrl(template: string, params?: Record<string, string | number>): string {
    let url = `${Routes.BASE_URL}${template}`;
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, String(value));
        }
    }
    return url;
}

test.describe("Authentication", () => {
    test("1. Successful Login @api @auth", async ({ request }) => {
        const url = buildUrl(Routes.AUTH_LOGIN);
        const resp = await request.post(url, {
            data: {
                username: fakeStoreData.credentials.valid.username,
                password: fakeStoreData.credentials.valid.password,
            },
        });
        await expectStatus(resp, 201);

        const body = await resp.json();
        expect(body).toHaveProperty("token");
        expect(typeof body.token).toBe("string");
        expect(body.token.length).toBeGreaterThan(0);
    });

    test("2. Invalid Login @api @auth", async ({ request }) => {
        const url = buildUrl(Routes.AUTH_LOGIN);
        const resp = await request.post(url, {
            data: {
                username: RandomDataUtil.getUsername(),
                password: RandomDataUtil.getPassword(),
            },
        });
        await expectStatus(resp, 401);
    });
});