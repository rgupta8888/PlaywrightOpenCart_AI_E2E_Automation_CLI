import { test, expect } from "@playwright/test";
import { Routes } from "../../api/endpoints/routes";
import { RandomDataUtil } from "../../utils/dataGenerator";

function buildUrl(template: string, params?: Record<string, string | number>): string {
    let url = `${Routes.BASE_URL}${template}`;
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(`{${key}}`, String(value));
        }
    }
    return url;
}

test.describe("Carts API", () => {
    const sampleCartId = 1;
    const cartLimit = 2;

    test("20. Get All Carts @api @carts", async ({ request }) => {
        const url = buildUrl(Routes.GET_ALL_CARTS);
        const resp = await request.get(url);
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test("21. Get Cart by ID @api @carts", async ({ request }) => {
        const url = buildUrl(Routes.GET_CART_BY_ID, { id: sampleCartId });
        const resp = await request.get(url);
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(body).toHaveProperty("id");
        expect(body.id).toBe(sampleCartId);
        expect(body).toHaveProperty("userId");
        expect(body).toHaveProperty("date");
        expect(body).toHaveProperty("products");
        expect(Array.isArray(body.products)).toBe(true);
    });

    test("22. Get Carts by Date Range @api @carts", async ({ request }) => {
        const url = buildUrl(Routes.GET_CARTS_BY_DATE_RANGE, {
            startdate: "2019-12-10",
            enddate: "2020-10-10",
        });
        const resp = await request.get(url);
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
    });

    test("23. Get User Cart @api @carts", async ({ request }) => {
        const url = buildUrl(Routes.GET_USER_CART, { userId: 1 });
        const resp = await request.get(url);
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
    });

    test("24. Get Carts with Limit @api @carts", async ({ request }) => {
        const url = buildUrl(Routes.GET_CARTS_WITH_LIMIT, { limit: cartLimit });
        const resp = await request.get(url);
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(cartLimit);
    });

    test("25. Sort Carts @api @carts", async ({ request }) => {
        const ascUrl = buildUrl(Routes.GET_CARTS_SORTED, { order: "asc" });
        const ascResp = await request.get(ascUrl);
        expect(ascResp.status()).toBe(200);
        const ascBody = await ascResp.json();
        expect(Array.isArray(ascBody)).toBe(true);
        const ascIds = ascBody.map((c: { id: number }) => c.id);
        for (let i = 1; i < ascIds.length; i++) {
            expect(ascIds[i]).toBeGreaterThanOrEqual(ascIds[i - 1]);
        }

        const descUrl = buildUrl(Routes.GET_CARTS_SORTED, { order: "desc" });
        const descResp = await request.get(descUrl);
        expect(descResp.status()).toBe(200);
        const descBody = await descResp.json();
        expect(Array.isArray(descBody)).toBe(true);
        const descIds = descBody.map((c: { id: number }) => c.id);
        for (let i = 1; i < descIds.length; i++) {
            expect(descIds[i]).toBeLessThanOrEqual(descIds[i - 1]);
        }
    });

    test("26. Cart CRUD - Create @api @carts @crud", async ({ request }) => {
        const cartData = RandomDataUtil.generateCartPayload(1);
        const url = buildUrl(Routes.CREATE_CART);
        const resp = await request.post(url, { data: cartData });
        expect(resp.status()).toBe(201);
        const body = await resp.json();
        expect(body).toHaveProperty("id");
        expect(typeof body.id).toBe("number");
        expect(body.userId).toBe(cartData.userId);
        expect(body).toHaveProperty("products");
        expect(Array.isArray(body.products)).toBe(true);
    });

    test("27. Cart CRUD - Update @api @carts @crud", async ({ request }) => {
        const cartData = RandomDataUtil.generateUpdatedCartPayload(1);
        const url = buildUrl(Routes.UPDATE_CART, { id: sampleCartId });
        const resp = await request.put(url, { data: cartData });
        expect(resp.status()).toBe(200);
        const body = await resp.json();
        expect(body.id).toBe(sampleCartId);
        expect(body).toHaveProperty("products");
    });

    test("28. Cart CRUD - Delete @api @carts @crud", async ({ request }) => {
        const url = buildUrl(Routes.DELETE_CART, { id: sampleCartId });
        const resp = await request.delete(url);
        expect(resp.status()).toBe(200);
    });
});
